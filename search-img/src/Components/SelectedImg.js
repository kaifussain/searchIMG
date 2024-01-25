import React from "react";
import "./SelectedImg.css";

const SelectedImg = (props) => {
  return (
    <div id="s_boxL1" onClick={()=>
    props.changeSelectedBool(false)
    }>
      <div id="s_boxL2" onClick={(e) => e.stopPropagation()}>
        <div id="s_ImgDiv">
            <img src={props.url} id='selectedImg'></img>
          <div>
            <div id='s_btns'>
              <button id='addToFav'>🩶</button>
              <button if='downloadBtn'>⬇️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedImg;
