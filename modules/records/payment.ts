import { Flavor } from 'helpers';
import { RepositoryBase } from '@atomic-object/records';
import { PaymentRecord } from 'records';

export type PaymentId = Flavor<number, 'payment-id'>;

export interface UnsavedPayment {
  date: string;
  amount: string;
}

export interface SavedPayment extends UnsavedPayment {
  id: PaymentId;
}

export class JobRepository extends RepositoryBase(PaymentRecord) {}
