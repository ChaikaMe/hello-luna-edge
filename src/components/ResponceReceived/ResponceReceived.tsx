import css from "./ResponceReceived.module.css";
import icons from "../../images/icons.svg";
import { MutableRefObject } from "react";

interface ResponceReceivedProps {
  setProgress: (progress: number) => void;
  setModalOpen: (ModalOpen: boolean) => void;
  realProgress: MutableRefObject<number>;
}

export default function ResponceReceived({
  setProgress,
  setModalOpen,
  realProgress,
}: ResponceReceivedProps) {
  const handleDoneClick = () => {
    if (realProgress.current === 2) {
      setProgress(3);
      realProgress.current = 3;
    } else if (realProgress.current === 3) {
      setProgress(4);
      realProgress.current = 4;
    }
    setModalOpen(false);
  };
  return (
    <div className={css.container}>
      <svg className={css.icon}>
        <use href={`${icons}#icon-progress`} />
      </svg>
      <h3 className={css.title}>Response received</h3>
      <p className={css.text}>
        Thank you for your interest in Chad! We&#8217;ll be hard at
        work building integrations to support your platform.
      </p>
      <button
        className={css.button}
        onClick={handleDoneClick}
        type="button"
      >
        Done
      </button>
    </div>
  );
}
