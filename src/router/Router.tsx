import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import QuizzesPage from "../pages/QuizzesPage";
import LeaderboardPage from "../pages/LeaderboardPage";
import ApplicationPage from "../pages/ApplicationPage";
import TestPage from "../pages/TestPage";
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";
import AdminApplicationsPage from "../pages/AdminApplicationsPage";
import AdminLoginPage from "../pages/AdminLoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<QuizzesPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
      <Route path="/admin">
        <Route path="" element={<AdminLoginPage />} />
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route path="applications" element={<AdminApplicationsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
