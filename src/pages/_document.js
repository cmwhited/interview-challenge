// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'
import Document from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://storage.googleapis.com/graph-fonts/EuclidCircular/fonts.css"
            rel="stylesheet"
          />

          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="https://storage.googleapis.com/graph-web/favicon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
