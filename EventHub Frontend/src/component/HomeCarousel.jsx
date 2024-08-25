import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {events} from "../data/homeCrousel"
const responsive = {
    0: { items: 1 },

};
const items = events.map((item) => (
    <div key={item.name} className=' overflow-y-hidden max-h-[200px] sm:max-h-[600px] px-0 sm:px-10'>
        <img src={item.src} alt={item.name} className='h-max w-max mx-auto  object-scale-down object-center' />
    </div>
));

const HomeCarousel = () => (
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