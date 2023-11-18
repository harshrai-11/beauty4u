import "./App.css";
import Header from "./layout/header";
import SideBar from "./layout/sidebar";
import Users from "./components/userInfo/users";
import { Route, Routes, useLocation } from "react-router-dom";
import StatsPage from "./components/statsPage";
import InstagramInsightsPage from "./components/instagramInsightsPage";
import { ListPage } from "./components/listPage";
import { AdsPage } from "./components/adsPage";
import SignUp from "./components/signup";
import Login from "./components/login";

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
            <Route path="/signup" Component={SignUp}></Route>
            <Route path="/login" Component={Login}></Route>
            <Route path="/" Component={Users}></Route>
            <Route path="/stats" Component={StatsPage}></Route>
            <Route
              path="/insta-insights"
              Component={InstagramInsightsPage}
            ></Route>
            <Route path="/post-list" Component={ListPage}></Route>
            <Route path="/business" Component={AdsPage}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
