-- root connection
mysql -u root


-- create database
CREATE DATABASE plc_prototype;


-- create table
CREATE TABLE plc_prototype.member (
    idx           INT auto_increment NOT NULL COMMENT 'index',
    user_email    VARCHAR(100) NOT NULL COMMENT 'email',
    user_password VARCHAR(100) NOT NULL COMMENT 'password',
    PRIMARY KEY (idx, user_email)
)
ENGINE=InnoDB COMMENT='user information';


-- insert dummy data
INSERT INTO plc_prototype.member (user_email, user_password) VALUES('user@user', 'user');
COMMIT;
