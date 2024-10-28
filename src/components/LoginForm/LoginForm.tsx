import css from "./LoginForm.module.css";
import icons from "../../images/icons.svg";
import useRealLoad from "../../helpers/realLoad";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface LoginFormProps {
  setPageOpen: (pageOpen: boolean) => void;
}

export default function LoginForm({ setPageOpen }: LoginFormProps) {
  const [hidePwd, setHidePwd] = useState<boolean>(false);
  const pwdVisibilityToggle = () => {
    setHidePwd(!hidePwd);
  };
  const realLoad = useRealLoad();

  interface LoginFormData {
    email: string;
    password: string;
  }
  const onSubmit = async ({ email, password }: LoginFormData) => {
    realLoad(true);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setPageOpen(false);
    } catch (e: unknown) {
      if (isErrorWithCode(e)) {
        if (e.code === "auth/invalid-credential") {
          return toast.error("Wrong password or email!");
        }
      }
      return toast.error(
        "Something went wrong! Please try again later"
      );
    } finally {
      realLoad(false);
    }
    function isErrorWithCode(e: unknown): e is { code: string } {
      return typeof e === "object" && e !== null && "code" in e;
    }
  };

  const schema = yup
    .object({
      email: yup.string().email("Must be a valid email").required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });
  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <ul className={css.inputList}>
        <li className={css.inputItem}>
          <label className={css.label}>
            Email
            <input
              className={css.input}
              placeholder="megachad@trychad.com"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <p className={css.errorMessage}>
              {errors.email.message}!
            </p>
          )}
        </li>

        <li className={css.inputItem}>
          <label className={css.label}>
            Password
            <input
              className={css.input}
              placeholder="Enter password"
              type={`${hidePwd ? "text" : "password"}`}
              {...register("password")}
            />
          </label>
          <svg className={css.eyeIcon} onClick={pwdVisibilityToggle}>
            <use
              href={
                hidePwd
                  ? `${icons}#icon-eye`
                  : `${icons}#icon-eye-off`
              }
            />
          </svg>
          {errors.password && (
            <p className={css.errorMessage}>Required!</p>
          )}
        </li>
      </ul>
      <div className={css.buttonsWrapper}>
        <button className={css.button} type="submit">
          Login
        </button>
        <span className={css.dontHaveAccText}>
          Don&#8217;t have an account?{" "}
          <NavLink className={css.dontHaveAccLink} to="/">
            Join the waitlist
          </NavLink>
        </span>
      </div>
    </form>
  );
}
