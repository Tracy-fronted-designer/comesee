import React, { useState, useEffect } from 'react';
import Socialhomestyle from '../../css/socialpage/socialhome.module.css';
import { Users } from './moviedata';


function Accordion() {
    const itemsPerPage = 6; // 每页显示的项目数量
    const [activeItem, setActiveItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(Users.length / itemsPerPage);

    useEffect(() => {
        // 当用户切换页数时，确保当前项目被清除
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

    // 计算要显示的项目范围
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div className={Socialhomestyle.accordionall}>
            {Users.slice(startIndex, endIndex).map((user, index) => (
                <div className={Socialhomestyle.accordnall} key={index}>
                    <h2 id={`flush-heading${index}`} className={Socialhomestyle.accordionh2}>
                        <button
                            className={`pt-2 accordion-button ${activeItem === index ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse${index}`}
                            aria-expanded={activeItem === index ? 'true' : 'false'}
                            aria-controls={`flush-collapse${index}`}
                            onClick={() => handleAccordionClick(index)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 16 18"
                                fill="none"
                                className=" col-1">
                                <path d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 0 17.4678 0 15.9282V2.0718C0 0.532197 1.66667 -0.430054 3 0.339746L15 7.26795Z" fill="#F1EFE9" />
                            </svg>
                            <div className={Socialhomestyle.accordion123 + " col-4"}>{user.moviename}</div>
                            <div className={Socialhomestyle.accordion123 + " col-4"}>{user.date}</div>
                            <div className={Socialhomestyle.accordion123 + " col-3"}>{user.star}</div>
                        </button>
                    </h2>
                    <div
                        id={`flush-collapse${index}`}
                        className={`accordion-collapse collapse ${activeItem === index ? 'show' : ''}`}
                        aria-labelledby={`flush-heading${index}`}
                        data-bs-parent="#accordionFlushExample"
                    >
                        <div className={"accordion-body " + Socialhomestyle.accordionbody}>
                            <div className="col-2"></div>
                            <img className={Socialhomestyle.poster + " col-2"} src={user.poster} height="230px" alt=""></img>
                            <div className="col-1"></div>
                            <div className={Socialhomestyle.usercomment + " col-4"}>
                                {user.comment.map((comment, index) => (
                                    <div key={index}>
                                        <p className={Socialhomestyle.usercontent}>{comment}</p>

                                        {index !== user.comment.length - 1 && <br />}
                                    </div>
                                ))}
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