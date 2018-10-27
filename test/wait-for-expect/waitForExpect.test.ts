import "../common";

import {expect} from "chai";
import * as sinon from "sinon";

import waitForExpect from "./";

describe("wait-for-expect", () => {
  it("test sinon stub", async () => {
    const stub = sinon.stub();

    setTimeout(() => {
      stub();
    }, 500);

    await waitForExpect(() => {
      sinon.assert.calledOnce(stub);
    });
  });

  it("early response", async () => {
    const stub = sinon.stub();

    await waitForExpect(() => {
      sinon.assert.notCalled(stub);
    });
  });

  it("early response (reject)", (done) => {
    const stub = sinon.stub();

    setTimeout(() => {
      stub();
    }, 500);

    waitForExpect(() => {
      sinon.assert.notCalled(stub);
    })
      .then(() => done("expected sinon stub called once"))
      .catch(() => done());
  });
});
