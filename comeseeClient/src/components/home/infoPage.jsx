import React, { Component } from 'react';

import Score from './score';
import ToastComponent from './like';

import TimeTabs from './timeTabs';
import StoryTabs from './storyTabs';
import CommentTabs from './commentTabs';

import IS from '../../css/home/infoPage.module.css';

class InfoPage extends Component {

    state = {}

    render() {

        const Img = 'https://truth.bahamut.com.tw/s01/202305/24a6a160d2f22c72b4e123bed23fe1f3.JPG';

        return (

            <div className={IS.Info}>
                <div className={` ${IS.box} container`}>

                    <div className="info-top row">

                        <div className="col-3">
                            <img className={IS.poster} src={Img} alt=' ' />
                        </div>

                        <div className="col-6 px-4 py-3">
                            <h1 className={IS.title}>電影名稱{ }</h1>
                            <h2 className={IS.subtitle}>電影英文名稱{ }</h2>

                            <div className={IS.info}>
                                <p>上映日期：{ }</p>
                                <p>片長：{ }</p>
                                <p>類型：{ }</p>
                                <p>導演：{ }</p>
                                <p>演員：{ }</p>
                            </div>
                        </div>

                        <div className={`${IS.scoreBox} col-3 px-5 py-3`}>
                            <ToastComponent />
                            <Score />
                        </div>

                    </div>


                    <div class="info-body">

                        <nav className={IS.myNav}>

                            <div className={IS.myTabs} id="nav-tab" role="tablist">
                                <button
                                    className={`${IS.myLink} infoTab active`}
                                    id="time-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#time"
                                    type="button"
                                    role="tab"
                                    aria-controls="time"
                                    aria-selected="true"
                                >
                                    現正熱映
                                </button>

                                <button
                                    className={`${IS.myLink} infoTab`}
                                    id="story-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#story"
                                    type="button"
                                    role="tab"
                                    aria-controls="story"
                                    aria-selected="false"
                                >
                                    劇情介紹
                                </button>

                                <button
                                    className={`${IS.myLink} infoTab`}
                                    id="comment-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#comment"
                                    type="button"
                                    role="tab"
                                    aria-controls="comment"
                                    aria-selected="false"
                                >
                                    評論
                                </button>
                            </div>

                        </nav>

                        <div className={`${IS.myContent} tab-content`} id="nav-tabContent">

                            <div
                                className="tab-pane fade show active"
                                id="time"
                                role="tabpanel"
                                aria-labelledby="time-tab"
                            >
                                <TimeTabs />
                            </div>

                            <div
                                className="tab-pane fade"
                                id="story"
                                role="tabpanel"
                                aria-labelledby="story-tab"
                            >
                                <StoryTabs />
                            </div>

                            <div
                                className="tab-pane fade"
                                id="comment"
                                role="tabpanel"
                                aria-labelledby="comment-tab"
                            >
                                <CommentTabs />
                            </div>

                        </div>




                    </div>

                </div>
            </div>
        );
    }
}

export default InfoPage;