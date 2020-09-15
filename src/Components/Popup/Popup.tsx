import * as React from 'react';

/**
 * Компонент окно приложения
 * @returns {any}
 * @constructor
 */

export default function Popup() {

    return (
        <div className="popup_container">
            <div id="popupHeader">
                by Nortren
            </div>
            <div id="popupBodyLeft">
                <div className="loader_container-loader"></div>
            </div>
            <div id="popupBodyMiddle">
                <div className="loader_container-loader"></div>
            </div>
            <div id="popupBodyRight">
                <div className="loader_container-loader"></div>
            </div>
            <div id="popupFooter">
                version 0.0.1
            </div>
        </div>
    );
}
