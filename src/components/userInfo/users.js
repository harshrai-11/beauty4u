
import * as React from 'react';
import Button from '@mui/material/Button';
import { SearchBar } from '../searchBar';
import { ApiHeaders, userPageHeader } from '../../utils.js/constant';
import InstagramIcon from '@mui/icons-material/Instagram';
import { GET_USER_LIST } from '../../routes';
import axios from 'axios';
import { Grid } from '@mui/material';
import { AppLayoutWrapper } from '../../layout/AppLayoutWrapper';
import { UserCard } from './userCard';
import { Loader } from '../../layout/loader';

export default function Users() {

    const [activeHeaderOption, setActiveHeaderOption] = React.useState('Instagram');
    const [userList, setUserList] = React.useState([]);
    // Loader State 
    const [showLoader, setShowLoader] = React.useState(false);

    React.useEffect(() => {
        setShowLoader(true)
        axios(GET_USER_LIST, ApiHeaders).then(userList => {
            if (userList.data.data) {
                setUserList(userList.data.data)
            }
        }).catch(err => {
            console.log('ERRROR!', err)
        })
    }, [])

    const handleTabChange = (e) => {
        setActiveHeaderOption(e.target.textContent)
    }

    return (
        <AppLayoutWrapper layoutId={2} headerData={userPageHeader} headerType="navigation" activeHeaderOption={activeHeaderOption} handleTabChange={handleTabChange}>
            {showLoader && <Loader></Loader>}
            <div className='card-page-layout'>
                <div className='search-layout'>
                    <div className='search-bar'>
                        <SearchBar searchBarPlaceholder="SEARCH ACCOUNT"></SearchBar>
                    </div>
                    <div>
                        <Button className='connect-instagram' variant="contained"><InstagramIcon />CONNECT INSTAGRAM</Button>
                    </div>
                </div>
                <div className='right-body'>
                    <Grid spacing={2} container>
                        {userList.length && userList.map((user, index) => {
                            return <UserCard user={user} key={index} setShowLoader={setShowLoader}></UserCard>
                        })}
                    </Grid>
                </div>
            </div>
        </AppLayoutWrapper>
    );
}
