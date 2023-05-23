function forstørbilledevest() {
  var billedElement = document.querySelector(".vestimage");
  billedElement.style.transform = "scale(1.1)";
}
function forstørbilledeøst() {
  var billedElement = document.querySelector(".østimage");
  billedElement.style.transform = "scale(1.1)";
}

function nulstilBilledevest() {
  var billedElement = document.querySelector(".vestimage");
  billedElement.style.transform = "scale(1)";
}
function nulstilBilledeøst() {
  var billedElement = document.querySelector(".østimage");
  billedElement.style.transform = "scale(1)";
}

function UpdateVandprocent() {
  var textElement = document.getElementById("text");
  textElement.textContent = percentageFromDatabase();
}
var percentageFromDatabase = getRandomNumber; // <-- erstattes med funktionen der giver korrekte procent

function dataPercentage(item) {
  d3.json("https://ecometerdata.onrender.com/Visualisering3").then(function (
    dataset
  ) {
    // Access the "foods" array within the JSON data
    let data = dataset.foods;

    // Extract the first item from the "foods" array
    var dataElement = data[0];

    // Extract the individual properties from the "foodItem" object
    let time = dataElement.time;
    let windpower = dataElement.windpower;
    let hydro = dataElement.hydro;
    let solarpower = dataElement.solarpower;
    let fossil = dataElement.fossil;

    let total = windpower + hydro + solarpower + fossil;

    function getPercentage(item) {
      switch (item) {
        case "windpower":
          return ((windpower / total) * 100).toFixed(2);
        case "hydro":
          return ((hydro / total) * 100).toFixed(2);
        case "solarpower":
          return ((solarpower / total) * 100).toFixed(2);
        case "fossil":
          return ((fossil / total) * 100).toFixed(2);
        default:
          return 0;
      }
    }

    let percentage = getPercentage(item);
    console.log(item + " percentage:", percentage + "%");
  });
}

function getRandomNumber() {
  return Math.floor(Math.random() * 101) + "%";
}
document.addEventListener("DOMContentLoaded", function () {
  var text = new Blotter.Text("72%", {
    family: "sans-serif",
    size: 150,
    fill: "#DCDCDC",
  });

  var material = new Blotter.LiquidDistortMaterial();
  material.uniforms.uSpeed.value = 0.9;
  material.uniforms.uVolatility.value = 0.03;
  material.uniforms.uSeed.value = 3.02;

  const blotter = new Blotter(material, {
    texts: text,
  });

  const scope = blotter.forText(text);

  // Indsæt tekstelementet i HTML
  const dinmorElement = document.getElementById("vindtekst");
  scope.appendTo(dinmorElement);
});
