import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import HS from '../../css/home/homePage.module.css';

import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

class HomePageCover extends Component {

    state = {}

    render() {

        const Img1 = 'https://i0.wp.com/char.tw/wp-content/uploads/20181215040033_89.jpg?resize=1600%2C914';
        const Img2 = 'https://www.biosmonthly.com/storage/upload/ck_images/%E6%B5%B7%E7%9A%84%E5%BD%BC%E7%AB%AF(%E9%98%BF%E5%AC%A4%E7%89%88)%E6%A9%AB%E5%BC%8F.jpg';
        const Img3 = 'https://static-cse.canva.cn/blob/187386/8.jpg';

        return (
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                effect={'fade'}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade, Pagination]}
                className={HS.swiper}
            >
                <SwiperSlide className={HS.slide} ><img src={Img1} className={HS.Img} alt=' '/></SwiperSlide>
                <SwiperSlide className={HS.slide} ><img src={Img2} className={HS.Img} alt=' '/></SwiperSlide>
                <SwiperSlide className={HS.slide} ><img src={Img3} className={HS.Img} alt=' '/></SwiperSlide>
            </Swiper>
        );
    }
}

export default HomePageCover;