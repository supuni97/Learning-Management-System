package com.kelaniya.uni.LMS.service;

import com.kelaniya.uni.LMS.controller.EmailController;
import com.kelaniya.uni.LMS.dao.CourseDao;
import com.kelaniya.uni.LMS.entity.Course;
import com.kelaniya.uni.LMS.entity.EmailRequest;
import com.kelaniya.uni.LMS.entity.Role;
import com.kelaniya.uni.LMS.entity.User;
import com.kelaniya.uni.LMS.dao.RoleDao;
import com.kelaniya.uni.LMS.dao.UserDao;
import com.sendgrid.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private CourseDao courseDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EmailController emailController;

    public String resetUserName;

    public void initRoleAndUser() {

        Course course1 = new Course();
        course1.setCourseCode("SENG 1212");
        course1.setCourseName("Statistics");
        course1.setDegreeProgramme("se");
        courseDao.save(course1);

        Course course2 = new Course();
        course2.setCourseCode("SENG 1122");
        course2.setCourseName("Programming");
        course2.setDegreeProgramme("ma");
        courseDao.save(course2);

        Role adminRole = new Role();
        adminRole.setRoleName("Teacher");
        adminRole.setRoleDescription("Teacher role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("Student");
        userRole.setRoleDescription("Student Role");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

//        User user = new User();
//        user.setUserName("raj123");
//        user.setUserPassword(getEncodedPassword("raj@123"));
//        user.setUserFirstName("raj");
//        user.setUserLastName("sharma");
//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        userDao.save(user);
    }

    public Integer getRegisterCode(User user){
        String userName = user.getUserName();
        int resetCode = createResetCode();
        //email function
        String to = userName;
        String subject = "Learning Management System";
        String body = "Your password reset code is: " + resetCode;
        EmailRequest emailRequest = new EmailRequest(to, subject, body);

        Thread newThread = new Thread(() -> {
            emailController.sendEmail(emailRequest);
        });
        newThread.start();

        return resetCode;
    }

    public ResponseEntity<String> registerNewUser(User user) {
        Role role = roleDao.findById(user.getRoleName()).get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        try{
            userDao.findById(user.getUserName()).get().getUserName();
            return new ResponseEntity<>("Failed to Register",HttpStatus.MULTI_STATUS);
        }catch (Exception e){
            userDao.save(user);
        }
        return new ResponseEntity<>("Successfully registered",HttpStatus.OK);
    }

    public Integer sendResetCode(String userName){
        this.resetUserName = userName;
        try{

            User user = userDao.findById(resetUserName).get();
            int resetCode = createResetCode();

            // email sending function
            String to = resetUserName;
            String subject = "Learning Management System";
            String body = "Your password reset code is: " + resetCode;
            EmailRequest emailRequest = new EmailRequest(to, subject, body);

            Thread newThread = new Thread(() -> {
                emailController.sendEmail(emailRequest);
            });
            newThread.start();

            return resetCode;

        }catch (UsernameNotFoundException e){
            throw new UsernameNotFoundException("Your Email is not in our system");
        }
    }

    public User updatePassword(String password){
        userDao.restorePassword(getEncodedPassword(password), resetUserName);
        return null;
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    //to create random code
    public Integer createResetCode(){
        int min = 1000;
        int max = 10000;

        return (int)Math.floor(Math.random()*(max-min+1)+min);
    }

    public Optional<User> getUserDetails(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String userName = userDetails.getUsername();
        return userDao.findById(userName);
    }

}
