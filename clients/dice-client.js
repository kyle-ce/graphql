const url = "http://localhost:4001/graphql";

const query = `query _($sides: Int, $qty: Int){
  rollDie(sides: $sides) {
    sides
    rolls(qty: $qty)
  }
}`;

export async function rollDie({ sides, qty } = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { sides, qty },
    }),
  });
  return res.json();
}
