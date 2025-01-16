interface PatientInterface {
    patient_id: string;
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    pronouns: string;
    mobile: string;
    dob: string;
    status: string;
    tags: string[];
}

export class Patient implements PatientInterface {
    patient_id: string;
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    gender: string;
    pronouns: string;
    mobile: string;
    dob: string;
    status: string;
    private _tags: string[];

    constructor(data: PatientInterface) {
        this.patient_id = data.patient_id;
        this.user_id = data.user_id;
        this.email = data.email;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.gender = data.gender;
        this.pronouns = data.pronouns;
        this.mobile = data.mobile;
        this.dob = data.dob;
        this.status = data.status;
        this._tags = data.tags;
    }

    static fromJSON(json: string | object): Patient {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        return new Patient(data);
    }

    get full_name(): string {
        return `${this.first_name} ${this.last_name}`;
    }

    get initials(): string {
        return `${this.first_name[0]}${this.last_name[0]}`;
    }
    get age(): number {
        const birthDate = new Date(this.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    get tags(): string[] {
        return [...this._tags];
    }

    get is_active(): boolean {
        return this.status === 'active';
    }
}