// import { mockProvider } from 'client/test-helpers/mock-apollo';
// import { mount } from 'enzyme';
// import * as React from 'react';
// import { HomePage } from 'client/pages/home';
// import { sleep } from 'helpers';
// import { PaymentsPage } from '..';

// describe('Home page', () => {
//   it('Begins in a loading state', async () => {
//     const Provider = mockProvider({
//       mocks: {
//         Query: () => ({
//           allPayments: () => [
//             {
//               date: new Date().toDateString(),
//               amount: 20.0
//             }
//           ]
//         })
//       }
//     });

//     const page = mount(
//       <Provider>
//         <PaymentsPage />
//       </Provider>
//     );

//     await sleep(0);
//     page.update();

//     expect(page.text()).toContain('Hello');
//     expect(page.text()).toContain('Hola!');
//   });
// });
