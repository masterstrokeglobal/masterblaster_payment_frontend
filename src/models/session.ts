interface SessionInterface {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
    session_id: string;
    patient_id: string;
    is_online: boolean;
    calendar_event_id: string;
    created_at: string;
    updated_at: string;
    created_by_id: string;
}

export class Session implements SessionInterface {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
    session_id: string;
    patient_id: string;
    is_online: boolean;
    calendar_event_id: string;
    created_at: string;
    updated_at: string;
    created_by_id: string;

    constructor(data: SessionInterface) {
        this.title = data.title;
        this.description = data.description;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.meeting_link = data.meeting_link;
        this.session_id = data.session_id;
        this.patient_id = data.patient_id;
        this.is_online = data.is_online;
        this.calendar_event_id = data.calendar_event_id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.created_by_id = data.created_by_id;
    }

    static fromJSON(json: string | object): Session {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        return new Session(data);
    }

    get duration(): number {
        const start = new Date(this.start_time);
        const end = new Date(this.end_time);
        return (end.getTime() - start.getTime()) / (1000 * 60); // Duration in minutes
    }

    get is_past(): boolean {
        return new Date(this.end_time) < new Date();
    }

    get is_upcoming(): boolean {
        return new Date(this.start_time) > new Date();
    }

    get is_in_progress(): boolean {
        const now = new Date();
        const start = new Date(this.start_time);
        const end = new Date(this.end_time);
        return now >= start && now <= end;
    }
}