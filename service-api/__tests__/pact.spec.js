const { Verifier } = require("@pact-foundation/pact");
const packageJson = require("../package.json");

describe("Pact Verification", () => {
  test("should validate the expectations of our consumers", () => {
    const opts = {
      provider: packageJson.name,
      providerBaseUrl: "http://localhost:3000",
      pactBrokerUrl: "http://localhost:9292",
      publishVerificationResult: true,
      providerVersion: "1.0.0",
      logLevel: "INFO",
    };

    return new Verifier(opts).verifyProvider();
  });
});
