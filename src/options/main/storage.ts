const ELEMENT_HIDER_LIST_KEY = 'element-hider-list';
import {IElementHiderItem} from './types';

export function getElementHiderListFromSettings(
    operation: (list: IElementHiderItem[]) => void) {
  chrome.storage.sync.get(
      [ELEMENT_HIDER_LIST_KEY],
      (settings: any) => {
        const list = settings && settings[ELEMENT_HIDER_LIST_KEY] || [];

        operation(list);
      },
  );
}

export function addElementHiderItemToSettings(item: IElementHiderItem) {
  getElementHiderListFromSettings((list: IElementHiderItem[]) => {
    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: [...list, item]});
  });
}

export function removeElementHiderItemFromSettings(
    removeItem: IElementHiderItem) {
  getElementHiderListFromSettings((list: IElementHiderItem[]) => {
    const filtered = list.filter(
        (item: IElementHiderItem) =>
            !(item.domain === removeItem.domain &&
              item.selector === removeItem.selector &&
              item.regexp === removeItem.regexp));

    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: filtered});
  });
}
