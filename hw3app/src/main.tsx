// Completed by Matt Courchaine and Satwik Tadikamalla
// This is the entry point for the React application. It renders the App component into the root element of the HTML.
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  