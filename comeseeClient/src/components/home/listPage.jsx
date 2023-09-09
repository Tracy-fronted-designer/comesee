import React, { Component } from 'react';

import LS from '../../css/home/listPage.module.css';
import ListPageCard from './listPageCard';

class ListPage extends Component {

    state = {}

    render() {

        return (
            <div className={LS.List} >
                <div className="container">



                    <nav className={LS.myNav}>
                        <div className={LS.myTabs} id="nav-tab" role="tablist">

                            <button
                                className={`${LS.myLink} listTab active`}
                                id="nowPlaying-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nowPlaying"
                                type="button"
                                role="tab"
                                aria-controls="nowPlaying"
                                aria-selected="true"
                            >
                                現正熱映
                            </button>

                            <button
                                className={`${LS.myLink} listTab`}
                                id="comingSoon-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#comingSoon"
                                type="button"
                                role="tab"
                                aria-controls="comingSoon"
                                aria-selected="false"
                            >
                                即將上映
                            </button>
                        </div>
                    </nav>

                    <div className={`${LS.myContent} tab-content`} id="nav-tabContent">

                        <div
                            className="tab-pane fade show active"
                            id="nowPlaying"
                            role="tabpanel"
                            aria-labelledby="nowPlaying-tab"
                        >
                            <ListPageCard
                            // 電影id={ }
                            // 電影海報={ }
                            // 電影名稱={ }
                            // 電影英文名稱={ }
                            />
                            <ListPageCard />
                            <ListPageCard />
                            <ListPageCard />
                            <ListPageCard />
                        </div>

                        <div
                            className="tab-pane fade"
                            id="comingSoon"
                            role="tabpanel"
                            aria-labelledby="comingSoon-tab"
                        >
                            <ListPageCard />
                        </div>

                    </div>



                </div>
            </div>
        );
    }
}

export default ListPage;
