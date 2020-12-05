import { CourseInfo } from './CourseInfo.model';
import { Review } from './Review.model';

export interface Course {
    _id: string;
    catalog_nbr: string;
    subject: string;
    className: string;
    course_info: CourseInfo[];
    catalog_description:string;
    reviews: Review[];
}