import React from "react";
import "./SelectedImg.css";

const SelectedImg = (props) => {

  const handleDownload = () => {
    // const a = document.createElement('a');
    // a.href = props.dl;
    // // a.download = 'your_image_name.jpg';
    // a.target = '_blank';
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    const imageUrl = props.dl; // replace with your image URL

  // Open a new tab and set its title
    window.open(imageUrl, '_blank');
  };
  
  return (
    <div id="s_boxL1" onClick={()=>
    props.changeSelectedBool(false)
    }>
      <div id="s_boxL2" onClick={(e) => e.stopPropagation()}>
        {/* <div id="s_ImgDiv"> */}
            <img src={props.url} id='selectedImg' alt=":("></img>
        {/* </div> */}
        <div>
            <div id='s_btns'>
              <button id='addToFav' onClick={()=>props.setFav(props.url,props.id)} title={props.likedOrNot()? "Remove from Fav": "Add to Fav"}>
                {
                  props.likedOrNot()? '❤️' :'🩶' 
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
