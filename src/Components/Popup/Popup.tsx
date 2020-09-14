import * as React from 'react';
/**
 * Компонент лоадер загрузки
 * показываем его пока нам не пришли готовые данные
 * @returns {any}
 * @constructor
 */

export default function Popup() {
    function testClick(){
        alert('test');
    }

    return (
        <div className="popup_container">
            <div className="loader_container-loader">TEST111</div>
            <button   onClick={() => {
                alert('ok');
                console.log(5214185284);
            }}>testClick</button>
        </div>
    );
}
