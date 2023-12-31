import "./App.css";
import Header from "./layout/header";
import SideBar from "./layout/sidebar";
import Users from "./components/userInfo/users";
import { Route, Routes, useLocation } from "react-router-dom";
import StatsPage from "./components/statsPage";
import InstagramInsightsPage from "./components/instagramInsightsPage";
import { ListPage } from "./components/listPage";
import SignUp from "./components/signup";
import Login from "./components/login";
import ProtectedRoute from "./utils.js/protectedRoute";
import { Business } from "./components/business";
import AdsetsPerformance from "./components/adsetsPerformance";
import AdsPerformance from "./components/adsPerformance";
import Settings from "./components/settings";

function App() {
  //get current path
  const { pathname } = useLocation();

  let showSidebar = true;
  if ((pathname === "/signup") | (pathname === "/login")) {
    showSidebar = false;
  }

  return (
    <div className="App">
      <div className="root-layout">
        {showSidebar && (
          <>
            <div className="sidebar-root">
              <SideBar></SideBar>
            </div>

            <div className="header-root">
              <Header></Header>
            </div>
          </>
        )}

        <div className="page-layout">
          <Routes>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Users />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route
                path="/insta-insights"
                element={<InstagramInsightsPage />}
              />
              <Route path="/post-list" element={<ListPage />} />
              <Route path="/business/:type" element={<Business />} />
              <Route
                path="/business/:type/adsets-performance"
                element={<AdsetsPerformance />}
              />
              <Route
                path="/business/:type/ads-performance"
                element={<AdsPerformance />}
              />
              <Route path="/settings" element={<Settings />}></Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
