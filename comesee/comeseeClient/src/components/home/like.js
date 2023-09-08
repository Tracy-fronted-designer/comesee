import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import ToastStyle from '../../css/home/like.module.css';
import BtnLike from './btnLike';
import { Link } from 'react-router-dom';



function ToastComponent() {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("已加入片單");

    // 更新消息状态的函数
    const updateToastMessage = (message) => {
        setToastMessage(message);
    };


    const handleShowToast = () => {
        if (toastMessage === "已加入片單") {
            setToastMessage("已取消加入片單");
        } else {
            setToastMessage("已加入片單");
        }

        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 5000);
    };


    return (
        <>
            <div
                className={ToastStyle.btnContainer}
                onClick={handleShowToast}>
                <button
                    type="button"
                    className={ToastStyle.btnstyle}
                    id="liveToastBtn"
                >
                    <BtnLike className={ToastStyle.btnlike} updateToastMessage={updateToastMessage} />
                </button>
            </div>

            {showToast && (
                <div className={ToastStyle.toastsize + " position-fixed bottom-0 end-0 p-3"} style={{ zIndex: 11 }}>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className={"toast-body " + ToastStyle.fontsize}>
                            {toastMessage}
                            <p className='mt-2'><Link style={{ color: '#B6B995' }} to="/Collectionpage">查看我的收藏片單</Link></p>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}

export default ToastComponent;