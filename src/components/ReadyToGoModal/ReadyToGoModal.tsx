import css from "./ReadyToGoModal.module.css";
import icons from "../../images/icons.svg";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ReadyToGoModal() {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
    navigate("/login");
  };
  return (
    <div className={css.container}>
      <svg className={css.icon}>
        <use href={`${icons}#icon-progress`} />
      </svg>
      <h3 className={css.title}>You&#8217;re ready to go!</h3>
      <p className={css.text}>
        Chad doesn&#8217;t support mobile browsers. To access your
        dashboard, login from your laptop or desktop computer.
      </p>
      <button
        className={css.button}
        onClick={() => logOut()}
        type="button"
      >
        OK
      </button>
    </div>
  );
}
