const ELEMENT_HIDER_LIST_KEY = 'element-hider-list';
import {IElementIdentierSetting, IElementIdentifier} from './types';

export function getElementHiderListFromSettings(
    operation: (list: IElementIdentierSetting[]) => void) {
  chrome.storage.sync.get(
      [ELEMENT_HIDER_LIST_KEY],
      (settings: any) => {
        const list = settings && settings[ELEMENT_HIDER_LIST_KEY] || [];

        operation(list);
      },
  );
}

export function addElementHiderItemToSettings(item: IElementIdentierSetting) {
  getElementHiderListFromSettings((list: IElementIdentierSetting[]) => {
    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: [...list, item]});
  });
}

export function removeElementHiderItemFromSettings(
    removeItem: IElementIdentifier) {
  getElementHiderListFromSettings((list: IElementIdentierSetting[]) => {
    const filtered = list.filter(
        (item: IElementIdentierSetting) =>
            !(item.identifier.urlPrefix === removeItem.urlPrefix &&
              item.identifier.selector === removeItem.selector &&
              item.identifier.regexp === removeItem.regexp));

    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: filtered});
  });
}
