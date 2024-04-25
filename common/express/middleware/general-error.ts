//-----------------------------------------------------------------------
//
// NIMKEE CONFIDENTIAL
// __________________
//
//  [2023] - [2024] Nimkee Systems Incorporated
//  All Rights Reserved.
//
// NOTICE:  All information contained herein is, and remains
// the property of Nimkee Systems Incorporated and its suppliers,
// if any.  The intellectual and technical concepts contained
// herein are proprietary to Nimkee Systems Incorporated
// and its suppliers and may be covered by U.S. and Foreign Patents,
// patents in process, and are protected by trade secret or copyright law.
// Dissemination of this information or reproduction of this material
// is strictly forbidden unless prior written permission is obtained
// from Nimkee Systems Incorporated.
//-----------------------------------------------------------------------

import HttpStatus from "http-status-codes";
import { Application, Request, Response, NextFunction } from "express";
import { INimkeeMiddleware} from "../../interface";

export class NimkeeGeneralError implements INimkeeMiddleware {
  constructor(private app: Application) {}

  public mount(): void {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: "Whoops! Something went wrong." });
      }
    );
  }
}
