import "../css/index.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Birthday email reminders - Birthdays as a Service</title>
        <meta
          name="Description"
          content="BDaaS makes sure you never forget a friends birthday. When you addra person's birthday on your dashboard, you will receive a timely email notification on the morning of their birthday."
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
