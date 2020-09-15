interface IResultTabs {
    status?: string;
    index: number;
    openerTabId?: number;
    title?: string;
    url?: string;
    pendingUrl?: string;
    pinned: boolean;
    highlighted: boolean;
    windowId: number;
    active: boolean;
    favIconUrl?: string;
    id?: number;
    incognito: boolean;
    selected: boolean;
    audible?: boolean;
    discarded: boolean;
    autoDiscardable: boolean;
    mutedInfo?: object;
    width?: number;
    height?: number;
    sessionId?: string;
}

interface IFrame {
    editable: boolean;
    frameId: number;
    menuItemId: string;
    pageUrl: string;
    selectionText: string;
}

/**
 * Функиця инициализации фонового скрипта
 * И подписка на событие клика по контекстному меню
 */
const romeExtensionIsActivate = () => {
    chrome.contextMenus.create({
        id: "selected",
        title: "selected text",
        contexts: ["all"],
    });

    const contextMenuClick = new Promise((resolve) => {
        chrome.contextMenus.onClicked.addListener(info => resolve(info))
    });

    contextMenuClick.then(
        (info: IFrame) => {
            if (info.menuItemId == "selected") {
                const optionsUrl = chrome.extension.getURL('separateTab.html');
                createNewTabs(optionsUrl, info);

            }
        });
};

/**
 * Функция создания новой вкладки
 */
const createNewTabs = (optionsUrl: string, info: IFrame) => {
    const createTabsStatus = new Promise((resolve) => {
        chrome.tabs.create({url: optionsUrl}, tab => {
            resolve(tab);
        });
    });

    createTabsStatus.then((res: IResultTabs) => {
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
