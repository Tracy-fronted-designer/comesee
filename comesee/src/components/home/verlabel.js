import React, { Component } from 'react';

class VerLabel extends Component {

    state = {}

    verStyle = {
        width: "110px",
        height: "40px",

        borderRadius: "5px",
        backgroundColor: "#B6B995",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        color: "#F1EFE9",
        fontFamily: "Noto Sans TC",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "140%"
    }


    render() {

        var { label } = this.props;

        return (

            <div style={this.verStyle} >
                {label}
            </div>

        );
    }


}

export default VerLabel;