import css from "./ProgressBar.module.css";
import icons from "../../images/icons.svg";
import { useEffect, useRef, MutableRefObject } from "react";
import { Collapse } from "@mui/material";

interface ProgressBarProps {
  progress: number;
  realProgress: MutableRefObject<number>;
  setProgress: (number: number) => void;
}

export default function ProgressBar({
  progress,
  realProgress,
  setProgress,
}: ProgressBarProps) {
  const buttonsRef = useRef<boolean>(false);
  useEffect(() => {
    if (progress > 1) buttonsRef.current = true;
  }, [progress]);
  const isLeftButtonDis = progress === 1;
  const isRightButtonDis =
    progress === 4 || progress === realProgress.current;

  return (
    <div className={css.container}>
      Step {progress} of 4
      <div className={css.bar}>
        <div
          className={css.barProgress}
          style={{ width: `calc(25 * ${progress}%)` }}
        ></div>
      </div>
      <Collapse in={progress > 1 || buttonsRef.current}>
        <div className={css.pageButtons}>
          <button
            className={css.button}
            type="button"
            disabled={isLeftButtonDis}
            style={{
              cursor: isLeftButtonDis ? "unset" : "pointer",
              color: isLeftButtonDis ? "#C3CAD5" : "#4F637D",
            }}
            onClick={() => setProgress(progress - 1)}
          >
            <svg
              className={css.arrowIcon}
              style={{
                stroke: isLeftButtonDis ? "#C3CAD5" : "#4f637d",
              }}
            >
              <use href={`${icons}#icon-arrow`} />
            </svg>
            Prev
          </button>
          <button
            className={css.button}
            type="button"
            disabled={isRightButtonDis}
            style={{
              cursor: isRightButtonDis ? "unset" : "pointer",
              color: isRightButtonDis ? "#C3CAD5" : "#4F637D",
            }}
            onClick={() => setProgress(progress + 1)}
          >
            Next
            <svg
              className={css.arrowIcon}
              style={{
                rotate: "calc(180deg)",
                stroke: isRightButtonDis ? "#C3CAD5" : "#4f637d",
              }}
            >
              <use href={`${icons}#icon-arrow`} />
            </svg>
          </button>
        </div>
      </Collapse>
    </div>
  );
}
