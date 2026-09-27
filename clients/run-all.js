import { fetchScalars } from "./scalars-client.js";
import { rollDie } from "./dice-client.js";
import {
  getMessage,
  createMessage,
  updateMessage,
  getAllMessages,
} from "./messages-client.js";

const main = async () => {
  console.log("--- scalars (4000) ---");
  console.log(await fetchScalars());

  console.log("--- die (4001) ---");
  const { data: die } = await rollDie();
  console.log(die);

  console.log("--- messages (4003) ---");
  console.log(
    "CREATE",
    await createMessage({ content: "ping", author: "Tyler D" }),
  );
  console.log("GET", await getMessage({ id: 1 }));
  console.log(
    "UPDATE",
    await updateMessage({ id: 1, input: { content: "pong" } }),
  );
  const { data } = await getAllMessages();
  console.log("GET ALL");
  data.getAllMessages.forEach((message) => {
    console.log(message);
  });
};
main();
