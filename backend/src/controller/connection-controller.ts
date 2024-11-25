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
import {
  ConnectionValidation,
  validateConnectionExists,
  validateConnectionRequestExists,
} from "../validation/connection-validation";
import { ResponseError } from "../error/response-error";
import { validateUserExists } from "../validation/user-validation";

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

      await validateConnectionRequestExists(
        storeRequest.from_id,
        storeRequest.to_id,
        true
      );

      await validateUserExists(storeRequest.from_id, false);
      await validateUserExists(storeRequest.to_id, false);

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

      res.status(201).json(response);
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
      ).user_id;

      if (req.userId != user_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to retrieve Pending Connections from User with Id ${user_id}!`
        );
      }

      await validateUserExists(user_id, false);

      const pending_requests = await ConnectionService.indexPending(user_id);

      const response = formatResponse<ConnectionReqResponse[]>(
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
      const user_id: number = Number(req.params.user_id);

      await validateUserExists(user_id, false);

      const connections_list = await ConnectionService.indexConnection(user_id);

      const response = formatResponse<ConnectionReqResponse[]>(
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
      const respond_req: RespondReq = {
        from_id: req.body.from_id,
        to_id: req.body.to_id,
        accept: req.params.action === "accept" ? true : false,
      } 

      if (req.userId != respond_req.to_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to respond Connection Request from User with Id ${respond_req.to_id}!`
        );
      }

      await validateConnectionRequestExists(respond_req.from_id, respond_req.to_id, false);

      await validateConnectionExists(respond_req.from_id, respond_req.to_id, true);

      const respond_result = await ConnectionService.respondRequest(respond_req);

      const response = formatResponse(
        true,
        respond_result,
        `Request from User with Id ${respond_req.from_id} ${
          respond_req.accept ? "accepted" : "rejected"
        } successfully!`
      );

      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async unconnect(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const unconnect_req: ConnectionReq = Validation.validate(
        ConnectionValidation.STOREREQUEST,
        req.body
      );

      if (
        req.userId != unconnect_req.from_id &&
        req.userId != unconnect_req.to_id
      ) {
        throw new ResponseError(
          403,
          `User is unauthorized to perform unconnect operation!`
        );
      }

      await validateConnectionExists(
        unconnect_req.from_id,
        unconnect_req.to_id,
        false
      );

      const connection = await ConnectionService.deleteConnection(
        unconnect_req
      );

      const response = formatResponse(
        true,
        connection,
        `User Id ${unconnect_req.from_id} and User Id ${unconnect_req.to_id}'s Connection disconnected successfully!`
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
