import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";
import PrivateRoute from "../../pages/PrivateRoute/PrivateRoute";

const RegisterPage = lazy(
  () => import("../../pages/RegisterPage/RegisterPage")
);
const LoginPage = lazy(
  () => import("../../pages/LoginPage/LoginPage")
);
const HelloPage = lazy(
  () => import("../../pages/HelloPage/HelloPage")
);
const NotFoundPage = lazy(
  () => import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/hello"
          element={<PrivateRoute element={<HelloPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
