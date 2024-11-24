import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { ConnectionReqResponse, ConnectionReq, RespondReq } from "../model/connection-model";

const prismaFromFormat = {
    from:{
        select:{
            full_name: true,
            work_history: true,
            skills: true,
            profile_photo_path: true
        }
    } 
}

export class ConnectionService{
    static async storeRequest(request: ConnectionReq) {
        const conn_request = await prismaClient.connectionRequest.findUnique({
            where:{
                from_id_to_id:{
                    from_id: request.from_id,
                    to_id: request.to_id
                }
            }
        })

        if(conn_request){
            throw new ResponseError(4)
        }
        
        const connection_request_result = await prismaClient.connectionRequest.create({
            data: {
                from_id: request.from_id,
                to_id: request.to_id
            }
        })

        return connection_request_result
    }

    static async indexPending(user_id: number): Promise<ConnectionReqResponse>{
        const pendingRequests = await prismaClient.connectionRequest.findMany({
            select:prismaFromFormat,
            where:{
                to_id: Number(user_id) 
            }
        })

        return pendingRequests
    }

    static async respondRequest(request: RespondReq){
        const operations = [
            prismaClient.connectionRequest.delete({
                where:{
                    from_id_to_id:{
                        from_id: request.from_id,
                        to_id: request.to_id
                    }
                },
                select: prismaFromFormat
            }),
        ]

        if(request.accept){
            operations.push(
                prismaClient.connection.create({
                data: {
                    from_id: request.from_id,
                    to_id: request.to_id,
                },
                select:prismaFromFormat
            }),
            prismaClient.connection.create({
                data: {
                    from_id: request.to_id,
                    to_id: request.from_id,
                },
                select:prismaFromFormat
            }),)
        }
        
        const res = await prismaClient.$transaction(operations)
        
        return res[2]
    }
    
    static async indexConnection(user_id: number){
        const connections = await prismaClient.connection.findMany({
            select: prismaFromFormat,
            where:{
                from_id: Number(user_id)
            }
        })

        return connections
    }
}