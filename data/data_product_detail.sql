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
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_detail` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) CHARACTER SET ucs2 COLLATE ucs2_unicode_ci DEFAULT NULL,
  `prod_cate_id` int(6) DEFAULT NULL,
  `prod_type_id` int(6) DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `prod_price` int(11) DEFAULT NULL,
  `product_price` varchar(5) CHARACTER SET latin1 DEFAULT NULL,
  `prod_desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `desc_id` int(11) DEFAULT NULL,
  `seo_url` varchar(45) CHARACTER SET latin1 NOT NULL,
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
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (1,'lipstick',1,1,'1',NULL,'/innis/1.png,/innis/3.jpg,/innis/4.jpg',200000,'0',NULL,NULL,'lipstick',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'son môi',NULL,NULL,NULL,NULL,'/innis/1.png,/innis/3.jpg,/innis/4.jpg,/innis/5.jpg',100000,NULL,'Son môi mềm mượt như nhung Real Fit Velvet Lipstick 2017 S/S.<br>Chọn sắc hồng từ đóa hoa anh đào nở rộ.<br>Real Fit Velvet Lipstick 2017 S/S .<br>Với 10 màu sắc thời trang cho 2017 S/S. ',NULL,'son_moi',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'son treatment',NULL,NULL,NULL,NULL,'/innis/10.jpg',320000,NULL,NULL,NULL,'treatment_lip',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-16 14:51:48
