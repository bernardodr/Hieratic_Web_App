# Hieratic_Web_App

libraries used so far:

JAVASCRIPT
__________________________________

1. node.js 
2. express
3. multer (middleaware for handeling images)
4. uuid (renaming files)
5. sys (python )
6. child-process (module node js for communicating with python)
7. cropperjs
8. adm-zip
9. sys


PYTHON Version 3.9
__________________________________
1. pickle
2. numpy
3. random
4. matplotlib
5. os
6. sys
7. PIL
8. collections
9. sklearn


Set up instructions: 
__________________________________

1. On the server.js file set the const root to the absolute path of the Thesis_Dataset_Whole on your device. Making sure that you put a "/" at the end of the path. i.e. '/Users/danielbernardo/Desktop/Dissteration Code/Hieratic_Web_App/server/database/Thesis_Dataset_Whole/'

2. To install all nesseary JS packages. First open the HIERATIC_WEB_APP folder in a terminal. Then run the following command 'cd server' *If you are on Mac. Then paste and run the following command 'npm install'.

3. To install all nesseary Python packages. First open the HIERATIC_WEB_APP folder in a terminal.Then run the following command 'cd server'. Then paste and run the following command 'pip3 install -r requirements.txt'.

4. If sklearn has not installed please use the following pip command to reinstall it. 'pip3 install -U scikit-learn scipy'

5. To get the local host running. First open the HIERATIC_WEB_APP folder in a terminal.Then run the following command 'cd server'. Then paste and run the following command 'node server.js'.

