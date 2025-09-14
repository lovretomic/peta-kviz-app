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
import ApplicationForm from "../pages/ApplicationForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />}>
        <Route path="/" element={<QuizzesPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/test" element={<TestPage />} />
      </Route>
      <Route path="/application/apply" element={<ApplicationForm />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
