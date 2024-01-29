import React from 'react'
import './ImageC.css'

const ImageC = (props) => {

  function handleSelect(){
    props.handleChangeSelectImg(props.imgUrl, props.imgId, props.dl);
    props.changeSelectedBool(true);
  }
  
  return (
    <div className='imgWrapper'>
        <img
            className="searchResultImg"
            src={props.src}
            alt=":("
            onClick={handleSelect}
          ></img>
    </div>
  )
}

export default ImageC