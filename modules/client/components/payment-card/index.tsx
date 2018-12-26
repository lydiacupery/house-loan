import { Card, Typography, Grid } from '@material-ui/core';
import * as React from 'react';

export interface PaymentCardProps {
  date: string; //TODO, update this
  amount: number;
}

export function PaymentCard(props: PaymentCardProps) {
  return (
    <Card>
      <Grid>
        <Grid container direction="row" justify="space-between">
          <Typography>Date</Typography>
          <Typography>{props.date.toString()}</Typography>
        </Grid>
        <Grid container direction="row" justify="space-between">
          <Typography>Amount</Typography>
          <Typography>{props.amount}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
