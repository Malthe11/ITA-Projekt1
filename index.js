const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

//postgres://pzshqund:DcBloNSJpyACN6rOZgnuPntOlgr_Yjtb@hattie.db.elephantsql.com/pzshqund
const app = express();
const api_port = 3000;
const klient = new Client({
  user: "pzshqund",
  host: "hattie.db.elephantsql.com",
  database: "pzshqund",
  password: "DcBloNSJpyACN6rOZgnuPntOlgr_Yjtb",
  port: 5432,
});

const qryA = `SELECT onshorewindpower + offshorewindpower AS windpower, hourdk AS time FROM energydata WHERE pricearea = 'DK1' LIMIT 72`;
const qryB = `SELECT onshorewindpower + offshorewindpower AS windpower, hourdk AS time FROM energydata WHERE pricearea = 'DK1' LIMIT 12`;
//const qryB = `SELECT fossilgas + fossilhardcoal + fossiloil as notgreen, biomass + hydropower + otherrenewable + solarpower + onshorewindpower + offshorewindpower AS green FROM energydata WHERE pricearea = 'DK1' LIMIT 10`;
const qryC = `SELECT hourdk AS Time , onshorewindpower + offshorewindpower AS Windpower, hydropower AS hydro, solarpower AS solarpower, fossilgas + fossilhardcoal + fossiloil as fossil FROM energydata WHERE pricearea = 'DK1' LIMIT 10`;

const qryD = `SELECT hourdk, category, value
FROM
(
    SELECT hourdk, 'windpower' AS category, onshorewindpower + offshorewindpower AS value
    FROM energydata
    WHERE pricearea = 'DK1'
    UNION ALL
    SELECT hourdk, 'solarpower' AS category, solarpower AS value
    FROM energydata
    WHERE pricearea = 'DK1'
	UNION ALL
	SELECT hourdk, 'biomass' AS category, biomass AS value
    FROM energydata
    WHERE pricearea = 'DK1'
	UNION ALL
	SELECT hourdk, 'hydropower' AS category, hydropower AS value
    FROM energydata
    WHERE pricearea = 'DK1'
	UNION ALL
	SELECT hourdk, 'otherrenewable' AS category, otherrenewable AS value
    FROM energydata
    WHERE pricearea = 'DK1'
	UNION ALL
	SELECT hourdk, 'fossiloil' AS category, fossiloil AS value
    FROM energydata
    WHERE pricearea = 'DK1'
	UNION ALL
	SELECT hourdk, 'fossilgas' AS category, fossilgas AS value
    FROM energydata
    WHERE pricearea = 'DK1'
	UNION ALL
	SELECT hourdk, 'fossilhardcoal' AS category, fossilhardcoal AS value
    FROM energydata
    WHERE pricearea = 'DK1'
) AS subquery
ORDER BY hourdk DESC, category ASC LIMIT 576;`;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/test", async (req, res) => {
  res.send("hej");
});

app.get("/Visualisering1", async (req, res) => {
  try {
    let queryData = await klient.query(qryA);
    res.json({
      ok: true,
      dataWind: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/Visualisering2", async (req, res) => {
  try {
    let queryData = await klient.query(qryB);
    res.json({
      ok: true,
      dataGreen: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/Visualisering3", async (req, res) => {
  try {
    let queryData = await klient.query(qryC);
    res.json({
      ok: true,
      foods: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

// Programmet starter her:
klient.connect();
app.listen(api_port, () => {
  console.log(`App lytter på https://ecometerdata.onrender.com`);
});
