/**
 * Waits for the expectation to pass and returns a Promise
 * This function is fork of https://github.com/TheBrainFamily/wait-for-expect with normal default export and fixed types
 * @param expectation Expectation that has to complete without throwing
 * @param timeout Maximum wait interval, 4500ms by default
 * @param interval Wait-between-retries interval, 50ms by default
 * TODO: move to separate package or send PR
 */
export function waitForExpect(
  expectation: () => Promise<void> | void, // TODO: PR allow promise expectation
  timeout: number = 4500, interval: number = 50): Promise<void> {
  const startTime = Date.now();
  return new Promise((resolve, reject) => {
    const rejectOrRerun = (error: Error) => {
      if (Date.now() - startTime >= timeout) {
        reject(error);
        return;
      }
      setTimeout(runExpectation, interval);
    };

    const runExpectation = () => {
      try {
        Promise.resolve(expectation())
          .then(() => {
            if (Date.now() - startTime >= timeout) { // TODO: PR fix early resolve to upstream
              resolve();
            } else {
              setTimeout(runExpectation, 0);
            }
          })
          .catch(rejectOrRerun);
      } catch (error) {
        rejectOrRerun(error);
      }
    };

    setTimeout(runExpectation, 0);
  });
}
