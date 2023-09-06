import * as React from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { INSTAGRAM_FEED_DETAILS_LIST, UPDATE_TAG } from '../routes';
import { ApiHeaders, listReelsStatsItems, PostApiHeaders } from '../utils.js/constant';
import { Loader } from '../layout/loader';
import DataTable from 'react-data-table-component';
import { AppLayout } from '../layout/app-layout';
import { FormControl } from '@mui/base';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, TextField } from '@mui/material';
import { formatDate, getStatsNumberList } from '../utils.js/helper';

const goToLink = (url) => {
  window.location.href = url;
}

const ExpandedComponent = ({ data }) => {
  return <div style={{ display: 'flex', padding: '20px' }} className='expandable-row'>
    {/* <div className='divider' style={{ borderBottom: '1px solid #363D50', padding: '10px', margin: '10px' }}></div> */}
    {/* <div className='insta-active-row'>
      {data.media_product_type === 'FEED' && <img onClick={() => goToLink(data.permalink)} className='img-fluid' style={{ borderRadius: '0.25rem', width: '25%' }} src={data.media_url ?? '/Image_not_available.png'} alt='feed-large'></img>}
      {data.media_product_type === 'REELS' && <video width={'25%'} onClick={() => goToLink(data.permalink)} height="242" controls src={data.media_url ?? '/Image_not_available.png'} >
        <source src={data.media_url} type="video/mp4" />
      </video>}
    </div> */}
    {data.media_product_type === 'REELS' && <div className='right-body'>
      <div className='insta-active-picture-row'>
        {<video width='100%' height="242" controls src={data.media_url ?? '/Image_not_available.png'} >
          <source src={data.media_url} type="video/mp4" />
        </video>}
      </div>
      <div className='image-details-text'>
        <div className='post-caption'>
          <p style={{ color: '#fff', margin: 0, fontSize: '12px' }}>{data.caption}</p>
          <h6 className='date-heading'>POSTED ON {formatDate(data.timestamp)}</h6>
        </div>
        <div className='post-stats-amount'>
          {listReelsStatsItems.map((item, index) => {
            return <div key={index} className='post-stats-amount-item'>
              <div className='stats-icon'>{item.icon}</div>
              <div className='stats-type'>
                <p>{item.label}</p>
                <h4>{getStatsNumberList(data, item.id)}</h4>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>}
  </div>
}


export const ListPage = () => {

  const [feedResponse, setFeedResponse] = useState([]);
  const [nextPagination, setNextPagination] = useState('');
  const [previousPagination, setPreviousPagination] = useState('');
  // Loader State 
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  // const getUserInfo = () => [
  //   axios(INSTAGRAM_USER_INFO, ApiHeaders).then(userInfo => {
  //     if (userInfo.data.data) {
  //       const apiResponse = userInfo.data.data
  //       setUserInfo(apiResponse)
  //       setTotalRows(apiResponse.media_count)
  //     }
  //   }).catch(err => {
  //     console.log('ERROR', err);
  //   })
  // ]

  const getInstagramFeedDetails = (isFirstPage = false, cursorToken, beforeOrAfter) => {
    axios(INSTAGRAM_FEED_DETAILS_LIST(isFirstPage, cursorToken, beforeOrAfter), ApiHeaders).then(feedResponse => {
      if (feedResponse.data.data) {
        const apiResponse = feedResponse.data.data.data
        const finalResponse = []
        apiResponse.forEach(value => {
          value.reach = value.insights.data.filter(val => val.name === 'reach')[0]?.values[0]?.value ?? 'Not Available'
          value.image = <img style={{ borderRadius: '10px' }} src={value.thumbnail_url ?? value.media_url} height={50} width={50} alt={`${value.id}`}></img>
          value.date = new Date(value.timestamp).toDateString()
          finalResponse.push(value)

        })
        setShowLoader(false)
        setFeedResponse(finalResponse)
        setNextPagination(feedResponse.data.data.paging.cursors.after);
        setPreviousPagination(!isFirstPage ? feedResponse.data.data.paging.cursors.before : '');
      }
    }).catch(err => {
      console.log('ERROR', err);
    })
  }

  useEffect(() => {
    setShowLoader(true)
    // getUserInfo()
    getInstagramFeedDetails(true, '', '')
  }, []);

  const getData = (isNextOrPrevious) => {
    if (isNextOrPrevious === 'next') {
      setShowLoader(true)
      getInstagramFeedDetails(false, nextPagination, 'after');
    } else {
      setShowLoader(true)
      getInstagramFeedDetails(false, previousPagination, 'before');
    }
  }

  const handlePageChange = (isNextOrPrevious) => {
    if (isNextOrPrevious === 'next') {
      setCurrentPage(currentPage + 1)
      getData(isNextOrPrevious)
    } else {
      setCurrentPage(currentPage - 1)
      getData(isNextOrPrevious)
    }
  };

  const handleSort = (sortRow, sortType, rows) => {
    let key = 'like_count'
    if (sortRow.name === 'Comments') {
      key = 'comments_count'
    } else if (sortRow.name === 'Reach') {
      key = 'reach'
    }
    if (key !== 'reach') {
      return rows.sort((rowA, rowB) => {
        if (sortType === 'desc') {
          return rowB - rowA
        } else {
          return rowA - rowB
        }
      });
    }
  };



  const columns = [
    {
      name: 'Image',
      selector: row => row.image,
      sortable: false,
      wrap: true
    },
    {
      name: 'Caption',
      selector: row => row.caption,
      sortable: false,
    },
    {
      name: 'Type',
      selector: row => row.media_product_type,
      sortable: false,
      wrap: true
    },
    {
      name: 'Likes',
      selector: row => row.like_count,
      sortable: true,
      wrap: true
    },
    {
      name: 'Comments',
      selector: row => row.comments_count,
      sortable: true,
      wrap: true
    },
    {
      name: 'Reach',
      selector: row => row.reach,
      sortable: true,
      wrap: true
    },
    {
      name: 'Tag',
      selector: row => row.tag,
      wrap: true
    },
    {
      name: 'Date added',
      selector: row => row.date,
      sortable: false,
      wrap: true
    },
  ];

  const leftChild = () => {
    return <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {showLoader && <Loader></Loader>}
      <DataTable
        columns={columns}
        data={feedResponse}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        onSort={handleSort}
        fixedHeader
        responsive
      />
      <div className='table-footer' style={{ background: '#293346', padding: '20px' }}>
        <div className='feed-next-back-button'>
          {previousPagination !== '' && <Button className='feed-next-button-list' onClick={() => handlePageChange('previous')} variant='outlined' startIcon={<ArrowLeftIcon />}> Previous </Button>}
          {nextPagination !== '' && <Button className='feed-next-button-list' onClick={() => handlePageChange('next')} variant='outlined' endIcon={<ArrowRightIcon></ArrowRightIcon>}> Next </Button>}
        </div>
      </div>
    </Paper>
  }

  const listPageButtons = [{
    buttonLabel: 'Instagram',
    variant: 'contained'
  }]

  return (
    <AppLayout layoutId={2} leftDivChildren={leftChild()} leftHeaderType={'button-layout'} leftHeaderData={{ heading: '', buttons: listPageButtons }} className="list-class-buttons">

    </AppLayout>

  );
}