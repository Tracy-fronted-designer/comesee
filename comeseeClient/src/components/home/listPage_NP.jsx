import React, { useEffect, useState } from "react";
import axios from "axios";

import LS from "../../css/home/listPage.module.css";
import ListPageCard from "./listPageCard";

const ListPage = () => {
  const [releasedData, setReleasedData] = useState([]);
  const [comingData, setComingData] = useState([]);

  const [tabReleased, setTabReleased] = useState(true);
  const [tabComingSoon, setTabComingSoon] = useState(0);

  // 選擇上映中標籤
  function handleReleaseChange(e) {
    setTabReleased(true);
    setTabComingSoon(false);
  }

  // 上映中電影
  useEffect(() => {
    axios
      .get("http://localhost:2407/filmlist/released")
      .then((res) => {
        setReleasedData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [tabReleased]);

  // 選擇即將上映標籤
  function handleComingSoonChange(e) {
    setTabComingSoon(true);
    setTabReleased(false);
  }

  // 即將上映電影
  useEffect(() => {
    axios
      .get("http://localhost:2407/filmlist/comingsoon")
      .then((res) => {
        setComingData(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [tabComingSoon]);

  return (
    <div className={LS.List}>
      <div className="container">
        <nav className={LS.myNav}>
          <div className={LS.myTabs} id="nav-tab" role="tablist">
            <button
              className={`${LS.myLink} listTab active`}
              id="nowPlaying-tab"
              data-bs-toggle="tab"
              data-bs-target="#nowPlaying"
              type="button"
              role="tab"
              aria-controls="nowPlaying"
              aria-selected="true"
              onClick={handleReleaseChange}
            >
              現正熱映
            </button>

            <button
              className={`${LS.myLink} listTab`}
              id="comingSoon-tab"
              data-bs-toggle="tab"
              data-bs-target="#comingSoon"
              type="button"
              role="tab"
              aria-controls="comingSoon"
              aria-selected="false"
              onClick={handleComingSoonChange}
            >
              即將上映
            </button>
          </div>
        </nav>

        <div className={`${LS.myContent} tab-content`} id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nowPlaying"
            role="tabpanel"
            aria-labelledby="nowPlaying-tab"
          >
            {releasedData.map((filmItem) => (
              // mapㄉ內容
              <ListPageCard
                key={filmItem.id}
                id={filmItem.id}
                imageUrl={filmItem.imageUrl}
                movieNameCN={filmItem.movieNameCN}
                movieNameEN={filmItem.movieNameEN}
              />
            ))}
          </div>

          <div
            className="tab-pane fade"
            id="comingSoon"
            role="tabpanel"
            aria-labelledby="comingSoon-tab"
          >
            {comingData.map((filmItem) => (
              // mapㄉ內容
              <ListPageCard
                key={filmItem.id}
                id={filmItem.id}
                imageUrl={filmItem.imageUrl}
                movieNameCN={filmItem.movieNameCN}
                movieNameEN={filmItem.movieNameEN}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPage;