import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CardStyle from '../../css/home/listPageCard.module.css';
import ToastComponent from './like';


class ListPageCard extends Component {

    render() {

        // useEffect(() => {
            
        //     async function getproductDetail() {
        //         if (pid) {
        //             const urlapi = ""
        //             const response = await fetch(urlapi)
        //             const res = await response.json()
        //             const productItem = res.productDetail[0]
        //             setDetailProduct(productItem)
        //         }
        //     }

        //     getproductDetail()
        // }, [pid, router.isReady])



        const Img = 'https://www.mirrormedia.com.tw/assets/images/20230106145836-8de54a94bc2dc4af5762bc3aef823a1e-tablet.jpg';

        return (

            <div className={`${CardStyle.film} card col-3`}>
                <a href="/info"><img src={Img} className={CardStyle.myImg} alt='' /></a>
                <div className={CardStyle.myCard}>

                    <ToastComponent />

                    <h2 className={CardStyle.title}>電影名稱{ }</h2>
                    <p className={CardStyle.text}>電影英文名稱{ }</p>
                    <a className={CardStyle.myLink} href="/info">
                        <button className={CardStyle.cBtn}>立即購票</button>
                    </a>

                </div>
            </div>

        );
    }
}



export default ListPageCard;