
class APIService {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  active?: boolean;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(params: Partial<APIService> = {}) {
    Object.assign(this, params);
  }

}

export default APIService;