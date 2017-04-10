# CPSC_473_Project_1
Group Members: Payaam Emami, Yijie Sun, Tushar Kamble, Remilda Dsilva, Kevin Lam, Long Nguyen

#Project Summary:
This is a Web application where parents can share embarrassing baby pictures with their children’s potential dates.
It is implemented using Json Server, JavaScript, HTML, CSS, Bootstrap.

#Main functions:
-Create account
-Login
-Upload picture to db.json (base64 picture)
-View available pictures on db.json


#Installation/Configuration
-Git
Install git if it is not already installed
Then in terminal:

git clone https://github.com/PayaamEmami/CPSC_473_Project

-Browser-sync & json server
Install Node.js from nodejs.org if it is not already installed
Then in terminal:

npm install -g browser-sync
npm install -g json-server

Then in the project directory (where the git clone command was run previously):
browser-sync start --server --browser --files "*.html, stylesheets/*.css, scripts/*.js"
json-server --port=3002 --watch db.json

-Application
To access the application, in a browser:
http://localhost:3000/index.html
