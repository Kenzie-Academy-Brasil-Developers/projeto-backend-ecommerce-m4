import { app } from "./app";
import AppDataSource from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected!");
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
