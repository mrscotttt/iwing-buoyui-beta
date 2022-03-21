import React from "react";
import ReactTooltip from "react-tooltip";
import {Button,Overlay,Popover} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

const MyMarker = ({key,lat,lng,text,temp,day,time,battery,ec,accr,gyro,b,$hover}) => {
  return (
    <div className={$hover ? "circle hover" : "circle"}>
      <span className="circleText" data-tip data-for="registerTip">
        {text}
      </span>

      <ReactTooltip id="registerTip" place="top" effect="solid">
        <p>Buoy ID : {text}   <Icon.BatteryCharging/>{b}V.</p>
        <p>Day {day} Time {time}</p>
        <p>Location {lat}, {lng}</p>
        <p>Temperature : {temp}'c</p>
        <p>Turbidity   : {ec}ETU</p>
        <p>Accelero    : {accr}</p>
        <p>Gyroscope   : {gyro}</p>
      </ReactTooltip>
    </div>
  );
};

export default MyMarker;
