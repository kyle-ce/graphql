import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";

const schema = buildSchema(`
    type RandomDie {
        sides: Int!
        rolls(qty: Int): [Int]
    }

    type Query{
        rollDie(sides: Int): RandomDie
    }
    `);

class RandomDie {
  constructor(sides) {
    this.sides = sides;
  }

  roll() {
    return 1 + Math.floor(Math.random() * this.sides);
  }
  rolls({ qty = 1 }) {
    const die = [];
    for (let i = 0; i < qty; i++) {
      die.push(this.roll());
    }
    return die;
  }
}

const root = {
  rollDie({ sides = 6 }) {
    return new RandomDie(sides);
  },
};

const app = express();
app.all("/graphql", createHandler({ schema, rootValue: root }));
app.listen(4001);
console.log("Running server at http://localhost:4001/graphql");
