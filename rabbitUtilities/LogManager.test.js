import LogLevel from "./LogLevel.js";
import LogManager from "./LogManager.js";

describe("LogManager Tests", () => {
    it("Validates that log Manager uses default configuration", () => {
        let LogManager = new LogManager();
        let logger = LogManager.getLogger("app");

    })
})