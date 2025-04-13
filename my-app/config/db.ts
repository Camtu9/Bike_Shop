import mongoose from "mongoose";

declare global {
  var mongoose:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/bikezone`, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  cached.conn = await cached?.promise;
  return cached?.conn;
}

export default connectDB;
