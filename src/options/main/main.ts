import {clearElementHiderItemSettings, getElementHiderListFromSettings} from '../../shared/storage';

import {showElementHiderList} from './view';

if (window.chrome) {
  // clearElementHiderItemSettings();
  getElementHiderListFromSettings(showElementHiderList);
}
