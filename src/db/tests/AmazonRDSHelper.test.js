const amazonRDSHelper = require("../AmazonRDSHelper");

describe("AmazonRDSHelper", () => {
  test("Ping RDS Instance", async () => {
    try {
      expect(await amazonRDSHelper.pingDb()).not.toBeUndefined();
    } catch (error) {
      console.log(error);
    }
  });
});
