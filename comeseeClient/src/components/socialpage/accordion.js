import React, { useState, useEffect } from 'react';
import Socialhomestyle from '../../css/socialpage/socialhome.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import StarRate from './starRate'
import axios from 'axios';

function Accordion({ searchTerm, selectedFilter }) {

    const [movie, setMovie] = useState([]);
    const [members, setMembers] = useState([]);

    const itemsPerPage = 15; //一頁幾項
    const [activeItem, setActiveItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const calculateTotalRaters = (user) => {
        const ratersSet = new Set();
        user.comments.forEach((commentData) => {
            if (commentData.comment) {
                ratersSet.add(commentData.comment);
            }
        });
        return ratersSet.size;
    };

    useEffect(() => {
        axios.get('http://localhost:2407/socialhome')
            .then(res => {
                setMovie(res.data);
                setTotalPages(Math.ceil(res.data.length / itemsPerPage));
            })
            .catch(err => {
                console.log(err.response);
            });

        axios.get('http://localhost:2407/socialhome/members')
            .then(res => {
                setMembers(res.data);
            })
            .catch(err => {
                console.log(err.response);
            });
    }, []);




    const filterUsersByDate = (users, selectedFilter) => {
        switch (selectedFilter) {
            case '1': // 上映60天内
                return users.filter(user => {
                    const currentDate = new Date();
                    const movieDate = new Date(user.releaseDate);
                    const diffTime = Math.abs(currentDate - movieDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 60;
                });
            case '2': // 上映120天内
                return users.filter(user => {
                    const currentDate = new Date();
                    const movieDate = new Date(user.releaseDate);
                    const diffTime = Math.abs(currentDate - movieDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays <= 120;
                });
            case '3': // 2023年
                return users.filter(user => user.releaseDate.includes('2023'));
            case '4': // 2022年
                return users.filter(user => user.releaseDate.includes('2022'));
            case '5': // 2021年
                return users.filter(user => user.releaseDate.includes('2021'));
            case '6': // 2020年
                return users.filter(user => user.releaseDate.includes('2020'));
            default:
                return users;
        }
    };
    const filteredUsers = filterUsersByDate(movie, selectedFilter)
        .filter((user) => user.movieNameCN.includes(searchTerm));



    useEffect(() => {
        setActiveItem(null);
    }, [currentPage]);

    const handleAccordionClick = (itemId) => {
        if (activeItem === itemId) {
            setActiveItem(null);
        } else {
            setActiveItem(itemId);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageSelect = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    return (
        <div className={Socialhomestyle.accordionall}>

            {filteredUsers.slice(startIndex, endIndex).map((user, index1) => (
                <div className={Socialhomestyle.accordnall} key={index1}>
                    <h2 id={`flush-heading${index1}`} className={Socialhomestyle.accordionh2}>
                        <button
                            className={`pt-2 accordion-button ${activeItem === index1 ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse${index1}`}
                            aria-expanded={activeItem === index1 ? 'true' : 'false'}
                            aria-controls={`flush-collapse${index1}`}
                            onClick={() => handleAccordionClick(index1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 16 18"
                                fill="none"
                                className="col-1">
                                <path
                                    d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 0 17.4678 0 15.9282V2.0718C0 0.532197 1.66667 -0.430054 3 0.339746L15 7.26795Z"
                                    fill="#F1EFE9" />
                            </svg>
                            <div className={Socialhomestyle.accordion123 + " col-3"}>{user.movieNameCN}</div>
                            <div className={Socialhomestyle.accordion123 + " col-4"}>
                                {new Date(user.releaseDate).toISOString().split('T')[0]}</div>
                            <div className={Socialhomestyle.accordion123 + " col-2"}><StarRate /></div>
                            <div className={Socialhomestyle.accordion123 + " col-2"}>共{calculateTotalRaters(user)}位評分</div>
                        </button>
                    </h2>
                    <div
                        id={`flush-collapse${index1}`}
                        className={`accordion-collapse collapse ${activeItem === index1 ? 'show' : ''}`}
                        aria-labelledby={`flush-heading${index1}`}
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className={"accordion-body " + Socialhomestyle.accordionbody}>
                            <div className="col-1"></div>
                            <img className={Socialhomestyle.poster + " col-2"} src={user.imageUrl} height="230px" alt=""></img>
                            <div className="col-1"></div>
                            <div className={Socialhomestyle.usercomment + " col-6"}>
                                {user.comments.slice(0, 5).map((commentData, commentIndex) => {
                                    const userData = members.find(member => member.userID === commentData.userID);
                                    const userName = userData ? userData.userName : "User";
                                    const comment = commentData.comment;
                                    return (
                                        <div className={Socialhomestyle.usercontent1} key={commentIndex}>
                                            <div className={Socialhomestyle.usercontent}>
                                                <Link to="/personalSocialPage/:userID" className={Socialhomestyle.linkstyle}>{userName}:</Link>
                                                <div className={Socialhomestyle.usercontent2}>{comment}</div>
                                                <StarRate score={commentData.score} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>

            ))
            }
            <div className={Socialhomestyle.pagination}>
                <button
                    className={Socialhomestyle.btnpage}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                        <path d="M7 1L1 7L7 13" stroke="#F1EFE9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span> 上一頁</span>
                </button>
                <div className={Socialhomestyle.pageSelector}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={` ${currentPage === index + 1 ? Socialhomestyle.btnclick : Socialhomestyle.btnpageonclick}`}
                            onClick={() => handlePageSelect(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    className={Socialhomestyle.btnpage}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <span>下一頁 </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                        <path d="M1 13L7 7L0.999999 1" stroke="#F1EFE9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div >

    )
};

export default Accordion;