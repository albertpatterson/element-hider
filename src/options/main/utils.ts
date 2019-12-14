import {IElementIdentifier} from '../../shared/types';

export function isSettingValid(item: IElementIdentifier): boolean {
  return !!(item.urlPrefix && item.selector);
}
