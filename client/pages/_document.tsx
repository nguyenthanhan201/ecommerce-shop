import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* meta name google-site-verification can replay by other account */}
          <meta
            name="google-site-verification"
            content="Dxc_EFlajz1_k2ONTT0dESX28uwbYlAQsMRbO-qGa14"
          />
          {/* verify your domain in Facebook Business Manager */}
          {/* <meta
            name="facebook-domain-verification"
            content="royonyss9hk9g42foa16ribx3weler"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
