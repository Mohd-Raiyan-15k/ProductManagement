
# Product Management System — Final Project

Full-stack project using **Django + Django REST Framework** for the backend and **React + Axios + Vite** for the frontend.

## Product fields

The API uses exactly these requested concepts:

- id
- title
- description
- category
- price
- discountPercentage
- rating
- stock
- tags
- brand

# — Architecture

```text
React
  ↓
Axios
  ↓
Django REST API
  ↓
ViewSet
  ↓
Serializer
  ↓
Product Model
  ↓
SQLite
```

# — Backend concepts

**Model:** database structure.

**Serializer:** converts model data to JSON and validates incoming API data.

**ViewSet:** provides CRUD API operations.

**Router:** creates API URLs automatically.

**SearchFilter / django-filter:** search and filtering.

**CORS:** permits React and Django to communicate during development.

# — Interview explanation

> I developed a Product Management System using React for the frontend and Django REST Framework for the backend. The application supports product CRUD operations, search and filtering. Product data includes title, description, category, price, discount percentage, rating, stock, tags and brand. React communicates with the Django REST API using Axios and the data is stored in SQLite.

# — Important interview questions

### Why Django REST Framework?

DRF provides serializers, API views/viewsets, validation, routing and tools for building REST APIs.

### Why React?

React provides reusable components and an interactive frontend.

### Why Axios?

Axios sends HTTP requests between React and the Django API.

### What is CRUD?

```text
Create
Read
Update
Delete
```

### What is a serializer?

A serializer converts Django model instances to JSON and validates incoming API data.

### What is a ViewSet?

A ViewSet groups operations such as list, create, retrieve, update and delete.

### What is CORS?

CORS allows a frontend and backend running on different origins to communicate when permitted by the backend.

# — Complete run commands

Terminal 1:

```bash
cd ProductManagement/backend
env\Scripts\activate
python manage.py migrate
python manage.py runserver
```

Terminal 2:

```bash
cd ProductManagement/frontend
npm install
npm run dev
```

# — Common errors

### Django is not found

```bash
env\Scripts\activate
pip install -r requirements.txt
```

### No such table

```bash
python manage.py migrate
```

### React cannot load products

Make sure Django is running and open:

```text
http://127.0.0.1:8000/api/products/
```

### CORS error

Make sure React is running on:

```text
http://localhost:5173
```

or:

```text
http://127.0.0.1:5173
```

# Final API list

```text
GET     /api/products/
POST    /api/products/
GET     /api/products/<id>/
PUT     /api/products/<id>/
PATCH   /api/products/<id>/
DELETE  /api/products/<id>/

GET     /api/products/?search=value
GET     /api/products/?category=beauty
GET     /api/products/?brand=Essence
```
=======
# ProductManagement
>>>>>>> 5048e24786d77f3017f4d8fb0bca18a828189792
