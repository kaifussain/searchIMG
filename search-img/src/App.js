import "./App.css";
import appLogo from "./resources/appLogo.png";
import searchIcon from "./resources/searchIcon.png";
import noProfile from "./resources/NoProfile.png";
import {useEffect, useState} from 'react';

function App() {
  const [darkMode, setDarkMode]= useState(true);
  const [userMode, setUserMode]= useState(false);
  let localM=JSON.parse(localStorage.getItem('localM'));

  useEffect(()=>{
    if(!localM){
      document.body.classList.add('lMode');
      setDarkMode(false);
    }
  },[])

  function toggleDarkMode(){
    setDarkMode(!darkMode);
    document.body.classList.toggle('lMode',darkMode);
    localStorage.setItem('localM',JSON.stringify(!darkMode));
    console.log("toggle ke baad: "+localStorage.getItem('localM'))
  }
  
  return (
    <div>
      <div id="headDiv">
        <img src={appLogo} id="logoImg"></img>
        <form id="searchForm" >
          <input
            type="text"
            id="searchInput"
            placeholder="Search for an image"
          ></input>
          <button id="searchBtn" >
            <img src={searchIcon} className={darkMode? '':'lMode'}></img>
          </button>
        </form>

        <div id="toggleDarkMode" onClick={toggleDarkMode} className={darkMode? "":"lMode"}>
          <div className={darkMode? "DarkMode" : "LightMode"}></div>
        </div>

        <div id="userDiv" >
          <img src={noProfile} onClick={()=>{
            setUserMode(!userMode);
           
          }}></img>
          <div id="userDataDiv" className={`userDiv ${userMode ? "" : "userDivHide"} ${darkMode ? "" : "lMode"}`}>
            <div id="user" >
            <img src={noProfile}></img>
            <div id="userName">Kaif Hussain</div>
            </div>
            <div id="userPrefDiv">
              <div>Your Preferences</div>
              <div>None</div>
            </div>
            <div id="favImagesDiv">
              <div>Favorite Images</div>
              <div>None</div>
            </div>
          </div>
        </div>
      </div>
      <div id="suggestionDiv">
        <span>Suggestions: </span>
        <div className="suggestionItem">3D render</div>
        <div className="suggestionItem">school</div>
        <div className="suggestionItem">tokyo</div>
        <div className="suggestionItem">AI art</div>
      </div>
      <div id="searchResultDiv">
        <div id="searchResultTitle" className="fromLeftAni">
          Images related: <span id="searchResultTitleName">Phone</span>
        </div>
        <div id="searchResultImgDiv">
          <img
            className="searchResultImg"
            src="https://th.bing.com/th?id=ORMS.11fd23d81b42eef6304e7b0dc8b14c59&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.5537500381469727&p=0"
            alt=":("
          ></img>
          <img
            className="searchResultImg"
            src="https://th.bing.com/th?id=ORMS.11fd23d81b42eef6304e7b0dc8b14c59&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.5537500381469727&p=0"
            alt=":("
          ></img>
          <img
            className="searchResultImg"
            src="https://th.bing.com/th?id=ORMS.11fd23d81b42eef6304e7b0dc8b14c59&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.5537500381469727&p=0"
            alt=":("
          ></img>
          <img
            className="searchResultImg"
            src="https://th.bing.com/th?id=ORMS.11fd23d81b42eef6304e7b0dc8b14c59&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1.5537500381469727&p=0"
            alt=":("
          ></img>
        </div>
      </div>
    </div>
  );
}

export default App;
