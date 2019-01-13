import "../common";

import {expect} from "chai";
import {AttachmentNameUnit} from "../../src/joi";

describe("AttachmentNameUnit", () => {
  [
    "files.zip",
    "Устав предприятия.pdf",
    "Лицензия-на_деятельность.tar.gz",
    "a.rar",
    "1.7z",
    "b.pdf.zip",
  ].map((item, index) => {
    it(`correct ${index}`, async () => {
      const unit = new AttachmentNameUnit(item);
      await unit.execute();
      expect(unit.valid).equal(true);
      expect(unit.value).equal(item);
    });
  });

  [
    " space in start",
    "without extension",
    "/slash/me",
    "$suck.php",
    "",
    null,
    undefined,
  ].map((item, index) => {
    it(`wrong ${index}`, async () => {
      const unit = new AttachmentNameUnit(item);
      await unit.execute();
      expect(unit.valid).equal(false);
    });
  });
});
