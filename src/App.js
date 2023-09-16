import './App.css';
import Header from './layout/header';
import SideBar from './layout/sidebar';
import Users from './components/userInfo/users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StatsPage from './components/statsPage';
import InstagramInsightsPage from './components/instagramInsightsPage';
import { ListPage } from './components/listPage';

function App() {
  return (
    <div className="App">
      <div className='root-layout'>
        <div className='sidebar-root'>
          <SideBar></SideBar>
        </div>
        <div className='header-root'>
          <Header></Header>
        </div>
        <div className='page-layout'>
          <BrowserRouter>
          <Routes>
              <Route path="/" Component={Users}>
              </Route>
              <Route path="/stats" Component={StatsPage}>
              </Route>
              <Route path="/insta-insights" Component={InstagramInsightsPage}>
              </Route>
              <Route path="/post-list" Component={ListPage}>
              </Route>
              </Routes>
          </BrowserRouter>

        </div>
      </div>
    </div>
  );
}

export default App;
