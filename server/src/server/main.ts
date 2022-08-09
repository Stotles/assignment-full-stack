import express, { request } from "express";
import { procurementRecords, getBuyers } from "./procurement.conroller";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("views", "./views");
app.set("view engine", "ejs");

app.locals["assets_url"] = process.env.VITE_URL || "http://localhost:3001";

app.use(express.json());

app.get("/", (_req, res) => {
  res.render("index.html.ejs");
});
app.post("/api/records", procurementRecords);
app.get("/api/buyers", getBuyers);

app.listen(app.get("port"), () => {
  console.log("  App is running at http://localhost:%d", app.get("port"));
  console.log("  Press CTRL-C to stop\n");
});
