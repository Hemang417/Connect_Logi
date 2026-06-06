-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 192.168.1.21    Database: crm_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `accesscontrol`
--

DROP TABLE IF EXISTS `accesscontrol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accesscontrol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `orgname` varchar(45) DEFAULT NULL,
  `orgcode` varchar(45) DEFAULT NULL,
  `branchname` varchar(45) DEFAULT NULL,
  `branchcode` varchar(45) DEFAULT NULL,
  `section` varchar(100) DEFAULT NULL,
  `control` varchar(100) DEFAULT NULL,
  `changedby` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_access_entry` (`username`,`orgname`,`orgcode`,`branchname`,`branchcode`,`section`,`control`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesscontrol`
--

LOCK TABLES `accesscontrol` WRITE;
/*!40000 ALTER TABLE `accesscontrol` DISABLE KEYS */;
INSERT INTO `accesscontrol` VALUES (1,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','add-client','admin'),(2,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','download-client','admin'),(3,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','delete-client','admin'),(4,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','add-job','admin'),(5,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','delete-job','admin'),(6,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','download-job','admin'),(7,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','track-job','admin'),(8,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','container-details','admin'),(9,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','transport','admin'),(10,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','doc-upload','admin'),(11,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','collection','admin'),(12,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','transaction','admin'),(13,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','quotation','admin'),(14,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','add-job','admin'),(15,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','delete-job','admin'),(16,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','download-job','admin'),(17,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-credit','admin'),(18,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-credit','admin'),(19,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','edit-credit','admin'),(20,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-credit','admin'),(21,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-debit','admin'),(22,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-debit','admin'),(23,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','edit-debit','admin'),(24,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-debit','admin'),(25,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-bank','admin'),(26,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-bank','admin'),(27,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-bank','admin'),(28,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-paye','admin'),(29,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-paye','admin'),(30,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-paye','admin'),(31,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','add-client','admin'),(32,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','download-client','admin'),(33,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','delete-client','admin'),(44,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','add-job','admin'),(45,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','delete-job','admin'),(46,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','download-job','admin'),(47,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-credit','admin'),(48,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-credit','admin'),(49,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','edit-credit','admin'),(50,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-credit','admin'),(51,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-debit','admin'),(52,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-debit','admin'),(53,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','edit-debit','admin'),(54,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-debit','admin'),(55,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-bank','admin'),(56,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-bank','admin'),(57,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-bank','admin'),(58,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-paye','admin'),(59,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-paye','admin'),(60,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-paye','admin'),(62,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','add-job','admin'),(63,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','delete-job','admin'),(64,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','download-job','admin'),(65,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','track-job','admin'),(66,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','container-details','admin'),(67,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','transport','admin'),(68,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','doc-upload','admin'),(69,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','collection','admin'),(70,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','transaction','admin'),(71,'aryan@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','quotation','admin');
/*!40000 ALTER TABLE `accesscontrol` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='if password is change before updating it should go for admin approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminchangeapproval`
--

LOCK TABLES `adminchangeapproval` WRITE;
/*!40000 ALTER TABLE `adminchangeapproval` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table store delted export job ';
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table store delted Import job ';
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table store deleted organization';
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
  `importerbranchname` varchar(45) DEFAULT 'null',
  `exportername` varchar(150) NOT NULL DEFAULT 'null',
  `address` varchar(200) DEFAULT 'null',
  `GST` varchar(45) DEFAULT 'null',
  `IEC` varchar(45) DEFAULT 'null',
  `finaldestination` varchar(45) DEFAULT 'null',
  `portofshipment` varchar(45) DEFAULT 'null',
  `approval` json DEFAULT NULL,
  `OwnTransportFrom` varchar(45) DEFAULT NULL,
  `OwnTransportTo` varchar(45) DEFAULT NULL,
  `OwnTransportPickupDate` datetime DEFAULT NULL,
  `OwnTransportCurrentDate` datetime DEFAULT NULL,
  `containerNoAndWeight` json DEFAULT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `bltype` varchar(45) NOT NULL,
  `dockExecutive` varchar(45) NOT NULL,
  `typesofContainer` varchar(255) DEFAULT NULL,
  `bltypenum` varchar(45) NOT NULL DEFAULT 'null',
  `jobowner` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `benumber` varchar(45) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvexpjob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalexpjob`
--

LOCK TABLES `approvalexpjob` WRITE;
/*!40000 ALTER TABLE `approvalexpjob` DISABLE KEYS */;
INSERT INTO `approvalexpjob` VALUES (1,'/1','2025-07-11 17:10:00','2025-07-12 00:00:00','Air','Kolkata Sea','Yes','Dock Stuff',1,'No','In-Bond','FCL','hgfd','zxzgm','1','Mumbai','Mumbai-1','null','Adani pvt ltd','null','null','null','null','null',NULL,'','',NULL,NULL,'[{\"type\": \"40\'\", \"weight\": \"789\", \"container\": 1, \"containerNo\": \"MSCU1234567\"}]','ExpJobButton','2025-07-11 17:10:31','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','zxaZxX','aryan@Developer','seawave@1','Seawave Forwading And Logistics','asdfg',0,NULL,NULL,NULL);
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
  `dockExecutive` varchar(45) NOT NULL,
  `typesofContainer` varchar(255) DEFAULT NULL,
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
  `importerbranchname` varchar(45) DEFAULT 'null',
  `address` varchar(300) DEFAULT 'null',
  `GST` varchar(45) DEFAULT 'null',
  `IEC` varchar(45) DEFAULT 'null',
  `finaldestination` varchar(45) DEFAULT 'null',
  `portofshipment` varchar(45) DEFAULT 'null',
  `approval` json DEFAULT NULL,
  `OwnTransportFrom` varchar(45) DEFAULT NULL,
  `OwnTransportTo` varchar(45) DEFAULT NULL,
  `OwnTransportPickupDate` datetime DEFAULT NULL,
  `OwnTransportCurrentDate` datetime DEFAULT NULL,
  `containerNoAndWeight` json DEFAULT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `deletedby` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvaljob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalimpjob`
--

LOCK TABLES `approvalimpjob` WRITE;
/*!40000 ALTER TABLE `approvalimpjob` DISABLE KEYS */;
INSERT INTO `approvalimpjob` VALUES (1,'/1','2025-07-08 13:00:00','2025-07-09 00:00:00','Air','Mumbai Sea','Yes','Destuff',1,'Yes','Home','FCL','gndg','test','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','trdtr','Seawave Forwading And Logistics','seawave@1','aryan@Developer','12','Surrender','456','Yearly','1','Mumbai','Mumbai-1','Adani pvt ltd','test','qwertyuhnfh,gf,','29AAAAP0267H1ZK','AAAPB9964C','test','test','[{\"status\": null, \"employeename\": \"sanjeet@Developer\"}, {\"status\": \"Reject\", \"employeename\": \"aryan@Developer\"}]','test','test','2025-07-17 00:00:00','2025-07-15 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-07-08 13:00:05',0,NULL,NULL,NULL),(2,'A/Mumbai/I/25-26/1/Aryan','2025-07-08 13:12:00','2025-07-09 00:00:00','Air','Mumbai Sea','Yes','Loaded',1,'No','Home','FCL','test','tets','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','test','Seawave Forwading And Logistics','seawave@1','admin','1','Surrender','test','Yearly','1','Mumbai','Mumbai-1','Adani pvt ltd','test','qwertyuhnfh,gf,','29AAAAP0267H1ZK','AAAPB9964C','test','test','[{\"status\": null, \"employeename\": \"sanjeet@Developer\"}, {\"status\": \"Approve\", \"employeename\": \"aryan@Developer\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-07-08 13:12:20',0,NULL,NULL,NULL),(3,'S/Mumbai/I/25-26/2/Aryan','2025-07-09 13:07:00','2025-07-09 00:00:00','Sea','Nhava Sea','Yes','Loaded',2,'Yes','Home','FCL','ALL CARGO','Hapag-Lloyd','MBL/MAWB','fetch Persons','20\'','HLCUTYO230416198','Seawave Forwading And Logistics','seawave@1','admin','14','Original','2343704','Yearly','2','Mumbai','Mumbai-1','Lasons India Pvt., Ltd','Lasons','Branch no-0, New Jgruti 227, S.V.Road,bandra west','27AAACL3792R1ZR','0388074159','NHAVA SHEVA','TOKYO, JAPAN','[{\"status\": null, \"employeename\": \"sanjeet@Developer\"}, {\"status\": \"Reject\", \"employeename\": \"aryan@Developer\"}]','Nhava sea','BANDRA','2025-07-11 00:00:00','2025-07-09 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-07-09 13:07:22',0,NULL,NULL,NULL),(4,'S/Mumbai/I/25-26/3/Aryan','2025-07-09 13:07:00','2025-07-09 00:00:00','Sea','Nhava Sea','Yes','Loaded',2,'Yes','Home','FCL','ALL CARGO','Hapag-Lloyd','MBL/MAWB','fetch Persons','20\'','HLCUTYO230416198','Seawave Forwading And Logistics','seawave@1','admin','14','Original','2343704','Yearly','3','Mumbai','Mumbai-1','Lasons India Pvt., Ltd','Lasons','Branch no-0, New Jgruti 227, S.V.Road,bandra west','27AAACL3792R1ZR','0388074159','NHAVA SHEVA','TOKYO, JAPAN','[{\"status\": null, \"employeename\": \"sanjeet@Developer\"}, {\"status\": \"Reject\", \"employeename\": \"aryan@Developer\"}]','Nhava sea','BANDRA','2025-07-11 00:00:00','2025-07-09 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-07-09 13:07:30',0,NULL,NULL,NULL),(5,'S/Mumbai/I/25-26/4/Aryan','2025-07-09 13:07:00','2025-07-09 00:00:00','Sea','Nhava Sea','Yes','Loaded',2,'Yes','Home','FCL','ALL CARGO','Hapag-Lloyd','MBL/MAWB','fetch Persons','20\'','HLCUTYO230416198','Seawave Forwading And Logistics','seawave@1','admin','14','Original','2343704','Yearly','4','Mumbai','Mumbai-1','Lasons India Pvt., Ltd','Lasons','Branch no-0, New Jgruti 227, S.V.Road,bandra west','27AAACL3792R1ZR','0388074159','NHAVA SHEVA','TOKYO, JAPAN','[{\"status\": null, \"employeename\": \"sanjeet@Developer\"}, {\"status\": \"Reject\", \"employeename\": \"aryan@Developer\"}]','Nhava sea','BANDRA','2025-07-11 00:00:00','2025-07-09 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-07-09 13:07:32',0,NULL,NULL,NULL),(6,'S/Mumbai/I/25-26/5/Aryan','2025-07-09 13:07:00','2025-07-09 00:00:00','Sea','Nhava Sea','Yes','Loaded',2,'Yes','Home','FCL','ALL CARGO','Hapag-Lloyd','MBL/MAWB','fetch Persons','20\'','HLCUTYO230416198','Seawave Forwading And Logistics','seawave@1','admin','14','Original','2343704','Yearly','5','Mumbai','Mumbai-1','Lasons India Pvt., Ltd','Lasons','Branch no-0, New Jgruti 227, S.V.Road,bandra west','27AAACL3792R1ZR','0388074159','NHAVA SHEVA','TOKYO, JAPAN','[{\"status\": null, \"employeename\": \"sanjeet@Developer\"}, {\"status\": \"Approve\", \"employeename\": \"aryan@Developer\"}]','Nhava sea','BANDRA','2025-07-11 00:00:00','2025-07-09 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-07-09 13:07:33',0,NULL,NULL,NULL),(7,'S/Mumbai/I/25-26/6/Aryan','2025-07-09 13:07:00','2025-07-09 00:00:00','Sea','Nhava Sea','Yes','Loaded',2,'Yes','Home','FCL','ALL CARGO','Hapag-Lloyd','MBL/MAWB','fetch Persons','20\'','HLCUTYO230416198','Seawave Forwading And Logistics','seawave@1','admin','14','Original','2343704','Yearly','6','Mumbai','Mumbai-1','Lasons India Pvt., Ltd','Lasons','Branch no-0, New Jgruti 227, S.V.Road,bandra west','27AAACL3792R1ZR','0388074159','NHAVA SHEVA','TOKYO, JAPAN','[{\"status\": null, \"employeename\": \"sanjeet@Developer\"}, {\"status\": \"Reject\", \"employeename\": \"aryan@Developer\"}]','Nhava sea','BANDRA','2025-07-11 00:00:00','2025-07-09 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-07-09 13:07:33',0,NULL,NULL,NULL);
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
  `checkedBoxOptions` json DEFAULT NULL,
  `orgganizationTypeOptions` json DEFAULT NULL,
  `contactDetails` json DEFAULT NULL,
  `followup2` varchar(100) DEFAULT NULL,
  `followup3` varchar(100) DEFAULT NULL,
  `showClientCode` tinyint DEFAULT '0',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the organizations before approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalorg`
--

LOCK TABLES `approvalorg` WRITE;
/*!40000 ALTER TABLE `approvalorg` DISABLE KEYS */;
INSERT INTO `approvalorg` VALUES ('adani','India','Maharashtra','Mumbai','400705','9420818812','aryan@gmail.com','AFZPK7190K','27AAAAP0267H2ZN','1234567890','22','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','seawave@1','Seawave Forwading And Logistics','Adani pvt ltd','Mumbai','admin',1,'OrgButton',NULL,'2025-07-07 16:29:53',1,'admin','saa','[\"Shippers\"]','[\"Import\"]','[{\"email\": \"ary@gmail.com\", \"mobile\": \"9420818812\", \"department\": \"IT\", \"contactName\": \"Aryan\", \"designation\": \"a\"}]','22','22',0,'2025-07-17 10:53:14'),('test','Afghanistan','Badghis','Qala i Naw','400705','0200426350','aryan@gmail.com','AFZPK7190K','27AAAAP0267H2ZN','AAAAB1234C','22','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','seawave@1','Seawave Forwading And Logistics','test','test','aryan@Developer',2,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aryan@Developer\"}]','2025-07-08 11:36:59',1,'admin','test','[\"Shippers\", \"Consignee\", \"Services\"]','[\"Import\", \"Export\"]','[{\"email\": \"aryan@gmail.com\", \"mobile\": \"9898998899\", \"department\": \"it\", \"contactName\": \"aryan\", \"designation\": \"a\"}]','22','22',0,'2025-07-09 17:25:27'),('test','Afghanistan','Badghis','Ghormach','400705','0200426350','jai@3231322.hg.com','AFZPK7190K','27AAAAP0267H2ZN','AAAAB1234C','22','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','seawave@1','Seawave Forwading And Logistics','test 2','test','aryan@Developer',3,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aryan@Developer\"}]','2025-07-08 14:58:22',0,NULL,NULL,'[\"Shippers\"]','[\"Import\"]','[]','22','22',0,NULL),('lasons','India','Maharashtra','Bandra','400050','0662604575','Lasons@gmail.com','AAACL3792R','27AAACL3792R1ZR','0388074159','15','Branch no-0, New Jgruti 227, S.V.Road,bandra west','seawave@1','Seawave Forwading And Logistics','Lasons India Pvt., Ltd','Lasons','admin',4,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aryan@Developer\"}]','2025-07-09 13:00:02',0,NULL,NULL,'[\"Shippers\", \"Consignee\", \"Services\", \"Global\", \"Carrier\"]','[\"Import\", \"Export\", \"Transport\", \"Freight\"]','[{\"email\": \"sanjeet@gmail.com\", \"mobile\": \"8021367954\", \"department\": \"SCM\", \"contactName\": \"SANJEET SAWARDEKAR\", \"designation\": \"IMPORT EXE\"}]','16','17',1,NULL);
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
  `createdAt` timestamp NULL DEFAULT NULL,
  `IsDeleted` int DEFAULT '0',
  `deletedby` varchar(50) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `DeleteRemark` varchar(225) DEFAULT NULL,
  `DeletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the name of the approver list of a particular organization';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approverlist`
--

LOCK TABLES `approverlist` WRITE;
/*!40000 ALTER TABLE `approverlist` DISABLE KEYS */;
INSERT INTO `approverlist` VALUES ('Seawave Forwading And Logistics','seawave@1',1,'Import Job Creation','Mumbai','Mumbai-1','[\"ImpJobButton\"]',1,'2025-07-07 09:40:01',0,NULL,'Kunal Lawate@Executive',NULL,NULL),('Seawave Forwading And Logistics','seawave@1',2,'Export Job Creation','Mumbai','Mumbai-1','[\"ExpJobButton\"]',1,'2025-07-07 09:40:03',0,NULL,'Kunal Lawate@Executive',NULL,NULL),('Seawave Forwading And Logistics','seawave@1',3,'Organization Creation','Mumbai','Mumbai-1','[\"OrgButton\"]',1,'2025-07-07 09:40:08',0,NULL,'Kunal Lawate@Executive',NULL,NULL);
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
  `IsDeleted` int DEFAULT '0',
  `deletedby` varchar(40) DEFAULT NULL,
  `createdby` varchar(40) DEFAULT NULL,
  `DeleteRemark` varchar(225) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store all the names of users for a particular approval list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvername`
--

LOCK TABLES `approvername` WRITE;
/*!40000 ALTER TABLE `approvername` DISABLE KEYS */;
INSERT INTO `approvername` VALUES (1,'Seawave Forwading And Logistics','seawave@1','Import Job Creation','sanjeet@Developer','Mumbai','Mumbai-1','[\"ImpJobButton\"]',1,0,NULL,NULL,NULL,NULL,NULL),(2,'Seawave Forwading And Logistics','seawave@1','Export Job Creation','sanjeet@Developer','Mumbai','Mumbai-1','[\"ExpJobButton\"]',2,0,NULL,NULL,NULL,NULL,NULL),(3,'Seawave Forwading And Logistics','seawave@1','Organization Creation','sanjeet@Developer','Mumbai','Mumbai-1','[\"OrgButton\"]',3,0,NULL,NULL,NULL,NULL,NULL),(4,'Seawave Forwading And Logistics','seawave@1','Organization Creation','aryan@Developer','Mumbai','Mumbai-1','[\"OrgButton\"]',3,0,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
INSERT INTO `bankaccount` VALUES ('[{\"branchname\": \"Mumbai\"}]','[{\"branchcode\": \"Mumbai-1\"}]','seawave@1','Seawave Forwading And Logistics','SBI','SBI000K023',1,'Cash Credit','2222','SBIN0111111',22222);
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
  `IsDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is for access of users for their org branches ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchaccess`
--

LOCK TABLES `branchaccess` WRITE;
/*!40000 ALTER TABLE `branchaccess` DISABLE KEYS */;
INSERT INTO `branchaccess` VALUES (1,'Mumbai','Mumbai-1','sanjeet@Developer','Seawave Forwading And Logistics','seawave@1',0),(2,'Mumbai','Mumbai-1','aryan@Developer','Seawave Forwading And Logistics','seawave@1',0);
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
  `isDeleted` tinyint DEFAULT '0',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_braches_orgcode` (`orgcode`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the branches table that are linked to organizations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (2,'test','test 2','seawave@1','4',0,NULL),(3,'test 2','Adani pvt ltd','seawave@1','5',1,'2025-07-17 10:53:14'),(4,'Lasons','Lasons India Pvt., Ltd','seawave@1','6',0,NULL);
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `orgname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `orgcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchnameoforg` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchcodeofemp` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchnameofemp` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `clientname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `Date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `billNo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `amount` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `Tax` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `grandTotal` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `FollowUp1` date DEFAULT NULL,
  `FollowUp2` date DEFAULT NULL,
  `FollowUp3` date DEFAULT NULL,
  `TimeDelay` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `AssignTo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `checkbox` tinyint DEFAULT '0',
  `createdby` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `DeleteRemark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='collection table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (1,'A/Mumbai/I/25-26/1/Aryan','Seawave Forwading And Logistics','seawave@1','test','Mumbai-1','Mumbai','Adani pvt ltd','2025-07-08','BILL-1','111111','12','111123.00','2025-07-20','2025-07-31','2025-08-11','0','Aryan Rajesh Shinde',0,'admin',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
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
  `bid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store contacts of clients ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation_employees`
--

DROP TABLE IF EXISTS `conversation_employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation_employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(50) DEFAULT NULL,
  `orgcode` varchar(50) DEFAULT NULL,
  `conversation_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation_employees`
--

LOCK TABLES `conversation_employees` WRITE;
/*!40000 ALTER TABLE `conversation_employees` DISABLE KEYS */;
INSERT INTO `conversation_employees` VALUES (1,'Seawave Forwading And Logistics','seawave@1',1,1),(2,'Seawave Forwading And Logistics','seawave@1',1,4),(3,'Seawave Forwading And Logistics','seawave@1',2,1),(4,'Seawave Forwading And Logistics','seawave@1',2,5),(5,'Seawave Forwading And Logistics','seawave@1',3,1),(6,'Seawave Forwading And Logistics','seawave@1',3,3),(7,'Seawave Forwading And Logistics','seawave@1',4,1),(8,'Seawave Forwading And Logistics','seawave@1',4,2),(9,'Seawave Forwading And Logistics','seawave@1',5,3),(10,'Seawave Forwading And Logistics','seawave@1',5,2),(11,'Seawave Forwading And Logistics','seawave@1',6,1),(12,'Seawave Forwading And Logistics','seawave@1',6,2),(13,'Seawave Forwading And Logistics','seawave@1',6,3);
/*!40000 ALTER TABLE `conversation_employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(50) DEFAULT NULL,
  `orgcode` varchar(50) DEFAULT NULL,
  `is_group` tinyint(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'Seawave Forwading And Logistics','seawave@1',0,NULL,1,'2025-07-07 11:18:30'),(2,'Seawave Forwading And Logistics','seawave@1',0,NULL,1,'2025-07-07 11:20:57'),(3,'Seawave Forwading And Logistics','seawave@1',0,NULL,1,'2025-07-07 11:21:01'),(4,'Seawave Forwading And Logistics','seawave@1',0,NULL,1,'2025-07-09 07:40:40'),(5,'Seawave Forwading And Logistics','seawave@1',0,NULL,3,'2025-07-09 07:41:25'),(6,'Seawave Forwading And Logistics','seawave@1',1,'INTERNS?',1,'2025-07-09 12:09:32');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit`
--

DROP TABLE IF EXISTS `credit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `referenceno` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `currentdate` date NOT NULL,
  `postDate` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `bankAccount` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `organizationType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `organizationName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `receivedPayementType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `remarks` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `orgname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `orgcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `againstBillDetails` json DEFAULT NULL,
  `onAccountType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `paymentAdvise` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `againstJobDetails` json DEFAULT NULL,
  `amountReceived` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `createdby` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `DeleteRemark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='credit details are store in this table ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES (1,'1','2025-07-08','2025-07-20T00:00','SBI','existing','Adani pvt ltd','against-bill','test','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"A/Mumbai/I/25-26/1/Aryan\", \"billNoForAgainstBill\": \"BILL-1\", \"billamountForAgainstBill\": \"111123.00\", \"tdsDeductionForAgainstBill\": \"218\", \"totalReceivableForAgainstBill\": \"110905.00\"}]','against-job',NULL,'[{\"jobNo\": \"A/Mumbai/I/25-26/1/Aryan\", \"amount\": \"2\", \"typeOfJob\": \"Import\", \"jobOptions\": [{\"label\": \"A/Mumbai/I/25-26/1/Aryan\", \"value\": \"A/Mumbai/I/25-26/1/Aryan\"}]}]','110907','admin',0,NULL,NULL,NULL),(2,'2','2025-07-11','2025-07-11T00:00','SBI','existing','Adani pvt ltd','against-bill','qwertyuiopasdfghjkll,mnbvcxsertyj cdrfghjcd','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"A/Mumbai/I/25-26/1/Aryan\", \"billNoForAgainstBill\": \"BILL-1\", \"billamountForAgainstBill\": \"111123.00\", \"tdsDeductionForAgainstBill\": \"2\", \"totalReceivableForAgainstBill\": \"111121.00\"}]','against-job',NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\", \"jobOptions\": []}]','111121','aryan@Developer',1,'asdfdf','2025-07-11 16:49:12','aryan@Developer'),(3,'3','2025-07-11','2025-07-11T00:00','SBI','existing','Adani pvt ltd','against-bill','sdsdsdsd','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"A/Mumbai/I/25-26/1/Aryan\", \"billNoForAgainstBill\": \"BILL-1\", \"billamountForAgainstBill\": \"111123.00\", \"tdsDeductionForAgainstBill\": \"2\", \"totalReceivableForAgainstBill\": \"111121.00\"}]','against-job',NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\", \"jobOptions\": []}]','111121','aryan@Developer',1,'dhg','2025-07-11 16:05:53','aryan@Developer'),(4,'4','2025-07-11','2025-07-11T00:00','SBI','existing','Adani pvt ltd','against-bill','sdsdsdsd','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"A/Mumbai/I/25-26/1/Aryan\", \"billNoForAgainstBill\": \"BILL-1\", \"billamountForAgainstBill\": \"111123.00\", \"tdsDeductionForAgainstBill\": \"2\", \"totalReceivableForAgainstBill\": \"111121.00\"}]','against-job',NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\", \"jobOptions\": []}]','111121','aryan@Developer',1,'fghf','2025-07-11 16:05:57','aryan@Developer'),(5,'5','2025-07-11','2025-07-11T00:00','SBI','existing','Adani pvt ltd','against-bill','sdsdsdsd','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"A/Mumbai/I/25-26/1/Aryan\", \"billNoForAgainstBill\": \"BILL-1\", \"billamountForAgainstBill\": \"111123.00\", \"tdsDeductionForAgainstBill\": \"2\", \"totalReceivableForAgainstBill\": \"111121.00\"}]','against-job',NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\", \"jobOptions\": []}]','111121','aryan@Developer',1,'fghhf','2025-07-11 16:06:04','aryan@Developer'),(6,'6','2025-07-11','2025-07-11T00:00','SBI','existing','Adani pvt ltd','against-bill','sdsdsdsd','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"A/Mumbai/I/25-26/1/Aryan\", \"billNoForAgainstBill\": \"BILL-1\", \"billamountForAgainstBill\": \"111123.00\", \"tdsDeductionForAgainstBill\": \"2\", \"totalReceivableForAgainstBill\": \"111121.00\"}]','against-job',NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\", \"jobOptions\": []}]','111121','aryan@Developer',0,NULL,NULL,NULL),(7,'7','2025-07-11','2025-07-11T00:00','SBI','existing','Adani pvt ltd','on-account','asas','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"\", \"billNoForAgainstBill\": \"\", \"billamountForAgainstBill\": \"\", \"tdsDeductionForAgainstBill\": \"\", \"totalReceivableForAgainstBill\": \"\"}]','against-job',NULL,'[{\"jobNo\": \"A/Mumbai/I/25-26/1/Aryan\", \"amount\": \"1212\", \"typeOfJob\": \"Import\", \"jobOptions\": [{\"label\": \"A/Mumbai/I/25-26/1/Aryan\", \"value\": \"A/Mumbai/I/25-26/1/Aryan\"}]}]','1212','aryan@Developer',0,NULL,NULL,NULL),(8,'8','2025-07-11','2025-07-11T00:00','SBI','existing','Adani pvt ltd','on-account','asasa','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','[{\"jobNoForAgainstBill\": \"\", \"billNoForAgainstBill\": \"\", \"billamountForAgainstBill\": \"\", \"tdsDeductionForAgainstBill\": \"\", \"totalReceivableForAgainstBill\": \"\"}]','against-job',NULL,'[{\"jobNo\": \"A/Mumbai/I/25-26/1/Aryan\", \"amount\": \"22\", \"typeOfJob\": \"Import\", \"jobOptions\": [{\"label\": \"A/Mumbai/I/25-26/1/Aryan\", \"value\": \"A/Mumbai/I/25-26/1/Aryan\"}]}]','22','aryan@Developer',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ctclients`
--

DROP TABLE IF EXISTS `ctclients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ctclients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `legalName` varchar(255) DEFAULT NULL,
  `address` text,
  `establishedDate` date DEFAULT NULL,
  `country` varchar(100) DEFAULT 'India',
  `panNumber` varchar(20) DEFAULT NULL,
  `gstNumber` varchar(30) DEFAULT NULL,
  `cinNumber` varchar(30) DEFAULT NULL,
  `aeoNumber` varchar(30) DEFAULT NULL,
  `chaLicense` varchar(30) DEFAULT NULL,
  `panCopy` varchar(255) DEFAULT NULL,
  `gstCopy` varchar(255) DEFAULT NULL,
  `cinCopy` varchar(255) DEFAULT NULL,
  `aeoCertificate` varchar(255) DEFAULT NULL,
  `chaDoc` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `services` text,
  `moa` varchar(255) DEFAULT NULL,
  `mou` varchar(255) DEFAULT NULL,
  `nda` varchar(255) DEFAULT NULL,
  `directors` json DEFAULT NULL,
  `directorPhoto` varchar(255) DEFAULT NULL,
  `directorDoc` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ctclients`
--

LOCK TABLES `ctclients` WRITE;
/*!40000 ALTER TABLE `ctclients` DISABLE KEYS */;
INSERT INTO `ctclients` VALUES (1,'Seawave Forwarding And Logistics Private Limited','Unit No. 232 Edison-1 Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block, MIDC Industrial Area Sanpada, TTC Industrial Area, Shiravane, Juinagar, Navi Mumbai, Maharashtra 400705','2025-07-04','Afghanistan','AAGCS1234M','07AAGCS1234M1Z7','U60231DL2012PTC078456','AEOT100234','CHA/DEL/2022/0147','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714747_panCopy_SeawavePan.pdf','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714754_gstCopy_SeawaveGST.pdf','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714755_cinCopy_SeawaveCIN.pdf','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714756_aeoCertificate_SeawaveAEO.pdf','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714762_chaDoc_SeawaveCHA.pdf','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714741_logo_seawave.jpg','customClearance,freightForwarding,transportation,warehousing,eximConsultancy','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714888_moa_SeawaveMOA.pdf','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714891_mou_SeawaveMOU.pdf','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714892_nda_SeawaveNDA.pdf','[{\"name\": \"Nalinikanth Mishra\", \"email\": \"nm@seawave.in\", \"mobile\": \"1244609870\"}, {\"name\": \"Rishi Mishra\", \"email\": \"rishi@seawave.in\", \"mobile\": \"8765432190\"}]','[\"/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714764_director-0-photo_seawaveMDsir.jpg\",\"/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714832_director-1-photo_seawaveMDsir.jpg\"]','[\"/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714772_director-0-doc_Seatech.png\",\"/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714855_director-1-doc_Seatech.png\"]','2025-07-05 10:51:54');
/*!40000 ALTER TABLE `ctclients` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the custom job number';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customjobnumber`
--

LOCK TABLES `customjobnumber` WRITE;
/*!40000 ALTER TABLE `customjobnumber` DISABLE KEYS */;
INSERT INTO `customjobnumber` VALUES (6,'Seawave Forwading And Logistics','seawave@1','Air/Sea','Mumbai','Mumbai-1','null'),(7,'Seawave Forwading And Logistics','seawave@1','BranchName','Mumbai','Mumbai-1','null'),(8,'Seawave Forwading And Logistics','seawave@1','Import/Export','Mumbai','Mumbai-1','null'),(9,'Seawave Forwading And Logistics','seawave@1','Fiscal Year','Mumbai','Mumbai-1','null'),(10,'Seawave Forwading And Logistics','seawave@1','Job No.','Mumbai','Mumbai-1','null'),(11,'Seawave Forwading And Logistics','seawave@1','Custom','Mumbai','Mumbai-1','Aryan');
/*!40000 ALTER TABLE `customjobnumber` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customrefnumber`
--

DROP TABLE IF EXISTS `customrefnumber`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customrefnumber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(45) DEFAULT NULL,
  `orgcode` varchar(45) DEFAULT NULL,
  `columnname` varchar(45) DEFAULT NULL,
  `branchname` varchar(45) DEFAULT NULL,
  `branchcode` varchar(45) DEFAULT NULL,
  `inputofcustom` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customrefnumber`
--

LOCK TABLES `customrefnumber` WRITE;
/*!40000 ALTER TABLE `customrefnumber` DISABLE KEYS */;
/*!40000 ALTER TABLE `customrefnumber` ENABLE KEYS */;
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
  `referenceno` varchar(100) DEFAULT NULL,
  `bankname` varchar(45) NOT NULL,
  `typeofexpense` varchar(45) NOT NULL,
  `paymentdetail` varchar(45) NOT NULL,
  `taxamount` varchar(45) NOT NULL,
  `totalinvoiceamount` varchar(45) NOT NULL,
  `gstamount` varchar(45) NOT NULL,
  `tdsamount` varchar(45) NOT NULL,
  `netpaymentamount` varchar(45) NOT NULL,
  `utrnumber` varchar(45) NOT NULL,
  `typeofjob` varchar(45) NOT NULL,
  `jobnumber` varchar(45) NOT NULL,
  `customername` varchar(45) NOT NULL,
  `remarks` varchar(225) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `DeleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store debit payment sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit`
--

LOCK TABLES `debit` WRITE;
/*!40000 ALTER TABLE `debit` DISABLE KEYS */;
INSERT INTO `debit` VALUES (2,'2025-07-03','142','SBI','tese','Adani pvt ltd','989','989.00','0.00','49.45','939.55','huhuh','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','tset','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',0,NULL,NULL,NULL),(3,'2025-07-03','751','SBI','tese','Adani pvt ltd','16','16.80','0.80','0.80','16.00','qwertyuiop[;lkjhgfds','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','asdffffghjhgfds','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',1,'test','2025-07-16 11:18:56','aryan@Developer'),(4,'2025-07-17','399','SBI','tese','Adani pvt ltd','6','6.30','0.30','0.30','6.00','puppupupu','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','77777','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',1,'asdasd','2025-07-16 12:08:32','aryan@Developer'),(5,'2025-07-17','550','SBI','tese','Adani pvt ltd','6','6.30','0.30','0.30','6.00','puppupupu','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','77777','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',1,'test','2025-07-16 11:49:24','aryan@Developer'),(15,'2025-07-17','424','SBI','tese','Adani pvt ltd','20','21.00','1.00','1.00','20.00','fsdfsdfsdfsdf','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','asdfasdfsdf','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',1,'asdad','2025-07-16 12:08:36','aryan@Developer'),(16,'2025-07-17','261','SBI','tese','Adani pvt ltd','19','19.95','0.95','0.95','19.00','dgfhf bg','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','zdfgdf','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',0,NULL,NULL,NULL),(17,'2025-07-17','430','SBI','tese','Adani pvt ltd','25','26.25','1.25','1.25','25.00','asasasas','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','asasasa','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',0,NULL,NULL,NULL),(18,'2025-07-16','895','SBI','tese','Adani pvt ltd','8','8.40','0.40','0.40','8.00','asasas','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','asasasas','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',0,NULL,NULL,NULL),(19,'2025-07-17','192','SBI','tese','Adani pvt ltd','5','5.00','0.00','0.25','4.75','pppppp','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','pppppp','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',0,NULL,NULL,NULL),(20,'2025-07-17','545','SBI','tese','Adani pvt ltd','5','5.00','0.00','0.00','5.00','zxc','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','zxc','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',1,'asas','2025-07-16 12:37:21','aryan@Developer'),(21,'2025-07-17','935','SBI','tese','Adani pvt ltd','2','2.00','0.00','0.00','2.00','ppppp','Import','A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','yyy','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `debit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delegations`
--

DROP TABLE IF EXISTS `delegations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delegations` (
  `assignedBy` varchar(50) DEFAULT NULL,
  `assignedTo` varchar(50) DEFAULT NULL,
  `branchname` varchar(50) DEFAULT NULL,
  `branchcode` varchar(50) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `TaskDescription` varchar(225) DEFAULT NULL,
  `orgcode` varchar(50) DEFAULT NULL,
  `orgname` varchar(50) DEFAULT NULL,
  `taskname` varchar(225) DEFAULT NULL,
  `assignedDate` datetime DEFAULT NULL,
  `completedOn` datetime DEFAULT NULL,
  `completedBy` varchar(50) DEFAULT NULL,
  `taskStatus` varchar(20) DEFAULT 'pending',
  `completionRemark` varchar(225) DEFAULT NULL,
  `IsDeleted` int DEFAULT '0',
  `deletionRemark` varchar(225) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delegations`
--

LOCK TABLES `delegations` WRITE;
/*!40000 ALTER TABLE `delegations` DISABLE KEYS */;
/*!40000 ALTER TABLE `delegations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `departmentname` varchar(45) DEFAULT NULL,
  `orgname` varchar(45) DEFAULT NULL,
  `orgcode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'IT','Seawave Forwading And Logistics','seawave@1'),(2,'test','Seawave Forwading And Logistics','seawave@1');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the tat of the dispatch to delivery table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispatch`
--

LOCK TABLES `dispatch` WRITE;
/*!40000 ALTER TABLE `dispatch` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docsupload`
--

DROP TABLE IF EXISTS `docsupload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docsupload` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(255) DEFAULT NULL,
  `orgname` varchar(255) DEFAULT NULL,
  `orgcode` varchar(255) DEFAULT NULL,
  `branchname` varchar(255) DEFAULT NULL,
  `branchcode` varchar(255) DEFAULT NULL,
  `clientname` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `filelocation` varchar(255) DEFAULT NULL,
  `uploadedby` varchar(255) DEFAULT NULL,
  `uploadedon` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT NULL,
  `deletedby` varchar(255) DEFAULT NULL,
  `deleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename_UNIQUE` (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docsupload`
--

LOCK TABLES `docsupload` WRITE;
/*!40000 ALTER TABLE `docsupload` DISABLE KEYS */;
/*!40000 ALTER TABLE `docsupload` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store TAT of dondelivery';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dondelivery`
--

LOCK TABLES `dondelivery` WRITE;
/*!40000 ALTER TABLE `dondelivery` DISABLE KEYS */;
/*!40000 ALTER TABLE `dondelivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editlogs`
--

DROP TABLE IF EXISTS `editlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editlogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(100) DEFAULT NULL,
  `orgcode` varchar(100) DEFAULT NULL,
  `branchname` varchar(100) DEFAULT NULL,
  `branchcode` varchar(100) DEFAULT NULL,
  `editedon` datetime DEFAULT NULL,
  `editin` varchar(255) NOT NULL,
  `sectionedit` varchar(255) DEFAULT NULL,
  `clientname` varchar(255) DEFAULT NULL,
  `editedby` varchar(255) NOT NULL,
  `changesDetails` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editlogs`
--

LOCK TABLES `editlogs` WRITE;
/*!40000 ALTER TABLE `editlogs` DISABLE KEYS */;
INSERT INTO `editlogs` VALUES (1,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-08 11:58:11','Organization',NULL,'test','aryan@Developer','New Organization test created'),(2,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-08 13:12:53','Import',NULL,'Adani pvt ltd','admin','New Import Job A/Mumbai/I/25-26/1/Aryan created'),(3,'Seawave Forwading And Logistics','seawave@1','test','Mumbai-1','2025-07-08 13:26:28','A/Mumbai/I/25-26/1/Aryan',NULL,'Adani pvt ltd','admin','New Collection BILL-1 created'),(4,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-08 15:59:10','Organization',NULL,'test 2','aryan@Developer','New Organization test 2 created'),(5,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','Address changed from \"\" to \"qwertyuhnfh,gf,\"'),(6,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','Country changed from \"\" to \"Afghanistan\"'),(7,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','State changed from \"\" to \"Badakhshan\"'),(8,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','City changed from \"\" to \"Ashkāsham\"'),(9,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','Postal Code changed from \"\" to \"400703\"'),(10,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','Phone changed from \"\" to \"0200426350\"'),(11,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','Email changed from \"\" to \"jai@3231322.hg.com\"'),(12,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[\"Shippers\"]\" to \"[\"Carrier\"]\"'),(13,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:14:35','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Import\"]\" to \"[\"Export\"]\"'),(14,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:17:35','Registration',NULL,'Adani pvt ltd','aryan@Developer','IEC changed from \"AAAPB9964C\" to \"AAAPB9964D\"'),(15,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:52:12','General',NULL,'Adani pvt ltd','aryan@Developer','Phone changed from \"9292929929\" to \"\"'),(16,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 11:52:22','General',NULL,'Adani pvt ltd','aryan@Developer','Phone changed from \"\" to \"0200426350\"'),(17,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:10:47','Registration',NULL,'Adani pvt ltd','aryan@Developer','GST changed from \"29AAAAP0267H1ZK\" to \"\"'),(18,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:10:47','Registration',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[\"Shippers\"]\" to \"[]\"'),(19,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:10:47','Registration',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Import\"]\" to \"[]\"'),(20,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:11:36','Registration',NULL,'Adani pvt ltd','aryan@Developer','GST changed from \"\" to \"01AAAAA1234A1Z5\"'),(21,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:15:04','General',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[]\" to \"[\"Consignee\"]\"'),(22,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:15:04','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[]\" to \"[\"Transport\"]\"'),(23,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:15:21','Registration',NULL,'Adani pvt ltd','aryan@Developer','GST changed from \"01AAAAA1234A1Z5\" to \"\"'),(24,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:15:49','Registration',NULL,'Adani pvt ltd','aryan@Developer','GST changed from \"\" to \"01AAAAA1234A1Z5\"'),(25,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:24:07','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Transport\"]\" to \"[\"Consignee\"]\"'),(26,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:24:07','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Contact 1:\n  mobile changed from \"9292929929\" to \"9898988898\"\n\n\ndepartment changed from \"IT\" to \"it\"\n\n\ncontactName changed from \"aryan shinde\" to \"aryan\" '),(27,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:30:35','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\"]\" to \"[\"Consignee\",\"Import\"]\"'),(28,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:30:55','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\",\"Import\"]\" to \"[\"Consignee\"]\"'),(29,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:31:06','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\"]\" to \"[\"Consignee\",\"Import\"]\"'),(30,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:38:26','General',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[\"Consignee\"]\" to \"[\"Consignee\",\"Shippers\"]\"'),(31,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:38:43','General',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[\"Consignee\",\"Shippers\"]\" to \"[\"Consignee\",\"Shippers\",\"Global\"]\"'),(32,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 12:39:17','General',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[\"Consignee\",\"Shippers\",\"Global\"]\" to \"[\"Consignee\"]\"'),(33,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:00:58','Organization',NULL,'Lasons India Pvt., Ltd','admin','New Organization Lasons India Pvt., Ltd created'),(34,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:08:13','Import',NULL,'Lasons India Pvt., Ltd','admin','New Import Job S/Mumbai/I/25-26/5/Aryan created'),(35,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:24:49','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\",\"Import\"]\" to \"[\"Consignee\"]\"'),(36,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:24:49','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Contact 1:\n  contactName changed from \"aryan\" to \"aryanshinde\" '),(37,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:25:32','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\"]\" to \"[\"Consignee\",\"Transport\"]\"'),(38,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:25:43','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\",\"Transport\"]\" to \"[\"Consignee\"]\"'),(39,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:25:43','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Contact 1:\n  designation changed from \"a\" to \"as\" '),(40,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 13:26:12','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Contact 1:\n  email changed from \"ary@gmail.com\" to \"aryan@gmail.com\"\n\n\nmobile changed from \"9898988898\" to \"9898988899\" '),(41,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 14:35:30','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\"]\" to \"[\"Consignee\",\"Export\"]\"'),(42,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 14:35:51','General',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[\"Consignee\"]\" to \"[\"Carrier\"]\"'),(43,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 14:36:04','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\",\"Export\"]\" to \"[\"Consignee\",\"Import\"]\"'),(44,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 14:46:59','General',NULL,'test','aryan@Developer','Organization Type changed from \"[\"Import\"]\" to \"[\"Import\",\"Export\"]\"'),(45,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 14:49:55','General',NULL,'test','aryan@Developer','Entity Type changed from \"[\"Shippers\",\"Consignee\"]\" to \"[\"Shippers\",\"Consignee\",\"Services\"]\"'),(46,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 15:12:56','General',NULL,'test','aryan@Developer','Country changed from \"Cambodia\" to \"Afghanistan\"'),(47,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 15:32:28','General',NULL,'test','aryan@Developer','State changed from \"Banteay Meanchey\" to \"Badghis\"'),(48,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 15:32:28','General',NULL,'test','aryan@Developer','City changed from \"Paoy Paet\" to \"Qala i Naw\"'),(49,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 15:53:32','General',NULL,'test','aryan@Developer','Organization Type changed from \"[\"Import\",\"Export\"]\" to \"[\"Import\",\"Export\",\"Transport\"] in branch (test)\"'),(50,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 15:54:12','General',NULL,'test','aryan@Developer','Organization Type changed from \"[\"Import\",\"Export\",\"Transport\"]\" to \"[\"Import\",\"Export\"]\"in branch (test)'),(51,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 15:54:29','General',NULL,'test','aryan@Developer','Organization Type changed from \"[\"Import\",\"Export\"]\" to \"[\"Import\",\"Export\",\"Transport\"]\"in branch (test)'),(52,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 15:55:23','General',NULL,'test','aryan@Developer','Organization Type changed from \"[\"Import\",\"Export\",\"Transport\"]\" to \"[\"Import\",\"Export\"]\" in branch (test)'),(53,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 16:44:00','General',NULL,'Adani pvt ltd','aryan@Developer','Postal Code changed from \"400703\" to \"400702\" in branch (test)'),(54,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 16:44:32','General',NULL,'Adani pvt ltd','aryan@Developer','Postal Code changed from \"400703\" to \"400701\" in branch (test 2)'),(55,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:25:21','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Consignee\",\"Import\"]\" to \"[\"Carrier\"]\" in branch (test)'),(56,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:25:21','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Contact 2:\n  contactName changed from \"-\" to \"Sanskar sanas\"\n\n\ndesignation changed from \"-\" to \"as\"\n\n\ndepartment changed from \"-\" to \"HR\"\n\n\nmobile changed from \"-\" to \"9898988898\"\n\n\nemail changed from \"-\" to \"SANAS@GMAIL.COM\" '),(57,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:25:43','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Transport\"]\" in branch (test)'),(58,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:27:17','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Transport\"]\" to \"[\"Carrier\"]\" in branch (test)'),(59,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:27:17','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Contact 3:\n  contactName changed from \"-\" to \"TEST\"\n\n\ndesignation changed from \"-\" to \"ST\"\n\n\ndepartment changed from \"-\" to \"SET\"\n\n\nmobile changed from \"-\" to \"9999999999\"\n\n\nemail changed from \"-\" to \"SDSD@GMAIL.COM\" '),(60,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:44:11','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Freight\"]\" in branch (test)'),(61,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:44:26','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Freight\"]\" to \"[\"Carrier\"]\" in branch (test)'),(62,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:45:24','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Transport\"]\" in branch (test)'),(63,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:45:40','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Transport\"]\" to \"[\"Carrier\"]\" in branch (test)'),(64,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 17:45:45','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Transport\"]\" in branch (test)'),(65,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:02:15','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Transport\"]\" to \"[\"Carrier\"]\" in branch (test)'),(66,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:02:32','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Transport\"]\" in branch (test)'),(67,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:02:43','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Transport\"]\" to \"[\"Carrier\"]\" in branch (test)'),(68,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:02:53','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Transport\"]\" in branch (test)'),(69,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:03:00','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Transport\"]\" to \"[\"Carrier\"]\" in branch (test)'),(70,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:03:09','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Transport\"]\" in branch (test)'),(71,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:04:19','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Transport\"]\" to \"[\"Carrier\"]\" in branch (test)'),(72,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:04:22','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\"]\" to \"[\"Carrier\",\"Transport\"]\" in branch (test)'),(73,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:04:32','General',NULL,'Adani pvt ltd','aryan@Developer','Entity Type changed from \"[\"Carrier\"]\" to \"[\"Global\"]\" in branch (test)'),(74,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:05:21','General',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Organization Type changed from \"[\"Import\",\"Export\",\"Transport\",\"Freight\"]\" to \"[\"Transport\"]\" in branch (Lasons)'),(75,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:05:28','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Organization Type changed from \"[\"Transport\"]\" to \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\"]\" in branch (Lasons)'),(76,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:05:38','General',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Organization Type changed from \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\"]\" to \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\",\"Export\"]\" in branch (Lasons)'),(77,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:05:50','General',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Organization Type changed from \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\",\"Export\"]\" to \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\"]\" in branch (Lasons)'),(78,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:07:44','General',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Organization Type changed from \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\"]\" to \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\",\"Transport\"]\" in branch (Lasons)'),(79,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:18:14','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Carrier\",\"Transport\"]\" to \"[\"Global\"]\" in branch (test)'),(80,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-09 18:18:14','Contact Details',NULL,'Adani pvt ltd','aryan@Developer','Contact 3:\n  email changed from \"SDSD@GMAIL.COM\" to \"-\"\n\n\nmobile changed from \"9999999999\" to \"-\"\n\n\ndepartment changed from \"SET\" to \"-\"\n\n\ncontactName changed from \"TEST\" to \"-\"\n\n\ndesignation changed from \"ST\" to \"-\" '),(81,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 14:49:43','General',NULL,'Adani pvt ltd','aryan@Developer','Organization Type changed from \"[\"Global\"]\" to \"[\"Global\",\"Transport\"]\" in branch (test)'),(82,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:09:18','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Organization Type changed from \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\",\"Transport\"]\" to \"[\"Shippers\",\"Consignee\",\"Services\",\"Global\",\"Carrier\"]\" in branch (Lasons)'),(83,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:09:18','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 2:\n  contactName changed from \"-\" to \"sfg\"\n\n\ndesignation changed from \"-\" to \"dfg\"\n\n\ndepartment changed from \"-\" to \"dsg\"\n\n\nmobile changed from \"-\" to \"2222222222\"\n\n\nemail changed from \"-\" to \"zasdf@gmail.com\" '),(84,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:23:19','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 2:\n  email changed from \"zasdf@gmail.com\" to \"-\"\n\n\nmobile changed from \"2222222222\" to \"-\"\n\n\ndepartment changed from \"dsg\" to \"-\"\n\n\ncontactName changed from \"sfg\" to \"-\"\n\n\ndesignation changed from \"dfg\" to \"-\" \nContact 3:\n  email changed from \"ary@gmail.com\" to \"-\"\n\n\nmobile changed from \"9898998988\" to \"-\"\n\n\ndepartment changed from \"sdsd\" to \"-\"\n\n\ncontactName changed from \"test\" to \"-\"\n\n\ndesignation changed from \"sds\" to \"-\" \nContact 4:\n  email changed from \"asdsd@gmail.com\" to \"-\"\n\n\nmobile changed from \"2222222222\" to \"-\"\n\n\ndepartment changed from \"sdsd\" to \"-\"\n\n\ncontactName changed from \"sdsd\" to \"-\"\n\n\ndesignation changed from \"sdsd\" to \"-\" '),(85,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:34:46','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','New contact detail added: Contact 4'),(86,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:45:18','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 4 deleted'),(87,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:45:36','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 3 deleted'),(88,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:53:52','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','New contact detail added: Contact 3'),(89,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:56:23','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','New contact detail added: Contact 4'),(90,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 16:56:35','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 3:\n  email changed from \"aer@gmail.com\" to \"as@gmail.com\"\n\n\nmobile changed from \"1111111111\" to \"4444444444\"\nContact 4 deleted'),(91,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 17:02:13','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 2 deleted'),(92,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 17:09:32','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 2 (a) deleted'),(93,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 17:14:35','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','New contact detail added: Contact 2 (as)'),(94,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 17:15:05','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','New contact detail added: Contact 3 (aryan)'),(95,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 17:15:23','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 2 (as) deleted'),(96,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 17:16:19','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','New contact detail added: Contact 3 (eee)'),(97,'Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','2025-07-10 17:16:32','Contact Details',NULL,'Lasons India Pvt., Ltd','aryan@Developer','Contact 2 (aryan) deleted\nContact 3 (eee) deleted');
/*!40000 ALTER TABLE `editlogs` ENABLE KEYS */;
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
  `createdby` varchar(50) DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `DeleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employees_ibfk_1` (`orgcode`,`orgname`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`orgcode`, `orgname`) REFERENCES `users` (`orgcode`, `orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('Kunal Lawate@Executive','12345678','seawave@1','Seawave Forwading And Logistics',1,'Kunal Lawate','Executive','admin',1,'test','2025-07-07 15:17:17','admin','2025-07-07 15:09:07'),('Kunal@HOD','12345678','seawave@1','Seawave Forwading And Logistics',2,'Kunal','HOD','admin',0,NULL,NULL,NULL,'2025-07-07 15:22:22'),('aryan@Developer','12345678','seawave@1','Seawave Forwading And Logistics',3,'Aryan Rajesh Shinde','Developer','admin',0,NULL,NULL,NULL,'2025-07-07 16:33:39');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry`
--

DROP TABLE IF EXISTS `enquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `referenceNo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `clientType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `companyname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `contactPerson` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `phoneNo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `emailId` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `enquiryFor` json DEFAULT NULL,
  `rfq` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `orgname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `orgcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `enquirycreationdate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='New Enquiry Are store in this Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry`
--

LOCK TABLES `enquiry` WRITE;
/*!40000 ALTER TABLE `enquiry` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiry_details`
--

DROP TABLE IF EXISTS `enquiry_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiry_details` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `enquiry_id` int NOT NULL,
  `weight` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `commodity` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `portOfLoading` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `portOfDischarge` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `typeOfContainer` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `typeOfDelivery` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `enquiryForType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `enquiry_id` (`enquiry_id`),
  CONSTRAINT `enquiry_details_ibfk_1` FOREIGN KEY (`enquiry_id`) REFERENCES `enquiry` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='Additional details for each enquiry type';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_details`
--

LOCK TABLES `enquiry_details` WRITE;
/*!40000 ALTER TABLE `enquiry_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiry_details` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store the general component data ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expgeneral`
--

LOCK TABLES `expgeneral` WRITE;
/*!40000 ALTER TABLE `expgeneral` DISABLE KEYS */;
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
  `benumber` varchar(50) NOT NULL,
  `count` int NOT NULL,
  `OwnTransportFrom` varchar(45) DEFAULT NULL,
  `OwnTransportTo` varchar(45) DEFAULT NULL,
  `OwnTransportPickupDate` datetime DEFAULT NULL,
  `OwnTransportCurrentDate` datetime DEFAULT NULL,
  `exportername` varchar(45) NOT NULL,
  `exporterbranchname` varchar(45) DEFAULT 'null',
  `address` varchar(200) NOT NULL,
  `GST` varchar(45) NOT NULL,
  `IEC` varchar(45) NOT NULL,
  `finaldestination` varchar(45) NOT NULL,
  `portofshipment` varchar(45) NOT NULL,
  `containerNoAndWeight` json DEFAULT NULL,
  `branchname` varchar(150) NOT NULL,
  `branchcode` varchar(150) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `IsActive` tinyint DEFAULT '0',
  `IsComplete` tinyint DEFAULT '0',
  `typesofContainer` varchar(255) DEFAULT NULL,
  `dockExecutive` varchar(45) NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_jobnumber` (`jobnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in export will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expjobcreation`
--

LOCK TABLES `expjobcreation` WRITE;
/*!40000 ALTER TABLE `expjobcreation` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store export notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expnotifications`
--

LOCK TABLES `expnotifications` WRITE;
/*!40000 ALTER TABLE `expnotifications` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is access of export for people';
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store the general component data ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impgeneral`
--

LOCK TABLES `impgeneral` WRITE;
/*!40000 ALTER TABLE `impgeneral` DISABLE KEYS */;
/*!40000 ALTER TABLE `impgeneral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impjobcreation`
--

DROP TABLE IF EXISTS `impjobcreation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impjobcreation` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `typesofContainer` varchar(255) DEFAULT NULL,
  `dockExecutive` varchar(45) NOT NULL,
  `bltype` varchar(45) NOT NULL DEFAULT '0',
  `bltypenum` varchar(45) NOT NULL DEFAULT '0',
  `jobowner` varchar(50) NOT NULL,
  `freedays` varchar(50) NOT NULL,
  `blstatus` varchar(50) NOT NULL,
  `benumber` varchar(50) NOT NULL,
  `shippinglinebond` varchar(50) NOT NULL,
  `count` int NOT NULL,
  `OwnTransportFrom` varchar(45) DEFAULT NULL,
  `OwnTransportTo` varchar(45) DEFAULT NULL,
  `OwnTransportPickupDate` datetime DEFAULT NULL,
  `OwnTransportCurrentDate` datetime DEFAULT NULL,
  `importername` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) NOT NULL,
  `address` varchar(200) NOT NULL,
  `GST` varchar(45) NOT NULL,
  `IEC` varchar(45) NOT NULL,
  `finaldestination` varchar(45) NOT NULL,
  `portofshipment` varchar(45) NOT NULL,
  `containerNoAndWeight` json DEFAULT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `branchname` varchar(150) NOT NULL,
  `branchcode` varchar(150) NOT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `IsActive` tinyint DEFAULT '0',
  `IsComplete` tinyint DEFAULT '0',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_jobnumber` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in import will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impjobcreation`
--

LOCK TABLES `impjobcreation` WRITE;
/*!40000 ALTER TABLE `impjobcreation` DISABLE KEYS */;
INSERT INTO `impjobcreation` VALUES (1,'A/Mumbai/I/25-26/1/Aryan','2025-07-08 13:12:00','2025-07-09 00:00:00','Air','Mumbai Sea','Yes','Loaded',1,'No','Home','FCL','test','tets','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons','HBL/HAWB','test','admin','1','Surrender','test','Yearly',1,'','',NULL,NULL,'Adani pvt ltd','test','qwertyuhnfh,gf,','29AAAAP0267H1ZK','AAAPB9964C','test','test','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1',0,0,0,NULL),(2,'S/Mumbai/I/25-26/5/Aryan','2025-07-09 13:07:00','2025-07-09 00:00:00','Sea','Nhava Sea','Yes','Loaded',2,'Yes','Home','FCL','ALL CARGO','Hapag-Lloyd','20\'','fetch Persons','MBL/MAWB','HLCUTYO230416198','admin','14','Original','2343704','Yearly',5,'Nhava sea','BANDRA','2025-07-11 00:00:00','2025-07-09 00:00:00','Lasons India Pvt., Ltd','Lasons','Branch no-0, New Jgruti 227, S.V.Road,bandra west','27AAACL3792R1ZR','0388074159','NHAVA SHEVA','TOKYO, JAPAN','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1',0,0,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store import notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impnotifications`
--

LOCK TABLES `impnotifications` WRITE;
/*!40000 ALTER TABLE `impnotifications` DISABLE KEYS */;
INSERT INTO `impnotifications` VALUES (1,'/1','Adani pvt ltd','2025-07-08 13:00:05','ImpJobButton','test','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": \"2025-07-08 14:34:41\", \"employeename\": \"aryan@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aryan@Developer\"}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','aryan@Developer'),(2,'A/Mumbai/I/25-26/1/Aryan','Adani pvt ltd','2025-07-08 13:12:20','ImpJobButton','test','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": \"2025-07-08 13:12:53\", \"employeename\": \"aryan@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aryan@Developer\"}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','admin'),(3,'S/Mumbai/I/25-26/2/Aryan','Lasons India Pvt., Ltd','2025-07-09 13:07:22','ImpJobButton','Lasons','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": \"2025-07-09 13:07:52\", \"employeename\": \"aryan@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aryan@Developer\"}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','admin'),(4,'S/Mumbai/I/25-26/3/Aryan','Lasons India Pvt., Ltd','2025-07-09 13:07:30','ImpJobButton','Lasons','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": \"2025-07-09 13:07:54\", \"employeename\": \"aryan@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aryan@Developer\"}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','admin'),(5,'S/Mumbai/I/25-26/4/Aryan','Lasons India Pvt., Ltd','2025-07-09 13:07:32','ImpJobButton','Lasons','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": \"2025-07-09 13:07:56\", \"employeename\": \"aryan@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aryan@Developer\"}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','admin'),(6,'S/Mumbai/I/25-26/5/Aryan','Lasons India Pvt., Ltd','2025-07-09 13:07:33','ImpJobButton','Lasons','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": \"2025-07-09 13:08:13\", \"employeename\": \"aryan@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aryan@Developer\"}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','admin'),(7,'S/Mumbai/I/25-26/6/Aryan','Lasons India Pvt., Ltd','2025-07-09 13:07:33','ImpJobButton','Lasons','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": \"2025-07-09 13:07:58\", \"employeename\": \"aryan@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aryan@Developer\"}]','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','admin');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is access of import for people';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importaccess`
--

LOCK TABLES `importaccess` WRITE;
/*!40000 ALTER TABLE `importaccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `importaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `importquotation`
--

DROP TABLE IF EXISTS `importquotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `importquotation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `json_data` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `jobnumber` varchar(45) DEFAULT NULL,
  `orgcode` varchar(45) DEFAULT NULL,
  `orgname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importquotation`
--

LOCK TABLES `importquotation` WRITE;
/*!40000 ALTER TABLE `importquotation` DISABLE KEYS */;
/*!40000 ALTER TABLE `importquotation` ENABLE KEYS */;
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
  `IsDeleted` int DEFAULT '0',
  `DeleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `Date` varchar(255) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `deletedby` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='line of business table as per users prefrences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lob`
--

LOCK TABLES `lob` WRITE;
/*!40000 ALTER TABLE `lob` DISABLE KEYS */;
INSERT INTO `lob` VALUES (1,'IMPORT','Seawave Forwading And Logistics','seawave@1','Air',0,NULL,NULL,'2025-07-07','admin',NULL),(2,'EXPORT','Seawave Forwading And Logistics','seawave@1','Air',0,NULL,NULL,'2025-07-07','admin',NULL),(3,'IMPORT','Seawave Forwading And Logistics','seawave@1','Sea',0,NULL,NULL,'2025-07-07','admin',NULL),(4,'EXPORT','Seawave Forwading And Logistics','seawave@1','Sea',0,NULL,NULL,'2025-07-07','admin',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the hours and minutes as well as the email and passcode';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maildata`
--

LOCK TABLES `maildata` WRITE;
/*!40000 ALTER TABLE `maildata` DISABLE KEYS */;
/*!40000 ALTER TABLE `maildata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgname` varchar(50) DEFAULT NULL,
  `orgcode` varchar(50) DEFAULT NULL,
  `conversation_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(30) DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Seawave Forwading And Logistics','seawave@1',2,1,'hi','2025-07-07 11:23:49',NULL,5),(7,'Seawave Forwading And Logistics','seawave@1',5,3,'hello','2025-07-09 07:41:31',NULL,2),(8,'Seawave Forwading And Logistics','seawave@1',5,3,'hvhcvh','2025-07-09 07:42:04',NULL,2),(9,'Seawave Forwading And Logistics','seawave@1',3,1,'1111','2025-07-09 07:43:06','2025-07-09 13:20:41',3),(10,'Seawave Forwading And Logistics','seawave@1',4,1,'4','2025-07-09 07:43:24',NULL,2),(11,'Seawave Forwading And Logistics','seawave@1',4,1,'EDITED','2025-07-09 07:44:13','2025-07-09 13:21:09',2),(12,'Seawave Forwading And Logistics','seawave@1',3,1,'hello aryan','2025-07-09 11:57:13',NULL,3),(13,'Seawave Forwading And Logistics','seawave@1',3,3,'hi mesh','2025-07-09 11:57:48',NULL,1),(14,'Seawave Forwading And Logistics','seawave@1',4,1,'hello','2025-07-09 11:58:14',NULL,2),(15,'Seawave Forwading And Logistics','seawave@1',3,1,'errorrr','2025-07-09 11:58:31',NULL,3),(16,'Seawave Forwading And Logistics','seawave@1',3,3,'?','2025-07-09 11:58:44',NULL,1),(17,'Seawave Forwading And Logistics','seawave@1',4,1,'tet','2025-07-09 11:58:50',NULL,2),(18,'Seawave Forwading And Logistics','seawave@1',4,1,'?','2025-07-09 11:59:20',NULL,2),(19,'Seawave Forwading And Logistics','seawave@1',4,1,'(❁´◡`❁)','2025-07-09 12:00:07','2025-07-17 10:17:55',2),(20,'Seawave Forwading And Logistics','seawave@1',6,1,'HELLO GUYS','2025-07-09 12:09:40',NULL,NULL),(21,'Seawave Forwading And Logistics','seawave@1',6,3,'whats up','2025-07-09 12:09:53',NULL,NULL),(22,'Seawave Forwading And Logistics','seawave@1',6,1,'Its Time To Go Homeeee','2025-07-09 12:10:22',NULL,NULL),(23,'Seawave Forwading And Logistics','seawave@1',6,3,'get set gooooo!','2025-07-09 12:10:43',NULL,NULL),(24,'Seawave Forwading And Logistics','seawave@1',6,1,'Chal Bye','2025-07-09 12:12:09',NULL,NULL),(25,'Seawave Forwading And Logistics','seawave@1',3,3,'.','2025-07-09 12:13:38',NULL,1),(26,'Seawave Forwading And Logistics','seawave@1',4,1,'This is not Fair Sanjeet','2025-07-09 12:13:43','2025-07-17 10:17:52',2),(27,'Seawave Forwading And Logistics','seawave@1',3,3,'(┬┬﹏┬┬)','2025-07-09 12:13:51',NULL,1),(28,'Seawave Forwading And Logistics','seawave@1',3,3,'got it','2025-07-10 12:03:51',NULL,1),(29,'Seawave Forwading And Logistics','seawave@1',3,3,'hi','2025-07-11 10:41:31',NULL,1),(30,'Seawave Forwading And Logistics','seawave@1',3,1,'olleh','2025-07-11 10:43:05',NULL,3),(31,'Seawave Forwading And Logistics','seawave@1',4,2,'Sanjeet here','2025-07-15 07:44:18',NULL,1),(32,'Seawave Forwading And Logistics','seawave@1',4,2,'asasas','2025-07-15 10:17:15',NULL,1),(33,'Seawave Forwading And Logistics','seawave@1',4,2,'sasas','2025-07-15 10:17:17',NULL,1),(34,'Seawave Forwading And Logistics','seawave@1',6,1,'ttyl','2025-07-16 06:58:25',NULL,NULL),(35,'Seawave Forwading And Logistics','seawave@1',4,2,'tasks for today?','2025-07-17 07:23:45',NULL,1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
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
  `IsDeleted` int DEFAULT '0',
  `DeleteRemark` varchar(100) DEFAULT '',
  `deletedAt` datetime DEFAULT NULL,
  `Date` varchar(225) DEFAULT NULL,
  `createdby` varchar(225) DEFAULT NULL,
  `deletedby` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the milestones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (1,'E-SANCHIT','IMPORT','Seawave Forwading And Logistics','seawave@1','Mumbai',1,'error in lob name','2025-07-07 00:00:00','2025-07-07','admin','admin'),(2,'E-SANCHIT','EXPORT','Seawave Forwading And Logistics','seawave@1','Mumbai',1,'error in LOB name ','2025-07-07 00:00:00','2025-07-07','admin','admin');
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
  `followup2` varchar(100) DEFAULT NULL,
  `followup3` varchar(100) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `uniquevalue` varchar(45) NOT NULL,
  `reading` json DEFAULT NULL,
  `timeofreading` json DEFAULT NULL,
  `approvername` json NOT NULL,
  `approvalid` int NOT NULL,
  `createdat` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store notifications and its data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('Seawave Forwading And Logistics','seawave@1','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','Adani pvt ltd','India','Maharashtra','Mumbai','adani','400705','9420818812','aryan@gmail.com','AFZPK7190K','27AAAAP0267H2ZN','1234567890','Mumbai','22','22','22','admin',1,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"Kunal Lawate@Executive\"}]','[{\"time\": null, \"employeename\": \"Kunal Lawate@Executive\"}]','[{\"employeename\": \"Kunal Lawate@Executive\"}]',1,'2025-07-07 16:29:53'),('Seawave Forwading And Logistics','seawave@1','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','test','Cambodia','Banteay Meanchey','Paoy Paet','test','400705','0200426350','aryan@gmail.com','AFZPK7190K','27AAAAP0267H2ZN','AAAAB1234C','test','22','22','22','aryan@Developer',2,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": null, \"employeename\": \"aryan@Developer\"}]','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]',2,'2025-07-08 11:36:59'),('Seawave Forwading And Logistics','seawave@1','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','test 2','Afghanistan','Badghis','Ghormach','test','400705','0200426350','jai@3231322.hg.com','AFZPK7190K','27AAAAP0267H2ZN','AAAAB1234C','test','22','22','22','aryan@Developer',3,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": null, \"employeename\": \"aryan@Developer\"}]','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]',3,'2025-07-08 14:58:22'),('Seawave Forwading And Logistics','seawave@1','Branch no-0, New Jgruti 227, S.V.Road,bandra west','Lasons India Pvt., Ltd','India','Maharashtra','Bandra','lasons','400050','0662604575','Lasons@gmail.com','AAACL3792R','27AAACL3792R1ZR','0388074159','Lasons','15','16','17','admin',4,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aryan@Developer\"}]','[{\"time\": null, \"employeename\": \"sanjeet@Developer\"}, {\"time\": null, \"employeename\": \"aryan@Developer\"}]','[{\"employeename\": \"sanjeet@Developer\"}, {\"employeename\": \"aryan@Developer\"}]',4,'2025-07-09 13:00:02');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the o2d tat table where tat of o2d is stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `o2dtat`
--

LOCK TABLES `o2dtat` WRITE;
/*!40000 ALTER TABLE `o2dtat` DISABLE KEYS */;
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
  `clientCode` varchar(45) NOT NULL,
  `checkedBoxOptions` json DEFAULT NULL,
  `showClientCode` tinyint DEFAULT '0',
  `orgganizationTypeOptions` json DEFAULT NULL,
  `contactDetails` json DEFAULT NULL,
  `followup2` varchar(100) DEFAULT NULL,
  `followup3` varchar(100) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `DeleteRemark` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orgcode` (`orgcode`),
  KEY `fk_orgname` (`orgname`),
  CONSTRAINT `fk_orgcode` FOREIGN KEY (`orgcode`) REFERENCES `users` (`orgcode`),
  CONSTRAINT `fk_orgname` FOREIGN KEY (`orgname`) REFERENCES `users` (`orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store client data and employee that created the client ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('adani','India','Maharashtra','Mumbai','400702','0200426350','admin@gmial.com','AFZPK7190K','01AAAAA1234A1Z5','AAAPB9964D','11','qwertyuhnfh,gf,','seawave@1','Seawave Forwading And Logistics','Adani pvt ltd',1,'test','admin','OrgButton','2025-07-07 17:52:47',1,'AD-SE-TE','[\"Global\"]',0,'[\"Global\", \"Transport\"]','[{\"email\": \"aryan@gmail.com\", \"mobile\": \"9898988899\", \"department\": \"it\", \"contactName\": \"aryanshinde\", \"designation\": \"as\"}, {\"email\": \"SANAS@GMAIL.COM\", \"mobile\": \"9898988898\", \"department\": \"HR\", \"contactName\": \"Sanskar sanas\", \"designation\": \"as\"}]','11','11','2025-07-17 10:53:14',NULL),('test','Afghanistan','Badghis','Ghormach','400705','0200426350','jai@3231322.hg.com','AFZPK7190K','27AAAAP0267H2ZN','AAAAB1234C','22','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','seawave@1','Seawave Forwading And Logistics','test 2',4,'test','aryan@Developer','OrgButton','2025-07-08 14:58:22',0,'test-test-seawave@1','[\"Shippers\"]',0,'[\"Import\"]','[]','22','22',NULL,NULL),('adani','Afghanistan','Badakhshan','Ashkāsham','400701','0200426350','jai@3231322.hg.com','AFZPK7190K','29AAAAP0267H1ZK','AAAPB9964C','11','qwertyuhnfh,gf,','seawave@1','Seawave Forwading And Logistics','Adani pvt ltd',5,'test 2','admin','OrgButton','2025-07-07 17:52:47',1,'AD-SE-TE','[\"Carrier\"]',0,'[\"Export\"]','[{\"email\": \"ary@gmail.com\", \"mobile\": \"9292929929\", \"department\": \"IT\", \"contactName\": \"aryan shinde\", \"designation\": \"a\"}]','11','11','2025-07-17 10:53:14',NULL),('lasons','India','Maharashtra','Bandra','400050','0662604575','Lasons@gmail.com','AAACL3792R','27AAACL3792R1ZR','0388074159','15','Branch no-0, New Jgruti 227, S.V.Road,bandra west','seawave@1','Seawave Forwading And Logistics','Lasons India Pvt., Ltd',6,'Lasons','admin','OrgButton','2025-07-09 13:00:02',0,'lasons-Lasons-seawave@1','[\"Shippers\", \"Consignee\", \"Services\", \"Global\", \"Carrier\"]',1,'[\"Shippers\", \"Consignee\", \"Services\", \"Global\", \"Carrier\"]','[{\"email\": \"sanjeet@gmail.com\", \"mobile\": \"8021367954\", \"department\": \"SCM\", \"contactName\": \"SANJEET SAWARDEKAR\", \"designation\": \"IMPORT EXE\"}]','16','17',NULL,NULL);
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
  `headname` varchar(100) NOT NULL,
  `headnum` varchar(20) NOT NULL,
  `heademail` varchar(30) DEFAULT NULL,
  `headphoto` varchar(255) DEFAULT NULL,
  `headdocument` varchar(255) DEFAULT NULL,
  `address` varchar(1000) NOT NULL,
  `chabranchlicence` varchar(255) DEFAULT NULL,
  `branchcode` varchar(150) NOT NULL,
  `IsDeleted` int DEFAULT '0',
  `deletedby` varchar(40) DEFAULT NULL,
  `createdby` varchar(40) DEFAULT NULL,
  `DeleteRemark` varchar(225) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of the data of the branches of the organization.\n    ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownbranches`
--

LOCK TABLES `ownbranches` WRITE;
/*!40000 ALTER TABLE `ownbranches` DISABLE KEYS */;
INSERT INTO `ownbranches` VALUES (1,'seawave@1','Seawave Forwading And Logistics','Mumbai','07AAGCS1234M1Z7','Prince Mishra','9012345678','prince@seawave.in','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714872_branchHeadPhoto_seawaveMDsir.jpg','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714879_branchHeadID_Seatech.png','Unit No. 232 Edison-1 Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block, MIDC Industrial Area Sanpada, TTC Industrial Area, Shiravane, Juinagar, Navi Mumbai, Maharashtra 400705','CHA/DEL/2022/0123','Mumbai-1',0,NULL,'admin',NULL,NULL,'2025-07-05 10:51:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Paye Account Table for Paye Bank Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payeaccount`
--

LOCK TABLES `payeaccount` WRITE;
/*!40000 ALTER TABLE `payeaccount` DISABLE KEYS */;
INSERT INTO `payeaccount` VALUES (1,'Adani pvt ltd','	HDFC Bank Ltd.','Current','50200012345678','HDFC0001234','Seawave Forwading And Logistics','seawave@1');
/*!40000 ALTER TABLE `payeaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prospect`
--

DROP TABLE IF EXISTS `prospect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prospect` (
  `id` int NOT NULL AUTO_INCREMENT,
  `referenceNo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `currentDate` datetime NOT NULL,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `customerName` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `contactPersonName` json DEFAULT NULL,
  `contactPersonNo` json DEFAULT NULL,
  `emailId` json DEFAULT NULL,
  `address` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `source` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `customSource` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `orgname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `orgcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `branchcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `country` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `postalcode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='This table store Propects Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prospect`
--

LOCK TABLES `prospect` WRITE;
/*!40000 ALTER TABLE `prospect` DISABLE KEYS */;
/*!40000 ALTER TABLE `prospect` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store reminders for import';
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
  `owntransport` varchar(45) NOT NULL,
  `ownbooking` varchar(45) NOT NULL,
  `consignmenttype` json NOT NULL,
  `betype` json NOT NULL,
  `IsDeleted` int DEFAULT '0',
  `createdby` varchar(50) DEFAULT NULL,
  `deletedby` varchar(50) DEFAULT NULL,
  `DeleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of all the detailed data of the particular workflow as per line of business';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setworkflow`
--

LOCK TABLES `setworkflow` WRITE;
/*!40000 ALTER TABLE `setworkflow` DISABLE KEYS */;
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
  `timing` varchar(45) DEFAULT NULL,
  `timedelay` varchar(50) DEFAULT NULL,
  `remarks` varchar(150) DEFAULT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `jobnumber` varchar(50) NOT NULL,
  `jobdoneby` varchar(50) NOT NULL,
  `tat` varchar(50) DEFAULT NULL,
  `lobname` varchar(150) DEFAULT NULL,
  `ownbranchname` varchar(100) NOT NULL,
  `ownbranchcode` varchar(100) NOT NULL,
  `clientname` varchar(45) DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingexport`
--

LOCK TABLES `trackingexport` WRITE;
/*!40000 ALTER TABLE `trackingexport` DISABLE KEYS */;
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
  `timing` varchar(45) DEFAULT NULL,
  `timedelay` varchar(50) DEFAULT NULL,
  `remarks` varchar(150) DEFAULT NULL,
  `orgname` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `jobnumber` varchar(50) NOT NULL,
  `jobdoneby` varchar(50) NOT NULL,
  `tat` varchar(50) DEFAULT NULL,
  `lobname` varchar(150) DEFAULT NULL,
  `ownbranchname` varchar(100) NOT NULL,
  `ownbranchcode` varchar(100) NOT NULL,
  `clientname` varchar(45) DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingimport`
--

LOCK TABLES `trackingimport` WRITE;
/*!40000 ALTER TABLE `trackingimport` DISABLE KEYS */;
/*!40000 ALTER TABLE `trackingimport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactionhistory`
--

DROP TABLE IF EXISTS `transactionhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactionhistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jobnumber` varchar(45) NOT NULL,
  `currentdate` datetime NOT NULL,
  `typeofexpense` varchar(45) NOT NULL,
  `referenceNo` varchar(45) NOT NULL,
  `cr` varchar(45) DEFAULT NULL,
  `dr` varchar(45) DEFAULT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `orgbranchname` varchar(45) NOT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='it will store all transaction dr and cr related to that job number ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionhistory`
--

LOCK TABLES `transactionhistory` WRITE;
/*!40000 ALTER TABLE `transactionhistory` DISABLE KEYS */;
INSERT INTO `transactionhistory` VALUES (1,'A/Mumbai/I/25-26/1/Aryan','2025-07-08 00:00:00','Bill','BILL-1','111123.00','0','Seawave Forwading And Logistics','seawave@1','test',0,NULL),(2,'A/Mumbai/I/25-26/1/Aryan','2025-07-08 00:00:00','against-bill','34','','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(44,'A/Mumbai/I/25-26/1/Aryan','2025-07-08 00:00:00','against-bill','1','110905.00','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(45,'A/Mumbai/I/25-26/1/Aryan','2025-07-08 00:00:00','against-job','1','2','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(46,'A/Mumbai/I/25-26/1/Aryan','2025-07-11 00:00:00','against-bill','923','111121.00','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(47,'A/Mumbai/I/25-26/1/Aryan','2025-07-11 00:00:00','against-bill','193','111121.00','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(48,'A/Mumbai/I/25-26/1/Aryan','2025-07-11 00:00:00','against-bill','272','111121.00','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(49,'A/Mumbai/I/25-26/1/Aryan','2025-07-11 00:00:00','against-bill','829','111121.00','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(50,'A/Mumbai/I/25-26/1/Aryan','2025-07-11 00:00:00','against-bill','856','111121.00','0','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(51,'A/Mumbai/I/25-26/1/Aryan','2025-07-03 00:00:00','','test','0','2323','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(52,'A/Mumbai/I/25-26/1/Aryan','2025-07-03 00:00:00','tese','huhuh','0','989','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(53,'A/Mumbai/I/25-26/1/Aryan','2025-07-03 00:00:00','tese','qwertyuiop[;lkjhgfds','0','16','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(54,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','puppupupu','0','6','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(55,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','puppupupu','0','6','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(56,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','puppupupu','0','6','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(57,'A/Mumbai/I/25-26/1/Aryan','2025-07-16 00:00:00','tese','sss','0','4','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(58,'A/Mumbai/I/25-26/1/Aryan','2025-07-16 00:00:00','tese','asas','0','167','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(59,'A/Mumbai/I/25-26/1/Aryan','2025-07-16 00:00:00','tese','asas','0','167','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(60,'A/Mumbai/I/25-26/1/Aryan','2025-07-16 00:00:00','tese','asas','0','167','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(61,'A/Mumbai/I/25-26/1/Aryan','2025-07-16 00:00:00','tese','asas','0','167','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(62,'A/Mumbai/I/25-26/1/Aryan','2025-07-16 00:00:00','tese','asas','0','167','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(63,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','sdsd','0','2332','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(64,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','sdsd','0','2332','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(65,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','fsdfsdfsdfsdf','0','20','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(66,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','dgfhf bg','0','19','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(67,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','asasasas','0','25','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(68,'A/Mumbai/I/25-26/1/Aryan','2025-07-16 00:00:00','tese','asasas','0','8','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(69,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','pppppp','0','5','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(70,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','zxc','0','5','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL),(71,'A/Mumbai/I/25-26/1/Aryan','2025-07-17 00:00:00','tese','ppppp','0','2','Seawave Forwading And Logistics','seawave@1','Mumbai',0,NULL);
/*!40000 ALTER TABLE `transactionhistory` ENABLE KEYS */;
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
  `password` varchar(50) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
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
  `profilephoto` varchar(100) DEFAULT NULL,
  `idproof` varchar(100) DEFAULT NULL,
  `loggedin` tinyint DEFAULT '0',
  `createdby` varchar(50) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `DeleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) DEFAULT NULL,
  `tokenIssuedAt` datetime DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_user_org` (`username`,`orgname`,`orgcode`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store data of user';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userkyctable`
--

LOCK TABLES `userkyctable` WRITE;
/*!40000 ALTER TABLE `userkyctable` DISABLE KEYS */;
INSERT INTO `userkyctable` VALUES (1,'admin','admin',NULL,NULL,'','','','','','AAGCS1234M','2025-07-04','2025-07-04','Seawave Forwading And Logistics','seawave@1','[{\"branchName\": \"Mumbai\", \"branchcode\": \"Mumbai-1\"}]','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714741_logo_seawave.jpg','',0,NULL,NULL,0,NULL,NULL,NULL,NULL,'test'),(2,'Sanjeet Sawardekar','sanjeet@Developer','12345678','Developer','0200426350','0200426350','jai@323gmail.in','jai@323gmail.in','980734561234','SAMJS2354J','2025-01-07T00:00','2001-02-28T00:00','Seawave Forwading And Logistics','seawave@1','[]','/uploads/kyc/ProfilePhoto/Sanjeet_Sawardekar.jpg','/uploads/kyc/IdProof/Sanjeet_Sawardekar.pdf',1,'admin','2025-07-07 16:54:13',0,NULL,NULL,NULL,'2025-07-17 10:46:03','IT'),(3,'Aryan Rajesh Shinde','aryan@Developer','12345678','Developer','0200426350','0200426350','jai@3231322.hg.com','jai@3231322.hg.com','121212121212','AFZPK7190K','2025-01-22T00:00','2005-08-09T00:00','Seawave Forwading And Logistics','seawave@1','[]','/uploads/kyc/ProfilePhoto/Aryan_Rajesh_Shinde.jpg','/uploads/kyc/IdProof/Aryan_Rajesh_Shinde.pdf',1,'admin','2025-07-07 17:58:05',0,NULL,NULL,NULL,'2025-07-17 10:51:42','IT'),(6,'IT Seawave','fbdhdgh@Developer','1212121212','Developer','0200426350','0200426350','jai@3231322.hg.com','jai@3231322.hg.com','121212121212','QQQQQ1111Q','2025-07-18T00:00','2025-07-18T00:00','Seawave Forwading And Logistics','seawave@1','[]','/uploads/kyc/ProfilePhoto/IT_Seawave.jpg','/uploads/kyc/IdProof/IT_Seawave.pdf',0,'admin','2025-07-17 13:14:29',0,NULL,NULL,NULL,NULL,'test'),(7,'IT Seawave','tetstes@Executive','1212121212','Executive','0200426350','0200426350','jai@3231322.hg.com','jai@3231322.hg.com','121212121212','QQQQQ1111Q','2025-07-18T00:00','2025-07-18T00:00','Seawave Forwading And Logistics','seawave@1','[]','/uploads/kyc/ProfilePhoto/IT_Seawave.jpg','/uploads/kyc/IdProof/IT_Seawave.pdf',0,'admin','2025-07-17 13:16:13',0,NULL,NULL,NULL,NULL,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store user roles for employees in an org ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (1,'HOD','Seawave Forwading And Logistics','seawave@1'),(2,'Executive','Seawave Forwading And Logistics','seawave@1'),(3,'Director','Seawave Forwading And Logistics','seawave@1'),(4,'Developer','Seawave Forwading And Logistics','seawave@1');
/*!40000 ALTER TABLE `userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `orgcode` varchar(50) NOT NULL,
  `orgname` varchar(50) NOT NULL,
  `userphoto` varchar(255) DEFAULT NULL,
  `deleteIntervalForJobsAndOrg` int NOT NULL DEFAULT '45',
  `loggedin` tinyint DEFAULT '0',
  `tokenIssuedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`orgcode`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `idx_users_orgname` (`orgname`),
  KEY `idx_users_orgcode_orgname` (`orgcode`,`orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is just for testing of DB connection and to verify that DB has been integrated';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','12345','seawave@1','Seawave Forwading And Logistics','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714741_logo_seawave.jpg',10,1,'2025-07-17 10:15:15');
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
  `deletedby` varchar(225) DEFAULT NULL,
  `createdby` varchar(50) DEFAULT NULL,
  `IsDeleted` int DEFAULT '0',
  `DeleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `Date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the workflow rows ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
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

-- Dump completed on 2025-07-17 13:17:50
