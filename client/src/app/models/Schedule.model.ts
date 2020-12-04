import { Review } from './Review.model';

export interface Schedule {
    user: String;
    name: String;
    desc: String;
    courses: String[];
    reviews: Review[];
    isPublic: Boolean;
    modified: Date;
}