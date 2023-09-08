import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Info from "./info";
import Sidebar from "./sidebar";
import Dashboard from "./dashboard";
import Ticketstatus from "./ticketstatus";

import member from "../../css/member/member.module.css";
import fee from "../../css/member/fee.module.css";

class Fee extends Component {
  state = {};
  render() {
    return (
      <div className="wrapper">
        <div className={member.mainbg}>
          <div className="container">
            <Info />
            {/* side-bar */}
            <section className={`row ${member.contenta}`}>
              <div class="col-3">
                <Sidebar />
              </div>
              <div className={`col-8 ${fee.contentdetail}`}>
                <Dashboard />
                <div className={member.topbutton}>
                  <a className={member.booking} href>
                    未兌換
                  </a>
                  <a className={member.delete} href>
                    已失效
                  </a>
                </div>{" "}
                <Ticketstatus />
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Fee;
