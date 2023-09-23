import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
//import AvatarEditor from "react-avatar-editor";
import member from "../../css/member/member.module.css";
import catchUser from "../../TicketContext";

function AvatarUpload() {
  const [data, setdata] = useState(null);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // 預覽
  const [isFileInputVisible, setIsFileInputVisible] = useState(true);
  const context = useContext(catchUser);
  const user = context.state.userID;
  //const [scale, setScale] = useState(1);
  //const fileInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`http://localhost:2407/user/image/${user}`)
      .then((res) => {
        setdata(res.data[0]);
        console.log(res.data[0].image);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    setIsFileInputVisible(false);
  };

  const handleUpload = () => {
    const formdata = new FormData();
    formdata.set("image", file);
    axios
      .post(`http://localhost:2407/user/uploads/${user}`, formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleImageClick = () => {
    if (!isFileInputVisible) {
      document.getElementById("fileInput").click();
    }
  };

  return (
    <div className={member.AvatarUpload}>
      {!data || !data.image ? (
        <div>
          <label className={member.Avatarinput}>
            <span className={member.AvatarChooseText}>選擇照片</span>
            <input
              id="fileInput"
              className={member.Avatarinput}
              type="file"
              onChange={handleFile}
              style={{ display: "none" }}
            />
          </label>
        </div>
      ) : (
        <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
          <img
            className={member.Avatarstyle}
            src={`http://localhost:2407/user/image/${data.image}`}
            alt="Preview"
          />
        </div>
      )}

      {previewImage && (
        <div className={member.AvatarPreviewContainer}>
          <img
            className={member.Avatarstyle}
            src={previewImage}
            alt="Preview"
          />
          <button className={member.customfileinput} onClick={handleUpload}>
            上傳照片
          </button>
        </div>
      )}
      <label className={member.Avatarinput}>
        <input
          id="fileInput"
          className={member.Avatarinput}
          type="file"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}

export default AvatarUpload;