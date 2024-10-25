import css from "./Logo.module.css";
import icons from "../../images/icons.svg";

export default function Logo() {
  return (
    <div className={css.logo}>
      <svg className={css.icon}>
        <use href={`${icons}#icon-chad-logo`} />
      </svg>
      Chad
    </div>
  );
}
