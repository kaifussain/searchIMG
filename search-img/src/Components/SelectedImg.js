import React from "react";
import "./SelectedImg.css";

const SelectedImg = (props) => {

  const handleDownload = () => {
    const imageUrl = props.dl;
    window.open(imageUrl, '_blank');
  };
  
  return (
    <div id="s_boxL1" onClick={()=>
    props.changeSelectedBool(false)
    }>
      <div id="s_boxL2" onClick={(e) => e.stopPropagation()}>
            <img src={props.url} id='selectedImg' alt=":("></img>
        <div>
            <div id='s_btns'>
              <button id='addToFav' onClick={()=>props.setFav(props.url,props.id)} title={props.likedOrNot()? "Remove from Fav": "Add to Fav"}>
                {
                  props.likedOrNot()? '❤️' :'🤍' 
                }
              </button>
              <button id='downloadBtn' title="Download" onClick={handleDownload}>⬇️</button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SelectedImg;
