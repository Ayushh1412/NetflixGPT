import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { RedirectSite } from "../utils/firebase";
import { lazy, Suspense } from "react";
import Error from "./Error";

const Browse = lazy(() => import("./Browse"));
const LoginPage = lazy(() => import("./LoginPage"));

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="bg-black h-screen w-screen text-white flex justify-center items-center">Loading...</div>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/Browse",
      element: (
        <Suspense fallback={<div className="bg-black h-screen w-screen text-white flex justify-center items-center">Loading...</div>}>
          <Browse />
        </Suspense>
      ),
    },
    {
      path: "/Error",
      element: <Error />,
    },
    {
      path: "/google55358cf2d45e2ace",
      element: <RedirectSite />,
    },
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default Body;
