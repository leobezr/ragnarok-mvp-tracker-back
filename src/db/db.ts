import mongoose from "mongoose";

export default class DB {
  public server!: typeof mongoose;
  public connection!: mongoose.Connection;

  public loading = false;

  private async startDB(username: string, password: string) {
    this.loading = true;

    const DB_ADDRESS = process.env.DB_ADDRESS;

    try {
      console.log("🚀[db] - DB is starting");

      this.connection = mongoose.connection;
      this.server = await mongoose.connect(
        `mongodb+srv://${username}:${password}${DB_ADDRESS}`
      );

      console.log("⚡️[db] - DB is online");
    } catch (err) {
      console.error("🛑[db] - DB error");
      throw err;
    } finally {
      this.loading = false;
    }
  }

  constructor(username: string, password: string) {
    this.startDB(username, password);
  }
}
