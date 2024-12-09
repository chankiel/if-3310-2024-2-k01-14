import { ConnectionService } from "../service/connection-service";
import {
  ConnectionFormat,
  ConnectionReqRequest,
  RespondRequest,
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
import { ChatService } from "../service/chat-service";

export class ConnectionController {
  static async storeConnectionRequest(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const storeRequest: ConnectionReqRequest = Validation.validate(
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
          `User is unauthorized to make connection request!`
        );
      }

      const connection_request = await ConnectionService.storeRequest(
        storeRequest
      );

      const response = formatResponse(
        true,
        null,
        connection_request.status,
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
      const user_id: number = Number(req.params.user_id);
      if (req.userId != user_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to retrieve pending connections!`
        );
      }

      await validateUserExists(user_id, false);

      const pending_requests = await ConnectionService.indexPending(user_id);

      const response = formatResponse<ConnectionFormat[]>(
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

      const response = formatResponse<ConnectionFormat[]>(
        true,
        connections_list,
        "Connections list retrieved successfully!"
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async checkRequested(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const respond_req = {
        from_id: Number(req.params.from_id),
        to_id: Number(req.params.to_id),
      };

      if (req.userId != respond_req.from_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to check connection request!`
        );
      }

      await validateConnectionRequestExists(
        respond_req.from_id,
        respond_req.to_id,
        false
      );

      const response = formatResponse(
        true,
        {hasRequested: true},
        `User has sent the connection request!`
      );

      res.status(201).json(response);
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
      const respond_req: RespondRequest = {
        from_id: Number(req.params.from_id),
        to_id: Number(req.params.to_id),
        accept: req.params.action === "accept" ? true : false,
      };

      if (req.userId != respond_req.to_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to respond the connection request!`
        );
      }

      await validateConnectionRequestExists(
        respond_req.from_id,
        respond_req.to_id,
        false
      );

      await validateConnectionExists(
        respond_req.from_id,
        respond_req.to_id,
        true
      );

      const respond_result = await ConnectionService.respondRequest(
        respond_req
      );
      let room_id = -1;
      if (respond_req.accept) {
        room_id = await ChatService.makeRoomChat({
          first_id: respond_req.from_id,
          second_id: respond_req.to_id,
        });
      }

      const response = formatResponse(
        true,
        {
          new_connect: respond_result,
          room_id: room_id == -1 ? undefined : room_id,
        },
        `Connection request ${
          respond_req.accept ? "accepted" : "rejected"
        } successfully!`
      );

      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async deleteConnection(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const unconnect_req: ConnectionReqRequest = {
        from_id: Number(req.params.from_id),
        to_id: Number(req.params.to_id),
      };

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

      const room = await ChatService.deleteRoomChat({
        first_id: unconnect_req.from_id,
        second_id: unconnect_req.to_id,
      })

      const response = formatResponse(
        true,
        null,
        `Connection of user Id ${unconnect_req.from_id} with user Id ${unconnect_req.to_id} disconnected successfully!`
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async deleteConnectionRequest(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const delete_request: ConnectionReqRequest = {
        from_id: Number(req.params.from_id),
        to_id: Number(req.params.to_id),
      };

      if (req.userId !== delete_request.from_id) {
        throw new ResponseError(
          403,
          `User is unauthorized to perform delete request operation!`
        );
      }

      await validateConnectionRequestExists(
        delete_request.from_id,
        delete_request.to_id,
        false
      );

      const connection = await ConnectionService.deleteConnectionRequest(
        delete_request
      );

      const response = formatResponse(
        true,
        null,
        `Connection request from user Id ${delete_request.from_id} to user Id ${delete_request.to_id} deleted successfully!`
      );

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
