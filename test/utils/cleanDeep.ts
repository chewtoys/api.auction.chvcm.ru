import "../common";

import {expect} from "chai";

import {cleanDeep} from "../../src";

describe("cleanDeep", () => {
  it("should pick defined values from the object", () => {
    const object = {
      bar: {},
      biz: [],
      foo: {
        bar: undefined,
        baz: true,
        biz: false,
        buz: null,
        net: "",
        qux: 100,
      },
    };

    expect(cleanDeep(object)).deep.equal({
      foo: {
        baz: true,
        biz: false,
        buz: null,
        net: "",
        qux: 100,
      },
    });
  });

  it("should clean arrays", () => {
    const object = {
      foo: [{
        bar: undefined,
        baz: "",
        biz: 0,
      }],
    };

    expect(cleanDeep(object)).deep.equal({
      foo: [{
        baz: "",
        biz: 0,
      }],
    });
  });

  it("should include non plain objects", () => {
    const object = {
      foo: {
        bar: new Date(0),
        biz: undefined,
      },
    };

    expect(cleanDeep(object)).deep.equal({
      foo: {
        bar: new Date(0),
      },
    });
  });

  it("should include symbols", () => {
    const key = Symbol("key");

    const object = {
      [key]: {
        bar: new Date(0),
        biz: undefined,
      },
    };

    expect(cleanDeep(object)).deep.equal({
      [key]: {
        bar: new Date(0),
      },
    });
  });

  it("should include deep symbols", () => {
    const key = Symbol("key");

    const object = {
      a: {
        [key]: {
          bar: new Date(0),
          biz: undefined,
        },
      },
    };

    expect(cleanDeep(object)).deep.equal({
      a: {
        [key]: {
          bar: new Date(0),
        },
      },
    });
  });

  it("should clean symbols", () => {
    const keyA = Symbol("key");
    const keyB = Symbol("key");

    const object = {
      [keyA]: [
        {
          a: undefined,
        }, {
          b: undefined,
        },
      ],
      [keyB]: [
        {
          a: "a",
        }, {
          b: "b",
        },
      ],
    };

    expect(cleanDeep(object)).deep.equal({
      [keyB]: [
        {
          a: "a",
        }, {
          b: "b",
        },
      ],
    });
  });
});
