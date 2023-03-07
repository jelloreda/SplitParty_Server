API ENDPOINTS

Users Routes

Base URL /users

| HTTP Method | URI Path        | Description                   |
|-------------|-----------------|-------------------------------|
| GET         | /getAllUsers    | All users list                |
| GET         | /getOneUser/:id | User details with matching id |

Products Routes

Base URL /products

| HTTP Method | URI Path           | Description                      |
|-------------|--------------------|----------------------------------|
| GET         | /getAllProducts    | All Products List                |
| GET         | /getOneProduct/:id | Product details with matching id |
| POST        | /saveProduct       | Create new product               |
| PUT         | /editProduct/:id   | Edit product with matching id    |
| DELETE      | /deleteProduct/:id | Delete product with matching id  |

Event Routes

Base URL /events

| HTTP Method | URI Path         | Description                     |
|-------------|------------------|---------------------------------|
| GET         | /getAllEvents    | All Events List                 |
| GET         | /getOneEvent/:id | Event details with matching id  |
| POST        | /saveEvent       | Create new event                |
| PUT         | /editEvent/:id   | Edit product with matching id   |
| DELETE      | /deleteEvent/:id | Delete product with matching id |

Auth Routes

Base URL /auth

| HTTP Method | URI Path | Description       |
|-------------|----------|-------------------|
| GET         | /verify  | Verify auth token |
| POST        | /signup  | Sign up user      |
| POST        | /login   | Login user        |