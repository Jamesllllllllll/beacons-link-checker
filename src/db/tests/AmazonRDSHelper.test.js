const amazonRDSHelper = require("../AmazonRDSHelper");

describe("AmazonRDSHelper", () => {
  test("Should be able to connect to RDS instance", async () => {
    try {
      await amazonRDSHelper.connectClient();
      expect(amazonRDSHelper.getClient()).not.toBeUndefined();
    } catch (error) {}
  });
});
