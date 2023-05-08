-- Department Names
INSERT INTO departments (department_name)
VALUES
('Marketing'),
('Operations'),
('Finance'),
('Sales'),
("HR"),
("Merchandising");

-- Roles Title, salary, and department Id
INSERT INTO roles (title, salary, department_id)
VALUES
('Chief marketing Officer', 65000.00, 1),
('Marketing Consultant', 55000.00, 1),
('Operations Executive', 85000.00, 2),
('Operations', 57000.00, 2),
('Accounts Payable Head', 80000.00, 3),
('Accountant', 49000.00, 3),
('Sales Executive Manager', 100000.00, 4),
('SalesMan', 75000.00, 4),
('Chief Human Capital Officer', 90000.00, 5),
('Human Resource Development', 68000.00, 5),
('Merchandising Manager', 75000.00, 6),
('Merchandising', 50000.00, 6);

-- Employee First Name, Last Name, Role Id, and Manager Id
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Joshua', 'Thomas', 1, NULL),
('Freja', 'Hansen' ,2, 1),
('Angel', 'Pena', 3, NULL),
('Birgit', 'Mathieu', 4, 2),
('Ronja', 'Rautio', 5, NULL),
('Lau', 'Alon', 6, 3),
('Nastasia', 'Kadri', 7, NULL),
('Adelma', 'Hanzou', 8, 4),
('Othello', 'Yvon', 9, NULL),
('Adriel', 'Ilie', 10, 5),
('Max', 'Rowland', 11, NULL),
('Fife', 'Teodor', 12, 6);

