# Online School API
This is node js api for online school where user can register and login. And there are three user role ex: admin, teacher, student. Simply i am describing the app in short below.

**Admin Area**
- The admin can see all students and teachers and their information.
- Admin can ban or delete any student and teacher

**Teacher**
- Teacher Registration
- View Profile/Update Profile/Change Password etc
- Create Course
- Create MCQ question

**Student**
- Student Registration
- View Profile/Update Profile/Change Password etc
- Enroll a course
- Take an exam (MCQ questions) 

The entire application is contained within the `src/app.js` file.
You will find all configuration in `./config/` folder
Migrations is defined on `src/migration/` folder

### Install
```
npm install
```
### Env
Copy all from `./.env.example` to your `.env` and define your configuration which is blank.

### Migration
Run your apache server as well as **mysql**. You can use **xampp** for this purpose. Then create your database which you defined on `.env`  file
```
npm run db:migrate
```

### Run the app
After successfully migration you can run the app.
```
npm run start:dev // for development server
npm start // for production
```

**voilà. Have a fun!**
