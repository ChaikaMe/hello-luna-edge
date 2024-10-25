import { useEffect, useRef } from "react";
import css from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
  setProgress: (number: number) => void;
}

export default function ProgressBar({
  progress,
  setProgress,
}: ProgressBarProps) {
  const pageRef = useRef<boolean>(false);
  useEffect(() => {
    if (progress > 1) pageRef.current = true;
  }, [progress]);

  return (
    <div className={css.container}>
      Step {progress} of 4
      <div className={css.bar}>
        <div
          className={css.barProgress}
          style={{ width: `calc(25 * ${progress}%)` }}
        ></div>
      </div>
      {progress > 1 || pageRef.current ? (
        <div className={css.pageButtons}>
          <button
            className={css.button}
            type="button"
            onClick={() => setProgress(progress - 1)}
          >
            Prev
          </button>
          <button
            className={css.button}
            type="button"
            onClick={() => setProgress(progress + 1)}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
