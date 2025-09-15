# myShoppingSite
An e-commerce website where users can browse products, manage their cart, add/update/remove addresses, and place orders. Built with a React frontend, Express/Node backend, MongoDB database.

## Demo Link
Watch a walkthrough (5 minutes) of all major features of this app:
[Video Link](https://drive.google.com/drive/folders/1bXfdFuiQuG2VnTvE9CPctbqODyjZtsDb?usp=drive_link)

## Quick Start

```
git clone https://github.com/ravipatelctf/frontend-mp1.git
cd frontend-mp1
npm install
npm run dev
```

## Technologies
- React JS
- React Router
- chart.js
- Node.js
- Express
- MongoDB

## Features

**Home**
- Displays a category of products to browse from.

**Product Listing**
- Displays all products along with the `Add to cart` & `Add to wishlist` buttons

**Product Details**
- Displays all the necessary details of the product
- `Add to cart` & `Add to wishlist` buttons are also visible below the product image

**Cart**
- Displays all the products added to cart along with a checkout feature to place orders

**wishlist**
- Displays all the products added to wishlist along with `Add to cart` & `Remove from wishlist` buttons

**User**
- Displays all the details of the user along with an address management feature that lets user add, update or delete addresses
- Order history feature lets user view all the previous

## 📖 API Reference

### 🌐 product routes

#### GET /api/products
**Description:** Get all products<br>
**Sample Response Body:**
```json
[
    {
        "_id": "68a72eafef5a1d880f6f6948",
        "name": "Peter England Men's Snug ...",
        "price": 499, ...
    }, ...
]
```

#### **GET	/api/products/:id**<br>	 
**Description:** Get a product by id<br> 
**Sample Response:**
```json
{
    "_id": "68a72eafef5a1d880f6f6948",
    "name": "Peter England Men's Snug ...",
    "price": 499, ...
}
```

#### **POST	/api/products/:id**<br>	 	
**Description:** Update product details by id<br>		
**Sample Request Body:**
```json
{
    "isAddedToCart": true
}
```
**Sample Response Body:**
```json
{
    "message": "data updated successfully.",
    "updatedData": {
        "_id": "68a72eafef5a1d880f6f6948",
        "name": "Peter England Men's Snug ...",
        "price": 499, ...
    }
}
```

### 🌐 user routes

#### GET /api/users
**Description:** Get one user<br>
**Sample Response Body:**
```json
{
    "_id": "68a6ef4e4819e03462b21c3d",
    "name": "Test User 1",
    "emailId": "user1@test.example",
    "phoneNumber": 1234567890,
    "addresses": [
        {
            "address": "Test Address 1",
            "_id": "68aa03fd4e267d523b523009"
        }, ...
    ],
    "orders": [
        {
            "_id": "68abf643449594711f6381a1",
            "products": [
                {
                    "product": {
                        "_id": "68a72eafef5a1d880f6f6948",
                        "name": "Peter England Men's Snug ...",
                        "price": 499, ...
                    },
                    "quantity": 2,
                    "size": "XL",
                    "_id": "68abf643449594711f6381a2"
                }
            ], ...
        }
    ],
    "createdAt": "2025-08-21T10:05:02.366Z",
    "updatedAt": "2025-08-25T08:55:27.990Z",
    "__v": 172
}
```

### 🌐 address routes

#### **POST	/api/user/addresses**<br>	 
**Description:** Add new address<br> 
**Sample Request Body:**
```json
{
    "address": "Test Address gamma"
}
```
**Sample Response:**
```json
{
    "message": "Address added successfully.",
    "user": {
        "_id": "68a6ef4e4819e03462b21c3d",
        "name": "Test User 1",
        "emailId": "user1@test.example",
        "phoneNumber": 1234567890,
        "addresses": [
            {
                "address": "Test Address 1",
                "_id": "68aa03fd4e267d523b523009"
            }, ...
        ], ...
    }
}
```

#### **POST /api/user/addresses/:addressId**<br> 	
**Description:** update address by address id<br>	
**Sample Request Body:**
```json
{
  "address": "Test address hulk"
}
```

**Sample Response:**
```json
{
    "message": "Address updated successfully.",
    "user": {
        "_id": "68a6ef4e4819e03462b21c3d",
        "name": "Test User 1",
        "emailId": "user1@test.example",
        "phoneNumber": 1234567890,
        "addresses": [
            {
                "address": "Test address hulk",
                "_id": "68aa03fd4e267d523b523009"
            }, ...
        ], ...
    }
}
```

#### **DELETE /api/user/addresses/:addressId**<br> 	
**Description:** delete address by address id<br>	
**Sample Response:**
```json
{
    "message": "Address deleted successfully.",
    "user": {
        "_id": "68a6ef4e4819e03462b21c3d",
        "name": "Test User 1",
        "emailId": "user1@test.example",
        "phoneNumber": 1234567890,
        "addresses": [
            {
                "address": "Test Address gamma",
                "_id": "68c7c7665322305f3a74f8bd"
            }, ...
        ], ...
    }
}
```

### 🌐 order routes

#### POST /api/orders
**Description:** Add new order<br>
**Sample Request Body:**
```json
{
  "products": [
    {
      "product": "68a6e860bdaa50bd0762d534", 
      "quantity": 2,
      "size": "M"
    }
  ],
  "totalPrice": 1500,
  "discount": 200,
  "deliveryCharge": 50,
  "address": "123 Test Street, Test City, 12345"
}

```
**Sample Response Body:**
```json
{
    "products": [
        {
            "product": "68a6e860bdaa50bd0762d534",
            "quantity": 2,
            "size": "M",
            "_id": "68c7c9325322305f3a74f8cd"
        }
    ],
    "totalPrice": 1500,
    "discount": 200, ...
}
```

## Contact
For bugs or feature requests, please reach out to ravipatelctf@gmail.com