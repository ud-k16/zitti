import express from 'express';
import bodyParser from 'body-parser';
import {
  addToShoppingList,
  fetchPaper,
  getShoppingList,
  printShoppingList,
} from '../db/db.js';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getShoppingList', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-control-Allow-Origin', '*');
  const shopingList = await getShoppingList();
  res.send({ shopingList });
});
app.post('/addToShoppingList', async function (req, res) {
  const shoppingData = req.body;
  const addedOrNot = await addToShoppingList(shoppingData.itemName);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-control-Allow-Origin', '*');
  res.send({
    response: addedOrNot
      ? `${shoppingData.itemName} added to your shopping list.`
      : `You already have ${shoppingData.itemName} in your shopping list`,
  });
});
app.post('/fetchPaper', async function (req, res) {
  const { date } = req.body;
  const fetched = await fetchPaper(date);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-control-Allow-Origin', '*');
  res.send({
    response: fetched
      ? 'Here is your newspaper.'
      : `I think you don't get another newspaper the same day`,
  });
});
//server listening port
app.listen(3000);
