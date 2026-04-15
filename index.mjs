import dotenv from "dotenv";
dotenv.config()
import { dirname } from "path";
import { fileURLToPath } from "url";
import {app} from "./src/app.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 8080;


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/static/index.html");
});


app.listen(port, () => console.log("Server starting on port: " + port));
