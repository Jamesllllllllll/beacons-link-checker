const { Client } = require("pg");
const dotenv = require("dotenv");
console.log(dotenv.config());
class AmazonRDSHelper {
  #pgClient;
  #rdsEndPoint;
  #rdsPort;
  constructor() {
    this.#rdsEndPoint = process.env.RDS_ENDPOINT;
    this.#rdsPort = process.env.RDS_PORT;
  }
  async connectClient() {
    this.#pgClient = new Client({
      user: process.env.RDS_USERNAME,
      host: this.#rdsEndPoint,
      database: process.env.RDS_DATABASE,
      password: process.env.RDS_PASSWORD,
    });
  }
  getClient() {
    return this.#pgClient;
  }
}

const amazonRDSHelper = new AmazonRDSHelper();
module.exports = amazonRDSHelper;
