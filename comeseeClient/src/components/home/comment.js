import React, { Component } from 'react';

import Star from './star';
import CommentFoot from './commFoot';

import CMS from '../../css/home/comment.module.css';

class OthersComment extends Component {

    state = {}

    render() {
        const Img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png';

        // 使用 filmInfo.id 筛选评论
        const filteredComments = this.props.comment.filter(comment => comment.movieID === this.props.filmInfo.id);

        return (
            <div>
                {filteredComments.map((comment, index) => (
                    <div className={CMS.ocb} key={index}>
                        {/* Your comment rendering logic */}
                        <img className={CMS.user} src={Img} alt=' ' />
                        <div className={CMS.tb}>
                            <div className={CMS.name}>{comment.userID}</div>
                            <div class Name={CMS.comm}>{comment.comment}</div>
                            <CommentFoot />
                        </div>
                        <div>
                            <Star />
                            <div className={CMS.date}>{new Date(comment.sendTime).toISOString().split('T')[0]}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default OthersComment;