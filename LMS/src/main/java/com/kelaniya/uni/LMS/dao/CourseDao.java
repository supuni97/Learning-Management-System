package com.kelaniya.uni.LMS.dao;

import com.kelaniya.uni.LMS.entity.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseDao extends CrudRepository<Course, String> {
    @Query(value = "SELECT * FROM jwt_demo.course", nativeQuery = true)
    List<Course> findAllCourses();

    @Query(value = "SELECT * FROM jwt_demo.course WHERE degree_programme = :degree", nativeQuery = true)
    List<Course> getAllCoursesForSelectedDegreeProgramme(String degree);

}
