import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Without MONGODB_URI");
}

//Global is used here to maintain a cached connection across hot reloads
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  console.log("📢 connectDB ejecutado");
  if (cached.conn) {
    console.log("conexion existente MongoDB");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Conectando a MongoDB");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "perezortunoki_db_user",
        bufferCommands: false,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB conectado exitosamente");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ Error conectando a MongoDB:", err.message);
        throw err; 
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}