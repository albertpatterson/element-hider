// import {getElementHiderListFromSettings} from '../../shared/storage';

import * as mediumUtils from './utils';

document.addEventListener('load', hideAllMatches);

const hideAllMatchesThrottled: () => void =
    mediumUtils.throttle(hideAllMatches, 250);
document.addEventListener('scroll', hideAllMatchesThrottled);

function hideAllMatches() {
  //   mediumUtils.getArticles()
  //       .filter(mediumUtils.isEditorsPick)
  //       .forEach(mediumUtils.hideArticle);
}
