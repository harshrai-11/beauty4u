import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import { INSTAGRAM_USER_INFO } from '../../routes';
import { ApiHeaders } from '../../utils.js/constant';

export const UserCard = ({ user, setShowLoader }) => {

    const [userInfo, setUserInfo] = React.useState({});

    React.useEffect(() => {
        axios(INSTAGRAM_USER_INFO(user.instagram_user_id), ApiHeaders).then(userInfo => {
            if (userInfo.data.data) {
                const apiResponse = userInfo.data.data
                setUserInfo(apiResponse)
            }
            setShowLoader(false)
        }).catch(err => {
            console.log('ERROR', err);
        })
    }, [user, setShowLoader])

    const goToRoute = (path) => {
        window.location.href = `/${path}?userId=${user.instagram_user_id}&userName=${user.page_name}&profilename=${user.instagram_user_name}`
    }

    return <Grid item md={4} xs={12}>
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
                    {user.page_name}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="#6c7293" align='left'>
                    Surgeon
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="#6c7293" align='left'>
                    DM for more information
                </Typography>
            </CardContent>
            <CardActions className='card-action'>
                {user.instagram_user_id === '17841404972239663' && <Button className='user-card-action-button' variant='contained' size="medium" style={{ backgroundColor: '#bbaf97' }} onClick={() => goToRoute('stats')}>STATS</Button>}
                <Button className='user-card-action-button' variant='contained' size="medium" style={{ backgroundColor: '#c5ae4e' }} onClick={() => goToRoute('insta-insights')}>FEED</Button>
                {user.instagram_user_id === '17841404972239663' && <Button className='user-card-action-button' variant='contained' size="medium" style={{ backgroundColor: '#bbaf97' }} onClick={() => goToRoute('post-list')}>POSTS LIST</Button>}
            </CardActions>
        </Card>

    </Grid>
}