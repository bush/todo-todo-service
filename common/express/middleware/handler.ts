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
import { Request, Response, NextFunction } from "express";
import ExpressApp from "../express";


import logger from "../../logging/logger";

class ErrorHandler {
  
  static logError(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack);
    return next(err);
  }

  static generalError(err: any, req: Request, res: Response, next: NextFunction) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Whoops! Something went wrong.'});
  }
}

export default ErrorHandler;
