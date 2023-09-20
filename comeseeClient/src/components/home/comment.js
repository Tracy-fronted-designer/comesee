import React, { Component } from 'react';

import StarRate from '../socialpage/starRate'
import CommentFoot from './commFoot';

import CMS from '../../css/home/comment.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


class OthersComment extends Component {

    state = {
        members: [],
    }

    sortByNewest = (comments) => {
        return comments.slice().sort((a, b) => {
            return new Date(b.sendTime) - new Date(a.sendTime);
        });
    };

    sortByScore = (comments) => {
        return comments.slice().sort((a, b) => {
            return b.score - a.score;
        });
    };

    componentDidMount() {
        fetch('http://localhost:2407/comment/members')
            .then(response => response.json())
            .then(data => {
                this.setState({ members: data });
            });
    }

    render() {
        const Img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png';

        const { members } = this.state;
        const filteredComments = this.props.comment.filter(comment => comment.movieID === this.props.filmInfo.id);

        return (
            <div>
                {filteredComments.map((comment, index) => {
                    const member = members.find(member => member.UserID === comment.userID);

                    return (
                        <div className={CMS.ocb} key={index}>
                            {/* Your comment rendering logic */}
                            <Link to={`/personalSocialPage/${comment.userID}`}><img className={CMS.user} src={Img} alt=' ' /></Link>
                            <div className={CMS.tb}>
                                <div className={CMS.name}>{member ? member.userName : comment.userID}</div>
                                <div className={CMS.comm}>{comment.comment}</div>
                                <CommentFoot />
                            </div>
                            <div>
                                <StarRate score={comment.score} />
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