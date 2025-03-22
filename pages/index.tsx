import Head from 'next/head';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <>
      <Head>
        <title>Talk to Reza</title>
        <meta name="description" content="Ask RezaBot anything about Mir Reza's experience, skills, and projects." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ChatBot />
      </main>
    </>
  );
}
