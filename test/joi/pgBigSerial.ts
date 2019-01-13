import "../common";

import {expect} from "chai";

import {joi} from "../../src";

describe("Joi pgBigSerial", () => {
  describe("wrong", () => {
    it("value must be larger than or equal to 1", () => {
      const result = joi.validate("-9223372036854775808", joi.pgBigSerial());
      expect(result.error.message).equal(`"value" must be larger than or equal to 1`);
    });

    it("value must be less than or equal to 9223372036854775807", () => {
      const result = joi.validate("9223372036854775808", joi.pgBigSerial());
      expect(result.error.message).equal(`"value" must be less than or equal to 9223372036854775807`);
    });
  });

  describe("correct", () => {
    it("1 as number", () => {
      const result = joi.validate(1, joi.pgBigSerial());
      expect(result.error).equal(null);
      expect(result.value).equal("1");
    });

    it("100 as string", () => {
      const result = joi.validate("100", joi.pgBigSerial());
      expect(result.error).equal(null);
      expect(result.value).equal("100");
    });

    it("9223372036854775807 as string", () => {
      const result = joi.validate("9223372036854775807", joi.pgBigSerial());
      expect(result.error).equal(null);
      expect(result.value).equal("9223372036854775807");
    });
  });
});
