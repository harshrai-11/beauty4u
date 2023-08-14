
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { SearchBar } from './searchBar';
import { AppLayout } from '../layout/app-layout';
import { ApiHeaders, userPageHeader } from '../utils.js/constant';
import InstagramIcon from '@mui/icons-material/Instagram';
import { INSTAGRAM_USER_INFO } from '../routes';
import axios from 'axios';
import { Grid } from '@mui/material';

export default function CardPage() {

    const [activeHeaderOption, setActiveHeaderOption] = React.useState('Instagram');
    const [userInfo, setUserInfo] = React.useState({});

    React.useEffect(() => {
        axios(INSTAGRAM_USER_INFO, ApiHeaders).then(userInfo => {
            if (userInfo.data.data) {
                const apiResponse = userInfo.data.data
                setUserInfo(apiResponse)
            }
        }).catch(err => {
            console.log('ERROR', err);
        })
    })

    const handleTabChange = (e) => {
        setActiveHeaderOption(e.target.textContent)
    }

    const goToStatsPage = () => {
        window.location.href = '/stats'
    }

    const leftDivChildren = () => {
        return <div className='card-page-layout'>

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
                    <Grid item md={4} xs={12}>
                        <Card className="card-detail">
                            <CardContent className='card-content'>
                                <div className='content-row'>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={userInfo.profile_picture_url}
                                        title="user"
                                        className='card-image'
                                    />
                                    <div>
                                        <Typography align='center' sx={{ fontSize: 16 }} color="white" gutterBottom>
                                           {userInfo.media_count}
                                        </Typography>
                                        <Typography align='center' sx={{ fontSize: 14 }} color="#6c7293" textTransform={'uppercase'} gutterBottom>
                                            Posts
                                        </Typography>
                                    </div>
                                    <div>
                                    <Typography align='center' sx={{ fontSize: 16 }} color="white" gutterBottom>
                                           {userInfo.follows_count}
                                        </Typography>
                                        <Typography align='center' sx={{ fontSize: 14 }} color="#6c7293" textTransform={'uppercase'} gutterBottom>
                                            Following
                                        </Typography>
                                    </div>
                                    <div>
                                    <Typography align='center' sx={{ fontSize: 16 }} color="white" gutterBottom>
                                           {userInfo.followers_count}
                                        </Typography>
                                        <Typography align='center' sx={{ fontSize: 14 }} color="#6c7293" textTransform={'uppercase'} gutterBottom>
                                            Followers
                                        </Typography>
                                    </div>
                                </div>
                                <Typography sx={{ fontSize: 16 }} color="white" align='left'>
                                    Dr. Mendeita Shorts
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="#6c7293" align='left'>
                                    Surgeon
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="#6c7293" align='left'>
                                    DM for more information
                                </Typography>
                            </CardContent>
                            <CardActions className='card-action'>
                                <Button className='user-card-action-button' variant='contained' size="medium" style={{backgroundColor: '#bbaf97'}} onClick={() => goToStatsPage()}>STATS</Button>
                                <Button className='user-card-action-button' variant='contained' size="medium" style={{backgroundColor: '#c5ae4e'}}>VIEW DMS</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>

        </div>
    }
    return (
        <AppLayout layoutId={2} leftHeaderData={userPageHeader} leftHeaderType={'navigation'} activeHeaderOption={activeHeaderOption} handleTabChange={handleTabChange} leftDivChildren={leftDivChildren()} showBreadCrumb={false}>

        </AppLayout>


    );
}
