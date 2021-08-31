const path = require("path");
const {
  Pact,
  Matchers: { eachLike, like, email },
} = require("@pact-foundation/pact");
const packageJson = require("../../../package.json");

const { getUsers, getUserById } = require("../users");

const provider = new Pact({
  consumer: packageJson.name,
  provider: "service-api",
  port: 4000,
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pacts"),
  logLevel: "error",
});

describe("Users API", () => {
  beforeAll(() => {
    return provider.setup();
  });

  afterEach(() => provider.verify());

  afterAll(() => provider.finalize());

  describe("get all users", () => {
    beforeAll(() => {
      provider.addInteraction({
        uponReceiving: "a request to list all users",
        withRequest: {
          method: "GET",
          path: "/api/users",
        },
        willRespondWith: {
          status: 200,
          body: {
            data: eachLike(
              {
                id: like(1),
                name: like("First Last"),
                email: email("example@domain.com"),
              },
              { min: 1 }
            ),
          },
        },
      });
    });

    it("should return the correct data", async () => {
      const response = await getUsers();

      expect(response[0].name).toBe("First Last");
      expect(response[0].email).toBe("example@domain.com");
    });
  });

  describe("get a single user by ID", () => {
    beforeAll(() => {
      provider.addInteraction({
        uponReceiving: "a request to get a user by ID",
        withRequest: {
          method: "GET",
          path: "/api/users/100",
        },
        willRespondWith: {
          status: 200,
          body: {
            data: like({
              id: like(1),
              name: like("First Last"),
              email: email("example@domain.com"),
            }),
          },
        },
      });
    });

    it("should return the correct data", async () => {
      const response = await getUserById(100);

      expect(response.name).toBe("First Last");
      expect(response.email).toBe("example@domain.com");
    });
  });
});
