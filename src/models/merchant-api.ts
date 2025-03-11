// models/merchant-api-key.ts

export enum ApiKeyMode {
    LIVE_MODE = "LIVE MODE",
    TEST_MODE = "TEST MODE",
  }
  
  export enum ApiKeyStatus {
    ACTIVE = "Active",
    NOT_ACTIVE = "Not Active",
  }
  
  export class MerchantApiKey {
    id: string;
    ipAddress: string;
    headerKey: string;
    encryptionKey: string;
    status: ApiKeyStatus;
    mode: ApiKeyMode;
    generatedDate: Date;
    lastUsedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    merchantId: number;
  
    constructor(data: any) {
      this.id = data.id;
      this.ipAddress = data.ipAddress;
      this.headerKey = data.headerKey;
      this.encryptionKey = data.encryptionKey;
      this.status = data.status;
      this.mode = data.mode;
      this.generatedDate = new Date(data.generatedDate);
      this.lastUsedAt = data.lastUsedAt ? new Date(data.lastUsedAt) : undefined;
      this.createdAt = new Date(data.createdAt);
      this.updatedAt = new Date(data.updatedAt);
      this.merchantId = data.merchant?.id;
    }
  
    isActive(): boolean {
      return this.status === ApiKeyStatus.ACTIVE;
    }
  }