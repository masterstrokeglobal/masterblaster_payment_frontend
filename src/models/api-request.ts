import APIService from "./api-service";
import Merchant from "./merchant";

export enum ApiRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
}

class ApiRequest {
    id?: number;
    merchant?: Merchant;
    apiList?: APIService;
    status?: ApiRequestStatus;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(params: Partial<ApiRequest> = {}) {
        this.id = params.id;
        this.merchant = new Merchant(params.merchant);
        this.apiList = new APIService(params.apiList);
        this.status = params.status;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.deletedAt = params.deletedAt;
    }
}

export default ApiRequest;