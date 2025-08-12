import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAxiosLoader = () => {
  const { loading, detailsLoading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const isLoading = loading || detailsLoading;
  const hasError = Boolean(error);

  return { isLoading, hasError };
};