import React, { Component } from 'react';

class btnLargeActive extends Component {
    state = {}

    btnStyle = {
        width: "150px",
        height: "40px",
        borderRadius: "15px",
        border: "2px solid  #A6A79B",
        backgroundColor: "#F1EFE9",
        marginRight: "50px",

        color: "#727366",
        textAlign: "center",
        fontFamily: "Noto Sans TC",
        fontSize: "20px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "22.5px"
    }

    btnStyleActive = {
        backgroundColor: "#727366",
        color: "#F1EFE9",

    }


    render() {
        var { label, isActive, onClick } = this.props;
        return (
            <button
                onClick={onClick}
                style={isActive ? { ...this.btnStyle, ...this.btnStyleActive } : this.btnStyle}
            >
                {label}
            </button>
        );
    }
}

export default btnLargeActive;