interface resultTabs {
    id: number;
}
/**
 * Функиця инициализации фонового скрипта
 */
const romeExtensionIsActivate = () => {
        chrome.contextMenus.create({
            id: "selected",
            title: "selected text",
            contexts: ["all"],
        });

        chrome.contextMenus.onClicked.addListener((info: object) => {
            if (info.menuItemId == "selected") {
                const optionsUrl = chrome.extension.getURL('separateTab.html');
                createNewTabs(optionsUrl, info);

            }
        });
};
/**
 * Функция создания новой вкладки
 */
const createNewTabs = (optionsUrl: string, info) => {
    new Promise((resolve) => {
        chrome.tabs.create({url: optionsUrl}, tab => {
            resolve(tab);
        });
    }).then((res: resultTabs) => {
        chrome.runtime.onMessage.addListener((request) => {
            if (request.action == "getTxns") {
                chrome.tabs.sendMessage(res.id, {
                    'message': 'setText',
                    'data': {selectionWord: info.selectionText, id: res.id}
                }, function (response) {
                });
            }
        });

    })
};

romeExtensionIsActivate();