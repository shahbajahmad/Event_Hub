import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {events} from "../data/homeCrousel"
const responsive = {
    0: { items: 1 },

};


const HomeCarousel = ({items}) => (
    <div className="mx-auto  ">
     
    <AliceCarousel
    
    responsive={responsive}
    items={items}
     disableButtonsControls
     autoPlay
     animationDuration={5000}
     infinite
    
    />
        </div>
);

export default HomeCarousel