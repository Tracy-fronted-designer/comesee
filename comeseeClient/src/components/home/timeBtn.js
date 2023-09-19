import React, { Component } from 'react';

class TimeBtn extends Component {

    state = {}

    verStyle = {
        width: "110px",
        height: "40px",

        border: "1.5px solid #F1EFE9",
        borderRadius: "5px",
        backgroundColor: "rgba(0, 0, 0, 0.0)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        color: "#F1EFE9",
        fontFamily: "Noto Sans TC",
        fontSize: "22px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "140%"
    }

    render() {

        var { id, label } = this.props;

        return (

            <button id={id} style={this.verStyle}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#checkModal"
            >
                {label}
            </button>

        );
    }
}

export default TimeBtn;