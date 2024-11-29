-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2024 at 04:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Game`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(512) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `sex` enum('Female','Male','Non-binary','LGBTQ+','Prefer not to say') DEFAULT 'Prefer not to say',
  `full_name` varchar(255) DEFAULT NULL,
  `phone` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `email`, `date_of_birth`, `sex`, `full_name`, `phone`) VALUES
(2, 'dodo', '$2b$10$pcYZkfMpSc.wjEUuxwIEPOYsALQAPfPI2OLecTmHl7Ldx5aHQX6Iy', 'aimmy007@gmail.com', '2004-01-08', 'Female', 'Pichchanya Muchimapruth', 823466346),
(3, 'naioak', '$2b$10$withxyaIBWZEIZ9Bhy7gSOxJd5jFtQuNG9U3UqXQg5Q5OpZwHsMG6', 'naioak@gmail.com', '2004-01-08', 'Female', 'NAI OAK', 823466346),
(5, 'a', '$2b$10$f2puT0N87A3n9Ic6UnL5wOhGt5xi7FS5fnC835.UFIUD4HA.6/nJy', 'heyuapo@gmail.com', '2024-02-06', 'Female', 'dopaengman', 12345678),
(6, 'shin', '$2b$10$4tyjUCwFClEu7/ehVOVy0eg2IG/1IKocUStyJxE2nFAXSI.OjpE4m', 'shinshin@gmail.com', '2024-11-07', 'LGBTQ+', 'Shinchang', 98765432);

-- --------------------------------------------------------

--
-- Table structure for table `loginviaGoogle`
--

CREATE TABLE `loginviaGoogle` (
  `id` int(11) NOT NULL,
  `google_id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loginviaGoogle`
--

INSERT INTO `loginviaGoogle` (`id`, `google_id`, `username`, `password`, `email`) VALUES
(1, '108943185569373584854', '486_Pichchanya', NULL, 'heyuapo@gmail.com'),
(2, '109632285514683992046', 'Pichchaya Muchimapruth', NULL, 'aimmy007@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loginviaGoogle`
--
ALTER TABLE `loginviaGoogle`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `loginviaGoogle`
--
ALTER TABLE `loginviaGoogle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
