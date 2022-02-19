import '../styles/globals.css';
import Script from 'next/script';
import Link from 'next/link';

const customInlineScriptBefore = `console.log('Hi I am inline-script running with strategy beforeInteractive')`;

const customInlineScriptAfter = `console.log('Hi I am an inline-script running with strategy afterInteractive')`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        id="inline-before-test-script"
        // if you for some reason must use a inline script with beforeInteractive
        // offically unsupported: https://nextjs.org/docs/basic-features/script#inline-scripts
        // this is mostly equivalent to putting it in the Head of _document.
        // However, this way your inline script code gets automatically hashed and picked up for
        // Hash-based CSP routes or gets assigned a nonce for Nonce-based CSP routes
        strategy="beforeInteractive"
      >
        {customInlineScriptBefore}
      </Script>
      <Script
        id="sentry-script"
        strategy="beforeInteractive"
        src="https://browser.sentry-cdn.com/6.16.1/bundle.min.js"
        // the script will get assigned a nonce for Nonce-based CSP routes
        // the integrity attribute will be picked up for Hash-based CSP routes
        integrity="sha384-WkFzsrcXKeJ3KlWNXojDiim8rplIj1RPsCbuv7dsLECoXY8C6Cx158CMgl+O+QKW"
        // crossOrigin attribute gets dropped by Next somehow which leads to a CORS error with integrity. Add it with data-crossorigin in this case, will be picked up
        data-crossorigin="anonymous"
      />
      <Script
        id="inline-after-test-script"
        // in most cases use your inline scripts with afterInteractive.
        // That way they will be inserted by Next and don't need to be nonced or hashed.
        // Also, the whole DOM will be available at this point, in beforeInteractive it is not.
        strategy="afterInteractive"
      >
        {customInlineScriptAfter}
      </Script>
      <div className="max-w-5xl mx-auto p-12">
        <div className="space-y-12">
          <nav className="text-2xl text-blue-700 font-bold">
            <a href="/">Home</a>
          </nav>
          <div className="flex justify-center">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyApp;
