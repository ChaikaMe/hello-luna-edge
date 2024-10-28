import css from "./ShopifyStoreModal.module.css";
import icons from "../../images/icons.svg";
import fakeShopPhoto from "../../images/RaccoonImage.png";
import { MutableRefObject } from "react";

interface ShopifyStoreModalProps {
  setProgress: (progress: number) => void;
  setModalOpen: (ModalOpen: boolean) => void;
  realProgress: MutableRefObject<number>;
  fakeIsConnected: MutableRefObject<boolean>;
}

export default function ShopifyStoreModal({
  setProgress,
  setModalOpen,
  realProgress,
  fakeIsConnected,
}: ShopifyStoreModalProps) {
  const handleDoneClick = () => {
    setProgress(3);
    if (realProgress.current === 2) realProgress.current = 3;
    setModalOpen(false);
    if (!fakeIsConnected.current) {
      setTimeout(() => {
        fakeIsConnected.current = true;
      }, 225);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.photoContainer}>
        <img
          className={css.photo}
          src={fakeShopPhoto}
          alt="fakephoto"
        />
        <svg className={css.icon}>
          <use href={`${icons}#icon-progress`} />
        </svg>
      </div>
      <h3 className={css.title}>
        {fakeIsConnected.current
          ? "[STORE-NAME] already connected"
          : "Store Connected"}
      </h3>
      {!fakeIsConnected.current && (
        <p className={css.text}>
          Chad is now able to manage customer support requests for
          [STORE-NAME].
        </p>
      )}

      <button
        className={css.button}
        onClick={handleDoneClick}
        type="button"
      >
        Continue
      </button>
      <span className={css.wrongStoreText}>
        Wrong store?{" "}
        <button className={css.wrongStoreButton}>
          Connect another one
        </button>
      </span>
    </div>
  );
}
