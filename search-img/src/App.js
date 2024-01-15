import "./App.css";
import appLogo from "./resources/appLogo.png";
import searchIcon from "./resources/searchIcon.png";
import noProfile from "./resources/NoProfile.png";
function App() {
  return (
    <>
      <div id="headDiv">
        <img src={appLogo} id="logoImg"></img>
        <form id="searchForm">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for an image"
          ></input>
          <button id="searchBtn">
            <img src={searchIcon}></img>
          </button>
        </form>

        <div id="userDiv">
          <img src={noProfile}></img>
          <div id="userDataDiv">
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
    </>
  );
}

export default App;
