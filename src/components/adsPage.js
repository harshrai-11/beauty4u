import { Card, CardContent, Checkbox, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { AppLayout } from '../layout/app-layout';
import { GET_ADS_INFO } from '../routes';
import { adPageHeader, ApiHeaders } from '../utils.js/constant';
import Switch from '@mui/material/Switch';

export const AdsPage = () => {

    const [adsData, setAdsData] = useState({})
    const [businessData, setBusinessData] = useState([])
    const [instagramAccounts, setInstagramAccounts] = useState([])
    const [activeHeaderOption, setActiveHeaderOption] = useState('Campaign')

    useEffect(() => {
        axios(GET_ADS_INFO, ApiHeaders).then(adsData => {
            if (adsData.data.data) {
                const data = adsData.data.data.data
                setAdsData(data)
                let businessData = []
                businessData.push({ header: 'AMOUNT SPENT', value: '$' + data.amount_spent }, { header: 'BUSINESS NAME', value: data.business_name }, { header: 'MINIMUM CAMPAIGN GROUP SPEND CAP', value: data.min_campaign_group_spend_cap }, { header: 'BALANCE', value: '$' + data.balance }, { header: 'BUSINESS CITY', value: data.business_city }, { header: 'BUSINESS COUNTRY CODE', value: data.business_country_code }, { header: 'BUSINESS STATE', value: 'Florida' }, { header: 'BUSINESS STREET', value: data.business_street })
                setBusinessData(businessData)
                setInstagramAccounts(data.instagram_accounts.data)
            }
        }).catch(err => {
            console.log('ERRROR!', err)
        })
    }, [])

    const getBusinessInfo = (header, value) => {
        return <><Typography align='left' style={{ fontSize: 14, margin: '20px 0 0', color: '#fff' }} gutterBottom>
            {header}
        </Typography>
            <div className='stats-observation-details'>
                <div className='details-text'>
                    <Typography align='left' style={{ fontSize: 16, fontWeight: '600', color: '#6EE6B8' }} gap={5}>
                        {value}
                    </Typography>
                </div>
            </div>
        </>
    }

    const handleTabChange = (e) => {
        setActiveHeaderOption(e.target.textContent)
    }

    const handleSort = (sortRow, sortType, rows) => {
        return rows.sort((rowA, rowB) => {
            if (sortType === 'desc') {
                return rowB - rowA
            } else {
                return rowA - rowB
            }
        });

    };

    const leftDivChildren = () => {
        return <div style={{ marginBottom: '20px' }}> <div className='stats-observation'>
            <Card className='stats-observation-card'>
                <CardContent>
                    {businessData.map((data, index) => {
                        return <div key={index}> {getBusinessInfo(data.header, data.value)}</div>
                    })}
                </CardContent>
            </Card>
        </div>
        </div>
    }

    const campaignAdRows = [
        { id: 1, off: true, campaign: 'C0-1', delivery: 50, bidStrategy: 'test', budget: '450$', reach: 250, attributionSetting: 'Test', results: '400$', impressions: '150003', costPerResult: '192$', engagementRateRanking: 'Average', conversionRateRanking: 'Average'},
        { id: 1, off: false, campaign: 'C0-2', delivery: 150, bidStrategy: 'test-1', budget: '4590$', reach: 25002, attributionSetting: 'Test-1', results: '4000$', impressions: '290008', costPerResult: '200$', engagementRateRanking: 'Good', conversionRateRanking: 'Average'},

      ];


    const campaignAdTableColumns = [
        {
          name: 'Off/on',
          selector: row => row.off,
          sortable: false,
          wrap: true,
          cell: (row, index, column, id) => <Switch size="medium" checked={row.off} color="secondary"></Switch>
        },
        {
          name: 'Campaign',
          selector: row => row.campaign,
          sortable: false,
        },
        {
          name: 'Delivery',
          selector: row => row.delivery,
          sortable: true,
          wrap: true
        },
        {
          name: 'Bid Strategy',
          selector: row => row.bidStrategy,
          sortable: false,
          wrap: true
        },
        {
          name: 'Budget',
          selector: row => row.budget,
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
          name: 'Attribution Setting',
          selector: row => row.attributionSetting,
          wrap: true
        },
        {
          name: 'Results',
          selector: row => row.results,
          sortable: true,
          wrap: true
        },
      ];

      const adSetsTableColumns = [
        {
          name: 'Off/on',
          selector: row => row.off,
          sortable: false,
          wrap: true,
          cell: (row, index, column, id) => <Switch size="medium" checked={row.off} color="secondary"></Switch>
        },
        {
          name: 'Ad Sets',
          selector: row => row.campaign,
          sortable: false,
        },
        {
          name: 'Delivery',
          selector: row => row.delivery,
          sortable: true,
          wrap: true
        },
        {
          name: 'Bid Strategy',
          selector: row => row.bidStrategy,
          sortable: false,
          wrap: true
        },
        {
          name: 'Budget',
          selector: row => row.budget,
          sortable: true,
          wrap: true
        },
        {
            name: 'Impressions',
            selector: row => row.impressions,
            sortable: true,
            wrap: true
          },
          {
            name: 'Cost per result',
            selector: row => row.costPerResult,
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
          name: 'Attribution Setting',
          selector: row => row.attributionSetting,
          wrap: true
        },
        {
          name: 'Results',
          selector: row => row.results,
          sortable: true,
          wrap: true
        },
      ];

      const adTableColumns = [
        {
          name: 'Off/on',
          selector: row => row.off,
          sortable: false,
          wrap: true,
          cell: (row, index, column, id) => <Switch size="medium" checked={row.off} color="secondary"></Switch>
        },
        {
          name: 'Ad Sets',
          selector: row => row.campaign,
          sortable: false,
        },
        {
          name: 'Delivery',
          selector: row => row.delivery,
          sortable: true,
          wrap: true
        },
        {
          name: 'Bid Strategy',
          selector: row => row.bidStrategy,
          sortable: false,
          wrap: true
        },
        {
          name: 'Budget',
          selector: row => row.budget,
          sortable: true,
          wrap: true
        },
        {
            name: 'Enagement Rate Ranking',
            selector: row => row.engagementRateRanking,
            sortable: false,
            wrap: true
          },
        {
            name: 'Conversion Rate Ranking',
            selector: row => row.conversionRateRanking,
            sortable: false,
            wrap: true
          },
          {
            name: 'Cost per result',
            selector: row => row.costPerResult,
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
          name: 'Attribution Setting',
          selector: row => row.attributionSetting,
          wrap: true
        },
        {
          name: 'Results',
          selector: row => row.results,
          sortable: true,
          wrap: true
        },
      ];

    const rightDivChildren = () => {
        let columns = campaignAdTableColumns
        let rows = campaignAdRows

        if (activeHeaderOption === 'Ads') {
            columns = adTableColumns
            rows = campaignAdRows
        } else if (activeHeaderOption === 'Ad Sets') {
            columns = adSetsTableColumns
            rows = campaignAdRows
        }
        
        return <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <DataTable
            columns={columns}
            data={rows}
            onSort={handleSort}
            fixedHeader
            responsive
            selectableRows
            selectableRowsComponent={Checkbox}
        />
        </Paper>
    }

    return <AppLayout layoutId={1} activeHeaderOption={activeHeaderOption} leftHeaderData={{ name: 'Business Data', socialMediaUsername: adsData?.business?.name || '' }} leftHeaderType={'username-display'} rightHeaderData={adPageHeader} rightHeaderType="navigation" handleTabChange={handleTabChange} leftDivChildren={leftDivChildren()} rightDivChildren={rightDivChildren()}></AppLayout>

}