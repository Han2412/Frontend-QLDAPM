import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routesConfig from "./routes/routesConfig.jsx";
import LoadingSpinner from "./components/LoadingSpiner.jsx";

function App() {
  const element = useRoutes(routesConfig);

  return <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>;
}

export default App;
