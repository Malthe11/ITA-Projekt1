const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/data", (req, res) => {
  let data = [
    { name: "Knud", age: 69 },
    { name: "Svend", age: 44 },
    { name: "Malthe", age: 22 },
    { name: "Kaj", age: 55 },
  ];
  res.send(data);
});
app.get("/Categories", (req, res) => {
  getFoodGategories(function (d) {
    res.send(d);
  });
});

function getFoodGategories(handle) {
  var pg = require("pg");

  var conString =
    "postgres://pzshqund:DcBloNSJpyACN6rOZgnuPntOlgr_Yjtb@hattie.db.elephantsql.com/pzshqund";
  var client = new pg.Client(conString);
  client.connect(function (err) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
    //select category, count(category_id) as antal from food_category join food using(category_id) group by category_id
    //SELECT *, COUNT(dataid) as antal FROM energydata GROUP BY dataid LIMIT 10
    client.query(
      "SELECT onshorewindpower + offshorewindpower AS windpower FROM energydata WHERE pricearea = 'DK1' LIMIT 5",
      function (err, result) {
        if (err) {
          return console.error("error running query", err);
        }

        handle(result.rows);
        client.end();
      }
    );
  });
}
