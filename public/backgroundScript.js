// Общая функция OnClick обратного вызова.
function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}

// Создаем пункт меню перехода на sz
var contexts = ["page","selection"];
for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Перейти на SafeZone.cc";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
        "onclick": opensz});

}

//////////////////////////////////////////////////////////////////////////////////

// Создаем действие с меню для определенных типов файлов
//var contexts = ["page","selection","link","editable","image","video",
//     "audio"];
//for (var i = 0; i < contexts.length; i++) {
//var context = contexts[i];
//var title = "Действие для'" + context + "'которое возможно";
// var id = chrome.contextMenus.create({"title": title, "contexts":[context],
//                                    "onclick": genericOnClick});
// console.log("'" + context + "' item:" + id);
//}


// Создаем раскрывающееся контексное меню.
var parent = chrome.contextMenus.create({"title": "Поиск:"});
var child1 = chrome.contextMenus.create(
    //{"title": "Перейти на SafeZone.cc", "parentId": parent, "onclick": Menu1});
//var child2 = chrome.contextMenus.create(
    {"title": "Открыть поиск по SafeZone", "parentId": parent, "onclick": Menu2});
var child3 = chrome.contextMenus.create(
    {"title": "Открыть поиск по Yandex", "parentId": parent, "onclick": Menu3});
var child4 = chrome.contextMenus.create(
    {"title": "Открыть поиск по Google", "parentId": parent, "onclick": Menu4});


function opensz(info, tab) {
    window.open('http://safezone.cc/');
};

function Menu1(info, tab) {
    window.open('http://safezone.cc/');
};

function Menu2(info, tab) {

    window.open('https://www.google.com:443/cse/publicurl?cx=011665641833326316287:1ay2gmqz5qu','info','height=520,width=520');
};

function Menu3(info, tab) {

    window.open('http://www.ya.ru/','info','height=520,width=520');
};

function Menu4(info, tab) {

    window.open('https://www.google.com/search','info','height=520,width=520');
};




console.log("About to try creating an invalid item - an error about " +
    "item 999 should show up");
chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
    if (chrome.extension.lastError) {
        console.log("Got expected error: " + chrome.extension.lastError.message);
    }
});