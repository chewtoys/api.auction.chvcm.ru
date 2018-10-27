import "./common";

import {EmailNotifications} from "../src";

describe("EmailNotifications", () => {
  it("unverified en", async () => {
    await EmailNotifications.instance.unverified({
      email: "customer@organisation.com",
      language: "en",
      name: "Customer Inc.",
    });
  });

  it("unverified ru", async () => {
    await EmailNotifications.instance.unverified({
      email: "customer@organisation.com",
      language: "ru",
      name: `ООО "Трубопрокатный завод"`,
    });
  });

  it("test en", async () => {
    await EmailNotifications.instance.test("customer@organisation.com", "en");
  });

  it("test ru", async () => {
    await EmailNotifications.instance.test("customer@organisation.com", "ru");
  });

  // TODO test other emails
});
