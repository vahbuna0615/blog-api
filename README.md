# Blog API Documentation

## Overview
The Blog API allows users to create, update, delete, and retrieve blog posts. It also supports filtering blog posts by category or tags.

## Project URLs
[Project URL](https://blog-api-c9wg.onrender.com)  
[Swagger URL](https://blog-api-c9wg.onrender.com/api-docs)  


## Endpoints

### 1. Create a New Blog Post
**POST** `/api/blogs`

#### Request Body
```json
{
  "title": "string",
  "content": "string",
  "author": "string",
  "category": "string",
  "tags": ["string"]
}
```

#### Response
- **201 Created**: Blog post successfully created.
- **400 Bad Request**: Invalid input.
- **500 Internal Server Error**: Other errors.

---

### 2. Update an Existing Blog Post
**PUT** `/api/blogs/{id}`

#### Path Parameters
- `id` (string): The ID of the blog post to update.

#### Request Body
```json
{
  "title": "string",
  "content": "string",
  "category": "string",
  "tags": ["string"]
}
```

#### Response
- **200 OK**: Blog post successfully updated.
- **401 Unauthorized**: Unauthorized access.
- **404 Not Found**: Blog post with given id not found.
- **500 Internal Server Error**: Other errors.

---

### 3. Delete an Existing Blog Post
**DELETE** `/api/blogs/{id}`

#### Path Parameters
- `id` (string): The ID of the blog post to delete.

#### Response
- **204 OK**: Blog post successfully deleted.
- **401 Unauthorized**: Unauthorized access.
- **404 Not Found**: Blog post not found.
- **500 Internal Server Error**: Other errors.

---

### 4. Get a Single Blog Post
**GET** `/api/blogs/{id}`

#### Path Parameters
- `id` (string): The ID of the blog post to retrieve.

#### Response
- **200 OK**: Returns the blog post.
- **404 Not Found**: Blog post not found.
- **500 Internal Server Error**: Other errors.

---

### 5. Get All Blog Posts
**GET** `/posts`

#### Query Parameters
- `category` (string, optional): Filter by category.
- `tags` (string value of tags separated by commas, optional): Filter by tags.

#### Response
- **200 OK**: Returns a list of blog posts.
- **500 Internal Server Error**: Other errors.

---

## Error Responses
All error responses will follow this format:
```json
{
  "message": "Something went wrong",
  "error": "error.message"
}
```

## Authentication
Create, Update and Delete endpoints require an API key to be passed in the `Authorization` header:
```
Authorization: Bearer <API_KEY>
```
