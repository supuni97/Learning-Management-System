package com.example.App.Calendar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.os.Bundle;
import android.view.View;

import com.example.App.R;
import com.example.App.Course.Courses;
import com.example.App.Dashboard.Dashboard;
import com.example.App.MainPackage.MainActivity;
import com.example.App.Marks.Marks;

public class Calendar extends AppCompatActivity {

    DrawerLayout drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_calendar);

        drawerLayout= findViewById(R.id.drawer_layout);
    }
    public void ClickMenu(View view){
        MainActivity.openDrawer(drawerLayout);
    }

    public void ClickLogo(View view){
        MainActivity.closeDrawer(drawerLayout);
    }

    public void ClickHome(View view){
        MainActivity.redirectActivity(this,MainActivity.class);
    }
    public void ClickDashboard(View view){

        MainActivity.redirectActivity(this, Dashboard.class);

    }

    public void ClickCalendar(View view){

        recreate();

    }
    public void ClickMark(View view){

        MainActivity.redirectActivity(this, Marks.class);

    }

    public void ClickCourse(View view){
        MainActivity.redirectActivity(this, Courses.class);


    }

    public void ClickLogout(View view){
        MainActivity.logout(this);

    }

    @Override
    protected void onPause() {
        super.onPause();
        MainActivity.closeDrawer(drawerLayout);
    }
}