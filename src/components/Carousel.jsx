import {useState} from 'react';

const Carousel = ({user}) => {
    const images = user.images
    const [index, setIndex] = useState(0)
    function back(){
        if (index >= 1) setIndex(index-1) 
        if (index < 1) setIndex(images.length-1)
    }
    function forward(){
        if (index < images.length-1) setIndex(index+1)
        if (index===images.length-1) setIndex(0)
    }
    return (
        <div className='Carousel' style={{backgroundImage:`url(${images[index]})`}}>
            <button onClick={back}>◀️</button>
            <button onClick={forward}>▶️</button>
        </div>
    );
};

export default Carousel;