const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connexion à Mongo réussie");
  } catch (error) {
    console.error("Connexion à Mongo échouée :", error.message);
  }
};

module.exports = { db };
