import React, { useState } from 'react'
import "./Images.css";

const arr =[];
function ImageSrch() {
    const [text, setText] = useState();
    const [images, setImages] = useState();
    const [fav, setFav] = useState();
    const [show, setShow] = useState(false);

    const handleClick = async ()=>{
        await fetch(`https://api.unsplash.com/photos/?client_id=6dtiyG-LXVJD8AIMOrqtrX-MHnMYA-xe_3OIr80bqJ4&query=${text}&per_page=20`)
        .then((res)=>res.json())
        .then((resdata)=>{
            setImages(resdata)
        })
        .catch((err)=>console.log(err))
        setShow(false)
    }

    const handleFav = (link)=>{
        if(!arr.includes(link)){
            arr.push(link)
            setFav(arr)
        }
    }

    const showFav = ()=>{
        setImages()
        if(arr.length!==0){
        setShow(true)
        }
    }

  return (
    <div>
        <div>
            <div className='heading'>
                <h1>React Photo Search</h1>
                <button className='bookmarkbtn' onClick={showFav}>Bookmarks</button>
            </div>
            <div>
                <input className='inputtext' type={"text"} placeholder="search free high resolution images" onChange={(e)=>setText(e.target.value)}/>
                <button className='searchbtn' onClick={handleClick}>Search</button>
            </div>
            <div className='gridBox'>
                {images && images.map((items,index,{link=items.urls.small})=>{
                    return(
                        <div key={index}>
                        <button onClick={()=>handleFav(link)} className='bookmark'>Add Favourite</button>
                        <img src={items.urls.small} width={"400px"} height={"600px"} alt=""/>
                        </div>
                    )
                })}
                {show && fav.map((link,index)=>{
                    return(
                        <div key={index}>
                        <img src={link} width={"400px"} height={"600px"} alt=""/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ImageSrch
