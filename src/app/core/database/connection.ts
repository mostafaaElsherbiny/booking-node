import "reflect-metadata";
import { createConnection } from "typeorm";
const connectToDB = async () => {
  await createConnection()
    .then((connection) => {
      console.log("connected with db successfully ✅");
    })
    .catch((error) => {
      console.log(error);
      throw new Error("unable to connect with db 👎");
    });
};
export { connectToDB };
