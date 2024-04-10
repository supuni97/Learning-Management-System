package com.example.App.Login.model.api;

import android.app.Application;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;
import com.android.volley.toolbox.JsonObjectRequest;
import com.example.App.Login.model.User;

import org.json.JSONException;
import org.json.JSONObject;

public class WebAPI implements API{

    public static final String BASE_URL="http://localhost:8080/";
    private final Application mApplication;
    private RequestQueue mRequestQueue;

    public WebAPI(Application application){
        mApplication=application;
        mRequestQueue= Volley.newRequestQueue(application);

    }

    public void login(String email,String password,APIListener listener){

        String url=BASE_URL + "/userlogin";
        JSONObject jsonObject=new JSONObject();

        try {
            jsonObject.put("email",email);
            jsonObject.put("password",password);

            Response.Listener<JSONObject> successListener = new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {

                    try {
                        User user= User.getUser(response);
                        listener.onLogin(user);
                        Toast.makeText(mApplication, "success!", Toast.LENGTH_LONG).show();


                    } catch (Exception e) {

                        Toast.makeText(mApplication, "JSON exception!", Toast.LENGTH_LONG).show();
                    }

                }
            };

            Response.ErrorListener errorListener= new Response.ErrorListener() {

                @Override
                public void onErrorResponse(VolleyError error) {

                }
            };
            JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST,url,jsonObject,successListener,errorListener);
            mRequestQueue.add(request);

        }

        catch (JSONException e) {

            Toast.makeText(mApplication, "Error!", Toast.LENGTH_LONG).show();
        }

    }

}
