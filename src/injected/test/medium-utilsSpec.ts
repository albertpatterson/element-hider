// import 'mocha';

// import {assert, expect} from 'chai';
// import * as mediumUtils from '../main/utils';

// describe('injected module medium utils', () => {
//   beforeEach(() => {
//     const windowAny = window as any;
//     document.body.innerHTML =
//     windowAny.__html__['src/injected/test/fixture'];
//   });

//   // it('identifies articles', () => {
//   //   const articles = mediumUtils.getArticles();
//   //   expect(articles.length).to.equal(3);
//   // });

//   // it('dentifies editors pics', () => {
//   //   const articles = mediumUtils.getArticles();
//   //   const isEditorsPick = articles.map(mediumUtils.isEditorsPick);
//   //   const expected = [false, true, false];

//   //   expect(isEditorsPick.length).to.equal(expected.length);
//   //   for (let i = 0; i < expect.length; i++) {
//   //     expect(isEditorsPick[i]).to.equal(expected[i]);
//   //   }
//   // });

//   // it('removes an article', () => {
//   //   let articles = mediumUtils.getArticles();
//   //   let isEditorsPick = articles.map(mediumUtils.isEditorsPick);
//   //   let expected = [false, true, false];

//   //   expect(isEditorsPick.length).to.equal(expected.length);
//   //   for (let i = 0; i < expect.length; i++) {
//   //     expect(isEditorsPick[i]).to.equal(expected[i]);
//   //   }

//   //   mediumUtils.hideArticle(articles[1]);

//   //   articles = mediumUtils.getArticles();
//   //   isEditorsPick = articles.map(mediumUtils.isEditorsPick);
//   //   expected = [false, false];

//   //   expect(isEditorsPick.length).to.equal(expected.length);
//   //   for (let i = 0; i < expect.length; i++) {
//   //     expect(isEditorsPick[i]).to.equal(expected[i]);
//   //   }
//   // });

//   it('throttles a function and calls to cleanup', (done) => {
//     let count = 0;
//     const incrementCount = () => count++;
//     const delay = 250;
//     const incrementCountThrottled = mediumUtils.throttle(incrementCount,
//     delay);

//     incrementCountThrottled();
//     expect(count).to.equal(1);
//     incrementCountThrottled();
//     expect(count).to.equal(1);

//     setTimeout(() => {
//       expect(count).to.equal(1);
//       incrementCountThrottled();
//       expect(count).to.equal(1);
//     }, delay / 2);

//     setTimeout(() => {
//       expect(count).to.equal(2);
//     }, delay * 2);

//     setTimeout(() => {
//       incrementCountThrottled();
//       expect(count).to.equal(3);
//       done();
//     }, delay * 4);
//   });
// });
