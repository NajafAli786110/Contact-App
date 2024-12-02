const mongoose = require("mongoose");

const dbConnection = async () => {
  const mongoURL = process.env.CONNECTMONGO;
  try {
    const connect = await mongoose.connect(mongoURL);
    if (connect) console.log(`Database connected successfull ${connect.connection.name}`);
  } catch (error) {
    console.log("Error While Connecting Database", error);
  }
};

module.exports = dbConnection