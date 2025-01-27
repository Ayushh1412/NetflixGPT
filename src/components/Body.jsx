import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import LoginPage from "./LoginPage";
import Error from "./Error";
import MoreInfoPage from "./MoreInfoPage"; // Import the new component
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/Browse",
      element: <Browse />
    },
    {
      path: "/Error",
      element: <Error />
    },
    {
      path: "/MoreInfo", // New route for MoreInfoPage
      element: <MoreInfoPage />
    }
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default Body;
