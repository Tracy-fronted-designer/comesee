import React, { Component } from 'react';

class SortBtn extends Component {

    state = {}

    btnStyle = {
        width: "70px",
        height: "30px",

        border: "2px solid #B6B995",
        borderRadius: "15px",
        backgroundColor: "rgba(0,0,0,0.0)",

        color: "#B6B995",
        fontFamily: "Noto Sans TC",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "25px",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"flex-end"
    }

    btnStyleHover = {
        color: "#F1EFE9",
        border:"none",
        backgroundColor: "#B6B995"
    }


    render() {
        var { label, onClick } = this.props;
        var { isHovered } = this.state;
        return (
            <button
                onClick={onClick}
                style={isHovered ? {...this.btnStyle, ...this.btnStyleHover} : this.btnStyle}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
            >
                {label}
            </button>
        );
    }

    mouseEnter = () => {
        this.setState({ isHovered: true });
    };

    mouseLeave = () => {
        this.setState({ isHovered: false });
    };
}

export default SortBtn;