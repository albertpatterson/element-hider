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

export function addElementHiderItemToSettings(
    item: IElementIdentierSetting, callback?: () => void) {
  getElementHiderListFromSettings((list: IElementIdentierSetting[]) => {
    chrome.storage.sync.set(
        {[ELEMENT_HIDER_LIST_KEY]: [...list, item]},
        callback,
    );
  });
}

export function removeElementHiderItemFromSettings(
    removeItem: IElementIdentifier, callback?: () => void) {
  getElementHiderListFromSettings((list: IElementIdentierSetting[]) => {
    const filtered = list.filter(
        (item: IElementIdentierSetting) =>
            !(item.identifier.urlPrefix === removeItem.urlPrefix &&
              item.identifier.selector === removeItem.selector &&
              item.identifier.regExpSrc === removeItem.regExpSrc));

    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: filtered}, callback);
  });
}

export function clearElementHiderItemSettings(callback?: () => void) {
  chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: []}, callback);
}

export function updateElementHiderItemToSettings(
    oldSetting: IElementIdentierSetting, newSetting: IElementIdentierSetting,
    callback?: () => void) {
  removeElementHiderItemFromSettings(
      oldSetting.identifier,
      () => addElementHiderItemToSettings(newSetting, callback));
}
