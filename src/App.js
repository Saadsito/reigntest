import React, {useState, useRef, useCallback} from "react";
import './App.css';
import clsx from "clsx";
import { Card } from "./Card";
import { LogoReact, LogoAngular, LogoVue } from "react-ionicons";
import useSearch from "./useSearch";

function App() {
  const [tab, setTab] = useState(true);
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("Select your news");
  const [cardFave, setCardFave] = useState([]);

  //values ​​obtained from useSearch
  const {
    news,
    hasMore,
    loading
  } = useSearch(query, pageNumber)

  // "observer" and "lastNewElementRef" used they are used to have control of when the user reaches the end of the page to show more results, so an infinite scroll is given
  const observer = useRef(); 
  const lastNewElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // function that is called when the select is in "onFocus"
  const openOption = () => {
    setIsOpen(true);
    document.querySelector('.input-select').classList.toggle('active');
  }

  // function that is called when the select is in "onBlur"
  const closeOption = () => {
    setTimeout(() => { 
      setIsOpen(false);
      document.querySelector('.input-select').classList.toggle('active');
    }, 100);
  }

  // function that is called when the user clicks on the "React" option in the select
  const clickReact = () => {
    setSelectValue('React');
    setQuery('reactjs');
    setPageNumber(0);
  }

  // function that is called when the user clicks on the "Angular" option in the select
  const clickAngular = () => {
    setSelectValue('Angular');
    setQuery('angular');
    setPageNumber(0);
  }

  // function that is called when the user clicks on the "Vue" option in the select
  const clickVue = () => {
    setSelectValue('Vue');
    setQuery('vuejs');
    setPageNumber(0);
  }

  // function that checks if the card is in the "cardFave" array to show the like button as liked or not
  const isLike = (data) => {
    if (cardFave.indexOf(data) < 0) {
      return false;
    }
    else {
      return true;
    }
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
          My faves
        </button>
      </div>

      { tab ? 
        <div className="container-all">
          <div className="input-select">
            <input spellCheck="false" type="text" id="select-news" value={selectValue} readOnly onFocus={openOption} onBlur={closeOption}/>
            { isOpen ? 
              <div className="options-select">
                <div onClick={clickReact}>
                  <LogoReact color="#61dbfb" style={{marginRight: '12px'}}/>
                  <p>React</p>
                </div>
                <div onClick={clickAngular}>
                  <LogoAngular color="#dd1b16" style={{marginRight: '12px'}}/>
                  <p>Angular</p>
                </div>
                <div onClick={clickVue}>
                  <LogoVue color="#42b883" style={{marginRight: '12px'}}/>
                  <p>Vue</p>
                </div>
              </div>
              :
              null
            }
          </div>
          <ul className="ul-cards">
            {
              news && news.map((data) => (
                data.filter((n)=>{
                  if(n.author !== null && n.story_title !== null && n.story_url !== null && n.created_at !== null){
                    return n
                  }
                }).map((n, index) => {
                  return <Card key={index} liked={isLike(n)} inRef={lastNewElementRef} cardFave={cardFave} setCardFave={setCardFave} data={n}/>
                })
              ))
            }
          </ul>
          <div>{loading && 'Loading...'}</div>
        </div>
        :
        <div className="container-faves">
          <ul className="ul-cards">
            {
              cardFave && cardFave.map((data, i) => {
                return <Card key={i} fav liked cardFave={cardFave} setCardFave={setCardFave} data={data}/>
              })
            }
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
