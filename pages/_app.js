import "@/styles/globals.css";
import dynamic from "next/dynamic";

// Dynamically import TinaCMS provider (no SSR)
const TinaProvider = dynamic(() => import("../.tina/__generated__/TinaCMS"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <TinaProvider>
      <Component {...pageProps} />
    </TinaProvider>
  );
}
