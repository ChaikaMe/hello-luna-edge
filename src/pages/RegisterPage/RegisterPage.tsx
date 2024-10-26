import { Toaster } from "react-hot-toast";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./RegisterPage.module.css";
import Logo from "../../components/Logo/Logo";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useRef, useState } from "react";
import ConnectShopifyPart from "../../components/ConnectShopifyPart/ConnectShopifyPart";

export default function RegisterPage() {
  const [progress, setProgress] = useState<number>(1);
  const realProgress = useRef<number>(1);

  const stages = [
    <RegisterForm
      setProgress={setProgress}
      realProgress={realProgress}
    />,
    <ConnectShopifyPart
      setProgress={setProgress}
      realProgress={realProgress}
    />,
    <RegisterForm
      setProgress={setProgress}
      realProgress={realProgress}
    />,
    <RegisterForm
      setProgress={setProgress}
      realProgress={realProgress}
    />,
  ];
  return (
    <div className={css.container}>
      <Toaster position="top-right" />
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
            transform: `translateX(-${(progress - 1) * 100}%)`,
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
  );
}
