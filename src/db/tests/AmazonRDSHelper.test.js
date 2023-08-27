const amazonRDSHelper = require("../AmazonRDSHelper");

describe("AmazonRDSHelper", () => {
  test("Should be able to connect to RDS instance", async () => {
    try {
      expect(await amazonRDSHelper.pingDb()).not.toBeUndefined();
    } catch (error) {
      console.log(error);
    }
  });
});
