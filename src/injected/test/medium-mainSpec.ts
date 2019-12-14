// import 'mocha';
// // import 'sinon';

// import {assert, expect} from 'chai';
// import sinon = require('sinon');
// import * as mediumUtils from '../main/utils';

// describe('injected module main', () => {
//   let removeArticleSpy: sinon.SinonSpy<[HTMLElement], void>;

//   beforeEach(() => {
//     const windowAny = window as any;
//     document.body.innerHTML =
//     windowAny.__html__['src/injected/test/fixture']; removeArticleSpy =
//     sinon.spy(mediumUtils, 'removeArticle');
//   });

//   afterEach(() => {
//     removeArticleSpy.restore();
//   });

//   it('removes editor picks on load', () => {
//     const loadEvent = new Event('load');
//     document.dispatchEvent(loadEvent);
//     expect(removeArticleSpy.calledOnce).to.be.true;
//   });

//   it('removes editor picks on scroll', () => {
//     const scrollEvent = new Event('scroll');
//     document.dispatchEvent(scrollEvent);
//     expect(removeArticleSpy.callCount).to.equal(1);
//   });
// });
