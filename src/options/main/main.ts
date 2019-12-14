import {clearElementHiderItemSettings, getElementHiderListFromSettings} from '../../shared/storage';

import {showElementHiderList} from './view';

if (window.chrome) {
  getElementHiderListFromSettings(showElementHiderList);
}

const clearAllButton = document.getElementById('clear-all');
if (clearAllButton) {
  clearAllButton.addEventListener(
      'click', () => clearElementHiderItemSettings());
}
