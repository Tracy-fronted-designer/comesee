import React, { useState, useEffect } from "react";
import SocialStyle from "../../css/personalSocialPage/social.module.css";
import BtnLarge from "../socialpage/btnLarge";
import Tabb from "../../css/personalSocialPage/Tab.module.css";
import StaticStart from "./StaticStart";
import SmartMasonry from "react-smart-masonry"; // 引入 react-smart-masonry

import PlayListArea from "./PlayListArea";

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1); // tab的紀錄值

  const { userID } = props; //取得social.js傳來的prop

  //測試userID用
  useEffect(() => {
    console.log(userID);
  }, [userID]);

  // 更改tab的紀錄值
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const commentsData = [
    {
      movieNameCN: "奧本海默",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 5,
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蜘蛛人",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 4,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蝙蝠俠",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 2,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "奧本海默",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 5,
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蜘蛛人",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 4,
      text: "Lorem ipsum dolor sit amer sit amet.",
    },
    {
      movieNameCN: "蝙蝠俠",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 2,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "奧本海默",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 5,
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蜘蛛人",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 4,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蝙蝠俠",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 2,
      text: "Lorem  sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "奧本海默",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 5,
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蜘蛛人",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 4,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蝙蝠俠",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 2,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "奧本海默",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 5,
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蜘蛛人",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 4,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
    {
      movieNameCN: "蝙蝠俠",
      pictureName: "photo.jpg",
      userName: "tracy",
      sendTime: "2023-5-28",
      score: 2,
      text: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
    },
  ];

  const breakpoints = {
    mobile: 0, // 手機寬度
    tablet: 990, // 平板屏幕宽度
    desktop: 1400, // 桌面屏幕宽度
  };

  return (
    <div className={Tabb.main}>
      {/* tab欄 */}
      <div className={SocialStyle.tabsselector}>
        <button
          className={toggleState === 1 ? Tabb.activetabs : Tabb.tabs}
          onClick={() => toggleTab(1)}
        >
          評論
        </button>
        <button
          className={toggleState === 2 ? Tabb.activetabs : Tabb.tabs}
          onClick={() => toggleTab(2)}
        >
          片單
        </button>
      </div>
      <div className={SocialStyle.contenttabs}>
        {/* 評論 */}
        <div className={toggleState === 1 ? Tabb.activecontent : Tabb.content}>
          <SmartMasonry
            breakpoints={breakpoints}
            columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={{ mobile: 20, tablet: 20, desktop: 20 }}
            autoArrange={true} // 啟用自動排列
          >
            {commentsData.map((comment, index) => (
              <div key={index} className={SocialStyle.content1}>
                {/* 攝影機小圖 + 電影名稱 */}
                <div>
                  {/* 攝影機小圖 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="23"
                    viewBox="0 0 46 23"
                    fill="none"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="33"
                      height="21"
                      rx="3"
                      stroke="#F1EFE9"
                      strokeWidth="2"
                    />
                    <path
                      d="M34 16.0312L45 19V4L34 7.4375"
                      stroke="#F1EFE9"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className={SocialStyle.moviename}>
                    {comment.movieNameCN}
                  </span>
                </div>

                {/* 除了攝影機小圖 + 電影名稱以外的部分 */}
                <div className={SocialStyle.user}>
                  <div className="d-flex justify-content-between">
                    {/* 包含個人頭像 & userName + 發送日期 */}
                    <div className="d-flex ">
                      {/* 個人頭像 */}
                      <div className={SocialStyle.userphoto}>
                        <img
                          className="img-fluid rounded-circle"
                          // src={require("photo.jpg")}
                          src={require(`../../img/${comment.pictureName}`)}
                          alt="userPhoto"
                        />
                      </div>
                      {/* userName + 發送日期 */}
                      <div className={SocialStyle.userinfo}>
                        <p className={SocialStyle.username1}>
                          {comment.userName}
                        </p>
                        <p className={SocialStyle.date}>{comment.sendTime}</p>
                      </div>
                    </div>
                    {/* star */}
                    <StaticStart rating={comment.score} />
                  </div>

                  <p className={SocialStyle.text1}>{comment.text}</p>
                </div>
              </div>
            ))}
          </SmartMasonry>
        </div>

        {/* 片單 */}
        <div className={toggleState === 2 ? Tabb.activecontent : Tabb.content}>
          {/* <div className={SocialStyle.movietype}>
            <BtnLarge label="動作" />
            <BtnLarge label="愛情" />
            <BtnLarge label="搞笑" />
            <BtnLarge label="經典" />
            <BtnLarge label="驚悚" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="動作" />
            <BtnLarge label="愛情" />
            <BtnLarge label="搞笑" />
            <BtnLarge label="經典" />
            <BtnLarge label="驚悚" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
            <BtnLarge label="感人" />
          </div> */}

          <PlayListArea userID={userID} />
        </div>
      </div>
    </div>
  );
}

export default Tabs;
