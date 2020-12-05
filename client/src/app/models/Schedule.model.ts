import { Course } from './Course.model'

export interface Schedule {
    _id: string;
    name: string;
    desc: string;
    courses: Course[];
    isPublic: boolean;
    modified: Date;
}