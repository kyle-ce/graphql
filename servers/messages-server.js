import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";

const DB = {};
const schema = buildSchema(`
    input MessageInput{
    content: String
    author: String
    }
    type Message {
        id: ID!
        content: String
        author: String
    }
    type Query{
        getAllMessages: [Message]
        getMessage(id: ID!): Message
    }
    type Mutation{
        createMessage(input: MessageInput): Message 
        updateMessage(id: ID!, input: MessageInput ): Message   
    }
    `);

const root = {
  getAllMessages() {
    const vals = Object.values(DB);
    console.log(vals);
    return vals;
  },
  getMessage({ id }) {
    return DB[id];
  },
  createMessage({ input }) {
    const id = String(Object.keys(DB).length + 1);
    const message = {
      id,
      content: input.content,
      author: input.author || "Kyle Corcoran",
    };
    DB[id] = message;
    return message;
  },
  updateMessage({ id, input }) {
    console.log("PUT id: ", id, "\t", "input: ", input);
    const message = DB[id];
    Object.assign(message, input);
    return message;
  },
};

const app = express();
app.all("/graphql", createHandler({ schema, rootValue: root }));
app.listen(4003);
console.log("Running server at http://localhost:4003/graphql");
