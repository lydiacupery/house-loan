import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { PaymentCard } from '.';

storiesOf('Component – Payment Card', module).add('Payment Card', () => (
  <PaymentCard date={new Date().toString()} amount={100.0} />
));
