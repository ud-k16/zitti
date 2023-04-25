import express from 'express';
import bodyParser from 'body-parser';
import {
  addToShoppingList,
  cleanRoom,
  fetchPaper,
  getShoppingList,
} from '../db/db.js';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//change port number if port unavailable
const port = 3000;
app.get('/getShoppingList', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-control-Allow-Origin', '*');
  const shoppingList = await getShoppingList();
  res.send({ response: shoppingList });
});
app.post('/addToShoppingList', async function (req, res) {
  const { itemName } = req.body;
  const addedOrNot = await addToShoppingList(itemName);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-control-Allow-Origin', '*');
  res.send({
    response: addedOrNot
      ? `${itemName} added to your shopping list.`
      : `You already have ${itemName} in your shopping list`,
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
app.get('/cleanRoom', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-control-Allow-Origin', '*');
  const response = cleanRoom();
  res.send({ response });
});
//server listening port
app.listen(port, () => console.log(`Server running in port ${port}`));
