package com.kelaniya.uni.LMS.service;

import java.io.IOException;
import java.util.List;

import com.kelaniya.uni.LMS.entity.EmailRequest;
import com.kelaniya.uni.LMS.entity.Notification;
import com.kelaniya.uni.LMS.entity.UserCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.web.bind.annotation.RequestBody;


@Service
public class EmailService {


    @Autowired
    SendGrid sendGrid;

    @Autowired
    private UserCourseService userCourseService;

    public Response sendEmail(EmailRequest emailrequest)
    {

        Mail mail = new Mail(new Email("etextile2021@gmail.com"), emailrequest.getSubject(), new Email(emailrequest.getTo()),new Content("text/plain", emailrequest.getBody()));
        mail.setReplyTo(new Email("etextile2021@gmail.com"));
        Request request = new Request();

        Response response = null;

        try {

            request.setMethod(Method.POST);

            request.setEndpoint("mail/send");

            request.setBody(mail.build());

            response=this.sendGrid.api(request);

        } catch (IOException ex) {

            System.out.println(ex.getMessage());

        }

        return response;


    }

    public void sendNotifications(Notification notification){
        List<UserCourse> toBeNotifiedUsers = userCourseService.getSubjects(notification.getCourseId());
        System.out.println(toBeNotifiedUsers);
        for (UserCourse users : toBeNotifiedUsers){
            String to = users.getUserEmail();
            String subject = notification.getSubject();
            String body = notification.getBody();
            EmailRequest emailRequest = new EmailRequest(to, subject, body);
            sendEmail(emailRequest);
        }

    }



}
