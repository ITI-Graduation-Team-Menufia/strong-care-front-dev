import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { Main } from "./pages/Main";
import { useEffect } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useApi } from "./contexts/apiContext";
import { baseURL } from "./APIs/baseURL";
import jwtDecode from "jwt-decode";
import { withTranslation } from "react-i18next";
import i18next from "i18next";
import i18n from "./i18n";

function App() {
  const {
    loggedUserData, getResource, setLoggedUserData } = useApi();
  const textDirection = i18n.languages[0] === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    let fetch = async () => {
      if (localStorage.getItem("token")) {
        let userToken = localStorage.getItem("token");

        let decodedToken = jwtDecode(userToken);
        if (decodedToken && decodedToken.id) {
          const { id } = decodedToken;
          console.log(id);

          let res = await getResource(id, `${baseURL}users`);
          if (res) {
            console.log(res);
            setLoggedUserData(res?.data);
          }
        }
      }
    };
    fetch();
    if (localStorage.getItem('lng'))
      i18next.changeLanguage(localStorage.getItem('lng'))
  }, []);

  return (
    <div className="App" style={{ direction: textDirection }}>
      {console.log(loggedUserData)}
      <Routes>
        <Route
          path="/admindashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin", "compensationDepart", "insuranceRequestsDepart"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default withTranslation()(App);
