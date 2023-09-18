import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from "axios";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Navigation, FreeMode } from 'swiper/modules';
import HS from '../../css/home/homePage.module.css';


const ComingSoon = () => {

    const [slideData, setSlideData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:2407/filmlist/comingsoon")
            .then((res) => {
                setSlideData(res.data.slice(0, 10));
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);



    return (
        <>

            <div className={HS.bar}>
                <h1 className={HS.title}>即將上映 ::</h1>
                <Link to="/list/commingsoon"><h2 className={HS.more}>
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
                    spaceBetween={50}
                    freeMode={true}
                    navigation={true}
                    modules={[Navigation, FreeMode]}
                    className="ListSwiper"
                >

                    {slideData.map(filmPoster =>
                        <SwiperSlide className={HS.imgContainer}>
                            <img
                                className={HS.listSlide}
                                key={filmPoster.id}
                                src={filmPoster.imageUrl} alt=' ' />
                            <div className={HS.btnblock}>
                                <button className={HS.imgBtn} >立即訂票</button>
                                <Link to={`/info/${filmPoster.id}`}><button className={HS.imgBtn} >電影介紹</button></Link>
                            </div>

                        </SwiperSlide>
                    )}

                </Swiper>
            </div>

        </>
    );
}


export default ComingSoon;
