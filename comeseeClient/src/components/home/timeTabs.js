import React, { Component } from 'react';

import DateBtn from './dateBtn';
import IS from '../../css/home/infoPage.module.css';
import TimeAccordion from './timeAccordion';

class TimeTabs extends Component {

    state = {}

    render() {

        return (

            <>

                <select className={IS.mySelect}>
                    <option selected>地區</option>
                    <option value="1">北區</option>
                    <option value="2">桃竹苗</option>
                    <option value="3">中區</option>
                    <option value="4">南區及離島</option>
                </select>

                <div className={IS.dateBox}>
                    <DateBtn /><DateBtn /><DateBtn /><DateBtn /><DateBtn />
                </div>

                <div className={IS.theaterTime}>

                    <TimeAccordion />

                </div>


            </>


        );
    }


}

export default TimeTabs;