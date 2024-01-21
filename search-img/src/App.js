import "./App.css";
import appLogo from "./resources/appLogo.png";
import searchIcon from "./resources/searchIcon.png";
import noProfile from "./resources/NoProfile.png";
import { useEffect, useState, useRef } from "react";
import ImageC from "./Components/ImageC";

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

  let localM = JSON.parse(localStorage.getItem("localM"));
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${imgSubj}&client_id=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    const myDiv = searchResultImgDiv.current;
    const handleScroll = () => {
      if (myDiv.scrollTop + myDiv.clientHeight > myDiv.scrollHeight - 200) {
        setScrollDown(true);
      } else {
        setScrollDown(false);
      }
    };

    myDiv.addEventListener("scroll", handleScroll);

    return () => {
      myDiv.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDown]);

  useEffect(() => {
    if (!localM) {
      document.body.classList.add("lMode");
      setDarkMode(false);
    }
    console.log("useEffect 1");
  }, []);
  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("lMode", darkMode);
    localStorage.setItem("localM", JSON.stringify(!darkMode));
    console.log("toggleDarkMode");
  }

  async function fetchImgs() {
    if (searchNew) {
      setFetchedImgs([]);
      // setSearchNew(false);
    }
    setLoading(true);

    const response = await fetch(url);
    const data = await response.json();

    // setFetchedImgs(data.results);
    setFetchedImgs(prev => [...prev,...data.results]);
    console.log("fechImgs");
    setLoading(false);

  }
  function handleSubmit(e) {
    e.preventDefault();
    if (newInput.trim() !== "") {
      setSearchNew(true);
      setPage(1)
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
  console.log("app end");

  return (
    <div>
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
        <div id="suggestionDiv">
          <span>Suggestions: </span>
          <div
            className="suggestionItem"
            onClick={() => {
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
              if (imgSubj !== "Minimal") setImgSubj("Minimal");
            }}
            >
            Minimal
          </div>
          <div
            className="suggestionItem"
            onClick={() => {
              setSearchNew(true);
              if (imgSubj !== "Asthetic") setImgSubj("Asthetic");
            }}
            >
            Asthetic
          </div>
          <div
            className="suggestionItem"
            onClick={() => {
              setSearchNew(true);
              if (imgSubj !== "AI art") setImgSubj("AI art");
            }}
          >
            AI art
          </div>
        </div>
      </div>

      <div id="searchResultDiv" ref={searchResultImgDiv}>
        <div id="loading" className={loading ? "" : "hide"}></div>
        <div id="searchResultTitle" className={darkMode ? "" : "lMode"}>
          <span id="searchResultTitleName">{imgSubj}</span>
        </div>
        <div id="searchResultImgDiv">
          {fetchedImgs.length > 0
            ? fetchedImgs.map((img, i) => {
                return <ImageC key={page + "-" + i} src={img.urls.small} />;
              })
            : loading == false && (
                <div style={{ marginTop: "10px" }}>Nothing here!</div>
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
