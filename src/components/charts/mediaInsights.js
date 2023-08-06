import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_PER_MEDIA_INSIGHT } from '../../routes';
import { SimpleBarChart } from './barChart';

export const MediaInsights = ({ mediaId, mediaType }) => {

    const mediaTypeValue = mediaType === 'REELS' ? 'reel' : 'feed';

    const [leftGraphData, setLeftGraphData] = useState([]);
    const [rightGraphData, setRightGraphData] = useState([]);

    useEffect(() => {
        axios.get(GET_PER_MEDIA_INSIGHT(mediaTypeValue, mediaId), {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then((val => {
            if (val.data) {
                const insightResponse = val.data.data.data;
                let graphDataArr = [];
                insightResponse.forEach(item => {
                    graphDataArr.push({ name: item.title, pv: item.values[0].value });
                })
                setLeftGraphData(graphDataArr.slice(0, graphDataArr.length / 2))
                setRightGraphData(graphDataArr.slice(graphDataArr.length / 2, graphDataArr.length));
            }
        }))
    }, [mediaId, mediaType])

    return <div className='media-insight-section-div'>
        <SimpleBarChart data={leftGraphData} backgroundFill='#363D50' height={500} width={300} xKey="name" yKey="pv" fontFillColor={"#fff"} labelPosition="right" fontFill='#fff' graphFill="#6de6b5"></SimpleBarChart>
        <SimpleBarChart data={rightGraphData} backgroundFill='#363D50' height={500} width={300} xKey="name" yKey="pv" fontFillColor={"#fff"} labelPosition="right" fontFill='#fff' graphFill="#6de6b5"></SimpleBarChart>
    </div>

}