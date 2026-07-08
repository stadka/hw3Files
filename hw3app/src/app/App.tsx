import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SurveyProvider } from "./context/SurveyContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <SurveyProvider>
      <RouterProvider router={router} />
      <Toaster />
    </SurveyProvider>
  );
}
