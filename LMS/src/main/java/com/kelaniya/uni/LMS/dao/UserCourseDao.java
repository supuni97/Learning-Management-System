package com.kelaniya.uni.LMS.dao;

import com.kelaniya.uni.LMS.entity.UserCourse;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserCourseDao extends CrudRepository<UserCourse, MyKey> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE user_course SET marks = :marks WHERE  user_email = :userEmail AND course_id = :courseId", nativeQuery = true)
    Integer addMarks(String userEmail, String courseId, String marks);

    @Query(value = "SELECT * FROM jwt_demo.user_course WHERE user_email = :userEmail", nativeQuery = true)
    List<UserCourse> getMarks(String userEmail);

    @Query(value = "SELECT * FROM jwt_demo.user_course WHERE course_id = :courseId", nativeQuery = true)
    List<UserCourse> getSubjects(String courseId);
}
