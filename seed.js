// seed.js
const mongoose = require('mongoose');
const Food = require('./models/Food');

mongoose.connect('mongodb+srv://hadiyashaikh2006:edns8W4JPnAoH19D@cluster0.c9qwmwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const foodItems = [
  { name: "Cheese Sandwich", price: 300, image: "https://i.imgur.com/YyFDkqF.png", category: "Pizza" },
  { name: "Pizza", price: 300, image: "https://i.imgur.com/UkwnV2W.png", category: "Pizza" },
  { name: "Red Sauce Pasta", price: 320, image: "https://i.imgur.com/JGqBQ4m.png", category: "Pasta" },
  { name: "Dessert 1", price: 120, oldPrice: 150, discount: 30, image: "https://i.imgur.com/KFj1f4k.png", category: "Dessert" },
  { name: "Dessert 2", price: 200, image: "https://i.imgur.com/kTv4KrA.png", category: "Dessert" },
  { name: "Dessert 3", price: 120, oldPrice: 160, discount: 40, image: "https://i.imgur.com/sAO98aJ.png", category: "Dessert" },
  { name: "Drink 1", price: 180, oldPrice: 200, discount: 20, image: "https://i.imgur.com/KZCAbJr.png", category: "Drinks" },
  { name: "Drink 2", price: 220, image: "https://i.imgur.com/HUQxKQE.png", category: "Drinks" },
];

Food.insertMany(foodItems)
  .then((docs) => {
    console.log(`Inserted ${docs.length} items successfully!`);
    mongoose.connection.close();
  })

  .catch(err => {
    console.error('❌ Error inserting food items:', err);
    mongoose.connection.close();
  });
