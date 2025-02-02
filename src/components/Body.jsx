import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import LoginPage from "./LoginPage";
import Error from "./Error";
import MoreInfoPage from "./MoreInfoPage"; // Import the new component
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { RedirectSite } from "../utils/firebase";

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
    },
    {
      path: "/google55358cf2d45e2ace", // New route for MoreInfoPage
      element: <RedirectSite />
    },

  
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default Body;
