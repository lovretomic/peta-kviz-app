import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import QuizzesPage from "../pages/QuizzesPage";
import ResultsPage from "../pages/ResultsPage";
import ApplicationPage from "../pages/ApplicationPage";
import TestPage from "../pages/TestPage";
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminHomePage from "../pages/AdminHomePage";
import AdminAllQuizzesPage from "../pages/AdminAllQuizzesPage";
import AdminNotFoundPage from "../pages/AdminNotFoundPage";
import AdminLeaguesPage from "../pages/AdminLeaguesPage";
import AdminLeagueQuizzesPage from "../pages/AdminLeagueQuizzesPage";
import AdminQuizPage from "../pages/AdminQuizPage";
import AdminQuizApplicationsPage from "../pages/AdminQuizApplicationsPage";
import AdminQuizSettingsPage from "../pages/AdminQuizSettingsPage";
import ApplicationForm from "../pages/ApplicationForm";
import UmraPage from "../pages/UmraPage";
import AdminPointsPage from "../pages/AdminPointsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/umra" element={<UmraPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<QuizzesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/application" element={<ApplicationPage />} />

        <Route path="/test" element={<TestPage />} />
      </Route>
      <Route path="/application/apply" element={<ApplicationForm />} />
      <Route path="/admin">
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="all-quizzes" element={<AdminAllQuizzesPage />} />
          <Route path="leagues">
            <Route index element={<AdminLeaguesPage />} />
            <Route path=":leagueId" element={<AdminLeagueQuizzesPage />} />
            <Route path=":leagueId/quizzes">
              <Route index element={<AdminLeagueQuizzesPage />} />
              <Route path=":quizId">
                <Route index element={<AdminQuizPage />} />
                <Route path="settings" element={<AdminQuizSettingsPage />} />
                <Route
                  path="applications"
                  element={<AdminQuizApplicationsPage />}
                />
                <Route path="points" element={<AdminPointsPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<AdminNotFoundPage />} />
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
