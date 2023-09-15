import React, { Component } from "react";
import SocialStyle from "../../css/personalSocialPage/social.module.css";
import Tab from "./Tab";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import axios from "axios";

class Social extends Component {
  state = { movieCollection: null };
  userID = this.props.match.params.userID;

  componentDidMount() {
    //獲取該userID收藏了幾部電影
    axios
      .get(`http://localhost:2407/movieCollection/${this.userID}`)
      .then((response) => {
        // console.log(response.data[0].count);
        this.setState({ movieCollection: response.data[0].count });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    return (
      <div className={SocialStyle.all}>
        <div className={"container " + SocialStyle.body}>
          {/* 外框 */}
          <div className={SocialStyle.info}>
            {/* 左半部 */}
            <div className={SocialStyle.intro}>
              {/* 大頭貼 */}
              <div className={SocialStyle.img}>
                <img
                  className="img-fluid h-100 rounded-circle"
                  // src={require("photo.jpg")}
                  src={require(`../../img/carouselimg.jpg`)}
                  alt="userPhoto"
                />
              </div>
              {/* username與email */}
              <div className={SocialStyle.headuser}>
                <p className={SocialStyle.username}>Tracy{}</p>
                <p className={SocialStyle.userid}>@d98098dew{}</p>
                {/* 自我介紹 */}
                <p className={SocialStyle.newintro}>新增自我介紹{}</p>
              </div>
            </div>
            {/* 右半部 */}
            <div className={SocialStyle.A2}>
              {/* 已觀看外框 */}
              <div className={SocialStyle.collect1}>
                <p>已觀看</p>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="63"
                  height="96"
                  viewBox="0 0 63 96"
                  fill="none"
                >
                  <path
                    d="M10.7834 94L39.6554 22.248L40.7606 19.5014H37.8H2V2H61V14.9523L30.8684 94H10.7834Z"
                    stroke="#D9D9D9"
                    strokeWidth="4"
                  />
                </svg> */}
                <div className={SocialStyle.number}>7</div>
              </div>
              {/* 已收藏外框 */}
              <div className={SocialStyle.collect2}>
                <p>已收藏</p>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="63"
                  height="96"
                  viewBox="0 0 63 96"
                  fill="none"
                >
                  <path
                    d="M55.5089 2.81289V18.4243C52.1117 17.8788 48.5063 17.6088 44.6963 17.6088C36.6226 17.6088 30.2197 19.5252 25.8857 23.7303C21.5374 27.9491 19.3853 34.605 19.0215 43.221L18.9334 45.3054H21.0197H21.7282H22.9761L23.5246 44.1845C25.1659 40.8308 27.2476 38.4254 29.7248 36.849C32.1987 35.2748 35.1929 34.4471 38.7919 34.4471C45.9411 34.4471 51.2683 36.9126 55.0501 41.73L55.0553 41.7366L55.0605 41.7431C58.9343 46.5934 61 53.5233 61 62.7864C61 72.6965 58.4221 80.2827 53.4843 85.7829C48.5867 91.1962 41.696 94 32.5333 94C22.868 94 15.5015 90.6415 10.1796 84.0169C4.81325 77.3369 2 67.8335 2 55.2495C2 42.37 3.69617 32.1274 6.97627 24.4179C10.294 16.6698 15.1012 11.0715 21.362 7.48525C27.72 3.86591 35.6431 2 45.2277 2C48.1804 2 51.6045 2.26755 55.5089 2.81289ZM24.1709 53.5586L24.1633 53.5674L24.1558 53.5763C22.1679 55.9315 21.2043 58.7862 21.2043 62.02C21.2043 66.3607 22.0605 70.1152 23.9187 73.1549L23.9225 73.1611L23.9263 73.1673C25.8366 76.2418 28.5525 78.008 32.0019 78.008C35.1153 78.008 37.7041 76.7087 39.61 74.2249C41.5866 71.6578 42.3861 67.8813 42.3861 63.2974C42.3861 59.329 41.6859 55.9931 39.9747 53.6054C38.1754 51.0947 35.4771 49.9281 32.2381 49.9281C29.0029 49.9281 26.2579 51.1434 24.1709 53.5586Z"
                    stroke="#F1EFE9"
                    strokeWidth="4"
                  />
                </svg> */}
                <div className={SocialStyle.number}>
                  {this.state.movieCollection}
                </div>
              </div>
            </div>
          </div>
          {/* userID為呼叫url後面代入的參數 => /personalSocialPage/{此參數}*/}
          <Tab userID={this.userID} />
        </div>
      </div>
    );
  }
}

export default Social;
