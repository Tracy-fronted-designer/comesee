import React, { useState } from 'react';
import member from "../../css/member/member.module.css";



function AvatarUpload() {
    const [file, setFile] = useState(null);
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    };
  
    const handleUpload = async () => {
      if (!file) {
        alert("請選擇上傳檔案");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://localhost:2407/user/uploads", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          alert("上傳成功");
        } else {
          alert("上傳失敗");
        }
      } catch (error) {
        console.error("上傳有誤:", error);
      }
    }
  
    return (
      <div className={member.img}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>上傳大頭貼</button>
      </div>
    );
  }

  export default AvatarUpload;