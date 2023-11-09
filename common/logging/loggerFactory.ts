import BasicLogger from "./basic";
import MediumLogger from "./medium";
import { ILogger } from "./interface";

class LoggerFactory {
    public static create(strategy?: string): ILogger {
        switch (strategy) {
            case "basic":
                return new BasicLogger();
            case "medium":
                return new MediumLogger();
            default:
              return new BasicLogger();
        }
    }
}

export default LoggerFactory;