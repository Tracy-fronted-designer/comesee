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
                    <Link to="/list"><h2 className={HS.more}>
                        看更多
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            fill="currentColor"
                            className="bi bi-chevron-right"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                    </h2></Link>
                </div>



                <div className={HS.box}>
                    <div className={HS.Btext}>YOU MAY ALSO LIKE</div>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
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
