import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";
import { ruruHTML } from "ruru/server";

const schema = buildSchema(`
    type Query { 
        quoteOfTheDay(quote: String): String
        random: Float!
        rollThreeDice: [Int] 
        rollDice(numDice: Int!, numSides: Int = 6): [Int]

    } 
`);

const root = {
  quoteOfTheDay({ quote } = {}) {
    if (quote) return quote;
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random() {
    return Math.random();
  },
  rollThreeDice() {
    return [1, 2, 3].map(() => 1 + Math.floor(Math.random() * 6));
  },
  rollDice({ numDice, numSides }) {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
};

const app = express();

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: root,
  }),
);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000);
console.log("Running server at http://localhost:4000/graphql");
