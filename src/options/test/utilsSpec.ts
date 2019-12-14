import 'mocha';

import {expect} from 'chai';

describe('asdfds', () => {
  it('asdf', () => {
    expect(true).to.be.false;
  });
});

// import {isSettingValid} from '../main/utils';

// describe('Options utils: ', () => {
//   describe('isSettingValid', () => {
//     it('recognizes a valid setting', () => {
//       expect(isSettingValid({
//         selector: 'x',
//         urlPrefix: 'x',
//       })).to.be.true;
//       expect(isSettingValid({
//         regexp: new RegExp('x'),
//         selector: 'x',
//         urlPrefix: 'x',
//       })).to.be.true;
//     });

//     it('recognizes an invalid valid setting', () => {
//       expect(isSettingValid({
//         selector: '',
//         urlPrefix: 'x',
//       })).to.be.false;
//       expect(isSettingValid({
//         regexp: new RegExp('x'),
//         selector: '',
//         urlPrefix: 'x',
//       })).to.be.false;
//       expect(isSettingValid({
//         regexp: new RegExp('x'),
//         selector: 'x',
//         urlPrefix: '',
//       })).to.be.false;
//     });
//   });
// });
