import css from "./ConnectEmailPart.module.css";
import icons from "../../images/icons.svg";
import { MutableRefObject, useState } from "react";
import { Fade } from "@mui/material";
import DontUseGmail from "../DontUseGmail/DontUseGmail";

interface ConnectEmailProps {
  setModalIndex: (ModalIndex: number) => void;
  setProgressOpen: (ProgressOpen: boolean) => void;
  realProgress: MutableRefObject<number>;
}

export default function ConnectEmailPart({
  setModalIndex,
  setProgressOpen,
  realProgress,
}: ConnectEmailProps) {
  const prosData = [
    {
      title: "Contextual responses",
      span: "Custom responses to any support situation from \u201Cwhere\u2019s my stuff?\u201D to \u201CI want a refund\u201D",
    },
    {
      title: "Reply from anywhere",
      span: "Respond to your customers via email or Chad chat\u2014it\u2019s all saved in the same thread",
    },
    {
      title: "Categorical inbox tags",
      span: "Tags your emails by category so you know what to expect before even opening an email",
    },
  ];
  const [prosEmailMenu, setProsEmailMenu] = useState<boolean>(true);
  const [dontUseMenu, setDontUseMenu] = useState<boolean>(false);

  const dontUseClickHandler = () => {
    setProsEmailMenu(false);
  };

  return (
    <>
      <Fade
        in={prosEmailMenu === true}
        onExited={() => {
          setDontUseMenu(true);
        }}
        mountOnEnter
        unmountOnExit
      >
        <section className={css.section}>
          <div className={css.text}>
            <h1 className={css.textTitle}>
              Connect to customer {window.innerWidth <= 390 && <br />}{" "}
              support email
            </h1>
            <p className={css.textDesc}>
              Allows Chad to send automated responses on your behalf
              from your usual support mailbox
            </p>
          </div>

          <ul className={css.prosList}>
            {prosData.map((item, index) => (
              <li className={css.prosItem} key={index}>
                <svg className={css.prosItemIcon}>
                  <use href={`${icons}#icon-checked-green`} />
                </svg>
                <div className={css.itemText}>
                  <h3 className={css.itemTitle}>{item.title}</h3>
                  <span className={css.itemSpan}>{item.span}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={css.buttonsContainer}>
            <div className={css.gmailButtonWrapper}>
              <svg className={css.gmailIcon}>
                <use href={`${icons}#icon-gmail`} />
              </svg>
              <button
                className={css.button}
                type="button"
                onClick={() => {
                  setProgressOpen(false);
                  realProgress.current = 4;
                  setModalIndex(2);
                }}
              >
                Connect Gmail account
              </button>
            </div>
            <button
              className={css.noGmailButton}
              type="button"
              onClick={dontUseClickHandler}
              disabled={realProgress.current > 3}
              style={{
                color:
                  realProgress.current > 3 ? "#c3cad5" : "#4f637d",
              }}
            >
              I don&#8217;t use Gmail
            </button>
          </div>
        </section>
      </Fade>
      <Fade
        in={dontUseMenu === true}
        onExited={() => {
          setProsEmailMenu(true);
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={css.noGmailContainer}>
          <DontUseGmail
            setModalIndex={setModalIndex}
            setProgressOpen={setProgressOpen}
            realProgress={realProgress}
          />
        </div>
      </Fade>
    </>
  );
}
