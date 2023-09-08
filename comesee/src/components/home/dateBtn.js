import React, { Component } from 'react';
import TAS from '../../css/home/timetabsComponent.module.css';

class DateBtn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onSelected: false,
        };

        this.Db = {
            width: "80px",
            height: "80px",
            borderRadius: "50px",
            border: "1.5px solid #F1EFE9",
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5px",
            color: "#F1EFE9",
            fontFamily: "'Lucida Sans Unicode', 'Noto Sans TC'",
            fontWeight: 600,
            textAlign: "center"
        };

        this.DbS = {
            color: "#2f2f2f",
            backgroundColor: "#F1EFE9",
        };
    }

    handleButtonClick = () => {
        this.setState((prevState) => ({
            onSelected: !prevState.onSelected,
        }));
    };

    render() {
        const { onSelected } = this.state;

        return (
            <>
                <button
                    className={TAS.dbtn}
                    onClick={this.handleButtonClick}
                    style={onSelected ? { ...this.Db, ...this.DbS } : this.Db}
                >
                    <div className={TAS.Date2}>星期二</div>
                    <div className={TAS.Date1}>15</div>
                    <div className={TAS.Date2}>8月</div>
                </button>
            </>
        );
    }
}

export default DateBtn;
