-- CreateTable
CREATE TABLE "HealthCheck" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "statusCode" INTEGER,
    "responseTimeMs" INTEGER,
    "redirectUrl" TEXT,
    "finalUrl" TEXT,
    "errorMessage" TEXT,
    "errorType" TEXT,
    "contentType" TEXT,
    "contentIssue" TEXT,
    "redirectChain" JSONB,
    "isSecure" BOOLEAN,

    CONSTRAINT "HealthCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HealthCheck_listingId_idx" ON "HealthCheck"("listingId");

-- CreateIndex
CREATE INDEX "HealthCheck_checkedAt_idx" ON "HealthCheck"("checkedAt");
