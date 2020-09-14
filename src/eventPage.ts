interface resultTabs {
    id: number;
}
const romeExtensionIsActivate = () => {
    if (true) {
        chrome.contextMenus.create({
            id: "some-command",
            title: "selected text",
            contexts: ["all"],
        });

        chrome.contextMenus.onClicked.addListener(function (info, tab) {
            if (info.menuItemId == "some-command") {
                const optionsUrl = chrome.extension.getURL('separateTab.html');

                new Promise((resolve) => {
                    chrome.tabs.create({url: optionsUrl}, tab => {
                        resolve(tab);
                    });
                }).then((res: resultTabs) => {
                    chrome.runtime.sendMessage({
                        'message': 'setText',
                        'data': {selectionWord: info.selectionText, id: res.id}
                    }, function (response) {
                    });
                })


            }
        });
    }
};
romeExtensionIsActivate();