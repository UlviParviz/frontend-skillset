import { lazy, Suspense } from "react";

import { useAxiosLoader } from "./shared/hooks/use-axios-loader";
import Loading from "./shared/layouts/loading";
const Home = lazy(() => import("./pages/home"));

const App = () => {
  const { isLoading } = useAxiosLoader();

  return (
    <Suspense fallback={<Loading />}>
      {isLoading && <Loading />}
      <Home />
    </Suspense>
  );
};

export default App;
