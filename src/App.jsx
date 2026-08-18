import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./Pages/PostDetails/PostDetails";
import Auth from "./Pages/Auth/AuthPage";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

const queryClient = new QueryClient();

function App() {
  const route = createBrowserRouter([
    {
      path: "/login",
      element: (
        <ProtectedAuth>
          <Auth />
        </ProtectedAuth>
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedAuth>
          <Auth />
        </ProtectedAuth>
      ),
    },

    {
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "PostDetails/:id",
              element: <PostDetails />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    }
  ]);

  return (
    <>
        <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
          <RouterProvider router={route} />
      </AuthContextProvider>
        </QueryClientProvider>
    </>
  );
}

export default App;
