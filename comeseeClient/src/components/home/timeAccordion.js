import React, { Component } from 'react';

import TAS from '../../css/home/timetabsComponent.module.css'
import VerLabel from './verlabel';
import TimeBtn from './timeBtn';


class TimeAccordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePanels: [1, 2], // 使用陣列來追蹤多個面板的打開狀態
        };
    }

    togglePanel = (panelId) => {
        this.setState((prevState) => {
            const activePanels = [...prevState.activePanels];  // 複製先前的 activePanels 陣列
            const index = activePanels.indexOf(panelId);       // 檢查要切換的面板是否已打開

            if (index === -1) {         // 如果面板未打開，則添加到陣列中
                activePanels.push(panelId);
            } else {                    // 如果面板已經打開，則從陣列中刪除
                activePanels.splice(index, 1);
            } return { activePanels };
        });
    };

    render() {

        const { activePanels } = this.state;

        return (

            <>

                <div className={`${TAS.ta} card`}>
                    <div className={TAS.header} onClick={() => this.togglePanel(1)}>
                        {/* 影城名稱 */}
                        <button
                            className={` ${TAS.title} ${activePanels.includes(1) ? '' : 'collapsed'}`}
                            aria-expanded={activePanels.includes(1) ? 'true' : 'false'}
                        >
                            影城{ }
                        </button>
                    </div>

                    <div
                        id="panel-1"
                        className={`${TAS.vat} collapse ${activePanels.includes(1) ? 'show' : ''}`}
                    >

                        {/* 類型標籤 */}
                        <div className={TAS.vb}>
                            {/* map */}
                            <VerLabel label={"數位"} />
                        </div>

                        {/* 時刻按鈕 */}
                        <div className={TAS.tb}>
                            {/* map */}
                            <TimeBtn label={123} />
                        </div>


                    </div>

                </div>

                <div className={`${TAS.ta} card`}>

                    <div className={TAS.header} onClick={() => this.togglePanel(2)}>
                        <button
                            className={` ${TAS.title} ${activePanels.includes(2) ? '' : 'collapsed'}`}
                            aria-expanded={activePanels.includes(2) ? 'true' : 'false'}
                        >
                            影城{ }
                        </button>
                    </div>

                    <div
                        id="panel-1"
                        className={`${TAS.vat} collapse ${activePanels.includes(2) ? 'show' : ''}`}
                    >
                        <div className={TAS.vb}>
                            <VerLabel label={"數位"} />
                        </div>
                        <div className={TAS.tb}>
                            <TimeBtn label="時間" />
                        </div>
                    </div>

                </div>



                <div
                    className="modal fade"
                    id="checkModal"
                    tabindex="-1"
                    aria-labelledby="ModalLabel"
                    aria-hidden="true"
                >


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
                                        <td style={{ padding: "0 10px" }} >我的麻吉4個鬼{ }</td>
                                        <td className={TAS.tdbd} >豐原豪華in89影城{ }</td>
                                        <td className={TAS.tdbd} >08.23{ }</td>
                                        <td className={TAS.tdbd} >數位{ }</td>
                                        <td className={TAS.tdbd} >15:00{ }</td>
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


                </div>



            </>
        );
    }
}

export default TimeAccordion;
