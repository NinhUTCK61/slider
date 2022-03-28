import { courseHistory } from "../data/course";
import { FaChevronRight, FaChevronLeft, FaQuoteRight } from "react-icons/fa";
import style from "../cssReview/review.module.scss";
import {useEffect, useState} from "react";

const Slider = ()=>{
    const [index, setIndex] = useState(0);
    const nextSlider = ()=>{
        setIndex((oldIndex)=>{
            let index = oldIndex + 1;
            if(index > courseHistory.length - 1)
            {
                index = 0;
            }
            return index;
        });
    }

    const prevSlider = ()=>{
        setIndex((oldIndex)=>{
            let index = oldIndex -1;
            if(index < 0)
            {
                index = courseHistory.length - 1;
            }
            return index;
        });
    }
    useEffect(()=>{
        const setTimeSlider = setInterval(()=>{
          setIndex((oldIndex)=>{
            let index = oldIndex + 1;
            if(index > courseHistory.length - 1)
            {
              index = 0;
            }
            return index;
          });
        },3000)
        return ()=>{
          clearInterval(setTimeSlider)
        }
    },[index])
    return(
        <div>
            <h1 className={style.heading}><span>/</span> Reviews</h1>
            <section>
            {
                courseHistory.map((person, indexContent)=>{
                const {imgSrc, name, content, hierarchy} = person;
                let position = style.next;
                if(index === indexContent)
                {
                    position = style.action;
                }
                else if(indexContent === index - 1 || 
                (index === 0 && indexContent === courseHistory.length - 1))
                {
                    position = style.prev;
                }
                return(
                    <div className = {position}>
                    <img src={imgSrc} className = {style.imgPer}/>
                    <h3 className={style.name}>{name}</h3>
                    <p className={style.hierarchy}>{hierarchy}</p>
                    <p className={style.contentPer}>{content}</p>
                    <p className={style.icon}><FaQuoteRight/></p>
                    </div>
                )
                })
            }
            <button onClick = {prevSlider}><FaChevronLeft/></button>
            <button onClick={nextSlider}><FaChevronRight/></button>
            </section>
        </div>
    )
}

export default Slider