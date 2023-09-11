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
                            <VerLabel label="數位" />
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
                            <VerLabel label="數位" />
                        </div>
                        <div className={TAS.tb}>
                            <TimeBtn />
                            <TimeBtn />
                            <TimeBtn />
                            <TimeBtn />
                            <TimeBtn />
                            <TimeBtn />
                        </div>
                    </div>

                </div>


                <div
                    className="modal fade"
                    id="Modal"
                    tabIndex={-1}
                    aria-labelledby="ModalLabel"
                    aria-hidden="true"
                >
                    <div className={`${TAS.modalbox} modal-dialog`}>
                        <div className={TAS.modalcontent}>
                            <div className={TAS.modalheader}>
                                <button
                                    type="button"
                                    className={`${TAS.modalclose} btn-close`}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>

                            <div className={TAS.modalbody}>
                                <h3 className={TAS.modaltitle}>注意</h3>
                                <p className={TAS.modaltext}>您目前所選的時段已無空位</p>
                                <p className={TAS.modaltext}>請重新選擇</p>
                            </div>
                            <div className={TAS.modalfooter}>
                                <button
                                    type="button"
                                    className={TAS.modalcheck}
                                    data-bs-dismiss="modal"
                                >
                                    確認
                                </button>
                            </div>
                        </div>
                    </div>

                </div>








            </>
        );
    }
}

export default TimeAccordion;
