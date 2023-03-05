import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http'
import SchemaBuilder from '@pothos/core';
import express from 'express';
import dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import dotenv from 'dotenv';


dotenv.config()

dynamoose.aws.ddb.local("http://ddb:8000");

class BookClass extends Item {
  id!: string
  title!: string
  author!: string
}

const BookModel = dynamoose.model<BookClass>("Book", {"id": String, "title": String, "author": String});
const BookTable =  new dynamoose.Table("Book", [BookModel], { throughput: 'ON_DEMAND', create: true, waitForActive: true });

BookModel.create({id: '1', title: 'a good book', author: 'John'}, {overwrite: true})


const builder = new SchemaBuilder<{}>({});

const bookType = builder.objectType(BookClass, {
    name: 'Book',
    description: 'book',
    fields: (t) => ({
        id: t.id({ resolve: (parent)=>parent.id}),
        title: t.id({ resolve: (parent)=>parent.title}),
        author: t.id({ resolve: (parent)=>parent.author}),
    }),
  });

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (parent, { name }) => `hello, ${name || 'World'}`,
    }),
    books: t.field({
        type: [BookClass],
        resolve: ()=> (BookModel.scan().exec())
    })
  }),
});

const yoga = createYoga({
  schema: builder.toSchema(),
});

const app = express()
app.use('/graphql', yoga)

export const viteNodeApp = app