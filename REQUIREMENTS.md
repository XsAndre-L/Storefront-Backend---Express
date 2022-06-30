# REQUIREMENTS

## User Endpoint
### Create New User
Endpoint: `/user/signup`  
Requests: 
- `[ Post ]`  
Input: `{  
    "email": "",
    "firstName": "",
    "lastName": "",
    "password": ""
}`  
Returns: `JWT`

### Authenticate Existing User
Endpoint: `/user/login`    
Requests: 
- `[ Post ]`  
Input: `{  
    "email": "",   
    "password": ""  
}`  
Returns: `JWT`

### User Data Shapes
Table Name : `users_table`  
Columns : `id | firstName | lastName | password`  

---

## Product Endpoint
#### All Products
Endpoint: `/product`       
Requests: 
- `[Get]`  
Returns: `Product[]`  

#### Products By Category
Endpoint: `/product/?category="A CATEGORY"`    
Requests: 
- `[Get]`  
Returns: `Product[]`  

#### Product Details
Endpoint: `/product/:id`   
Requests: 
- `[Get]`   
Returns: `Product`

- `[Post]`  
Body: `{
    "name" : "",
    "price" : "",
    "category" : ""
}`

### Product Data Shapes
Table Name : products_table  
Columns : id | name | price | category


---
### Order Endpoint
#### User Orders
Endpoint: /order         
Requests:
- `[Get]`   
Returns: Order[]  

- `[Post]`  
Input: {}

#### /order/:id     [Get]    // Check if order belongs too user
Returns: Order  


---
### Cart Endpoint
Endpoint: `/cart`  
Requests: 
- `[Get]`  Auth     
Returns: `Products[]`

- `[Post]` Auth     
Input: {
    product_id,
    product_amount
}  

- `[Delete]`  Auth  
Return: 

- `[Put]`   Auth  
Return:
