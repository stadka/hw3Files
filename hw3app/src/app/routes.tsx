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
