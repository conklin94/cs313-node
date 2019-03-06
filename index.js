const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/postage', getPostage);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

function getPostage (req, res) {
  var weight = Number(req.query.weight);
  var type = req.query.type;

  console.log("Received values " + weight + " and " + type);
  var cost = calculateRate(weight, type);
  const params = {cost: cost, weight: weight, type: type};
  res.render("pages/get_postage", params);
}

function calculateRate (weight, type) {
  if (type == "Letters (Stamped)") {
    return (0.55 + 0.15 * (weight - 1)).toFixed(2);
  } else if (type == "Letters (Metered)") {
    return (0.5 + 0.15 * (weight - 1)).toFixed(2);
  } else if (type == "Large Envelope (Flats)") {
    return (1 + 0.15 * (weight - 1)).toFixed(2);
  } else if (type == "First-Class Package--Retail") {
    if (weight <= 4) {
      return (3.66).toFixed(2);
    } else if (weight <= 8) {
      return (4.39).toFixed(2);
    } else if (weight <= 12) {
      return (5.19).toFixed(2);
    } else {
      return (5.71).toFixed(2);
    }
  }
}
