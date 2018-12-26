import { recordInfo } from '@atomic-object/records';
import { UnsavedPayment, SavedPayment } from './payment';

// import { recordInfo } from "@atomic-object/records";

export const PaymentRecord = recordInfo<UnsavedPayment, SavedPayment>(
  'payments'
);
