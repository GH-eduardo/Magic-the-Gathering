import IErrorResponse from "./error-response";

export default interface IDefaultResponse<T> {
    data?: T;
    error?: IErrorResponse;
    code?: number;
}