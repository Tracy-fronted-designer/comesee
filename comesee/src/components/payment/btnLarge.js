import React, { Component } from 'react';

class btnLargeActive extends Component {
    state = {}

    btnStyle = {
        width: "150px",
        height: "40px",
        borderRadius: "15px",
        border: "2px solid  #A6A79B",
        backgroundColor: "#B6B995",
        marginRight:"50px",

        color: "#F1EFE9",
        textAlign: "center",
        fontFamily: "Noto Sans TC",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "22.5px"
    }

    btnStyleActive = {
        backgroundColor: "#F1EFE9",
        color: "#A6A79B"

    }


    render() {
        var { label, isActive, onClick} = this.props;
        return (
            <button
                onClick={onClick}
                style={isActive ? {...this.btnStyle, ...this.btnStyleActive} : this.btnStyle}
            >
                {label}
            </button>
        );
    }
}

export default btnLargeActive;