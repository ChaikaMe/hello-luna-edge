import { MenuItem, Select } from "@mui/material";
import icons from "../../images/icons.svg";
import css from "./DontUseShopify.module.css";
import { SVGProps, useState } from "react";
import toast from "react-hot-toast";

interface DontUseShopifyProps {
  setModalIndex: (ModalIndex: number) => void;
  setProgressOpen: (ProgressOpen: boolean) => void;
}

export default function DontUseShopify({
  setModalIndex,
  setProgressOpen,
}: DontUseShopifyProps) {
  const [platform, setPlatform] = useState<string>("");
  const CustomIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="16" height="16" fill="none" {...props}>
      <use href={`${icons}#icon-arrow-down`} />
    </svg>
  );

  const actuallyUseHandler = () => {
    setModalIndex(1);
    setProgressOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.textContainer}>
        <h1 className={css.title}>Don&#8217;t use Shopify?</h1>
        <span className={css.span}>
          Chad Beta is currently only available on Shopify.
          We&#8217;ll send you an email when Chad becomes available on
          your platform.
        </span>
      </div>
      <form className={css.form}>
        <label className={css.label}>
          Platform
          <Select
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            IconComponent={CustomIcon}
            placeholder="Select platform"
            fullWidth
            displayEmpty
            sx={{
              height: 45,
              backgroundColor: "#f8f9fc",
              borderRadius: "4px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
                outline: "transparent",
              },
              "& .MuiSelect-select": {
                color: platform ? "#030e16" : "#c3cad5",
                fontFamily: "var(--font-family)",
                letterSpacing: "-0.01em",
              },
            }}
          >
            <MenuItem value={""} disabled>
              Select platform
            </MenuItem>
            <MenuItem value={"Platform 1"}>Platform 1</MenuItem>
            <MenuItem value={"Platform 2"}>Platform 2</MenuItem>
          </Select>
        </label>
        <div className={css.buttonsContainer}>
          <button
            className={css.button}
            type="submit"
            onClick={(event) => {
              event.preventDefault();
              if (platform === "") {
                toast.error("Choose the platform.");
                return;
              }
              setModalIndex(0);
              setProgressOpen(false);
              setPlatform("");
            }}
          >
            Submit
          </button>
          <span className={css.haveShopifySpan}>
            Actually use Shopify?{" "}
            <button
              className={css.spanButton}
              onClick={actuallyUseHandler}
              type="button"
            >
              Connect
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
