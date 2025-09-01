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
import AdminQuizPage from "../pages/AdminQuizPage";
import AdminHomePage from "../pages/AdminHomePage";
import AdminAllQuizzesPage from "../pages/AdminAllQuizzesPage";

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
        <Route path="login" element={<AdminLoginPage />} />
        <Route path="all-quizzes" element={<AdminAllQuizzesPage />} />
        <Route path="quiz">
          <Route path=":id" element={<AdminQuizPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="" element={<AdminHomePage />} />
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
