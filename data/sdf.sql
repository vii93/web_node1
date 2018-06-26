-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: data
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basket_detail`
--

DROP TABLE IF EXISTS `basket_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basket_detail` (
  `basket_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `ctk_id` varchar(10) DEFAULT NULL,
  `qty` int(4) DEFAULT NULL,
  PRIMARY KEY (`basket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `main_category`
--

DROP TABLE IF EXISTS `main_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_category` (
  `main_cate_id` int(11) NOT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `main_cate_name` varchar(45) DEFAULT NULL,
  `heading` varchar(45) DEFAULT NULL,
  `desciption` varchar(255) DEFAULT NULL,
  `seo_url` varchar(45) DEFAULT NULL,
  `seo_desc` varchar(45) DEFAULT NULL,
  `imt_url` varchar(45) DEFAULT NULL,
  `img_alt` varchar(45) DEFAULT NULL,
  `sort` int(4) DEFAULT NULL,
  PRIMARY KEY (`main_cate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `product_cate_id` int(11) NOT NULL,
  `product_cate_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `main_cate_id` int(4) DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  `seo_url` varchar(45) DEFAULT NULL,
  `seo_desc` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `img_url` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `img_alt` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`product_cate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_detail` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci DEFAULT NULL,
  `prod_cate_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prod_type_url` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `product_price` int(11) DEFAULT NULL,
  `prod_desc` mediumtext COLLATE utf8_unicode_ci,
  `long_desc` longtext COLLATE utf8_unicode_ci,
  `seo_url` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `main_cat_id` int(6) DEFAULT NULL,
  `inprice` int(11) DEFAULT NULL,
  `product_sale_price` int(11) DEFAULT NULL,
  `product_weight` int(4) DEFAULT NULL,
  `stock_count` int(4) DEFAULT NULL,
  `product_ordered` int(4) DEFAULT NULL,
  `discount_code` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `discount_from` date DEFAULT NULL,
  `discount_to` date DEFAULT NULL,
  `img_alt` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `search_field` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_desc` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` int(4) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_type` (
  `product_type_id` int(11) NOT NULL,
  `product_cate_id` int(4) DEFAULT NULL,
  `product_type_name` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_url` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_title` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `seo_desc` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `img_url` varchar(45) DEFAULT NULL,
  `img_alt` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`product_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-26  0:33:33
