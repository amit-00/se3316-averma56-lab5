import { CourseInfo } from './CourseInfo.model';

export interface Course {
    catalog_nbr: String;
    subject: String;
    className: String;
    course_info: CourseInfo[];
    catalog_description:String;
}