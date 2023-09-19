import React, { useState, useEffect } from 'react';
import axios from "axios";

import TAS from '../../css/home/timetabsComponent.module.css';


const TimeBtn = (props) => {

    const [showTime, setShowTime] = useState([]);
    const [showTimeID, setShowTimeID] = useState("");

    const [checkData, setCheckData] = useState([]);

    const movieID = props.movieID;
    const date = props.date;
    const theaterID = props.theaterID;

    const parts = date.split('-');
    const checkShowDate = `${parts[1]}.${parts[2]}`;


    // 後端取得時間
    useEffect(() => {
        axios
            .post('http://localhost:2407/filminfo/getshowtime', {
                movieID: movieID,
                theaterID: theaterID,
                date: date
            })
            .then((res) => {
                setShowTime(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [movieID, theaterID, date]);

    // console.log(movieID);
    // console.log(date);
    // console.log(theaterID);

    function getShowTimeID(e) {
        setShowTimeID(e.target.id);
    };

    // 取得電影詳細資訊確認
    useEffect(() => {
        axios
            .get(`http://localhost:2407/filminfo/getcheck/${showTimeID}`)
            .then((res) => {
                setCheckData(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [showTimeID]);

    // console.log(checkData[0].movieNameCN);



    return (
        <>

            {showTime.map((sItem, index) => (

                <button
                    key={index}
                    id={sItem.showtimeID}
                    className={TAS.timeBtn}
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#checkModal"
                    onClick={getShowTimeID}
                >
                    {sItem.startTime}
                </button>

            ))}



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

                                {checkData.length > 0 ? (
                                    <tr className={TAS.checkInfo}>
                                        <td style={{ padding: "0 10px" }} >{checkData[0].movieNameCN}</td>
                                        <td className={TAS.tdbd} >{checkData[0].cinemaName}</td>
                                        <td className={TAS.tdbd} >{checkShowDate}</td>
                                        <td className={TAS.tdbd} >{checkData[0].version}</td>
                                        <td className={TAS.tdbd} >{checkData[0].startTime}</td>
                                    </tr>
                                ) : null}
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



export default TimeBtn;