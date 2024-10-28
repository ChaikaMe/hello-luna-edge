import css from "./HelloPage.module.css";

export default function HelloPage() {
  return (
    <div className={css.container}>
      <div className={css.wraper}>
        <h1 className={css.title}>
          Hello Luna Edge, My name is Edvard.
        </h1>
      </div>
    </div>
  );
}
