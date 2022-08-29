package com.example.App.Assignment.LecturerSide;

public class UserResponce {

   private int assignment_Id;
   private String assignment_name;
   private int course_Id;
   private String uploaded_date;
   private String due_date;

    public int getAssignment_Id() {
        return assignment_Id;
    }

    public void setAssignment_Id(int assignment_Id) {
        this.assignment_Id = assignment_Id;
    }

    public String getAssignment_name() {
        return assignment_name;
    }

    public void setAssignment_name(String assignment_name) {
        this.assignment_name = assignment_name;
    }

    public int getCourse_Id() {
        return course_Id;
    }

    public void setCourse_Id(int course_Id) {
        this.course_Id = course_Id;
    }

    public String getUploaded_date() {
        return uploaded_date;
    }

    public void setUploaded_date(String uploaded_date) {
        this.uploaded_date = uploaded_date;
    }

    public String getDue_date() {
        return due_date;
    }

    public void setDue_date(String due_date) {
        this.due_date = due_date;
    }


    @Override
    public String toString() {
        return "UserResponce{" +
                "assignment_Id=" + assignment_Id +
                ", assignment_name='" + assignment_name + '\'' +
                ", course_Id=" + course_Id +
                ", uploaded_date='" + uploaded_date + '\'' +
                ", due_date='" + due_date + '\'' +
                '}';
    }
}
