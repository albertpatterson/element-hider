// import 'mocha';

// import {expect} from 'chai';

// import {Browser} from '../../shared/types';
// import {setupBrowserAction} from '../main/setupBrowserAction';

// describe('Browser action', () => {
//   let browserMock: Browser;
//   let clickListener: () => void;
//   let createdTabConfig: any;

//   beforeEach(() => {
//     browserMock = {
//       browserAction: {
//         onClicked: {
//           addListener: (listener: () => void) => {
//             clickListener = listener;
//           },
//         },
//       },
//       tabs: {
//         create: (tabConfig: any) => {
//           createdTabConfig = tabConfig;
//         },
//       },
//     };
//   });

//   it('opens medium.com when the icon is clicked', () => {
//     expect(clickListener).to.be.undefined;
//     setupBrowserAction(browserMock);
//     expect(clickListener).not.to.be.undefined;

//     expect(createdTabConfig).to.be.undefined;
//     clickListener();
//     expect(createdTabConfig).not.to.be.undefined;
//     expect(createdTabConfig.url).to.equal('https://medium.com');
//   });
// });
