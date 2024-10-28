import { Toaster } from "react-hot-toast";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./RegisterPage.module.css";
import Logo from "../../components/Logo/Logo";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useEffect, useRef, useState } from "react";
import ConnectShopifyPart from "../../components/ConnectShopifyPart/ConnectShopifyPart";
import ResponceReceived from "../../components/ResponceReceived/ResponceReceived";
import { Fade } from "@mui/material";
import ShopifyStoreModal from "../../components/ShopifyStoreModal/ShopifyStoreModal";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import { selectisLoading } from "../../redux/helpers/selector";
import useFakeLoad from "../../helpers/fakeLoad";
import ConnectEmailPart from "../../components/ConnectEmailPart/ConnectEmailPart";
import ReadyToGoModal from "../../components/ReadyToGoModal/ReadyToGoModal";

export default function RegisterPage() {
  const [progress, setProgress] = useState<number>(1);
  const realProgress = useRef<number>(1);

  const [progressOpen, setProgressOpen] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const fakeIsConnected = useRef<boolean>(false);

  const fakeIsLoading = useSelector(selectisLoading);
  const fakeLoad = useFakeLoad();

  const modals = [
    <ResponceReceived
      setProgress={setProgress}
      realProgress={realProgress}
      setModalOpen={setModalOpen}
    />,
    <ShopifyStoreModal
      setProgress={setProgress}
      realProgress={realProgress}
      setModalOpen={setModalOpen}
      fakeIsConnected={fakeIsConnected}
    />,
    <ReadyToGoModal />,
  ];

  const stages = [
    <RegisterForm
      setProgress={setProgress}
      realProgress={realProgress}
    />,
    <ConnectShopifyPart
      setModalIndex={setModalIndex}
      setProgressOpen={setProgressOpen}
      fakeIsConnected={fakeIsConnected}
      realProgress={realProgress}
    />,
    <ConnectEmailPart
      setModalIndex={setModalIndex}
      setProgressOpen={setProgressOpen}
      realProgress={realProgress}
    />,
    <></>,
  ];

  useEffect(() => {
    if (realProgress.current === 4) {
      setModalIndex(2);
      setProgressOpen(false);
    }
  }, [realProgress, progressOpen]);

  return (
    <div className={css.bgdiv}>
      <div className={css.wrapper}>
        <div className={css.container}>
          <Toaster position="top-right" />
          <Fade in={fakeIsLoading} mountOnEnter unmountOnExit>
            <div className={css.loadingContainer}>
              <Loader />
            </div>
          </Fade>
          <Fade
            in={modalOpen}
            mountOnEnter
            unmountOnExit
            onExited={() => {
              setProgressOpen(true);
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              {modals[modalIndex]}
            </div>
          </Fade>
          <Fade
            in={progressOpen}
            mountOnEnter
            unmountOnExit
            onExited={() =>
              fakeLoad(() => {
                setModalOpen(true);
              }, true)
            }
          >
            <div
              className={css.progressContainer}
              style={{ width: "100%", height: "100%" }}
            >
              <section className={css.logoSection}>
                <Logo />
                <ProgressBar
                  progress={progress}
                  setProgress={setProgress}
                  realProgress={realProgress}
                />
              </section>
              <section className={css.sliderSection}>
                <ul
                  className={css.slidesList}
                  style={{
                    transform: `translateX(-${
                      (progress - 1) * 100
                    }%)`,
                  }}
                >
                  {stages.map((stage, index) => (
                    <div className={css.slide} key={index}>
                      {stage}
                    </div>
                  ))}
                </ul>
              </section>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
