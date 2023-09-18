import React, { useState } from 'react';
import member from "../../css/member/member.module.css";


function AvatarUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    handleUpload(selectedFile); 

  };

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:2407/user/uploads', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('大頭貼上傳成功');
      } else {
        alert('大頭貼上傳失敗');
      }
    } catch (error) {
      console.error('上傳出錯:', error);
    }
  };

  return (
    <div>
      <input className={member.AvatarUpload} type="file" accept="image/*" onChange={handleFileChange} />
    </div>

    
  );
}

export default AvatarUpload;
