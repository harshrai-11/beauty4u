import React, { useState } from 'react';
import {List, Drawer } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const SideBar = (props) => {
 
    const routeChange = (path) =>{  
        window.location.href = path;
      }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const sideBarList = [{
        icon: <HomeOutlinedIcon color='white'/>,
        label: 'Home',
        path: '/'
    }, {
        icon: <PeopleOutlineOutlinedIcon/>,
        label: 'Feed',
        path: '/insta-insights'
    }, {
        icon: <BarChartOutlinedIcon/>,
        label: 'Stats',
        path: '/stats'
    }, {
        icon: <CalendarMonthOutlinedIcon/>,
        label: 'Schedule'
    }, {
        icon: <LocalPhoneOutlinedIcon/>,
        label: 'Leads'
    }]
return (
    <React.Fragment>
    <MenuIcon onClick={() => setIsSidebarOpen(!isSidebarOpen)}></MenuIcon>

      <Drawer
          anchor="left"
          variant="permanent"
          className='sidebar'
        >
          <List className='sidebar-list'>
            {sideBarList.map((value, index) => {
                 return <div className='sidebar-list-item' onClick={() => routeChange(value.path)} key={index}>
                    {value.icon}
                    {value.label}
                </div>})
            }
          </List>
      </Drawer>
    </React.Fragment>
   )
}
export default SideBar;