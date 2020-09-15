import React, {useEffect, useState} from "react";
import * as ReactDOM from "react-dom";
import  {Popup, SeparateTab} from './Components/componentsLibrary';
import './Components/componentsLibrary.css'

/**
 * Метод определения текущей страницы
 * (Является ли она отдельной вкладкой)
 */
function definingSelectedPage(): void {
    if (document.getElementById("root")) {
        ReactDOM.render( <Popup/>, document.getElementById("root"));
    } else if (document.getElementById("separateTab")) {
        ReactDOM.render(<SeparateTab/>, document.getElementById("separateTab"));
    }
}


definingSelectedPage();


