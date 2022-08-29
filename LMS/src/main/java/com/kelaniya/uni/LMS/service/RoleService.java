package com.kelaniya.uni.LMS.service;

import com.kelaniya.uni.LMS.entity.Role;
import com.kelaniya.uni.LMS.dao.RoleDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
