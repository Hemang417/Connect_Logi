-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 192.168.1.45    Database: crm_db
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesscontrol`
--

LOCK TABLES `accesscontrol` WRITE;
/*!40000 ALTER TABLE `accesscontrol` DISABLE KEYS */;
INSERT INTO `accesscontrol` VALUES (1,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','add-client','admin'),(2,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','download-client','admin'),(3,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ORGANIZATION','delete-client','admin'),(4,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','add-job','admin'),(5,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','delete-job','admin'),(6,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','download-job','admin'),(7,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','track-job','admin'),(8,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','container-details','admin'),(9,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','transport','admin'),(10,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','doc-upload','admin'),(11,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','collection','admin'),(12,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','transaction','admin'),(13,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','IMPORT','quotation','admin'),(14,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','add-job','admin'),(15,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','delete-job','admin'),(16,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','EXPORT','download-job','admin'),(17,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-credit','admin'),(18,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-credit','admin'),(19,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','edit-credit','admin'),(20,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-credit','admin'),(21,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-debit','admin'),(22,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-debit','admin'),(23,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','edit-debit','admin'),(24,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-debit','admin'),(25,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-bank','admin'),(26,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-bank','admin'),(27,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-bank','admin'),(28,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','add-paye','admin'),(29,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','delete-paye','admin'),(30,'sanjeet@Developer','Seawave Forwading And Logistics','seawave@1','Mumbai','Mumbai-1','ACCOUNTS','download-paye','admin');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvexpjob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalexpjob`
--

LOCK TABLES `approvalexpjob` WRITE;
/*!40000 ALTER TABLE `approvalexpjob` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvaljob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalimpjob`
--

LOCK TABLES `approvalimpjob` WRITE;
/*!40000 ALTER TABLE `approvalimpjob` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the organizations before approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalorg`
--

LOCK TABLES `approvalorg` WRITE;
/*!40000 ALTER TABLE `approvalorg` DISABLE KEYS */;
INSERT INTO `approvalorg` VALUES ('adani','India','Maharashtra','Mumbai','400705','9420818812','aryan@gmail.com','AFZPK7190K','27AAAAP0267H2ZN','1234567890','22','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','seawave@1','Seawave Forwading And Logistics','Adani pvt ltd','Mumbai','admin',1,'OrgButton',NULL,'2025-07-07 16:29:53',0,NULL,NULL,'[\"Shippers\"]','[\"Import\"]','[{\"email\": \"ary@gmail.com\", \"mobile\": \"9420818812\", \"department\": \"IT\", \"contactName\": \"Aryan\", \"designation\": \"a\"}]','22','22',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store all the names of users for a particular approval list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvername`
--

LOCK TABLES `approvername` WRITE;
/*!40000 ALTER TABLE `approvername` DISABLE KEYS */;
INSERT INTO `approvername` VALUES (1,'Seawave Forwading And Logistics','seawave@1','Import Job Creation','sanjeet@Developer','Mumbai','Mumbai-1','[\"ImpJobButton\"]',1,0,NULL,NULL,NULL,NULL,NULL),(2,'Seawave Forwading And Logistics','seawave@1','Export Job Creation','sanjeet@Developer','Mumbai','Mumbai-1','[\"ExpJobButton\"]',2,0,NULL,NULL,NULL,NULL,NULL),(3,'Seawave Forwading And Logistics','seawave@1','Organization Creation','sanjeet@Developer','Mumbai','Mumbai-1','[\"OrgButton\"]',3,0,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is for access of users for their org branches ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchaccess`
--

LOCK TABLES `branchaccess` WRITE;
/*!40000 ALTER TABLE `branchaccess` DISABLE KEYS */;
INSERT INTO `branchaccess` VALUES (1,'Mumbai','Mumbai-1','sanjeet@Developer','Seawave Forwading And Logistics','seawave@1',0);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the branches table that are linked to organizations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='collection table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation_employees`
--

LOCK TABLES `conversation_employees` WRITE;
/*!40000 ALTER TABLE `conversation_employees` DISABLE KEYS */;
INSERT INTO `conversation_employees` VALUES (1,'Seawave Forwading And Logistics','seawave@1',1,1),(2,'Seawave Forwading And Logistics','seawave@1',1,4),(3,'Seawave Forwading And Logistics','seawave@1',2,1),(4,'Seawave Forwading And Logistics','seawave@1',2,5),(5,'Seawave Forwading And Logistics','seawave@1',3,1),(6,'Seawave Forwading And Logistics','seawave@1',3,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (1,'Seawave Forwading And Logistics','seawave@1',0,NULL,1,'2025-07-07 11:18:30'),(2,'Seawave Forwading And Logistics','seawave@1',0,NULL,1,'2025-07-07 11:20:57'),(3,'Seawave Forwading And Logistics','seawave@1',0,NULL,1,'2025-07-07 11:21:01');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='credit details are store in this table ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the custom job number';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customjobnumber`
--

LOCK TABLES `customjobnumber` WRITE;
/*!40000 ALTER TABLE `customjobnumber` DISABLE KEYS */;
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
  `remarks` varchar(45) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store debit payment sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit`
--

LOCK TABLES `debit` WRITE;
/*!40000 ALTER TABLE `debit` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editlogs`
--

LOCK TABLES `editlogs` WRITE;
/*!40000 ALTER TABLE `editlogs` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in import will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impjobcreation`
--

LOCK TABLES `impjobcreation` WRITE;
/*!40000 ALTER TABLE `impjobcreation` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store import notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impnotifications`
--

LOCK TABLES `impnotifications` WRITE;
/*!40000 ALTER TABLE `impnotifications` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='line of business table as per users prefrences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lob`
--

LOCK TABLES `lob` WRITE;
/*!40000 ALTER TABLE `lob` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Seawave Forwading And Logistics','seawave@1',2,1,'hi','2025-07-07 11:23:49',NULL,5);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the milestones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store notifications and its data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('Seawave Forwading And Logistics','seawave@1','1/232 raheja tesla\nTTC INDUSTRIAL AREA MIDC','Adani pvt ltd','India','Maharashtra','Mumbai','adani','400705','9420818812','aryan@gmail.com','AFZPK7190K','27AAAAP0267H2ZN','1234567890','Mumbai','22','22','22','admin',1,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"Kunal Lawate@Executive\"}]','[{\"time\": null, \"employeename\": \"Kunal Lawate@Executive\"}]','[{\"employeename\": \"Kunal Lawate@Executive\"}]',1,'2025-07-07 16:29:53');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store client data and employee that created the client ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('adani','India','Maharashtra','Mumbai','400703','9292929929','admin@gmial.com','AFZPK7190K','29AAAAP0267H1ZK','AAAPB9964C','11','qwertyuhnfh,gf,','seawave@1','Seawave Forwading And Logistics','Adani pvt ltd',1,'test','admin','OrgButton','2025-07-07 17:52:47',0,'AD-SE-TE','[\"Shippers\"]',0,'[\"Import\"]','[{\"email\": \"ary@gmail.com\", \"mobile\": \"9292929929\", \"department\": \"IT\", \"contactName\": \"aryan shinde\", \"designation\": \"a\"}]','11','11',NULL,NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Paye Account Table for Paye Bank Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payeaccount`
--

LOCK TABLES `payeaccount` WRITE;
/*!40000 ALTER TABLE `payeaccount` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='it will store all transaction dr and cr related to that job number ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionhistory`
--

LOCK TABLES `transactionhistory` WRITE;
/*!40000 ALTER TABLE `transactionhistory` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_user_org` (`username`,`orgname`,`orgcode`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store data of user';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userkyctable`
--

LOCK TABLES `userkyctable` WRITE;
/*!40000 ALTER TABLE `userkyctable` DISABLE KEYS */;
INSERT INTO `userkyctable` VALUES (1,'admin','admin',NULL,NULL,'','','','','','AAGCS1234M','2025-07-04','2025-07-04','Seawave Forwading And Logistics','seawave@1','[{\"branchName\": \"Mumbai\", \"branchcode\": \"Mumbai-1\"}]','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714741_logo_seawave.jpg','',0,NULL,NULL,0,NULL,NULL,NULL),(2,'Sanjeet Sawardekar','sanjeet@Developer','12345678','Developer','0200426350','0200426350','jai@323gmail.in','jai@323gmail.in','980734561234','SAMJS2354J','2025-01-07T00:00','2001-02-28T00:00','Seawave Forwading And Logistics','seawave@1','[]','/uploads/kyc/ProfilePhoto/Sanjeet_Sawardekar.jpg','/uploads/kyc/IdProof/Sanjeet_Sawardekar.pdf',1,'admin','2025-07-07 16:54:13',0,NULL,NULL,NULL),(3,'Aryan Rajesh Shinde','aryan@Developer','12345678','Developer','0200426350','0200426350','jai@3231322.hg.com','jai@3231322.hg.com','121212121212','AFZPK7190K','2025-01-22T00:00','2005-08-09T00:00','Seawave Forwading And Logistics','seawave@1','[]','/uploads/kyc/ProfilePhoto/Aryan_Rajesh_Shinde.jpg','/uploads/kyc/IdProof/Aryan_Rajesh_Shinde.pdf',0,'admin','2025-07-07 17:58:05',0,NULL,NULL,NULL);
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
INSERT INTO `users` VALUES (1,'admin','12345','seawave@1','Seawave Forwading And Logistics','/uploads/ctclients/Seawave_Forwarding_And_Logistics_Private_Limited/1751712714741_logo_seawave.jpg',45,1);
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

-- Dump completed on 2025-07-07 18:10:33
