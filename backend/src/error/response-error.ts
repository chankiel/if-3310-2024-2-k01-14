export class ResponseError extends Error {

    public errors: Record<string,any>;

    constructor(public status: number, public message: string, errorDetails: Record<string,any>= {}) {
        super(message);
        this.errors = errorDetails
    }
    
}