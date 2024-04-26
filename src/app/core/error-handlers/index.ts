import { Request, Response } from "express";
import {
  Internal_Server_Error,
  JSON_Parsing_Error,
  Database_Conflict,
} from "./exceptions/generic";

export class Exception {
  static async defaultHandler(
    err: any,
    req: Request,
    res: Response,
    next: Function
  ) {
    let error = err.msg ? err : Internal_Server_Error;

    //JSON parse errors
    if (err.type == "entity.parse.failed") error = JSON_Parsing_Error;

    // Database errors
    // postgres
    if (err.name === "SequelizeUniqueConstraintError") {
      if (err.code === 11000) error = Database_Conflict;
    }

    const { httpStatus, ...body } = error;
    if (httpStatus === 500) console.error("Error 5xx:", error);
    res.status(httpStatus).json(body);
  }
}
