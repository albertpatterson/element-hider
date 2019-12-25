import {storage} from '../../shared/storage';
import {IElementIdentierSetting} from '../../shared/types';

import * as mediumUtils from './utils';

document.addEventListener('load', hideAllMatches);

const hideAllMatchesThrottled: () => void =
    mediumUtils.throttle(hideAllMatches, 250);
document.addEventListener('scroll', hideAllMatchesThrottled);

function hideAllMatches() {
  //   mediumUtils.getArticles()
  //       .filter(mediumUtils.isEditorsPick)
  //       .forEach(mediumUtils.hideArticle);
  storage.getElementHiderListFromSettings(
      (settings: IElementIdentierSetting[]) => {
        // tslint:disable-next-line: no-console
        console.log('hider settings', settings);
      });
}
