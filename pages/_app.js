import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { Navbar } from "../src/components/Layouts/Navbar";
import { ModelContextProvider } from "../src/context/ModalContext";
import { Modal } from "../src/components/Layouts/Modal";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <ModelContextProvider>
        {router.pathname.split("/")[1] !== "auth" && <Navbar />}
        <Modal />
        <div className={router.pathname.split("/")[1] === "auth" ? "mt-0" : "mt-[11vh]"}>
          <Component {...pageProps} />
          <ToastContainer />
        </div>
      </ModelContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
