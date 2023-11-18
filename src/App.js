import "./App.css";
import Header from "./layout/header";
import SideBar from "./layout/sidebar";
import Users from "./components/userInfo/users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StatsPage from "./components/statsPage";
import InstagramInsightsPage from "./components/instagramInsightsPage";
import { ListPage } from "./components/listPage";
import { AdsPage } from "./components/adsPage";
import SignUp from "./components/signup";
import Login from "./components/login";

//get current path
let path = window.location.href.split("/");
path = path[path.length - 1];

let showSidebar = true;
let test;
if ((path === "signup") | (path === "login")) {
  showSidebar = false;
}

function App() {
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
          <BrowserRouter>
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
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
