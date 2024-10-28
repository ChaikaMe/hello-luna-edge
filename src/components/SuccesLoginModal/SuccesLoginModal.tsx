import css from "./SuccesLoginModal.module.css";
import icons from "../../images/icons.svg";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SuccesLoginModal() {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  const email = auth.currentUser?.email;
  return (
    <div className={css.container}>
      <svg className={css.icon}>
        <use href={`${icons}#icon-progress`} />
      </svg>
      <h3 className={css.title}>Use your desktop to access Chad</h3>
      <p className={css.text}>
        Chad doesn&#8217;t support mobile browsers. To access your
        dashboard, login from your laptop or desktop computer.
      </p>
      <button
        className={css.button}
        onClick={() => navigate("/hello")}
        type="button"
      >
        OK
      </button>
      <span className={css.emailSpan}>
        Not {email}?
        <button
          className={css.logOutButton}
          onClick={() => {
            logOut();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </span>
    </div>
  );
}
