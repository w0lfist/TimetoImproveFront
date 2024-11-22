import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import SingIn from "./pages/Sing in";
import Terms from "./pages/terms_and_conditions";
import CreateTags from "./pages/create tags";
import BegginerFbRoutine from "./pages/begginerFbRoutine";
import IntermediateFBRoutine from "./pages/intermediateFbRoutine";
import AdvanceFbRoutine from "./pages/advanceFbRoutine";
import AccountSettings from "./pages/acountsettings";
import LoadingScreen from "./components/loadingScreen";
import LearningTraining from "./pages/learningTraining";

function AppRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true); // Para controlar la primera carga
  const location = useLocation();

  const pathsWithLoading = [
    "/dashboard",
    "/create-tags",
    "/routines/fullbody/beginner",
    "/routines/fullbody/intermediate",
    "/routines/fullbody/advance",
  ];

  // Función para determinar si mostrar la pantalla de carga
  const shouldShowLoadingScreen = () => {
    // Si es la primera carga de la aplicación, mostrar pantalla de carga
    if (initialLoad) return true;
    // Mostrar solo en rutas específicas
    return pathsWithLoading.some((path) => location.pathname.startsWith(path));
  };

  useEffect(() => {
    if (shouldShowLoadingScreen()) {
      setIsLoading(true);
      const handleLoad = () => {
        setTimeout(() => {
          setIsLoading(false);
          setInitialLoad(false); // Marcar primera carga como completada
        }, 2000); // Duración mínima de 3 segundos
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
      }

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, [location]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/new" element={<SingIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-tags" element={<CreateTags />} />
          <Route path="/terminos-y-condiciones" element={<Terms />} />
          <Route
            path="/routines/fullbody/beginner/:routineName"
            element={<BegginerFbRoutine />}
          />
          <Route
            path="/routines/fullbody/intermediate/:routineName"
            element={<IntermediateFBRoutine />}
          />
          <Route
            path="/routines/fullbody/advance/:routineName"
            element={<AdvanceFbRoutine />}
          />
          <Route path="/user/settings" element={<AccountSettings />} />
          <Route path="/aprende-a-entrenar" element={<LearningTraining />} />
        </Routes>
      )}
    </>
  );
}

export default AppRoutes;
