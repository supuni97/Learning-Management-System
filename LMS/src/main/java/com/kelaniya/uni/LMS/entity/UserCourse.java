package com.kelaniya.uni.LMS.entity;

import com.kelaniya.uni.LMS.dao.MyKey;

import javax.persistence.*;

@Entity(name = "userCourse")
@IdClass(MyKey.class)
public class UserCourse {
    @Id
    @Column(length = 100)
    private String userEmail;

    @Id
    @Column(length = 10)
    private String courseId;

    private String marks;
    private String courseName;
    private String semester;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getMarks() {
        return marks;
    }

    public void setMarks(String marks) {
        this.marks = marks;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }
}
