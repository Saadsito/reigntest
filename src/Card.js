import React, {useState} from "react";
import './Card.css';
import { HiOutlineClock } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export function Card({ data , inRef , setCardFave, cardFave, liked, fav}) {

  const [like, setLike] = useState(liked);

  //This function is called when the user clicks the like button on a card
  const clickLike = () => {
    setLike(!like);
    if(!like){
      setCardFave( [...cardFave, data])
    }
    else if(like){
      const dataDelete = [...cardFave];
      const index = cardFave.indexOf(data);
      dataDelete.splice(index, 1);
      if (index === 0 && fav) {
        setLike(true);
      }
      setCardFave(dataDelete);
    }
  }

  //function that returns how long ago the news was created
  function timeSince(date) {

    var seconds = date / 1000;
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + " year";
      }
      return Math.floor(interval) + " years";
    }
    interval = seconds * 31536000;
    interval = seconds / 2592000;
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + " month";
      }
      return Math.floor(interval) + " months";
    }
    interval = seconds * 2592000;
    interval = seconds / 86400;
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + " day";
      }
      return Math.floor(interval) + " days";
    }
    interval = seconds * 86400;
    interval = seconds / 3600;
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + " hour";
      }
      return Math.floor(interval) + " hours";
    }
    interval = seconds * 3600;
    interval = seconds / 60;
    if (interval > 1) {
      if (Math.floor(interval) === 1) {
        return Math.floor(interval) + " minute";
      }
      return Math.floor(interval) + " minutes";
    }
    interval = seconds * 60;
    return Math.floor(seconds) + " seconds";
  }

  return (
    <li className="li-card" ref={inRef}>
      <a className="button-base-card" target="_blank" href={data.story_url}>
        <div style={{padding: '0 0 0 26px'}}>
          <div className="card-time">
            <p ><HiOutlineClock style={{ height: '26px', width: '26px', color: '#979797' }}/></p>
            <p className="card-time-text">{timeSince(new Date(Date.now()).getTime() - new Date(data.created_at).getTime())} ago by {data.author}</p>
          </div>
          <div className="card-text">
            <p className="card-text-title">{data.story_title}</p>
          </div>
        </div>
      </a>
      <button className="like-button" onClick={clickLike}>
        { like ? <AiFillHeart style={{ height: '26px', width: '26px', color: '#dd0031' , margin: 'auto'}}/> : <AiOutlineHeart style={{ height: '26px', width: '26px', color: '#dd0031' , margin: 'auto'}}/>}
      </button>
    </li>
  );
}
