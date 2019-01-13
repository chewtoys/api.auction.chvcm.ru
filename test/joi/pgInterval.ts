import "../common";

import {expect} from "chai";

import {joi} from "../../src";

describe("Joi pgInterval", () => {
  describe("wrong", () => {
    it("child must be a positive number", () => {
      const result = joi.validate({days: -10}, joi.pgInterval());
      expect(result.error.message).equal(`child "days" fails because ["days" must be a positive number]`);
    });

    it("field is not allowed", () => {
      const result = joi.validate({extra: 10}, joi.pgInterval());
      expect(result.error.message).equal(`"extra" is not allowed`);
    });
  });

  describe("correct", () => {
    it("empty object", () => {
      const result = joi.validate({}, joi.pgInterval());
      expect(result.error).equal(null);
      expect(result.value).deep.equal({});
    });

    it("empty string", () => {
      const result = joi.validate("", joi.pgInterval());
      expect(result.error).equal(null);
      expect(result.value).deep.equal({});
    });

    it("object", () => {
      const result = joi.validate({minutes: 10, seconds: 50}, joi.pgInterval());
      expect(result.error).equal(null);
      expect(result.value).deep.equal({minutes: 10, seconds: 50});
    });

    it("string", () => {
      const result = joi.validate("00:10:50", joi.pgInterval());
      expect(result.error).equal(null);
      expect(result.value).deep.equal({minutes: 10, seconds: 50});
    });
  });
});
