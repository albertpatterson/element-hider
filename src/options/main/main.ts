import {getElementHiderListFromSettings} from './storage';
import {showElementHiderList} from './view';

if (window.chrome) {
  getElementHiderListFromSettings(showElementHiderList);
}
