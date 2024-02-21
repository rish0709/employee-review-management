import app from "./index.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";


app.listen(7000, () => {
  console.log("server is listening at port 7000");
  connectUsingMongoose();
});