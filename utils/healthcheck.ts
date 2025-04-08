import { PrismaClient } from "@prisma/client"
import { setTimeout } from "timers/promises"

const prisma = new PrismaClient()

// Function to check a website's health
async function checkWebsite(url: string) {
  try {
    const startTime = Date.now();

    // Set headers to mimic a real browser
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Referer": "https://www.google.com",
    };

    const controller = new AbortController();
    const timeoutId = global.setTimeout(() => controller.abort(), 10000); // 10-second timeout

    const response = await fetch(url, {
      method: "GET",
      headers,
      redirect: "manual",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    const responseTime = Date.now() - startTime;

    // Handle redirects
    if (response.status >= 300 && response.status < 400) {
      const redirectUrl = response.headers.get("location");

      if (redirectUrl) {
        return {
          status: "redirect",
          statusCode: response.status,
          redirectUrl,
          responseTime,
        };
      } else {
        return {
          status: "up",
          statusCode: response.status,
          responseTime,
        };
      }
    }

    // For successful responses, check content
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      const isHtml = contentType && contentType.includes("text/html");

      if (isHtml) {
        try {
          const text = await response.text();
          const hasErrorMessage = /error|not found|404|403|500/i.test(text);
          const pageTitle = text.match(/<title>(.*?)<\/title>/i)?.[1] || "";

          if (hasErrorMessage && (pageTitle.includes("Error") || pageTitle.includes("Not Found"))) {
            return {
              status: "content_error",
              statusCode: response.status,
              responseTime,
              contentIssue: "Page contains error messages despite 200 status",
            };
          }
        } catch (contentError) {
          if (contentError instanceof Error) {
            console.log(`Error parsing content for ${url}: ${contentError.message}`);
          } else {
            console.log(`Error parsing content for ${url}: ${String(contentError)}`);
          }
        }
      }

      const isSecure = url.startsWith("https://");

      return {
        status: "up",
        statusCode: response.status,
        responseTime,
        isSecure,
        contentType,
      };
    }

    // Handle other status codes
    if (response.status >= 400) {
      return {
        status: "down",
        statusCode: response.status,
        responseTime,
      };
    }

    return {
      status: "unknown",
      statusCode: response.status,
      responseTime,
    };
  } catch (error: any) {
    let errorType = "unknown";
    if (error.name === "AbortError") {
      errorType = "timeout";
    } else if (error.message.includes("ENOTFOUND")) {
      errorType = "dns";
    } else if (error.message.includes("ECONNREFUSED")) {
      errorType = "connection_refused";
    } else if (error.message.includes("certificate")) {
      errorType = "ssl";
    }

    return {
      status: "warning",
      statusCode: null,
      errorType,
      errorMessage: error.message,
    };
  }
}

// Function to follow redirect chains
async function followRedirectChain(url: string, maxRedirects = 5) {
  const redirectChain = []
  let currentUrl = url
  let redirectCount = 0

  while (redirectCount < maxRedirects) {
    const result = await checkWebsite(currentUrl)

    if (result.status === "redirect" && result.redirectUrl) {
      redirectChain.push({
        from: currentUrl,
        to: result.redirectUrl,
        statusCode: result.statusCode,
      })

      // Handle relative URLs
      try {
        currentUrl = new URL(result.redirectUrl, currentUrl).toString()
      } catch (error) {
        console.error(`Invalid redirect URL: ${result.redirectUrl}`)
        break
      }

      redirectCount++
    } else {
      // We've reached the final destination
      return {
        finalStatus: result.status,
        finalStatusCode: result.statusCode,
        redirectChain,
        finalUrl: currentUrl,
        responseTime: result.responseTime,
        contentType: result.contentType,
        isSecure: result.isSecure,
        contentIssue: result.contentIssue,
        errorType: result.errorType,
        errorMessage: result.errorMessage,
      }
    }
  }

  return {
    finalStatus: "too_many_redirects",
    redirectChain,
    finalUrl: currentUrl,
  }
}

// Create a health check record in the database
async function createHealthCheckRecord(listingId: string, checkResult: any) {
  try {
    await prisma.healthCheck.create({
      data: {
        listingId,
        status: checkResult.status || checkResult.finalStatus,
        statusCode: checkResult.statusCode || checkResult.finalStatusCode,
        responseTimeMs: checkResult.responseTime,
        redirectUrl: checkResult.redirectUrl,
        finalUrl: checkResult.finalUrl,
        errorMessage: checkResult.errorMessage,
        errorType: checkResult.errorType,
        contentType: checkResult.contentType,
        contentIssue: checkResult.contentIssue,
        redirectChain: checkResult.redirectChain ? checkResult.redirectChain : undefined,
        isSecure: checkResult.isSecure,
      },
    })

    console.log(`Created health check record for listing ${listingId}`)
  } catch (error) {
    console.error(`Failed to create health check record for listing ${listingId}:`, error)
  }
}

// Main function to perform health checks
async function performHealthCheck() {
  try {
    // Get all published listings with websites
    const listings = await prisma.listing.findMany({
      where: {
        published: true,
        website: {
          not: "",
        },
      },
      select: {
        id: true,
        title: true,
        website: true,
      },
    })

    console.log(`Found ${listings.length} listings to check`)

    // Process listings in batches to avoid overwhelming the system
    const batchSize = 5

    for (let i = 0; i < listings.length; i += batchSize) {
      const batch = listings.slice(i, i + batchSize)

      // Process batch in parallel
      await Promise.all(
        batch.map(async (listing) => {
          const { id, website, title } = listing
          console.log(`Checking website for "${title}": ${website}`)

          try {
            // Ensure the URL has a protocol
            let url = website
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
              url = "https://" + url
            }

            // Follow redirects for all sites
            const redirectResult = await followRedirectChain(url)

            // Create a health check record
            await createHealthCheckRecord(id, redirectResult)

            // Log appropriate message based on status
            const status = redirectResult.finalStatus
            if (status === "redirect" || redirectResult.redirectChain?.length > 0) {
              console.log(`Website ${website} has redirects, final URL: ${redirectResult.finalUrl}`)
            } else if (status === "error") {
              console.log(`Error checking ${website}: ${redirectResult.errorType} - ${redirectResult.errorMessage}`)
            } else if (status === "content_error") {
              console.log(`Website ${website} has content issues: ${redirectResult.contentIssue}`)
            } else {
              console.log(
                `Website ${website} is ${status} (Status Code: ${redirectResult.finalStatusCode || "N/A"}, Response Time: ${redirectResult.responseTime}ms)`,
              )
            }
          } catch (error) {
            console.error(`Failed to check ${website}:`, error)

            // Create an error record even if the check fails completely
            await createHealthCheckRecord(id, {
              status: "error",
              errorMessage: `Failed to complete check: ${error instanceof Error ? error.message : String(error)}`,
              errorType: "check_failure",
            })
          }
        }),
      )

      // Add a delay between batches to avoid rate limiting
      if (i + batchSize < listings.length) {
        await setTimeout(2000)
      }
    }

    console.log("Health check completed successfully")
  } catch (error) {
    console.error("Error during health check:", error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the health check
performHealthCheck().catch((error) => {
  console.error("Fatal error during health check:", error)
  process.exit(1)
})

