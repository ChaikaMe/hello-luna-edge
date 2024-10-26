import css from "./ConnectShopifyPart.module.css";
import icons from "../../images/icons.svg";
import { MutableRefObject, useState } from "react";
import { Fade } from "@mui/material";
import DontUseShopify from "../DontUseShopify/DontUseShopify";

interface ConnectShopifyProps {
  setProgress: (number: number) => void;
  realProgress: MutableRefObject<number>;
}

export default function ConnectShopifyPart({
  setProgress,
  realProgress,
}: ConnectShopifyProps) {
  const prosData = [
    {
      title: "Track orders and shipping",
      span: "Global coverage with 600+ couriers supported",
    },
    {
      title: "Manage orders",
      span: "Allow customers to track, return, exchange, or report problems with their orders",
    },
    {
      title: "Process returns and exchanges",
      span: "Automatically checks your store policy and existing inventory before resolving or escalating each request",
    },
  ];
  const [conShopifyMenu, setConShopifyMenu] = useState<boolean>(true);
  const [dontUseMenu, setDontUseMenu] = useState<boolean>(false);

  const handleConnect = () => {};
  const handleDontUse = () => {};
  return (
    <>
      <Fade
        in={conShopifyMenu === true}
        onExited={() => {
          setDontUseMenu(true);
        }}
        mountOnEnter
        unmountOnExit
      >
        <section className={css.section}>
          <div className={css.text}>
            <h1 className={css.textTitle}>
              Connect to Shopify Store
            </h1>
            <p className={css.textDesc}>
              Installs the Chad widget in your Shopify store and sets
              it up to display your customers&#8217; order information
              and self-serve options.
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
            <button
              className={css.button}
              type="button"
              onClick={() => {}}
            >
              Connect store
            </button>
            <button
              className={css.noShopifyButton}
              type="button"
              onClick={() => {
                setConShopifyMenu(false);
              }}
            >
              I don&#8217;t use Shopify
            </button>
          </div>
        </section>
      </Fade>
      <Fade
        in={dontUseMenu === true}
        onExited={() => {
          setConShopifyMenu(true);
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={css.noShopofyContainer}>
          <DontUseShopify />
        </div>
      </Fade>
    </>
  );
}
