import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { PaymentReport } from '.';

storiesOf('Component – Payment Report', module).add('Payment Report', () => (
  <PaymentReport
    cards={[
      { date: new Date().toString(), amount: 100 },
      { date: new Date().toString(), amount: 200 }
    ]}
  />
));
