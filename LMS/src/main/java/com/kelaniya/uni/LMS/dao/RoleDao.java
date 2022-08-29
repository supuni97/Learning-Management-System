package com.kelaniya.uni.LMS.dao;

import com.kelaniya.uni.LMS.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {

}
