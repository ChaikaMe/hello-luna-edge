import { useDispatch } from "react-redux";
import { setLoading } from "../redux/helpers/slice";

export default function useFakeLoad() {
  const dispatch = useDispatch();

  const fakeLoad = (
    callback: (arg: boolean) => void,
    boolean: boolean
  ) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      if (callback) {
        callback(boolean);
      }
    }, 500);
  };

  return fakeLoad;
}
