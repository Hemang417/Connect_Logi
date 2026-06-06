-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: crm_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminchangeapproval`
--

DROP TABLE IF EXISTS `adminchangeapproval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminchangeapproval` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `newpassword` varchar(60) NOT NULL,
  `status` enum('complete','Approved','Rejected') DEFAULT 'complete',
  `remark` varchar(50) DEFAULT NULL,
  `orgcode` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='if password is change before updating it should go for admin approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminchangeapproval`
--

LOCK TABLES `adminchangeapproval` WRITE;
/*!40000 ALTER TABLE `adminchangeapproval` DISABLE KEYS */;
INSERT INTO `adminchangeapproval` VALUES (4,'hemang@executive','executive','12345','Approved','bhul gya password','seawave2323','2024-09-20 12:19:35');
/*!40000 ALTER TABLE `adminchangeapproval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allexportdeletedjob`
--

DROP TABLE IF EXISTS `allexportdeletedjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allexportdeletedjob` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(50) NOT NULL,
  `jobdate` datetime NOT NULL,
  `docreceivedon` datetime NOT NULL,
  `transportmode` varchar(45) NOT NULL,
  `customhouse` varchar(45) NOT NULL,
  `ownbooking` varchar(45) NOT NULL,
  `deliverymode` varchar(45) NOT NULL,
  `noofcontainer` int NOT NULL,
  `owntransportation` varchar(45) NOT NULL,
  `betype` varchar(45) NOT NULL,
  `consignmenttype` varchar(45) NOT NULL,
  `cfsname` varchar(45) NOT NULL,
  `shippinglinename` varchar(45) NOT NULL,
  `count` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) NOT NULL,
  `exportername` varchar(150) NOT NULL DEFAULT 'null',
  `address` varchar(200) DEFAULT 'null',
  `GST` varchar(45) DEFAULT 'null',
  `IEC` varchar(45) DEFAULT 'null',
  `finaldestination` varchar(45) DEFAULT 'null',
  `portofshipment` varchar(45) DEFAULT 'null',
  `approval` json DEFAULT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) DEFAULT 'null',
  `bltype` varchar(45) NOT NULL,
  `bltypenum` varchar(45) NOT NULL DEFAULT 'null',
  `jobowner` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `freedays` varchar(45) NOT NULL,
  `blstatus` varchar(45) NOT NULL,
  `benumber` varchar(45) NOT NULL,
  `shippinglinebond` varchar(45) NOT NULL,
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table store delted export job ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allexportdeletedjob`
--

LOCK TABLES `allexportdeletedjob` WRITE;
/*!40000 ALTER TABLE `allexportdeletedjob` DISABLE KEYS */;
/*!40000 ALTER TABLE `allexportdeletedjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allimportdeletedjob`
--

DROP TABLE IF EXISTS `allimportdeletedjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allimportdeletedjob` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(50) NOT NULL,
  `jobdate` datetime NOT NULL,
  `docreceivedon` datetime NOT NULL,
  `transportmode` varchar(45) NOT NULL,
  `customhouse` varchar(45) NOT NULL,
  `ownbooking` varchar(45) NOT NULL,
  `deliverymode` varchar(45) NOT NULL,
  `noofcontainer` int NOT NULL,
  `owntransportation` varchar(45) NOT NULL,
  `betype` varchar(45) NOT NULL,
  `consignmenttype` varchar(45) NOT NULL,
  `cfsname` varchar(45) NOT NULL,
  `shippinglinename` varchar(45) NOT NULL,
  `bltype` varchar(45) NOT NULL,
  `bltypenum` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `jobowner` varchar(45) NOT NULL,
  `freedays` varchar(45) NOT NULL,
  `blstatus` varchar(45) NOT NULL,
  `benumber` varchar(45) NOT NULL,
  `shippinglinebond` varchar(45) NOT NULL,
  `count` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) NOT NULL,
  `importername` varchar(150) DEFAULT 'null',
  `address` varchar(300) DEFAULT 'null',
  `GST` varchar(45) DEFAULT 'null',
  `IEC` varchar(45) DEFAULT 'null',
  `finaldestination` varchar(45) DEFAULT 'null',
  `portofshipment` varchar(45) DEFAULT 'null',
  `approval` json DEFAULT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) DEFAULT 'null',
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table store delted Import job ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allimportdeletedjob`
--

LOCK TABLES `allimportdeletedjob` WRITE;
/*!40000 ALTER TABLE `allimportdeletedjob` DISABLE KEYS */;
/*!40000 ALTER TABLE `allimportdeletedjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allorgdeleted`
--

DROP TABLE IF EXISTS `allorgdeleted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allorgdeleted` (
  `alias` varchar(45) NOT NULL DEFAULT '0',
  `country` varchar(45) NOT NULL DEFAULT '0',
  `state` varchar(45) NOT NULL DEFAULT '0',
  `city` varchar(45) NOT NULL DEFAULT '0',
  `postalcode` varchar(45) NOT NULL DEFAULT '0',
  `phone` varchar(45) NOT NULL DEFAULT '0',
  `email` varchar(45) NOT NULL DEFAULT '0',
  `PAN` varchar(100) NOT NULL DEFAULT '0',
  `GST` varchar(100) NOT NULL DEFAULT '0',
  `IEC` varchar(100) NOT NULL DEFAULT '0',
  `creditdays` varchar(100) NOT NULL DEFAULT '0',
  `address` varchar(100) NOT NULL DEFAULT '0',
  `orgcode` varchar(150) NOT NULL,
  `orgname` varchar(100) NOT NULL,
  `clientname` varchar(100) NOT NULL,
  `branchname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `uniquevalue` varchar(45) NOT NULL,
  `approval` json DEFAULT NULL,
  `createdon` varchar(45) NOT NULL,
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table store deleted organization';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allorgdeleted`
--

LOCK TABLES `allorgdeleted` WRITE;
/*!40000 ALTER TABLE `allorgdeleted` DISABLE KEYS */;
/*!40000 ALTER TABLE `allorgdeleted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvalexpjob`
--

DROP TABLE IF EXISTS `approvalexpjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvalexpjob` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(50) NOT NULL,
  `jobdate` datetime NOT NULL,
  `docreceivedon` datetime NOT NULL,
  `transportmode` varchar(45) NOT NULL,
  `customhouse` varchar(45) NOT NULL,
  `ownbooking` varchar(45) NOT NULL,
  `deliverymode` varchar(45) NOT NULL,
  `noofcontainer` int NOT NULL,
  `owntransportation` varchar(45) NOT NULL,
  `betype` varchar(45) NOT NULL,
  `consignmenttype` varchar(45) NOT NULL,
  `cfsname` varchar(45) NOT NULL,
  `shippinglinename` varchar(45) NOT NULL,
  `count` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) NOT NULL,
  `exportername` varchar(150) NOT NULL DEFAULT 'null',
  `address` varchar(200) DEFAULT 'null',
  `GST` varchar(45) DEFAULT 'null',
  `IEC` varchar(45) DEFAULT 'null',
  `finaldestination` varchar(45) DEFAULT 'null',
  `portofshipment` varchar(45) DEFAULT 'null',
  `approval` json DEFAULT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) DEFAULT 'null',
  `bltype` varchar(45) NOT NULL,
  `bltypenum` varchar(45) NOT NULL DEFAULT 'null',
  `jobowner` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `freedays` varchar(45) NOT NULL,
  `blstatus` varchar(45) NOT NULL,
  `benumber` varchar(45) NOT NULL,
  `shippinglinebond` varchar(45) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvexpjob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalexpjob`
--

LOCK TABLES `approvalexpjob` WRITE;
/*!40000 ALTER TABLE `approvalexpjob` DISABLE KEYS */;
INSERT INTO `approvalexpjob` VALUES (1,'Kolkata/A/E/1/24-25','2024-10-01 16:43:00','2024-10-02 16:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','1','Kolkata','Kolkata-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','56','fgdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-01 16:43:59','Mumbai','HBL/HAWB','jhokd','aayush@manager','seawave@2323','Seawave Forwarding Logistics','2','Surrender','5544446','Yearly',0,NULL,NULL),(2,'Kolkata/A/E/2/24-25','2024-10-01 16:44:00','2024-10-04 16:44:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dasd1g654','dumpy45','2','Kolkata','Kolkata-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-01 16:44:43','Thane','MBL/MAWB','tfgdge','aayush@manager','seawave@2323','Seawave Forwarding Logistics','2','Surrender','5544446','Yearly',0,NULL,NULL),(3,'Kolkata/S/E/3/24-25','2024-10-01 16:45:00','2024-10-24 16:45:00','Sea','Kolkata Sea','Yes','Loaded',1,'Yes','Home','FCL','dasd1g654','dumpy45','3','Kolkata','Kolkata-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','gdfgf ','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-01 16:45:29','Thane','HBL/HAWB','tfgdge','aayush@manager','seawave@2323','Seawave Forwarding Logistics','2','Surrender','5544446','Yearly',0,NULL,NULL),(4,'A/Delhi/E/1/24-25','2024-10-01 17:23:00','2024-10-03 17:22:00','Air','Mumbai Sea','','',2,'Yes','Home','FCL','dummy67','dummy67','1','Delhi','Delhi-2323','Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','delhi','fdsf','[{\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','JobsButton','2024-10-01 17:23:16','Mumbai','HBL/HAWB','gfdgdg','hemang@executive','seawave@2323','Seawave Forwarding Logistics','2','Surrender','453453','OneTime',0,NULL,NULL),(5,'A/Delhi/E/2/24-25','2024-10-01 17:24:00','2024-10-02 17:23:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','fdgfgfgdf','dfggfdg','2','Delhi','Delhi-2323','Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sdfsdf','dffsdfs','[{\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','JobsButton','2024-10-01 17:24:33','Thane','MBL/MAWB','fdffgdgf','hemang@executive','seawave@2323','Seawave Forwarding Logistics','2','Surrender','345345','Yearly',0,NULL,NULL),(6,'S/Mumbai/E/1/24-25','2024-10-03 11:00:00','2024-10-02 11:00:00','Sea','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dasd1g654','f1s61g1s1','1','Mumbai','Mumbai-2323','Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-03 11:00:58','Thane','HBL/HAWB','afa4g6464','aayush@manager','seawave@2323','Seawave Forwarding Logistics','2','Surrender','5544446','OneTime',0,NULL,NULL),(7,'A/Mumbai/E/2/24-25','2024-10-03 11:54:00','2024-10-02 11:54:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','2','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-03 11:54:41','Thane','MBL/MAWB','ddddgf','admin','seawave@2323','Seawave Forwarding Logistics','2','','5345345','Yearly',0,NULL,NULL),(8,'Kolkata/A/E/4/24-25','2024-10-04 16:12:00','2024-10-03 16:12:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','4','Kolkata','Kolkata-2323','Ritesh Pathak LLP','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}, {\"status\": null, \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-04 16:12:06','Thane','HBL/HAWB','ddddgf','admin','seawave@2323','Seawave Forwarding Logistics','2','Surrender','23','Yearly',0,NULL,NULL),(9,'Kolkata/A/E/5/24-25','2024-10-04 16:12:00','2024-10-03 16:12:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','5','Kolkata','Kolkata-2323','Ritesh Pathak LLP','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-04 16:12:16','Thane','HBL/HAWB','ddddgf','admin','seawave@2323','Seawave Forwarding Logistics','2','Surrender','23','Yearly',0,NULL,NULL),(10,'Kolkata/A/E/6/24-25','2024-10-04 16:37:00','2024-10-02 16:37:00','Air','Mumbai Sea','Yes','Destuff',2,'No','Ex-Bond','FCL','dummy45','dumpy45','6','Kolkata','Kolkata-2323','Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','kttttt','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-04 16:37:30','Thane','HBL/HAWB','jhokd','aayush@manager','seawave@2323','Seawave Forwarding Logistics','2','Surrender','5544446','Yearly',0,NULL,NULL),(11,'A/Delhi/E/3/24-25','2024-10-07 17:35:00','2024-10-05 17:34:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','3','Delhi','Delhi-2323','Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-07 17:35:24','Thane','HBL/HAWB','ddddgf','admin','seawave@2323','Seawave Forwarding Logistics','2','Surrender','23243','Yearly',0,NULL,NULL);
/*!40000 ALTER TABLE `approvalexpjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvalimpjob`
--

DROP TABLE IF EXISTS `approvalimpjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvalimpjob` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(50) NOT NULL,
  `jobdate` datetime NOT NULL,
  `docreceivedon` datetime NOT NULL,
  `transportmode` varchar(45) NOT NULL,
  `customhouse` varchar(45) NOT NULL,
  `ownbooking` varchar(45) NOT NULL,
  `deliverymode` varchar(45) NOT NULL,
  `noofcontainer` int NOT NULL,
  `owntransportation` varchar(45) NOT NULL,
  `betype` varchar(45) NOT NULL,
  `consignmenttype` varchar(45) NOT NULL,
  `cfsname` varchar(45) NOT NULL,
  `shippinglinename` varchar(45) NOT NULL,
  `bltype` varchar(45) NOT NULL,
  `bltypenum` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `jobowner` varchar(45) NOT NULL,
  `freedays` varchar(45) NOT NULL,
  `blstatus` varchar(45) NOT NULL,
  `benumber` varchar(45) NOT NULL,
  `shippinglinebond` varchar(45) NOT NULL,
  `count` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) NOT NULL,
  `importername` varchar(150) DEFAULT 'null',
  `address` varchar(300) DEFAULT 'null',
  `GST` varchar(45) DEFAULT 'null',
  `IEC` varchar(45) DEFAULT 'null',
  `finaldestination` varchar(45) DEFAULT 'null',
  `portofshipment` varchar(45) DEFAULT 'null',
  `approval` json DEFAULT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) DEFAULT 'null',
  `IsDeleted` tinyint(1) DEFAULT '0',
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvaljob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalimpjob`
--

LOCK TABLES `approvalimpjob` WRITE;
/*!40000 ALTER TABLE `approvalimpjob` DISABLE KEYS */;
INSERT INTO `approvalimpjob` VALUES (1,'A/Mumbai/I/24-25/1','2024-09-24 12:28:00','2024-09-23 12:27:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy62','dummy67','HBL/HAWB','dummy62','Seawave Forwarding Logistics','seawave@2323','hemang@executive','1','Surrender','466645','Yearly','1','Mumbai','Mumbai-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sdff','fsfsf','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 12:28:23','Mumbai',1,'hemang@executive','not needed'),(2,'A/Mumbai/I/24-25/2','2024-09-24 12:28:00','2024-09-23 12:27:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive','1','Surrender','466645','Yearly','2','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sdff','fsfsf','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 12:28:59','Thane',0,'',''),(3,'A/Mumbai/I/24-25/3','2024-09-24 12:28:00','2024-09-23 12:27:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive','1','Surrender','466645','Yearly','3','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sdff','fsfsf','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 12:29:02','Thane',1,'aayush@manager','not needed'),(4,'A/Mumbai/I/24-25/4','2024-09-24 14:32:00','2024-09-23 14:31:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Ex-Bond','LCL','fggfgf','ggdhh','HBL/HAWB','dfggd','Seawave Forwarding Logistics','seawave@2323','aayush@manager','2','Surrender','345354','Yearly','4','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','fgdgf','dgd','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 14:32:07','Thane',0,'',NULL),(5,'A/Mumbai/I/24-25/5','2024-09-24 14:33:00','2024-09-23 14:32:00','Air','Kolkata Sea','Yes','Loaded',3,'Yes','Home','FCL','fgdg','gdfgfdg','MBL/MAWB','dfggdgd','Seawave Forwarding Logistics','seawave@2323','aayush@manager','1','Surrender','5345','Yearly','5','Mumbai','Mumbai-2323','Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','dfgg','ggf','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 14:33:05','Thane',0,'',''),(6,'S/Mumbai/I/24-25/6','2024-09-24 14:34:00','2024-09-23 14:33:00','Sea','Mumbai Sea','Yes','Loaded',3,'Yes','Home','FCL','gfhfh','hfhgh','HBL/HAWB','ggdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','2','Surrender','466445','Yearly','6','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','gdfgdf','gfgg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 14:34:01','Thane',0,'',''),(7,'A/Mumbai/I/24-25/7','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','7','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 15:43:35','Thane',0,'',' '),(8,'A/Mumbai/I/24-25/8','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','8','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 15:43:43','Thane',0,'',' '),(9,'A/Mumbai/I/24-25/9','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','9','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 15:43:46','Thane',0,'',''),(10,'A/Mumbai/I/24-25/10','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','10','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 15:43:48','Thane',0,'',''),(11,'A/Mumbai/I/24-25/11','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','11','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-24 15:43:51','Thane',0,NULL,' '),(13,'A/Mumbai/I/24-25/12','2024-09-28 13:06:00','2024-10-01 13:05:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dfggh','dumpy','HBL/HAWB','ghhfdg g','Seawave Forwarding Logistics','seawave@2323','aayush@manager','2','Surrender','445','Yearly','12','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','gdgf','gdfgf ','[{\"status\": null, \"employeename\": \"hemang@executive\"}, {\"status\": \"Reject\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-28 13:06:37','Thane',0,NULL,NULL),(14,'A/Mumbai/I/24-25/13','2024-09-28 14:24:00','2024-09-27 14:23:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','MBL/MAWB','jhokd','Seawave Forwarding Logistics','seawave@2323','aayush@manager','2','Original','54346','OneTime','13','Mumbai','Mumbai-2323','Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-28 14:24:15','Thane',0,NULL,NULL),(15,'A/Mumbai/I/24-25/14','2024-09-28 15:10:00','2024-09-24 15:10:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','LCL','gdfg f','dumpy45','HBL/HAWB','dsfsdffs','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Original','35434','Yearly','14','Mumbai','Mumbai-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','fsdfdf','dfsfdsf ','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-28 15:10:34','Mumbai',0,NULL,NULL),(16,'A/Mumbai/I/24-25/15','2024-09-30 11:23:00','2024-09-29 11:22:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','sfdsf','fdffs','HBL/HAWB','dgfdsgsg','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','223423','Yearly','15','Mumbai','Mumbai-2323','Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','fsdfd','esdf','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-30 11:23:13','Thane',0,NULL,NULL),(17,'A/Mumbai/I/24-25/16','2024-09-30 12:00:00','2024-09-29 12:00:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','In-Bond','FCL','AOOC','HSOOO','MBL/MAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5345345','Yearly','16','Mumbai','Mumbai-2323','Prince LLP','Highland Residency\nBougainvillea','27FXFPM6685A1Z4','FXFPM6685A','dgdg','gdgdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-30 12:00:35','juinagar',0,NULL,NULL),(18,'A/Mumbai/I/24-25/17','2024-09-30 12:21:00','2024-09-27 12:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','In-Bond','FCL','dummy45','dumpy45','HBL/HAWB','jhokd','Seawave Forwarding Logistics','seawave@2323','aayush@manager','1','Surrender','23','Yearly','17','Mumbai','Mumbai-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','mumbai','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-09-30 12:21:12','Mumbai',0,NULL,NULL),(33,'Kolkata/A/I/24-25/1','2024-10-01 17:02:00','2024-10-18 17:02:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy67','dummy67','HBL/HAWB','dummy6','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Surrender','453453','Yearly','1','Kolkata','Kolkata-2323','Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sderrr','345','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}, {\"status\": null, \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-01 17:02:40','Mumbai',0,NULL,NULL),(34,'Kolkata/A/I/2/24-25','2024-10-01 17:08:00','2024-10-03 17:07:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy67','dummy67','MBL/MAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Original','32234','Yearly','2','Kolkata','Kolkata-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sderrr','fgdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-01 17:08:26','Mumbai',0,NULL,NULL),(35,'Kolkata/S/I/3/24-25','2024-10-01 17:09:00','2024-10-04 17:09:00','Sea','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Surrender','453453','Yearly','3','Kolkata','Kolkata-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','dfsfdf','fgdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-01 17:09:40','Mumbai',0,NULL,NULL),(36,'A/Delhi/I/1/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','1','Delhi','Delhi-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','JobsButton','2024-10-01 17:20:55','Mumbai',0,NULL,NULL),(37,'A/Delhi/I/2/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','2','Delhi','Delhi-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','JobsButton','2024-10-01 17:20:59','Mumbai',0,NULL,NULL),(38,'A/Delhi/I/3/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','3','Delhi','Delhi-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','JobsButton','2024-10-01 17:21:03','Mumbai',0,NULL,NULL),(39,'A/Delhi/I/4/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','4','Delhi','Delhi-2323','C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','JobsButton','2024-10-01 17:21:05','Mumbai',0,NULL,NULL),(46,'A/Mumbai/I/10/24-25','2024-10-03 11:52:00','2024-10-12 11:52:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','1344','Yearly','10','Mumbai','Mumbai-2323','Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": null, \"employeename\": \"hemang@executive\"}, {\"status\": \"Reject\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-03 11:52:45','Thane',0,NULL,NULL),(47,'A/Mumbai/I/10/24-25','2024-10-03 11:53:00','2024-10-02 11:53:00','Air','Mumbai Sea','','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5345345','Yearly','10','Mumbai','Mumbai-2323','Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": null, \"employeename\": \"hemang@executive\"}, {\"status\": \"Reject\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-03 11:53:36','Thane',0,NULL,NULL),(48,'Kolkata/A/I/4/24-25','2024-10-03 17:21:00','2024-10-02 17:20:00','Air','Mumbai Sea','Yes','Loaded',3,'Yes','Home','FCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Surrender','453453','Yearly','4','Kolkata','Kolkata-2323','Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','dsd','dsfj','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-03 17:21:18','Thane',0,NULL,NULL),(49,'Kolkata/A/I/5/24-25','2024-10-03 17:38:00','2024-10-04 17:37:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','MBL/MAWB','jhokd','Seawave Forwarding Logistics','seawave@2323','aayush@manager','2','Original','5544446','Yearly','5','Kolkata','Kolkata-2323','Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','sfsfdfs','gfgfdg','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}, {\"status\": null, \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-03 17:38:18','Thane',0,NULL,NULL),(50,'Kolkata/A/I/6/24-25','2024-10-04 15:56:00','2024-10-05 15:56:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Surrender','453453','Yearly','6','Kolkata','Kolkata-2323','C CONNECT LOGGI','123 Main Street ','27ABCDE1234F1Z5','1234567890','fafsd','dgf','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}, {\"status\": null, \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-04 15:56:59','Mumbai',0,NULL,NULL),(51,'Kolkata/A/I/7/24-25','2024-10-04 16:05:00','2024-10-18 16:05:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','In-Bond','FCL','AOOC','HSOOO','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','23','Yearly','7','Kolkata','Kolkata-2323','Allcargo Pvt Ltd','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-04 16:05:33','Mumbai',0,NULL,NULL),(52,'Kolkata/A/I/8/24-25','2024-10-04 16:48:00','2024-10-03 16:48:00','Air','Mumbai Sea','Yes','Destuff',2,'Yes','Home','FCL','dummy67','dummy67','MBL/MAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Surrender','453453','OneTime','8','Kolkata','Kolkata-2323','C CONNECT LOGGI','123 Main Street ','27ABCDE1234F1Z5','1234567890','fasfasf','jdhsfhj ','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}, {\"status\": null, \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-04 16:48:18','Mumbai',0,NULL,NULL),(53,'Kolkata/A/I/9/24-25','2024-10-04 16:52:00','2024-10-03 16:51:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','AOOC','HSOOO','HBL/HAWB','gdgd','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5345345','Yearly','9','Kolkata','Kolkata-2323','Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-10-04 16:52:20','Thane',0,NULL,NULL);
/*!40000 ALTER TABLE `approvalimpjob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvalorg`
--

DROP TABLE IF EXISTS `approvalorg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvalorg` (
  `alias` varchar(45) NOT NULL DEFAULT '0',
  `country` varchar(45) NOT NULL DEFAULT '0',
  `state` varchar(45) NOT NULL DEFAULT '0',
  `city` varchar(45) NOT NULL DEFAULT '0',
  `postalcode` varchar(45) NOT NULL DEFAULT '0',
  `phone` varchar(45) NOT NULL DEFAULT '0',
  `email` varchar(45) NOT NULL DEFAULT '0',
  `PAN` varchar(100) NOT NULL DEFAULT '0',
  `GST` varchar(100) NOT NULL DEFAULT '0',
  `IEC` varchar(100) NOT NULL DEFAULT '0',
  `creditdays` varchar(100) NOT NULL DEFAULT '0',
  `address` varchar(100) NOT NULL DEFAULT '0',
  `orgcode` varchar(150) NOT NULL,
  `orgname` varchar(100) NOT NULL,
  `clientname` varchar(100) NOT NULL,
  `branchname` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `uniquevalue` varchar(45) NOT NULL,
  `approval` json DEFAULT NULL,
  `createdon` varchar(45) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the organizations before approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalorg`
--

LOCK TABLES `approvalorg` WRITE;
/*!40000 ALTER TABLE `approvalorg` DISABLE KEYS */;
INSERT INTO `approvalorg` VALUES ('digga','India','Maharashtra','Navi Mumbai','400703','2004263507','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','4','Omkar Apartment B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Digga D','diggachigga','aayush@manager',1,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aayush@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-06-05 15:31:43',1,'hemang@executive',NULL),('gondya','dsf','dsf','df','345326','5645653232','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','7','dfs','seawave@2323','Seawave Forwarding Logistics','Gondya','gond','hemang@executive',2,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-06-05 15:40:28',1,'hemang@executive',NULL),('allcargo','India','Maharashtra','Mumbai','400004','9876543210','example@example.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd','Mumbai','admin',3,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-09-02 15:05:01',0,'aayush@manager',NULL),('ritesh','India','Maharashtra','Navi Mumbai','400705','9867612222','nkmishra@seawave.in','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','21','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','seawave@2323','Seawave Forwarding Logistics','Ritesh Pathak LLP','Thane','admin',4,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-09-20 16:31:31',0,'admin',NULL),('highland','India','Maharashtra','THANE','400607','8655919239','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','31','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','seawave@2323','Seawave Forwarding Logistics','Highland Residency','Thane','admin',6,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-09-20 16:56:16',0,'hemang@executive',NULL),('prince','India','Maharashtra','Thane','400607','7045605056','aayushmishra@seawave.in','FXFPM6685A','27FXFPM6685A1Z4','FXFPM6685A','31','Highland Residency\nBougainvillea','seawave@2323','Seawave Forwarding Logistics','Prince LLP','juinagar','aayush@manager',7,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aayush@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-09-20 16:57:40',1,'hemang@executive',NULL),('c','India','MAHARASHTRA','THANE','400607','8655919239','rishi.seawave@gmail.com','ABCPP1234P','27ABCPP1234P1Z5','ABCPP1234P','31','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','seawave@2323','Seawave Forwarding Logistics','C CONNECT LOGGI','Mumbai','admin',8,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-09-20 17:11:41',0,'hemang@executive',NULL),('vedant','India','MH','Navi Mumbai mh','400705','8655997299','rm@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','30','fdgdsg dgdgg','seawave@2323','Seawave Forwarding Logistics','Vedant PVT LTD','Mumbai','admin',10,'OrgButton','[{\"status\": \"Reject\", \"username\": \"hemang@executive\"}]','2024-09-27 14:32:05',0,NULL,NULL),('dummy','india','Goa','dfdfs df','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','67','dfsfdfs','seawave@2323','Seawave Forwarding Logistics','dummy Pvt ltd','','aayush@manager',11,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aayush@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-09-27 15:12:53',0,'hemang@executive',NULL),('dummy2','india','Goa','mum','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','67','sdasdf sdgs','seawave@2323','Seawave Forwarding Logistics','dummy2 Pvt ltd','','aayush@manager',12,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Reject\", \"username\": \"aayush@manager\"}]','2024-09-27 15:20:40',0,NULL,NULL),('dummy3','india','maha','mum','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','56','afasf sdfdvsv vass','seawave@2323','Seawave Forwarding Logistics','dummy3 Pvt ltd','mumbai','aayush@manager',13,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Reject\", \"username\": \"aayush@manager\"}]','2024-09-27 16:16:18',0,NULL,NULL);
/*!40000 ALTER TABLE `approvalorg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approverlist`
--

DROP TABLE IF EXISTS `approverlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approverlist` (
  `orgname` varchar(100) NOT NULL,
  `orgcode` varchar(100) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `approverlistname` varchar(150) NOT NULL,
  `branchname` varchar(100) NOT NULL,
  `branchcode` varchar(100) NOT NULL,
  `uniquevalue` json NOT NULL,
  `selectedcount` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the name of the approver list of a particular organization';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approverlist`
--

LOCK TABLES `approverlist` WRITE;
/*!40000 ALTER TABLE `approverlist` DISABLE KEYS */;
INSERT INTO `approverlist` VALUES ('Seawave Forwarding Logistics','seawave@2323',1,'IMPORT','Raxaul','Raxaul-2323','[\"JobsButton\"]',2),('Seawave Forwarding Logistics','seawave@2323',2,'ORGANIZATION','Raxaul','Raxaul-2323','[\"OrgButton\"]',2),('Seawave Forwarding Logistics','seawave@2323',3,'IMPORT','Mumbai','Mumbai-2323','[\"JobsButton\"]',1),('Seawave Forwarding Logistics','seawave@2323',4,'Organizational Approval','Mumbai','Mumbai-2323','[\"OrgButton\"]',1),('Seawave Forwarding Logistics','seawave@2323',5,'EXPORT','Raxaul','Raxaul-2323','[\"JobsButton\"]',1),('Seawave Forwarding Logistics','seawave@2323',6,'ORGANIZATION','Jogbani','Jogbani-2323','[\"OrgButton\"]',0),('Seawave Forwarding Logistics','seawave@2323',7,'IMPORT JOB','Jogbani','Jogbani-2323','[\"JobsButton\"]',1),('Seawave Forwarding Logistics','seawave@2323',9,'JOB','Kolkata','Kolkata-2323','[\"JobsButton\"]',1),('Seawave Forwarding Logistics','seawave@2323',10,'IMPORT JOB ','Delhi','Delhi-2323','[\"JobsButton\"]',1),('Seawave Forwarding Logistics','seawave@2323',11,'ORGANIZATION','Delhi','Delhi-2323','[\"OrgButton\"]',1);
/*!40000 ALTER TABLE `approverlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvername`
--

DROP TABLE IF EXISTS `approvername`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approvername` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(100) NOT NULL,
  `orgcode` varchar(100) NOT NULL,
  `approverlistname` varchar(100) NOT NULL,
  `employeename` varchar(100) NOT NULL,
  `branchname` varchar(100) NOT NULL,
  `branchcode` varchar(100) NOT NULL,
  `uniquevalue` json NOT NULL,
  `aid` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store all the names of users for a particular approval list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvername`
--

LOCK TABLES `approvername` WRITE;
/*!40000 ALTER TABLE `approvername` DISABLE KEYS */;
INSERT INTO `approvername` VALUES (15,'Seawave Forwarding Logistics','seawave@2323','IMPORT','aayush@manager','Raxaul','Raxaul-2323','[\"JobsButton\"]',1),(16,'Seawave Forwarding Logistics','seawave@2323','IMPORT','rishi@manager','Raxaul','Raxaul-2323','[\"JobsButton\"]',1),(17,'Seawave Forwarding Logistics','seawave@2323','IMPORT','hemang@executive','Raxaul','Raxaul-2323','[\"JobsButton\"]',1),(18,'Seawave Forwarding Logistics','seawave@2323','ORGANIZATION','aayush@manager','Raxaul','Raxaul-2323','[\"OrgButton\"]',2),(19,'Seawave Forwarding Logistics','seawave@2323','ORGANIZATION','rishi@manager','Raxaul','Raxaul-2323','[\"OrgButton\"]',2),(20,'Seawave Forwarding Logistics','seawave@2323','ORGANIZATION','hemang@executive','Raxaul','Raxaul-2323','[\"OrgButton\"]',2),(21,'Seawave Forwarding Logistics','seawave@2323','IMPORT','hemang@executive','Mumbai','Mumbai-2323','[\"JobsButton\"]',3),(22,'Seawave Forwarding Logistics','seawave@2323','IMPORT','aayush@manager','Mumbai','Mumbai-2323','[\"JobsButton\"]',3),(23,'Seawave Forwarding Logistics','seawave@2323','Organizational Approval','aayush@manager','Mumbai','Mumbai-2323','[\"OrgButton\"]',4),(25,'Seawave Forwarding Logistics','seawave@2323','EXPORT','rishi@manager','Raxaul','Raxaul-2323','[\"JobsButton\"]',5),(26,'Seawave Forwarding Logistics','seawave@2323','EXPORT','aayush@manager','Raxaul','Raxaul-2323','[\"JobsButton\"]',5),(27,'Seawave Forwarding Logistics','seawave@2323','IMPORT JOB','hemang@executive','Jogbani','Jogbani-2323','[\"JobsButton\"]',7),(28,'Seawave Forwarding Logistics','seawave@2323','IMPORT JOB','aayush@manager','Jogbani','Jogbani-2323','[\"JobsButton\"]',7),(31,'Seawave Forwarding Logistics','seawave@2323','JOB','hemang@executive','Kolkata','Kolkata-2323','[\"JobsButton\"]',9),(32,'Seawave Forwarding Logistics','seawave@2323','JOB','aayush@manager','Kolkata','Kolkata-2323','[\"JobsButton\"]',9),(35,'Seawave Forwarding Logistics','seawave@2323','IMPORT JOB ','hemang@executive','Delhi','Delhi-2323','[\"JobsButton\"]',10),(36,'Seawave Forwarding Logistics','seawave@2323','IMPORT JOB ','aayush@manager','Delhi','Delhi-2323','[\"JobsButton\"]',10),(39,'Seawave Forwarding Logistics','seawave@2323','ORGANIZATION','hemang@executive','Jogbani','Jogbani-2323','[\"OrgButton\"]',6),(40,'Seawave Forwarding Logistics','seawave@2323','ORGANIZATION','aayush@manager','Jogbani','Jogbani-2323','[\"OrgButton\"]',6);
/*!40000 ALTER TABLE `approvername` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccount`
--

DROP TABLE IF EXISTS `bankaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bankaccount` (
  `ownbranchname` json NOT NULL,
  `ownbranchcode` json NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `bankname` varchar(50) NOT NULL,
  `accountnum` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `accountype` varchar(45) NOT NULL,
  `chequedetails` varchar(45) DEFAULT 'null',
  `ifscCode` varchar(45) NOT NULL,
  `closingBalance` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
INSERT INTO `bankaccount` VALUES ('[{\"branchname\": \"Raxaul\"}]','[{\"branchcode\": \"Raxaul-2323\"}]','seawave@2323','Seawave Forwarding Logistics','Canara','A265425974',2,'Savings','null','HDFC0000490',354654),('[{\"branchname\": \"Mumbai\"}, {\"branchname\": \"Pune\"}]','[{\"branchcode\": \"someone Mumbai-123\"}, {\"branchcode\": \"someone Pune-123\"}]','someone@123','someone pvt ltd','Canara','A5747524234',3,'Cash Credit','null','HDFC0000490',5000),('[{\"branchname\": \"Jogbani\"}]','[{\"branchcode\": \"Jogbani-2323\"}]','seawave@2323','Seawave Forwarding Logistics','SBI','ZZ4753',4,'Current','null','CNRB0001589',5000),('[{\"branchname\": \"Raxaul\"}]','[{\"branchcode\": \"Raxaul-2323\"}]','seawave@2323','Seawave Forwarding Logistics','ICICI','ICICI324234',5,'Savings','null','ICIC0000418',4524234),('[{\"branchname\": \"Jogbani\"}]','[{\"branchcode\": \"Jogbani-2323\"}]','seawave@2323','Seawave Forwarding Logistics','canara','3444345',6,'Savings','null','CNRB0000104',45677),('[{\"branchname\": \"Kolkata\"}]','[{\"branchcode\": \"Kolkata-2323\"}]','seawave@2323','Seawave Forwarding Logistics','Punjab Bank','855298631245',7,'Current','null','HDFC0000830',100000);
/*!40000 ALTER TABLE `bankaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branchaccess`
--

DROP TABLE IF EXISTS `branchaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branchaccess` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ownbranchname` varchar(150) NOT NULL,
  `branchcode` varchar(150) NOT NULL,
  `username` varchar(150) NOT NULL,
  `orgname` varchar(150) NOT NULL,
  `orgcode` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is for access of users for their org branches ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchaccess`
--

LOCK TABLES `branchaccess` WRITE;
/*!40000 ALTER TABLE `branchaccess` DISABLE KEYS */;
INSERT INTO `branchaccess` VALUES (5,'Mumbai','Mumbai-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(6,'Mumbai','Mumbai-2323','rishi@manager','Seawave Forwarding Logistics','seawave@2323'),(7,'Mumbai','Mumbai-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(8,'Jogbani','Jogbani-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(9,'Jogbani','Jogbani-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(11,'Delhi','Delhi-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(12,'Delhi','Delhi-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(13,'Kolkata','Kolkata-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(14,'Kolkata','Kolkata-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323');
/*!40000 ALTER TABLE `branchaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `branchname` varchar(50) NOT NULL,
  `clientname` varchar(50) NOT NULL,
  `orgcode` varchar(50) DEFAULT NULL,
  `bid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_braches_orgcode` (`orgcode`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the branches table that are linked to organizations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'vashi','seaconnect','seawave@2323','1'),(2,'vashi','forte services','seawave@2323','1'),(3,'vashi','seaconnect','seawave@2323','2'),(4,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(5,'Ahemdabad','Seatech','seawave@2323','4'),(6,'vashi','seaconnect','seawave@2323','1'),(7,'telangana','erte retgdf','seawave@2323','2'),(8,'telangana','erte retgdf','seawave@2323','1'),(9,'Parel','seaconnect','seawave@2323','2'),(10,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(11,'vashi','seaconnect','seawave@2323','1'),(12,'Patna','uneed services','seawave@2323','2'),(13,'vashi','seaconnect','seawave@2323','1'),(14,'vashi','uneed services','seawave@2323','1'),(15,'Parel','accenture services','seawave@2323','2'),(16,'Jaipur','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(17,'telangana','seaconnect','seawave@2323','1'),(18,'Parel','seaconnect','seawave@2323','1'),(19,'vashi','seaconnect','seawave@2323','1'),(20,'Patna','seaconnect','seawave@2323',NULL),(21,'Jaipur','uneed services','seawave@2323','1'),(22,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(23,'Jaipur','forte services','seawave@2323','1'),(24,'telangana','seaconnect','seawave@2323','1'),(25,'Raipur','seaconnect','seawave@2323','1'),(26,'Null','seaconnect','seawave@2323','1'),(27,'vashi','accenture services','seawave@2323','2'),(28,'Uganda','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(29,'Jaipur','forte services','seawave@2323','4'),(30,'goat','BHaijan','seawave@2323','5'),(31,'Parel','tttt','seawave@2323','6'),(32,'bhais','tttt','seawave@2323','7'),(33,'buffalo','ggggggggg','seawave@2323','8'),(34,'injection','iiiii','seawave@2323','9'),(35,'done','done','seawave@2323','10'),(36,'jhaatu','dummy','seawave@2323','11'),(37,'kerala','test','seawave@2323','12'),(38,'Himalaya','uneed services','seawave@2323','13'),(39,'thth','ff','seawave@2323','14'),(40,'final','Final Test','seawave@2323','15'),(41,'finale','Final','seawave@2323','16'),(42,'DJ','Final Test','seawave@2323','17'),(43,'Ghatkopar','Final Test','seawave@2323','18'),(44,'render','Final Render Test','seawave@2323','19'),(45,'dsf','final G','seawave@2323','20'),(46,'finale','final G','seawave@2323','21'),(47,'dy','Final Render Test','seawave@2323','22'),(48,'Alephata','JamJam','seawave@2323','23'),(49,'test branch','Test Organization','seawave@2323','24'),(50,'Jamacia','usain bolt','seawave@2323','25'),(51,'approver','ApproverLog Test Dummy','seawave@2323','26'),(52,'kurla','vector','seawave@2323','27'),(53,'vashi','seaconnect','seawave@2323','1'),(54,'telangana','erte retgdf','seawave@2323','1'),(55,'Belapur','seaconnect','seawave@2323','2'),(56,'ghana','Gazai Medicals','seawave@2323','3'),(57,'sfsdf','Apexsea Logistics Pvt Ltd','seawave@2323','4'),(58,'ginger','uneed services','seawave@2323','5'),(59,'DJ','Final Test','seawave@2323','6'),(60,'hareshwar','Hari Hareshwar','seawave@2323','7'),(61,'nanded','Damru','seawave@2323','8'),(62,'Miami','GTA','seawave@2323','9'),(63,'motif','Notif Test','seawave@2323','10'),(64,'DJ','Final Render Test','seawave@2323','11'),(65,'Allorg','Notification Test Final','seawave@2323','12'),(66,'abc','XYZ XYZ','seawave@2323','13'),(67,'zaza','zaza test','seawave@2323','14'),(68,'haland','Hazardous notification','seawave@2323','15'),(69,'gdsfds','usain bolt','seawave@2323','16'),(70,'Hindustan','Rooster','seawave@2323',NULL),(71,'haridwar','Heritage Motors','seawave@2323',NULL),(72,'dsfdsf','fsdgfsf','seawave@2323',NULL),(73,'nigeria','nij','seawave@2323',NULL),(74,'KJ Somaiya','gds','seawave@2323',NULL),(75,'dfgdfg','dgdfg','seawave@2323',NULL),(76,'dummy','dfgdfg','seawave@2323',NULL),(77,'gfg','dgdfsd','seawave@2323',NULL),(78,'dsg','fsdf','seawave@2323',NULL),(79,'hyderbad','seaconnect','seawave@2323','1'),(80,'hydrebad','uneed services','seawave@2323','1'),(81,'patna','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(82,'diggachigga','Digga D','seawave@2323','1'),(83,'gond','Gondya','seawave@2323','2'),(84,'Mumbai','Allcargo Pvt Ltd','seawave@2323','3'),(85,'Thane','Ritesh Pathak LLP','seawave@2323','4'),(86,'Thane','Highland Residency','seawave@2323','5'),(87,'Thane','Highland Residency','seawave@2323','6'),(88,'juinagar','Prince LLP','seawave@2323','7'),(89,'Mumbai','C CONNECT LOGGI','seawave@2323','8'),(90,'Mumbai','Vedant PVT LTD','seawave@2323','10'),(91,'Mumbai','Vedant PVT LTD','seawave@2323','10'),(92,'mumbai','dummy3','seawave@2323',NULL),(93,'mumbai','dummy3 Pvt ltd','seawave@2323','13');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contactName` varchar(50) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `branchname` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `clientname` varchar(150) NOT NULL,
  `bid` int DEFAULT NULL,
  PRIMARY KEY (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store contacts of clients ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES ('Nilesh','Sales','company','3524323645','yungcode2003@gmail.com','diggachigga','Seawave Forwarding Logistics','seawave@2323','Digga D',1),('Rishi Mishra','Finance Admin','Accounts','8893283452','shreypingle23@gmail.com','gond','Seawave Forwarding Logistics','seawave@2323','Gondya',2),('Shreyash Pingle','manager','IT','9004263507','shreyashpingle752@gmail.com','gond','Seawave Forwarding Logistics','seawave@2323','Gondya',2);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customjobnumber`
--

DROP TABLE IF EXISTS `customjobnumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customjobnumber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `columnname` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) NOT NULL,
  `inputofcustom` varchar(45) DEFAULT 'null',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the custom job number';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customjobnumber`
--

LOCK TABLES `customjobnumber` WRITE;
/*!40000 ALTER TABLE `customjobnumber` DISABLE KEYS */;
INSERT INTO `customjobnumber` VALUES (15,'Seawave Forwarding Logistics','seawave@2323','BranchName','Jogbani','Jogbani-2323','null'),(16,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Jogbani','Jogbani-2323','null'),(17,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Jogbani','Jogbani-2323','null'),(18,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Jogbani','Jogbani-2323','null'),(19,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Jogbani','Jogbani-2323','null'),(27,'Seawave Forwarding Logistics','seawave@2323','BranchName','Kolkata Bihar','Kolkata-2323','null'),(28,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Kolkata Bihar','Kolkata-2323','null'),(29,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata Bihar','Kolkata-2323','null'),(30,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Kolkata Bihar','Kolkata-2323','null'),(31,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Kolkata Bihar','Kolkata-2323','null'),(32,'Seawave Forwarding Logistics','seawave@2323','Custom','Kolkata Bihar','Kolkata-2323','KB'),(33,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Raxaul','Raxaul-2323','null'),(34,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Raxaul','Raxaul-2323','null'),(35,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Raxaul','Raxaul-2323','null'),(36,'Seawave Forwarding Logistics','seawave@2323','BranchName','Raxaul','Raxaul-2323','null'),(37,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Raxaul','Raxaul-2323','null'),(38,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Mumbai','Mumbai-2323','null'),(39,'Seawave Forwarding Logistics','seawave@2323','BranchName','Mumbai','Mumbai-2323','null'),(40,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Mumbai','Mumbai-2323','null'),(41,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Mumbai','Mumbai-2323','null'),(42,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Mumbai','Mumbai-2323','null'),(59,'Seawave Forwarding Logistics','seawave@2323','BranchName','Kolkata','Kolkata-2323','null'),(60,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Kolkata','Kolkata-2323','null'),(61,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Kolkata','Kolkata-2323','null'),(62,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Kolkata','Kolkata-2323','null'),(63,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata','Kolkata-2323','null'),(64,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Delhi','Delhi-2323','null'),(65,'Seawave Forwarding Logistics','seawave@2323','BranchName','Delhi','Delhi-2323','null'),(66,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Delhi','Delhi-2323','null'),(67,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Delhi','Delhi-2323','null'),(68,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Delhi','Delhi-2323','null');
/*!40000 ALTER TABLE `customjobnumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debit`
--

DROP TABLE IF EXISTS `debit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `bankname` varchar(45) NOT NULL,
  `typeofexpense` varchar(45) NOT NULL,
  `paymentdetail` varchar(45) NOT NULL,
  `taxamount` varchar(45) NOT NULL,
  `totalinvoiceamount` varchar(45) NOT NULL,
  `gstamount` varchar(45) NOT NULL,
  `tdsamount` varchar(45) NOT NULL,
  `netpaymentamount` varchar(45) NOT NULL,
  `utrnumber` varchar(45) NOT NULL,
  `jobnumber` varchar(45) NOT NULL,
  `customername` varchar(45) NOT NULL,
  `remarks` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store debit payment sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit`
--

LOCK TABLES `debit` WRITE;
/*!40000 ALTER TABLE `debit` DISABLE KEYS */;
INSERT INTO `debit` VALUES (1,'2024-09-04','Canara','something','Allcargo Pvt Ltd','200000','10000.00','210000.00','10000.00','200000.00','5646','65456','Allcargo','none','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323'),(2,'2024-09-05','SBI','anything','Gondya','300000','15000.00','315000.00','15000.00','300000.00','56456','5765678','goondya','none','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323'),(3,'2024-09-06','Canara','TR','Digga D','1000','0.00','1000.00','0.00','1000.00','35346','8557','digga','none','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323'),(4,'2024-09-18','ICICI','any','Allcargo Pvt Ltd','3453456','172672.80','3626128.80','345345.60','3280783.20','23455345','456654','dfsdf','none','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323'),(5,'2024-09-05','ICICI','Kuchbhi','Prince','1000','50.00','1050.00','20.00','1030.00','786786','323453','Prince','none','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323'),(6,'2024-09-15','Canara','aisahi','Pratham','2343','117.15','2460.15','117.15','2343.00','423452','23434','Pratham','none','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323'),(10,'2024-10-18','Punjab Bank','dsd','vedag','100000','12000.00','112000.00','10000.00','102000.00','dfgd','56455424','dfsdf','gdg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323');
/*!40000 ALTER TABLE `debit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispatch`
--

DROP TABLE IF EXISTS `dispatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispatch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tatimpcolumn` varchar(150) NOT NULL,
  `days` varchar(50) NOT NULL,
  `minutes` varchar(50) NOT NULL,
  `hours` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the tat of the dispatch to delivery table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispatch`
--

LOCK TABLES `dispatch` WRITE;
/*!40000 ALTER TABLE `dispatch` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dondelivery`
--

DROP TABLE IF EXISTS `dondelivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dondelivery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tatimpcolumn` varchar(150) NOT NULL,
  `days` varchar(50) NOT NULL,
  `hours` varchar(50) NOT NULL,
  `minutes` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store TAT of dondelivery';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dondelivery`
--

LOCK TABLES `dondelivery` WRITE;
/*!40000 ALTER TABLE `dondelivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `dondelivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(150) NOT NULL,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `employees_ibfk_1` (`orgcode`,`orgname`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`orgcode`, `orgname`) REFERENCES `users` (`orgcode`, `orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('hemang@executive','12345','seawave@2323','Seawave Forwarding Logistics',1,'Hemang Ranjan','executive'),('rishi@manager','345345','seawave@2323','Seawave Forwarding Logistics',2,'Rishi Mishra','manager'),('aayush@manager','12345','seawave@2323','Seawave Forwarding Logistics',3,'Aayush Mishra','manager'),('shreyash@executive','12345','seawave@2323','Seawave Forwarding Logistics',4,'Shreyash Pingle','executive'),('gautam @Sales','12345','seawave@2323','Seawave Forwarding Logistics',5,'Gautam Gambhir','Sales'),('Dog@Developer','1212','seawave@2323','Seawave Forwarding Logistics',6,'Doggy Molly','Developer'),('ggfhg@Sales','123123','seawave@2323','Seawave Forwarding Logistics',7,'ggfhg fhdf','Sales'),('prince@Developer','12345','seawave@2323','Seawave Forwarding Logistics',8,'prince solanki','Developer');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expgeneral`
--

DROP TABLE IF EXISTS `expgeneral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expgeneral` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exportername` varchar(150) NOT NULL,
  `address` varchar(200) NOT NULL,
  `GST` varchar(50) NOT NULL,
  `IEC` varchar(50) NOT NULL,
  `finaldestination` varchar(50) NOT NULL,
  `portofshipment` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `jobowner` varchar(50) NOT NULL,
  `jobnumber` varchar(50) NOT NULL,
  `branchname` varchar(50) NOT NULL,
  `branchnameofjob` varchar(150) NOT NULL,
  `branchcodeofjob` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_number` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store the general component data ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expgeneral`
--

LOCK TABLES `expgeneral` WRITE;
/*!40000 ALTER TABLE `expgeneral` DISABLE KEYS */;
INSERT INTO `expgeneral` VALUES (10,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','dgg','gfg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/E/Raxaul/24-25/1','Mumbai','Raxaul','Raxaul-2323'),(14,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','gdgfg','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/E/24-25/7','Thane','Mumbai','Mumbai-2323'),(16,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','gdgfg','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/E/24-25/7','Thane','Mumbai','Mumbai-2323'),(17,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Mumbai/E/24-25/8','Mumbai','Mumbai','Mumbai-2323'),(18,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','fgdg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','S/Mumbai/E/24-25/9','Thane','Mumbai','Mumbai-2323'),(19,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Mumbai/E/24-25/8','Mumbai','Mumbai','Mumbai-2323'),(20,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','fgdg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','S/Mumbai/E/24-25/9','Thane','Mumbai','Mumbai-2323'),(21,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/E/24-25/10','Thane','Mumbai','Mumbai-2323'),(22,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','dgg','gfg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/E/Raxaul/24-25/1','Mumbai','Raxaul','Raxaul-2323'),(23,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/E/24-25/10','Thane','Mumbai','Mumbai-2323'),(24,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','dffsd','sdfsd','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/1/24-25','Thane','Delhi','Delhi-2323'),(25,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','dffsd','sdfsd','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/1/24-25','Thane','Delhi','Delhi-2323'),(26,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','hfgh','hfgh','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/25/24-25','Thane','Delhi','Delhi-2323'),(27,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/1/24-25','Mumbai','Delhi','Delhi-2323'),(28,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/25/24-25','Mumbai','Delhi','Delhi-2323'),(29,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/24-25/25','Mumbai','Delhi','Delhi-2323'),(30,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','dgdg','gdgdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/E/24-25/1','Mumbai','Delhi','Delhi-2323'),(31,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','sff','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/E/24-25/2','Thane','Delhi','Delhi-2323'),(32,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/24-25/3','Thane','Delhi','Delhi-2323'),(33,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','gdfg','fdgdfg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/24-25/4','Mumbai','Delhi','Delhi-2323'),(34,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/24-25','Mumbai','Delhi','Delhi-2323'),(35,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/24-25','Mumbai','Delhi','Delhi-2323'),(36,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','','Mumbai','Delhi','Delhi-2323'),(37,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfshf','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/E/24-25','Mumbai','Delhi','Delhi-2323'),(38,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','afffgggf','3445','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/24-25/1','Mumbai','Delhi','Delhi-2323'),(39,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','afffgggf','fdsggf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/24-25/2','Thane','Delhi','Delhi-2323'),(40,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/E/A/24-25/1','Thane','Kolkata','Kolkata-2323'),(41,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/E/2/A/24-25','Mumbai','Kolkata','Kolkata-2323'),(42,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/E/1/S/24-25','Mumbai','Kolkata','Kolkata-2323'),(43,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','pune','3445','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/E/25/A/24-25','Mumbai','Kolkata','Kolkata-2323'),(44,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','gdgdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/E/1/24-25','Mumbai','Delhi','Delhi-2323'),(45,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','dgdg','gdgdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/E/25/24-25','Thane','Delhi','Delhi-2323'),(46,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','ffds','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/E/1/A/24-25','Thane','Kolkata','Kolkata-2323'),(47,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/E/25/A/24-25','Mumbai','Kolkata','Kolkata-2323'),(48,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/E/1/A/24-25','Thane','Kolkata','Kolkata-2323'),(49,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/E/25/A/24-25','Mumbai','Kolkata','Kolkata-2323'),(50,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Thane','Kolkata','Kolkata-2323'),(51,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/25/24-25','Mumbai','Kolkata','Kolkata-2323'),(52,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/25/24-25','Thane','Kolkata','Kolkata-2323'),(53,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfdf vsd','dfsdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Mumbai','Kolkata','Kolkata-2323'),(54,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/25/24-25','Thane','Kolkata','Kolkata-2323'),(55,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/2/24-25','Mumbai','Kolkata','Kolkata-2323'),(56,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/2/24-25','Mumbai','Kolkata','Kolkata-2323'),(57,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','fsdf','fsdff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Thane','Kolkata','Kolkata-2323'),(58,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/2/24-25','Thane','Kolkata','Kolkata-2323'),(59,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','hd\\sjh','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/2/24-25','Mumbai','Kolkata','Kolkata-2323'),(60,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','/1','Mumbai','Kolkata','Kolkata-2323'),(61,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','/1','Mumbai','Kolkata','Kolkata-2323'),(62,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Thane','Kolkata','Kolkata-2323'),(63,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Thane','Kolkata','Kolkata-2323'),(64,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/25/24-25','Mumbai','Kolkata','Kolkata-2323'),(65,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','/1','Mumbai','Kolkata','Kolkata-2323'),(66,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','/1','Thane','Kolkata','Kolkata-2323'),(67,'','','','','','','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/2/E/Air/24-25','','Kolkata','Kolkata-2323'),(68,'','','','','','','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/2/E/Air/24-25','','Kolkata','Kolkata-2323'),(69,'','','','','','','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/1/E/Air/24-25','','Kolkata','Kolkata-2323'),(70,'','','','','','','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/2/E/Air/24-25','','Kolkata','Kolkata-2323'),(71,'','','','','','','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/2/E/Air/24-25','','Kolkata','Kolkata-2323'),(72,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/2/E/Air/24-25','Mumbai','Kolkata','Kolkata-2323'),(73,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','fgsgsdf','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/1/E/Air/24-25','Thane','Kolkata','Kolkata-2323'),(74,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/2/E/Air/24-25','Mumbai','Kolkata','Kolkata-2323'),(75,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/2/E/Air/24-25','Mumbai','Kolkata','Kolkata-2323'),(76,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/1/E/Air/24-25','Thane','Kolkata','Kolkata-2323'),(77,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','/1','Thane','Kolkata','Kolkata-2323'),(78,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','/1','Thane','Kolkata','Kolkata-2323'),(79,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/25/24-25','Thane','Kolkata','Kolkata-2323'),(80,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/S/E/25/24-25','Mumbai','Kolkata','Kolkata-2323'),(81,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','','Thane','Kolkata','Kolkata-2323'),(82,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','','Mumbai','Kolkata','Kolkata-2323'),(83,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','ffds','hd\\sjh','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Thane','Kolkata','Kolkata-2323'),(84,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/25/24-25','Mumbai','Kolkata','Kolkata-2323'),(85,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/25/24-25','Thane','Kolkata','Kolkata-2323'),(86,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Mumbai','Kolkata','Kolkata-2323'),(87,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/S/E/25/24-25','Mumbai','Kolkata','Kolkata-2323'),(88,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Mumbai','Kolkata','Kolkata-2323'),(89,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/11/24-25','Thane','Kolkata','Kolkata-2323'),(90,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','df','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/111/24-25','Mumbai','Kolkata','Kolkata-2323'),(91,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','56','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Mumbai','Kolkata','Kolkata-2323'),(92,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/2/24-25','Thane','Kolkata','Kolkata-2323'),(93,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','gdfgf ','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/S/E/3/24-25','Thane','Kolkata','Kolkata-2323'),(94,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','56','fgdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/1/24-25','Mumbai','Kolkata','Kolkata-2323'),(95,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/2/24-25','Thane','Kolkata','Kolkata-2323'),(96,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','kttttt','gdfgf ','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/S/E/3/24-25','Thane','Kolkata','Kolkata-2323'),(97,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','delhi','fdsf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/1/24-25','Mumbai','Delhi','Delhi-2323'),(98,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sdfsdf','dffsdfs','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/2/24-25','Thane','Delhi','Delhi-2323'),(99,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sdfsdf','dffsdfs','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/2/24-25','Thane','Delhi','Delhi-2323'),(100,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','delhi','fdsf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/E/1/24-25','Mumbai','Delhi','Delhi-2323'),(101,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','S/Mumbai/E/1/24-25','Thane','Mumbai','Mumbai-2323'),(102,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','S/Mumbai/E/1/24-25','Thane','Mumbai','Mumbai-2323'),(103,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/E/2/24-25','Thane','Mumbai','Mumbai-2323'),(104,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/E/2/24-25','Thane','Mumbai','Mumbai-2323'),(105,'Ritesh Pathak LLP','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/A/E/4/24-25','Thane','Kolkata','Kolkata-2323'),(106,'Ritesh Pathak LLP','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/A/E/5/24-25','Thane','Kolkata','Kolkata-2323'),(107,'Ritesh Pathak LLP','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/A/E/5/24-25','Thane','Kolkata','Kolkata-2323'),(108,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/6/24-25','Thane','Kolkata','Kolkata-2323'),(109,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/E/6/24-25','Thane','Kolkata','Kolkata-2323'),(110,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/E/3/24-25','Thane','Delhi','Delhi-2323'),(111,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/E/3/24-25','Thane','Delhi','Delhi-2323');
/*!40000 ALTER TABLE `expgeneral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expjobcreation`
--

DROP TABLE IF EXISTS `expjobcreation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expjobcreation` (
  `jobnumber` varchar(50) NOT NULL,
  `jobdate` datetime NOT NULL,
  `docreceivedon` datetime NOT NULL,
  `transportmode` varchar(45) NOT NULL DEFAULT '0',
  `customhouse` varchar(45) NOT NULL DEFAULT '0',
  `ownbooking` varchar(45) NOT NULL DEFAULT '0',
  `deliverymode` varchar(45) NOT NULL DEFAULT '0',
  `noofcontainer` int NOT NULL DEFAULT '0',
  `owntransportation` varchar(45) NOT NULL DEFAULT '0',
  `betype` varchar(45) NOT NULL DEFAULT '0',
  `consignmenttype` varchar(45) NOT NULL DEFAULT '0',
  `cfsname` varchar(45) NOT NULL DEFAULT '0',
  `shippinglinename` varchar(45) NOT NULL DEFAULT '0',
  `bltype` varchar(45) NOT NULL DEFAULT '0',
  `bltypenum` varchar(45) NOT NULL DEFAULT '0',
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `jobowner` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `freedays` int NOT NULL,
  `blstatus` varchar(50) NOT NULL,
  `benumber` varchar(50) NOT NULL,
  `shippinglinebond` varchar(50) NOT NULL,
  `count` int NOT NULL,
  `branchname` varchar(150) NOT NULL,
  `branchcode` varchar(150) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_jobnumber` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in export will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expjobcreation`
--

LOCK TABLES `expjobcreation` WRITE;
/*!40000 ALTER TABLE `expjobcreation` DISABLE KEYS */;
INSERT INTO `expjobcreation` VALUES ('Kolkata/A/E/1/24-25','2024-10-01 16:43:00','2024-10-02 16:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','HBL/HAWB','jhokd','Seawave Forwarding Logistics','seawave@2323','aayush@manager',1,2,'Surrender','5544446','Yearly',1,'Kolkata','Kolkata-2323',0),('Kolkata/A/E/2/24-25','2024-10-01 16:44:00','2024-10-04 16:44:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dasd1g654','dumpy45','MBL/MAWB','tfgdge','Seawave Forwarding Logistics','seawave@2323','aayush@manager',2,2,'Surrender','5544446','Yearly',2,'Kolkata','Kolkata-2323',0),('Kolkata/S/E/3/24-25','2024-10-01 16:45:00','2024-10-24 16:45:00','Sea','Kolkata Sea','Yes','Loaded',1,'Yes','Home','FCL','dasd1g654','dumpy45','HBL/HAWB','tfgdge','Seawave Forwarding Logistics','seawave@2323','aayush@manager',3,2,'Surrender','5544446','Yearly',3,'Kolkata','Kolkata-2323',0),('A/Delhi/E/2/24-25','2024-10-01 17:24:00','2024-10-02 17:23:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','fdgfgfgdf','dfggfdg','MBL/MAWB','fdffgdgf','Seawave Forwarding Logistics','seawave@2323','hemang@executive',4,2,'Surrender','345345','Yearly',2,'Delhi','Delhi-2323',0),('A/Delhi/E/1/24-25','2024-10-01 17:23:00','2024-10-03 17:22:00','Air','Mumbai Sea','','',2,'Yes','Home','FCL','dummy67','dummy67','HBL/HAWB','gfdgdg','Seawave Forwarding Logistics','seawave@2323','hemang@executive',5,2,'Surrender','453453','OneTime',1,'Delhi','Delhi-2323',0),('S/Mumbai/E/1/24-25','2024-10-03 11:00:00','2024-10-02 11:00:00','Sea','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dasd1g654','f1s61g1s1','HBL/HAWB','afa4g6464','Seawave Forwarding Logistics','seawave@2323','aayush@manager',6,2,'Surrender','5544446','OneTime',1,'Mumbai','Mumbai-2323',0),('A/Mumbai/E/2/24-25','2024-10-03 11:54:00','2024-10-02 11:54:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','MBL/MAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',7,2,'Surrender','5345345','Yearly',2,'Mumbai','Mumbai-2323',0),('Kolkata/A/E/5/24-25','2024-10-04 16:12:00','2024-10-03 16:12:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',8,2,'Surrender','23','Yearly',5,'Kolkata','Kolkata-2323',0),('Kolkata/A/E/6/24-25','2024-10-04 16:37:00','2024-10-02 16:37:00','Air','Mumbai Sea','Yes','Destuff',2,'No','Ex-Bond','FCL','dummy45','dumpy45','HBL/HAWB','jhokd','Seawave Forwarding Logistics','seawave@2323','aayush@manager',9,2,'Surrender','5544446','Yearly',6,'Kolkata','Kolkata-2323',0),('A/Delhi/E/3/24-25','2024-10-07 17:35:00','2024-10-05 17:34:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','HSOOO','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',10,2,'Surrender','23243','Yearly',3,'Delhi','Delhi-2323',0);
/*!40000 ALTER TABLE `expjobcreation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expnotifications`
--

DROP TABLE IF EXISTS `expnotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expnotifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(50) NOT NULL,
  `exportername` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) NOT NULL,
  `approvername` json NOT NULL,
  `timeofreading` json NOT NULL,
  `reading` json NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store export notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expnotifications`
--

LOCK TABLES `expnotifications` WRITE;
/*!40000 ALTER TABLE `expnotifications` DISABLE KEYS */;
INSERT INTO `expnotifications` VALUES (1,'Kolkata/A/E/1/24-25','C CONNECT LOGGI','2024-10-01 16:44:08','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-01 16:49:36\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-01 16:49:23\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','aayush@manager'),(2,'Kolkata/A/E/2/24-25','Highland Residency','2024-10-01 16:44:52','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-01 16:49:38\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-01 16:49:25\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','aayush@manager'),(3,'Kolkata/S/E/3/24-25','Highland Residency','2024-10-01 16:45:39','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-01 16:49:39\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-01 16:49:26\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','aayush@manager'),(4,'A/Delhi/E/1/24-25','Allcargo Pvt Ltd','2024-10-01 17:23:17','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 17:25:11\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-10-01 17:25:02\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','hemang@executive'),(5,'A/Delhi/E/2/24-25','Ritesh Pathak LLP','2024-10-01 17:24:35','JobsButton','Thane','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 17:25:09\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-10-01 17:25:00\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','hemang@executive'),(6,'S/Mumbai/E/1/24-25','Ritesh Pathak LLP','2024-10-03 11:01:06','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 11:01:37\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 11:01:18\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(7,'A/Mumbai/E/2/24-25','Highland Residency','2024-10-03 11:54:49','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 12:01:19\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 12:01:04\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(8,'Kolkata/A/E/4/24-25','Ritesh Pathak LLP','2024-10-04 16:12:14','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 16:12:32\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','admin'),(9,'Kolkata/A/E/5/24-25','Ritesh Pathak LLP','2024-10-04 16:12:17','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 16:12:43\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-04 16:13:29\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','admin'),(10,'Kolkata/A/E/6/24-25','Highland Residency','2024-10-04 16:37:38','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 16:47:12\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-04 16:37:51\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','aayush@manager'),(11,'A/Delhi/E/3/24-25','Highland Residency','2024-10-07 17:35:32','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-07 17:36:10\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-07 17:36:52\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin');
/*!40000 ALTER TABLE `expnotifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exportaccess`
--

DROP TABLE IF EXISTS `exportaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exportaccess` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(50) NOT NULL,
  `rowname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is access of export for people';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exportaccess`
--

LOCK TABLES `exportaccess` WRITE;
/*!40000 ALTER TABLE `exportaccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `exportaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impgeneral`
--

DROP TABLE IF EXISTS `impgeneral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impgeneral` (
  `id` int NOT NULL AUTO_INCREMENT,
  `importername` varchar(150) NOT NULL,
  `address` varchar(300) NOT NULL,
  `GST` varchar(50) NOT NULL,
  `IEC` varchar(50) NOT NULL,
  `finaldestination` varchar(50) NOT NULL,
  `portofshipment` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `jobowner` varchar(50) NOT NULL,
  `jobnumber` varchar(50) NOT NULL,
  `branchname` varchar(50) NOT NULL,
  `branchnameofjob` varchar(150) NOT NULL,
  `branchcodeofjob` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job_number` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store the general component data ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impgeneral`
--

LOCK TABLES `impgeneral` WRITE;
/*!40000 ALTER TABLE `impgeneral` DISABLE KEYS */;
INSERT INTO `impgeneral` VALUES (31,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','ffds','dffdf','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/6','Mumbai','Mumbai','Mumbai-2323'),(36,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','ffds','dffdf','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/11','Mumbai','Mumbai','Mumbai-2323'),(37,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','ffds','dffdf','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/12','Mumbai','Mumbai','Mumbai-2323'),(38,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','ffds','dffdf','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/13','Mumbai','Mumbai','Mumbai-2323'),(39,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','ffds','dffdf','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/14','Mumbai','Mumbai','Mumbai-2323'),(54,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/11','Thane','Mumbai','Mumbai-2323'),(59,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/11','Thane','Mumbai','Mumbai-2323'),(60,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sdff','fsfsf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Mumbai/I/24-25/2','Thane','Mumbai','Mumbai-2323'),(61,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','fgdgf','dgd','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/24-25/4','Thane','Mumbai','Mumbai-2323'),(62,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','dfgg','ggf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/24-25/5','Thane','Mumbai','Mumbai-2323'),(63,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','gdfgdf','gfgg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','S/Mumbai/I/24-25/6','Thane','Mumbai','Mumbai-2323'),(64,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/7','Thane','Mumbai','Mumbai-2323'),(65,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/8','Thane','Mumbai','Mumbai-2323'),(66,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/9','Thane','Mumbai','Mumbai-2323'),(67,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/10','Thane','Mumbai','Mumbai-2323'),(68,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','dfgfd','gfgfdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/11','Thane','Mumbai','Mumbai-2323'),(71,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','gdgf','gdfgf ','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/24-25/12','Thane','Mumbai','Mumbai-2323'),(72,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/24-25/13','Thane','Mumbai','Mumbai-2323'),(73,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','dffdf','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/24-25/13','Thane','Mumbai','Mumbai-2323'),(74,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','fsdfdf','dfsfdsf ','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Mumbai/I/24-25/14','Mumbai','Mumbai','Mumbai-2323'),(75,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','fsdfdf','dfsfdsf ','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Mumbai/I/24-25/14','Mumbai','Mumbai','Mumbai-2323'),(76,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','fsdfd','esdf','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/15','Thane','Mumbai','Mumbai-2323'),(77,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','fsdfd','esdf','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/15','Thane','Mumbai','Mumbai-2323'),(78,'Prince LLP','Highland Residency\nBougainvillea','27FXFPM6685A1Z4','FXFPM6685A','dgdg','gdgdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/16','juinagar','Mumbai','Mumbai-2323'),(79,'Prince LLP','Highland Residency\nBougainvillea','27FXFPM6685A1Z4','FXFPM6685A','dgdg','gdgdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/24-25/16','juinagar','Mumbai','Mumbai-2323'),(80,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','mumbai','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/24-25/17','Mumbai','Mumbai','Mumbai-2323'),(81,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfsfdfs','mumbai','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/24-25/17','Mumbai','Mumbai','Mumbai-2323'),(82,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','fgdg','hdh','Seawave Forwarding Logistics','seawave@2323','admin','Jogbani/A/24-25/I/1','Thane','Jogbani','Jogbani-2323'),(83,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','fsdf','sf','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/24-25/1','Mumbai','Delhi','Delhi-2323'),(84,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','fsdf','sf','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/24-25/1','Mumbai','Delhi','Delhi-2323'),(85,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','afffgggf','qwsa','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/I/24-25/2','Mumbai','Delhi','Delhi-2323'),(86,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','afffgggf','qwsa','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/I/24-25/2','Mumbai','Delhi','Delhi-2323'),(87,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','sdff','fsf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/I/24-25','Thane','Delhi','Delhi-2323'),(88,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','thfhrth','thfhthr','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/25/24-25/25','Thane','Delhi','Delhi-2323'),(89,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','gdgf','dfgdf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/I/26/24-25','Thane','Delhi','Delhi-2323'),(90,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','gdgf','dfgdf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Delhi/I/26/24-25','Thane','Delhi','Delhi-2323'),(91,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','sfsfdfs','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/I/25/24-25','Thane','Delhi','Delhi-2323'),(92,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','ffds','sff','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Delhi/I/25/24-25','Mumbai','Delhi','Delhi-2323'),(93,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','trettdg','ettretffg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','/3','Thane','Delhi','undefined'),(94,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfdfs','gdgdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/24-25/3','Mumbai','Delhi','Delhi-2323'),(95,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/4/24-25','Thane','Delhi','Delhi-2323'),(96,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/4/24-25','Thane','Delhi','Delhi-2323'),(97,'Highland Residency','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/I/1/A/24-25','Thane','Kolkata','Kolkata-2323'),(98,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','pune','3445','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/I/25/A/24-25','Mumbai','Kolkata','Kolkata-2323'),(99,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','pune','aass','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/24-25/26','Mumbai','Kolkata','Kolkata-2323'),(100,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','sderrr','345','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/24-25/1','Mumbai','Kolkata','Kolkata-2323'),(101,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sderrr','fgdg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/2/24-25','Mumbai','Kolkata','Kolkata-2323'),(102,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','dfsfdf','fgdg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/S/I/3/24-25','Mumbai','Kolkata','Kolkata-2323'),(103,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','dfsfdf','fgdg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/S/I/3/24-25','Mumbai','Kolkata','Kolkata-2323'),(104,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sderrr','fgdg','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/2/24-25','Mumbai','Kolkata','Kolkata-2323'),(105,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/1/24-25','Mumbai','Delhi','Delhi-2323'),(106,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/2/24-25','Mumbai','Delhi','Delhi-2323'),(107,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/3/24-25','Mumbai','Delhi','Delhi-2323'),(108,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/4/24-25','Mumbai','Delhi','Delhi-2323'),(109,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/3/24-25','Mumbai','Delhi','Delhi-2323'),(110,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/4/24-25','Mumbai','Delhi','Delhi-2323'),(111,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/2/24-25','Mumbai','Delhi','Delhi-2323'),(112,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Delhi/I/1/24-25','Mumbai','Delhi','Delhi-2323'),(113,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','sfdfs','gdgdg','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/10/24-25','Mumbai','Mumbai','Mumbai-2323'),(114,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','fsf','fsdf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Mumbai/I/10/24-25','Mumbai','Mumbai','Mumbai-2323'),(115,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','pune','3445','Seawave Forwarding Logistics','seawave@2323','hemang@executive','A/Mumbai/I/1/24-25','Mumbai','Mumbai','Mumbai-2323'),(116,'C CONNECT LOGGI','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','27ABCPP1234P1Z5','ABCPP1234P','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/1/24-25','Mumbai','Mumbai','Mumbai-2323'),(117,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/10/24-25','Mumbai','Mumbai','Mumbai-2323'),(118,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','kttttt','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','A/Mumbai/I/10/24-25','Mumbai','Mumbai','Mumbai-2323'),(119,'Allcargo Pvt Ltd','1/35454','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/10/24-25','Mumbai','Mumbai','Mumbai-2323'),(120,'Ritesh Pathak LLP','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','27AAICS7836D1Z4','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','A/Mumbai/I/10/24-25','Thane','Mumbai','Mumbai-2323'),(121,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','dsd','dsfj','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/4/24-25','Thane','Kolkata','Kolkata-2323'),(122,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','sfsfdfs','gfgfdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager','Kolkata/A/I/5/24-25','Thane','Kolkata','Kolkata-2323'),(123,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','dsd','dsfj','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/4/24-25','Thane','Kolkata','Kolkata-2323'),(124,'C CONNECT LOGGI','123 Main Street ','27ABCDE1234F1Z5','1234567890','fafsd','dgf','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/6/24-25','Mumbai','Kolkata','Kolkata-2323'),(125,'Allcargo Pvt Ltd','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/A/I/7/24-25','Mumbai','Kolkata','Kolkata-2323'),(126,'Allcargo Pvt Ltd','123 Main Street','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/A/I/7/24-25','Mumbai','Kolkata','Kolkata-2323'),(127,'C CONNECT LOGGI','123 Main Street ','27ABCDE1234F1Z5','1234567890','fasfasf','jdhsfhj ','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Kolkata/A/I/8/24-25','Mumbai','Kolkata','Kolkata-2323'),(128,'Highland Residency','dasdhd dashda ahsdsjdb ','27ABCDE1234F1Z5','1234567890','JOGBANI LCS','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','admin','Kolkata/A/I/9/24-25','Thane','Kolkata','Kolkata-2323');
/*!40000 ALTER TABLE `impgeneral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impjobcreation`
--

DROP TABLE IF EXISTS `impjobcreation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impjobcreation` (
  `jobnumber` varchar(50) NOT NULL,
  `jobdate` datetime NOT NULL,
  `docreceivedon` datetime NOT NULL,
  `transportmode` varchar(45) NOT NULL DEFAULT '0',
  `customhouse` varchar(45) NOT NULL DEFAULT '0',
  `ownbooking` varchar(45) NOT NULL DEFAULT '0',
  `deliverymode` varchar(45) NOT NULL DEFAULT '0',
  `noofcontainer` int NOT NULL DEFAULT '0',
  `owntransportation` varchar(45) NOT NULL DEFAULT '0',
  `betype` varchar(45) NOT NULL DEFAULT '0',
  `consignmenttype` varchar(45) NOT NULL DEFAULT '0',
  `cfsname` varchar(45) NOT NULL DEFAULT '0',
  `shippinglinename` varchar(45) NOT NULL DEFAULT '0',
  `bltype` varchar(45) NOT NULL DEFAULT '0',
  `bltypenum` varchar(45) NOT NULL DEFAULT '0',
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `jobowner` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `freedays` int NOT NULL,
  `blstatus` varchar(50) NOT NULL,
  `benumber` varchar(50) NOT NULL,
  `shippinglinebond` varchar(50) NOT NULL,
  `count` int NOT NULL,
  `branchname` varchar(150) NOT NULL,
  `branchcode` varchar(150) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_jobnumber` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in import will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impjobcreation`
--

LOCK TABLES `impjobcreation` WRITE;
/*!40000 ALTER TABLE `impjobcreation` DISABLE KEYS */;
INSERT INTO `impjobcreation` VALUES ('A/Mumbai/I/24-25/2','2024-09-24 12:28:00','2024-09-23 12:27:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive',1,1,'Surrender','466645','Yearly',2,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/4','2024-09-24 14:32:00','2024-09-23 14:31:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Ex-Bond','LCL','fggfgf','ggdhh','HBL/HAWB','dfggd','Seawave Forwarding Logistics','seawave@2323','aayush@manager',2,2,'Surrender','345354','Yearly',4,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/5','2024-09-24 14:33:00','2024-09-23 14:32:00','Air','Kolkata Sea','Yes','Loaded',3,'Yes','Home','FCL','fgdg','gdfgfdg','MBL/MAWB','dfggdgd','Seawave Forwarding Logistics','seawave@2323','aayush@manager',3,1,'Surrender','5345','Yearly',5,'Mumbai','Mumbai-2323',0),('S/Mumbai/I/24-25/6','2024-09-24 14:34:00','2024-09-23 14:33:00','Sea','Mumbai Sea','Yes','Loaded',3,'Yes','Home','FCL','gfhfh','hfhgh','HBL/HAWB','ggdg','Seawave Forwarding Logistics','seawave@2323','aayush@manager',4,2,'Surrender','466445','Yearly',6,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/7','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin',5,2,'Surrender','23','Yearly',7,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/8','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin',6,2,'Surrender','23','Yearly',8,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/9','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin',7,2,'Surrender','23','Yearly',9,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/10','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin',8,2,'Surrender','23','Yearly',10,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/11','2024-09-24 15:43:00','2024-09-23 15:43:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dgdg','gdggf','HBL/HAWB','gdggf','Seawave Forwarding Logistics','seawave@2323','admin',9,2,'Surrender','23','Yearly',11,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/1','2024-09-24 12:28:00','2024-09-23 12:27:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy62','dummy67','HBL/HAWB','dummy62','Seawave Forwarding Logistics','seawave@2323','hemang@executive',10,1,'Surrender','466645','Yearly',1,'Mumbai','Mumbai-2323',1),('A/Mumbai/I/24-25/3','2024-09-24 12:28:00','2024-09-23 12:27:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive',11,1,'Surrender','466645','Yearly',3,'Mumbai','Mumbai-2323',1),('A/Mumbai/I/24-25/13','2024-09-28 14:24:00','2024-09-27 14:23:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','MBL/MAWB','jhokd','Seawave Forwarding Logistics','seawave@2323','aayush@manager',12,2,'Original','54346','OneTime',13,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/14','2024-09-28 15:10:00','2024-09-24 15:10:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','LCL','gdfg f','dumpy45','HBL/HAWB','dsfsdffs','Seawave Forwarding Logistics','seawave@2323','hemang@executive',13,2,'Original','35434','Yearly',14,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/15','2024-09-30 11:23:00','2024-09-29 11:22:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','sfdsf','fdffs','HBL/HAWB','dgfdsgsg','Seawave Forwarding Logistics','seawave@2323','admin',14,2,'Surrender','223423','Yearly',15,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/16','2024-09-30 12:00:00','2024-09-29 12:00:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','In-Bond','FCL','AOOC','HSOOO','MBL/MAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',15,2,'Surrender','5345345','Yearly',16,'Mumbai','Mumbai-2323',0),('A/Mumbai/I/24-25/17','2024-09-30 12:21:00','2024-09-27 12:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','In-Bond','FCL','dummy45','dumpy45','HBL/HAWB','jhokd','Seawave Forwarding Logistics','seawave@2323','aayush@manager',16,1,'Surrender','23','Yearly',17,'Mumbai','Mumbai-2323',0),('Kolkata/S/I/3/24-25','2024-10-01 17:09:00','2024-10-04 17:09:00','Sea','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive',21,2,'Surrender','453453','Yearly',3,'Kolkata','Kolkata-2323',0),('Kolkata/A/I/2/24-25','2024-10-01 17:08:00','2024-10-03 17:07:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy67','dummy67','MBL/MAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive',22,2,'Original','32234','Yearly',2,'Kolkata','Kolkata-2323',0),('A/Delhi/I/3/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',23,2,'Surrender','23','Yearly',3,'Delhi','Delhi-2323',0),('A/Delhi/I/4/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',24,2,'Surrender','23','Yearly',4,'Delhi','Delhi-2323',0),('A/Delhi/I/2/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',25,2,'Surrender','23','Yearly',2,'Delhi','Delhi-2323',0),('A/Delhi/I/1/24-25','2024-10-01 17:20:00','2024-10-03 17:20:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','AOOC','dsfsdf','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',26,2,'Surrender','23','Yearly',1,'Delhi','Delhi-2323',0),('Kolkata/A/I/4/24-25','2024-10-03 17:21:00','2024-10-02 17:20:00','Air','Mumbai Sea','Yes','Loaded',3,'Yes','Home','FCL','dummy67','dummy67','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','hemang@executive',27,2,'Surrender','453453','Yearly',4,'Kolkata','Kolkata-2323',0),('Kolkata/A/I/7/24-25','2024-10-04 16:05:00','2024-10-18 16:05:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','In-Bond','FCL','AOOC','HSOOO','HBL/HAWB','ddddgf','Seawave Forwarding Logistics','seawave@2323','admin',28,2,'Surrender','23','Yearly',7,'Kolkata','Kolkata-2323',0);
/*!40000 ALTER TABLE `impjobcreation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impnotifications`
--

DROP TABLE IF EXISTS `impnotifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impnotifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(50) NOT NULL,
  `importername` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) NOT NULL,
  `approvername` json NOT NULL,
  `timeofreading` json NOT NULL,
  `reading` json NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store import notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impnotifications`
--

LOCK TABLES `impnotifications` WRITE;
/*!40000 ALTER TABLE `impnotifications` DISABLE KEYS */;
INSERT INTO `impnotifications` VALUES (1,'A/Mumbai/I/24-25/12','Highland Residency','2024-09-28 13:06:45','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-09-28 13:13:41\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(2,'A/Mumbai/I/24-25/13','Highland Residency','2024-09-28 14:24:24','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-28 15:07:23\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-09-28 15:04:59\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(3,'A/Mumbai/I/24-25/14','C CONNECT LOGGI','2024-09-28 15:10:43','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-28 16:01:12\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-09-28 16:24:29\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','hemang@executive'),(4,'A/Mumbai/I/24-25/15','Ritesh Pathak LLP','2024-09-30 11:23:22','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-30 11:24:52\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-09-30 11:24:07\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(5,'A/Mumbai/I/24-25/16','Prince LLP','2024-09-30 12:00:45','JobsButton','juinagar','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-30 12:00:52\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-09-30 12:01:02\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(6,'A/Mumbai/I/24-25/17','C CONNECT LOGGI','2024-09-30 12:21:21','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-30 12:21:44\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-09-30 12:21:37\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(7,'Jogbani/A/24-25/I/1','Highland Residency','2024-09-30 14:53:39','JobsButton','Thane','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Jogbani','Jogbani-2323','admin'),(8,'A/Delhi/I/24-25/1','C CONNECT LOGGI','2024-09-30 15:03:11','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-09-30 15:13:04\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-09-30 15:13:19\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(9,'A/Delhi/I/24-25/2','C CONNECT LOGGI','2024-09-30 15:15:18','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-09-30 15:15:53\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-09-30 15:15:32\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','hemang@executive'),(10,'A/Delhi/I/24-25','Ritesh Pathak LLP','2024-09-30 16:15:26','JobsButton','Thane','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-09-30 16:27:21\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','hemang@executive'),(11,'A/Delhi/I/25/24-25/25','Highland Residency','2024-09-30 16:24:52','JobsButton','Thane','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-09-30 16:27:18\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(12,'A/Delhi/I/26/24-25','Ritesh Pathak LLP','2024-09-30 16:26:20','JobsButton','Thane','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-09-30 16:27:42\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-09-30 16:27:25\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','hemang@executive'),(13,'A/Delhi/I/25/24-25','Highland Residency','2024-09-30 17:01:21','JobsButton','Thane','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','aayush@manager'),(14,'A/Delhi/I/25/24-25','C CONNECT LOGGI','2024-09-30 17:07:04','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','aayush@manager'),(15,'/3','Highland Residency','2024-10-01 11:06:38','JobsButton','Thane','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Delhi','undefined','hemang@executive'),(16,'A/Delhi/I/24-25/3','C CONNECT LOGGI','2024-10-01 11:11:07','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 11:32:51\", \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(17,'A/Delhi/I/4/24-25','Highland Residency','2024-10-01 11:22:25','JobsButton','Thane','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 17:21:26\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-10-01 17:21:52\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(18,'Kolkata/I/1/A/24-25','Highland Residency','2024-10-01 11:56:21','JobsButton','Thane','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','admin'),(19,'Kolkata/I/25/A/24-25','Allcargo Pvt Ltd','2024-10-01 12:15:25','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-01 16:58:37\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(20,'Kolkata/A/I/24-25/26','Allcargo Pvt Ltd','2024-10-01 16:59:33','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 17:18:58\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 0, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(21,'Kolkata/A/I/24-25/1','Allcargo Pvt Ltd','2024-10-01 17:02:48','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-01 17:08:56\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(22,'Kolkata/A/I/2/24-25','C CONNECT LOGGI','2024-10-01 17:08:36','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-01 17:09:55\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-01 17:10:48\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(23,'Kolkata/S/I/3/24-25','C CONNECT LOGGI','2024-10-01 17:09:47','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-01 17:09:53\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-01 17:10:46\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(24,'A/Delhi/I/1/24-25','C CONNECT LOGGI','2024-10-01 17:20:56','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 17:21:30\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-10-01 17:21:56\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(25,'A/Delhi/I/2/24-25','C CONNECT LOGGI','2024-10-01 17:21:01','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 17:21:28\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-10-01 17:21:55\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(26,'A/Delhi/I/3/24-25','C CONNECT LOGGI','2024-10-01 17:21:04','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 17:21:22\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-10-01 17:21:50\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(27,'A/Delhi/I/4/24-25','C CONNECT LOGGI','2024-10-01 17:21:07','JobsButton','Mumbai','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2024-10-01 17:21:26\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-10-01 17:21:52\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Delhi','Delhi-2323','admin'),(28,'A/Mumbai/I/10/24-25','C CONNECT LOGGI','2024-10-01 17:36:06','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 11:35:23\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 12:00:39\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(29,'A/Mumbai/I/10/24-25','C CONNECT LOGGI','2024-10-03 11:13:26','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 11:35:23\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 12:00:39\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','hemang@executive'),(30,'A/Mumbai/I/1/24-25','C CONNECT LOGGI','2024-10-03 11:36:30','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 17:16:36\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 11:46:16\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 0, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','hemang@executive'),(31,'A/Mumbai/I/1/24-25','C CONNECT LOGGI','2024-10-03 11:42:50','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 17:16:36\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 11:46:16\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 0, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(32,'A/Mumbai/I/10/24-25','Allcargo Pvt Ltd','2024-10-03 11:48:19','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 11:35:23\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 12:00:39\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(33,'A/Mumbai/I/10/24-25','Allcargo Pvt Ltd','2024-10-03 11:48:23','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 11:35:23\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 12:00:39\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(34,'A/Mumbai/I/10/24-25','Allcargo Pvt Ltd','2024-10-03 11:52:52','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 11:35:23\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 12:00:39\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(35,'A/Mumbai/I/10/24-25','Ritesh Pathak LLP','2024-10-03 11:53:44','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 11:35:23\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 12:00:39\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(36,'Kolkata/A/I/4/24-25','Highland Residency','2024-10-03 17:21:27','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-03 17:40:03\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-03 17:39:06\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(37,'Kolkata/A/I/5/24-25','Highland Residency','2024-10-03 17:38:26','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 15:57:35\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','aayush@manager'),(38,'Kolkata/A/I/6/24-25','C CONNECT LOGGI','2024-10-04 15:57:11','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 16:03:43\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(39,'Kolkata/A/I/7/24-25','Allcargo Pvt Ltd','2024-10-04 16:05:42','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 16:05:58\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-04 16:31:17\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','admin'),(40,'Kolkata/A/I/8/24-25','C CONNECT LOGGI','2024-10-04 16:48:29','JobsButton','Mumbai','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 16:48:51\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','hemang@executive'),(41,'Kolkata/A/I/9/24-25','Highland Residency','2024-10-04 16:52:28','JobsButton','Thane','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-04 17:03:42\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-04 16:52:37\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Kolkata','Kolkata-2323','admin');
/*!40000 ALTER TABLE `impnotifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importaccess`
--

DROP TABLE IF EXISTS `importaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `importaccess` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(50) NOT NULL,
  `rowname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is access of import for people';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importaccess`
--

LOCK TABLES `importaccess` WRITE;
/*!40000 ALTER TABLE `importaccess` DISABLE KEYS */;
INSERT INTO `importaccess` VALUES (4,'E-Sanchit','E-Sanchit','hemangranjan'),(5,'Filling BOE','Filling BOE','hemangranjan'),(6,'ETA','ETA','hemangranjan'),(9,'Assesment','Assesment','hemangranjan'),(10,'Scrutiny','Scrutiny','rishi'),(11,'Scrutiny Document','Scrutiny Document','rishi@sales'),(12,'Port/CFS Nomination','Port/CFS Nomination','rishi@sales'),(31,'Port/CFS Nomination','Port/CFS Nomination','shreyash'),(32,'Checklist Approval','Checklist Approval','shreyash'),(36,'Duty Call','Duty Call','shreyash'),(37,'Examination/OOC','Examination/OOC','shreyash'),(40,'Scrutiny Document','Scrutiny Document','shreyash');
/*!40000 ALTER TABLE `importaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lob`
--

DROP TABLE IF EXISTS `lob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lob` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lobname` varchar(150) NOT NULL,
  `orgname` varchar(150) NOT NULL,
  `orgcode` varchar(150) NOT NULL,
  `transportmode` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='line of business table as per users prefrences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lob`
--

LOCK TABLES `lob` WRITE;
/*!40000 ALTER TABLE `lob` DISABLE KEYS */;
INSERT INTO `lob` VALUES (15,'Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Air'),(16,'Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Sea'),(17,'Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Air'),(18,'Sea EXPORT','Seawave Forwarding Logistics','seawave@2323','Sea');
/*!40000 ALTER TABLE `lob` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maildata`
--

DROP TABLE IF EXISTS `maildata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maildata` (
  `email` varchar(100) NOT NULL,
  `passcode` varchar(100) NOT NULL,
  `hours` varchar(10) NOT NULL,
  `minutes` varchar(10) NOT NULL,
  `orgname` varchar(150) NOT NULL,
  `orgcode` varchar(150) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the hours and minutes as well as the email and passcode';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maildata`
--

LOCK TABLES `maildata` WRITE;
/*!40000 ALTER TABLE `maildata` DISABLE KEYS */;
INSERT INTO `maildata` VALUES ('shreyashpingle752@gmail.com','vircbhwmcnqfinrb','02','19','Seawave Forwarding Logistics','seawave@2323',1),('shreyashpingle752@gmail.com','vircbhwmcnqfinrb','02','18','C Connect Logi','c@2102',3);
/*!40000 ALTER TABLE `maildata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milestone`
--

DROP TABLE IF EXISTS `milestone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milestone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `milestonename` varchar(150) NOT NULL,
  `lobname` varchar(150) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `ownbranchname` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the milestones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (49,'ETA','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(50,'E-SANCHIT','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(51,'PORT CFS NOMINATION','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(52,'processing','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(53,'ETA','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Delhi');
/*!40000 ALTER TABLE `milestone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `orgname` varchar(150) NOT NULL,
  `orgcode` varchar(150) NOT NULL,
  `address` varchar(200) NOT NULL,
  `clientname` varchar(100) NOT NULL,
  `country` varchar(50) NOT NULL,
  `state` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `alias` varchar(45) NOT NULL,
  `postalcode` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `PAN` varchar(50) NOT NULL,
  `GST` varchar(50) NOT NULL,
  `IEC` varchar(50) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `creditdays` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `uniquevalue` varchar(45) NOT NULL,
  `reading` json DEFAULT NULL,
  `timeofreading` json DEFAULT NULL,
  `approvername` json NOT NULL,
  `approvalid` int NOT NULL,
  `createdat` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store notifications and its data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment B-10-15 Sector-15 1:1','Digga D','India','Maharashtra','Navi Mumbai','digga','400703','2004263507','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','diggachigga','4','aayush@manager',1,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',1,'2024-06-05 15:31:43'),('Seawave Forwarding Logistics','seawave@2323','dfs','Gondya','dsf','dsf','df','gondya','345326','5645653232','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','gond','7','hemang@executive',2,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": \"2024-06-05 15\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',2,'2024-06-05 15:40:28'),('Seawave Forwarding Logistics','seawave@2323','1/35454','Allcargo Pvt Ltd','India','MH','THANE','allcargo','400705','8655997299','rm@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Mumbai','30','admin',3,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',3,'2024-09-02 15:05:01'),('Seawave Forwarding Logistics','seawave@2323','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','Ritesh Pathak LLP','India','Maharashtra','Navi Mumbai','ritesh','400705','9867612222','nkmishra@seawave.in','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Thane','21','admin',4,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-20 16\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',4,'2024-09-20 16:31:31'),('Seawave Forwarding Logistics','seawave@2323','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','Highland Residency','India','Maharashtra','THANE','highland','400607','8655919239','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Thane','31','admin',6,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}]',6,'2024-09-20 16:56:16'),('Seawave Forwarding Logistics','seawave@2323','Highland Residency\nBougainvillea','Prince LLP','India','Maharashtra','Thane','prince','400607','7045605056','aayushmishra@seawave.in','FXFPM6685A','27FXFPM6685A1Z4','FXFPM6685A','juinagar','31','aayush@manager',7,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}]',7,'2024-09-20 16:57:40'),('Seawave Forwarding Logistics','seawave@2323','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','C CONNECT LOGGI','India','MAHARASHTRA','THANE','c','400607','8655919239','rishi.seawave@gmail.com','ABCPP1234P','27ABCPP1234P1Z5','ABCPP1234P','Mumbai','31','admin',8,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',8,'2024-09-20 17:11:41'),('Seawave Forwarding Logistics','seawave@2323','dffddfsdf','dummy','india','maha','mum','dummy','400045','9156686985','sfdfg@gmail.com','','','','','','aayush@manager',9,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',9,'2024-09-24 17:52:45'),('Seawave Forwarding Logistics','seawave@2323','fdgdsg dgdgg','Vedant PVT LTD','India','MH','Navi Mumbai mh','vedant','400705','8655997299','rm@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Mumbai','30','admin',10,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',10,'2024-09-27 14:32:05'),('Seawave Forwarding Logistics','seawave@2323','dfsfdfs','dummy Pvt ltd','india','Goa','dfdfs df','dummy','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','67','aayush@manager',11,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',11,'2024-09-27 15:12:53'),('Seawave Forwarding Logistics','seawave@2323','sdasdf sdgs','dummy2 Pvt ltd','india','Goa','mum','dummy2','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','67','aayush@manager',12,'OrgButton','[{\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',12,'2024-09-27 15:20:40'),('Seawave Forwarding Logistics','seawave@2323','afasf sdfdvsv vass','dummy3 Pvt ltd','india','maha','mum','dummy3','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','mumbai','56','aayush@manager',13,'OrgButton','[{\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',13,'2024-09-27 16:16:18');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `o2dimport`
--

DROP TABLE IF EXISTS `o2dimport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `o2dimport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tatimpcolumn` varchar(50) DEFAULT NULL,
  `plandate` varchar(50) DEFAULT NULL,
  `actualdate` varchar(50) DEFAULT NULL,
  `timedelay` varchar(50) DEFAULT NULL,
  `remarks` varchar(150) DEFAULT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `jobnumber` varchar(50) NOT NULL,
  `jobdoneby` varchar(50) NOT NULL,
  `tat` varchar(50) DEFAULT NULL,
  `lobname` varchar(150) NOT NULL,
  `ownbranchname` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `o2dimport`
--

LOCK TABLES `o2dimport` WRITE;
/*!40000 ALTER TABLE `o2dimport` DISABLE KEYS */;
/*!40000 ALTER TABLE `o2dimport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `o2dtat`
--

DROP TABLE IF EXISTS `o2dtat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `o2dtat` (
  `tatimpcolumn` varchar(150) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `days` varchar(50) NOT NULL,
  `hours` varchar(50) NOT NULL,
  `minutes` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `dstatus` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the o2d tat table where tat of o2d is stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `o2dtat`
--

LOCK TABLES `o2dtat` WRITE;
/*!40000 ALTER TABLE `o2dtat` DISABLE KEYS */;
INSERT INTO `o2dtat` VALUES ('PortCFSNomination',1,'05','00','00','RAIT','rait@rait@123',''),('ETA',2,'','','','Seawave Forwarding Logistics','seawave@2323',''),('Scrutiny Document',3,'01','00','00','Seawave Forwarding Logistics','seawave@2323',''),('Port/CFS Nomination',4,'02','00','00','Seawave Forwarding Logistics','seawave@2323',''),('Checklist Approval',5,'02','00','00','Seawave Forwarding Logistics','seawave@2323',''),('E-Sanchit',6,'01','00','00','Seawave Forwarding Logistics','seawave@2323',''),('Filling BOE',7,'-02','00','00','Seawave Forwarding Logistics','seawave@2323',''),('Assesment',8,'01','00','00','Seawave Forwarding Logistics','seawave@2323',''),('Duty Call',9,'01','00','00','Seawave Forwarding Logistics','seawave@2323',''),('Examination/OOC',10,'02','00','00','Seawave Forwarding Logistics','seawave@2323',''),('PortCFSNomination',14,'02','00','00','C Connect Logi','c@2102',''),('Scrutiny',15,'00','05','00','C Connect Logi','c@2102','');
/*!40000 ALTER TABLE `o2dtat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `alias` varchar(45) NOT NULL DEFAULT '0',
  `country` varchar(45) NOT NULL DEFAULT '0',
  `state` varchar(45) NOT NULL DEFAULT '0',
  `city` varchar(45) NOT NULL DEFAULT '0',
  `postalcode` varchar(45) NOT NULL DEFAULT '0',
  `phone` varchar(45) NOT NULL DEFAULT '0',
  `email` varchar(45) NOT NULL DEFAULT '0',
  `PAN` varchar(100) NOT NULL DEFAULT '0',
  `GST` varchar(100) NOT NULL DEFAULT '0',
  `IEC` varchar(100) NOT NULL DEFAULT '0',
  `creditdays` varchar(100) NOT NULL DEFAULT '0',
  `address` varchar(150) NOT NULL DEFAULT '0',
  `orgcode` varchar(100) DEFAULT NULL,
  `orgname` varchar(100) DEFAULT NULL,
  `clientname` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `branchname` varchar(45) NOT NULL,
  `username` varchar(50) NOT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdon` varchar(45) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_orgcode` (`orgcode`),
  KEY `fk_orgname` (`orgname`),
  CONSTRAINT `fk_orgcode` FOREIGN KEY (`orgcode`) REFERENCES `users` (`orgcode`),
  CONSTRAINT `fk_orgname` FOREIGN KEY (`orgname`) REFERENCES `users` (`orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store client data and employee that created the client ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('digga','India','Maharashtra','Mumbai','400004','9876543210','example@example.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street','seawave@2323','Seawave Forwarding Logistics','Digga D',1,'diggachigga','aayush@manager','OrgButton','2024-06-05 15:31:43',1),('gondya','India','Maharashtra','Mumbai','400004','9876543210','example@example.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street','seawave@2323','Seawave Forwarding Logistics','Gondya',2,'gond','hemang@executive','OrgButton','2024-06-05 15:40:28',1),('allcargo','India','Maharashtra','Mumbai','400004','9876543210','example@example.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd',3,'Mumbai','admin','OrgButton','2024-09-02 15:05:01',0),('prince','India','Maharashtra','Mumbai','400004','9876543210','example@example.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street','seawave@2323','Seawave Forwarding Logistics','Prince LLP',6,'juinagar','aayush@manager','OrgButton','2024-09-20 16:57:40',1),('c','India','Maharashtra','Pune ','400009','9876543210','example@example.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street ','seawave@2323','Seawave Forwarding Logistics','C CONNECT LOGGI',7,'Mumbai','admin','OrgButton','2024-09-20 17:11:41',0),('highland','India','Maharashtra','Mumbai','400004','9876543210','vedant@gmail.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','dasdhd dashda ahsdsjdb ','seawave@2323','Seawave Forwarding Logistics','Highland Residency',8,'Thane','admin','OrgButton','2024-09-20 16:56:16',0),('ritesh','India','Maharashtra','Mumbai','400004','9876543210','kdhds@gmail.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street','seawave@2323','Seawave Forwarding Logistics','Ritesh Pathak LLP',9,'Thane','admin','OrgButton','2024-09-20 16:31:31',0),('dummy','India','Maharashtra','Mumbai','400004','9876543210','example@example.com','ABCDE1234F','27ABCDE1234F1Z5','1234567890','30','123 Main Street','seawave@2323','Seawave Forwarding Logistics','dummy Pvt ltd',11,'','aayush@manager','OrgButton','2024-09-27 15:12:53',0);
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ownbranches`
--

DROP TABLE IF EXISTS `ownbranches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ownbranches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgcode` varchar(100) NOT NULL,
  `orgname` varchar(100) NOT NULL,
  `ownbranchname` varchar(100) NOT NULL,
  `gstnum` varchar(150) NOT NULL,
  `iecnum` varchar(150) NOT NULL,
  `headname` varchar(100) NOT NULL,
  `headnum` varchar(20) NOT NULL,
  `address` varchar(150) NOT NULL,
  `branchcode` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of the data of the branches of the organization.\n    ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownbranches`
--

LOCK TABLES `ownbranches` WRITE;
/*!40000 ALTER TABLE `ownbranches` DISABLE KEYS */;
INSERT INTO `ownbranches` VALUES (6,'seawave@2323','Seawave Forwarding Logistics','Mumbai','27AAICS7836D1Z4','AAICS7836D','N K MISHRA','7654334323','Juinagar','Mumbai-2323'),(7,'seawave@2323','Seawave Forwarding Logistics','Jogbani','27GDMPM3914G1Z4','GDMPM3914G','vedant','98657451222','gjkjsof kdsf fsdfj dffksf kldhnf','Jogbani-2323'),(8,'seawave@2323','Seawave Forwarding Logistics','Delhi','27GDMPM3914G1Z4','GDMPM3914G','Rishi','98657451222','sdfdfsf vsdds','Delhi-2323'),(9,'seawave@2323','Seawave Forwarding Logistics','Kolkata','27GDMPM3914G1Z4','GDMPM3914G','Aayush','98657451222','Kolkata branch demo addresss','Kolkata-2323');
/*!40000 ALTER TABLE `ownbranches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payeaccount`
--

DROP TABLE IF EXISTS `payeaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payeaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payename` varchar(50) NOT NULL,
  `bankname` varchar(50) NOT NULL,
  `accounttype` varchar(45) NOT NULL,
  `accountnum` varchar(45) NOT NULL,
  `ifscCode` varchar(45) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Paye Account Table for Paye Bank Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payeaccount`
--

LOCK TABLES `payeaccount` WRITE;
/*!40000 ALTER TABLE `payeaccount` DISABLE KEYS */;
INSERT INTO `payeaccount` VALUES (1,'Digga D','Canara','Current','A265425974','CNRB0001589','Seawave Forwarding Logistics','seawave@2323'),(2,'Gondya','SBI','Current','A5747524234','HDFC0000490','Seawave Forwarding Logistics','seawave@2323'),(3,'Allcargo Pvt Ltd','Canara','Savings','A4635465','CNRB0001589','Seawave Forwarding Logistics','seawave@2323'),(5,'Prince','52567644','Current','8+856+54455466','HDFC0000830','Seawave Forwarding Logistics','seawave@2323'),(6,'vedag','canara','Savings','3444345','CNRB0000104','Seawave Forwarding Logistics','seawave@2323'),(7,'Rishi','Punjab Bank','Current','855298631245','HDFC0000830','Seawave Forwarding Logistics','seawave@2323'),(8,'N K Mishr','45745434','Current','855298631245','HDFC0000830','Seawave Forwarding Logistics','seawave@2323');
/*!40000 ALTER TABLE `payeaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminders` (
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `assignedpeoplereminder` json NOT NULL,
  `workflowname` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `planDate` varchar(45) NOT NULL,
  `lobname` varchar(45) NOT NULL,
  `ownbranchname` varchar(45) NOT NULL,
  `reminderdays` varchar(45) NOT NULL,
  `reminderhours` varchar(45) NOT NULL,
  `reminderminutes` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `wid` int NOT NULL,
  `jobnumber` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store reminders for import';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
/*!40000 ALTER TABLE `reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setworkflow`
--

DROP TABLE IF EXISTS `setworkflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setworkflow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lobname` varchar(150) NOT NULL,
  `ownbranchname` varchar(50) NOT NULL,
  `importername` varchar(50) NOT NULL,
  `orgname` varchar(100) NOT NULL,
  `orgcode` varchar(100) NOT NULL,
  `workflowmilestone` varchar(150) DEFAULT 'null',
  `duration` varchar(50) DEFAULT 'null',
  `days` varchar(50) DEFAULT 'null',
  `hours` varchar(50) DEFAULT 'null',
  `minutes` varchar(50) DEFAULT 'null',
  `plandatechange` tinyint(1) DEFAULT '0',
  `workflowname` varchar(50) NOT NULL,
  `assignedperson` json NOT NULL,
  `reminderdays` varchar(45) NOT NULL DEFAULT 'null',
  `reminderhours` varchar(45) NOT NULL DEFAULT 'null',
  `reminderminutes` varchar(45) NOT NULL DEFAULT 'null',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of all the detailed data of the particular workflow as per line of business';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setworkflow`
--

LOCK TABLES `setworkflow` WRITE;
/*!40000 ALTER TABLE `setworkflow` DISABLE KEYS */;
INSERT INTO `setworkflow` VALUES (1,'Air IMPORT','Jogbani','null','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}]','2','00','00','2024-09-11 06:06:58'),(2,'Air IMPORT','Jogbani','null','Seawave Forwarding Logistics','seawave@2323','ETA','Before','2','00','00',0,'PORT CFS NOMINATION','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}]','2','00','00','2024-09-11 06:13:13'),(3,'Air EXPORT','Jogbani','null','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}]','2','00','00','2024-09-11 07:13:35'),(4,'Air EXPORT','Jogbani','null','Seawave Forwarding Logistics','seawave@2323','ETA','After','2','00','00',0,'E-SANCHIT','[{\"username\": \"hemang@executive\"}]','1','00','00','2024-09-11 07:31:31'),(5,'Air IMPORT','Jogbani','null','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','Before','2','00','00',0,'E-SANCHIT','[{\"username\": \"hemang@executive\"}]','1','00','00','2024-09-12 07:14:18'),(6,'Sea IMPORT','Jogbani','null','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}]','3','00','00','2024-09-12 09:39:13'),(7,'Sea IMPORT','Jogbani','null','Seawave Forwarding Logistics','seawave@2323','ETA','After','2','00','00',0,'processing','[{\"username\": \"hemang@executive\"}]','4','00','00','2024-09-12 09:52:11'),(8,'Air IMPORT','Mumbai','null','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}]','2','00','00','2024-09-28 06:08:47'),(9,'Air IMPORT','Mumbai','null','Seawave Forwarding Logistics','seawave@2323','ETA','Before','2','00','00',0,'E-SANCHIT','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}]','1','00','00','2024-09-30 05:52:31'),(10,'Air IMPORT','Mumbai','null','Seawave Forwarding Logistics','seawave@2323','ETA','After','2','00','00',0,'PORT CFS NOMINATION','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}]','1','00','00','2024-09-30 06:23:46'),(11,'Air IMPORT','Mumbai','null','Seawave Forwarding Logistics','seawave@2323','ETA','Before','4','00','00',0,'processing','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}]','2','00','00','2024-09-30 06:27:30'),(12,'Air EXPORT','Delhi','null','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"aayush@manager\"}, {\"username\": \"hemang@executive\"}]','2','00','00','2024-10-07 12:04:24');
/*!40000 ALTER TABLE `setworkflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackingexport`
--

DROP TABLE IF EXISTS `trackingexport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trackingexport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tatexpcolumn` varchar(50) DEFAULT NULL,
  `plandate` varchar(50) DEFAULT NULL,
  `actualdate` varchar(50) DEFAULT NULL,
  `timedelay` varchar(50) DEFAULT NULL,
  `remarks` varchar(150) DEFAULT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `jobnumber` varchar(50) NOT NULL,
  `jobdoneby` varchar(50) NOT NULL,
  `tat` varchar(50) DEFAULT NULL,
  `lobname` varchar(150) DEFAULT NULL,
  `ownbranchname` varchar(100) NOT NULL,
  `ownbranchcode` varchar(100) NOT NULL,
  `clientname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingexport`
--

LOCK TABLES `trackingexport` WRITE;
/*!40000 ALTER TABLE `trackingexport` DISABLE KEYS */;
INSERT INTO `trackingexport` VALUES (1,'ETA','2024-09-27T12:09',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323',NULL,'Jogbani/A/24-25/E/yy/3','hemang@executive',' d  hr  min','Air IMPORT','Jogbani','Jogbani-2323',NULL),(2,'ETA','2024-09-28T12:18',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323',NULL,'Jogbani/A/24-25/E/yy/2','admin',' d  hr  min',NULL,'Jogbani','Jogbani-2323',NULL),(3,'ETA','2024-09-29T12:19',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323',NULL,'Jogbani/A/24-25/E/yy/3','admin',' d  hr  min',NULL,'Jogbani','Jogbani-2323',NULL),(4,'E-SANCHIT','2024-09-29T12:19',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323',NULL,'Jogbani/A/24-25/E/yy/3','admin','2 d 00 hr 00 min',NULL,'Jogbani','Jogbani-2323',NULL),(5,'ETA','2024-10-03T12:07:00.000Z','2024-10-07T17:37','96 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Delhi/E/3/24-25','aayush@manager','d hr min','Air EXPORT','Delhi','Delhi-2323','Highland Residency');
/*!40000 ALTER TABLE `trackingexport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackingimport`
--

DROP TABLE IF EXISTS `trackingimport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trackingimport` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tatimpcolumn` varchar(50) DEFAULT NULL,
  `plandate` varchar(50) DEFAULT NULL,
  `actualdate` varchar(50) DEFAULT NULL,
  `timedelay` varchar(50) DEFAULT NULL,
  `remarks` varchar(150) DEFAULT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `jobnumber` varchar(50) NOT NULL,
  `jobdoneby` varchar(50) NOT NULL,
  `tat` varchar(50) DEFAULT NULL,
  `lobname` varchar(150) DEFAULT NULL,
  `ownbranchname` varchar(100) NOT NULL,
  `ownbranchcode` varchar(100) NOT NULL,
  `clientname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingimport`
--

LOCK TABLES `trackingimport` WRITE;
/*!40000 ALTER TABLE `trackingimport` DISABLE KEYS */;
INSERT INTO `trackingimport` VALUES (1,'E-SANCHIT','2024-10-10T10:25:00.000Z','2024-10-05T16:11','-120 hr -44 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/17','admin','2d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','C CONNECT LOGGI'),(2,'processing','2024-10-08T10:25:00.000Z','2024-10-05T16:11','-72 hr -44 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/17','admin','4d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','C CONNECT LOGGI'),(3,'ETA','2024-10-12T10:25:00.000Z','2024-10-05T15:55','-168 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/17','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','C CONNECT LOGGI'),(4,'PORT CFS NOMINATION','2024-10-14T10:25:00.000Z','2024-10-05T16:11','-216 hr -44 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/17','admin','2d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','C CONNECT LOGGI'),(5,'ETA','2024-10-06T10:53:00.000Z','2024-10-05T16:23','-24 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/16','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Prince LLP'),(6,'E-SANCHIT','2024-10-04T10:53:00.000Z','2024-10-05T16:23','24 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/16','admin','2d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Prince LLP'),(7,'PORT CFS NOMINATION','2024-10-08T10:53:00.000Z','2024-10-05T16:23','-72 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/16','admin','2d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Prince LLP'),(8,'processing','2024-10-02T10:53:00.000Z','2024-10-05T16:23','72 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/16','admin','4d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Prince LLP'),(9,'E-SANCHIT','2024-10-17T09:29:00.000Z','2024-10-07T15:42','-240 hr -17 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/15','admin','2d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Ritesh Pathak LLP'),(10,'ETA','2024-10-19T09:29:00.000Z','2024-10-07T14:59','-288 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/15','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Ritesh Pathak LLP'),(11,'ETA','2024-10-11T06:56:00.000Z','2024-10-08T12:26','-72 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/14','aayush@manager','d hr min','Air IMPORT','Mumbai','Mumbai-2323','C CONNECT LOGGI');
/*!40000 ALTER TABLE `trackingimport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userkyctable`
--

DROP TABLE IF EXISTS `userkyctable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userkyctable` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `officephone` varchar(45) NOT NULL,
  `personalemail` varchar(45) NOT NULL,
  `officeemail` varchar(45) NOT NULL,
  `aadharcard` varchar(45) NOT NULL,
  `pancard` varchar(45) NOT NULL,
  `dateofjoining` varchar(45) NOT NULL,
  `dateofbirth` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `branchaccess` json NOT NULL,
  `profilephoto` longblob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store data of user';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userkyctable`
--

LOCK TABLES `userkyctable` WRITE;
/*!40000 ALTER TABLE `userkyctable` DISABLE KEYS */;
INSERT INTO `userkyctable` VALUES (1,'Shreyash Pingle','rishi@manager','09004263507','09004263507','shreypingle23@gmail.com','shreypingle23@gmail.com','494478896767','GHYPP5887H','2024-05-07','2024-05-08','Seawave Forwarding Logistics','seawave@2323','[{\"branchcode\": \"Raxaul-2323\", \"ownbranchname\": \"Raxaul\"}]',_binary '�PNG\r\n\Z\n\0\0\0\rIHDR\0\0	/\0\0	/\0\0\0�,�\0\0\0gAMA\0\0���a\0\0\0sRGB\0���\0\0\0	pHYs\0\0%\0\0%IR$�\0\0\0�PLTEGpL�;G�7C�������9E�AM����5A�6B�������?J�\\f�Xc����������NY�������bl�������CO����R\\�������u}����������fo�������JU����������W`�������GR�kt����������������_h����~��z��������nw����������rz�5A#4\Z�\0\0\0tRNS\0@��f\0\0r�IDATx��֡\0\01�o�\n�d�^�W\0\0\0\0�O�d)\0 6��\0PH�	\0�H�	\0�H�	\0�H�	\0�H�	\0J��\0\0�I�	\0�I�	\0�I�	\0�I�	\0�I�	\0�I�	\0PJ�&\0�J�&\0PJ�&\0PJ�&\0�J�&\0@)�&\0@*�&\0@)�&\0@)!�\0@*��\0@*!�\0@+��\0@*!�\0@+��\0@+��\0\0��h\0��f\0��f\0��h\0��f\0��f\0��h\0��f\0��	\0��	\0��	\0��	\0��	\0��	\0��	\0�h&\0�H&\0�h&\0�H&\0�h&\0�JH&\0Kh&\0�JH&\0K��\0�J �\0K �\0K �\0K �\0PK �\0@,!�\0@,!�\0@,�b@,�d@,�d@,�d@,�d@,�d@,�d@,�d\0��	\0��	\0��	\0��	\0��	\0��	\0��	\0�(&\0�H&\0�(&\0�H&\0�(&\0�H&\0�(&\0�H&\0���\0� �\0���\0� �\0PK �\0K��\0K �\0PK��\0K�dPK�bPK�bK�dPK�b@-�b@-�b@-�b@,�	@-�	@-�	@-�	@-�	@,�	\0��	\0��	\0�(&\0�H&\0�(&\0�(&\0�(&\0�(&\0�H&\0�(&\0���\0���\0���\0���\0���\0���\0���\0���\0��bPK�bPK�bPK�bPK�b�K�bPK�bPK�bPK\0�	PK\0�	@-�	@-�	@-�	@-�	@-�	@-�	@-�	@-(&@-(&\0�(&\0�(&\0�&\0�(&\0�(&\0�&\0���\0���\0���\0� �\0���\0���\0���\0� �\0��b��b��b��`��bPK�b�K�`PK�bPK\0�	PK\0�	�K\0�	PK\0�	PK\0�	PK\0�	@.�	@-�	@.&@-(&@.(&@-&@-(&@.&@-(&\0�&\0���\0� �\0���\0���\0� �\0���\0� �\0���\0��`��b��b��`��b��`��b��`��b�K\0�	PK\0�	PK\0�	�K\0�	PK\0�	�K\0�	�K\0�	PK\0�	�K\0&@-(&@.&@.&@-(&@.&@-(&@.&@. �@-��\0� �\0���\0� �\0���\0� �\0� �\0��bbح\Z\0\0\0�A�[S:8�\\�j0�\\�j1Uk�j0Us�j0Uk�j1Us�j0Us�j1Uk���Ts���Tk���Ts���Tͥ��T����Tͥ��Tͥ��T����Tͥ�Sͥ�Sͥ�S���S5��S5��S5��S���S5��\ZL5��\ZL���ZL5��\ZL5��\ZL�\\�\ZL�Z�ZL�\\�\ZL�\\�j0�Z�j1�\\�j0�\\�j0�\\�j0�Z�j1Us�j0Us�j0Us���Tk���Ts���Ts���Tk���Ts���Ts���Tͥ��Tͥ��T���Sͥ�Sͥ�Sͥ�Sͥ�Sͥ�Sͥ�S���S5��\ZL5��\ZL5��\ZL5��\ZL5��\ZL5��ZL���\ZL5��\ZL�\\�j0�\\�j0�\\�j0�\\�j1�Z�j0�\\�j0�\\�j0�\\�j0�\\���Xs���Ts���Tk���Ts���Ts���Ts���Ts���Ts���Tk��Sͥ�Sͥ�Sͥ�Sͥ�Sͥ�Sͥ�Sͥ�Sͥ�\ZLͥ�\ZL5��\ZL5��\ZL5��\ZL5��\ZL5��\ZL5��\ZL5��j15��j05��j0�Z�j0�\\�j0�\\�j0�\\�j0�\\�j0�\\�j0�\\����\\���T�\\�`��T�`��T�`��T�`��T�`��T�`��TU���TU���TU���RU���RU���RU���RU���RU���RU\r��RU\r��RU���RU\r��KU\r��KU\r��KU\r��KU\r��KU\r��KU5��KU5��KU5��KU5�j.U5�j.U5�j.U5�j.U5�j.U�`j.U�`j.U�`j.U�`j/U�`��T�`��T�^��T�`��TU���TU���TU���TU���TU���TU���RU���RU���RU���RU\r��RU\r��RU\r��RU\r��RU\r��RU\r��KU\r��KU\r��KU���KU5��KU5��KU5��KU5��KU5��KU5�j/U��j.U�`j.U�`j.U�`j.U�`j.U�`j.U�`j/U�`j.U�^��T�`��TU���TU���TU���TU���TU���TU{��TU���RU���RU\r��RU\r��RU\r��RU\r��RU\r��RU���RU\r��RU\r��KU5��KU5��KU5��KU5��KU���KU5��KU5��KU5��KU5�j.U�`j/U�^j.U�`j.U�`j.U�`j/U�`j.U�^j.U�`j.UU���TU���TU{��TU���TU���TU���TU���TU{��TU���T��:$\0\0\0@&���A�*�8 ��K\0 ��K\0 ��K\0���K\0 ��K\0 ��K\0 ��K\0���K\0�`�K\0�`B.�`B.�`B/�^B.�`B.�`B.�`B.\0�I/\0z	�\0�	�\0�	�\0�	�\0z	�\0�	�\0�	�\0�	�\0&�\0�%�\0&�\0&�\0�%�\0&�\0&�\0&�\0���\0 ��\0 ��K\0���K\0 ��K\0 ��K\0 ��K\0���K\0��K\0�`�K\0�^�K\0�`B.�`B.�`B/�^B.�`B.�`B/\0zI.\0�I.\0�I/\0�	�\0z	�\0�	�\0�	�\0z	�\0&�\0&�\0&�\0�%|\0r	\0z	\0�r	\0r	\0z	\0Lr	\0�Kr	\0Lr	\0L�%\0�K�%\0L�%\0L�%\0�K�%\0@0�%\0@0�%\0@/�%\0@0�%\0@0!�\0@/!�\0@0��\0@/!�\0@0!�\0\0���\0\0�$�\0\0�$�\0\0���\0\0��\\\0��^\0��\\\0��\\\0�^\0��\\\0�\\\0�^\0��\\\0r	\0z	\0�r	\0Lz	\0Lr	\0�Kr	\0Lz	\0Lr	\0�K�%\0L�%\0�K�%\0L�%\0@0�%\0@/�%\0@0�%\0@0�%\0@/�%\0@0��\0@0!�\0@/!�\0\0���\0\0�$�\0\0�$�\0\0���\0\0�$�\0\0���\0\0��\\\0��^\0��\\\0��\\\0�^\0��\\\0�^\0��\\\0�\\\0z	\0�r	\0Lz	\0�Kr	\0Lz	\0�Kr	\0Lr	\0Lz	\0�Kr	\0L�%\0�K�%\0@0�%\0@/�%\0@0�%\0@0�%\0@/�%\0@0�%\0@/!�\0@0��\0\0�$�\0\0�$�\0\0���\0\0�$�\0\0���\0\0�$�\0\0���\0\0��\\\0��\\\0�^\0��\\\0�^\0��\\\0�\\\0�^\0��\\\0z	\0�Kr	\0Lz	\0�Kr	\0Lz	\0�Kr	\0Lz	\0�Kr	\0Lz	\0@/�%\0@0�%\0@/�%\0@0�%\0@/�%\0@0�%\0@/�%\0@0�%\0@/!�\0\0���\0\0�$�\0\0���\0\0�$�\0\0�$�\0\0���\0\0�$�\0\0���\0\0��\\\0�^\0��\\\0�^\0��\\\0�^\0��\\\0�^\0��\\\0Lz	\0�Kr	\0Lz	\0�Kr	\0Lz	\0�Kr	\0Lz	\0�Kr	\0�<��\0�%�\0&�\0�%�\0&�\0�%�\0&�\0�%�\00�\0���\0 ��\0���\0 ��\0���\0 �b���\0�a����L�#��м^\0��\\\0�^\0�K\0\0zI.\0�I/\0zI.\0�I/\0zI.\0�I/\0zI.\0�&�\0zI/\0�I.\0zI/\0zI.\0�I/\0zI.\0�I/\0l�%�\0�I/\0zI.\0�I/\0zI/\0�I.\0zI/\0�\0�)��	\0�%�\0&�\0�%�\0&�\0�%�\0&�\0��\0\06��\0���\0\0�$�\0\0���\0\0�$�\0\0���\0\0�$�\0\0��\0�$�\0\0���\0\0���\0\0�$�\0\0���\0\0�$�\0\0���\0\0���\0\0�$�\0\0���\0\0�$�\0\0���\0\0���\0\0����\0\0���\0\0�$�\0\0���\0\0���\0\0�$�\0\0���a\0�^�K\0�`�K\0�^�K\0�^�K\0�`�K\0\0u��+\0@0�%\0@/�%\0@/�%\0@0�%\0@/�%\0��`r\0���\0���\0 ��\0���\0 ��\0�^\0�K\0�^\0��^\0�\\\0��^\0��\\\0�&�\0\0zI/\0zI.\0�I/\0zI.\0�I/\0�%\0�a��\0@0�%\0@/�%\0@0�%\0@/�%\0�{�\'\0�`�K\0�^�K\0�^�K\0�`�K\0\0z	\0�/��\0�%�\0�%�\0&�\0�%�\0��\0\0���\0�^�K\0�^�K\0�`�K\0�^�K\0\0z	\0�/��\0\0�%�\0�%�\0&�\0�%�\0�c/�\0\0Lz	\0�Kz	\0�Kr	\0Lz	\0@/\0����\0���\0\0���\0\0�$�\0\0���\0\0�\0@_/�\0Lz	\0�Kz	\0�Kr	\0@/\0�%\0��^�;\0 ��\0���\0���\0@(��\0�%�\0�%�\0&�\0��\0\0~�%�\0�I/\0zI/\0zI.\0����\0�^�K\0�^�K\0�`�K\0\0z	\0@/\0���\0���\0\0���\0\0�$�\0\0B�dh\0@/�%\0@/�%\0@/�%\0�P0�\0�Kz	\0�Kr	\0Lz	\0@/\0�%\0��^�1\0 ��\0���\0���\0@(�\0�%�\0�%�\0�%�\0\n&�\0zI/\0zI.\0�I/\0�%\0\0�\0��K�\0�^\0��^\08r	\0 L�\0��^\0��^\0x�Kv\0�^\0��^\0x�KV\0�^\0��^\0�K\0\0�^�)\0 ��\0���\0��^�(\0 ��\0���\0�^\0��=\0���\0\0���\0\0�\0@���	\0&�\0�%�\0��\0\0B�dK\0@0�%\0@/�%\0\0�\0�%K\0�I/\0zI/pٻמ�-\0�QP��䢠(^��\Z�����ٻ��N�`\'*<����&Y�������\0\0�\0���%s\0�^\0��^\0�K\0\0��K�\0&�\0�%�\0��\0\0ީ��\0Lz	\0�Kz	\0@/\0�%\0��K&\0&�\0�%�\0��\0\0ީ��\0Lz	\0�Kz	\0@/\0�S/�\0 ��\0�^\0�K\0\0z	\0�C���\0�I/\0�%\0\0�\0�N�dr\0�`�K\0\0z	\0@/\0�S/�\0 ��\0�^\0�K\0\0z	\0�C���\0�I/\0�%\0\0�\0��\0\0>d0\0���\0�^\0�K\0\0z	\0�C���\0�I/\0�%\0\0�+6�~_�Y�\0�*�R�w<�ޕ�C��V�\0��V��*û�i.��������Osk�a�S�^Z�\\*_m�X�tm��\0 �V��*riakW\r�	\0ziz��L�,���c�^Z�^���l��|�����\n���YX���o\0���Ը�KoX��7=\'\0���bW/����z	\0������e����<\0��痆k�g�}�/���K+�K�;ٳ�z�S�^Z�^��tς6�YO	\0zi�lw�9�ܢ�K�\0X�^ڪL��g�\\jxD\0`Ezi�pۮW�{?�g/T��V��\"�������L=ҍf��<��_��F�p����i\0�L/mm;����ۣ����L���K��o��P\'R�i��ů?T~�����/���Ƌ���]�8S茂��_|�.\0�R/}l������?P8V��G�g\0@/�z8>���\0�L�̎J��q��K\0��Hu�o��3&\0z�Dc�|J����^\"���z?��\0��O�i��k0\00g/��Ҫ}���\'v�`�`2�eUm�Υ��E�\0�D��5����\0�D*s|q����\0�^\"uP\n�z�.\0���s����`2\000�R���]�I�d\0@/�(7�C���\0�^\"�X}�KӁC�\0��Hew���j\\�����^\"U�Υ��Ю7\0,�Kf�|*�h׻m�\0&#Z:�ap�2w�P%\0�%~��C+��]:�-�\0��H��UN���z�^\"ռ	v����z�^\"U�l�*��&\0��	-�̷`�{}`�\0�L�T�;����v�@/��=��Or	\0���Mt��ܡJ\0�K�\Z����Ƹl2\0��HdN΂C��]��7��,���`y��h0\0��H�w�s��U�^\"ռ�v���\0�D�8v���U�^��j��T:0\0�K$�G;��P�u�h\0@/�8=\\v�ϋ&\0z�D��zo�4M\0�L���ý`yiP3\0�K$2�g��R��d\0@/�:�U���\0�D�t���Į7\0�%R����\\��;&\0z�Da�����L\0���ut׻�P%\0�%~:�5n�]o\0�S�d4�]�>��ޮ�\0�%�Ip�{�ٮ7\0�%R��h׻t�5\Z\0�K�%�x�zW��\0�%R�zp�r��a2\0��H��]]o\0�K�*Ѯw~�P%\0��^2�O,3��K;&\04����^��\\�|r�\0��Z��=)�\0�%�q��=n�\0�%����\\�voM\0��·�`y��:c4\0���K��\Z���Ю7\0�%R��h���]o\0��d.�Ss�<t�\0��`2�O��e-ȥ�߲\0z�D&����O�z�^\"u��>��\r\0z�T-��^�M\0���M��޵�\r\0z�T��=m]̵�-V*�g\0��r������<�T޿�_^vG�>���%S�t��ЊU~���Kd�7���oN��\0�L����A.m���FQv�>{�����\0���Ks�R�T��%��/_���%\0�eR��޹��/Qi��cQ|�f�\0���G�)����{w��6Ea��Al�d�0�X�*��x�ךJ�jRc.	=FB���t��H�p�)����OK$���\0���\rs0�����wr�|ܴ��\0\0yI�^�����\nK\\�?�mv\0\0�&�!ĥ�Ba	s9����\0\0�$/�\'���s^�K�NRa���Ɯ�q\0\0�,0�%������P�zg[��*#\n\0\0@^�C� ĥ��SXbP~�Wi\0\0�K�������xi�/�K���\0���o��LKVu��,��K<�\0����r_�zWZ\n�&źxw�ds\0 /��|�\nq)QS�f[R����n\0\0�%=�R}x�ƭ���	K+��\0���\r�=caP��(T����/�c��\0\0����M��v�9(T�����pG�\0\0������}�������-��\0\0�����Hs���ʯ���x�G�\0\0�������WX�.,��{l.\0\0�%-\r!.YźJ��t���.��\0\0���`O�Ӹ�Qe��T�N�[\0\0�KZȊs����K${��c��\0�����R3iv�����7\0\0�%=ԗB\\��\nc&��R�zo|�\0\0���0�[�z�&���{\0�����7[��>*��,Ku��\0\0���P���*�#�.^���\0�����Hs�7O�/�<8���5��\\\0\0�KZĥ�P�V�5�B[���\0\0����Ԑ���*�#O�z[�&{\0\0yIvM�Ki��XwI6\0\0��}iPeb�P=��*B׻G�\0\0��;��m�TUN�B[|ⱹ\0\0����B�۪.���5~co\0 /i�ߜ��w�TYB�?�\0�����V\ZT��ݾ����z��K\0\0����=V�A�s�A�fK��\'ze6\0\0�̺��θ%�%U)pyl.\0\0���͈�R[�Kպ³��+�%��\0\0��4��Ź�3�1��\\�v]qGy	\0\0��R�;�UT)��+GU\0@^҂y���Vÿ}�������\0�����P�KK���_���Ӹ��co\0 /i!K�%GePei,��n��\0\0���`�RҠʾ³4{~�����\0�����L�z�T��=a�wZ��u\0\0��c�]��4V�zu�D-��\0@^ҁ�(c�2���\Z�����\0����!�)<K{�K,���\0\0 /i��Iq)��,͞\\v����%\0\0�KZ���R�{���.���w�O\\\0��&�\"F���0��|u��U��\\\0\0�K:0K�������o�uq�D�\0\0����ո�L�7r�������\r\0\0yI�Z\"�ŹI�D��w;�-\0\0�%-dg���QT�����C*\0\0��_ɝ#���\n��+��S+/�7R~\n��N�?x�U���ٞ������,;\0��+�ϙ/�MzYZ��\"_ή�&\'���F�?kSR�~����uc�v�e�PX���i3��Z���D�\r\0�K1�m�A��B\\�7�\n�AT����Ɵ�(��ɺXɖ�I����$}�������޶�	\0�K�S��k��SXb\"���;�<f)/�����:pՍK_�j�n>q5\'����W\n��4x�3:{p�|2\rb1q5[�~~a%>\0�%Dw\Z�K����ܤ�L�zD��ν��]�:<!/=^ү���n*��HW��C�����=��$]�==�`2Ks\'��וH;��/����\nR\\\Zn�B�;a����B����M��%wÕ��W��?Z-���rNM;�{;�+�ok�?:0���C�n� /�m,]!ޏ*���8�µ�w��gó�GJ��N�̗��4»Lω+/c��X2�r��p /!�J:\'z\n��<a��U�|\Z>��O��w�K�Ϊ]���x���en�s�V�.���:D�<��_{ѧ�o{x�h��Jr^k��v�.���|�;N�q������{[6>\\T�&�Bg��G�GIi���֘��F�E`b#����*�����>��y�����t�����31d1L٠��\Zw}��b��]&ӽ���^��W�\\j����S>����w���q�?�~�N�C��#_V�׵B:K������Oj�wM�K�cv��*<Kˎ����Z���r������y�����&N����`U5Bx��S�����~��~�x���r�\n������������\n�,���w�ԋF؟?�@^�Y\\jJ]�Lu��Im(��\\�zک�o9��;/ͬ������\Z�B{��m)�+,y�G��}M̷?JJL�k7r���av�\'�;��B����6.�D��3�^T�R8g�p��\rs��?��v���y�9�y)���p2�^5�;5��i�������B�ǻe%���T����W:�멕�����v:p�Ӆy��/^M�z�n�>�S����>���q�R���Z��[9���y��ɡ��rV;;�J�������y�x��u-�y鏒�I7j�������Wf�����!y)ڴ�\r?-���ހ�R�y�����D��9��W?����%�ҟD�2�9/\nK��b�«�N����KQު��F�=�f������ND��2Vj܉v{�K_��9�y)^JK��U��5�^=���#G�kc���R�1\"}ˉ�\"��@^�����w1>D���/�O�[�%���_�]���\"�F�/�a�[���y)~y���t�Ƅ��#�/}����ף�j\Zy��Ǉ�ʓ��K��VT�R�z�����	+.y�_�%/E\"��<d��Q���/y�A���M�ٯ\Z����|�`���Ks$���{�A\0ɞp����3�N�ס�\"�0��\r�e��}�׺�w��I1qk�!��J\\[�,�Rn�eo���	^\n$�4vt���V�/�/�_���hř�/��B�K.Y	4���N։옹��&sB�8��	N[C��F6x)2�ϭ\\�xI�U�3#^/�G�C�L���Z�=��C�,�K�+Ŗ��͚�OO�OJ�*xIk|�3f��/�P�1#^�����d���Q�ֻM�Ӽ����\'�ȫ~�^�K�S����3Vb/�/}����\0xIIt�1#^�������Bf��ۂp��רt��Rn_Q�#�K���+�E$��/�/}n�1��U�_|H���KQǥ�謾D�7I\\�1.un2)��m1��\0\r^�C���Ϸ����%�����n�]�^R�\r[�\"x	��yj�6$*A����3���~�>�d�*w�x�-x�7e#,�o��a/�/���[���KjD��/����!9S�6�؟�*qͿU��H�.�}}�x��K�T,̾8������fa�S�š�Rr҉�.p����O���%xI�.���K���<�����׫|4ZA۶??�e��//�A�!����ܙe�n�������~�ߒ�ԭ�s�4�y��^�_��)��eu�q�m��>n��lo��%�~eWԡ4���E�ֻ�D+\'?��?`�s��R&�=��~i)/���N���r����Y��P��딷�>~����8�R�g����y�z��K���P�*��D��슪�.0ٙዏ�E�\Z@�%����&�\\~�J�ޮ{������b���#�����K��ͫ��]]m1n�������<o�~� �n\\*W?��Dp(uiPOZ�jh���n�r�� �\"a奆�M,{��b��?܎��+���I��_2U�:x���>�s[[�2߾�/�k.#ٚ�7�V��txI�lr[b$a$*[��wu��{S��&�8����7/�>%��@-KJ�뒕���_���`Q���}�ek�ߗ�n8�4K\'�jӌ3������I�m13���dQ^F��}��K�U<R�@�\0U���ؔ�&z\nAU�x�R��զ��M?J݁��h�-����pV�U���%F�.NO�ŭ�?��y4^Z��4C�=�vل��Y�.E/���+��j����зb����1m�l�ޅt{	�[x�R��nJ��QZ������މ!���c�K������5q&��U��`��w1�Iԋ-�D���J�\Z���M�J��s�z牎y�x驸��K��QY�\'�/m�G8y�\0��6j�~JӞkL5��%�g�n(E/=��}�Q�տ�M����qxe����\\R9:���|?17�+��Ӟt��w��������jr��s/�ݜ7�aH���\r��&jGY�DA�֛z�����)��A�@}X�y���[zb�ߕ���\\K��RpA���G��<e	N��Ά�T�Z�\'��X�)a�%B4�=U��J�����{�i�;/e�&�j�f���[R���$��w�*��_m��4c�y��K�u�{w�&\'���IX�t���$��pFm�e�9/����&c�gM�u���ͭT�x)H�:ͻ]Ig��/�ޞ�7r���\'��H�iCv+I�2W��/�`;�aas��7/eV�pɪ-8g�wv�m\n��|�U��=`�r��/�ֲ$��U1��P����5=	[�\'�j��Y��%�]\n�ƛ�z��TZ�\r�����؆�b`�Rв��8���-xI9��[�i���GEr�|b!��}�����[���}ř�RK?S��\'WvÞ��1�/��<%����qN�?��|�(��&LेQvL��u�hTi���\\آ<��Ȋn+�/b�y��gFTn]�����=�Ѹ2pxI�q�ߙ�|P?���^�9�<D�n�҃(�$k�_6F�aar�%�冨x�ac�K���N�TEY�r<��,�y�K\Z���i��a�K�{d4a/=Lt�h���1�%�oΝ���e�t����Rf���y�$xI�Nb`�+/�/qlQQFn�	x�!ԹQN -S1}�P��C�ߜ���Lu,cly)S��x)}�����g�]aJκ����Q�F�M��K!zF�����M���c(,E�<VZ\"q����Ӹ�5\ZV�K�T/��Iy�x�C�fZ�,@��2:p�6�1������Y��Z2��g[�Bƕ���{��ƶ��*�%]Vj%h��P=^�Ģ�(#���]�R���\n�?\Z-����8���Lw�8c�g!c�K����%���/�%m���a�)�\"��xt��8�Ox)ܪT�~W�.u%z��Ϳ����A�E�\'/e~�+^2#Ԍ��Mų��R�G����7�&L�ǕM>mJH��M�^��󾠦�5e�jZ�x�{�Qe�����%�;����[��.�����h��y�&L�P_�F�4o���:���|��}����C,y��^��(Je��%}J�9Gm��ĥwA�~b�&L�0��+�Kt�.R�׳��n9����k1c�KGS�K�^�ڪ��4�n6�ڊo��G,DԻA�7x)���m|P��%\n�3�4uO`vW�;�A�ߊ#/�wZ	����B^ҩ��\nh(\nx�MSQFn�AF�V\r�d�ʕ���s���ýg���Kq�%�N6���X�^���_x�-h(\rM�����u��4�0��B���&F��˶T7�o���W�/	[����[�x)�g��Y?��\0��\\Ci�o��2;AFn[F�	�NoG�OZs�Z����^:�k*zf�̱��?^���z��Ƚ/�5Y�\0�Z%3��8�FՌE��R�p�NMo7�B��N����<�fi�oAc�K����k�^ҫ�����r�%�C$��喘�^\n���L����S��G~�q����5���/�����Ul�����:H�J�����ܭ��x)t\Z�I��xٖ��M[�\0����iu�g-n�TB��Ql>^Ҽ�޳�M��r�K���M��h�^\n��M*Fc�%�j�j\Z�\r�\r�/2iT4.i�x�\"�ⴢxM/�0M<=��/=�z���2r�p)C�z�%�����-��Ń�Qk�tZ1�׹�z��ɨ:xI�����W�/1� #g�L����%���_���:��bR�W0�v�g��6��c�K=Ѽx��>*�%��p�SX�\r^bVy+�Ƚ�	�<0awk�2:5�f̙U���zO�;�\\�x�R�*/Ys;�\r�fM����x�YIQF���X�RxdSm��M	Spj^��k�΋WɧV//^���K�VD߸��t+s�|�S�2�%ne���0��£�#�U\r����ö�/�\Z�ʽ���X�R�//%VQ����k�	�u��������}��Kḡ]�T�w_�m�����% �<,�o���rW�[ݠ/d�$�Cd���%������N5�����j&��ф	��}z\"�Y�R�ֻ@x��((�<�/���KV��-g^�{g��<�C�Yb�@�}�=aI����tϙ3��T��q����H(p�~�TWFOE��H/M��\rv�%q�ن�n|�^ү��/�;�Ծr���K�w*�\"^�}o�����㺢Yܪr:�nF&k`�b�4��)�%q�Y��K/6N/P���rs�0�� G\ZUF�q�s��9��9��������-L���&�5R��^�OK\\�Rpc�+xɄf�;r0a/��eJ��H7ۖ�����\\\r�r���%3r��~��b`f�����%�>��ܡ���}��G�9�	xIZ�iT�v*G�����!�s)�yɝ�	r3�(�]��?�����v/���K���_�;�a�^V�L6�F^�X%BI���i���C)$�O������·��>�7[�K�z<r���/ݗ��&�N�k�lP�P�>3\r�o�6/9G��v�힑�k/�Vs�T;����K��t�}I&0a/��_S�>\n��:DX�ޗf���Z�DΏK/�^Ns�T����X����KsEE	xINt��F������Og�yc�d��\Z^���u�����_��&a�{��4�+r���\0���b����no\"�**eLo<b�A�\rf\r/m\n|}��WB���3\\���N�._ܯ���\r^�R���n~�&���L�xyi����%�Z�)�]�/����k��2E���i�qs�CE�$g>��2S\r�ղ#��9��_g(�m��-���`�Iyz	�$�e��<��R��ƓL��KB��Dm6��O��dD���+;BJ�l����|9�����l��\Z�v��E^Q�k<#�^P����z�}���F������v�d/�[�K�*{8�M{t/�k�Ni�������f��k���d>�w�^��&����S	S���:7q�9�uZ�K���n���|/�����w|(^2�b��#W8c�.x�<`\\����\r��gT��I&zo�-�>b	/�W�\'X��:xIZ����oS��Lʿ�7�0����t��r#\"��|��4c�d&v:X�K#��*l�K�%�:׸_�0��d/�u���	���>\0�woT��_����g�縼��L��o����U�$�)۾���/�%�ԉ�CҞ�\"^2\Z䯤��\"Bot�������|� 睤m;xI1k�5��r�%i��c��\0^2����9gWy��K��!�*W��ǛO%�3�@�e�תc)/͌��3k/����i\0^��el�\\~�/\0^2���56z��`�^2I�T�/E��&�eD�z�ظ�݄��0/9W#��a�!�^��xIV����7��&xɰ��|E���(�%c�י_f9���9�6]֑��;[�B������̱u\nxI^K~�}9���%㿬�\"&�)�?���u���]�e׵�=;&sy)�2����z��K����Xۗ�K�u���sr}|��KFCҨ��	��>�?0>_�<;DR_</嵫�>2��.s�l��K�%�I��+Ȁ�̯NqG�}&���<���*B.��ZJ3��ˆ�:�|J���J�gݪ�J��>�Е	^U�O/-b�u��<�+r�\0g9x����A=��S��U���Q���-\\���j,/��y��ltg�M\nxIRu����5\"������-0�d`�M)\\�>��z��52?�����\'��ҷ���4*�����套�bǷb]%xIb}k>}&�ve�Qe������I��r�&w�/�Ќ˙�6�%�������\n^�И��0a/i��Z\"�jW>��a�JF>O�v��Ǳ����4��\r���%A����u�S��\0^�.#��\\�&L�%��N���Ҫ�r�z��	A�\"?��/]L�m�G�N�ѳaK���h�CQ�����^���G�\"w\np���4*XS�[��[�Q�s>�9{�#���i/�7��V���Kb��LQ�s?c>L�K2�7�0a/��:9�ۻDh�۴���29k��b�s4{P��K���w�.xIP�R�_;�\Z�\Z�K���ߗ0a/i��#���0�\0��w��N�T��)����\Z=ì�%v��֊`^��IU{��b~��KB��>��xIO`&��Wo��\0��ȍ6������\"g����K�~i��xI��^?�p)wz	�$�e���k����%\0ӯ��\'>3Z�_���̼&���o�Iq���zl>o��xI��C.��A���$�_�;�P�/鐿����Z�s�+��)y�aU�;1�*6�R�k�̏�K�%M�+�Kn3��xIN/���\09��K�^�-iT�ޓ(7_�K�z�:-�bi���:/5��\0/I|睲�b�^�~\'����GE�?C��AK^�>@z7�6	L\"Щ��/�f,#f/��PV/�����Z�q�=���%��k��\"i�5x��Kq�;9�\"B�s�&bT3�#��rؙ\np6�҆;��v2�q\\��<%.y_\Z`�$���Τ��/�d��k�G���SBwe�Pԓ���^���\0^/i�R���?cy\rIo��|E�DE����Q�G��I�E�z;��-����T0����F�%��P6�C��߶�:�^�e|E&L�x���އ��vn�D�z�<P��P�T#��j^\Z���K1���5�?����7xIT���ĳ��\"^��ʤ�5|�eL5�FI>��+eG��.V�R�8�%�y)[���DK�{��c^����c�Q+x)��y�!kR���$.���Ɏ�W%0\rM���_B~	���_!hɝhJz����e+rNˊ���%#�Ԟʯ�gEjx~���}k����||��п^�1��ד��i�m~k��������(क़��%{�o�R�+1�׹%�^��U�V���\r+x)?�ޯ8�φ��%�7v�K�ڳ��L��K1Ś\r5N�kG�E�5+��`�\'0��{����n��U\0^���_�ek��{�Wצ/���Κ������{�ɋ����a�w�f�{�xR�=.k������/M��m/���T��^wÚ㆖7�7~�$���z�c���+�t�ZT�P��4���׎�eTwL���z�9R¼]x)�i�O��hjh48/ɋ��`�^�=/|e~y�qK�z����?M�%ݶ�6�Re�,ҫ����K���&Ee�F<�%yeg��\'�E/�����PY#|!*w%ڟ�K�~�7�K�J�:lी�E9��R�K�c>)�䵵��$���9�0��~�I���&�_�ڟ�v玾��PL�\0��K�\rn�o���Ҹ����^\\/%B�6R�Q�/i@�� |\\�t�p�jݕ�Ÿ����L�n/�t���\nS�y���K.4O�\0/%b�MY��\';���%]\n�f�L��䟨^�ӝ������Z��^*�E��(�����d�s�k~��K�P哭ȝ����Q�ܮs_��V���3⍾���\r���r�p�bJx)	�t{֝�/%�헭���	��8~�Q�K��\'u�L�z�w�Ud|Sj~^�����ʆ9x):���\0/%$\r0e�~�v8���t�NvL\"�L�V�����5L�\0��+m\n���x�?�i��8�	����W���[���ך�3��t��t�\n�l�E�?1/)0�\0�����7t�V2/���ή��do�zƲ����[��z\"x��i���Ih�f^�.��d<=�һ�$üļ�A�:���.�)�A�׌KL�a���{�D�R���e�y�yI��}%یy�]#Ǽļ��N��S�\'�*P��9��`wU�����R�!�����h�w.�1/i���S�ә��������YT�����%�[���5��C�enCEȄ��{�楃�5��K��^�3/1/1/Ѵ�\Z�kf���l�c��;\Z���Y�Y�\ZL�&})�`$�����RAs�ZV��;���0�%�%�%��C������!����E��C��J0��%g��̰�os������4�ת�y���U���y�y�y���&��vO�{���_0c~s̵W�4y�QS�[�31�	�d���>zz�k�1�d^r��R\Zg^b^b^��K���;�{�j����\0h���މ������Jn徱�?�_����?��y���a�y��S\n���A���5|�~\0���}�����[7/M�\\迠3��p^������G�,w^򻁧�E�������٨y������}M�]�w�.%Ϙ�^�\0�z��?��B�k��#��t�2�8�Rz|��W�y�y�y�����	z���u��Zw�.֘,,�K�1�\0�G�Yg��2��ͧX����L9/����=żļļDͲ�v�ЙlL\\26$f��\n�I[ˡ���R��!CzA�����j��H]�X:�Ŕ�����kM�������9��R�\Z:l��PewIbyR%$��=���-ȝ�+\n\\З����#�`�}d���ꓽ�/cǼļļD�`��J3��:��;@�cO$MPÜ��ʄ�}�:e�q�|�i���[\rtNͼ&?���B���棧s/1/1/1/Ѳ����?�E�{��O�&�]�⊓�K\r4ː�/Y��N&h-b��蠖�����n���!��:��y�y�y��5&.���Gǃ43:9�)C�R|^Rx	!�<����˾֘������P^�7��{ka������Ƽļ7^b`Yj�S2��wQvV�GB!�3�>���^a46�w�L{l�cVu~h��d�)��W��$`�ߞH\'0/1/1/�r���|\\����^/	���H0���K/ز����L�Z�4:Yq��U]���Rc#��]�Uw������Y���}v\r�z?ZR�\'ؿ��2~,1��:�o�_�w|�Ё�N[c�Vj���6�Ǌ��~§�\"��o���R�p�y	�r�\\�W��<:C��Z�n��w)��^�gx^`G������[Q��\r�ǊN�2r^�?}љ1\'�Z虗�����X�E����P.��j�Z�;�\'�K��W�L3�	&��5�����m�7��)-�ѕ��\'���C�*��r�[`��\"���#�xü��㪍�xS������+F)\'=/����\"g�=�%�%�%楗l~�W��B�W��X�Fm���a;Q䥩�p�_�]�{�	�\Z��q6�j�x�R��=/e\'yіN/4�	���+�@���\0�~ȭ����Kw�����į�������C��K�%��yI�K��}߾�%e^b^b^�a�t�����Дu�A�Uw�B��	�R��pa�xZ �$�`��j�~���T��Fx�%�T�9M�]�%�%�%�U��o�F�ƅ���x�N��2���ó,N�#}�x��E�G�6U����^�]�9�eM������(�;��>����6��ܨ�TN��RZ��O�qe�g�O�[���CS�*�P�(I/٣��\"W��H�1/1/1/�@�.�yVO4�����U���^2�C�6S-Ql�	�U�rE.���wS�ZgG�v�C\n/��0qZ���K�K�K�Mr2O�%�A��J@2���w�_���l�$P��v\r\\�Ym��ݍ�����Q�Kv�(�24�+�������o�n��ބP$���H.�W�f^zՖ<�dL)�ݽ��--���}�y5���^��QE���p�y�y�y)�_�3���]�Nj|A�ޛ��澃�\0I^�7� W�������;�Ѻ��+w��K�V�򝟪�N�K�K��%��Zm\0l�����R\Z����6vǼ��UL΍���|����\r�m��&����Y\\��)OW2/1/�����c8�s�xB׻���Ň>��j�1�¼��Y%A�)R��w� ��B��L��RԤ!���~E�ű�TS(���R�\r�|��\Zc>�S�6鷜w��K����\\��݊�P|Jy���P�n���Kv)#�{���%�%�x[�xk�����JB��\\N�zM��-5UQZt��Y��a\'�T}��xzɈX�K/��cQ\n�+r�K�K�K��(%�\\_�0��[7� �==��kI�%�|UQ�E���&�O(�`�qx[��}y�$**�:����y�y�y)�6�A�~Hnj��n���v�\n��!`�KvSTEqOd���6w0]�8hD}�U\"/�a,J^����R�����έ���;�[6���ļI��$J\n�U���\\�S㌣�*���%����AX��-��)�%�%�8�J��L�z���t�.~K�*u�����b�1�\nL^ES%&ZM\\<ӹE-�(��쇸\"�v/1/1/1/�9WՖ�[��G�s0�rt���8)��@^ʊ����]O���T�ꞟ�{kQ��f����	E�*�{�y�y�y)�V����J�������^�)\ZJ��KQ��P8\'Cu0�H��>�J�f/�8D�Ryɮ��)���W1/1/1/�ּ3�?��F�;��m����V�h�HN#ryI�n�3��[�b��;�u^:���ǈ���V(�TH*�K�K�K����n�i�@�0(/�����qy���EX�#;��)R��j�j�H��}�K./ٍo�^*��%+������bjV\Z��>�?$=���P�\"��@�m99�D��+rNfJ3�4�o)��	�qf)��.���kKtG�=���%����o�́���B�H�7�_�5E]oFN�RBy�ޏ��dlH:s�9����5!ۡ���%�K��U�������i��,�?ll�Pzʣ�h���ߓ�	�%K�v�s�G��y͂ԝ��cuPټ�(�A�Fb^b^�.1/���mCU��\"�P�`w@:�g7���N��M(/��)&�V#X������K/C�n�߯�@�d݅\"LnI0/1/1/���[#�=85��{X�W-X��{ȼm�i�!��=���u�<�r��q5G�.��l�(l�_5�1/1/1/�����B���7��!��m{s�5Y�,����&���3��c =�Yma���Kr�,�R�[/-��(��3/1/1/��j�0�;���X�mʽ�vc#p�mYa,��d}��%��)��j���.#��Fgn�.�\Z��-9�\nx�z�R^w3/1/1/�ϊ;��bZv�7�ܣ�h�� ����~6��d7�sQ~�C=PiR�ݿ=0~Sz\nu!�t��w�]��H>좸�(�;�h�����[�O�˙�C�&	`����ZW*��h��*.�GCK�/i�	_e�$0����;�4��U��/�\\�j��G��n�e@�1/if$�S��\"[�Y�+$٣�����[mQ�a�`ş�da�KZ��^�qJ�%�%ॼ:8�䭲]EfM:�{T������μ������VH98��z�5􅟜\Z��v�KZ��LxI[b�v��(�K�K�Kyå�*y)\"�(�J�{Y�\\ol��Eogyk^�l�\0�:[�YLΣ�?�s�~.��3�u�~8d���Р����3ėE���������rf��K�1�P%*+T�:�ƥ-n�Uv�6���%��F\0LbuBk�9���g�K�F��0���aL�ؐ��#^�V��1��%�%�|����s�|kE=[ҟ��g�-6]�E1���yI[Ū\n|��+\r\r��\\Q�\\^��!i�s�a��U�\Z$2����\r\"L�K�K�K�2	y�o,�u�WsDݹ�]��v�<��w^�B��J�p���-О\\mR��u\\��Ez�̌���� ��h�/i^�i�SO(\0^^�!/�10�!R����n.��δȸ��K%�����$_ȀIW�[�QYm�WWT�C���(l���4�\nq��LQ��/Ť�)\r�\"L�K�K�Ky2$�.�$��QB��\"U�#�;�P�ŷ�%M\"�0}���Nn�4��z(B��,��i���V\\������Ō���s���}#���C\\z_^rP/�>{!����I�S�o��wQ�뀗4��#���Z��2r{�]c��sM���l����Tʡ+\nZr���3�%��>Щ�\r�������c��y�M���~7E����c�I�I��/}ي�����W�r���\Z�$O?��J�x`*��_�G�W�xZ���T�i�xI~��i�0///����JB��\n���v�yW�<֎nx鏣�Db`ҍ�6��@�,<�T�������э��:u\Zۣ�ʎ��J����ݖ///��鬪�wE�����\"(�P��	�|ʛ\n�ҷ5�J)���c�O42R}<9���2(�;A��z��KPv�( ��ͧ��z�6��;��X\0�����=QB�-�J��᳄{as�͝�M,����������kf[�sXo���vƻcKM�u�Qf�b]���X�7ۉ��<Zn2�|�v�,yI�+\'�S��^^^ʉ�Q�S��/*��SQ�<u㽉1�f\0^�g���Rb3����}ſ-��@O��`� �:��^C*�}LL�I��8�P�B���9W|Y�������w�~WgR��M��/hw�C��w�zp\rx�~m?�ɱ�T58D��w������xN�mtTA,��X�|�)^D��D����q�Y�_�q�.��ј�׋��4x	x	x)�憺[�7}yUEl4�K�*����!qQ��oy�K���f|�`�K�gl�77u����6k��Iz��2�dא��n���8C6G��>�u���c�Ǚ�&�Ô�\" ///�-T�ғ<:4B]\r��r�zJn����Z3��%��r��}ƅ��I��虾g�����=7�.��x�7����mw�_���e}���f�K��j�ћ��K�K�Ky0��k�l���/.��Ɔ�A�C?����h֍0�jF: �0zj�̈��v:Ə���b�DƼ�M��c�b��%�%�<P@�i�ZwԻq_/P��ۮ���,Ɣ-f��J�1`�.�LtHg��PY<�,�6�&��%_%�7�������K�L�UeW%-MQ��n�8]$_\"�H��%w�U^|2�d��?�$�n\\��f?	���h�Y�������///e�(���!y������U��<i�ȝ��;��T�x�~�Q�6]�\r�I�y[F�a�D���-q�ʠ�8���G\\z3^�oP�eC��=~\"n$vz\ZW?$�0,��,/]����(�ly�c�H�[���e&��%3�,�Mij///eݜ-\n�zĸcnQ���\"��K��8�%��o�����͡�?���ucd3|������n�+�ʢ\0///e��ȹ��s�Q�BM���0��L�x	e����r)\'�����BL�F�e�/��eQJ\"L�K�K�K�69�~�P�=z�Y(�J/	������x�U�`o�ot����{��a����U	��K����w��Ln�%�%�l��؍>#r%�qu����Rm��/��.��2��*8��П��Øy�v�^o�t��///e��\'T���@�{��X�]��*�1-�����.�wc���{֛;��tP\"�Dȅ��}����B�_///e��\r�푋3��rK��)X?�������/^�LX��z�+h�y�Лb�a�o#^�)��?i�p///eؤ.R�rI�:+�%.^GE�(R^����7�RL\0ur`��$�l$�/J��w.�Y|xI�:�ΘP��^^^ʰ٨�Hߒ�T��guP��\"�%���@����J;�t�2�:ڏ�9��m>#ʇ�4)F�i�~o\0//咗��fCd\Zy�w��}��Sd�T��\'�\0/�\nG�%�:�A%[���H�����Ɠ/iM�L��^^\\z^2�9���Pu3���u	/���DD�¥rM%T��v���ݨ�Me}��-j^�$ﰅ;^�]����U�&*:��9���%e_�U�K����u�)B�NVʊ�b0��2\ZLunQ:rL����<ǒ/i����>��K�K�K5yl����Ӳ�@M��_�Ί�%��ɥ\0/����L1Ȥ��e����Ӎs��/i|���+>///e��\r���q)�!�����,</)�w�����(�\"������W��~UVN}���$��%���� �U����M3��`���&���*i\Zt˅�-/��)�qܳ�KO)�C���֯���Z4�s�+ڳI��Jz��\\6�0a�������m�7rהo�&��:�����x�-yIBΈuH�ԏ�]X=W��]�WTbT�|k`��KG)��);�ݾ� �IT�M�2�ա�b?��d�(���$+y�v��oW�Gu/X��v�Kɧ �7����Dߵ���#x��#\r��xI^�&�1!^��;\"v�������w��>c\r2�K�\'e{H+���\rD���E�wZ��\\P��\"�+Dm�n�*C����Y�������y���+:��S�ŕno,iE����H���{kH#I\00�\ZA.�\n\"�D��/��o�}��P3ێ��U�wL�j��U]��VK�^�=��\'m�2_\0����Būq��W���i�O���n�Qns�8�_,����|��?���[գ�����+������6����a�v�y~�K��+�o����Ͻ����[9[ǫ��)M���� ��K_Zwᯄač��\\���j���@�>���aw�+�{Q���?����h���t���dk͜�>}�;���zmt��4��+����ۧ9���6.+�W/_f��Q���d���M����og�y;�F��?��v��~}N�u;?�I�闄]i0��v��|�=���Pۭ,��I�e�O(�g��V���u�K/�c4�N��%�_�J_H��JO��̯���@�%��{V��#�U����i��2�=���T����|�y�R�?n�\rn~?����`o�o��҅z{�v�7o\'�������@�y�4�~��h~t�\'�����\r����j���T+�/��_��!7RK)�R�z\\S�}��гu�?.��w����^�%�^J����9��̿0�Bے�5	\0�R$���ɴ�i;s.��z�7\0�8�Bw�^2?�V���.]F\0��\"�_�6E��d�;4\n��ޚY�\0��R��tX\r���-��I��\0��P/��w��ٷ]k��T�Y�\r\0z)�^ w�w�s\'����1�\0@/E\"ب2w��5&��N6�\0�����Z����׾ޣR��\0�R4���u����=\r��ƴe�^�Dk��G�J硍*��F\0�H�/���_X�zoW\r \0H���������A����lމ��\0�l.E�K��K�E�}�C���z�K\0��b\\�T��d=�ڹi�m�\0�^�D)�xi�k��޳�Z﫦�\0z)���}e=�pq\ZX���\0zi��C���d�m�zK�\\\0���^9�h[�}���о޻6�\0���\"�����9�v���׌\0H��\"\n��[r�_ۙs� �K�[�z@�O/�;\'���Ѷ�n`��壡\0z)�̟-o%Pl\\d^�ݼ\n���d�\0�^���\n���\0:���r�Ck�7��(�<�\0	�R�%�;��U��6�q��n���O�;.\n\0H��Z�@�d�-�x��mB/^[/6J\0��z�`y6�Xif�u*<^n\'�u�Pw]\0@:��l��8ȼHg<�m\'h��jv\0��K1���r��2�@}Z�N�p��\0�,�C/=.����\'�Bo�MB�ĕ\0��R�n��P�����D{)�k_\0H���/�?�@�1��^��q��S�\0 �^���4����~x½t��\0 �^�2�aBm��=[���۞�]\Z\0�H/5+��K��m,t�H4�6f�\0H��J�|�nn�����\\��t9pe\0@�^�b����|W.����(��*�7m	\0)�R;|��sߋ�u�������rz�T�y\n\0��K_��}�{9�.�����m9���^7ngr	\0��ߋ�>j�k;���l^�6ѭ�7�%\0\0��҇����T��\\\0�\0��\0\0~Y/	&\0\0�\0�\\�K\0\0z	\0@/\0�%\0����`\0�^\0�K\0\0z	\0@/\0�%\0�O�K�	\0�Kz	\0@/\0�%\0\0�\0���$�\0\0���\0\0>�Kz	\0�Kz	\0@/\0�%\0����`\0�^\0�K\0\0z	\0@/\0�%\0�O�K�	\0�Kz	\0@/\0�%\0\0�\0���$�\0\0���\0\0�\0�^\0�K\0\0z	\0�S��`\0�^\0�K\0\0z	\0@/\0�i/	&\0@/�%\0���^\0��^\0�K\0\0z	\0`e�$�\0\0���\0\0�\0�^\0�K\0\0z	\0�S��`\0�^\0�K\0\0z	\0`e�$�\0\0���\0\0>�Kz	\0�Kz	\0@/\0���$�\0\0���\0\0�\0�^\0XY/	&\0@.�%\0\0�\0��\0\0V�K�	\0�Kz	\0�#���\0\0���\0\0�\0�?�K�	\0�Kz	\0@/\0�%\0����`\0�^\0��^\0�K\0\0+�%�\0�%�\0�%�\0��\0\0�\0����`\0�^�����@ ����/I*\0_�%\0\0_\0�}I�\0\0]�%\0��|	\0��\0\0b_&\0@�|	\0�%_\0�%\0\0_\0(��0\0��K\0�/�\0�/\0ľ$L\0�.�\0�K�\0�K\0\0�/	\0�K�\0��/\0�\0@�K�\0�/\0��K\0\0�\0��0\0��K\0�/�\0��/	\0�K�\0��/\0�\0@�K�\0�/\0��K\0\0�$L\0�.�\0�K�\0�K\0\0�/	\0�K�\0��/\0<��0\0��K\0�/�\0�/\0ľ$L\0�.�\0�K�\0��0\0�\0@i�|	\0�%_\0|I�\0\0]�%\0\0_\0h��0\0��K\0�.�\0�K�\0��0\0��K\0�/�\0�K�\0�K\0\0�]�%\0��|	\0�%a\0tɗ\0\0|	\0��K�\0��/\0��K\0�/�\0@�K�\0�/\0��K\0�/	\0@�K�\0��/\0�$L\0�.�\0�/\0�~I�\0\0]�%\0��|	\0�%a\0�uɗ\0\0_�%\0���	\0�%_\0�%\0��/	\0�K�\0��/\0�$L\0�.�\0�/\0l~I�\0\0]�%\0��|	\0�%a\0tɗ\0\0|	\0`�K�\0�/\0��K\0�/	\0�K�\0�K\0\0�_&\0@�|	\0�%_\0|I�\0\0]�%\0\0_\0���0\0��K\0�/	\0�K�\0�/\0�~I�\0\0_�%\0@�|	\0�%a\0tɗ\0\0|	\0`�K�\0�/\0��K\0�/	\0�K�\0�K\0\0�_&\0@�|	\0�%a\0tɗ\0\0_�%\0��/	\0�K�\0��0\0��K\0�/�\0�K�\0��%_\0|I�\0\0]�%\0��|	\0�%a\0tɗ\0\0F�$L\0�/�\0�K�\0��0\0��K\0�/�\0�旄	\0�%_\0|I�\0\0]�%\0��|	\0�%a\0��/\0�$L\0�.�\0�K�\0��0\0��K\0\0�_&\0@�|	\0�%_\0|I�\0\0]�%\0���	\0`�K�\0��/\0�$L\0�.�\0�K�\0�/\0��K\0\0\'�$L\0�.�\0�K�\0�/\0��K\0�/	\0�K�\0p�K�\0�/\0�$L\0�.�\0�K�\0�/\0�$L\0\0�\0��.�\0�K�\0�/\0�$L\0�.�\0�K�\0�/\0���0\0��K\0�/	\0�K�\0�/\0�$L\0�.�\0��/	\0�K�\0��0\0��K\0�/	\0�K�\0��/\0�$L\0\0?�/\0�$L\0�.�|��1\0\0\0@����ep\0�/&\0�.�%\0�/&\0�.�%\0�/&\0\0�\0`��\0��\0`��\0��\0`��\0��\0`��\0��\0�]�K\0�_2L\0�]�K\0�_2L\0�]�K\0�_2L\0�]�K\0�_2L\0\0�]�K\0�_2L\0�]�K\0�_2L\0�]�K\0�_2L\0�]�K\0�_2L\0�]�K\0\0~�0\0v�/\0~�0\0v�/\0~�0\0v�/\0~�0\0v�/\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0`�\0���\0`�\0���\0`�\0`��\0��\0`��\0��0L\0�]�K\0�_2L\0�]�K\0�_2L\0�]�K\0�_2L\0�]�K\0�_2L\0�]�/\0~�0\0v�/\0~�0\0v�0\0v�/\0~�0\0v�/\0~	�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0`�\0`��\0��\0`��\0��\0`�\0���\0`�0L\0`��K\0�_2L\0�]�K\0�_2L\0�]2L\0�]�K\0�_2L\0�]BF\0��0L\0`��K\0�_2L\0�]2L\0�]�K\0�_2L\0�]�K\0�_2L\0�]�/�_�0�]�0\0v�/\0~�0\0v�/\0~�0\0v�0\0v	�\0~	�\0v	�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%�\0�%\0�%\0�%�\0��\0`�\0���\0`�\0`��\0��0L\0`�0L\0`��K\0��0L\0�]2L\0�]�K\0�_2L\0�]2L\0�]�K\0�_�0�]�0�_�/�]�0\0v�/\0~�0\0v�0\0v�/\0~	�\0v	�\0v	�\0~	�\0�%�\0�%�\0�%�\0�%�\0�%\0�%\0�%�\0�%\0�%\0`��\0��\0`�\0`�\0���K\0`�0L\0`�0L\0`��K\0��0L\0�]2L\0�]2L\0�_�K\0�]�0�]�0�]�/�_�0�]�0�]�/\0~�0\0v�0\0v�0\0v	�\0~	�\0v	�\0v	�\0~	�\0v	�\0�%�\0�%�\0�%\0�%\0�%�\0�%\0�%\0�%\0���\0`�\0`�0L\0`��K\0��0L\0`�0L\0`�0L\0���K\0`�0L\0�]2L\0�]�K\0�_�0�]�0�]�0�]�0�_�/�]�0�]�0\0v�0\0v	�\0~	�\0v	�\0v	�\0v	�\0v	�\0~	�\0v	�\0�n�\0\0\0 �ߚ\"����4�����`����^����`����`����`����^����`����`���R����R����R{���R����R����R����R����R{���R\r���K\r���K\r���K����K\r���K\r���K\r���K\r���K���j/5��j.5��j.5��j.5��j.5��j.���j/5��j.5��j.�`����`����`����`����^����`����`����`���TWS�\\��TUs��TUs��TU{��TUs��TUs��TUs��TUs��TUs�SUs�SUͥSU���RUͥSUͥSUͥSUͥSUͥ\ZLUͥ\ZLU���KU5�\ZLU5�\ZLU5�\ZLU5�\ZLU5�\ZLU5�\ZLU5�j0U��j/U5�j0U�\\j0U�\\j0U�\\j0U�\\j0U�\\j0U�\\��T�\\��T�\\��T�\\��TUs��TUs��TUs��TUs��TUs�SU{�SUs�SUs�SUͥ�RUͥSUͥSUͥSUͥSUͥ\ZLUͥ\ZLUͥ\ZLUͥ\ZLU5�\ZLU5�\ZLU5�\ZLU5�\ZLU5�j0U5�j0U5�j0U5�j0U5�j0U�\\j0U�\\j0U�^j0U�\\��T�\\��T�\\��T�\\��T�\\��T�\\��TUs��TUk��TUs��TUs�SUs�SUs�SUs�SUs�SUs�SUͥSUͥSUͥ\ZLUͥ\ZLUͥ\ZLUͥ\ZLUͥ\ZLUͥ\ZLUͥ\ZLU5�\ZLU5�j1U5�j0U5�j0U��j0U5�j0U5�j0U5�j0U5�j0U�\\���j.�`�j.�`�j.�`�j.�`�j.�`�j.�`�j.�`�j.�`���T����T����T����T����T����T����T����T����T\r���R\r���R\r���R\r���R\r���R\r���R-���R\r���R5���R5���K5���K5���K����K5��ZK5���K5���K5���K�`��K�b�j.�`�j-�`�j.�`�j.�`�j.�`�j.�`�j.U��j.U��j-U����T����T����T����T����T����T-���T\r���T\r���T\r���R-���R\r���R\r���R\r���R����R5���R5���R����V5��ZK5���K5���K���ZK5���K�`��K�`��K�b�ZK�`��-�`�j.�b�j.�`�j-�`�j.U��j.U��j-U��j.U��j.U����T����T����T���[\0\0\0\0���)���Ru���Ru���R����Ru���R����Ru����zLUݥ:LU���0Uݥ�1U���0Uݥ�1Uݥ�0U���0Uݥ�1U���0Uu��1Uu���T����Tu���T����Tu���Tu���T����Tu���T�[�S�]�S�]�S�[�S�]�S�[�S�]�S�[�S�]�:LUo�zLUo�:LUw�zLUo�:LUw�zLUo�:LUw�zLUo��1Uw��0U���1U���0Uݥ�1U���0Uݥ�1U���1Uݥ��T����T����Tu���T����Tu���T����Tu���T����Tu��S���S���S�]�S�[�S�[�S�]�S�[�S�[�zL�[�zL�]�:L�[�zLUo�zLUo�:LUw�zLUo�zLUo��1Uo��0Uw��1Uo��1Uo��1U���0Uݥ�1U���1U����Tݥ��T����T����T����Tݥ��T����T����T���S���S���S���S���S���S���S�[�S�]�zL�[�:L�[�zL�[�zL�[�zL�[�zL�[�zL�[�zL�[��1Uo��1Uo��1Uo��1Uo��1Uo��1Uo��1Uo��1Uo���To���T����T����T����T����T����T����T���.S���S���S���S���S���.Su��S���S���zL���zL����Lu��zL�[�zL�[�zL�[��L�[�zL�Y��1�[��2�Y��1�[��2�Y��1�[��2Ug��1Uo��2Ug���To���Tg���To���Tg���Tg���To���T����T���.S���S���.S���S���.S���.S���.S���.S����Lu���L����Lu���Lu���Lu���Lu��zLu���Lu���2u���2�Y��2�Y��2�Y��2�Y��2�Y��2�Y��2�Y����W����Y����W���Tg���T_���Tg���T_��.Sg��>S_��.Sg��>S_��>Sg��.S}��>S���.S}���L}���L}��:M}���L]���L}��:M]���L}���L����4u���3����3����4u���3����4u���4u��������������t�����S����U����S����U��^�S��^�S��~�Q��~�O��n�O��~�O��~�O���M?���M?��n�\0\0\0 ��\Z��J�5\0�d�\0\0�d�\0\0�d�\0\0�d�\0\0��$=\0��UR\0\0�\n�j@9�}\0\0\0\0IEND�B`�');
/*!40000 ALTER TABLE `userkyctable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroles`
--

DROP TABLE IF EXISTS `userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userroles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(100) NOT NULL,
  `orgname` varchar(150) NOT NULL,
  `orgcode` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store user roles for employees in an org ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (3,'Sales','Seawave Forwarding Logistics','seawave@2323'),(4,'Developer','Seawave Forwarding Logistics','seawave@2323'),(5,'Manager','Seawave Forwarding Logistics','seawave@2323');
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  PRIMARY KEY (`orgcode`),
  KEY `idx_users_orgname` (`orgname`),
  KEY `idx_users_orgcode_orgname` (`orgcode`,`orgname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is just for testing of DB connection and to verify that DB has been integrated';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','12345678','c@2102','C Connect Logi'),('admin','12345','seawave@2323','Seawave Forwarding Logistics'),('Test','Test1234','testorg@Test123','TestOrg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workflow`
--

DROP TABLE IF EXISTS `workflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workflow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lobname` varchar(150) NOT NULL,
  `ownbranchname` varchar(150) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `importername` varchar(150) DEFAULT 'null',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the workflow rows ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
INSERT INTO `workflow` VALUES (13,'Air IMPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323','Prince LLP'),(14,'Air IMPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323',NULL),(15,'Air EXPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323',NULL),(16,'Air EXPORT','Delhi','Seawave Forwarding Logistics','seawave@2323',NULL);
/*!40000 ALTER TABLE `workflow` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-08 12:40:05
