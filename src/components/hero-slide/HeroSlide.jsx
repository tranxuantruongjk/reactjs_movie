import React from "react";

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'

import Button, {OutlineButton} from '../button/Button'

import tmdbApi, {category, movieType} from '../../api/tmdbApi'
import apiConfig from "../../api/apiConfig";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import './hero-slide.scss';

const HeroSlide = () =>  {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(0, 4));
                console.log(response.results);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    },[])

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}   
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                // <img src={apiConfig.originImage(item.backdrop_path)} alt=''/>
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    ) 
}

const HeroSlideItem = props => {
    let history = useNavigate();
    const item = props.item;
    const background = apiConfig.originImage(item.bachdrop_path ? item.backdrop_path : item.poster_path);

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        > 
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__contnent__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => history.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={() => console.log('trailer')}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__contnent__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} />
                </div>
            </div>
        </div>
    )
}

export default HeroSlide;
