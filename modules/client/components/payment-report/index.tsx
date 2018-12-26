import * as React from 'react';
import { Card, Typography, Grid } from '@material-ui/core';
import { PaymentCardProps, PaymentCard } from '../payment-card';

export interface Props {
  cards: PaymentCardProps[];
}

export function PaymentReport(props: Props) {
  if (props.cards === null) {
    return <div>Loading...</div>;
  } else if (props.cards.length === 0) {
    return <div>No cards to show.</div>;
  }

  const cards = props.cards.map((cardProps, i) => (
    <PaymentCard {...cardProps} />
  ));
  return <Grid> {cards}</Grid>;
}
