import { AdminRole } from "./admin";

class Employee {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: AdminRole;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(params: Partial<Employee> = {}) {
        this.id = params.id;
        this.name = params.name;
        this.email = params.email;
        this.password = params.password;
        this.role = params.role;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
        this.deletedAt = params.deletedAt;
    }

    get isAdmin() {
        return this.role === AdminRole.SUPER_ADMIN;
    }

    get isEmployee() {
        return this.role === AdminRole.EMPLOYEE;
    }

    hasPermission(requiredRole: AdminRole) {
        if (this.role === AdminRole.SUPER_ADMIN) return true;
        return this.role === requiredRole;
    }
}

export default Employee;