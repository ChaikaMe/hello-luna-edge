import { Toaster } from "react-hot-toast";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./RegisterPage.module.css";
import Logo from "../../components/Logo/Logo";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useState } from "react";

export default function RegisterPage() {
  const [progress, setProgress] = useState<number>(1);
  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <section className={css.logoSection}>
        <Logo />
        <ProgressBar progress={progress} setProgress={setProgress} />
      </section>
      <section className={css.sliderSection}>
        <RegisterForm setProgress={setProgress} />
      </section>
    </div>
  );
}
