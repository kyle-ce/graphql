const url = "http://localhost:4001/graphql";

const query = `query _($sides: Int){
  getDie(sides: $sides) {
    sides
    roll
  }
}`;

export async function fetchClassDie() {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: { sides: 6 },
    }),
  });
  return res.json();
}
