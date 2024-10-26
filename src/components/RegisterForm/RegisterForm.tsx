import css from "./RegisterForm.module.css";
import { useState, MutableRefObject } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import icons from "../../images/icons.svg";
import { auth } from "../../firebase";
import { NavLink } from "react-router-dom";

interface RegisterFormProps {
  setProgress: (number: number) => void;
  realProgress: MutableRefObject<number>;
}

export default function RegisterForm({
  setProgress,
  realProgress,
}: RegisterFormProps) {
  const [hidePwd, setHidePwd] = useState<boolean>(false);

  interface RegisterFormData {
    name: string;
    email: string;
    password: string;
  }

  const pwdVisibilityToggle = () => {
    setHidePwd(!hidePwd);
  };

  const onSubmit = async ({
    name,
    email,
    password,
  }: RegisterFormData) => {
    try {
      const userCredential =
        await auth.createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: name,
        });
      }
      setProgress(2);
      realProgress.current = 2;
    } catch (e: unknown) {
      if (isErrorWithCode(e)) {
        if (e.code === "auth/email-already-in-use") {
          return toast.error("This email is already in use!");
        }
      }
      return toast.error(
        "Something went wrong! Please try again later"
      );
    }
    function isErrorWithCode(e: unknown): e is { code: string } {
      return typeof e === "object" && e !== null && "code" in e;
    }
  };

  const schema = yup
    .object({
      name: yup
        .string()
        .min(3, "Must be at least 3 characters long")
        .required(),
      email: yup.string().email("Must be a valid email").required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });
  return (
    <section className={css.section}>
      <div className={css.text}>
        <h1 className={css.textTitle}>Welcome to Chad</h1>
        <p className={css.textDesc}>
          Go live in 10 minutes! Our self-service widget empowers your
          customers to manage orders and track shipments 24/7 without
          driving you crazy.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <ul className={css.inputList}>
          <li className={css.inputItem}>
            <label className={css.label}>
              Email
              <input
                className={css.input}
                placeholder="megachad@trychad.com"
                {...register("email")}
                disabled={realProgress.current >= 2}
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
              Your name
              <input
                className={css.input}
                placeholder="Mega Chad"
                {...register("name")}
                autoComplete="off"
                disabled={realProgress.current >= 2}
              />
            </label>
            {errors.name && (
              <p className={css.errorMessage}>
                {errors.name.message}!
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
                disabled={realProgress.current >= 2}
              />
            </label>
            <svg
              className={css.eyeIcon}
              onClick={pwdVisibilityToggle}
            >
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
        <button
          className={css.button}
          type="submit"
          disabled={realProgress.current >= 2}
          style={{
            backgroundColor:
              realProgress.current >= 2 ? "transparent" : "#32abf2",
            color: realProgress.current >= 2 ? "#32abf2" : "#fff",
          }}
        >
          {realProgress.current >= 2
            ? "You created an account"
            : "Create account"}
        </button>
      </form>
      <span className={css.loginText}>
        Already have an account?{" "}
        <NavLink className={css.loginLink} to="/login">
          Login
        </NavLink>
      </span>
    </section>
  );
}
