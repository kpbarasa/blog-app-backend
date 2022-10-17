# blog-backend-application
 Blog Application Backend V1
 This app uses Node.js/Express/MongoDB with Google OAuth for authentication
 ## Usage
Add your mongoDB URI and Google OAuth credentials to the config.env file

## Install dependencies
npm install

## Run in development
npm run dev

## Run in production
npm start


## Functions

1.  auth user
     <ul>
     <li>Create user account</li>
     <li>Log in user</li>
     <li>Log out in user</li>
     <li>Get user data</li>
     </ul>
2.  Blog Posts
     <ul>
     <li>
     Create blog post
            <ul>
                <li>
                    Upload featured mage
                    max size: "4mb"
                    Type: "mp4"
                </li>
                <li>
                    Upload video
                    max size "4mb"
                    Type: "jpeg, jpg, png"
                </li>
                <li>
                    Upload gallery 
                    max number of images: "16"
                </li>
            </ul>
     </li>
     <li>Get all blog posts</li>
     <li>Get blog post</li>
     <li>Update blog post</li>
     <li>Delete blog post</li> 
     </ul>
3.  Blog Comments
     <ul>
     <li>Create blog post</li>
     <li>Get all blog posts</li>
     <li>Get blog post</li>
     <li>Update blog post</li>
     <li>Delete blog post</li> 
     </ul>
4.  Blog media
     <ul> 
     <li>Get all blog galleries</li>
     <li>Get all blog images</li>
     <li>Get all blog videos</li> 
     </ul>

 ## Routes

 ### Blog posts
 

    @route   GET blog/api/v1/posts/:id
    @desc    Resete Count post views

    ```
    response:
    {
        "status": "succes",
        "message": "Successfuly addeD new post",
        "dataInfo": {
            "dataTitle": "Blog post title",
            "userId": "user id",  
    }
    ```


    @route   POST blog/api/v1/posts/new
    @desc    Add new posts

    ```
    request.body:{ 
            title:{"title"}, 
            body:{"Post main text"}, 
            category:{"category id"}, 
            status:{"Status private or public"}, 
            file:{fu}, 
            gallery:[], 
            video:{},
            setFeaturedImg:{}
        }

    response:
    {
        "status": "succes",
        "message": "Successfuly created  new post",
        "dataInfo": {
            "dataTitle": "Blog post title",
            "userId": "user id",  
    }
    ```

    @route   GET blog/api/v1/posts/get
    @desc    GEt all posts

    ```
    response:
    
        "posts": [
                    { 
                        "_id": "6347b4038c35b85fe375b09d",
                        "post_id": "6347b4028c35b85fe375b091",
                        "title": "new post title 12",
                        "body": "PBlog post body",
                        "category": "63479cb8f227ee952fb9751e",
                        "status": "public",
                        "user": "630d8a50d47e86b6ff35e6bd",
                        "featured_image": "6347b4028c35b85fe375b091-video.mp4",
                        "createdAt": "2022-10-13T06:45:23.            365Z",
                        "updatedAt": "2022-10-13T06:45:23.365Z",
                        "__v": 0
                    }
                ] 
    
    ```

    @route   GET blog/api/v1/posts/get/:id
    @desc    GEt all post

    ```
    response:
    
        "post": { 
                    "_id": "6347b4038c35b85fe375b09d",
                    "post_id": "6347b4028c35b85fe375b091",
                    "title": "new post title 12",
                    "body": "PBlog post body",
                    "category": "63479cb8f227ee952fb9751e",
                    "status": "public",
                    "user": "630d8a50d47e86b6ff35e6bd",
                    "featured_image":"6347b4028c35b85fe375b091-video.mp4",
                    "createdAt":"2022-10-13T06:45:23.            365Z",
                    "updatedAt": "2022-10-13T06:45:23.365Z",
                    "__v": 0
                }
    
    ```

    
    @route   PUT blog/api/v1/posts/update/:id
    @desc    Update post

    ```
    request.body:{ title, body, category, status, file, gallery, video, setFeaturedImg }
    response:
    {
        "status": "succes",
        "message": "Post {Blog post title} successfuly updated,
        "dataInfo": {
            "dataTitle": "Blog post title",
            "userId": "user id",  
    }
    ```


    @route   DELETE blog/api/v1/posts/delete/:id
    @desc    Delete post

    ```
    response:
    {
        "status": "succes",
        "message": "Successfuly created  new post",
        "dataInfo": {
            "dataTitle": "Blog post title", 
    }
    ```


    @route   GET blog/api/v1/posts/user/:userId
    @desc    User posts

    ```
    response:

        "posts": [
                    { 
                        "_id": "6347b4038c35b85fe375b09d",
                        "post_id": "6347b4028c35b85fe375b091",
                        "title": "new post title 12",
                        "body": "PBlog post body",
                        "category": "63479cb8f227ee952fb9751e",
                        "status": "public",
                        "user": "630d8a50d47e86b6ff35e6bd",
                        "featured_image": "6347b4028c35b85fe375b091-video.mp4",
                        "createdAt": "2022-10-13T06:45:23.            365Z",
                        "updatedAt": "2022-10-13T06:45:23.365Z",
                        "__v": 0
                    }
                ] 
    ```


    @route   POST blog/api/v1/posts/search
    @desc    Search posts

    ```
    request.body:{ filter, category }

    response:

        "posts": [
                    { 
                        "_id": "6347b4038c35b85fe375b09d",
                        "post_id": "6347b4028c35b85fe375b091",
                        "title": "new post title 12",
                        "body": "PBlog post body",
                        "category": "63479cb8f227ee952fb9751e",
                        "status": "public",
                        "user": "630d8a50d47e86b6ff35e6bd",
                        "featured_image": "6347b4028c35b85fe375b091-video.mp4",
                        "createdAt": "2022-10-13T06:45:23.            365Z",
                        "updatedAt": "2022-10-13T06:45:23.365Z",
                        "__v": 0
                    }
                ] 
    ```


    @route   GET blog/api/v1/cats/get
    @desc    Get category

    ```
    response:
    "categories":[
                    {
                        "_id": "Category id",
                        "title": "Category title",
                        "createdAt": "date",
                        "__v": 0
                    }
                ]
    ```


    @route   GET blog/api/v1/cats/get/:id
    @desc    Get all categories

    ```
    response:
    "categories":{
                    "_id": "Category id",
                    "title": "Category title",
                    "createdAt": "date",
                    "__v": 0
                }
    ```


    @route   POST blog/api/v1/new/cat
    @desc    Process add new category
    

    ```
    request.body:{ title }
    response:
    {
        "status": "succes",
        "message": "Successfuly created  new category",
        "dataInfo": {
            "dataTitle": "Categoryt title", 
            }
    }
    ```


    @route   POST blog/api/v1/update/cat/:id
    @desc    Process update category

    ```
    request.body:{ title }
    response:
    {
        "message": "Successfuly updated  new category",
        "dataInfo": {
            "dataTitle": "Categoryt title"
            }
    }
    ```

    @route   DELETE blog/api/v1/delete/cat/:id
    @desc    Process delete category

    ```
    response:
    {
        "status": "succes",
        "message": "Successfuly created  new category",
        "dataInfo": {
            "dataTitle": "Categoryt title", 
            }
    }
    ```

    @route   GET blog/api/v1/video/get/:id
    @desc    Get post video

    ```
    response:
    
    "media": {
                "_id": "Media Id",
                "value": "video value",
                "media_id": "Post id",
                "media_type": "video",
                "createdAt": "2022-10-13T06:50:58.558Z",
                "__v": 0
             }

    ```

    @route   GET blog/api/v1/img/get/:id
    @desc    Get post image

    ```
    response:
    
    "media": {
                "_id": "Media Id",
                "value": "Image value",
                "media_id": "Post id",
                "media_type": "image",
                "createdAt": "2022-10-13T06:50:58.558Z",
                "__v": 0
             }
    ```

    @route   GET blog/api/v1/gallery/get/:id
    @desc    Get post gallery

    ```
    response:
    
    "media": 
            [
                {
                    "_id": "Media Id",
                    "value": "Image value",
                    "media_id": "Post id",
                    "media_type": "gallery",
                    "createdAt": "2022-10-13T06:50:58.558Z",
                    "__v": 0
                }
            ]
    ```

 ### Auth 

     @route   GET blog/api/v1/auth/google
     @desc    Auth with Google

    ```
    response: "https:accounts.google.com/o/oauth2/v2/"
    ```
    

    @route   GET blog/api/v1/auth/google/callback
    @desc    Google auth callback

    ```
    response:
    
    "media": 
            {   
                status: "success",
                message: "User logged in successfully session started @"Date:time" !",
            }
    ```

 @route   GET blog/api/v1/auth/user
 @desc    Google auth callback

    ```
    response:
    
    "media": 
            { 
                userName: userData.displayName, 
                fname: userData.firstName , 
                lname: userData.lastName , 
                image: userData.image , 
                date: userData.createdAt  
            }
    ```

   @route   blog/api/v1/auth/logout
   @desc    Logout user

    ```
    response:
    
    "media": 
            [
                {
                    "_id": "Media Id",
                    "value": "Image value",
                    "media_id": "Post id",
                    "media_type": "gallery",
                    "createdAt": "2022-10-13T06:50:58.558Z",
                    "__v": 0
                }
            ]
    ```

   @route   GET blog/api/v1/user
   @desc    Get user data

    ```
    response:
            
            { 
                userName: userData.displayName, 
                fname: userData.firstName , 
                lname: userData.lastName , 
                image: userData.image , 
                date: userData.createdAt 
             }
    ```
 
 ### Blog posts Comments
 

     @route   Comments blog/api/v1/post
     @desc    Process new comment

    ```
    response:
    {
        "status": "succes",
        "message": "comment {COMMET TITLE} successfuly added", 
    }
    ```

     @route   GET blog/api/v1/comments/get
     @desc    Show all coments

    ```
    response:
        "comments": [
                        { 
                            "_id": "634b9920ed34727d746edad0",
                            "user": "6336983cdba2c49274874032",
                            "post_id": "6347b5528c35b85fe375b0af",
                            "comment": "Comment",
                            "createdAt": "2022-10-16T05:39:44.287Z",
                            "__v": 0
                        }
                    ]
    ```

     @route   GET blog/api/v1/comments/get/comment/:id
     @desc    Show comments filter post ID

    ```
    response:
        "comments": [
                        { 
                            "_id": "634b9920ed34727d746edad0",
                            "user": "6336983cdba2c49274874032",
                            "post_id": "6347b5528c35b85fe375b0af",
                            "comment": "Comment",
                            "createdAt": "2022-10-16T05:39:44.287Z",
                            "__v": 0
                        }
                    ]
    
    ```

     @route   GET blog/api/v1/comments/get/user/:id
     @desc    Show comments filter User ID

    ```
    response:
        "comments": [
                        { 
                            "_id": "634b9920ed34727d746edad0",
                            "user": "6336983cdba2c49274874032",
                            "post_id": "6347b5528c35b85fe375b0af",
                            "comment": "Comment",
                            "createdAt": "2022-10-16T05:39:44.287Z",
                            "__v": 0
                        }
                    ]
    
    ```
  
     @route   Post blog/api/v1/comments/update/:id
     @desc    Edit comment

    ```
    request.body:{ post_id, comment } 
    
    response:
    {
        "status": "succes",
        "message": "Post {Blog comment title} successfuly updated,
        "dataInfo": {
                        "dataTitle": "Blog post title",
                        "userId": "user id", 
                    } 
    }
    ```

    @route   POST blog/api/v1/comments/delete/:id
    @desc    Process delete category

    ```
    response:
    {
        "status": "succes",
        "message": "Successfuly deleted post comment",
    }
    ```

 
 ### Blog posts Media

    @route   GET blog/api/v1/media/video/get/:id
    @desc    Get post video

    ```
    response:
    
    "media": {
                "_id": "Media Id",
                "value": "video value",
                "media_id": "Post id",
                "media_type": "video",
                "createdAt": "2022-10-13T06:50:58.558Z",
                "__v": 0
             }

    ```


    @route   GET blog/api/v1/media/gallery/get/:id
    @desc    Get post gallery

    ```
    response:
    
    "media":[
                {
                    "_id": "Media Id",
                    "value": "video value",
                    "media_id": "Post id",
                    "media_type": "video",
                    "createdAt": "2022-10-13T06:50:58.558Z",
                    "__v": 0
                }
            ] 

    ```


    @route   GET blog/api/v1/media/img/get/:id
    @desc    Get post image

    ```
    response:
    
    "media":[
                {
                    "_id": "Media Id",
                    "value": "video value",
                    "media_id": "Post id",
                    "media_type": "video",
                    "createdAt": "2022-10-13T06:50:58.558Z",
                    "__v": 0
                }
            ] 

    ```

 
 ### File assets
 
    @route   GET blog/api/v1/media/img/example-image-file.jpeg
    @desc    Get post image 

    ```
    result:  example-image-file.jpeg 

    ```
 
    @route   GET blog/api/v1/media/img/example-video-file.mp4
    @desc    Get post image 

    ```
    result:  example-video-file.mp4 

    ```
