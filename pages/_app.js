// global.cssはここでしか読み込めない
import '../styles/global.css';

// global.cssの読み込み
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
