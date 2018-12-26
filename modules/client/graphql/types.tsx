/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export interface Query {
  test?: string | null;
  allPayments?: Payment[] | null;
}

export interface Payment {
  date: string;
  amount: number;
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    test?: TestResolver<string | null, any, Context>;
    allPayments?: AllPaymentsResolver<Payment[] | null, any, Context>;
  }

  export type TestResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AllPaymentsResolver<
    R = Payment[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace PaymentResolvers {
  export interface Resolvers<Context = any> {
    date?: DateResolver<string, any, Context>;
    amount?: AmountResolver<number, any, Context>;
  }

  export type DateResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type AmountResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace AllPaymentsQuery {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    allPayments?: AllPayments[] | null;
  };

  export type AllPayments = {
    __typename?: "Payment";
    date: string;
    amount: number;
  };
}

export namespace Test {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    test?: string | null;
  };
}

export namespace Test2 {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    test?: string | null;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

export namespace AllPaymentsQuery {
  export const Document = gql`
    query AllPaymentsQuery {
      allPayments {
        date
        amount
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...this["props"] as any}
        />
      );
    }
  }
  export function HOC<
    TProps = any,
    OperationOptions = ReactApollo.OperationOption<TProps, Query, Variables>
  >(operationOptions: OperationOptions) {
    return ReactApollo.graphql<TProps, Query, Variables>(
      Document,
      operationOptions
    );
  }
}
export namespace Test {
  export const Document = gql`
    query Test {
      test
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...this["props"] as any}
        />
      );
    }
  }
  export function HOC<
    TProps = any,
    OperationOptions = ReactApollo.OperationOption<TProps, Query, Variables>
  >(operationOptions: OperationOptions) {
    return ReactApollo.graphql<TProps, Query, Variables>(
      Document,
      operationOptions
    );
  }
}
export namespace Test2 {
  export const Document = gql`
    query Test2 {
      test
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...this["props"] as any}
        />
      );
    }
  }
  export function HOC<
    TProps = any,
    OperationOptions = ReactApollo.OperationOption<TProps, Query, Variables>
  >(operationOptions: OperationOptions) {
    return ReactApollo.graphql<TProps, Query, Variables>(
      Document,
      operationOptions
    );
  }
}
