"use strict";
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.enrolledCourses = [];
    }
    enroll(course) {
        this.enrolledCourses.push(course);
    }
}
class Instructor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    createCourse(title) {
        return new Course(title, this);
    }
    createLesson(title) {
        return new Lesson(title);
    }
    createAssignment(title) {
        return title;
    }
    createAssessment(title) {
        return title;
    }
}
class Course {
    constructor(title, instructor) {
        this.title = title;
        this.instructor = instructor;
        this.lessons = [];
        this.assessments = [];
    }
    addLesson(lesson) {
        this.lessons.push(lesson);
    }
    addAssessment(assessment) {
        this.assessments.push(assessment);
    }
}
class Lesson {
    constructor(title) {
        this.title = title;
        this.assignments = [];
    }
    addAssignment(assignment) {
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
