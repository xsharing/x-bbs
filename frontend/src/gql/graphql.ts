/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** an account / user */
export type Account = Node & {
  __typename?: 'Account';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type AddCommentInput = {
  body: Scalars['String'];
  threadId: Scalars['ID'];
};

export type AddCommentPayload = {
  __typename?: 'AddCommentPayload';
  commentEdge: CommentEdge;
  success: Scalars['Boolean'];
};

/** a comment */
export type Comment = Node & {
  __typename?: 'Comment';
  author: Account;
  body: Scalars['String'];
  id: Scalars['ID'];
  threadId: Scalars['String'];
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['ID'];
  node: Comment;
};

export type CreateThreadInput = {
  name: Scalars['String'];
};

export type CreateThreadPayload = {
  __typename?: 'CreateThreadPayload';
  success: Scalars['Boolean'];
  threadEdge: ThreadEdge;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: AddCommentPayload;
  createThread: CreateThreadPayload;
  updateThread: UpdateThreadPayload;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationCreateThreadArgs = {
  input: CreateThreadInput;
};


export type MutationUpdateThreadArgs = {
  input: UpdateThreadInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['ID']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  nodes: Array<Maybe<Node>>;
  threads: QueryThreadsConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryThreadsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryThreadsConnection = {
  __typename?: 'QueryThreadsConnection';
  edges: Array<QueryThreadsConnectionEdge>;
  pageInfo: PageInfo;
};

export type QueryThreadsConnectionEdge = {
  __typename?: 'QueryThreadsConnectionEdge';
  cursor: Scalars['ID'];
  node: Thread;
};

/** a thread */
export type Thread = Node & {
  __typename?: 'Thread';
  author: Account;
  comments: ThreadCommentsConnection;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};


/** a thread */
export type ThreadCommentsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ThreadCommentsConnection = {
  __typename?: 'ThreadCommentsConnection';
  edges: Array<Maybe<ThreadCommentsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type ThreadCommentsConnectionEdge = {
  __typename?: 'ThreadCommentsConnectionEdge';
  cursor: Scalars['ID'];
  node: Comment;
};

export type ThreadEdge = {
  __typename?: 'ThreadEdge';
  cursor: Scalars['ID'];
  node: Thread;
};

export type UpdateThreadInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateThreadPayload = {
  __typename?: 'UpdateThreadPayload';
  success: Scalars['Boolean'];
  threadEdge: ThreadEdge;
};
