import express from 'express';
import bodyParser from 'body-parser';
import { addToShoppingList, printShoppingList } from '../db/db.js';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getShoppingList', async function (req, res) {
  console.log('request ', req.url);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-control-Allow-Origin', '*');
  printShoppingList();
  res.send({ testing: true });
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
//server listening port
app.listen(3000);
