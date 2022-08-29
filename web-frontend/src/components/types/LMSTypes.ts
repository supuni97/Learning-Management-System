export interface IMyCourse {
    courseId: string
    courseName: string
    marks: number
    semester: string
    userEmail: string
}
export interface IAllCourse {
    courseCode: string;
    courseName: string;
    degreeProgramme: string;
    // faculty: number;
}
export interface ITutorialMarks {
    name: string;
    weight: string;
    grade: string;
    range: string;
    total: string;
}
export interface ICourseMarks {
    name: string;
    semester: string;
    grade: string;
    gpa: string;
}
export interface IAssignTask {
    name: string;
    assignDate: string;
    dueDate: string;
}
export interface DropDown {
    value: string;
    label: string;
}

export interface IMarkAdd {
    userEmail: string,
    courseId: string,
    marks: string,
    courseName: string,
    semester: string
}

export interface IUser {
    degreeProgramme: string;
    homeAddress: string;
    phone: string;
    role: string;
    roleName: string;
    userFirstName: string;
    userLastName: string;
    userName: string;
    userPassword: string;
}