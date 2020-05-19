import debounce from 'lodash/debounce';

const onIconClicked = () => {
  chrome.tabs.create({ url: 'main_window.html' });
};

chrome.browserAction.onClicked.addListener(debounce(onIconClicked, 500, { leading: true }));
