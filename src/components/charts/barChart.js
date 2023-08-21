import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';

const CustomLabel = props => {
    return (
      <g>
        {props.name === 'SAVED' && <BookmarkIcon color="secondary" height={20} width={20} x={-20} y={props.viewBox.y - 9}></BookmarkIcon>}
        {props.name === 'LIKES' && <FavoriteIcon color="primary" height={20} width={20} x={-20} y={props.viewBox.y - 9}></FavoriteIcon>}
        {props.name === 'PLAYS' && <image xlinkHref="plays-icon.png" height={20} width={20} x={-20} y={props.viewBox.y - 9} />}
        {props.name === 'COMMENTS' && <image style={{filter: "invert(94%) sepia(66%) saturate(7003%) hue-rotate(313deg) brightness(103%) contrast(100%)"}} xlinkHref="chat.png" height={20} width={20} x={-60} y={props.viewBox.y - 9} />}
        {props.name === 'SHARES' && <SendIcon className="inverted" color="primary" height={20} width={20} x={-30} y={props.viewBox.y - 9}></SendIcon>}

        <text x={props.xAxisLabelPosition ?? props.x} y={props.xAxisLabelPosition ? props.viewBox.y - 10 : props.viewBox.y + 11} fill={props.labelFontColor} >
          {props.value}{props.isPercentage ? '%' : ''}
        </text>
      </g>
    );
  };

  const CategoryTick = (props) => {
    const { x, y } = props;
    let value = props.payload.value
    if (value.includes(' ')) {
        let split = props.payload.value.split(' ');
        value = <><tspan textAnchor={props.textAnchor} x="0">{split[0]}</tspan><tspan textAnchor={props.textAnchor} x="0" dy="20">{split[1]}</tspan></>
    }
    return (
      <g>
        <text x={x} y={y}  textAnchor="end" fill={props.fontColor}>
        {value}
        </text>
      </g>
    );
 }

export const SimpleBarChart = ({ data, yKey, xKey, height, fontFillColor, xAxisLabelPosition, showXAxis = false, fontSize = 14, width = 400, backgroundFill = 'none', graphFill = '#f4b25a', textAnchor = "start", isPercentage = false}) => {
    return (
        <ResponsiveContainer width={width} height={height} debounce={1} >
            <BarChart layout="vertical" data={data} {...{
                overflow: 'visible'
            }} barGap={100} width={width}>
                {showXAxis && <CartesianGrid opacity={0.5} />}
                <XAxis hide type="number" />
                <YAxis interval={0} dataKey={xKey} type="category" tick={<CategoryTick fontColor={fontFillColor} textAnchor={textAnchor}/>} tickLine={false} axisLine={showXAxis} ></YAxis>
                <Tooltip />
                <Bar dataKey={yKey} fill={graphFill} label={xAxisLabelPosition ? <CustomLabel xAxisLabelPosition={xAxisLabelPosition} labelFontColor={fontFillColor} isPercentage={isPercentage}></CustomLabel> : {position: 'right', fill: fontFillColor, fontSize, formatter: (data) => {return isPercentage ? data + '%' : data }  }} barSize={15} background={{ fill: backgroundFill }} minPointSize={10} />
            </BarChart>
        </ResponsiveContainer>
    );
};
