import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import HS from '../../css/home/homePage.module.css';


class Recommend extends Component {

    state = {
        recommendedMovies: [
            { imageUrl: 'https://m.media-amazon.com/images/S/pv-target-images/f6bdf68830aa56d414529565bc7279d5a8e3d274a53c8914946cd9470b9443b8.jpg' },
            { imageUrl: 'https://m.media-amazon.com/images/S/pv-target-images/f6bdf68830aa56d414529565bc7279d5a8e3d274a53c8914946cd9470b9443b8.jpg' },
            { imageUrl: 'https://m.media-amazon.com/images/S/pv-target-images/f6bdf68830aa56d414529565bc7279d5a8e3d274a53c8914946cd9470b9443b8.jpg' },
            { imageUrl: 'https://m.media-amazon.com/images/S/pv-target-images/f6bdf68830aa56d414529565bc7279d5a8e3d274a53c8914946cd9470b9443b8.jpg' },
            { imageUrl: 'https://m.media-amazon.com/images/S/pv-target-images/f6bdf68830aa56d414529565bc7279d5a8e3d274a53c8914946cd9470b9443b8.jpg' },
            { imageUrl: 'https://m.media-amazon.com/images/S/pv-target-images/f6bdf68830aa56d414529565bc7279d5a8e3d274a53c8914946cd9470b9443b8.jpg' }
        ],
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
                    <div className={HS.Btext} style={{fontSize:"225px"}}>YOU MAY ALSO LIKE</div>
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
                                <span key={index}>
                                    <SwiperSlide>
                                        <Link to="/info">
                                            <img alt=' '
                                                className={HS.listSlide}
                                                src={filmPoster.imageUrl} />
                                        </Link>
                                    </SwiperSlide>
                                </span>
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
            const res = await axios.get(`http://localhost:2407/recommend/${this.context.state.movieID}`);
            // console.log(res); //object
            this.setState({ recommendedMovies: res.data }); //data 裡面是 array(電影資料)
        } catch (error) {
            console.error(error);
        }
    }
}

export default Recommend;
