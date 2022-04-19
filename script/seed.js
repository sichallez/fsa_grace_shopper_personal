"use strict";

const {
  db,
  models: { User, Product, LineItem, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);


  //Create Products

  //Roses
  await Product.create({ name: "SM Bunch-o Pink Roses", price: 35.00, image_url: "/Images/roses/7-pink-roses-400x400-39400.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "MD Bunch-o Pink Roses", price: 58.00, image_url: "/Images/roses/pink-roses-bouquet-400x400-37411.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "LG Bunch-o Pink Roses", price: 120.00, image_url: "/Images/roses/100-pink-rose.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "SM Bunch-o Red Roses", price: 38.00, image_url: "/Images/roses/7-red-roses-400x400-39251.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "MD Bunch-o Red Roses", price: 61.00, image_url: "/Images/roses/red-roses-bouquet-400x400-37412.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "LG Bunch-o Red Roses", price: 125.00, image_url: "/Images/roses/100-red-rose.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "SM Bunch-o White Roses", price: 45.00, image_url: "/Images/roses/7-white-roses-400x400-37428.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "MD Bunch-o White Roses", price: 68.00, image_url: "/Images/roses/white-roses-bouquet-400x400-37413.jpeg", category:"rose", stock: 20 });
  await Product.create({ name: "LG Bunch-o White Roses", price: 135.00, image_url: "/Images/roses/100-white-rose.jpeg", category:"rose", stock: 20 });

  

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
