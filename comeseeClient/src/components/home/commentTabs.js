import React, { Component } from 'react';

import OthersComment from './comment';

import SortBtn from './sortBtn';
import Star from './star';

import CMS from '../../css/home/comment.module.css';

class CommentTabs extends Component {

    state = {
        inputValue: '',
        comments: [],
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleSubmit = () => {
        const newComment = {
            inputValue: this.state.inputValue,
        };

        this.setState((prevState) => ({
            comments: [...prevState.comments, newComment],
            inputValue: '',
        }));
    }

    render() {

        const Img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png';


        return (<>

            <div className="self-comment">

                {/* 登入後才顯示可留言區? */}
                <div className={CMS.login}>立即登入進行評論</div>

                {/* 自己留言的區域 */}
                <div className={CMS.selfBox}>

                    {/* 自己的頭貼 */}
                    <a href={`/personalSocialPage/${this.userID}`}><img className={CMS.user} src={Img} alt='頭像' /></a>

                    <div>
                        {/* 星星跟留言框 */}
                        <Star />
                        <input type="text"
                            className={CMS.text}
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    {/* 送出按鈕 */}
                    <button className={CMS.scb} onClick={this.handleSubmit}>送出</button>
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
                {this.state.comments.map((comment, index) => (
                    <OthersComment key={index} commentData={comment} />
                ))}
            </div>

        </>);
    }
}

export default CommentTabs;