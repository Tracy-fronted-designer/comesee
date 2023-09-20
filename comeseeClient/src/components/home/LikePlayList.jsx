import React, { useEffect, useState } from "react";
import axios from "axios";


function LikePlayList(props) {

  
    // useEffect(() => {
    //   if (onClickPlayListID !== null && onClickPlayListID !== undefined) {
    //     //在movieinplaylist資料表中取得該playlistID擁有的電影ID與中文名與imageUrl
    //     axios
    //       .get(
    //         `http://localhost:2407/playlist/movieinplaylist/${onClickPlayListID}`
    //       )
    //       .then((response) => {
    //         setMovieList(response.data);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching data:", error);
    //       });
    //   }
    // }, [onClickPlayListID]);
  
    return (
     <div>
        <span></span>
        <button></button>
     </div>
    );
  }
  
  export default LikePlayList;