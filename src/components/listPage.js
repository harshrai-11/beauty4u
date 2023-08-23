import * as React from 'react';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { GET_PER_MEDIA_INSIGHT, INSTAGRAM_FEED_DETAILS, INSTAGRAM_USER_INFO } from '../routes';
import { ApiHeaders } from '../utils.js/constant';
import { Loader } from '../layout/loader';
import DataTable from 'react-data-table-component';
import { AppLayout } from '../layout/app-layout';

const goToLink = (url) => {
  window.location.href = url;
}

const ExpandedComponent = ({ data }) => <div style={{ display: 'flex', padding: '20px' }} className='insta-active-picture-row'>
  {data.media_product_type === 'FEED' && <img onClick={() => goToLink(data.permalink)} className='img-fluid' style={{ borderRadius: '0.25rem' }} src={data.media_url ?? '/Image_not_available.png'} alt='feed-large'></img>}
  {data.media_product_type === 'REELS' && <video onClick={() => goToLink(data.permalink)} width='100%' height="242" controls src={data.media_url ?? '/Image_not_available.png'} >
    <source src={data.media_url} type="video/mp4" />
  </video>}
</div>


export const ListPage = () => {

  const [feedResponse, setFeedResponse] = useState([]);
  const [nextPagination, setNextPagination] = useState('');
  const [previousPagination, setPreviousPagination] = useState('');
  // Loader State 
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = React.useState({});
  const [totalRows, setTotalRows] = React.useState();
  const [changePage, setChangePage] = useState(false);

  const getUserInfo = () => [
    axios(INSTAGRAM_USER_INFO, ApiHeaders).then(userInfo => {
      if (userInfo.data.data) {
        const apiResponse = userInfo.data.data
        setUserInfo(apiResponse)
        setTotalRows(apiResponse.media_count)
      }
    }).catch(err => {
      console.log('ERROR', err);
    })
  ]

  const getInstagramFeedDetails = (url, isFirstPage = false) => {
    axios(url, ApiHeaders).then(feedResponse => {
      if (feedResponse.data.data) {
        const apiResponse = isFirstPage ? feedResponse.data.data.data : feedResponse.data.data
        const finalResponse = []
        apiResponse.forEach(value => {
          axios.get(GET_PER_MEDIA_INSIGHT(value.media_product_type === 'REELS' ? 'reel' : 'feed', value.id), ApiHeaders).then((val => {
            if (val.data) {
              value.reach = val.data.data.data.filter(val => val.name === 'reach')[0].values[0].value
              value.image = <img style={{ borderRadius: '10px' }} src={value.thumbnail_url ?? value.media_url} height={50} width={50} alt={`${value.id}`}></img>
              value.date = new Date(value.timestamp).toDateString()
              finalResponse.push(value)
            }
          })).catch(err => {
            value.reach = 'Not available'
            value.image = <img src={value.thumbnail_url ?? value.media_url} height={40} width={40} alt={`${value.id}`}></img>
            finalResponse.push(value)
          })
        })
        setTimeout(() => {
          if (finalResponse.length === 25) {
            setShowLoader(false)
            console.log('all loaded')
            setFeedResponse(finalResponse)
          }
        }, 10000)
        setNextPagination(isFirstPage ? feedResponse.data.data.paging.next : feedResponse.data.paging.next);
        setPreviousPagination(isFirstPage ? feedResponse.data.data.paging.previous : feedResponse.data.paging.previous);
      }
    }).catch(err => {
      console.log('ERROR', err);
    })
  }

  useEffect(() => {
    setShowLoader(true)
    getUserInfo()
    getInstagramFeedDetails(INSTAGRAM_FEED_DETAILS, true)
  }, []);

  const getData = (page) => {
    if (page > currentPage) {
      setShowLoader(true)
      getInstagramFeedDetails(nextPagination);
    } else {
      setShowLoader(true)
      getInstagramFeedDetails(previousPagination);
    }
  }

  const handlePageChange = page => {
      console.log('hahhahahha', page, currentPage)
      getData(page)
      setCurrentPage(page)
  };

  const handleSort = (rows, selector, direction) => {
    console.log('hahahahaaheeryhisdhso', rows, selector, direction)
    return rows.sort((rowA, rowB) => {
      // use the selector function to resolve your field names by passing the sort comparitors
      const aField = selector(rowA)
      const bField = selector(rowB)
    
      let comparison = 0;
    
      if (aField > bField) {
       comparison = 1;
      } else if (aField < bField) {
       comparison = -1;
      }
    
      return direction === 'desc' ? comparison * -1 : comparison;
     });
    };
  
  

  const columns = [
    {
      name: 'Image',
      selector: row => row.image,
      sortable: false,
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
    },
    {
      name: 'Likes',
      selector: row => row.like_count,
      sortable: true,
    },
    {
      name: 'Comments',
      selector: row => row.comments_count,
      sortable: true,
    },
    {
      name: 'Reach',
      selector: row => row.reach,
      sortable: true,
    },
    {
      name: 'Date added',
      selector: row => row.date,
      sortable: false,
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
      pagination
      paginationTotalRows={totalRows}
      onChangePage={handlePageChange}
      noRowsPerPage={true}
      paginationRowsPerPageOptions={[25]}
      paginationPerPage={25}
      paginationIconFirstPage={<></>}
      paginationIconLastPage={<></>}
paginationServer      
fixedHeader
      responsive
      defaultSortFieldId={1}
      sortFunction={handleSort}
    />
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