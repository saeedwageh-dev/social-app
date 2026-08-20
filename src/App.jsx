import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./Layout/Layout";

import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import PostDetails from "./Pages/PostDetails/PostDetails";

import Auth from "./Pages/Auth/AuthPage";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";

import { AuthContextProvider } from "./Context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";

import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";

const queryClient = new QueryClient();

function App() {
  
  const router = createBrowserRouter([
    // Authentication routes
    {
      path: "/login",
      element: (
        <ProtectedAuth>
          <Auth>
            <Login />
          </Auth>
        </ProtectedAuth>
      ),
    },

    {
      path: "/register",
      element: (
        <ProtectedAuth>
          <Auth>
            <Register />
          </Auth>
        </ProtectedAuth>
      ),
    },

    // Protected application routes
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
              path: "/profile",
              element: <Profile />,
            },
            {
              path: "/PostDetails/:id",
              element: <PostDetails />,
            },
          ],
        },
      ],
    },

    // 404
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path:"/change-password",
      element:<ChangePassword/>
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;