import Head from 'next/head';
import SleepTracker from '../components/SleepTracker';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Head>
        <title>Sleep Tracker - Harish & Govardhan</title>
        <meta name="description" content="Track sleep and wake-up times" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Sleep Tracker
        </h1>
        <SleepTracker />
      </main>
    </div>
  );
}

