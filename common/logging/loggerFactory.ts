import BasicLogger from "./basic";
import { ILogger } from "./interface";

class LoggerFactory {
    public static create(strategy?: string): ILogger {
        switch (strategy) {
            case "basic":
                return new BasicLogger();
            default:
              return new BasicLogger();
        }
    }
}

export default LoggerFactory;