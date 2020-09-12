import * as React from 'react'
import * as ReactDOM from "react-dom";
import  {Popup} from './Components/componentsLibrary';
import './Components/componentsLibrary.css'
function App() {

// Создаем пункт меню перехода на sz
    const contexts = ["page","selection"];

    for (let i = 0; i < contexts.length; i++) {
        const context = contexts[i];
        const title = "test new page";
        const id = chrome.contextMenus.create({"title": title, "contexts":[context],
            "onclick": openNewPage});
    }



    function openNewPage() {
        const optionsUrl = chrome.extension.getURL('test.html');
        chrome.tabs.create({url: optionsUrl});
    }

  return (
    <div className="App">
      <Popup/>
    </div>
  );
}
ReactDOM.render(<App/>, document.getElementById("root"));

