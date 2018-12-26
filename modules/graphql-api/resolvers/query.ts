import { Context } from 'graphql-api/context';
import { AllPaymentsQuery } from 'client/graphql/types';

export const QueryResolvers = {
  test(self: {}, args: {}, context: Context) {
    return 'Hello!';
  },
  allPayments(self: {}, args: {}, context: Context) {
    return [
      {
        date: new Date().toString(),
        amount: 100.0
      },
      {
        date: new Date().toString(),
        amount: 300.0
      }
    ];
  }
};
