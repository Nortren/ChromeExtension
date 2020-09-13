import * as React from 'react'
import * as ReactDOM from "react-dom";
import  {Popup} from './Components/componentsLibrary';
import {useEffect} from 'react-redux';
import './Components/componentsLibrary.css'
const contexts = ["page", "selection"];


document.addEventListener('mouseup', function (event) {
    chrome.runtime.sendMessage({type: 'selectedText', 'data': window.getSelection().toString()});
});

function App() {
    const [selectionWord, setSelectionWord] = React.useState<object[]>('test');
    React.useEffect(() => {
        for (let i = 0; i < contexts.length; i++) {
            const context = contexts[i];
            const title = "test new page";
            const id = chrome.contextMenus.create({
                "title": title, "contexts": [context],
                "onclick": openNewPage
            });
        }

        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

            console.log(123124124);
            switch (request.message) {
                case 'selectedText':
                    alert('1231231');
                    setSelectionWord(request.data.selectionWord);
                    break;

                default:
                    sendResponse({data: 'Invalid arguments'});
                    break;
            }
        });

    }, []);


    function openNewPage() {
        const optionsUrl = chrome.extension.getURL('separateTab.html');
        chrome.tabs.create({url: optionsUrl}, (optional) => {
            chrome.tabs.executeScript(optional.id, {code: "document.body.style='background-color: green'"});

            chrome.runtime.sendMessage({
                'message': 'setText',
                'data': {selectionWord, id: optional.id}
            }, function (response) {
            });
        });
    }


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
    const [selectionWord, setSelectionWord] = React.useState<object[]>('test');
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


