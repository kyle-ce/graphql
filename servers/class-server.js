import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";

const schema = buildSchema(`
    type RandomDie {
        sides: Int!
        roll: Int!
        rolls(qty: Int!): [Int]
    }

    type Query{
        getDie(sides: Int): RandomDie
    }
    `);

class RandomDie {
  constructor(sides) {
    this.sides = sides;
  }

  roll() {
    return 1 + Math.floor(Math.random() * this.sides);
  }
  rolls({ qty }) {
    const die = [];
    for (let i = 0; i < qty; i++) {
      die.push(this.roll());
    }
    return die;
  }
}
const root = {
  getDie({ sides }) {
    return new RandomDie(sides || 6);
  },
};

const app = express();
app.all("/graphql", createHandler({ schema, rootValue: root }));
app.listen(4001);
console.log("Running server at http://localhost:4001/graphql");
