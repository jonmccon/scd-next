import '../app/css/fonts.css' /* All hosted and external fonts */
import '../app/css/index.css' /* Global styles */
import '../app/css/episodes.css' /* Episodes styles */
import '../app/css/300.css' /* Mobile styles */
import '../app/css/1000.css' /* Desktop styles */

 
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}