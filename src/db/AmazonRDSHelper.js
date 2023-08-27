const { Client } = require("pg");
const dotenv = require("dotenv");
const path = require("path");
const { env } = require("process");
const envFile = dotenv.config({ path: path.resolve(__dirname, "./.env") });
console.log(envFile);
class AmazonRDSHelper {
  #pgClient;
  #rdsEndPoint;
  #rdsPort;
  constructor() {
    this.#rdsEndPoint = process.env.RDS_ENDPOINT;
    this.#rdsPort = process.env.RDS_PORT;
    this.#pgClient = new Client({
      user: process.env.RDS_USERNAME,
      host: this.#rdsEndPoint,
      database: process.env.RDS_DATABASE,
      password: process.env.RDS_PASSWORD,
      port: this.#rdsPort,
    });
  }
  getClient() {
    return this.#pgClient;
  }
  async pingDb() {
    try {
      this.#pgClient.connect();
      const res = await this.#pgClient.query("SELECT 1");
      console.log("<===========================>");
      console.log(res);
      console.log(res.rows[0]);
      return res.rows[0];
    } catch (error) {
      console.log(error);
    } finally {
      await this.#pgClient.end();
    }
  }
}

const amazonRDSHelper = new AmazonRDSHelper();
module.exports = amazonRDSHelper;
