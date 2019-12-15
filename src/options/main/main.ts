import {storage} from '../../shared/storage';

import {ELEMENT_HIDER_LIST_TBODY_ID, showElementHiderList} from './view';

if (window.chrome) {
  const tbody = document.getElementById(ELEMENT_HIDER_LIST_TBODY_ID)! as
      HTMLTableSectionElement;
  storage.getElementHiderListFromSettings(
      (settings) => showElementHiderList(tbody, storage, settings));
}

const clearAllButton = document.getElementById('clear-all');
if (clearAllButton) {
  clearAllButton.addEventListener(
      'click', () => storage.clearElementHiderItemSettings());
}
