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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<QuizzesPage />} />
      <Route path="/quizzes" element={<QuizzesPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/apply" element={<ApplicationPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
