import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import ToastStyle from "../../css/home/like.module.css";
import BtnLike from "./btnLike";
import { Link } from "react-router-dom";

function ToastComponent(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const movieID = props.movieID;
  
    

  const handleShowToast = () => {
    if (isLiked === false) {
      setIsLiked(true);
      setShowModal(true);
    } else {
      setIsLiked(false);
      setShowModal(false);
    }
  };

  //關閉modal
  const closeModal = () => {
    setShowModal(false);
    // setIsLiked(false);
  };

  return (
    <>
      <div className={ToastStyle.btnContainer} onClick={handleShowToast}>
        <button type="button" className={ToastStyle.btnstyle} id="liveToastBtn">
          <BtnLike className={ToastStyle.btnlike} showToast={isLiked} />
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div
            className="modal-dialog modal-md modal-dialog-scrollable modal-dialog-centered"
            role="document"
          >
            <div className="modal-content" style={{ background: "#F1EFE9" }}>
              <div className="modal-header border-0">
                <h5
                  className="modal-title fs-4 fw-bold"
                  style={{ color: "black" }}
                >
                  請選擇要加入的片單
                </h5>
                <button
                  type="button"
                  className="btn-close "
                  onClick={closeModal}
                >
                  {/* <span>&times;</span> */}
                </button>
              </div>
              <div className="modal-body container ">
                <div className="row g-3">12</div>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  关闭
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}

      {/* {showToast && (
        <div
          className={
            ToastStyle.toastsize + " position-fixed bottom-0 end-0 p-3"
          }
          style={{ zIndex: 11 }}
        >
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={"toast-body " + ToastStyle.fontsize}>
              {toastMessage}
              <p className="mt-2">
                <Link style={{ color: "#B6B995" }} to="/Collectionpage">
                  查看我的收藏片單
                </Link>
              </p>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default ToastComponent;
