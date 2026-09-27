const url = "http://localhost:4000/graphql";

const query = `query _($dice: Int!, $sides: Int, $quote: String) {
  rollDice(numDice: $dice, numSides: $sides)
  quoteOfTheDay(quote: $quote)
  random
  rollThreeDice

}`;

export async function fetchScalars() {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { dice: 6 },
    }),
  });
  return res.json();
}
