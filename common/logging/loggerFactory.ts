import BasicLogger from "./basic";
import NullLogger from "./null";
import { ILogger } from "./interface";

class LoggerFactory {
    public static create(strategy?: string): ILogger {
        switch (strategy) {
            case "basic":
                return new BasicLogger();
            case "null":
                return new NullLogger();
            default:
              return new BasicLogger();
        }
    }
}

export default LoggerFactory;