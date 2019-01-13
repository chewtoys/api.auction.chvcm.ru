import "../common";

import {expect} from "chai";

import {Const, joi} from "../../src";

describe("Joi pgLimit", () => {
  describe("wrong", () => {
    it("value must be larger than or equal to 0", () => {
      const result = joi.validate("-9223372036854775808", joi.pgLimit());
      expect(result.error.message).equal(`"value" must be larger than or equal to 0`);
    });

    it("value must be less than or equal to", () => {
      const result = joi.validate("9223372036854775808", joi.pgLimit());
      expect(result.error.message).equal(`"value" must be less than or equal to ${Const.LIMIT_LIMIT}`);
    });
  });

  describe("correct", () => {
    it("0 as number", () => {
      const result = joi.validate(0, joi.pgLimit());
      expect(result.error).equal(null);
      expect(result.value).equal("0");
    });

    it("50 as string", () => {
      const result = joi.validate("50", joi.pgLimit());
      expect(result.error).equal(null);
      expect(result.value).equal("50");
    });

    it("default", () => {
      const result = joi.validate(undefined, joi.pgLimit());
      expect(result.error).equal(null);
      expect(result.value).deep.equal(Const.LIMIT_LIMIT);
    });

    it("max as string", () => {
      const result = joi.validate(Const.LIMIT_LIMIT, joi.pgLimit());
      expect(result.error).equal(null);
      expect(result.value).equal(Const.LIMIT_LIMIT);
    });
  });
});
