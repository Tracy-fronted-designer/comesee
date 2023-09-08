import React, { Component } from 'react';

import Stars from './stars';
import CommentFoot from './commFoot';

import CMS from '../../css/home/comment.module.css';

class OthersComment extends Component {

    state = {}

    render() {
        const Img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png';

        return (<>

            {/* 他人評論區域 */}
            <div className={CMS.ocb}>

                {/* 頭貼 */}
                <img className={CMS.user} src={Img} alt=' ' />

                {/* 文字區域 */}
                <div className={CMS.tb}>
                    <div className={CMS.name}>暱稱{ }</div>
                    <div className={CMS.comm}>內容{ }</div>
                    {/* 點讚 / 回覆? */}
                    <CommentFoot />
                </div>

                {/* 評分區域 */}
                <div>
                    <Stars />
                    <div className={CMS.date}>2323/22/23{ }</div>
                </div>

            </div>
        </>
        );
    }
}

export default OthersComment;