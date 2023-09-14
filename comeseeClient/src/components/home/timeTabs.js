import React, { useEffect, useState } from "react";
import axios from "axios";

import DateBtn from './dateBtn';
import IS from '../../css/home/infoPage.module.css';
import TimeAccordion from './timeAccordion';

const TimeTabs = () => {

    const [locationData, setLocationData] = useState([]);



    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCinema, setSelectedCinema] = useState("");

    // 選地區 > 地區值篩選影城
    // 選日期 > 日期篩選時間
    // 後端抓取抓地區選項 預設值: 北區
    // 地區:
    // 地區選擇事件處理:
    function handleLocationChange(e) {
        setSelectedLocation(e.target.value);
    };
    
    // 









    return (

        <>

            <select className={IS.mySelect}
                value={selectedLocation}
                onChange={handleLocationChange}
            >
                <option value="">地區</option>
                {/* map options */}
                {locationData.map((orderItem, index) => (
                    <option key={index} value={orderItem.cinemaID}>
                        {orderItem.locationData}
                    </option>
                ))}

            </select>

            <div className={`${IS.dateBox} d-box`}>
                <DateBtn id={1} for={1}/>
                <DateBtn id={2} for={2}/>

                {/* <DateBtn /><DateBtn /><DateBtn /><DateBtn /> */}

            </div>

            <div className={IS.theaterTime}>

                <TimeAccordion />

            </div>


        </>


    );
}




export default TimeTabs;