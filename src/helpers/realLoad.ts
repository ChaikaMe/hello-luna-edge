import { useDispatch } from "react-redux";
import { setLoading } from "../redux/helpers/slice";

export default function useRealLoad() {
  const dispatch = useDispatch();
  const setLoadingState = (isLoading: boolean) => {
    dispatch(setLoading(isLoading));
  };

  return setLoadingState;
}
