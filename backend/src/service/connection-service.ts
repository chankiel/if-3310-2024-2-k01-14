import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  ConnectionFormat,
  ConnectionReqRequest,
  RespondRequest,
} from "../model/connection-model";

const prismaFromFormat = {
  from: {
    select: {
      id: true,
      username: true,
      full_name: true,
      profile_photo_path: true,
      created_at: true,
    },
  },
};

function flattenFrom(data: { from: ConnectionFormat }) {
  return { ...data.from };
}

export class ConnectionService {
  static async storeRequest(request: ConnectionReqRequest) {
    const connection_request_result =
      await prismaClient.connectionRequest.create({
        data: {
          from_id: request.from_id,
          to_id: request.to_id,
        },
      });

    return connection_request_result;
  }

  static async indexPending(user_id: number): Promise<ConnectionFormat[]> {
    const pendingRequests = await prismaClient.connectionRequest.findMany({
      select: prismaFromFormat,
      where: {
        to_id: Number(user_id),
      },
    });

    const flattenedPendingRequests = pendingRequests.map((req) =>
      flattenFrom(req)
    );

    return flattenedPendingRequests;
  }

  static async respondRequest(request: RespondRequest) {
    const operations = [
      prismaClient.connectionRequest.delete({
        where: {
          from_id_to_id: {
            from_id: request.from_id,
            to_id: request.to_id,
          },
        },
        select: prismaFromFormat,
      }),
    ];

    if (request.accept) {
      operations.push(
        prismaClient.connection.create({
          data: {
            from_id: request.from_id,
            to_id: request.to_id,
          },
          select: prismaFromFormat,
        }),
        prismaClient.connection.create({
          data: {
            from_id: request.to_id,
            to_id: request.from_id,
          },
          select: prismaFromFormat,
        })
      );
    }

    const res = await prismaClient.$transaction(operations);

    return res[2];
  }

  static async indexConnection(user_id: number) {
    const connections = await prismaClient.connection.findMany({
      select: prismaFromFormat,
      where: {
        to_id: Number(user_id),
      },
    });

    const flattenedConnections = connections.map((con) => flattenFrom(con));

    return flattenedConnections;
  }

  static async deleteConnection(request: ConnectionReqRequest) {
    const connection = await prismaClient.connection.deleteMany({
      where: {
        AND: [
          {
            from_id: request.from_id,
            to_id: request.to_id,
          },
          {
            from_id: request.to_id,
            to_id: request.from_id,
          },
        ],
      },
    });

    return connection;
  }

  static async deleteConnectionRequest(request: ConnectionReqRequest) {
    const connection = await prismaClient.connectionRequest.delete({
      where: {
        from_id_to_id:{
            from_id: request.from_id,
            to_id: request.to_id,
        }
      },
    });

    return connection;
  }
}
