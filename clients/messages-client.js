const url = "http://localhost:4003/graphql";

const fetchById = `
    query _($id: ID!){
      getMessage(id: $id){id, content, author}
    }
`;
const fetchAll = `
    query {
      getAllMessages{id, content, author}
    }
`;

const create = `
    mutation create($input: MessageInput) { 
    createMessage(input: $input){id, content, author}
}

`;
const update = `
    mutation update($id: ID!, $input: MessageInput) { 
    updateMessage(id: $id, input: $input){id,content, author}
}
`;

export async function getAllMessages() {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: fetchAll,
    }),
  });
  return res.json();
}

export async function getMessage({ id }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: fetchById,
      variables: { id },
    }),
  });
  return res.json();
}

export async function createMessage({ content, author }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: create,
      variables: { input: { content } },
    }),
  });
  return res.json();
}

export async function updateMessage({ id, input }) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: update,
      variables: { id, input },
    }),
  });
  return res.json();
}
