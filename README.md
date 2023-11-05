# Back-end for Midterm Web Advanced Course

## Author
* Name: Nguyen Van Hai
* GH: [nvhai248](https://github.com/nvhai248)

## Structure of User
```
User: {
    _id: mongo generated,
    full_name: String,
    username: String,
    password: String,
    created_at: String,
    updated_at: String,
    email: String,
    phone_number: String,
    birthday: String,
    social_id: String,
    address: String
}
```

## APIs

* `POST api/user/login`: Sign in to the application.
    
    Failure:

    ```
    {
        "status": false,
        "message": "...",
    }
    ```

    Success:

    ```
    {
        "status": true,
        "message": "...",
        "token": "..."
    }
    ```

* `POST api/user/register`: Sign up to the application

    Failure:

    ```
    {
        "status": false,
        "message": "...",
    }
    ```

    Success:

    ```
    {
        "status": true,
        "message": "...",
    }
    ```
* `DELETE api/user/logout`: Log out from the application

    Failure:

    ```
    {
        "status": false,
        "message": "...",
    }
    ```

    Success:

    ```
    {
        "status": true,
        "message": "...",
    }
    ```

    If user is logged out, the token will be deleted from the database.

* `GET api/user/profile`:  Get the user's profile.

    Failure:

    ```
    {
        "status": false,
        "message": "...",
    }
    ```

    Success:

    ```
    {
        "status": true,
        "message": "...",
        "data" : {
            ...
            //user profile data
        }
    }
    ```
   
* `PATCH api/user/profile`:  Update the user's profile.

    Failure:

    ```
    {
        "status": false,
        "message": "...",
    }
    ```

    Success:

    ```
    {
        "status": true,
        "message": "...",
        "data" : {
            ...
            //Updated user profile data
        }
    }