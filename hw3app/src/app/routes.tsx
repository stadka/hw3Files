// Completed by Matt Courchaine and Satwik Tadikamalla
// Routes file helps define what path will load what component. In this we only have the
// Survey component and the survey list component page.
import { createBrowserRouter } from "react-router";
import { SurveyForm } from "./pages/SurveyForm";
import { SurveyList } from "./pages/SurveyList";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: SurveyForm },
      { path: "surveys", Component: SurveyList },
    ],
  },
]);
