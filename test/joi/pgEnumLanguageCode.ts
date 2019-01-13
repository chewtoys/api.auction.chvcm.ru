import "../common";

import {expect} from "chai";

import {joi} from "../../src";

describe("Joi pgEnumLanguageCode", () => {
  describe("wrong", () => {
    it("value must be a string", () => {
      const result = joi.validate(100, joi.pgEnumLanguageCode());
      expect(result.error.message).equal(`"value" must be a string`);
    });

    it("value  must be one of", () => {
      const result = joi.validate("uk", joi.pgEnumLanguageCode());
      expect(result.error.message).equal(`"value" must be one of [en, ru]`);
    });
  });

  describe("correct", () => {
    it("en", () => {
      const result = joi.validate("en", joi.pgEnumLanguageCode());
      expect(result.error).equal(null);
      expect(result.value).equal("en");
    });

    it("ru", () => {
      const result = joi.validate("ru", joi.pgEnumLanguageCode());
      expect(result.error).equal(null);
      expect(result.value).equal("ru");
    });
  });
});
