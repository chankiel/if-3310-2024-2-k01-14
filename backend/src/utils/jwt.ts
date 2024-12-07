import * as crypto from "crypto";
import { AuthRequest } from "../middleware/auth-middleware";

const secretKey = process.env.JWT_SECRET_KEY as string;

// const secretKey = "f3c9e1b2d4a5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0";

export interface PayloadFormat{
    userId: number;
    email: string;
    role: string;
    iat: string;
    exp: string;
}

function base64UrlEncode(input: string): string {
    return Buffer.from(input)
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function base64UrlDecode(input: string): string {
    return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
}

export function createJwt(payload: object): string {
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    console.log("masuk sana")
    try {
        console.log(secretKey)
        const signature = crypto
            .createHmac("sha256", secretKey)
            .update(`${encodedHeader}.${encodedPayload}`)
            .digest("base64")
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
            console.log("masuk sini")
            return `${encodedHeader}.${encodedPayload}.${signature}`;
    } catch (error) {
        console.error("Error generating signature:", error);
        throw error; // Rethrow or handle as needed
    }

}

export function verifyJwt(token: string): PayloadFormat | null {
    const [header, payload, signature] = token.split(".");
    const validSignature = crypto
        .createHmac("sha256", secretKey)
        .update(`${header}.${payload}`)
        .digest("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    if (validSignature === signature) {
        return JSON.parse(base64UrlDecode(payload));
    }
    return null;
}