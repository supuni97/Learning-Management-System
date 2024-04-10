package com.kelaniya.uni.LMS.controller;

import com.kelaniya.uni.LMS.entity.Course;
import com.kelaniya.uni.LMS.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping({"/createNewCourse"})
    @PreAuthorize("hasRole('Teacher')")
    public Course createNewCourse(Course course){
        return courseService.createNewCourse(course);
    }

    @GetMapping("/available_courses")
    public List<Course> displayCourses(){
        return courseService.getAvailableCourses();
    }

    @PostMapping({"/getAllCoursesForSelectedDegreeProgramme"})
    public List<Course> getAllCoursesForSelectedDegreeProgramme(@RequestBody Course course){
        return courseService.getAllCoursesForSelectedDegreeProgramme(course);
    }

}
