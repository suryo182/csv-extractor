import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>CSV Extractor App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center gap-y-4">
          <h1 className="text-5xl text-blue-700 font-bold">
            Welcome to CSV Extractor App
          </h1>
          <div className="flex gap-x-4 justify-center">
            <Link href="screen-one">
              <a className="underline cursor-pointer hover:text-blue-700 text-lg font-medium">
                Screen One
              </a>
            </Link>
            <Link href="screen-two">
              <a className="underline cursor-pointer hover:text-blue-700 text-lg font-medium">
                Screen Two
              </a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}