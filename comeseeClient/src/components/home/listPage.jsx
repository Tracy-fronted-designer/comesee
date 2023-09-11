import React, { Component } from 'react';

import LS from '../../css/home/listPage.module.css';
import ListPageCard from './listPageCard';

class ListPage extends Component {

    state = {

        movie: [
            {
                "id": 1, "imageUrl": "https://www.mirrormedia.com.tw/assets/images/20230106145836-8de54a94bc2dc4af5762bc3aef823a1e-tablet.jpg",
                "movieNameCN": "我的麻吉", "movieNameEN": "Ghost"
            },
            {
                "id": 2, "imageUrl": "https://www.mirrormedia.com.tw/assets/images/20230106145836-8de54a94bc2dc4af5762bc3aef823a1e-tablet.jpg",
                "movieNameCN": "我的麻吉2", "movieNameEN": "Ghost2"
            },
            {
                "id": 3, "imageUrl": "https://www.mirrormedia.com.tw/assets/images/20230106145836-8de54a94bc2dc4af5762bc3aef823a1e-tablet.jpg",
                "movieNameCN": "我的麻吉3", "movieNameEN": "Ghost3"
            },
            {
                "id": 4, "imageUrl": "https://www.mirrormedia.com.tw/assets/images/20230106145836-8de54a94bc2dc4af5762bc3aef823a1e-tablet.jpg",
                "movieNameCN": "134654654", "movieNameEN": "ASDDFADSF"
            }
        ]

    }

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


                            {
                                this.state.movie.map(filmItem =>
                                    // mapㄉ內容
                                    <ListPageCard
                                        key={filmItem.id}
                                        id={filmItem.id}
                                        imageUrl={filmItem.imageUrl}
                                        movieNameCN={filmItem.movieNameCN}
                                        movieNameEN={filmItem.movieNameEN}
                                    />

                                )
                            }


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
