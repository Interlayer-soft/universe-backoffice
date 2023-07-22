import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/login/login";
import "./App.css";
import routes from "./constants/routes";
import DefaultLayout from "./components/Layout/defaultLaout";
import AdminManagement from "./components/pages/management-role-admin/management-admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={routes.HOME}
          element={<DefaultLayout> HomePage </DefaultLayout>}
        />
        <Route path={routes.LOGIN} element={<LoginPage />} />
        <Route
          path={routes.MANAGEMENTADMIN}
          element={
            <DefaultLayout>
              <AdminManagement />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
