import React, { useContext } from "react";
import Milestone from "./Milestone";
import AvatarUpload from "./AvatarUpload";
import member from "../../css/member/member.module.css";
import catchUser from "../../TicketContext";

const Info = () => {
  const context = useContext(catchUser);
  const user = context.state.userID;

  return (
    <div className={member.infosec}>
      <div className={member.info}>
        <div className={member.img}>
          <AvatarUpload />
        </div>
        <div className={member.intro}>
          <div className={member.user}>
            <p className={member.username}>Tracy{}</p>
            <p className={member.userid}>@d98098dew{}</p>
          </div>
          <p className={member.newintro}>新增自我介紹{}</p>
        </div>
        <Milestone userID={user} />
      </div>
    </div>
  );
};

export default Info;
