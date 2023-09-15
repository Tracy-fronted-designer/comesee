import React, { useEffect, useState } from "react";
import axios from "axios";

import IS from '../../css/home/infoPage.module.css';
import TimeAccordion from './timeAccordion';

const TimeTabs = (props) => {

    const [showDate, setShowDate] = useState([]);

    const id = parseInt(props.id);

    // 指定電影的場次日期
    useEffect(() => {
        axios
            .get(`http://localhost:2407/filminfo/getdate/${id}`)
            .then((res) => {
                const modifiedData = res.data.map((item) => {
                    const date = (item.showtimeDate).split("-");
                    const month = parseInt(date[1]) - 1;

                    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
                    const dayOfWeek = new Date(date[0], month, date[2]).getDay();
                    const week = weekDays[dayOfWeek];
                    return {
                        month: date[1],
                        day: date[2],
                        week: week,
                    }
                });
                setShowDate(modifiedData);
                // console.log(showDate);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id]);



    return (

        <>

            <div className={`${IS.dateBox} d-box`}>

                {showDate.map((dateItem, index) => (
                    <span key={index}>
                        <input type="radio" name="date" id={index} className="btn-check" />
                        <label
                            for={index}
                            className={`${IS.dbtn} btn`}
                        >
                            <div className={IS.Date2}>{dateItem.week}</div>
                            <div className={IS.Date1}>{dateItem.day}</div>
                            <div className={IS.Date2}>{dateItem.month}</div>
                        </label>
                    </span>


                ))}


            </div>

            <div className={IS.theaterTime}>

                <TimeAccordion />

            </div>


        </>


    );
}




export default TimeTabs;