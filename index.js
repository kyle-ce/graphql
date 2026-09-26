const main = () => {
  const url = "http://localhost:4000/graphql";

  const dice = 12;
  const query = `query _($dice: Int!, $sides: Int, $quote: String) {
    rollDice(numDice: $dice, numSides: $sides)
    quoteOfTheDay(quote: $quote)
    random
    rollThreeDice
  }`;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { dice },
    }),
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
main();
