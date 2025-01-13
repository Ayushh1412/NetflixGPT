import { createBrowserRouter } from "react-router-dom"
import Browse from "./Browse"
import LoginPage from "./LoginPage"
import { RouterProvider } from "react-router-dom"

const Body = () => {
  
      const appRouter = createBrowserRouter([
          {
            path:"/",
            element: <LoginPage/>
          },
          {
            path:"/browse",
            element: <Browse/>
          },
                  
      ])
  
  
    return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body