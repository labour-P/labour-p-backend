//db setup
import mongoose from "mongoose";

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      
    });

    console.log("database ready to go");
  } catch (e) {
    console.log("🚀 ~ file: db_connection.js ~ line 12 ~ connect ~ e", e);
  }
};

export default connect_db;
