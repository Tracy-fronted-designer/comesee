import React, { Component } from "react";
import {  Link } from "react-router-dom/cjs/react-router-dom.min";

import "bootstrap/dist/css/bootstrap.min.css";
import Info from "./info";
import Sidebar from "./sidebar";
import Collection from "./collection";

import member from '../../css/member/member.module.css'
import collection from "../../css/member/collection.module.css";

class Collectionpage extends Component {
  state = {};
  render() {
    return (
        <div>
          <div className={member.mainbg}>
          <div className="container">
            <Info />
            {/* side-bar */}
            <section className={`row ${member.contenta}`}>
              <div class="col-2">
                <Sidebar />
              </div>
              <div className={`col-9 ${collection.contentdetail}`}>
                <Collection />
                <Collection />
                <Collection />
                <Collection />
                <Collection />
                <Collection />
                <div className={`col ${collection.filmcollection}`}>
                  <button className={collection.button}>
                    建立新片單
                  </button>
                </div>
              </div>
            </section>
          </div>
          </div>
        </div>
    );
  }
}

export default Collectionpage;
