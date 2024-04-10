package com.kelaniya.uni.LMS.dao;

import com.kelaniya.uni.LMS.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserDao extends CrudRepository<User, String> {
    @Transactional
    @Modifying
    @Query("UPDATE user SET userPassword = :userPassword WHERE userName = :userName")
    Integer restorePassword(String userPassword, String userName);

}
