import "../styles/globals.css";
import { CommerceProvider } from "../contexts/useCommerce";
import { Layout } from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
    return (
        <CommerceProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CommerceProvider>
    );
}

export default MyApp;
