# RESTapi

List of all possible APIs with description =>{

**1. /api/users  : User route**
   
 **1.1 /get/all :** GETs all the users registered/signed up and stored in database
  
 **1.2 /signup  :** POSTs to create a new user to be stored into the database
  
**1.3 /login   :** POSTs to login into an existing user account with correct password
  

**2. /api/blogs       :** Blogs route

  **2.1 /get/all      :** GETs all the blogs present in the database of all the users
   
  **2.2 /get/:id      :** GETs a single blog using the id
  
  **2.3 /get/user/:id :** GETs all the blogs of a user from the database using their id
  
  **2.4 /add          :** POSTs a blog with reference to the user's ID to store into the database
  
  **2.5 /update/:id   :** PUTs an existing blog in the database
  
  **2.6 /delete/:id   :** DELETEs a single blog from the database using the id

}

Date of Creation : 29/06/2023

Date of Addition of User and Blog routes : 29/06/2023
