
import BaseLocals from "../../common/lib/base-locals";
import * as path from "path";
import * as dotenv from "dotenv";

class Locals extends BaseLocals {
  /**
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });

    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 4000;

    return {
      port,
      url,
    };
  }
}

export default Locals;
