import React, { Component } from 'react';

class BtnMovie extends Component {
    state = {
        isClicked: false, // Add a state to track the click
    };

    handleClick = () => {
        // Toggle the isClicked state when the button is clicked
        this.setState((prevState) => ({
            isClicked: !prevState.isClicked,
        }));
    };

    render() {
        var { label } = this.props;
        return (
            <button
                onClick={this.handleClick}
                style={{
                    width: "100px",
                    height: "35px",
                    borderRadius: "15px",
                    border: "transparent",
                    backgroundColor: this.state.isClicked ? "#F1EFE9" : "#A6A79B", // Set the initial color based on state
                    color: this.state.isClicked ? "#A6A79B" : "#F1EFE9", // Set the initial text color based on state        textAlign: "center",
                    textAlign: "center",
                    fontFamily: "Noto Sans TC",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "22.5px",
                    margin: "5px",
                }}
            >
                {label}
            </button>
        );
    }

}

export default BtnMovie;