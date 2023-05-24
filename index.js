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
const qryC = `SELECT EXTRACT(HOUR FROM hourdk) AS Time, onshorewindpower + offshorewindpower AS Windpower, hydropower AS hydro, solarpower, fossilgas + fossilhardcoal + fossiloil as fossil FROM energydata WHERE pricearea = 'DK1' OFFSET  9 LIMIT 1`;
const qryD = `SELECT EXTRACT(HOUR FROM hourdk) AS Time, onshorewindpower + offshorewindpower AS Windpower, hydropower AS hydro, solarpower, fossilgas + fossilhardcoal + fossiloil as fossil FROM energydata WHERE pricearea = 'DK2' OFFSET  9 LIMIT 1`;
const qryE = `SELECT EXTRACT(HOUR FROM hourdk) AS Time, onshorewindpower + offshorewindpower AS Windpower, hydropower AS hydro, solarpower, biomass, fossilgas + fossilhardcoal + fossiloil as fossil FROM energydata WHERE pricearea = 'DK1' OFFSET  9 LIMIT 24`;
const qryF = `SELECT EXTRACT(HOUR FROM hourdk) AS Time, onshorewindpower + offshorewindpower AS Windpower, hydropower AS hydro, solarpower, biomass, fossilgas + fossilhardcoal + fossiloil as fossil FROM energydata WHERE pricearea = 'DK2' OFFSET  9 LIMIT 24`;

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

app.get("/procentV", async (req, res) => {
  try {
    let queryData = await klient.query(qryC);
    res.json({
      ok: true,
      grafData: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});
app.get("/procentO", async (req, res) => {
  try {
    let queryData = await klient.query(qryD);
    res.json({
      ok: true,
      grafData: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/grafV", async (req, res) => {
  try {
    let queryData = await klient.query(qryE);
    res.json({
      ok: true,
      streamGraphData: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});
app.get("/grafO", async (req, res) => {
  try {
    let queryData = await klient.query(qryF);
    res.json({
      ok: true,
      streamGraphData: queryData.rows,
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
