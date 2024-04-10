package com.example.App.Login.model;

import android.app.Application;

import com.example.App.Login.model.api.APIListener;
import com.example.App.Login.model.api.WebAPI;
import com.example.App.Login.model.api.API;

public class Model {

    protected static Model sInstance=null;
    private final API mApi;
    private User mUser;

    public static Model getInstance(Application application){
        if(sInstance==null){
            sInstance=new Model(application);
        }
        return sInstance;
    }

    private final Application mApplication;

    private Model (Application application)
    {
        mApplication=application;
        mApi=new WebAPI(mApplication);
    }

    public Application getmApplication() {
        return mApplication;
    }

    public void login(String email, String password, final APIListener listener){

        mApi.login(email,password,listener);
    }

    public User getUser() {
        return mUser;
    }

    public void setUser(User user) {
        this.mUser = user;
    }
}
