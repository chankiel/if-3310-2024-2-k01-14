import * as crypto from "crypto";

const secretKey = process.env.JWT_SECRET_KEY as string

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
    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyJwt(token: string): object | null {
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