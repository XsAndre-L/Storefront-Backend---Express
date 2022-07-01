# REQUIREMENTS

## User Endpoint
Endpoint: `/user`  
✉️ Requests:
- `[Get]`   
    - Returns: `User[]`
- `[Put]`  
    - Input: `{
        "firstName" : "",
        "lastNamee" : ""
    }`
    - Returns: `User`  

### Create New User
Endpoint: `/user/signup`  
✉️ Requests: 
- `[Post]`  
    - Input: `{  
    "email": "",
    "firstName": "",
    "lastName": "",
    "password": ""
}`  
    - Returns: `JWT`

### Authenticate Existing User
Endpoint: `/user/login`    
✉️ Requests: 
- `[Post]`  
    - Input: `{  
    "email": "",   
    "password": ""  
}`  
    - Returns: `JWT`

### 📉 User Data Shapes
Table Name : `users_table`  
Columns : `id | email | firstName | lastName | password | role`  

---

## Product Endpoint
### All Products
Endpoint: `/product`       
✉️ Requests: 
- `[Get]`  
    - Returns: `Product[]`  
- `[Post]`  ✅Auth  
    - Body: `{  
    "name" : "",  
    "price" : "",  
    "category" : ""  
}`  

Endpoint: `/product/?category=fruit`    
✉️ Requests: 
- `[Get]`  
    - Returns: `Product[]`  

Endpoint: `/product/?sort=popularity`  
- `[Get]`  
    - Returns: `Product[]`

## Product Details Endpoint
Endpoint: `/product/:id`   
✉️ Requests: 
- `[Get]`   
    - Returns: `Product`
- `[Put]`  
    - Body: `{  
    "name" : "",  
    "price" : "",  
    "category" : ""  
}`  
    - Returns: `Product`  
- `[Delete]`  
    - Returns: `Product`   


### 📉 Product Data Shapes
Table Name : `products_table`  
Columns : `id | name | price | category | popularity`


---
## Order Endpoint
### User Orders
Endpoint: `/order`         
✉️ Requests:
- `[Get]`   ✅Auth  
    - Returns: `Order[]`  

- `[Post]`  ✅Auth  
    - Input: {none}

- `[Put]` ✅Auth
    - Input: {none}

### /order/:id     
- `[Get]`   ✅Auth  
    - Returns: `Order`  

### 📉 Order Data Shapes
Table Name : `orders_table`  
Columns : `id SERIAL PRIMARY KEY | user_id FOREIGN KEY | order_status VARCHAR(8)`

---
## Cart Endpoint
### User Cart
Endpoint: `/cart`  
✉️ Requests: 
- `[Get]`  ✅Auth       
    - Returns: `Products[]`

- `[Post]` ✅Auth       
    - Input: `{
    product_id,
    product_amount
}`  

- `[Put]`   ✅Auth    
    - Return: `Product`

- `[Delete]`  ✅Auth    
    - Return: `Product`


### 📉 OrderInfo Data Shape
Table Name : `order_info_table`  
Columns : `id | order_id | product_id | amount`
