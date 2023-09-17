import { Card, CardContent, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AppLayout } from '../layout/app-layout';
import { GET_ADS_INFO } from '../routes';
import { ApiHeaders } from '../utils.js/constant';
import { UserCard } from './userInfo/userCard';

export const AdsPage = () => {

    const [adsData, setAdsData] = useState({})
    const [businessData, setBusinessData] = useState([])
    const [instagramAccounts, setInstagramAccounts] = useState([])

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

    const rightDivChildren = () => {
        return <div className='insta-account-details' style={{padding: '30px'}}> {instagramAccounts.map((account, index) => {
            const userInfo = {
                followers_count: account.followed_by_count,
                follows_count: account.follow_count,
                id: account.id,
                media_count: account.media_count,
                profile_picture_url: account.profile_pic,
                page_name: account.username
            }
            return <UserCard user={userInfo} key={index}></UserCard>
        })}
        </div>
    }

    return <AppLayout layoutId={1} leftHeaderData={{ name: 'Business Data', socialMediaUsername: adsData?.business?.name || '' }} leftHeaderType={'username-display'} leftDivChildren={leftDivChildren()} rightDivChildren={rightDivChildren()}></AppLayout>

}