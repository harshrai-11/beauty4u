
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchBar } from './searchBar';
import { useNavigate } from "react-router-dom";

export default function CardPage() {

    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/stats`; 
        navigate(path);
      }

    return (
        <div className='card-page-layout'>
            <div className='top-buttons'>
                <Button style={{ backgroundColor: '#7cd985', color: 'black', fontWeight: 'bold', display: 'flex' }} variant="contained">INSTAGRAM</Button>
            </div>
            <div className='search-layout'>
            <div className='search-bar'>
                <SearchBar searchBarPlaceholder="SEARCH ACCOUNT"></SearchBar>
            </div>
            <div>
            <Button style={{ background: "radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)", color: 'white', fontWeight: 'bold', display: 'flex' }} variant="contained">Connect Instagram</Button>
            </div>
            </div>
            <Stack spacing={5} direction="row">
                <Card sx={{ width: 350 }} className="card-detail" style={{ color: 'white' }}>
                    <CardContent className='card-content'>
                        <div className='content-row'>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
                                title="green iguana"
                                className='card-image'
                            />
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="white" gutterBottom>
                                    24
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                    Posts
                                </Typography>
                            </div>
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="white" gutterBottom>
                                    42.4k
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                    Followers
                                </Typography>
                            </div>
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="white" gutterBottom>
                                    24
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                    Following
                                </Typography>
                            </div>
                        </div>
                        <Typography sx={{ fontSize: 14 }} color="white" align='left'>
                                    Dr. Mendeita Shorts
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} color="lightgrey" align='left'>
                                    Surgeon
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} color="lightgrey" align='left'>
                                    DM for more information
                                </Typography>
                    </CardContent>
                    <CardActions className='card-action'>
                        <Button variant='contained' size="mediunm" onClick={() => routeChange()} style={{ backgroundColor: '#87855b', color: 'black' }}>VIEW STATS</Button>
                        <Button variant='contained' size="medium" style={{ backgroundColor: '#c2bd59', color: 'black' }}>VIEW DMS</Button>
                        <MoreVertIcon></MoreVertIcon>
                    </CardActions>
                </Card>
                <Card sx={{ width: 350 }} className="card-detail" style={{ color: 'white' }}>
                    <CardContent className='card-content'>
                        <div className='content-row'>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="/doctor.jpeg"
                                title="green iguana"
                                className='card-image'
                            />
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="white" gutterBottom>
                                    24
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                    Posts
                                </Typography>
                            </div>
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="white" gutterBottom>
                                    42.4k
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                    Followers
                                </Typography>
                            </div>
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="white" gutterBottom>
                                    24
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
                                    Following
                                </Typography>
                            </div>
                        </div>
                        <Typography sx={{ fontSize: 14 }} color="white" align='left'>
                                    Dr. Mendeita Videos
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} color="lightgrey" align='left'>
                                    Surgeon
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} color="lightgrey" align='left'>
                                    DM for more information
                                </Typography>
                    </CardContent>
                    <CardActions className='card-action'>
                        <Button variant='contained' size="mediunm" style={{ backgroundColor: '#87855b', color: 'black' }} onClick={() => routeChange()}>VIEW STATS</Button>
                        <Button variant='contained' size="medium" style={{ backgroundColor: '#c2bd59', color: 'black' }}>VIEW DMS</Button>
                        <MoreVertIcon></MoreVertIcon>
                    </CardActions>
                </Card>
            </Stack>
        </div>

    );
}
