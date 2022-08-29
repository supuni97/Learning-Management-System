package com.kelaniya.uni.LMS.service;

import com.kelaniya.uni.LMS.dao.UserCourseDao;
import com.kelaniya.uni.LMS.entity.UserCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCourseService {
    @Autowired
    UserCourseDao userCourseDao;

    public void enrollToCourse(UserCourse userCourse){
        userCourseDao.save(userCourse);
    }

    public void addMarksForSuitableCourse(List<UserCourse> userCourse){
        for(UserCourse user : userCourse){
            userCourseDao.addMarks(user.getUserEmail(), user.getCourseId(), user.getMarks());
        }
    }

    public List<UserCourse> viewMarksWithUserName(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String userName = userDetails.getUsername();
        return userCourseDao.getMarks(userName);
    }

    public List<UserCourse> getSubjects(String courseId){
        return userCourseDao.getSubjects(courseId);
    }

}
