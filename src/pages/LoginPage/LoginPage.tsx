import { Toaster } from "react-hot-toast";
import LoginForm from "../../components/LoginForm/LoginForm";
import Logo from "../../components/Logo/Logo";
import css from "./LoginPage.module.css";
import { useSelector } from "react-redux";
import { selectisLoading } from "../../redux/helpers/selector";
import { Fade } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import { useState } from "react";
import SuccesLoginModal from "../../components/SuccesLoginModal/SuccesLoginModal";

export default function LoginPage() {
  const isLoading = useSelector(selectisLoading);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [pageOpen, setPageOpen] = useState<boolean>(true);
  return (
    <div className={css.bgdiv}>
      <div className={css.wrapper}>
        <div className={css.container}>
          <Toaster position="top-right" />
          <Fade in={isLoading} mountOnEnter unmountOnExit>
            <div className={css.loadingContainer}>
              <Loader />
            </div>
          </Fade>
          <Fade
            in={modalOpen}
            mountOnEnter
            unmountOnExit
            onExited={() => {
              setPageOpen(true);
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <SuccesLoginModal />
            </div>
          </Fade>
          <Fade
            in={pageOpen}
            onExited={() => setModalOpen(true)}
            mountOnEnter
            unmountOnExit
          >
            <div style={{ width: "100%", height: "100%" }}>
              <section className={css.topSection}>
                <Logo />
                <div className={css.text}>
                  <h1 className={css.textTitle}>Welcome back</h1>
                  <p className={css.textDesc}>
                    Feeling ready to take on the day? Chad is too!
                  </p>
                </div>
              </section>
              <LoginForm setPageOpen={setPageOpen} />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
