
CREATE TABLE group (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    group_type VARCHAR(50)
);


CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('superadmin', 'admin', 'teacher', 'student')) DEFAULT 'student',
    is_active BOOLEAN DEFAULT TRUE
);


CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    group_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (group_id) REFERENCES "group"(id)
);


CREATE TABLE course (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price INT NOT NULL,
    date_period VARCHAR(50),
    daily_duration VARCHAR(50)
);

CREATE TABLE staff_course (
    id SERIAL PRIMARY KEY,
    staff_id INT,
    course_id INT,
    FOREIGN KEY (staff_id) REFERENCES staff(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE lessons_of_courses (
    id SERIAL PRIMARY KEY,
    lesson VARCHAR(255) NOT NULL,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES course(id)
);


CREATE TABLE homework (
    id SERIAL PRIMARY KEY,
    student_id INT,
    lesson_of_courses_id INT,
    ball INT,
    deadline DATE,
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (lesson_of_courses_id) REFERENCES lessons_of_courses(id)
);

CREATE TABLE enrollment (
    id SERIAL PRIMARY KEY,
    student_id INT,
    course_id INT,
    status VARCHAR(20) CHECK (status IN ('pending', 'active', 'completed')),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (student_id) REFERENCES student(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

CREATE TABLE payment (
    id SERIAL PRIMARY KEY,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')),
    total_amount INT NOT NULL,
    enrollment_id INT,
    FOREIGN KEY (enrollment_id) REFERENCES enrollment(id)
);