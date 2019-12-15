const ELEMENT_HIDER_LIST_KEY = 'element-hider-list';
import {IElementIdentierSetting, IElementIdentifier} from './types';

export class Storage {
  public getElementHiderListFromSettings(
      operation: (list: IElementIdentierSetting[]) => void) {
    chrome.storage.sync.get(
        [ELEMENT_HIDER_LIST_KEY],
        (settings: any) => {
          const list = settings && settings[ELEMENT_HIDER_LIST_KEY] || [];

          operation(list);
        },
    );
  }

  public addElementHiderItemToSettings(
      item: IElementIdentierSetting, callback?: () => void) {
    this.getElementHiderListFromSettings((list: IElementIdentierSetting[]) => {
      chrome.storage.sync.set(
          {[ELEMENT_HIDER_LIST_KEY]: [...list, item]},
          callback,
      );
    });
  }

  public removeElementHiderItemFromSettings(
      removeItem: IElementIdentifier, callback?: () => void) {
    this.getElementHiderListFromSettings((list: IElementIdentierSetting[]) => {
      const filtered = list.filter(
          (item: IElementIdentierSetting) =>
              !(item.identifier.urlPrefix === removeItem.urlPrefix &&
                item.identifier.selector === removeItem.selector &&
                item.identifier.regExpSrc === removeItem.regExpSrc));

      chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: filtered}, callback);
    });
  }

  public clearElementHiderItemSettings(callback?: () => void) {
    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: []}, callback);
  }

  public updateElementHiderItemToSettings(
      oldSetting: IElementIdentierSetting, newSetting: IElementIdentierSetting,
      callback?: () => void) {
    this.removeElementHiderItemFromSettings(
        oldSetting.identifier,
        () => this.addElementHiderItemToSettings(newSetting, callback));
  }
}

export const storage = new Storage();
