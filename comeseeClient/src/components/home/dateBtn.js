import React, { Component } from 'react';
import IS from '../../css/home/infoPage.module.css';


class DateBtn extends Component {

    render() {
        return (
            <>
                <input type="radio" name="date" id={this.props.id} className="btn-check" />
                <label
                    for={this.props.for}
                    className={`${IS.dbtn} btn`}
                >
                    <div className={IS.Date2}>星期二</div>
                    <div className={IS.Date1}>15</div>
                    <div className={IS.Date2}>8月</div>
                </label>
            </>
        );
    }
}

export default DateBtn;
