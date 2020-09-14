import React, {useEffect, useState} from "react";
import * as ReactDOM from "react-dom";
import  {Popup} from './Components/componentsLibrary';
import './Components/componentsLibrary.css'

/*document.addEventListener('mouseup', function (event) {
    chrome.runtime.sendMessage({type: 'selectedText', 'data': window.getSelection().toString()});
});*/

function App() {
    useEffect(() => {
        chrome.runtime.sendMessage({ popupMounted: true });
    }, []);
    return (
        <div className="App">
            <button id="test" onClick={() => {
                // chrome.tabs.sendMessage(null,{test:'12341231'});
                const select = window.getSelection().toString();
            }}>testClick
            </button>
            <Popup/>
        </div>
    );
}

function SeparateTab() {

    const [selectionWord, setSelectionWord] = React.useState<string>('test');
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request.data.selectionWord);
        switch (request.message) {
            case 'setText':
                setSelectionWord(request.data.selectionWord);
                break;

            default:
                sendResponse({data: 'Invalid arguments'});
                break;
        }
    });
    return (
        <div className="Test">
            <Popup/>
            <button id="test" onClick={() => {
                alert('ok');
            }}>
                Click Button
            </button>
            {selectionWord}
        </div>
    );
}


/**
 * Метод определения текущей страницы
 * (Является ли она отдельной вкладкой)
 */
function definingSelectedPage(): void {
    if (document.getElementById("root")) {
        ReactDOM.render(<App/>, document.getElementById("root"));
    } else if (document.getElementById("separateTab")) {
        ReactDOM.render(<SeparateTab/>, document.getElementById("separateTab"));
    }
}


definingSelectedPage();


