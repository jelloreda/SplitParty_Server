CLIENTES ROUTES

| URL                  | Description                     | Protected |
|----------------------|---------------------------------|-----------|
| /                    | Index page                      |           |
| /login               | Login page                      |           |
| /signup              | Signup page                     |           |
| /profile             | Logged in user Profile          | x         |
| /profile/edit        | Edit logged in user profile     | x         |
| /users               | Get all users list              |           |
| /users/:id           | User detail with matching id    | x         |
| /events              | Events List Page                |           |
| /events/create       | New event form page             | x         |
| /events/:id          | Event details page              | x         |
| /events/:id/edit     | Edit event form page            | x         |
| /products            | Get all products list           |           |
| /products/create     | Create new product              | x         |
| /products/:id        | Product detail with matching id |           |
| /products/:id/edit   | Edit product with matching id   | x         |