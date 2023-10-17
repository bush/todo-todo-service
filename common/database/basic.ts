import logger from "../logging/logger";
import * as path from 'path';

// NoSQL database for local storage
class BasicDatabase {
    constructor(options: any) {

        logger.info(`BasicDatabase dirname: ${path.join(process.cwd(),options.url)}`);
    }
}

export default BasicDatabase;
