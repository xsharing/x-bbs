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
  AuthJwtToken: any;
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

export type CreateGroupInput = {
  name: Scalars['String'];
  visibility: GroupVisibilityEnum;
};

export type CreateGroupPayload = {
  __typename?: 'CreateGroupPayload';
  groupEdge?: Maybe<GroupEdge>;
  membershipEdge?: Maybe<GroupMembershipEdge>;
  success: Scalars['Boolean'];
};

export type CreateThreadInput = {
  name: Scalars['String'];
};

export type CreateThreadPayload = {
  __typename?: 'CreateThreadPayload';
  success: Scalars['Boolean'];
  threadEdge: ThreadEdge;
};

/** a Group */
export type Group = Node & {
  __typename?: 'Group';
  id: Scalars['ID'];
  invitations: GroupInvitationsConnection;
  memberships: GroupMembershipsConnection;
  name: Scalars['String'];
  visibility: GroupVisibilityEnum;
};


/** a Group */
export type GroupInvitationsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** a Group */
export type GroupMembershipsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type GroupEdge = {
  __typename?: 'GroupEdge';
  cursor: Scalars['ID'];
  node: Group;
};

/** a GroupInvitation */
export type GroupInvitation = Node & {
  __typename?: 'GroupInvitation';
  account: Account;
  id: Scalars['ID'];
  thread: Thread;
};

export type GroupInvitationEdge = {
  __typename?: 'GroupInvitationEdge';
  cursor: Scalars['ID'];
  node: GroupInvitation;
};

export type GroupInvitationsConnection = {
  __typename?: 'GroupInvitationsConnection';
  edges: Array<Maybe<GroupInvitationsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type GroupInvitationsConnectionEdge = {
  __typename?: 'GroupInvitationsConnectionEdge';
  cursor: Scalars['ID'];
  node: GroupInvitation;
};

/** a GroupMembership */
export type GroupMembership = Node & {
  __typename?: 'GroupMembership';
  account: Account;
  id: Scalars['ID'];
  thread: Thread;
};

export type GroupMembershipEdge = {
  __typename?: 'GroupMembershipEdge';
  cursor: Scalars['ID'];
  node: GroupMembership;
};

export type GroupMembershipsConnection = {
  __typename?: 'GroupMembershipsConnection';
  edges: Array<Maybe<GroupMembershipsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type GroupMembershipsConnectionEdge = {
  __typename?: 'GroupMembershipsConnectionEdge';
  cursor: Scalars['ID'];
  node: GroupMembership;
};

export enum GroupVisibilityEnum {
  Private = 'private',
  Public = 'public',
  Secret = 'secret'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: AddCommentPayload;
  createGroup: CreateGroupPayload;
  createThread: CreateThreadPayload;
  login: Scalars['AuthJwtToken'];
  updateGroup: UpdateGroupPayload;
  updateThread: UpdateThreadPayload;
};


export type MutationAddCommentArgs = {
  input: AddCommentInput;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateThreadArgs = {
  input: CreateThreadInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
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

export type UpdateGroupInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  visibility: GroupVisibilityEnum;
};

export type UpdateGroupPayload = {
  __typename?: 'UpdateGroupPayload';
  groupEdge: GroupEdge;
  success: Scalars['Boolean'];
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
