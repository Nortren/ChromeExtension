import React, {useEffect, useState} from "react";
/**
 * Компонент контейнер отдельной вкладки
 * @returns {any}
 * @constructor
 */

export default function SeparateTab() {
    React.useEffect(() => {
        chrome.runtime.sendMessage({"action": "getTxns"}, (txns) => {

        });
    }, []);

    const [selectionWord, setSelectionWord] = React.useState<string>('test');
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        switch (request.message) {
            case 'setText':
                setSelectionWord(request.data.selectionWord);
                break;

            default:
                sendResponse({data: 'Ierror in the passed argument'});
                break;
        }
    });
    return (
        <div className="separateTab_container">
            {selectionWord}
        </div>
    );
}
