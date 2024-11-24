import { ConnectionService } from "../service/connection-service";
import {
  ConnectionReq,
  ConnectionReqResponse,
  RespondReq,
} from "../model/connection-model";
import { Response, NextFunction } from "express";
import { formatResponse } from "../utils/ResponseFormatter";
import { ConnectionRequest } from "@prisma/client";
import { AuthRequest } from "../middleware/auth-middleware";
import { Validation } from "../validation/validation";
import { ConnectionValidation } from "../validation/connection-validation";
import { ResponseError } from "../error/response-error";

export class ConnectionController {
  static async storeConnectionRequest(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const storeRequest: ConnectionReq = Validation.validate(
        ConnectionValidation.STOREREQUEST,
        req.body
      );

      if (req.userId != storeRequest.from_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to make Connection Request from User with Id ${storeRequest.from_id}!`
        );
      }

      const connection_request = await ConnectionService.storeRequest(
        storeRequest
      );

      const response = formatResponse<ConnectionRequest>(
        true,
        connection_request,
        "Connection Request created successfully!"
      );

      res.status(201).json({
        response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async indexPendingConnectionRequest(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user_id: number = Validation.validate(
        ConnectionValidation.INDEXREQUEST,
        req.body
      );

      if (req.userId != user_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to retrieve Pending Connections from User with Id ${user_id}!`
        );
      }

      const pending_requests = await ConnectionService.indexPending(user_id);

      const response = formatResponse<ConnectionReqResponse>(
        true,
        pending_requests,
        "Pending Requests retrieved successfully!"
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async indexConnection(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user_id: number = Validation.validate(
        ConnectionValidation.INDEXREQUEST,
        req.body
      );

      const connections_list = await ConnectionService.indexConnection(user_id);

      const response = formatResponse<ConnectionReqResponse>(
        true,
        connections_list,
        "Connections list retrieved successfully!"
      );
      res.status(200).json(response);

    } catch (e) {
      next(e);
    }
  }

  static async respondConnectionRequest(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const respond_req: RespondReq = Validation.validate(
        ConnectionValidation.RESPONDREQ,
        req.body
      );

      if (req.userId != respond_req.from_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to respond Connection from User with Id ${respond_req.from_id}!`
        );
      }

      const respond_result = await ConnectionService.respondRequest(
        respond_req
      );

      const response = formatResponse(
        true,
        respond_result,
        `Request from User with Id ${respond_req.from_id} ${
          respond_req.accept ? "accepted" : "rejected"
        } successfully!`
      );

      res.status(200).json(response)
    } catch (e) {
      next(e);
    }
  }
}
