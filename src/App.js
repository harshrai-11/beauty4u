import './App.css';
import Header from './layout/header';
import SideBar from './layout/sidebar';
import CardPage from './components/cardPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StatsPage from './components/statsPage';

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
              <Route path="/" Component={CardPage}>
              </Route>
              <Route path="/stats" Component={StatsPage}>
              </Route>
              </Routes>
          </BrowserRouter>

        </div>
      </div>
    </div>
  );
}

export default App;
