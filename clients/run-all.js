import { fetchScalars } from "./scalars-client.js";
import { fetchClassDie } from "./class-client.js";

const main = async () => {
  console.log("--- scalars (4000) ---");
  console.log(await fetchScalars());

  console.log("--- class (4001) ---");
  console.log(await fetchClassDie());
};
main();
