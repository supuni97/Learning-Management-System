-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 22, 2022 at 11:18 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jwt_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `course_code` varchar(10) NOT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `degree_programme` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_code`, `course_name`, `degree_programme`) VALUES
('BIO11221', 'Zoology', 'Bio Science'),
('BIO11222', 'Animal Science', 'Bio Science'),
('BIO12221', 'Horticulture', 'Bio Science'),
('BIO12224', 'Botany', 'Bio Science'),
('HMNT11111', 'English', 'Humanities'),
('HMNT11112', 'Fine Arts', 'Humanities'),
('HMNT12111', 'Liguistics', 'Humanities'),
('HMNT12112', 'Sinhala', 'Humanities'),
('MATH11221', 'Pure Mathematics I', 'Mathematics'),
('MATH11223', 'Pure Mathematics II', 'Mathematics'),
('MATH11224', 'Applied Mathematics II', 'Mathematics'),
('MATH12223', 'Applied Mathematics I', 'Mathematics'),
('SENG 1122', 'Programming', 'ma'),
('SENG 1212', 'Statistics', 'se'),
('SENG11121', 'Software Modelling', 'Software Engineering'),
('SENG11123', 'Computer Architecture', 'Software Engineering'),
('SENG12123', 'Interactive Application Development', 'Software Engineering'),
('SENG12223', 'Web Application Development', 'Software Engineering');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_name` varchar(10) NOT NULL,
  `role_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_name`, `role_description`) VALUES
('Student', 'Student Role'),
('Teacher', 'Teacher role');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_name` varchar(100) NOT NULL,
  `degree_programme` varchar(255) DEFAULT NULL,
  `home_address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `user_first_name` varchar(255) DEFAULT NULL,
  `user_last_name` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_name`, `degree_programme`, `home_address`, `phone`, `role_name`, `user_first_name`, `user_last_name`, `user_password`) VALUES
('admin123', NULL, NULL, NULL, NULL, 'admin', 'admin', '$2a$10$xsBQL7MPMPwg8Xy0zA8z1OnGoNdboUrqqOS8SKFu.nCkPZOYW/1D2'),
('Bhagyasudaraka98@gmail.com', 'Software Engineering', 'kadugaammulla', '0745637345', 'Student', 'bagi', 'wijenayaka', '$2a$10$Gpm7HtKBhzYuWnmX681Fv.1XKd1/3GTpsX/nd0BaaA66kkZxIZCwe'),
('chiranthapoornajith@gmail.com', 'Software Engineering', 'kadugaammulla', '0743565765', 'Student', 'chirantha', 'poornagith', '$2a$10$7JXnwwD401nZNnk55ppb..xqymG/yZ6IyBwarr3wExJfiu4SBe.V.'),
('lahiruchathuranga19981214@gmail.com', 'software engineering', 'kadugaammulla', '0734652768', 'Student', 'lahiru', 'chaturanga', '$2a$10$EyFIHrqK0WuNH9AeJ.rSfuqTgirLm/sC2j5ApYjfR06ZPR0Xn6VrS'),
('vimukthini@gl.block-stars.com', 'Software Engineering', 'kadugaammulla', '0743652875', 'Teacher', 'vimu', 'narmada', '$2a$10$mUsebX11cFzCeR4iJTv.aum5PooYHfsADISm2lGneYC7.nDacwUZe');

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

DROP TABLE IF EXISTS `user_course`;
CREATE TABLE IF NOT EXISTS `user_course` (
  `course_id` varchar(10) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `marks` varchar(255) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`course_id`,`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_course`
--

INSERT INTO `user_course` (`course_id`, `user_email`, `course_name`, `marks`, `semester`) VALUES
('SENG11121', 'Bhagyasudaraka98@gmail.com', 'Software Modelling', '', 'semester 1'),
('SENG11121', 'chiranthapoornajith@gmail.com', 'Software Modelling', '', 'semester 1'),
('SENG11121', 'lahiruchathuranga19981214@gmail.com', 'Software Modelling', '', 'semester 1'),
('SENG11121', 'vimukthini@gl.block-stars.com', 'Software Modelling', '', 'semester 1'),
('SENG11123', 'Bhagyasudaraka98@gmail.com', 'Computer Architecture', '', 'semester 1'),
('SENG11123', 'chiranthapoornajith@gmail.com', 'Computer Architecture', '', 'semester 1'),
('SENG11123', 'lahiruchathuranga19981214@gmail.com', 'Computer Architecture', NULL, 'semester 1'),
('SENG11123', 'vimukthini@gl.block-stars.com', 'Computer Architecture', NULL, 'semester 1'),
('SENG12123', 'Bhagyasudaraka98@gmail.com', 'Interactive Application Development', '', 'semester 1'),
('SENG12123', 'chiranthapoornajith@gmail.com', 'Interactive Application Development', '', 'semester 1'),
('SENG12123', 'lahiruchathuranga19981214@gmail.com', 'Interactive Application Development', NULL, 'semester 1'),
('SENG12223', 'Bhagyasudaraka98@gmail.com', 'Web Application Development', '', 'semester 1'),
('SENG12223', 'chiranthapoornajith@gmail.com', 'Web Application Development', '', 'semester 1'),
('SENG12223', 'lahiruchathuranga19981214@gmail.com', 'Web Application Development', NULL, 'semester 1');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `user_id` varchar(100) NOT NULL,
  `role_id` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
('Bhagyasudaraka98@gmail.com', 'Student'),
('chiranthapoornajith@gmail.com', 'Student'),
('lahiruchathuranga19981214@gmail.com', 'Student'),
('admin123', 'Teacher'),
('vimukthini@gl.block-stars.com', 'Teacher');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_name`),
  ADD CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
