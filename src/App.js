import React, {useState} from "react";
import './App.css';
import clsx from "clsx";
import { Card } from "./Card";
import { LogoReact, LogoAngular, LogoVue } from "react-ionicons";

function App() {
  const [tab, setTab] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("Select your news");

  const openOption = () => {
    setIsOpen(true);
    document.querySelector('.input-select').classList.toggle('active');
  }

  const closeOption = () => {
    setTimeout(() => { 
      setIsOpen(false);
      document.querySelector('.input-select').classList.toggle('active');
    }, 100);
  }

  return (
    <div className="App">
      <div className='container-title'>
        <p className='title'>Hacker News</p>
      </div>
      <div className='tabs'>
        <button onClick={() => setTab(true)} className={clsx({
          'button-all-select': tab,
          'button-all': !tab
        })}>
          All
        </button>
        <button onClick={() => setTab(false)} className={clsx({
          'button-faves-select': !tab,
          'button-faves': tab
        })}>
          Faves
        </button>
      </div>

      <div className="input-select">
        <input spellcheck="false" type="text" id="select-news" value={selectValue} readonly onFocus={openOption} onBlur={closeOption}/>
        { isOpen ? 
          <div className="options-select">
            <div onClick={() => setSelectValue("React")}>
              <LogoReact color="#61dbfb" style={{marginRight: '12px'}}/>
              <p>React</p>
            </div>
            <div onClick={() => setSelectValue("Angular")}>
              <LogoAngular color="#dd1b16" style={{marginRight: '12px'}}/>
              <p>Angular</p>
            </div>
            <div onClick={() => setSelectValue("Vue")}>
              <LogoVue color="#42b883" style={{marginRight: '12px'}}/>
              <p>Vue</p>
            </div>
          </div>
          :
          null
        }
      </div>

      { tab ? 
        <div className="container-all">
          <ul className="ul-cards">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </ul>
        </div>
        :
        <div className="container-faves">
          <ul className="ul-cards">
            <Card like={true}/>
            <Card like={true}/>
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
