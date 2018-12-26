import { PaymentReport } from 'client/components/payment-report';
import * as React from 'react';
import { PaymentCardProps } from 'client/components/payment-card';
import { Test2, AllPaymentsQuery } from 'client/graphql/types';

export function dataToRows(data: AllPaymentsQuery.Query): PaymentCardProps[] {
  if (!data.allPayments) {
    return [];
  }

  return data.allPayments.map(payment => ({
    date: payment.date,
    amount: payment.amount
  }));
}

export const PaymentsPage: React.SFC = props => {
  return (
    <AllPaymentsQuery.Component>
      {({ loading, error, data }) => {
        if (loading || error) {
          return <div>Loading</div>;
        }
        return <PaymentReport cards={dataToRows(data!)} />;
      }}
    </AllPaymentsQuery.Component>
  );
};
