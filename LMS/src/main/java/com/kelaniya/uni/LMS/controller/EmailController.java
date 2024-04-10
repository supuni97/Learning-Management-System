package com.kelaniya.uni.LMS.controller;

import com.kelaniya.uni.LMS.entity.EmailRequest;
import com.kelaniya.uni.LMS.entity.Notification;
import com.kelaniya.uni.LMS.entity.UserCourse;
import com.kelaniya.uni.LMS.service.EmailService;
import com.kelaniya.uni.LMS.service.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.sendgrid.Response;

import java.util.List;

@RestController
@CrossOrigin
public class EmailController {


    @Autowired
    private EmailService emailservice;

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailrequest)
    {

        Response response=emailservice.sendEmail(emailrequest);
        if(response.getStatusCode()==200||response.getStatusCode()==202)
            return new ResponseEntity<>("send successfully",HttpStatus.OK);
        return new ResponseEntity<>("failed to sent",HttpStatus.NOT_FOUND);

    }

    @PostMapping({"/sendNotifications"})
    public void sendNotifications(@RequestBody Notification notification){
        emailService.sendNotifications(notification);
    }

}