package com.example.App.Profile;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import com.example.App.R;
import com.example.App.MainPackage.MainActivity;

public class EditProfile extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
    }

    public void ClickBack(View view){
        MainActivity.redirectActivity(this, MainActivity.class);
    }

    public void ClickProfile(View view){
        MainActivity.redirectActivity(this, Profile.class);
    }

}