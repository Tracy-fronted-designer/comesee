import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import HS from '../../css/home/homePage.module.css';

import TicketContext from "../../TicketContext";


class Recommend extends Component {

    static contextType = TicketContext //設定使用context

    state = {
        recommendedMovies: [],
    };

    render() {

        return (
            <>

                <div className={HS.bar}>
                    <div>
                        <h1 className={HS.title}>為您推薦 ::</h1>
                        <h5 className={HS.tips}>根據您喜歡的類型，您可能會喜歡</h5>
                    </div>
                </div>



                <div className={HS.box}>
                    <div className={HS.Btext} style={{ fontSize: "225px" }}>YOU MAY ALSO LIKE</div>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={50}
                        freeMode={true}
                        navigation={true}
                        modules={[Navigation, FreeMode]}
                        className="ListSwiper"
                    >

                        {this.state.recommendedMovies.map((filmPoster, index) => {
                            return (
                                <SwiperSlide className={HS.imgContainer}>
                                    <img
                                        key={index}
                                        className={HS.listSlide}
                                        src={filmPoster.imageUrl} alt=' ' />
                                    <div className={HS.btnblock}>
                                        <button className={HS.imgBtn} >立即訂票</button>
                                        <Link to={`/info/${filmPoster.id}`}><button className={HS.imgBtn} >電影介紹</button></Link>
                                    </div>
                                </SwiperSlide>
                            )
                        })}

                    </Swiper>
                </div>

            </>
        );
    }

    // 從後端拿到推薦電影
    async componentDidMount() {
        try {
            if (this.context.state.userID) {
                const res = await axios.get(`http://localhost:2407/recommend/home/${this.context.state.userID}`);
                console.log(res); //object
                this.setState({ recommendedMovies: res.data }); //data 裡面是 array(電影資料)
            } else {
                const res = await axios.get(`http://localhost:2407/recommend/home/1`);
                console.log('userID is not available yet.');
                this.setState({ recommendedMovies: res.data }); //data 裡面是 array(電影資料)
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default Recommend;
