import "./App.css";
import appLogo from "./resources/appLogo.png";
import searchIcon from "./resources/searchIcon.png";
import noProfile from "./resources/NoProfile.png";
import deletePng from "./resources/delete.png";
import { useEffect, useState, useRef } from "react";
import ImageC from "./Components/ImageC";
import SelectedImg from "./Components/SelectedImg";

function App() {
  console.log("app start");
  const [darkMode, setDarkMode] = useState(true);
  const [userMode, setUserMode] = useState(false);
  const [imgSubj, setImgSubj] = useState("");
  const [page, setPage] = useState(1);
  const [newInput, setNewInput] = useState("");
  const [fetchedImgs, setFetchedImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchNew, setSearchNew] = useState(true);
  const searchResultImgDiv = useRef(null);
  const [scrollDown, setScrollDown] = useState(false);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [selectedImgId, setSelectedImgId] = useState('');
  const [selectedImgDownload, setSelectedImgDownload] = useState('');
  const [selectedBool, setSelectedBool] = useState(false);
  // const [favImgs, setFavImgs] = useState([]);
  // const [favImgsId, setFavImgsId] = useState([]);
  const [favImgs, setFavImgs] = useState({});


  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${imgSubj}&client_id=${process.env.REACT_APP_API_KEY}`;


  const handleScroll = () => {
        let myDiv = searchResultImgDiv.current;
        let isScrolledToBottom = myDiv.scrollTop + myDiv.clientHeight > myDiv.scrollHeight - 200;
        
        if (isScrolledToBottom && !scrollDown) {
          setScrollDown(true);
        } else if (!isScrolledToBottom && scrollDown) {
          setScrollDown(false);
        }
        console.log("handleScroll ran ->"+scrollDown)
  };
      
  //get from local storage
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("localM"))) {
      document.body.classList.add("lMode");
      setDarkMode(false);
    }

    const storedFavImages = JSON.parse(localStorage.getItem("localFavImgs")) || {};
    setFavImgs(storedFavImages);
  }, []);
 
  


  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("lMode", darkMode);
    localStorage.setItem("localM", JSON.stringify(!darkMode));
  }

  async function fetchImgs() {
    if (searchNew) {
      setFetchedImgs([]);
    }
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();

    setFetchedImgs(prev => [...prev,...data.results]);
    console.log("fechImgs");
    setLoading(false);
    setScrollDown(false)

  }
  function handleSubmit(e) {
    e.preventDefault();
    if (newInput.trim() !== "") {
      setPage(1);
      setSearchNew(true);
      setImgSubj(newInput);
      setNewInput("");
    }
  }

  useEffect(() => {

    if (imgSubj !== "") fetchImgs();
  }, [imgSubj, page]);

  function addMoreImgs() {
    document.getElementById('moreBtn').classList.add('hideMoreBtn');
    setSearchNew(false);
    setPage((prev) => prev + 1);
  }

  function handleChangeSelectImg(url,id,dl){
    setSelectedImgUrl(url);
    setSelectedImgId(id);
    setSelectedImgDownload(dl);
  }

  function changeSelectedBool(b){
    setSelectedBool(b);
  }

  function setFav(url, id) {
    const updatedFavImages = { ...favImgs };
  
    if (likedOrNot(id)) {
      delete updatedFavImages[id];
    } else {
      updatedFavImages[id] = url;
    }
  
    setFavImgs(updatedFavImages);
  
    localStorage.setItem("localFavImgs", JSON.stringify(updatedFavImages));
  }
  
  function deleteAllFav(){
    setFavImgs({});
    localStorage.setItem("localFavImgs", JSON.stringify({}));
  }

  function likedOrNot(id){
    return favImgs.hasOwnProperty(id);
  }

  console.log("app end");
  

  return (
    <div>
      <div className={selectedBool ? "" : "hide"}>
        <SelectedImg
          url={selectedImgUrl}
          id={selectedImgId}
          dl={selectedImgDownload}
          changeSelectedBool={changeSelectedBool}
          setFav={setFav}
          likedOrNot={() => likedOrNot(selectedImgId)}
          downloadlink={fetchedImgs}
        />
      </div>
      <div id="headDiv" className={darkMode ? "" : "lMode"}>
        <img src={appLogo} id="logoImg"></img>

        <form id="searchForm" onSubmit={(e) => handleSubmit(e)}>
          <input
            value={newInput}
            type="text"
            id="searchInput"
            placeholder="Search for an image"
            className={darkMode ? "" : "lMode"}
            onChange={(e) => {
              setNewInput(e.target.value);
            }}
          ></input>
          <button id="searchBtn">
            <img src={searchIcon} className={darkMode ? "" : "lMode"}></img>
          </button>
        </form>

        <div
          id="toggleDarkMode"
          onClick={toggleDarkMode}
          className={darkMode ? "" : "lMode"}
        >
          <div className={darkMode ? "DarkMode" : "LightMode"}></div>
        </div>

        <div id="userDiv">
          <img
            src={noProfile}
            onClick={() => {
              setUserMode(!userMode);
            }}
          ></img>
          <div
            id="userDataDiv"
            className={`userDiv ${userMode ? "" : "userDivHide"} ${
              darkMode ? "" : "lMode"
            }`}
          >
            <div id="user">
              <img src={noProfile}></img>
              <div id="userName">Kaif Hussain</div>
            </div>
            <div id="favImagesDiv">
              <div style={{
                marginTop:'12px'
              }}>
                <p>Favorite Images</p>
              <button id="deleteAllFavBtn" title="Delete All Favs" onClick={deleteAllFav} className={Object.keys(favImgs).length > 0 ? '':'hide'}><img src={deletePng}></img></button>
              </div>
              <div id='favImgsDiv'>
              {Object.keys(favImgs).length > 0
            ? Object.keys(favImgs).map((id) => {
                return (
                  // <img src={imgUrl}></img>
                  <ImageC
                    // key={favImgsId[i]}
                    key={id}
                    src={favImgs[id]}
                    handleChangeSelectImg={handleChangeSelectImg}
                    imgId={id}
                    imgUrl={favImgs[id]}
                    changeSelectedBool={changeSelectedBool}
                    // dl={}

                  />
                );
              })
            : (
                <div style={{
                  color:'gray',
                  fontSize:'12px',
                  fontFamily:'monospace',
                  // border:'1px solid red',
                  // position:'absolute',
                  // left:'0',
                  // top:'24px'
                }}>
                  Nothing here!
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
        <div id="suggestionDiv">
          <span>Suggestions: </span>
          <div
            className="suggestionItem"
            onClick={() => {
              setPage(1);
              setSearchNew(true);
              setImgSubj("Wallpaper");
            }}
          >
            Wallpaper
          </div>
          <div
            className="suggestionItem"
            onClick={() => {
              setSearchNew(true);
              setPage(1);
              if (imgSubj !== "Minimal") setImgSubj("Minimal");
            }}
          >
            Minimal
          </div>
          <div
            className="suggestionItem"
            onClick={() => {
              setPage(1);
              setSearchNew(true);
              if (imgSubj !== "Asthetic") setImgSubj("Asthetic");
            }}
          >
            Asthetic
          </div>
          <div
            className="suggestionItem"
            onClick={() => {
              setPage(1);
              setSearchNew(true);
              if (imgSubj !== "Nature") setImgSubj("Nature");
            }}
          >
            Nature
          </div>
          <div
            className="suggestionItem"
            onClick={() => {
              setPage(1);
              setSearchNew(true);
              if (imgSubj !== "AI art") setImgSubj("AI art");
            }}
          >
            AI art
          </div>
        </div>
      </div>

      <div id="searchResultDiv" ref={searchResultImgDiv} onScroll={handleScroll}>
        <div id="loading" className={loading ? "" : "hide"}></div>
        <div id="searchResultTitle" className={darkMode ? "" : "lMode"}>
          <span id="searchResultTitleName">{imgSubj}</span>
        </div>
        <div id="searchResultImgDiv">
          {fetchedImgs.length > 0
            ? fetchedImgs.map((img, i) => {
                return (
                  <ImageC
                    key={img.id}
                    src={img.urls.regular}
                    handleChangeSelectImg={handleChangeSelectImg}
                    imgId={img.id}
                    imgUrl={img.urls.regular}
                    changeSelectedBool={changeSelectedBool}
                    dl={img.links.download}
                  />
                );
              })
            : loading == false && (
                <div style={{ marginTop: "10px", fontFamily: "monospace" }}>
                  Nothing here!
                </div>
              )}
          <button
            id="moreBtn"
            className={`${darkMode ? "" : "lMode"} ${
              scrollDown ? "" : "hideMoreBtn"
            }`}
            onClick={addMoreImgs}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
