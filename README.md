Installation and Run
Follow these steps:

Get the code on your system.
Open terminal on your pc and navigate to the root directory of the project.
Run "npm install" command inside the terminal to install all the required dependencies.
Create a '.env' file inside root directory and define values for
PORT ( port on which your project will run )
MONGODB_URL ( URL of your mongoDB database for connecting to database )
SECRET_KEY ( secret key for express-session )
Run 'npm start' command inside terminal to run the code.
Open your web browser and serach for 'localhost:{PORT}/' to see the output.
Features
Create account with your role as " Admin / Employee "
Login using your email and password.
Store your session-token in DB so that logged in user's session will be safe.
Store all the data of employee, reviews in database.
Admin:
View list of all the employee.
Add a new employee.
Update data of any employee ( Name, email, Role ).
See review given to an employee.
Assign task to any employee ( review task : Giving review to other employee )
Delete any employee.
Employee:
See all the reviews given to him by other employee.
Give his review for other employee as assigned from admin.
Tools used:
Nodejs
Expressjs
MongoDB
EJS
Passport
Passport local
BootStrap
