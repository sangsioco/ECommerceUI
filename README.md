#E-Commerce Application
Author: Sara Angsioco
Date: July 17, 2024

This React project demonstrates functional e-commerce platform with features including customer management, product management and order management.

Features Included:
- Customer Management: Create, view, update, and delete customers.
- Product Management: Add new products, view product details, and update or delete products.
- Order Management: Place new orders and track the status of existing orders.
- Responsive Design: Fully responsive interface using Bootstrap.
- Error Handling: Comprehensive error handling for API interactions and form submissions.
- Footer: A fixed footer at the bottom of the page for consistent navigation and information.

Design:
|src
  |components
    |Customer
      |CustomerForm.jsx
      |CustomerList.jsx
      |UpdateCustomer.jsx
    |Order
      |OrderTracking.jsx
      |OrderDetail.jsx
      |OrderForm.jsx
    |Product
      |ProductForm.jsx
      |UpdateForm.jsx
      |ProductList.jsx
    |Shared
      |Footer.jsx
      |NoteFound.jsx
  |Main.jsx
  |App.jsx
  |App.css

Installation:
1. Clone or Download the following repositorues:
   - https://github.com/sangsioco/Module-11-MiniProject (required)
   - https://githun.com/sangsioco/Module-6-MiniProject (optional)*
2. Install dependancies
   - cd ecommerce-ui
   - npm install 
   - npm install axios
   - npm install react-bootstrap bootstrap
   - npm install react-router-dom
   - npm install prop-types
3. Run the flask application (Module 6 MiniProject or your own) with flask run
4. Start the development sever (Module 11 MiniProject) with npm run dev
5. Open the localhost:5173 in your browser
