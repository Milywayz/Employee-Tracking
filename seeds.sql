INSERT INTO departments (department_name)
VALUES
('Marketing'),
('Operations'),
('Finance'),
('Sales'),
("HR"),
("Merchandising");

INSERT INTO roles (title, salary, department_id)
VALUES
('Chief marketing Officer', 65000.00, 1),
('Operations Executive', 85000.00, 2),
('Accounts Payable Head', 60000.00, 3),
('Sales Executive Manager', 100000.00, 4),
('Chief Human Capital Officer', 90000.00, 5),
('Merchandising Manager', 75000.00, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Glee', 'Anselm', 1, 1),
('Thea', ' Johansen', 2, 2),
('Clara', 'Hunt', 3, 3),
('Summer', 'Evans', 4, 4),
('Ronald', 'Rice', 5, 5),
('Nadislava', 'Pavlovskiy', 6, 6);