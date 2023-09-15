import React, { Component } from 'react';

import Star from './star';
import CommentFoot from './commFoot';

import CMS from '../../css/home/comment.module.css';

class OthersComment extends Component {

    state = {
        members: [],
    }

    componentDidMount() {
        // 在组件挂载后获取member表的数据
        fetch('http://localhost:2407/comment/members')
            .then(response => response.json())
            .then(data => {
                this.setState({ members: data });
            });
    }

    render() {
        const Img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png';

        const { members } = this.state;
        // 使用 filmInfo.id 筛选评论
        const filteredComments = this.props.comment.filter(comment => comment.movieID === this.props.filmInfo.id);

        return (
            <div>
                {filteredComments.map((comment, index) => {
                    // 查找与评论中的UserID匹配的userName
                    const member = members.find(member => member.UserID === comment.userID);

                    return (
                        <div className={CMS.ocb} key={index}>
                            {/* Your comment rendering logic */}
                            <img className={CMS.user} src={Img} alt=' ' />
                            <div className={CMS.tb}>
                                <div className={CMS.name}>{member ? member.userName : comment.userID}</div>
                                <div className={CMS.comm}>{comment.comment}</div>
                                <CommentFoot />
                            </div>
                            <div>
                                <Star />
                                <div className={CMS.date}>{new Date(comment.sendTime).toISOString().split('T')[0]}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default OthersComment;