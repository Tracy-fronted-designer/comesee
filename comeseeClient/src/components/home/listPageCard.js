import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CardStyle from '../../css/home/listPageCard.module.css';
import ToastComponent from './like';

class ListPageCard extends Component {

    render() {
        return (
            <>
                <div className={`${CardStyle.film} card col-3`}>

                    <a href="/info"><img src={this.props.imageUrl} className={CardStyle.myImg} alt='' /></a>

                    <div className={CardStyle.myCard}>

                        <ToastComponent />

                        <h2 className={CardStyle.title}>{this.props.movieNameCN}</h2>
                        <p className={CardStyle.text}>{this.props.movieNameEN}</p>

                        <a className={CardStyle.myLink} href="/info">
                            <button className={CardStyle.cBtn}>立即購票</button>
                        </a>

                    </div>
                </div>
            </>
        );
    }
}

export default ListPageCard;