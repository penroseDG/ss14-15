 class Student {
    id: number;
    name: string;
    enrolledCourses: Course[];
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.enrolledCourses = [];
    }
    enroll(course: Course) {
        this.enrolledCourses.push(course);
    }
}
class Instructor {
    id: number;
    name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    createCourse(title: string): Course {
        return new Course(title, this);
    }
    createLesson(title: string): Lesson {
        return new Lesson(title);
    }
    createAssignment(title: string): string {
        return title;
    }
    createAssessment(title: string): string {
        return title;
    }
}
class Course {
    title: string;
    instructor: Instructor;
    lessons: Lesson[];
    assessments: string[];
    constructor(title: string, instructor: Instructor) {
        this.title = title;
        this.instructor = instructor;
        this.lessons = [];
        this.assessments = [];
    }
    addLesson(lesson: Lesson) {
        this.lessons.push(lesson);
    }
    addAssessment(assessment: string) {
        this.assessments.push(assessment);
    }
}
class Lesson {
    title: string;
    assignments: string[];
    constructor(title: string) {
        this.title = title;
        this.assignments = [];
    }
    addAssignment(assignment: string) {
        this.assignments.push(assignment);
    }
}
let instructor = new Instructor(1, "John Doe");
let course = instructor.createCourse("Introduction to TypeScript");
let lesson1 = instructor.createLesson("Introduction");
lesson1.addAssignment("Assignment 1");
let lesson2 = instructor.createLesson("Advanced Topics");
lesson2.addAssignment("Assignment 2");
course.addLesson(lesson1);
course.addLesson(lesson2);
course.addAssessment("Final Exam");
let student = new Student(101, "Alice");
student.enroll(course);
console.log(student.enrolledCourses);
