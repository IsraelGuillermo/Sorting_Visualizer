import Head from 'next/head';
import { SortingVisualizer } from '@/components/SortingVisualizer/SortingVisualizer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sorting Visualizer</title>
        <meta name='description' content='Algorithm Visualizer' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <SortingVisualizer />
      </main>
    </>
  );
}
