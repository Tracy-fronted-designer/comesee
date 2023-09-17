import React, { useContext, useEffect, useState } from "react";
import member from "../../css/Frank/usermessage.module.css";
import axios from "axios";

import TicketContext from "../../TicketContext";

const UserMessage = () => {
  const context = useContext(TicketContext);
  const userID = context.state.userID;
  //   const [userInfo, setUserInfo] = useState([]); //user全部資料

  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [townOptions, setTownOptions] = useState([]);
  const [cityData, setCityData] = useState({}); // 用于存储城市和区域的 JSON 数据

  useEffect(() => {
    // 从外部 JSON URL 加载城市数据
    axios
      .get(
        "https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/CityCountyData.json"
      )
      .then((response) => {
        // 将 JSON 数据存储到 state 中
        setCityData(response.data);

        const cities = response.data;

        // 提取城市名称并设置到城市选择框中
        const cityNames = cities.map((city) => city.CityName);

        setCityOptions(cityNames);
      })
      .catch((error) => {
        console.error("Error fetching city data", error);
      });
  }, []);
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);

    // 根据选择的城市从 JSON 数据中获取对应的區域数据
    const selectedCityData = cityData.find(
      (city) => city.CityName === selectedCity
    );

    if (selectedCityData) {
      // 提取區域数据并设置到區域选择框中
      const townNames = selectedCityData.AreaList.map((area) => area.AreaName);
      setTownOptions(townNames);
    } else {
      // 如果找不到城市数据，清空區域选择框
      setTownOptions([]);
    }
  };

  const handleTownChange = (e) => {
    const selectedTown = e.target.value;
    setSelectedTown(selectedTown);
  };

  useEffect(() => {
    // 从外部 JSON URL 加载城市数据
    axios
      .get(`http://localhost:2407/user/${userID}`)
      .then((response) => {
        console.log(response.data[0]);
        // setUserInfo(response.data[0]);
        setUserName(response.data[0].userName);
        setGender(response.data[0].gender);
        setBirthday(targetLocalDate(response.data[0].birthday));
      })
      .catch((error) => {
        console.error("Error fetching city data", error);
      });
  }, [userID]);

  //轉成localTime，傳入utc字串
  const targetLocalDate = (utcStr) => {
    if (utcStr === undefined) {
      return;
    }
    // console.log(utcStr);

    // 將 UTC 字串轉換成 JavaScript 的 Date 物件
    let utcDate = new Date(utcStr);
    // console.log(utcDate);

    // 指定目標時區的偏移量（以分鐘為單位）
    let targetTimezoneOffset = 480; // 假設目標時區是 UTC+08:00

    // 計算目標時區的本地時間
    let targetLocal = new Date(
      utcDate.getTime() + targetTimezoneOffset * 60000
    );

    let date = targetLocal.toISOString().split("T")[0]; //格式為2023-08-23

    return date;
  };

  return (
    <div className={member.allinput}>
      <div className={member.FormGroup}>
        <div className={member.a1}>
          <label className={member.b1}>姓名</label>
        </div>
        <input
          type="text"
          name="name"
          className={member.c1}
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className={member.FormGroup}>
        <div className={member.a2}>
          <label className={member.b1}>性別</label>
        </div>
        <select
          name="gender"
          className={member.c2}
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="男">男</option>
          <option value="女">女</option>
        </select>
      </div>
      <div className={member.FormGroup}>
        <div className={member.a3}>
          <label className={member.b1}>西元出生年月日</label>
        </div>
        <input
          type="date"
          name="birthday"
          className={member.c3}
          value={birthday}
          onChange={(e) => {
            setBirthday(e.target.value);
          }}
        />
      </div>
      {/* 新增通讯地址字段 */}
      <div className={member.FormGroup}>
        <div className={member.a4}>
          <label className={member.b1}>通訊地址</label>
        </div>
        <select
          name="addressCity"
          className={member.c41}
          onChange={handleCityChange}
          value={selectedCity}
        >
          <option value="">請選擇縣市</option>
          {/* 其他選項 */}
          {cityOptions.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          name="addressTown"
          className={member.c42}
          onChange={handleTownChange}
          value={selectedTown}
        >
          <option value="">請選擇鄉鎮</option>
          {/* 其他選項 */}
          {townOptions.map((town, index) => (
            <option key={index} value={town}>
              {town}
            </option>
          ))}
        </select>
      </div>
      <input type="text" name="address" className={member.d4} />
      {/* 新增自我介绍字段 */}
      <div className={member.FormGroup}>
        <div className={member.a5}>
          <label className={member.b1}>自我介紹</label>
        </div>
        <textarea name="introduction" className={member.c5} />
      </div>
      <div>
        <p className={member.d5}>0/150</p>
      </div>
    </div>
  );
};

export default UserMessage;
