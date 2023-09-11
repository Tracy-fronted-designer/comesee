import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import HS from '../../css/home/homePage.module.css';


class ComingSoon extends Component {

    state = {
        movie: [

        ]
    }

    render() {

        const Img = 'https://s.yimg.com/ny/api/res/1.2/HM0VvYQbSiUijkEIxFNaJQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTk0OA--/https://media.zenfs.com/ko/mirrormedia.mg/153bbf3dd7a3ee6b68f94ca88253faee';

        return (
            <>
            
                <div className={HS.bar}>
                    <h1 className={HS.title}>即將上映 ::</h1>
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
                    <div className={HS.Btext}>COMING SOON</div>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        freeMode={true}
                        navigation={true}
                        modules={[Navigation, FreeMode]}
                        className="ListSwiper"
                    >

                        {
                            this.state.movie.map(filmPoster =>
                                <SwiperSlide>
                                    <Link to="/info">
                                        <img className={HS.listSlide}
                                            src={filmPoster.imageUrl} alt=' ' />
                                    </Link>
                                </SwiperSlide>

                            )
                        }

                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>
                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>
                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>
                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>
                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>
                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>
                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>
                        <SwiperSlide><Link to="/info"><img className={HS.listSlide} src={Img} alt=' ' /></Link></SwiperSlide>

                    </Swiper>
                </div>

            </>
        );
    }
}

export default ComingSoon;
