-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 03:36 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_printer`
--

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id` int(250) NOT NULL,
  `nama` varchar(250) DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `no_hp` char(250) DEFAULT NULL,
  `alamat` varchar(250) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `nama`, `email`, `password`, `no_hp`, `alamat`, `role`, `create_at`, `update_at`) VALUES
(1, 'John', 'jonathan@gmail.com', '$2b$10$MzAusobDjmWtl1gBlC5TbuD8imNKDfDzty6RFLMNVUL5UsSOuUmgC', '081385169581', 'cimone mas permai, jalan belitung no.12 kecamatan karawaci kota tangerang', 'admin', '2023-03-28 01:28:31', '2023-03-28 01:28:31');

-- --------------------------------------------------------

--
-- Table structure for table `printer`
--

CREATE TABLE `printer` (
  `id_produk` int(250) NOT NULL,
  `nama_produk` varchar(250) DEFAULT NULL,
  `harga_produk` varchar(250) DEFAULT NULL,
  `stok` varchar(250) DEFAULT NULL,
  `deskripsi` varchar(250) DEFAULT NULL,
  `gambar` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `printer`
--

INSERT INTO `printer` (`id_produk`, `nama_produk`, `harga_produk`, `stok`, `deskripsi`, `gambar`) VALUES
(1, 'Tinta EPSON 001 C13T03Y100 Black L4150 4160 6160 6170 6190 ORIGINAL', '95000', '10', 'tinta hitam habis', '2fda19ff20a2c464bce034d3c3d707de.png'),
(2, 'Printer HP', '1500000', '20', 'bertahan 5 tahun', 'b8760b224614885e30ce154f9ab45da5.png'),
(3, 'Printer Epson', '2500000', '10', 'bertahan 3tahun', 'b8760b224614885e30ce154f9ab45da5.png');

-- --------------------------------------------------------

--
-- Table structure for table `tes`
--

CREATE TABLE `tes` (
  `id` int(250) NOT NULL,
  `nama` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tes`
--

INSERT INTO `tes` (`id`, `nama`) VALUES
(1, 'max');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `printer`
--
ALTER TABLE `printer`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `tes`
--
ALTER TABLE `tes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `printer`
--
ALTER TABLE `printer`
  MODIFY `id_produk` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tes`
--
ALTER TABLE `tes`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
