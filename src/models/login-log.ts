import Merchant from "./merchant";

class LoginLog {
    id?: number;
    merchant?: Merchant;
    ipAddress?: string;
    longitude?: string;
    latitude?: string;
    userAgent?: string;
    platform?: string;
    device?: string;
    browser?: string;
    operatingSystem?: string;
    loginStatus?: boolean;
    loginMessage?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(params: Partial<LoginLog> = {}) {
        this.id = params.id;
        this.merchant = params.merchant ? new Merchant(params.merchant) : undefined;
        this.ipAddress = params.ipAddress;
        this.longitude = params.longitude;
        this.latitude = params.latitude;
        this.userAgent = params.userAgent;
        this.platform = params.platform;
        this.device = params.device;
        this.browser = params.browser;
        this.operatingSystem = params.operatingSystem;
        this.loginStatus = params.loginStatus;
        this.loginMessage = params.loginMessage;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.deletedAt = params.deletedAt;
    }

    get isSuccessful() {
        return this.loginStatus === true;
    }

    get isFailed() {
        return this.loginStatus === false;
    }

    get location() {
        if (this.latitude && this.longitude) {
            return `${this.latitude}, ${this.longitude}`;
        }
        return undefined;
    }
}

export default LoginLog;