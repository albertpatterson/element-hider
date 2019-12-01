import {IElementHiderItem} from './types';

export function isSettingValid(item: IElementHiderItem) {
  return item.domain && item.selector;
}
