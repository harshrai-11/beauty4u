import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_PER_MEDIA_INSIGHT } from '../../routes';
import { ApiHeaders } from '../../utils.js/constant';
import { isDesktop, isTablet } from '../../utils.js/helper';
import { SimpleBarChart } from './barChart';

export const MediaInsights = ({ mediaId, mediaType }) => {

    const mediaTypeValue = mediaType === 'REELS' ? 'reel' : 'feed';

    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        axios.get(GET_PER_MEDIA_INSIGHT(mediaTypeValue, mediaId), ApiHeaders).then((val => {
            if (val.data) {
                const insightResponse = val.data.data.data;
                let graphDataArr = [];
                insightResponse.forEach(item => {
                    graphDataArr.push({ name: item.title.toUpperCase(), pv: item.values[0].value });
                })
                setGraphData(graphDataArr)
            }
        }))
    }, [mediaId, mediaType])

    return <div className='media-insight-section-div'>
        <SimpleBarChart data={graphData} backgroundFill='#363D50' height={500} width={isDesktop() ? 700 : isTablet() ? 350 : 250} xKey="name" yKey="pv" fontFillColor={"#fff"} xAxisLabelPosition={isDesktop() ? 750 : 200} graphFill="#6de6b5" fontSize={16}></SimpleBarChart>
    </div>

}