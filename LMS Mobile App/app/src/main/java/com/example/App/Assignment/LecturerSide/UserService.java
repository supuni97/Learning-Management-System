package com.example.App.Assignment.LecturerSide;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface UserService {

    @GET ("/assignment")
    Call<List<UserResponce>> getAllUsers();


}
