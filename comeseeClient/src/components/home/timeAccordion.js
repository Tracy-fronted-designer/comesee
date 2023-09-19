import React, { useState, useEffect } from 'react';
import axios from "axios";

import TAS from '../../css/home/timetabsComponent.module.css'
import VerLabel from './verlabel';
import TimeBtn from './timeBtn';


function TimeAccordion(props) {

    const [activePanels, setActivePanels] = useState([1, 2]);

    const [version, setVersion] = useState([]);
    const [showTime, setShowTime] = useState([]);
    const [showTimeid, setShowTimeid] = useState("");
    const [checkDate, setCheckData] = useState("");

    const id = parseInt(props.id);
    const date = props.date;

    // console.log();

    // 手風琴面板開關
    const togglePanel = (panelId) => {
        setActivePanels((prevActivePanels) => {
            const activePanelsCopy = [...prevActivePanels];
            const index = activePanelsCopy.indexOf(panelId);
            if (index === -1) {
                activePanelsCopy.push(panelId);
            } else {
                activePanelsCopy.splice(index, 1);
            }
            return activePanelsCopy;
        });
    };

    // 後端取得場次
    useEffect(() => {
        axios
            .post('http://localhost:2407/filminfo/getversion', {
                movieID: id,
                cinemaID: props.cinemaID,
                date: props.date,
            })
            .then((res) => {
                setVersion(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [id, props.cinemaID, props.date]);

    // 後端取得時間
    // useEffect((props) => {

    //     const handleTheaterIDChange = (theaterID) => {
    //         // 在这里可以使用 theaterID，例如将其存储在 state 中
    //         // 这里只是一个示例，你可以根据需要进行处理
    //         console.log('Theater ID:', theaterID);
    //         axios
    //             .post('http://localhost:2407/filminfo/getshowtime', {
    //                 movieID: movieID,
    //                 cinemaID: props.cinemaID,
    //                 // theaterID: ,
    //                 date: props.date,
    //             })
    //             .then((res) => {
    //                 console.log(version);

    //             })
    //             .catch((err) => {
    //                 console.log(err.response);
    //             });
    //     }
    // }, [id, props.cinemaID, , props.date]);
    const handleTheaterIDChange = (theaterID) => {
        // console.log('Theater ID:', theaterID);
        axios
            .post('http://localhost:2407/filminfo/getshowtime', {
                movieID: id,
                cinemaID: props.cinemaID,
                theaterID: theaterID, // 子元件傳遞回来的ID
                date: props.date,
            })
            .then((res) => {
                setShowTime(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    function getShowTimeID(e) {
        // setShowTimeid(e.target.id);
        console.log(13);
    };

    // 確認場次資訊
    useEffect(() => {
        axios
            .get(`http://localhost:2407/filminfo/getcheck/${showTimeid}`, {
            })
            .then((res) => {
                setCheckData(res.data);
                console.log(showTimeid);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [showTimeid]);




    return (

        <>



            <div className={`${TAS.ta} card`}>
                <div className={TAS.header} onClick={() => togglePanel(1)}>
                    {/* 影城名稱 */}
                    <button
                        className={` ${TAS.title} ${activePanels.includes(1) ? '' : 'collapsed'}`}
                        aria-expanded={activePanels.includes(1) ? 'true' : 'false'}
                    >
                        {props.cinemaName}
                    </button>
                </div>

                <div
                    id="panel-1"
                    className={`${TAS.vat} collapse ${activePanels.includes(1) ? 'show' : ''}`}
                >

                    {/* map */}


                    {version.map((vItem, index) => (
                        <div className={TAS.vat2} key={index} >

                            {/* 類型標籤 */}
                            <div className={TAS.vb}>
                                <VerLabel id={vItem.theaterID} label={vItem.version} onIdChange={handleTheaterIDChange} />
                            </div>

                            {/* 時刻按鈕 */}
                            <div className={TAS.tb}>
                                {/* map */}
                                {showTime.map((tItem, index) => (
                                    < TimeBtn key={index} id={tItem.showtimeID} label={tItem.startTime} onClick={getShowTimeID} />
                                ))}
                            </div>

                        </div>
                    ))}

                </div>

            </div>




            {/* check modal */}
            < div
                className="modal fade"
                id="checkModal"
                tabindex="-1"
                aria-labelledby="ModalLabel"
                aria-hidden="true">



                <div className="modal-dialog modal-dialog-centered">


                    <div className={`${TAS.modalcontent} modal-content`}>

                        <div className={`${TAS.modalheader} modal-header`}>
                            <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>

                        </div>

                        <div className={`${TAS.modalbody} modal-body`}>

                            <table className={TAS.checkTable} >
                                <tr className={TAS.checkTitle}>
                                    <th style={{ padding: "0 10px" }} >片名</th>
                                    <th className={TAS.tdbd} >影城</th>
                                    <th className={TAS.tdbd} >日期</th>
                                    <th className={TAS.tdbd} >版本</th>
                                    <th className={TAS.tdbd} >時間</th>
                                </tr>
                                <tr className={TAS.checkInfo}>
                                    <td style={{ padding: "0 10px" }} >查無此心{ }</td>
                                    <td className={TAS.tdbd} >白夏影城{ }</td>
                                    <td className={TAS.tdbd} >09.01{ }</td>
                                    <td className={TAS.tdbd} >數位{ }</td>
                                    <td className={TAS.tdbd} >12:00{ }</td>
                                </tr>
                            </table>

                            <h4 className={TAS.numberTitle}>人數</h4>
                            <div className={`${TAS.numberForm} ckmd`}>
                                <input type="radio" name="number" id="n1" className="btn-check" />
                                <label for="n1" className={`${TAS.numberLabel} btn`}>1</label>
                                <input type="radio" name="number" id="n2" className="btn-check" />
                                <label for="n2" className={`${TAS.numberLabel} btn`}>2</label>
                                <input type="radio" name="number" id="n3" className="btn-check" />
                                <label for="n3" className={`${TAS.numberLabel} btn`}>3</label>
                                <input type="radio" name="number" id="n4" className="btn-check" />
                                <label for="n4" className={`${TAS.numberLabel} btn`}>4</label>
                                <input type="radio" name="number" id="n5" className="btn-check" />
                                <label for="n5" className={`${TAS.numberLabel} btn`}>5</label>
                                <input type="radio" name="number" id="n6" className="btn-check" />
                                <label for="n6" className={`${TAS.numberLabel} btn`}>6</label>
                            </div>

                        </div>

                        <div className={`${TAS.modalfooter} modal-footer`} >
                            <button className={TAS.modalcheck} type="button">送出</button>
                        </div>

                    </div>



                </div>



            </div >



        </>
    );
}


export default TimeAccordion;
