import React, {useState} from "react";
import './App.css';
import clsx from "clsx";

function App() {
  const [tab, setTab] = useState(true);



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
      <div className="container-news">
        
      </div>
    </div>
  );
}

export default App;
