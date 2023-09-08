import React, { Component } from 'react';

import OthersComment from './comment';

import SortBtn from './sortBtn';
import Stars from './stars';

import CMS from '../../css/home/comment.module.css';

class CommentTabs extends Component {

    state = {}

    render() {

        const Img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png';


        return (<>

            <div className="self-comment">

                {/* 登入後才顯示可留言區? */}
                <div className={CMS.login}>立即登入進行評論</div>

                {/* 自己留言的區域 */}
                <div className={CMS.selfBox}>

                    {/* 自己的頭貼 */}
                    <img className={CMS.user} src={Img} alt=' ' />

                    <div>
                        {/* 星星跟留言框 */}
                        <Stars />
                        <input type="text" className={CMS.text} />
                    </div>

                    {/* 送出按鈕 */}
                    <button className={CMS.scb}>送出</button>
                </div>

            </div>



            {/* 他人評論的區域 */}
            <div className="comment-box">

                {/* 留言排序的按鈕 */}
                <div className={CMS.sortBar} >
                    <SortBtn label="最新" />
                    <SortBtn label="熱門" />
                </div>

                {/* 其他人的評論 */}
                <OthersComment />
                <OthersComment />
                
            </div>

        </>);
    }
}

export default CommentTabs;