# final-capstone-project

Purchase Request System (PRS)

This is a full-stack Angular + Spring Boot web application for managing purchase requests within a company workflow. Designed as a final capstone project, it demonstrates robust CRUD functionality, user role enforcement, and real-time request review logic. The backend uses Java, Spring Boot, and MySQL, while the frontend is built with Angular.

Features:
=========
User Roles:
- Admin: Can manage users, vendors, products, and requests
- Reviewer: Can review and approve/reject purchase requests from others
- Regular User: Can submit and track their own requests

Core Functionality
==================

User Authentication
- Login system with persistent session (via localStorage)
- Role-based dynamic UI (e.g., "Review" tab only appears for reviewers)
Request Management
- Users can create, edit, and submit purchase requests
- Requests auto-calculate totals based on line items
- Requests route to "REVIEW" or "APPROVED" based on total
Line Items
- Users can add/edit/delete line items to a request
- Each line item links to a product and quantity
- Total auto-updates when line items change
Review Workflow
- Reviewers see requests not submitted by them
- Can approve or reject requests
- Rejections require a reason (text box enforced)
Entities Managed
- Users
- Vendors
- Products (with price, unit, vendor)
- Requests
- Line Items

Tech Stack
==========

Frontend
- Angular 16+
- Bootstrap for styling
- TypeScript, RxJS, FormsModule

Backend

- Java 17+
- Spring Boot (RESTful APIs)
- MySQL database
- JPA / Hibernate (with custom queries for performance)
