# MERN Ecommerce Demo
![Demo Copify](doc/mern.gif)
## Details
This is a demo ecommerce store built with the full MERN stack. Includes two main roles:
* Roles:
  * Member role (browse/search for products, add comments and reviews, etc.)
  * Merchant role (inlcudes member actions, as well as uploading products)
* Features/tech:
  * MongoDB document database and Mongoose object modeling
  * Express middleware to handle request, routes, authentication (JSON Web Tokens (JWT))
  * Cloudinary image management
  * React frontend to display components
* User Actions:
  * Search/browse for products
  * Add reviews/comments to products
  * Add products to shopping cart with quantity
  * Upload products with product title, description, photo, category, quantity, price, etc.
  * View your uploaded products.

## Setup
 Create config.env file in server/config and include:
```
  * NODE_ENV
  * PORT
  * MONGO_URI
  * CLOUDINARY API KEY & API SECRET
  * JWT REFRESH AND ACCESS TOKEN SECRETS
```

## Run
Run in both /client and /server
```
$ npm start
```
