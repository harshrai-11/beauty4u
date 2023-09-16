import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../layout/app-layout';
import { INSTAGRAM_FEED_DETAILS, UPDATE_TAG } from '../routes';
import { ApiHeaders, feedPageHeader, InstaInsightsbuttons, PostApiHeaders, postStatsItems } from '../utils.js/constant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { formatDate, getSearchParam, getStatsNumber } from '../utils.js/helper';
import { Card, CardContent, Button, FormControl, TextField } from '@mui/material';
import { ComponentHeader } from '../layout/componentHeader';
import { MediaInsights } from './charts/mediaInsights';
import { Loader } from '../layout/loader';

const InstagramInsightsPage = () => {

    const [feedResponse, setFeedResponse] = useState([]);
    const [nextPagination, setNextPagination] = useState('');
    const [previousPagination, setPreviousPagination] = useState('');

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const [currentActiveTab, setCurrentActiveTab] = useState('Post Stats');

    const [userName, setUserName] = useState('');

    // Loader State 
    const [showLoader, setShowLoader] = useState(false);

    const getInstagramFeedDetails = (url, isFirstPage = false) => {
        axios(url, ApiHeaders).then(feedResponse => {
            if (feedResponse.data.data) {
                const apiResponse = isFirstPage ? feedResponse.data.data.data.data : feedResponse.data.data
                setFeedResponse(apiResponse);
                setNextPagination(isFirstPage ? feedResponse.data.data.data.paging.next : feedResponse.data.paging.next);
                setPreviousPagination(isFirstPage ? feedResponse.data.data.data.paging.previous : feedResponse.data.paging.previous);
                setShowLoader(false)
            }
        }).catch(err => {
            console.log('ERROR', err);
            setShowLoader(false)
        })
    }

    const handleActiveImageChange = (index) => {
        setActiveImageIndex(index);
    }

    const handleTabChange = (e) => {
        setCurrentActiveTab(e.target.innerText);
    }


    const handlePagination = (paginationType) => {
        if (paginationType === 'next') {
            getInstagramFeedDetails(nextPagination)
        } else {
            getInstagramFeedDetails(previousPagination)
        }
    }

    const [inputText, setInputText] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')


    const leftDivChildren = () => {
        return feedResponse && <div className='posts-grid'>
            {feedResponse.length && feedResponse.map((value, index) => {
                return <div key={index} className='posts-grid-item' onClick={() => handleActiveImageChange(index)}>
                    <Link className={activeImageIndex === index ? 'active' : ''}>
                        <div className='posts-grid-image'>
                            <img className='img-fluid' src={value.thumbnail_url ? value.thumbnail_url : value.media_url} alt='feed'></img>
                        </div>
                        <div className='post-social-reach-icon'>
                            <p><FavoriteIcon></FavoriteIcon><br />{value.like_count}</p>
                            <p><ModeCommentIcon></ModeCommentIcon><br />{value.comments_count}</p>
                        </div>
                    </Link>
                </div>
            })}

            <div className='feed-next-back-button'>
                {previousPagination && previousPagination !== '' && <Button className='feed-next-button' onClick={() => handlePagination('previous')} variant='contained'> Previous </Button>}
                {nextPagination && nextPagination !== '' && <Button className='feed-next-button' onClick={() => handlePagination('next')} variant='contained'> Next </Button>}
            </div>
        </div>
    }

    const rightDivChildren = (data) => {
        if (data) {
            const handleSubmit = () => {
                if (inputText !== '') {
                    axios.post(UPDATE_TAG, { [data.id]: inputText }, PostApiHeaders).then(response => {
                        if (response.data.data) {
                            setMessage(response.data.data)
                            setError('')
                            setInputText('')
                            window.location.reload()
                        }
                    })
                } else {
                    setError('Please enter a value')
                    setMessage('')
                }
            }

            return <><div className='right-body'>
                <div className='insta-active-picture-row'>
                    {data.media_product_type === 'FEED' && <img className='img-fluid' style={{ borderRadius: '0.25rem' }} src={data.media_url ?? '/Image_not_available.png'} alt='feed-large'></img>}
                    {data.media_product_type === 'REELS' && <video width='100%' height="242" controls src={data.media_url ?? '/Image_not_available.png'} >
                        <source src={data.media_url} type="video/mp4" />
                    </video>}
                </div>
                <div className='image-details-text'>
                    <div className='post-caption'>
                        <p style={{ color: '#fff', margin: 0, fontSize: '12px' }}>{data.caption}</p>
                        <h6 className='date-heading'>POSTED ON {formatDate(data.timestamp)}</h6>
                    </div>
                    <div className='post-stats-amount'>
                        {postStatsItems.map((item, index) => {
                            return <div key={index} className='post-stats-amount-item'>
                                <div className='stats-icon'>{item.icon}</div>
                                <div className='stats-type'>
                                    <p>{item.label}</p>
                                    <h4>{getStatsNumber(data, item.id)}</h4>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
                <div className='right-body' style={{ paddingTop: '1.5rem', margin: 0 }}>
                    <Card className='stats-observation-card' sx={{ flex: '0 0 auto', width: '100%' }}>
                        <CardContent className='stats-observation-card-content'>
                            <div className='tag-input-div'>
                                <form noValidate autoComplete="off">
                                    <FormControl className='tag-input-form' sx={{ width: '25ch' }}>
                                        <TextField className='tag-input' helperText={error !== '' ? error : message !== '' ? message : ''} error={error !== '' ? true : false} id="standard-basic" variant='standard' label="Enter Tag" onChange={(event) => setInputText(event.target.value)} />
                                        <Button className='feed-next-button' variant='contained' onClick={handleSubmit}>Submit</Button>
                                    </FormControl>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                    <div className={`component-page-layout-header  navigation-3`}>
                        <ComponentHeader headerType="navigation" headerData={feedPageHeader} activeHeaderOption={currentActiveTab} handleTabChange={handleTabChange}></ComponentHeader>
                    </div>
                    {currentActiveTab === 'Post Stats' && <MediaInsights mediaId={data.id} mediaType={data.media_product_type}></MediaInsights>}
                </div>
            </>
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShowLoader(true)
            const userId = getSearchParam('userId')
            const userName = getSearchParam('userName')
            setUserName(userName)
            getInstagramFeedDetails(INSTAGRAM_FEED_DETAILS(userId), true)
        }
    }, []);

    return (
        <> {showLoader && <Loader></Loader>}
            <AppLayout layoutId={1} leftHeaderData={{ name: userName, socialMediaUsername: feedResponse ? feedResponse[0]?.username : '' }} leftHeaderType={'username-display'} rightHeaderType={'button-layout'} rightHeaderData={{ heading: 'Post Insights', buttons: InstaInsightsbuttons }} leftDivChildren={leftDivChildren()} rightDivChildren={rightDivChildren(feedResponse ? feedResponse[activeImageIndex] : undefined)}></AppLayout>
        </>
    );
};

export default InstagramInsightsPage;
