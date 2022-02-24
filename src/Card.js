import React, {useState} from "react";
import './Card.css';
import { HiOutlineClock } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export function Card({ data }) {

  const [like, setLike] = useState(false);

  const clickLike = () => {
    setLike(!like);
  }

  return (
    <li className="li-card">
      <a className="button-base-card" target="_blank" href="https://bethesda.net/en/article/2RXxG1y000NWupPalzLblG/sunsetting-the-bethesda-net-launcher-and-migrating-to-steam">
        <div style={{padding: '0 0 0 26px'}}>
          <div className="card-time">
            <p ><HiOutlineClock style={{ height: '26px', width: '26px', color: '#979797' }}/></p>
            <p className="card-time-text">2 hours ago by author</p>
          </div>
          <div className="card-text">
            <p className="card-text-title">Sunsetting the Bethesda.net launcher and migrating to Steam</p>
          </div>
        </div>
      </a>
      <button className="like-button" onClick={clickLike}>
        { like ? <AiFillHeart style={{ height: '26px', width: '26px', color: '#dd0031' , margin: 'auto'}}/> : <AiOutlineHeart style={{ height: '26px', width: '26px', color: '#dd0031' , margin: 'auto'}}/>}
      </button>
    </li>
  );
}
