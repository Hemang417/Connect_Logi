-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: crm_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
) ENGINE=InnoDB AUTO_INCREMENT=406 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accesscontrol`
--

LOCK TABLES `accesscontrol` WRITE;
/*!40000 ALTER TABLE `accesscontrol` DISABLE KEYS */;
INSERT INTO `accesscontrol` VALUES (67,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','IMPORT','add-job','admin'),(90,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','IMPORT','track-job','admin'),(97,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','IMPORT','container-details','admin'),(98,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','IMPORT','transport','admin'),(115,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','IMPORT','download-job','admin'),(123,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','ACCOUNTS','add-credit','admin'),(145,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','ACCOUNTS','edit-debit','admin'),(146,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','ACCOUNTS','add-debit','admin'),(184,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','ACCOUNTS','add-bank','admin'),(211,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','ACCOUNTS','download-bank','admin'),(226,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','ACCOUNTS','add-paye','admin'),(244,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','ACCOUNTS','download-paye','admin'),(263,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Jogbani','Jogbani-2323','ORGANIZATION','add-client','admin'),(392,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','EXPORT','add-job','admin'),(405,'hemang@executive','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','IMPORT','delete-job','admin');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='if password is change before updating it should go for admin approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminchangeapproval`
--

LOCK TABLES `adminchangeapproval` WRITE;
/*!40000 ALTER TABLE `adminchangeapproval` DISABLE KEYS */;
INSERT INTO `adminchangeapproval` VALUES (4,'hemang@executive','executive','12345','Approved','bhul gya password','seawave2323','2024-09-20 12:19:35'),(6,'Aryan','developer','1212','Approved','bhul gya password','seawave@2323','2025-04-02 11:46:28'),(7,'Aryan@Developer','Developer','12345','Approved','sdsd','seawave@2323','2025-06-02 06:47:56');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvexpjob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalexpjob`
--

LOCK TABLES `approvalexpjob` WRITE;
/*!40000 ALTER TABLE `approvalexpjob` DISABLE KEYS */;
INSERT INTO `approvalexpjob` VALUES (1,'A/Mumbai/E/24-25/1','2025-01-06 16:17:00','2025-01-05 16:16:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','Home','LCL','dummy45','shfjfhs','1','Mumbai','Mumbai-2323','mumbai','adani pvt ltd','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[]','','',NULL,NULL,'[{\"type\": \"40\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"24242\"}, {\"type\": \"20\'\", \"weight\": \"43\", \"container\": 2, \"containerNo\": \"23423\"}]','ExpJobButton','2025-01-06 16:17:45','HBL/HAWB','fetch Persons','40\', 20\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(2,'A/Mumbai/E/24-25/2','2025-01-06 16:19:00','2025-01-05 16:19:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','2','Mumbai','Mumbai-2323','mumbai','adani pvt ltd','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','sdasd','mumbai','[]','','',NULL,NULL,'[{\"type\": \"40\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"12122\"}]','ExpJobButton','2025-01-06 16:19:34','MBL/MAWB','fetch Persons','40\'','123323','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(4,'A/Mumbai/E/24-25/4','2025-01-06 16:27:00','2025-01-05 16:27:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','In-Bond','FCL','dummy45','shfjfhs','4','Mumbai','Mumbai-2323','mumbai','adani pvt ltd','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','dfgdg','mumbai','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"23\", \"container\": 1, \"containerNo\": \"213123\"}, {\"type\": \"20\'\", \"weight\": \"21\", \"container\": 2, \"containerNo\": \"31231\"}]','ExpJobButton','2025-01-06 16:28:00','HBL/HAWB','fetch Persons','20\'','34232','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(5,'A/Mumbai/E/24-25/5','2025-01-06 16:34:00','2025-01-05 16:33:00','Air','Valvada ICD','No','Factory Stuff',1,'No','In-Bond','LCL','dummy45','shfjfhs','5','Mumbai','Mumbai-2323','vapi','vedant  ltd pvt','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"34243\"}]','ExpJobButton','2025-01-06 16:34:04','HBL/HAWB','fetch Persons','20\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(6,'A/Mumbai/E/24-25/6','2025-01-06 17:05:00','2025-01-07 17:05:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','6','Mumbai','Mumbai-2323','Andheri','Allcargo Pvt Ltd','dsdafsfs fsfsdfsf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"44\", \"container\": 1, \"containerNo\": \"552342\"}]','ExpJobButton','2025-01-06 17:06:11','HBL/HAWB','fetch Persons','20\', 40\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(8,'S/Mumbai/E/24-25/8','2025-02-05 11:58:00','2025-02-07 11:57:00','Sea','Mumbai Sea','Yes','Factory Stuff',2,'Yes','In-Bond','LCL','dummy45','dumpy45','8','Mumbai','Mumbai-2323','hogwarts','Tray ltd pvt','dfgd','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI LCS','NHAVA SHEVA','[]','korea','colaba',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"2343\", \"container\": 1, \"containerNo\": \"21343\"}, {\"type\": \"40\'\", \"weight\": \"2344\", \"container\": 2, \"containerNo\": \"45434\"}]','ExpJobButton','2025-02-05 11:58:17','MBL/MAWB','fetch Persons','20\', 40\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(9,'S/Mumbai/E/24-25/9','2025-02-05 12:00:00','2025-02-07 11:59:00','Sea','Raxaul LCS','Yes','Dock Stuff',2,'No','In-Bond','LCL','dummy45','dumpy45','9','Mumbai','Mumbai-2323','lokhandwale','Reliance Ltd','jijamata nagar','58GST323726432','GDMPM3914G','null','null','[]','gfdcg','korea','2025-02-08 00:00:00','2025-02-06 00:00:00','[{\"type\": \"20\'\", \"weight\": \"3232\", \"container\": 1, \"containerNo\": \"454545\"}, {\"type\": \"20\'\", \"weight\": \"43434\", \"container\": 2, \"containerNo\": \"232323\"}]','ExpJobButton','2025-02-05 12:00:24','MBL/MAWB','fetch Persons','20\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(10,'A/Mumbai/E/24-25/10','2025-02-18 11:35:00','2025-02-21 11:33:00','Air','Mumbai Sea','Yes','Dock Stuff',1,'Yes','','','dummy45','dumpy45','10','Mumbai','Mumbai-2323','hogwarts','muggles','qwertyuhnfh,gf,','27GDMPM3914G1Z4','GDMPM3914G','dfgdg','dasd','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"323\", \"container\": 1, \"containerNo\": \"sas\"}]','ExpJobButton','2025-02-18 11:35:05','HBL/HAWB','fetch Persons','20\'','dummy3','admin','seawave@2323','Seawave Forwarding Logistics','55455',0,NULL,NULL,NULL),(18,'A/Mumbai/E/24-25/12','2025-02-22 13:20:00','2025-02-22 13:19:00','Air','Kolkata Sea','Yes','Dock Stuff',2,'Yes','Home','FCL','','shfjfhs','12','Mumbai','Mumbai-2323','Andheri','','aaa','27AAICS7836D1Z9','AAICS7836D','dfsdf','dgfgdg','[]','colaba','korea','2025-02-23 00:00:00','2025-02-23 00:00:00','[{\"type\": \"20\'\", \"weight\": \"2121\", \"container\": 1, \"containerNo\": \"3131\"}, {\"type\": \"40\'\", \"weight\": \"23232\", \"container\": 2, \"containerNo\": \"1213\"}]','ExpJobButton','2025-02-22 13:25:20','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(20,'S/Mumbai/E/24-25/13','2025-02-22 14:39:00','2025-02-23 14:38:00','Sea','Mumbai Sea','Yes','Dock Stuff',2,'No','Home','LCL','dummy45','dumpy45','13','Mumbai','Mumbai-2323','mumbai','aryan','aaa','27AAICS7836D1Z9','AAICS7836D','sfsfdfs','NHAVA SHEVA','[]','','',NULL,NULL,'[{\"type\": \"Flat Bulk\", \"weight\": \"124\", \"container\": 1, \"containerNo\": \"123\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"25424\", \"container\": 2, \"containerNo\": \"23344\"}]','ExpJobButton','2025-02-22 14:39:44','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','dummy67','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(25,'A/Mumbai/E/24-25/15','2025-02-22 15:06:00','2025-02-22 15:05:00','Air','Kolkata Sea','Yes','Dock Stuff',1,'Yes','Home','FCL','dummy45','shfjfhs','15','Mumbai','Mumbai-2323','Andheri','solanki ','dasdasd adfsada adsfsgsda','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','io','colaba','2025-03-02 00:00:00','2025-03-01 00:00:00','[{\"type\": \"40\'\", \"weight\": \"3212\", \"container\": 1, \"containerNo\": \"12314\"}]','ExpJobButton','2025-02-22 15:06:49','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','dummy67','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(26,'A/Mumbai/E/24-25/16','2025-02-28 13:13:00','2025-02-28 13:10:00','Air','Mumbai Sea','Yes','Factory Stuff',1,'Yes','Home','FCL','dummy45','shfjfhs','16','Mumbai','Mumbai-2323','Andheri','Allcargo Pvt Ltd','dfgd','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','korea','colaba','2025-02-28 00:00:00','2025-02-27 00:00:00','[{\"type\": \"20\'\", \"weight\": \"212\", \"container\": 1, \"containerNo\": \"32414\"}]','ExpJobButton','2025-02-28 13:13:28','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(27,'S/Mumbai/E/24-25/17','2025-03-13 18:20:00','2025-03-13 18:19:00','Sea','Mumbai Sea','Yes','Dock Stuff',2,'Yes','Home','FCL','dummy45','shfjfhs','17','Mumbai','Mumbai-2323','mumbai','sanjeet pvt ltd','asas','27AAICS7836D1Z9','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','korea','colaba','2025-03-07 00:00:00','2025-03-13 00:00:00','[{\"type\": \"20\'\", \"weight\": \"2121\", \"container\": 1, \"containerNo\": \"212132\"}, {\"type\": \"Break Bulk\", \"weight\": \"21\", \"container\": 2, \"containerNo\": \"121213\"}]','ExpJobButton','2025-03-13 18:20:36','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(28,'S/Mumbai/E/24-25/18','2025-03-13 18:22:00','2025-03-13 18:21:00','Sea','Mumbai Sea','Yes','Dock Stuff',1,'Yes','','LCL','ffdffwe','shfjfhs','18','Mumbai','Mumbai-2323','mumbai','sanjeet pvt ltd','asas','27AAICS7836D1Z9','AAICS7836D','sdasd','dgfgdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','korea','gfhn','2025-03-13 00:00:00','2025-03-13 00:00:00','[{\"type\": \"20\'\", \"weight\": \"212\", \"container\": 1, \"containerNo\": \"dasddw\"}]','ExpJobButton','2025-03-13 18:22:46','MBL/MAWB','fetch Persons','20\'','dummy67','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(29,'S/Mumbai/E/24-25/19','2025-03-13 18:24:00','2025-03-13 18:23:00','Sea','Mumbai Sea','Yes','Dock Stuff',1,'Yes','','LCL','dummy45','shfjfhs','19','Mumbai','Mumbai-2323','mumbai','aryan','aaa','27AAICS7836D1Z9','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','korea','colaba','2025-03-12 00:00:00','2025-03-13 00:00:00','[{\"type\": \"40\'\", \"weight\": \"321\", \"container\": 1, \"containerNo\": \"dfwd\"}]','ExpJobButton','2025-03-13 18:24:53','MBL/MAWB','fetch Persons','40\'','dummy67','admin','seawave@2323','Seawave Forwarding Logistics','55455',0,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvaljob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalimpjob`
--

LOCK TABLES `approvalimpjob` WRITE;
/*!40000 ALTER TABLE `approvalimpjob` DISABLE KEYS */;
INSERT INTO `approvalimpjob` VALUES (3,'A/Mumbai/I/24-25/2','2024-12-24 11:09:00','2024-12-23 11:07:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','SEZ-Z','LCL','afsgsgfg','fssfgsggs','HBL/HAWB','fetch Persons','20\'','353543','Seawave Forwarding Logistics','seawave@2323','admin','dggg','Surrender','345444','Yearly','2','Mumbai','Mumbai-2323','Tray ltd pvt','hogwarts','dfgd','27GDMPM3914G1Z4','GDMPM3914G','sfsfdfs','dgfgdg','[]','jharkhand','Mumbai','2024-12-26 00:00:00','2024-12-25 00:00:00','[{\"type\": \"20\'\", \"weight\": \"45kg\", \"container\": 1, \"containerNo\": \"454534\"}, {\"type\": \"20\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"53453\"}]','ImpJobButton','2024-12-24 11:09:49',1,'hemang@executive','testing','2025-06-02 13:08:52'),(4,'A/Mumbai/I/24-25/3','2024-12-24 15:03:00','2024-12-24 15:03:00','Air','Kolkata Sea','Yes','Loaded',2,'No','Home','LCL','ffdffwe','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\'','56464656','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','3','Mumbai','Mumbai-2323','Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dgfgdg','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"43kg\", \"container\": 1, \"containerNo\": \"3244\"}, {\"type\": \"40\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"23442\"}]','ImpJobButton','2024-12-24 15:03:52',0,NULL,NULL,NULL),(5,'S/Mumbai/I/24-25/4','2024-12-24 15:49:00','2024-12-23 15:48:00','Sea','Mumbai Sea','No','Loaded',1,'No','Home','LCL','dummy45','gfdfgdg','HBL/HAWB','fetch Persons','20\'','5242353','Seawave Forwarding Logistics','seawave@2323','admin','4','Original','424343','Yearly','4','Mumbai','Mumbai-2323','vedant  ltd pvt','vapi','sgsgsgs','27AAICS7836D1Z3','AAICS7836D','ggdgsgs','dsfgdfhddh','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"5.5Ton\", \"container\": 1, \"containerNo\": \"354535354\"}]','ImpJobButton','2024-12-24 15:49:46',0,NULL,'',NULL),(7,'S/Mumbai/I/24-25/6','2024-12-24 16:11:00','2024-12-31 16:11:00','Sea','Raxaul LCS','Yes','Destuff',2,'Yes','In-Bond','Break Bulk','dummy45','dumpy45','HBL/HAWB','fetch Persons','40\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','234234','One-Time','6','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[]','jharkhand','Mumbai','2024-12-31 00:00:00','2024-12-24 00:00:00','[{\"type\": \"40\'\", \"weight\": \"12\", \"container\": 1, \"containerNo\": \"32112341\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"24\", \"container\": 2, \"containerNo\": \"41341341\"}]','ImpJobButton','2024-12-24 16:11:53',0,NULL,NULL,NULL),(8,'A/Mumbai/I/24-25/7','2024-12-24 16:18:00','2024-12-25 16:18:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','HBL/HAWB','fetch Persons','20\', 40\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Original','5545','Yearly','7','Mumbai','Mumbai-2323','Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[]','jharkhand','Mumbai','2024-12-28 00:00:00','2024-12-26 00:00:00','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"32344\"}, {\"type\": \"20\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"42343\"}]','ImpJobButton','2024-12-24 16:18:44',0,NULL,NULL,NULL),(9,'A/Mumbai/I/24-25/8','2024-12-24 16:24:00','2024-12-23 16:23:00','Air','Mumbai Sea','Yes','Destuff',2,'Yes','Home','LCL','affd','dffgs','MBL/MAWB','fetch Persons','20\', 40\'','23423542','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','331231','One-Time','8','Mumbai','Mumbai-2323','vedant  ltd pvt','Andheri','hddhf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','dsss','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"234234\"}, {\"type\": \"40\'\", \"weight\": \"354\", \"container\": 2, \"containerNo\": \"423423\"}]','ImpJobButton','2024-12-24 16:24:40',0,NULL,NULL,NULL),(15,'A/Mumbai/I/24-25/9','2024-12-24 17:07:00','2024-12-23 17:06:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','55455','One-Time','9','Mumbai','Mumbai-2323','Tray ltd pvt','Bihar','werwe wfqwfa afsa faasfa f','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','jharkhand','Mumbai','2024-12-24 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"433\", \"container\": 1, \"containerNo\": \"344242\"}, {\"type\": \"40\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"423442\"}]','ImpJobButton','2024-12-24 17:07:13',0,NULL,NULL,NULL),(16,'A/Mumbai/I/24-25/10','2024-12-24 17:08:00','2024-12-23 17:07:00','Air','Mumbai Sea','No','Destuff',2,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','10','Mumbai','Mumbai-2323','adani pvt ltd','Bihar','sdgdgs','27AAICS7836D1Z3','AAICS7836D','sdfsf','NHAVA SHEVA','[]','jharkhand','nepal','2024-12-27 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"445\", \"container\": 1, \"containerNo\": \"453453\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"44\", \"container\": 2, \"containerNo\": \"45345\"}]','ImpJobButton','2024-12-24 17:08:36',0,NULL,NULL,NULL),(17,'A/Mumbai/I/24-25/11','2024-12-24 17:10:00','2024-12-23 17:10:00','Air','Mumbai Sea','No','Destuff',2,'No','In-Bond','FCL','dummy45','34234','HBL/HAWB','fetch Persons','40\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','342342','Yearly','11','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','','',NULL,NULL,'[{\"type\": \"40\'\", \"weight\": \"342\", \"container\": 1, \"containerNo\": \"424234\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"33\", \"container\": 2, \"containerNo\": \"3423\"}]','ImpJobButton','2024-12-24 17:10:55',0,NULL,NULL,NULL),(20,'A/Mumbai/I/24-25/12','2024-12-24 17:37:00','2024-12-25 17:36:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','HBL/HAWB','fetch Persons','20\', 40\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','12','Mumbai','Mumbai-2323','adani pvt ltd','haryana','fsdfafdf','27AAICS7836D1Z3','AAICS7836D','asdffa','dsfafa','[]','jharkhand','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"56\", \"container\": 1, \"containerNo\": \"3534\"}, {\"type\": \"40\'\", \"weight\": \"66\", \"container\": 2, \"containerNo\": \"3453\"}]','ImpJobButton','2024-12-24 17:37:33',0,NULL,NULL,NULL),(24,'A/Mumbai/I/24-25/16','2025-01-06 16:30:00','2025-01-05 16:29:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','16','Mumbai','Mumbai-2323','Allcargo Pvt Ltd','Andheri','dsdafsfs fsfsdfsf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','jharkhand','hhjh','2025-01-26 00:00:00','2025-01-25 00:00:00','[{\"type\": \"20\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"2344\"}, {\"type\": \"20\'\", \"weight\": \"3\", \"container\": 2, \"containerNo\": \"4233\"}]','ImpJobButton','2025-01-06 16:30:10',0,NULL,NULL,NULL),(25,'A/Mumbai/I/24-25/17','2025-01-07 11:16:00','2025-01-06 11:14:00','Air','Kolkata Sea','Yes','Loaded',2,'No','Home','','dummy45','dumpy45','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','17','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','sdasd','dsfafa','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"44134\"}, {\"type\": \"40\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"24242\"}]','ImpJobButton','2025-01-07 11:17:07',0,NULL,NULL,NULL),(26,'S/Mumbai/I/24-25/18','2025-01-29 13:03:00','2025-01-30 13:01:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','dummy45','dumpy45','HBL/HAWB','fetch Persons','40\'','dummy67','Seawave Forwarding Logistics','seawave@2323','admin','98','Surrender','55455','Yearly','18','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-01-29 13:03:15',0,NULL,NULL,NULL),(29,'S/Mumbai/I/24-25/21','2025-02-04 13:23:00','2025-02-06 13:20:00','Sea','Raxaul LCS','Yes','Destuff',2,'Yes','Ex-Bond','FCL','dummy45','shfjfhs','MBL/MAWB','fetch Persons','20\'','dummy67','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','21','Mumbai','Mumbai-2323','','Andheri','dsdafsfs fsfsdfsfSanjeet','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','colaba','gfhn','2025-02-07 00:00:00','2025-02-04 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-02-04 13:23:53',0,NULL,NULL,NULL),(30,'S/Mumbai/I/24-25/22','2025-02-05 12:03:00','2025-02-07 12:02:00','Sea','Kolkata Sea','Yes','Loaded',2,'No','Home','FCL','vhvhg','dumpy45','MBL/MAWB','fetch Persons','20\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','22','Mumbai','Mumbai-2323','vedant  ltd pvt','vapi','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','JOGBANI','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-02-05 12:03:59',0,NULL,NULL,NULL),(31,'A/Mumbai/I/24-25/23','2025-02-14 15:23:00','2025-02-12 17:23:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','vhvhg','dumpy45','HBL/HAWB','fetch Persons','40\', 20\', 40\' ISO Tank','dummy3','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','23','Mumbai','Mumbai-2323','muggles','Andheri','','','','sfsfdfs','mumbai','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','mumbai','Mumbai','2025-03-02 00:00:00','2025-02-14 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-02-14 15:23:59',0,NULL,NULL,NULL),(33,'A/Mumbai/I/24-25/25','2025-02-14 16:12:00','2025-01-29 16:11:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 20\' ISO Tank, 40\'','dummy3','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','55455','Yearly','25','Mumbai','Mumbai-2323','Tray ltd pvt','mumbai','xzxzx','27AAICS7836D1Z9','AAICS7836D','sdasd','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','jharkhand','Mumbai','2025-02-12 00:00:00','2025-02-24 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-02-14 16:12:25',0,NULL,NULL,NULL),(34,'A/Mumbai/I/24-25/26','2025-02-22 13:17:00','2025-02-23 13:16:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','26','Mumbai','Mumbai-2323','Testing23','Navi mumbai','aaaa','27AAICS7836D1Z9','AAICS7836D','sfsfdfs','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','ki','korea','2025-03-04 00:00:00','2025-03-02 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-02-22 13:17:03',0,NULL,NULL,NULL),(35,'A/Mumbai/I/24-25/27','2025-02-22 15:21:00','2025-02-23 15:19:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','27','Mumbai','Mumbai-2323','sanjeet pvt ltd','mumbai','asas','27AAICS7836D1Z9','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','colaba','sd','2025-02-26 00:00:00','2025-02-23 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-02-22 15:21:14',0,NULL,NULL,NULL),(36,'A/Mumbai/I/24-25/28','2025-03-05 11:24:00','2025-03-01 11:24:00','Air','Mumbai Sea','Yes','Loaded',2,'No','In-Bond','FCL','dummy45','dumpy45','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','dummy67','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','One-Time','28','Mumbai','Mumbai-2323','Allcargo Pvt Ltd','Andheri','dfgd','27GDMPM3914G1A3','GDMPM3914G','sasa','dgfgdg','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-03-05 11:24:53',0,NULL,NULL,NULL),(38,'A/Mumbai/I/24-25/29','2025-03-10 16:33:00','2025-03-10 16:31:00','Air','Mumbai Sea','Yes','',1,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','29','Mumbai','Mumbai-2323','sanjeet pvt ltd','mumbai','asas','27AAICS7836D1Z9','AAICS7836D','sfsfdfs','dsfafa','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','gfdcg','colaba','2025-03-10 00:00:00','2025-03-10 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-03-10 16:33:51',0,NULL,NULL,NULL),(39,'S/Mumbai/I/24-25/30','2025-03-31 13:27:00','2025-03-21 13:27:00','Sea','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','vhvhg','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','30','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','dfgdg','mumbai','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','jharkhand','sfsf','2025-03-12 00:00:00','2025-03-31 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-03-31 13:27:53',0,NULL,NULL,NULL),(40,'A/Mumbai/I/24-25/31','2025-03-31 13:31:00','2025-03-19 13:30:00','Air','Kolkata Sea','Yes','Loaded',1,'Yes','Home','FCL','vhvhg','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','31','Mumbai','Mumbai-2323','aryan pvt ltd','','','','','asas','asaasa','[{\"status\": null, \"employeename\": \"hemang@executive\"}]','jharkhand','hhjh','2025-03-28 00:00:00','2025-03-31 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-03-31 13:31:32',0,NULL,NULL,NULL),(41,'A/Mumbai/I/24-25/32','2025-03-31 13:34:00','2025-03-31 13:33:00','Air','Raxaul LCS','Yes','Loaded',1,'Yes','Home','FCL','vhvhg','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','32','Mumbai','Mumbai-2323','aryan pvt ltd','Andheri','aaa','27AAICS7836D1Z9','AAICS7836D','','','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','mumbai','sfsf','2025-03-15 00:00:00','2025-03-27 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-03-31 13:34:27',0,NULL,NULL,NULL),(42,'A/Mumbai/I/24-25/33','2025-03-31 14:25:00','2025-03-19 14:25:00','Air','Kolkata Sea','No','Loaded',1,'Yes','Home','FCL','vhvhg','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','55455','Yearly','33','Mumbai','Mumbai-2323','','vapi','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','sdasd','dsfafa','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','jharkhand','hhjh','2025-04-03 00:00:00','2025-03-19 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-03-31 14:26:06',0,NULL,NULL,NULL),(43,'A/Mumbai/I/25-26/1','2025-04-10 13:04:00','2025-04-16 16:07:00','Air','Mumbai Sea','Yes','Loaded',2,'No','Home','LCL','vhvhg','shfjfhs','MBL/MAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','dummy3','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','55455','Yearly','1','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','ggdgsgs','dsfgdfhddh','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-04-10 13:05:00',0,NULL,NULL,NULL),(44,'A/I/25-26/1','2025-06-02 11:57:00','2025-06-04 00:00:00','Air','Mumbai Sea','Yes','Loaded',4,'Yes','In-Bond','LCL','vhvhg','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','dummy3','Seawave Forwarding Logistics','seawave@2323','hemang@executive','2','Surrender','55455','Yearly','1','Mumbai','Mumbai-2323','aryan pvt ltd','Andheri','aaa','27AAICS7836D1Z9','AAICS7836D','goa','mumbai','[{\"status\": null, \"employeename\": \"hemang@executive\"}, {\"status\": null, \"employeename\": \"sanjeet@Developer\"}]','a','b','2025-07-02 00:00:00','2025-05-01 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}, {\"type\": \"\", \"weight\": \"\", \"container\": 3}, {\"type\": \"\", \"weight\": \"\", \"container\": 4}]','ImpJobButton','2025-06-02 11:57:40',0,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the organizations before approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalorg`
--

LOCK TABLES `approvalorg` WRITE;
/*!40000 ALTER TABLE `approvalorg` DISABLE KEYS */;
INSERT INTO `approvalorg` VALUES ('allcargo','India','Maharashtra','Akola','400703','02004263507','jai@323gmail.in','RATPS8795S','27GDMPM3914G1A3','GDMPM3914G','120','dfgd','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd','Andheri','admin',1,'OrgButton',NULL,'2025-01-04 15:54:28',0,NULL,NULL,'[\"Shippers\", \"Consignee\"]','[\"Shippers\", \"Consignee\"]','[{\"email\": \"shreyashpingle752@gmail.com\", \"mobile\": \"8655997298\", \"department\": \"head\", \"contactName\": \"IT Seawave\", \"designation\": \"executive\"}, {\"email\": \"shreyashpingle752@gmail.com\", \"mobile\": \"02004263507\", \"department\": \"Hr\", \"contactName\": \"IT Seawave\", \"designation\": \"executive\"}]',NULL,NULL,1,NULL),('adani','Argentina','La Rioja','Villa Bustos','400614','9876543219','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','68','dasdas asdadfadf','seawave@2323','Seawave Forwarding Logistics','adani pvt ltd','mumbai','admin',2,'OrgButton',NULL,'2025-01-04 15:56:47',0,NULL,NULL,'[\"Consignee\", \"Carrier\", \"Global\"]','[\"Import\", \"Transport\", \"Freight\"]','[]',NULL,NULL,1,NULL),('vedant','East Timor','Manufahi Municipality','Fatuberliu','400614','5646456645','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','12','sdffafas dafafafa','seawave@2323','Seawave Forwarding Logistics','vedant  ltd pvt','vapi','admin',3,'OrgButton',NULL,'2025-01-04 15:57:40',0,NULL,NULL,'[\"Global\", \"Services\"]','[\"Import\", \"Transport\", \"Freight\", \"Export\"]','[{\"email\": \"it.seawave21@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"vedant\", \"designation\": \"executive\"}]',NULL,NULL,1,NULL),('solanki','Armenia','Armavir Region','Aknalich','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','12','dasdasd adfsada adsfsgsda','seawave@2323','Seawave Forwarding Logistics','solanki ','Andheri','admin',4,'OrgButton',NULL,'2025-01-04 15:59:14',0,NULL,NULL,'[\"Consignee\", \"Carrier\", \"Global\", \"Agent\"]','[\"Transport\", \"Import\", \"Freight\", \"Export\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]',NULL,NULL,1,NULL),('muggles','United Kingdom','Scotland','Logan','400703','02004263507','jai@3231322.hg.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','90','qwertyuhnfh,gf,','seawave@2323','Seawave Forwarding Logistics','muggles','hogwarts','admin',7,'OrgButton',NULL,'2025-01-31 17:08:15',0,NULL,NULL,'[\"Shippers\", \"Carrier\", \"Services\", \"Consignee\", \"Agent\", \"Global\"]','[\"Import\", \"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"hio\", \"contactName\": \"gio\", \"designation\": \"gio\"}]',NULL,NULL,1,NULL),('tray','India','Maharashtra','Achalpur','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','77','dfgd','seawave@2323','Seawave Forwarding Logistics','Tray ltd pvt','hogwarts','admin',8,'OrgButton',NULL,'2025-02-01 15:55:17',0,NULL,NULL,'[\"Shippers\", \"Agent\", \"Carrier\"]','[\"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"asd\"}]',NULL,NULL,1,NULL),('aryan','India','Maharashtra','Mumbai','400057','5534667457','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','56','aaa','seawave@2323','Seawave Forwarding Logistics','aryan pvt ltd','Andheri','admin',11,'OrgButton',NULL,'2025-02-14 12:39:36',0,NULL,NULL,'[\"Shippers\"]','[\"Import\"]','[]','22','22',1,NULL),('aryan','India','Maharashtra','Mumbai','400067','5534667457','sfdfg@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','68','aaa','seawave@2323','Seawave Forwarding Logistics','aryan','mumbai','admin',12,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2025-02-14 12:44:20',0,NULL,NULL,'[\"Shippers\"]','[\"Import\"]','[]','23','23',1,NULL),('testing23','Austria','Vienna','Meidling','400006','9578907467','vadant3@gamil.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','23','aaaa','seawave@2323','Seawave Forwarding Logistics','Testing23','Navi mumbai','admin',13,'OrgButton',NULL,'2025-02-14 13:05:43',0,NULL,NULL,'[\"Shippers\", \"Consignee\", \"Global\"]','[\"Import\", \"Transport\", \"Freight\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997298\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"frontend\"}]','22','23',0,NULL),('stark','Antigua And Barbuda','Saint John Parish','Potters Village','400006','9876543219','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','23','rrwqewq','seawave@2323','Seawave Forwarding Logistics','stark ltd ','Bihar','admin',14,'OrgButton',NULL,'2025-02-14 13:13:22',0,NULL,NULL,'[\"Shippers\"]','[\"Import\", \"Export\", \"Freight\"]','[{\"email\": \"sfdfg@gmail.com\", \"mobile\": \"8655997298\", \"department\": \"head\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','23','23',1,NULL),('cconnect','Angola','Huíla Province','Jamba','400006','8104834173','rishimuni2002@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','12','qwedsww','seawave@2323','Seawave Forwarding Logistics','cconnect','mumbai','admin',15,'OrgButton',NULL,'2025-02-14 13:18:05',0,NULL,NULL,'[\"Shippers\"]','[\"Import\"]','[{\"email\": \"shreyashpingle752@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"head\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','2','7',1,NULL),('sanjeet','India','Maharashtra','Mumbai','400067','8104834173','asdad','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','12','asas','seawave@2323','Seawave Forwarding Logistics','sanjeet pvt ltd','mumbai','admin',16,'OrgButton',NULL,'2025-02-14 14:29:01',0,NULL,NULL,'[\"Shippers\"]','[\"Import\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','12','12',1,NULL),('dummy45','Azerbaijan','Ganja','Ganja','400057','9876543219','dean@aew.in','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','34','sdsdsd','seawave@2323','Seawave Forwarding Logistics','dummy45','Navi mumbai','admin',17,'OrgButton',NULL,'2025-02-14 14:57:36',0,NULL,NULL,'[\"Shippers\"]','[\"Import\"]','[{\"email\": \"asdad\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','34','34',1,NULL),('fleeters','India','Maharashtra','Airoli','400703','02004263507','jai@323gmail.in','RATPS8795I','27AAICS7836D1Z3','GDMPM3914G','90','dfgd','seawave@2323','Seawave Forwarding Logistics','Fleeters','lokhandwale','admin',33,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2025-03-01 14:51:57',0,NULL,NULL,'[\"Consignee\"]','[\"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"Manager\"}]','12','12',1,NULL),('retromood','India','Maharashtra','Akola','400703','02004263507','jai@323gmail.in','AAICS7836D','27GDMPM3914G1Z4','GDMPM3914G','90','dfgd','seawave@2323','Seawave Forwarding Logistics','RetroMood','lokhandwale','admin',34,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2025-03-01 15:24:00',0,NULL,NULL,'[\"Consignee\"]','[\"Import\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"Manager\"}]','12','12',1,NULL),('bluedockers','India','Maharashtra','Akluj','400703','02004263507','jai@323gmail.in','GDMPM3914G','27AAICS7836D1Z3','AAICS7836D','90','dfgd','seawave@2323','Seawave Forwarding Logistics','BlueDockers','Vashi','admin',35,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2025-03-04 17:09:30',0,NULL,NULL,'[\"Consignee\"]','[\"Freight\", \"Import\", \"Export\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"management\", \"contactName\": \"gio\", \"designation\": \"Manager\"}]','12','12',1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the name of the approver list of a particular organization';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approverlist`
--

LOCK TABLES `approverlist` WRITE;
/*!40000 ALTER TABLE `approverlist` DISABLE KEYS */;
INSERT INTO `approverlist` VALUES ('Seawave Forwarding Logistics','seawave@2323',5,'Import Job Creation','Mumbai','Mumbai-2323','[\"ImpJobButton\"]',1,NULL,1,'admin',NULL,'zxzx','2025-05-12 00:00:00'),('Seawave Forwarding Logistics','seawave@2323',9,'Organization Creation','Delhi','Delhi-2323','[\"OrgButton\"]',0,NULL,0,NULL,NULL,NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',10,'Organization Creation','Jogbani','Jogbani-2323','[\"OrgButton\"]',0,NULL,0,NULL,NULL,NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',11,'Export Job Creation','Mumbai','Mumbai-2323','[\"ExpJobButton\"]',1,NULL,0,NULL,NULL,NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',12,'Export Job Creation','Delhi','Delhi-2323','[\"ExpJobButton\"]',0,NULL,0,NULL,NULL,NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',14,'test','Mumbai','Mumbai-2323','[\"ImportBtn\"]',1,'2025-05-12 09:53:35',1,'admin','admin','asas','2025-05-12 00:00:00'),('Seawave Forwarding Logistics','seawave@2323',15,'Organization Creation','Mumbai','Mumbai-2323','[\"OrgButton\"]',1,'2025-05-20 10:06:07',0,NULL,'hemang@executive',NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',16,'Export Job Creation','Jogbani','Jogbani-2323','[\"ExpJobButton\"]',1,'2025-05-20 10:06:09',0,NULL,'hemang@executive',NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',17,'Import Job Creation','Jogbani','Jogbani-2323','[\"ImpJobButton\"]',0,'2025-05-20 10:06:10',0,NULL,'hemang@executive',NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',18,'Import Job Creation','Delhi','Delhi-2323','[\"ImpJobButton\"]',0,'2025-05-20 10:06:11',0,NULL,'hemang@executive',NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',19,'Import Job Creation','Kolkata','Kolkata-2323','[\"ImpJobButton\"]',0,'2025-05-20 10:06:12',0,NULL,'hemang@executive',NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',20,'Export Job Creation','Kolkata','Kolkata-2323','[\"ExpJobButton\"]',0,'2025-05-20 10:06:13',0,NULL,'hemang@executive',NULL,NULL),('Seawave Forwarding Logistics','seawave@2323',21,'Organization Creation','Kolkata','Kolkata-2323','[\"OrgButton\"]',0,'2025-05-20 10:06:14',0,NULL,'hemang@executive',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store all the names of users for a particular approval list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvername`
--

LOCK TABLES `approvername` WRITE;
/*!40000 ALTER TABLE `approvername` DISABLE KEYS */;
INSERT INTO `approvername` VALUES (39,'Seawave Forwarding Logistics','seawave@2323','Export Job Creation','aayush@manager','Jogbani','Jogbani-2323','[\"ExpJobButton\"]',11,0,NULL,NULL,NULL,NULL,NULL),(66,'Seawave Forwarding Logistics','seawave@2323','Organization Creation','aayush@manager','Mumbai','Mumbai-2323','[\"OrgButton\"]',9,0,NULL,NULL,NULL,NULL,NULL),(68,'Seawave Forwarding Logistics','seawave@2323','test','aayush@manager','Mumbai','Mumbai-2323','[\"ImportBtn\"]',14,1,'admin',NULL,'asas','2025-05-12 00:00:00',NULL),(69,'Seawave Forwarding Logistics','seawave@2323','Export Job Creation','aayush@manager','Mumbai','Mumbai-2323','[\"ExpJobButton\"]',11,0,NULL,NULL,NULL,NULL,NULL),(104,'Seawave Forwarding Logistics','seawave@2323','Import Job Creation','hemang@executive','Mumbai','Mumbai-2323','[\"ImpJobButton\"]',5,0,NULL,NULL,NULL,NULL,NULL),(105,'Seawave Forwarding Logistics','seawave@2323','Export Job Creation','hemang@executive','Mumbai','Mumbai-2323','[\"ExpJobButton\"]',11,0,NULL,NULL,NULL,NULL,NULL),(106,'Seawave Forwarding Logistics','seawave@2323','Organization Creation','hemang@executive','Mumbai','Mumbai-2323','[\"OrgButton\"]',15,0,NULL,NULL,NULL,NULL,NULL),(107,'Seawave Forwarding Logistics','seawave@2323','Import Job Creation','sanjeet@Developer','Mumbai','Mumbai-2323','[\"ImpJobButton\"]',5,0,NULL,NULL,NULL,NULL,NULL),(108,'Seawave Forwarding Logistics','seawave@2323','Export Job Creation','sanjeet@Developer','Mumbai','Mumbai-2323','[\"ExpJobButton\"]',11,0,NULL,NULL,NULL,NULL,NULL),(109,'Seawave Forwarding Logistics','seawave@2323','Organization Creation','sanjeet@Developer','Mumbai','Mumbai-2323','[\"OrgButton\"]',15,0,NULL,NULL,NULL,NULL,NULL);
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
INSERT INTO `bankaccount` VALUES ('[{\"branchname\": \"Mumbai\"}, {\"branchname\": \"Pune\"}]','[{\"branchcode\": \"someone Mumbai-123\"}, {\"branchcode\": \"someone Pune-123\"}]','someone@123','someone pvt ltd','Canara','A5747524234',3,'Cash Credit','null','HDFC0000490',5000),('[{\"branchname\": \"Jogbani\"}]','[{\"branchcode\": \"Jogbani-2323\"}]','seawave@2323','Seawave Forwarding Logistics','SBI','ZZ4753',4,'Current','null','CNRB0001589',5000),('[{\"branchname\": \"Raxaul\"}]','[{\"branchcode\": \"Raxaul-2323\"}]','seawave@2323','Seawave Forwarding Logistics','ICICI','ICICI324234',5,'Savings','null','ICIC0000418',4524234),('[{\"branchname\": \"Jogbani\"}]','[{\"branchcode\": \"Jogbani-2323\"}]','seawave@2323','Seawave Forwarding Logistics','canara','3444345',6,'Savings','null','CNRB0000104',45677),('[{\"branchname\": \"Kolkata\"}]','[{\"branchcode\": \"Kolkata-2323\"}]','seawave@2323','Seawave Forwarding Logistics','Punjab Bank','855298631245',7,'Current','null','HDFC0000830',100000);
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is for access of users for their org branches ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchaccess`
--

LOCK TABLES `branchaccess` WRITE;
/*!40000 ALTER TABLE `branchaccess` DISABLE KEYS */;
INSERT INTO `branchaccess` VALUES (11,'Delhi','Delhi-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323',0),(12,'Delhi','Delhi-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323',0),(16,'Delhi','Delhi-2323','rishi@manager','Seawave Forwarding Logistics','seawave@2323',0),(18,'Mumbai','Mumbai-23','ved@manager','seatech','seatech@23',0),(37,'Jogbani','Jogbani-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323',0),(38,'Mumbai','Mumbai-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323',0),(39,'Mumbai','Mumbai-2323','sanjeet@Developer','Seawave Forwarding Logistics','seawave@2323',0),(40,'Jogbani','Jogbani-2323','sanjeet@Developer','Seawave Forwarding Logistics','seawave@2323',0),(41,'Delhi','Delhi-2323','sanjeet@Developer','Seawave Forwarding Logistics','seawave@2323',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the branches table that are linked to organizations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'vashi','seaconnect','seawave@2323','1',0,NULL),(2,'vashi','forte services','seawave@2323','1',0,NULL),(3,'vashi','seaconnect','seawave@2323','2',0,NULL),(4,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','3',0,NULL),(5,'Ahemdabad','Seatech','seawave@2323','4',0,NULL),(6,'vashi','seaconnect','seawave@2323','1',0,NULL),(7,'telangana','erte retgdf','seawave@2323','2',0,NULL),(8,'telangana','erte retgdf','seawave@2323','1',0,NULL),(9,'Parel','seaconnect','seawave@2323','2',0,NULL),(10,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1',0,NULL),(11,'vashi','seaconnect','seawave@2323','1',0,NULL),(12,'Patna','uneed services','seawave@2323','2',0,NULL),(13,'vashi','seaconnect','seawave@2323','1',0,NULL),(14,'vashi','uneed services','seawave@2323','1',0,NULL),(15,'Parel','accenture services','seawave@2323','2',0,NULL),(16,'Jaipur','Apexsea Logistics Pvt Ltd','seawave@2323','3',0,NULL),(17,'telangana','seaconnect','seawave@2323','1',0,NULL),(18,'Parel','seaconnect','seawave@2323','1',0,NULL),(19,'vashi','seaconnect','seawave@2323','1',0,NULL),(20,'Patna','seaconnect','seawave@2323',NULL,0,NULL),(21,'Jaipur','uneed services','seawave@2323','1',0,NULL),(22,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1',0,NULL),(23,'Jaipur','forte services','seawave@2323','1',0,NULL),(24,'telangana','seaconnect','seawave@2323','1',0,NULL),(25,'Raipur','seaconnect','seawave@2323','1',0,NULL),(26,'Null','seaconnect','seawave@2323','1',0,NULL),(27,'vashi','accenture services','seawave@2323','2',0,NULL),(28,'Uganda','Apexsea Logistics Pvt Ltd','seawave@2323','3',0,NULL),(29,'Jaipur','forte services','seawave@2323','4',0,NULL),(30,'goat','BHaijan','seawave@2323','5',0,NULL),(31,'Parel','tttt','seawave@2323','6',0,NULL),(32,'bhais','tttt','seawave@2323','7',0,NULL),(33,'buffalo','ggggggggg','seawave@2323','8',0,NULL),(34,'injection','iiiii','seawave@2323','9',0,NULL),(35,'done','done','seawave@2323','10',0,NULL),(36,'jhaatu','dummy','seawave@2323','11',0,NULL),(37,'kerala','test','seawave@2323','12',0,NULL),(38,'Himalaya','uneed services','seawave@2323','13',0,NULL),(39,'thth','ff','seawave@2323','14',0,NULL),(40,'final','Final Test','seawave@2323','15',0,NULL),(41,'finale','Final','seawave@2323','16',0,NULL),(42,'DJ','Final Test','seawave@2323','17',0,NULL),(43,'Ghatkopar','Final Test','seawave@2323','18',0,NULL),(44,'render','Final Render Test','seawave@2323','19',0,NULL),(45,'dsf','final G','seawave@2323','20',0,NULL),(46,'finale','final G','seawave@2323','21',0,NULL),(47,'dy','Final Render Test','seawave@2323','22',0,NULL),(48,'Alephata','JamJam','seawave@2323','23',0,NULL),(49,'test branch','Test Organization','seawave@2323','24',0,NULL),(50,'Jamacia','usain bolt','seawave@2323','25',0,NULL),(51,'approver','ApproverLog Test Dummy','seawave@2323','26',0,NULL),(52,'kurla','vector','seawave@2323','27',0,NULL),(53,'vashi','seaconnect','seawave@2323','1',0,NULL),(54,'telangana','erte retgdf','seawave@2323','1',0,NULL),(55,'Belapur','seaconnect','seawave@2323','2',0,NULL),(56,'ghana','Gazai Medicals','seawave@2323','3',0,NULL),(57,'sfsdf','Apexsea Logistics Pvt Ltd','seawave@2323','4',0,NULL),(58,'ginger','uneed services','seawave@2323','5',0,NULL),(59,'DJ','Final Test','seawave@2323','6',0,NULL),(60,'hareshwar','Hari Hareshwar','seawave@2323','7',0,NULL),(61,'nanded','Damru','seawave@2323','8',0,NULL),(62,'Miami','GTA','seawave@2323','9',0,NULL),(63,'motif','Notif Test','seawave@2323','10',0,NULL),(64,'DJ','Final Render Test','seawave@2323','11',0,NULL),(65,'Allorg','Notification Test Final','seawave@2323','12',0,NULL),(66,'abc','XYZ XYZ','seawave@2323','13',0,NULL),(67,'zaza','zaza test','seawave@2323','14',0,NULL),(68,'haland','Hazardous notification','seawave@2323','15',0,NULL),(69,'gdsfds','usain bolt','seawave@2323','16',0,NULL),(70,'Hindustan','Rooster','seawave@2323',NULL,0,NULL),(71,'haridwar','Heritage Motors','seawave@2323',NULL,0,NULL),(72,'dsfdsf','fsdgfsf','seawave@2323',NULL,0,NULL),(73,'nigeria','nij','seawave@2323',NULL,0,NULL),(74,'KJ Somaiya','gds','seawave@2323',NULL,0,NULL),(75,'dfgdfg','dgdfg','seawave@2323',NULL,0,NULL),(76,'dummy','dfgdfg','seawave@2323',NULL,0,NULL),(77,'gfg','dgdfsd','seawave@2323',NULL,0,NULL),(78,'dsg','fsdf','seawave@2323',NULL,0,NULL),(79,'hyderbad','seaconnect','seawave@2323','1',0,NULL),(80,'hydrebad','uneed services','seawave@2323','1',0,NULL),(81,'patna','Apexsea Logistics Pvt Ltd','seawave@2323','1',0,NULL),(88,'juinagar','Prince LLP','seawave@2323','7',0,NULL),(90,'Mumbai','Vedant PVT LTD','seawave@2323','10',0,NULL),(91,'Mumbai','Vedant PVT LTD','seawave@2323','10',0,NULL),(92,'mumbai','dummy3','seawave@2323',NULL,0,NULL),(93,'mumbai','dummy3 Pvt ltd','seawave@2323','13',0,NULL),(95,'Pune','Allcargo Pvt Ltd','seatech@23','15',0,NULL),(99,'panjab','vedant pvt ltd','seawave@2323',NULL,0,NULL),(106,'Bihar','Tray ltd pvt','seawave@2323','3',0,NULL),(111,'Pune','Tray ltd pvt','seawave@2323',NULL,0,NULL),(130,'mumbai','Tray ltd pvt','seawave@2323','15',0,NULL),(131,'haryana','Tray ltd pvt','seawave@2323','16',0,NULL),(141,'Andheri','dummyn pvt','seawave@2323','18',0,NULL),(142,'juinagar','dummyn pvt','seawave@2323','19',0,NULL),(151,'Andheri','dummyn pvt','seawave@2323','28',0,NULL),(152,'Bihar','Tray ltd pvt','seawave@2323','29',0,NULL),(154,'Andheri','solanki ','seawave@2323',NULL,0,NULL),(155,'Andheri','solanki ','seawave@2323',NULL,0,NULL),(156,'Andheri','solanki ','seawave@2323',NULL,0,NULL),(158,'Pune','solanki ','seawave@2323','31',0,NULL),(159,'mumbai','solanki ','seawave@2323','32',0,NULL),(160,'Bihar','solanki ','seawave@2323','33',0,NULL),(161,'Bihar','solanki ','seawave@2323','34',0,NULL),(162,'mumbai','dummy99','seawave@2323','35',1,'2025-01-09 14:26:48'),(163,'vapi','dummy999','seawave@2323','36',0,NULL),(164,'haryana','dummy88','seawave@2323','37',0,NULL),(165,'mumbai','dummy55','seawave@2323','38',0,NULL),(167,'haryana','dummy1111','seawave@2323','40',0,NULL),(168,'haryana','dummy1111','seawave@2323','40',0,NULL),(169,'haryana','dummy1111','seawave@2323','40',0,NULL),(172,'Andheri','solanki ','seawave@2323','43',0,NULL),(177,'haryana','solanki ','seawave@2323','48',0,NULL),(178,'mumbai','Tray ltd pvt2.0','seawave@2323','49',0,NULL),(179,'Andheri','dummy765','seawave@2323','50',0,NULL),(180,'Andheri','Allcargo Pvt Ltd','seawave@2323','1',0,NULL),(181,'mumbai','adani pvt ltd','seawave@2323','2',0,NULL),(182,'vapi','vedant  ltd pvt','seawave@2323','3',0,NULL),(183,'Andheri','solanki ','seawave@2323','4',0,NULL),(184,'Pune','solanki ','seawave@2323','5',0,NULL),(185,'Juinagar ','Seawave Logistic Pvt Ltd','seawave@2323','6',1,'2025-01-09 14:26:45'),(186,'haryana','dummy99','seawave@2323','7',1,'2025-01-09 14:26:48'),(187,'vapi','Allcargo Pvt Ltd','seawave@2323','8',0,NULL),(188,'hogwarts','muggles','seawave@2323','9',0,NULL),(189,'hogwarts','Tray ltd pvt','seawave@2323','10',0,NULL),(190,'govandi','muggles','seawave@2323','11',1,NULL),(191,'lokhandwale','Relience Ltd','seawave@2323','12',1,'2025-02-05 16:07:27'),(192,'lokhandwale','Relience Ltd','seawave@2323','13',1,'2025-02-05 16:07:27'),(193,'','','seawave@2323','14',0,NULL),(194,'lokhandwale','Relience Ltd','seawave@2323','15',1,'2025-02-05 16:07:27'),(195,'','','seawave@2323','16',0,NULL),(196,'lokhandwale','Relience Ltd','seawave@2323','17',1,'2025-02-05 16:07:27'),(197,'','','seawave@2323','18',0,NULL),(198,'lokhandwale','Relience Ltd','seawave@2323','19',1,'2025-02-05 16:07:27'),(199,'','','seawave@2323','20',0,NULL),(200,'','','seawave@2323','21',0,NULL),(201,'','','seawave@2323','22',0,NULL),(202,'Bihar','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(203,'Andheri','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(204,'Andheri','aryan pvt ltd','seawave@2323','23',0,NULL),(205,'mumbai','aryan','seawave@2323','24',0,NULL),(206,'Navi mumbai','Testing23','seawave@2323','25',0,NULL),(207,'Bihar','stark ltd ','seawave@2323','26',0,NULL),(208,'mumbai','cconnect','seawave@2323','27',0,NULL),(209,'mumbai','sanjeet pvt ltd','seawave@2323','31',0,NULL),(210,'Navi mumbai','dummy45','seawave@2323','32',0,NULL),(211,'','','seawave@2323','33',0,NULL),(212,'govandi','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(213,'govandi','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(214,'Vashi','adani pvt ltd','seawave@2323',NULL,0,NULL),(215,'Vashi','adani pvt ltd','seawave@2323',NULL,0,NULL),(216,'Aurangabad','RetroMood','seawave@2323','34',1,'2025-03-01 15:22:29'),(217,'Vashi','RetroMood','seawave@2323','36',1,'2025-03-01 15:22:29'),(218,'Vashi','RetroMood','seawave@2323','37',1,'2025-03-01 15:22:29'),(219,'sdsd','RetroMood','seawave@2323','38',1,'2025-03-01 15:22:29'),(220,'lokhandwale','RetroMood','seawave@2323','39',1,'2025-03-01 15:22:29'),(221,'lokhandwale','RetroMood','seawave@2323','40',1,'2025-03-01 15:22:29'),(222,'lokhandwale','RetroMood','seawave@2323','41',1,'2025-03-01 15:22:29'),(223,'lokhandwale','RetroMood','seawave@2323','42',1,'2025-03-01 15:22:29'),(224,'govandi','RetroMood','seawave@2323','43',1,'2025-03-01 15:22:29'),(225,'lokhandwale','RetroMood','seawave@2323','44',1,'2025-03-01 15:22:29'),(226,'govandi','Fleeters','seawave@2323','45',1,'2025-03-01 13:16:02'),(227,'lokhandwale','Fleeters','seawave@2323','46',0,NULL),(228,'lokhandwale','RetroMood','seawave@2323','47',0,NULL),(229,'Vashi','BlueDockers','seawave@2323','48',0,NULL),(230,'Navi mumbai','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(231,'Navi mumbai','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(232,'asas','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(233,'Bihar','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(234,'Bihar','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(235,'Bihar','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(236,'Navi mumbai','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(237,'Bihar','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL),(238,'Bihar','Allcargo Pvt Ltd','seawave@2323',NULL,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='collection table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (6,'A/Mumbai/I/24-25/1','Seawave Forwarding Logistics','seawave@2323','Andheri','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-21','4563455234','4535','4534','9069.00','2025-04-12','2025-05-05','2025-05-28','0','Hemang Ranjan',0,NULL,0,NULL,NULL,NULL),(7,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','Bihar','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-26','52354222','58','3424','3482.00','2025-04-12','2025-05-05','2025-05-28','0','Hemang Ranjan',0,NULL,0,NULL,NULL,NULL),(8,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','Bihar','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-26','32342342','4242434','7844','4250278.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,NULL,0,NULL,NULL,NULL),(9,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','Bihar','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-31','5353533','10000.78','23234','33234.78','2025-04-12','2025-05-05','2025-05-28','0','Hemang Ranjan',0,NULL,0,NULL,NULL,NULL),(15,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,NULL,0,NULL,NULL,'admin'),(18,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(19,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(20,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(21,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,NULL),(23,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(25,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,NULL),(26,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(27,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(28,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(29,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-02-09','45649862565','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','',0,'admin',0,NULL,NULL,NULL),(30,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-01-30','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Rishi Mishra',0,'admin',0,NULL,NULL,NULL),(31,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-04','billtest0003','58','36','94.00','2025-04-12','2025-05-05','2025-05-28','0','Hemang Ranjan',0,'admin',0,NULL,NULL,'admin'),(33,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-02-13','45649862565','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','',0,'admin',0,NULL,NULL,NULL),(34,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-02-13','45649862565','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','Aayush Mishra',0,'admin',0,NULL,NULL,NULL),(37,'S/Mumbai/E/24-25/8','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','Tray ltd pvt','2025-02-15','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0',NULL,0,'admin',0,NULL,NULL,NULL),(38,'S/Mumbai/E/24-25/8','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','Tray ltd pvt','2025-02-15','1','1000','78','1078.00','2025-04-12','2025-05-05','2025-05-28','0','Hemang Ranjan',0,'admin',0,NULL,NULL,'admin'),(45,'A/Mumbai/I/24-25/25','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','Tray ltd pvt','2025-02-12','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0',NULL,0,'admin',0,NULL,NULL,NULL),(46,'A/Mumbai/I/24-25/25','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','Tray ltd pvt','2025-02-14','45649862565','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0','',0,'admin',0,NULL,NULL,NULL),(48,'A/Mumbai/I/24-25/25','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','Tray ltd pvt','2025-02-12','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28','0',NULL,0,'admin',0,NULL,NULL,NULL),(49,'A/Mumbai/I/24-25/23','Seawave Forwarding Logistics','seawave@2323','Andheri','Mumbai-2323','Mumbai','aryan pvt ltd','2025-02-14','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28',NULL,'Aryan Rajesh Shinde',0,'admin',0,NULL,NULL,'admin'),(50,'A/Mumbai/I/24-25/25','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','Tray ltd pvt','2022-02-26','45649862565','1000','78','1078.00','2025-04-12','2025-05-05','2025-05-28','0','',0,'admin',0,NULL,NULL,NULL),(51,'A/Mumbai/I/24-25/23','Seawave Forwarding Logistics','seawave@2323','Andheri','Mumbai-2323','Mumbai','aryan pvt ltd','2025-02-14','billtest0003','58','78','136.00','2025-04-12','2025-05-05','2025-05-28',NULL,'Rishi Mishra',0,'admin',0,NULL,NULL,'admin'),(54,'A/Mumbai/I/24-25/23','Seawave Forwarding Logistics','seawave@2323','Andheri','Mumbai-2323','Mumbai','aryan pvt ltd','2025-02-23','billtest00028','1000','78','1078.00','2025-04-12','2025-05-05','2025-05-28','0','',0,'admin',0,NULL,NULL,NULL),(57,'A/Mumbai/I/24-25/12','Seawave Forwarding Logistics','seawave@2323','haryana','Mumbai-2323','Mumbai','adani pvt ltd','2025-02-15','billtest0023','10000','83457','93457.00','2025-04-25','2025-05-07','2025-05-30','0','',0,'admin',0,NULL,NULL,NULL),(58,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','Allcargo Pvt Ltd','2025-02-19','5655454msdhn','10000','83456','93456.00','2025-03-04','2025-04-04','2025-05-05','0','sanjeet',0,'admin',0,NULL,NULL,NULL),(59,'A/Mumbai/E/24-25/5','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-02-19','billtest0001','1000','83457','84457.00','2025-03-04','2025-04-26','2025-05-27','0','Rishi Mishra',0,'admin',0,NULL,NULL,NULL),(60,'S/Mumbai/E/24-25/8','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','Tray ltd pvt','2025-02-19','billtest0002','12344435','83456','12427891.00','2025-02-20','2025-02-20','2025-02-20','0','',0,'admin',0,NULL,NULL,NULL),(61,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','Andheri','Mumbai-2323','Mumbai','Allcargo Pvt Ltd','2025-02-20','billtest00232','10000','83457','93457.00','2025-03-24','2025-04-16','2025-05-17','0','',0,'admin',0,NULL,NULL,NULL),(62,'A/Mumbai/I/24-25/27','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','sanjeet pvt ltd','2025-03-01','BILL-62','10000','83457','93457.00','2025-03-14','2025-03-26','2025-04-07','0','',0,'admin',0,NULL,NULL,NULL),(63,'A/Mumbai/I/24-25/27','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','sanjeet pvt ltd','2025-03-01','BILL-63','10000','36','10036.00','2025-03-14','2025-03-26','2025-04-07','0','',0,'admin',0,NULL,NULL,NULL),(64,'A/Mumbai/I/24-25/27','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','sanjeet pvt ltd','2025-03-01','BILL-64','12344435','83457','12427892.00','2025-03-14','2025-03-26','2025-04-07','0','',0,'admin',0,NULL,NULL,NULL),(65,'A/Mumbai/I/24-25/27','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','sanjeet pvt ltd','2025-03-01','BILL-65','123456','09877','133333.00','2025-03-14','2025-03-26','2025-04-07','0','',0,'hemang@executive',0,NULL,NULL,NULL),(66,'A/Mumbai/I/24-25/27','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','sanjeet pvt ltd','2025-03-03','BILL-66','10000','83457','93457.00','2025-03-16','2025-03-28','2025-04-09','0','',0,'admin',0,NULL,NULL,NULL),(67,'A/Mumbai/I/24-25/26','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','Testing23','2025-03-04','BILL-67','10000','83457','93457.00','2025-03-28','2025-04-09','2025-04-21','0','',0,'admin',0,NULL,NULL,NULL),(68,'A/Mumbai/I/24-25/26','Seawave Forwarding Logistics','seawave@2323','Navi mumbai','Mumbai-2323','Mumbai','sanjeet pvt ltd','2025-03-04','BILL-68','12344435','83457','12427892.00','2025-03-28','2025-04-09','2025-04-21','0','',0,'admin',0,NULL,NULL,NULL),(71,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-03-29','BILL-71','58','78','136.00','2025-01-09','2025-03-03','2025-04-03',NULL,'Aryan Rajesh Shinde',0,'admin',0,NULL,NULL,NULL),(72,'S/Mumbai/I/24-25/30','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','adani pvt ltd','2025-01-01','BILL-72','58','78','136.00','2025-03-11','2025-03-23','2025-04-15','30','Aryan Rajesh Shinde',0,'admin',0,NULL,NULL,NULL),(73,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-04-11','BILL-73','','','0.00','2025-04-24','2025-06-16','2025-07-17','0','Aryan Rajesh Shinde',0,'admin',0,NULL,NULL,'admin'),(74,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-04-11','BILL-74','','','0.00','2025-04-24','2025-06-16','2025-07-17','0','Hemang Ranjan',0,'admin',0,NULL,NULL,NULL),(75,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-04-11','BILL-75','58','78','136.00','2024-10-23','2024-12-15','2025-01-15',NULL,'Rishi Mishra',0,'admin',0,NULL,NULL,NULL),(80,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-09-20','BILL-80','112121212212121222','','112121212212121216.00','2024-10-03','2024-11-25','2024-12-26','191','Aryan Rajesh Shinde',0,'admin',0,NULL,NULL,NULL),(81,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-04-11','BILL-81','211','111','322.00','2025-04-24','2025-06-16','2025-07-17','0','Aryan Rajesh Shinde',0,'admin',0,NULL,NULL,NULL),(82,'S/Mumbai/I/24-25/22','Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','Mumbai','vedant  ltd pvt','2025-04-11','BILL-82','9999999','1','10000000.00','2025-04-24','2025-06-16','2025-07-17','0','',0,'admin',0,NULL,NULL,NULL);
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
INSERT INTO `contacts` VALUES ('ddada','dadad','dadsda','asda','asdad','mumbai','Seawave Forwarding Logistics','seawave@2323','adani pvt ltd',2),('vedant','frontend','IT','8655997299','shreyashpingle752@gmail.com','mumbai','Seawave Forwarding Logistics','seawave@2323','adani pvt ltd',2),('vedant','frontend','IT','8655997299','shreyashpingle752@gmail.com','mumbai','Seawave Forwarding Logistics','seawave@2323','Allcargo Pvt Ltd',1),('rishi','frontend','IT','8655997299','shreyashpingle752@gmail.com','Bihar','Seawave Forwarding Logistics','seawave@2323','Tray ltd pvt',3),('fghdh ','sdf','sgsgs','gsggs','sofsfds@gmail.com','vapi','Seawave Forwarding Logistics','seawave@2323','vedant  ltd pvt',4),('ddada','dasda','sdad','dasdad','asdad','mumbai','Seawave Forwarding Logistics','seawave@2323','Allcargo Pvt Ltd',1),('ffsfaf','dsfadfa','fdafdfa','5674756356','sofsfds@gmail.com','Pune','Seawave Forwarding Logistics','seawave@2323','Allcargo Pvt Ltd',5),('sdad','dasd','dasd','5453353456','sofsfds@gmail.com','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','CONTINENTAL CFS',6),('sdad','dasd','dasd','5453353456','sofsfds@gmail.com','NHAVA SHEVA','Seawave Forwarding Logistics','seawave@2323','CONTINENTAL CFS',7);
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
  `conversation_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation_employees`
--

LOCK TABLES `conversation_employees` WRITE;
/*!40000 ALTER TABLE `conversation_employees` DISABLE KEYS */;
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
  `is_group` tinyint(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
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
  `createdby` varchar(50) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `DeleteRemark` varchar(255) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='credit details are store in this table ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES (4,'498','2024-12-26','2024-12-20','SBI','existing','adani pvt ltd','on-account','gdgdggg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/3\", \"billNoForAgainstBill\": {\"label\": \"45649862565\", \"value\": \"45649862565\", \"jobnumber\": \"A/Mumbai/E/24-25/3\", \"grandTotal\": \"136.00\"}, \"billamountForAgainstBill\": \"136.00\", \"tdsDeductionForAgainstBill\": \"100\", \"totalReceivableForAgainstBill\": \"36.00\"}]','against-job',NULL,'[{\"jobNo\": {\"label\": \"A/Mumbai/E/24-25/2\", \"value\": \"A/Mumbai/E/24-25/2\"}, \"amount\": \"122222\", \"typeOfJob\": {\"label\": \"Export\", \"value\": \"Export\"}}]','122258',NULL,0,NULL,NULL,NULL),(5,'880','2024-12-26','2024-12-27','SBI','existing','Allcargo Pvt Ltd','against-bill','none','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/3\", \"billNoForAgainstBill\": {\"label\": \"45649862565\", \"value\": \"45649862565\", \"jobnumber\": \"A/Mumbai/E/24-25/3\", \"grandTotal\": \"136.00\"}, \"billamountForAgainstBill\": \"136.00\", \"tdsDeductionForAgainstBill\": \"1\", \"totalReceivableForAgainstBill\": \"135.00\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','135',NULL,0,NULL,NULL,NULL),(6,'120','2024-12-30','2024-12-26','SBI','existing','Allcargo Pvt Ltd','on-account','ggdgfggd','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"\", \"billNoForAgainstBill\": \"\", \"billamountForAgainstBill\": \"\", \"tdsDeductionForAgainstBill\": \"\", \"totalReceivableForAgainstBill\": \"\"}]','against-job',NULL,'[{\"jobNo\": {\"label\": \"A/Mumbai/I/24-25/1\", \"value\": \"A/Mumbai/I/24-25/1\"}, \"amount\": \"10000\", \"typeOfJob\": {\"label\": \"Import\", \"value\": \"Import\"}}]','10000',NULL,0,NULL,NULL,NULL),(7,'501','2024-12-31','2024-12-26','Canara','existing','vedant  ltd pvt','against-bill','dgfg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/6\", \"billNoForAgainstBill\": {\"label\": \"5353533\", \"value\": \"5353533\", \"jobnumber\": \"A/Mumbai/E/24-25/6\", \"grandTotal\": \"33234.78\"}, \"billamountForAgainstBill\": \"33234.78\", \"tdsDeductionForAgainstBill\": \"5434.76\", \"totalReceivableForAgainstBill\": \"27800.02\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','27800.02',NULL,0,NULL,NULL,NULL),(20,'Mumbai/25-26/5','2025-05-15','2025-05-15','ICICI','existing','Allcargo Pvt Ltd','on-account','plokijuh','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"\", \"billNoForAgainstBill\": \"\", \"billamountForAgainstBill\": \"\", \"tdsDeductionForAgainstBill\": \"\", \"totalReceivableForAgainstBill\": \"\"}]','against-job',NULL,'[{\"jobNo\": {\"label\": \"A/Mumbai/I/24-25/2\", \"value\": \"A/Mumbai/I/24-25/2\"}, \"amount\": \"98765\", \"typeOfJob\": {\"label\": \"Import\", \"value\": \"Import\"}}]','98765',NULL,0,NULL,NULL,'admin'),(22,'Mumbai/CR/7/25-26/7','2025-05-28','2025-05-29','Punjab Bank','existing','vedant  ltd pvt','against-bill','asddfr','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/6\", \"billNoForAgainstBill\": \"52354222\", \"billamountForAgainstBill\": \"3482.00\", \"tdsDeductionForAgainstBill\": \"0\", \"totalReceivableForAgainstBill\": \"3482.00\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','3482','admin',1,'test','2025-05-31 15:08:57','admin'),(23,'Mumbai/CR/25-26/7','2025-05-31','2025-04-30T00:00','SBI','existing','Allcargo Pvt Ltd','on-account','test','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"\", \"billNoForAgainstBill\": \"\", \"billamountForAgainstBill\": \"\", \"tdsDeductionForAgainstBill\": \"\", \"totalReceivableForAgainstBill\": \"\"}]','against-job',NULL,'[{\"jobNo\": \"A/Mumbai/E/24-25/6\", \"amount\": \"151\", \"typeOfJob\": \"Export\"}]','151','admin',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `credit` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=305 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the custom job number';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customjobnumber`
--

LOCK TABLES `customjobnumber` WRITE;
/*!40000 ALTER TABLE `customjobnumber` DISABLE KEYS */;
INSERT INTO `customjobnumber` VALUES (27,'Seawave Forwarding Logistics','seawave@2323','BranchName','Kolkata Bihar','Kolkata-2323','null'),(28,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Kolkata Bihar','Kolkata-2323','null'),(29,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata Bihar','Kolkata-2323','null'),(30,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Kolkata Bihar','Kolkata-2323','null'),(31,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Kolkata Bihar','Kolkata-2323','null'),(32,'Seawave Forwarding Logistics','seawave@2323','Custom','Kolkata Bihar','Kolkata-2323','KB'),(33,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Raxaul','Raxaul-2323','null'),(34,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Raxaul','Raxaul-2323','null'),(35,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Raxaul','Raxaul-2323','null'),(36,'Seawave Forwarding Logistics','seawave@2323','BranchName','Raxaul','Raxaul-2323','null'),(37,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Raxaul','Raxaul-2323','null'),(59,'Seawave Forwarding Logistics','seawave@2323','BranchName','Kolkata','Kolkata-2323','null'),(60,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Kolkata','Kolkata-2323','null'),(61,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Kolkata','Kolkata-2323','null'),(62,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Kolkata','Kolkata-2323','null'),(63,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata','Kolkata-2323','null'),(76,'seatech','seatech@23','Fiscal Year','Mumbai','Mumbai-23','null'),(77,'seatech','seatech@23','Air/Sea','Mumbai','Mumbai-23','null'),(78,'seatech','seatech@23','BranchName','Mumbai','Mumbai-23','null'),(79,'seatech','seatech@23','Import/Export','Mumbai','Mumbai-23','null'),(80,'seatech','seatech@23','jobnumber','Mumbai','Mumbai-23','null'),(212,'Seawave Forwarding Logistics','seawave@2323','Mode of Transport','testing','testing-2323','null'),(213,'Seawave Forwarding Logistics','seawave@2323','Import/Export','testing','testing-2323','null'),(214,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','testing','testing-2323','null'),(215,'Seawave Forwarding Logistics','seawave@2323','Branch Name','testing','testing-2323','null'),(216,'Seawave Forwarding Logistics','seawave@2323','Aryan','testing','testing-2323','null'),(217,'Seawave Forwarding Logistics','seawave@2323','Job No.','testing','testing-2323','null'),(275,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Jogbani','Jogbani-2323','null'),(276,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Jogbani','Jogbani-2323','null'),(277,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Jogbani','Jogbani-2323','null'),(278,'Seawave Forwarding Logistics','seawave@2323','Branch Name','Jogbani','Jogbani-2323','null'),(279,'Seawave Forwarding Logistics','seawave@2323','Job No.','Jogbani','Jogbani-2323','null'),(280,'Seawave Forwarding Logistics','seawave@2323','Aryan','Jogbani','Jogbani-2323','null'),(287,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Delhi','Delhi-2323','null'),(288,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Delhi','Delhi-2323','null'),(289,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Delhi','Delhi-2323','null'),(290,'Seawave Forwarding Logistics','seawave@2323','Branch Name','Delhi','Delhi-2323','null'),(291,'Seawave Forwarding Logistics','seawave@2323','Job No.','Delhi','Delhi-2323','null'),(300,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Mumbai','Mumbai-2323','null'),(301,'Seawave Forwarding Logistics','seawave@2323','Branch Name','Mumbai','Mumbai-2323','null'),(302,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Mumbai','Mumbai-2323','null'),(303,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Mumbai','Mumbai-2323','null'),(304,'Seawave Forwarding Logistics','seawave@2323','Job No.','Mumbai','Mumbai-2323','null');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customrefnumber`
--

LOCK TABLES `customrefnumber` WRITE;
/*!40000 ALTER TABLE `customrefnumber` DISABLE KEYS */;
INSERT INTO `customrefnumber` VALUES (7,'Seawave Forwarding Logistics','seawave@2323','Ref No.','Jogbani','Jogbani-2323',NULL),(8,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Jogbani','Jogbani-2323',NULL),(9,'Seawave Forwarding Logistics','seawave@2323','Branch Name','Jogbani','Jogbani-2323',NULL),(33,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata','Kolkata-2323',NULL),(34,'Seawave Forwarding Logistics','seawave@2323','Ref No.','Kolkata','Kolkata-2323',NULL),(35,'Seawave Forwarding Logistics','seawave@2323','Branch Name','Kolkata','Kolkata-2323',NULL),(36,'Seawave Forwarding Logistics','seawave@2323','Branch Name','Mumbai','Mumbai-2323',NULL),(37,'Seawave Forwarding Logistics','seawave@2323','Credit/Debit','Mumbai','Mumbai-2323',NULL),(38,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Mumbai','Mumbai-2323',NULL),(39,'Seawave Forwarding Logistics','seawave@2323','Ref No.','Mumbai','Mumbai-2323',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store debit payment sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit`
--

LOCK TABLES `debit` WRITE;
/*!40000 ALTER TABLE `debit` DISABLE KEYS */;
INSERT INTO `debit` VALUES (1,'2024-12-20',NULL,'N/A','new car purchase','Allcargo Pvt Ltd','100','118.00','18.00','1.00','117.00','45643663','Export','A/Mumbai/E/24-25/6','adani','gdgdggg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(2,'2024-12-26',NULL,'ICICI','tye of ecoosdf','Prince','100000','100000.00','0.00','2000.00','98000.00','42565565','Import','A/Mumbai/I/24-25/2','Tray ltd pvt','jskjkj','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(4,'2024-12-06',NULL,'N/A','pen','Digga D','100','128.00','28.00','0.00','128.00','55325235525','Import','S/Mumbai/I/24-25/4','','jskjkj','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,1,'test','2025-05-31 15:12:55','admin'),(5,'2024-12-20',NULL,'ICICI','tye of ecoosdf','Prince','100','118.00','18.00','0.00','118.00','42565565','Import','A/Mumbai/I/24-25/3','Tray ltd pvt','asdaddasd','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(6,'2024-12-27',NULL,'N/A','new laptop','Digga D','1000','1000.00','0.00','0.00','1000.00','345345354','Export','A/Mumbai/E/24-25/2','Allcargo Pvt Ltd','ggssdf','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(7,'2024-12-18',NULL,'N/A','tye of ecoosdf','Allcargo Pvt Ltd','1000','1000.00','0.00','0.00','1000.00','34535453','Import','A/Mumbai/I/24-25/1','vedant  ltd pvt','gdg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(8,'2024-12-27',NULL,'Canara','tye of ecoosdf','Gondya','10000','10000.00','0.00','0.00','10000.00','979686','Import','A/Mumbai/I/24-25/13','adani pvt ltd','dfhhd','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(9,'2025-01-08',NULL,'Canara','new computer','Gondya','1000','1050.00','50.00','100.00','950.00','46546566','Import','A/Mumbai/I/24-25/15','Allcargo Pvt Ltd','gyuh','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(10,'2025-05-17',NULL,'ICICI','tye of ecoosdf','Gondya','100','112.00','12.00','5.00','107.00','uihuyh','Import','A/Mumbai/I/24-25/2','Tray ltd pvt','sfskdgfsju','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(11,'2025-05-17',NULL,'SBI','pen','Gondya','100','105.00','5.00','5.00','100.00','54454546','Import','A/Mumbai/I/24-25/2','Tray ltd pvt','000','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL),(14,'2025-05-28','Mumbai/DR/25-26/8','ICICI','new car purchase','Gondya','1000','1050.00','50.00','50.00','1000.00','qqaswe','Import','A/Mumbai/I/24-25/3','Tray ltd pvt','wasfre','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,0,NULL,NULL,NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delegations`
--

LOCK TABLES `delegations` WRITE;
/*!40000 ALTER TABLE `delegations` DISABLE KEYS */;
INSERT INTO `delegations` VALUES (NULL,'jane_smith','Mumbai','Mumbai-2323','2025-06-05 00:00:00',NULL,1,'asass','seawave@2323','Seawave Forwarding Logistics','asas'),('admin','john_doe','Mumbai','Mumbai-2323','2025-06-05 00:00:00',NULL,2,'sddd','seawave@2323','Seawave Forwarding Logistics','asass'),('admin','jane_smith','Mumbai','Mumbai-2323','2025-06-05 00:00:00',NULL,3,'asas','seawave@2323','Seawave Forwarding Logistics','asas'),('admin','john_doe','Mumbai','Mumbai-2323','2025-06-06 00:00:00','2',4,'asasas','seawave@2323','Seawave Forwarding Logistics','asasas');
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
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docsupload`
--

LOCK TABLES `docsupload` WRITE;
/*!40000 ALTER TABLE `docsupload` DISABLE KEYS */;
INSERT INTO `docsupload` VALUES (1,'A-Mumbai-I-24-25-1','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','c1.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-1\\c1.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(2,'A-Mumbai-I-24-25-1','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','f1.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-1\\f1.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(3,'A-Mumbai-I-24-25-1','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','b1.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-1\\b1.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(6,'A-Mumbai-I-24-25-15','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','cf1.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-15\\cf1.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(7,'A-Mumbai-I-24-25-15','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','af1.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-15\\af1.pdf','admin','2025-02-06 11:00:39','0',NULL,'asasasa','2025-01-30 17:14:12'),(8,'A-Mumbai-I-24-25-15','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','credit2.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-15\\credit2.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(10,'A-Mumbai-I-24-25-15','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','BE Error Code list.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-15\\BE Error Code list.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(11,'A-Mumbai-I-24-25-15','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','f2.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-15\\f2.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(12,'A-Mumbai-I-24-25-15','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','b2.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-15\\b2.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(13,'A-Mumbai-E-24-25-6','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'export','exp1.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\export\\A-Mumbai-E-24-25-6\\exp1.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(14,'A-Mumbai-E-24-25-6','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'export','exp2.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\export\\A-Mumbai-E-24-25-6\\exp2.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(16,'A-Mumbai-I-24-25-15','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','e1.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-15\\e1.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(17,'A-Mumbai-I-24-25-20','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','as2222.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-20\\as2222.pdf','admin','2025-02-06 11:00:39','0',NULL,'sasass','2025-02-04 17:43:29'),(18,'A-Mumbai-I-24-25-20','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','eded.pdf','D:\\NEW_CONNECT_LOGI-1\\backend\\uploads\\import\\A-Mumbai-I-24-25-20\\eded.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(19,'A-Mumbai-I-24-25-20','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','sasas.pdf','uploads\\import\\A-Mumbai-I-24-25-20\\sasas.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(20,'A-Mumbai-I-24-25-2','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','test1.pdf','uploads\\import\\A-Mumbai-I-24-25-2\\test1.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(21,'A-Mumbai-I-24-25-3','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','A-Mumbai-I-24-25-3-bill.pdf','uploads\\import\\A-Mumbai-I-24-25-3\\A-Mumbai-I-24-25-3-bill.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(22,'A-Mumbai-I-24-25-3','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','test(A-Mumbai-I-24-25-3).pdf','uploads\\import\\A-Mumbai-I-24-25-3\\test(A-Mumbai-I-24-25-3).pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(23,'A-Mumbai-I-24-25-3','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','test_A-Mumbai-I-24-25-3.pdf','uploads\\import\\A-Mumbai-I-24-25-3\\test_A-Mumbai-I-24-25-3.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(24,'A-Mumbai-I-24-25-3','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','test4_A-Mumbai-I-24-25-3.pdf','uploads\\import\\A-Mumbai-I-24-25-3\\test4_A-Mumbai-I-24-25-3.pdf','admin','2025-02-06 11:00:39','0',NULL,NULL,NULL),(25,'A-Mumbai-I-24-25-3','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','test3_A-Mumbai-I-24-25-3.pdf','uploads\\import\\A-Mumbai-I-24-25-3\\test3_A-Mumbai-I-24-25-3.pdf',NULL,NULL,'0',NULL,NULL,NULL),(26,'S-Mumbai-I-24-25-4','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','test2_S-Mumbai-I-24-25-4.pdf','uploads\\import\\S-Mumbai-I-24-25-4\\test2_S-Mumbai-I-24-25-4.pdf',NULL,NULL,'0',NULL,NULL,NULL),(27,'S-Mumbai-I-24-25-4','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','test3_S-Mumbai-I-24-25-4.pdf','uploads\\import\\S-Mumbai-I-24-25-4\\test3_S-Mumbai-I-24-25-4.pdf',NULL,NULL,'0',NULL,NULL,NULL),(32,'A-Mumbai-I-24-25-12','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','t1_A-Mumbai-I-24-25-12.pdf','import\\A-Mumbai-I-24-25-12\\t1_A-Mumbai-I-24-25-12.pdf','admin','2025-02-10 05:32:55','0',NULL,NULL,NULL),(33,'A-Mumbai-I-24-25-12','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','t3_A-Mumbai-I-24-25-12.pdf','import\\A-Mumbai-I-24-25-12\\t3_A-Mumbai-I-24-25-12.pdf','admin','2025-02-10 05:33:16','0',NULL,NULL,NULL),(34,'S-Mumbai-I-24-25-22','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','a1qkll_S-Mumbai-I-24-25-22.pdf','import\\S-Mumbai-I-24-25-22\\a1qkll_S-Mumbai-I-24-25-22.pdf','admin','2025-02-13 08:54:05','0',NULL,NULL,NULL),(35,'S-Mumbai-E-24-25-8','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'export','aryan112_S-Mumbai-E-24-25-8.pdf','export\\S-Mumbai-E-24-25-8\\aryan112_S-Mumbai-E-24-25-8.pdf','admin','2025-02-13 08:58:10','0',NULL,NULL,NULL),(37,'A-Mumbai-I-24-25-19','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','a1111_A-Mumbai-I-24-25-19.pdf','import\\A-Mumbai-I-24-25-19\\a1111_A-Mumbai-I-24-25-19.pdf','admin','2025-02-13 09:49:36','0',NULL,NULL,NULL),(38,'A-Mumbai-I-24-25-19','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','a1111111212_A-Mumbai-I-24-25-19.pdf','import\\A-Mumbai-I-24-25-19\\a1111111212_A-Mumbai-I-24-25-19.pdf','admin','2025-02-13 10:48:42','0',NULL,NULL,NULL),(39,'A-Mumbai-I-24-25-19','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','q11_A-Mumbai-I-24-25-19.pdf','import\\A-Mumbai-I-24-25-19\\q11_A-Mumbai-I-24-25-19.pdf','admin','2025-02-13 10:49:13','0',NULL,NULL,NULL),(40,'A-Mumbai-E-24-25-5','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'export','exp1_A-Mumbai-E-24-25-5.pdf','export\\A-Mumbai-E-24-25-5\\exp1_A-Mumbai-E-24-25-5.pdf','admin','2025-02-19 07:14:12','0',NULL,NULL,NULL),(50,'A-Mumbai-I-24-25-27','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','d1_A-Mumbai-I-24-25-27.pdf','import\\A-Mumbai-I-24-25-27\\d1_A-Mumbai-I-24-25-27.pdf','admin','2025-03-03 06:15:56','0',NULL,NULL,NULL),(51,'A-Mumbai-I-24-25-27','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','d2_A-Mumbai-I-24-25-27.pdf','import\\A-Mumbai-I-24-25-27\\d2_A-Mumbai-I-24-25-27.pdf','admin','2025-03-03 06:15:56','0',NULL,NULL,NULL),(54,'A-Mumbai-I-24-25-27','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','d3_A-Mumbai-I-24-25-27.pdf','import\\A-Mumbai-I-24-25-27\\d3_A-Mumbai-I-24-25-27.pdf','admin','2025-03-03 06:20:36','0',NULL,NULL,NULL),(55,'A-Mumbai-I-24-25-27','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','d4_A-Mumbai-I-24-25-27.pdf','import\\A-Mumbai-I-24-25-27\\d4_A-Mumbai-I-24-25-27.pdf','admin','2025-03-03 06:20:36','0',NULL,NULL,NULL),(56,'A-Mumbai-I-24-25-27','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','d5_A-Mumbai-I-24-25-27.pdf','import\\A-Mumbai-I-24-25-27\\d5_A-Mumbai-I-24-25-27.pdf','admin','2025-03-04 07:58:15','0',NULL,NULL,NULL),(57,'A-Mumbai-I-24-25-27','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'import','d6_A-Mumbai-I-24-25-27.pdf','import\\A-Mumbai-I-24-25-27\\d6_A-Mumbai-I-24-25-27.pdf','admin','2025-03-04 08:00:47','0',NULL,NULL,NULL),(62,'A-Mumbai-I-24-25-26','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','Testing23','import','d1_A-Mumbai-I-24-25-26.pdf','import\\A-Mumbai-I-24-25-26\\d1_A-Mumbai-I-24-25-26.pdf','admin','2025-03-04 11:02:28','0',NULL,NULL,NULL),(64,'A-Mumbai-I-24-25-26','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','Testing23','import','d2_A-Mumbai-I-24-25-26.pdf','import\\A-Mumbai-I-24-25-26\\d2_A-Mumbai-I-24-25-26.pdf','admin','2025-03-04 11:02:53','0',NULL,NULL,NULL),(72,'A-Mumbai-I-24-25-27','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','sanjeet pvt ltd','import','d7_A-Mumbai-I-24-25-27.pdf','import\\A-Mumbai-I-24-25-27\\d7_A-Mumbai-I-24-25-27.pdf','admin','2025-03-04 11:21:43','0',NULL,NULL,NULL),(73,'S-Mumbai-I-24-25-30','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','adani pvt ltd','import','Fill-Theft report_S-Mumbai-I-24-25-30.pdf','import\\S-Mumbai-I-24-25-30\\Fill-Theft report_S-Mumbai-I-24-25-30.pdf','admin','2025-04-01 07:45:41','0',NULL,NULL,NULL),(74,'S-Mumbai-E-24-25-19','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'export','asasasasa_S-Mumbai-E-24-25-19.pdf','export\\S-Mumbai-E-24-25-19\\asasasasa_S-Mumbai-E-24-25-19.pdf','admin','2025-04-01 09:53:57','0',NULL,NULL,NULL),(84,'S-Mumbai-E-24-25-19','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'export','asasasasqw_S-Mumbai-E-24-25-19.pdf','export\\S-Mumbai-E-24-25-19\\asasasasqw_S-Mumbai-E-24-25-19.pdf','admin','2025-04-01 09:54:15','0',NULL,NULL,NULL),(99,'S-Mumbai-E-24-25-19','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',NULL,'export','Fill-Theft report_S-Mumbai-E-24-25-19.pdf','export\\S-Mumbai-E-24-25-19\\Fill-Theft report_S-Mumbai-E-24-25-19.pdf','admin','2025-04-01 09:55:05','0',NULL,NULL,NULL),(180,'S-Mumbai-I-24-25-30','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','adani pvt ltd','import','seawave 748 bill 20241211_3081 (1)_S-Mumbai-I-24-25-30.pdf','import\\S-Mumbai-I-24-25-30\\seawave 748 bill 20241211_3081 (1)_S-Mumbai-I-24-25-30.pdf','admin','2025-05-16 12:46:49','0',NULL,NULL,NULL),(181,'S-Mumbai-I-24-25-30','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','adani pvt ltd','import','s_S-Mumbai-I-24-25-30.pdf','import\\S-Mumbai-I-24-25-30\\s_S-Mumbai-I-24-25-30.pdf','admin','2025-05-16 12:46:49','0',NULL,NULL,NULL),(182,'S-Mumbai-I-24-25-30','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','adani pvt ltd','import','d_S-Mumbai-I-24-25-30.pdf','import\\S-Mumbai-I-24-25-30\\d_S-Mumbai-I-24-25-30.pdf','admin','2025-05-16 12:46:49','0',NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editlogs`
--

LOCK TABLES `editlogs` WRITE;
/*!40000 ALTER TABLE `editlogs` DISABLE KEYS */;
INSERT INTO `editlogs` VALUES (1,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-02-22 00:00:00','Export',NULL,'solanki','admin','New Export Job A/Mumbai/E/24-25/15 created'),(2,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-02-22 00:00:00','Import',NULL,'sanjeet pvt ltd','admin','New Import Job A/Mumbai/I/24-25/27 created'),(3,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-02-28 16:17:04','Export',NULL,'Allcargo Pvt Ltd','admin','New Export Job A/Mumbai/E/24-25/16 created'),(4,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-01 15:24:14','Organization',NULL,'Retromood','admin','New Organization RetroMood created'),(5,'Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','2025-03-01 16:38:36','A/Mumbai/I/24-25/27','Collection','sanjeet pvt ltd','admin','New Collection BILL-64 created'),(6,'Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','2025-03-01 16:40:18','A/Mumbai/I/24-25/27','Collection','sanjeet pvt ltd','hemang@executive','New Collection BILL-65 created'),(7,'Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','2025-03-03 10:40:57','A/Mumbai/I/24-25/27','Collection','sanjeet pvt ltd','admin','New Collection BILL-66 created'),(9,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 11:45:56','A/Mumbai/I/24-25/27','Document Upload','sanjeet pvt ltd','admin','New Document d1_A-Mumbai-I-24-25-27.pdf uploaded'),(10,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 11:45:56','A/Mumbai/I/24-25/27','Document Upload','sanjeet pvt ltd','admin','New Document d2_A-Mumbai-I-24-25-27.pdf uploaded'),(12,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 11:50:36','A/Mumbai/I/24-25/27','Document Upload','sanjeet pvt ltd','admin','New Document d3_A-Mumbai-I-24-25-27.pdf uploaded'),(13,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 11:50:36','A/Mumbai/I/24-25/27','Document Upload','sanjeet pvt ltd','admin','New Document d4_A-Mumbai-I-24-25-27.pdf uploaded'),(23,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:08:51','General',NULL,'Allcargo Pvt Ltd','admin','Organization Type changed from [\"Transport\",\"Export\"] to [\"Export\",\"Import\"]'),(24,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:16:26','General',NULL,'Allcargo Pvt Ltd','admin','Address changed from dfgd to dfgdsas'),(25,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:16:26','General',NULL,'Allcargo Pvt Ltd','admin','Entity Type changed from [\"Agent\",\"Carrier\"] to [\"Shippers\",\"Consignee\"]'),(26,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:16:26','General',NULL,'Allcargo Pvt Ltd','admin','Organization Type changed from [\"Import\",\"Transport\"] to [\"Export\",\"Freight\"]'),(27,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:25:51','Registration',NULL,'Allcargo Pvt Ltd','admin','PAN changed from RATPS87951 to RATPS8795S'),(28,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:26:22','General',NULL,'Allcargo Pvt Ltd','admin','Address changed from dfgdsas to dfgd'),(29,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:26:22','General',NULL,'Allcargo Pvt Ltd','admin','Organization Type changed from [\"Export\",\"Freight\"] to [\"Import\",\"Transport\"]'),(30,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:26:48','Accounts',NULL,'Allcargo Pvt Ltd','admin','Credit Days changed from 90 to 120'),(31,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:26:55','Registration',NULL,'Allcargo Pvt Ltd','admin','GST changed from 27GDMPM3914G1Z4 to 27GDMPM3914G1A3'),(32,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:27:10','General',NULL,'Allcargo Pvt Ltd','admin','Organization Type changed from [\"Import\",\"Transport\"] to [\"Shippers\",\"Consignee\"]'),(33,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-03 13:27:10','Contact Details',NULL,'Allcargo Pvt Ltd','admin','Contact Details changed from [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"hio\",\"contactName\":\"gio\",\"designation\":\"gio\"}] to [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"management\",\"contactName\":\"gio\",\"designation\":\"gio\"}]'),(34,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 12:21:10','General',NULL,'Allcargo Pvt Ltd','admin','Organization Type changed from [\"Import\",\"Transport\",\"Freight\"] to [\"Import\",\"Freight\",\"Export\"]'),(35,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 13:28:15','A/Mumbai/I/24-25/27','Document Upload','sanjeet pvt ltd','admin','New Document d5_A-Mumbai-I-24-25-27.pdf uploaded'),(36,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 13:30:47','A/Mumbai/I/24-25/27','Document Upload','sanjeet pvt ltd','admin','New Document d6_A-Mumbai-I-24-25-27.pdf uploaded'),(37,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 16:21:44','A/Mumbai/I/24-25/26','Document Upload','Testing23','admin','New Document Testing23 uploaded'),(38,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 16:25:36','A/Mumbai/I/24-25/26','Document Upload','Testing23','admin','New Document d1_A-Mumbai-I-24-25-26.pdf uploaded'),(39,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 16:27:52','A/Mumbai/I/24-25/26','Document Upload','Testing23','admin','New Document d1_A-Mumbai-I-24-25-26.pdf uploaded'),(40,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 16:28:03','A/Mumbai/I/24-25/26','Document Upload','Testing23','admin','New Document d1_A-Mumbai-I-24-25-26.pdf uploaded'),(41,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 16:32:28','A/Mumbai/I/24-25/26','Document Upload','Testing23','admin','New Document d1_A-Mumbai-I-24-25-26.pdf uploaded'),(42,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 16:32:53','A/Mumbai/I/24-25/26','Document Upload','Testing23','admin','New Document d2_A-Mumbai-I-24-25-26.pdf uploaded'),(43,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 16:51:43','A/Mumbai/I/24-25/27','Document Upload','sanjeet pvt ltd','admin','New Document d7_A-Mumbai-I-24-25-27.pdf uploaded'),(44,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 17:11:28','Organization',NULL,'BlueDockers','admin','New Organization BlueDockers created'),(45,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-04 17:42:02','General',NULL,'BlueDockers','admin','Organization Type changed from [\"Freight\",\"Import\",\"Export\"] to [\"Freight\",\"Import\",\"Export\",\"Transport\"]'),(46,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 11:25:41','Import',NULL,'Allcargo Pvt Ltd','admin','New Import Job A/Mumbai/I/24-25/28 created'),(47,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 11:53:37','General',NULL,'sanjeet pvt ltd','admin','Organization Type changed from [\"Import\"] to [\"Import\",\"Freight\"]'),(48,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 12:13:27','General',NULL,'Fleeters','admin','Organization Type changed from [\"Transport\"] to [\"Transport\",\"Export\"]'),(49,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:37:07','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Importer Name changed from undefined to sanjeet pvt ltd'),(50,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:37:07','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Branch Name changed from Andheri to mumbai'),(51,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:37:07','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Address changed from dfgd to asas'),(66,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:44:29','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Importer Name changed from undefined to sanjeet pvt ltd'),(67,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:44:29','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','GST changed from undefined to 27AAICS7836D1Z9'),(68,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:44:29','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','IEC changed from undefined to AAICS7836D'),(69,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:44:29','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Port of Shipment changed from undefined to NHAVA SHEVA'),(70,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:44:29','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from undefined to JOGBANI LCS'),(71,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:51:08','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from JOGBANI LCS to sdasd'),(72,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:51:08','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from sdasd to JOGBANI LCS'),(73,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:51:54','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from JOGBANI LCS to sasas'),(74,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:52:36','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from sasas to JOGBANI LCS'),(75,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 15:55:11','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from JOGBANI LCS to sasas'),(76,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 16:05:02','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from sasas to JOGBANI LCS'),(77,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 16:05:50','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from JOGBANI LCS to sasas'),(78,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-05 16:06:53','A/Mumbai/I/24-25/27','general','sanjeet pvt ltd','admin','Final Destination changed from sasas to JOGBANI LCS'),(80,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-10 16:53:09','Import',NULL,'sanjeet pvt ltd','admin','New Import Job A/Mumbai/I/24-25/29 created'),(81,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-13 18:22:54','Export',NULL,'sanjeet pvt ltd','admin','New Export Job S/Mumbai/E/24-25/18 created'),(82,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-13 18:25:09','Export',NULL,'aryan','admin','New Export Job S/Mumbai/E/24-25/19 created'),(83,'Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','2025-03-20 12:39:57','A/Mumbai/I/24-25/24',NULL,'Testing23','admin','New Collection BILL-69 created'),(84,'Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','2025-03-20 12:40:14','A/Mumbai/I/24-25/24',NULL,'Testing23','admin','New Collection BILL-70 created'),(85,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-21 17:00:13','A/Mumbai/I/24-25/23','general','vedant  ltd pvt','admin','Importer Name changed from aryan pvt ltd to vedant  ltd pvt'),(86,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-21 17:00:13','A/Mumbai/I/24-25/23','general','vedant  ltd pvt','admin','Address changed from aaa to '),(87,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-21 17:00:13','A/Mumbai/I/24-25/23','general','vedant  ltd pvt','admin','GST changed from 27AAICS7836D1Z9 to '),(88,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-21 17:00:13','A/Mumbai/I/24-25/23','general','vedant  ltd pvt','admin','IEC changed from AAICS7836D to '),(89,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-21 17:08:39','A/Mumbai/I/24-25/23','general','dummy45','admin','Importer Name changed from vedant  ltd pvt to dummy45'),(90,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-21 17:08:49','A/Mumbai/I/24-25/23','general','muggles','admin','Importer Name changed from dummy45 to muggles'),(91,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-03-27 13:33:00','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-71 created'),(92,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 15:09:11','Contact Details',NULL,'Allcargo Pvt Ltd','admin','Organization Type changed from [\"Import\",\"Freight\",\"Export\"] to [\"Shippers\",\"Consignee\"]'),(93,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 15:09:11','Contact Details',NULL,'Allcargo Pvt Ltd','admin','Contact Details changed from [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"management\",\"contactName\":\"gio\",\"designation\":\"gio\"}] to [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"management\",\"contactName\":\"gio\",\"designation\":\"jio\"}]'),(94,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 15:09:31','Contact Details',NULL,'Allcargo Pvt Ltd','admin','Contact Details changed from [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"management\",\"contactName\":\"gio\",\"designation\":\"jio\"}] to [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"management\",\"contactName\":\"gio\",\"designation\":\"jio\"},{\"contactName\":\"IT Seawave\",\"designation\":\"executive\",\"department\":\"head\",\"mobile\":\"8655997298\",\"email\":\"shreyashpingle752@gmail.com\"}]'),(95,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 15:16:17','Contact Details',NULL,'Allcargo Pvt Ltd','admin','Contact Details changed from [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"management\",\"contactName\":\"gio\",\"designation\":\"jio\"},{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"8655997298\",\"department\":\"head\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"}] to [{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"8655997298\",\"department\":\"head\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"}]'),(96,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 16:59:40','General',NULL,'muggles','admin','Entity Type changed from [] to [\"Shippers\"]'),(97,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 16:59:40','General',NULL,'muggles','admin','Organization Type changed from [] to [\"Import\",\"Transport\"]'),(98,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 17:40:11','Contact Details',NULL,'muggles','admin','Organization Type changed from [\"Import\",\"Export\",\"Transport\"] to [\"Shippers\",\"Carrier\",\"Consignee\",\"Agent\"]'),(99,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-28 17:40:11','Contact Details',NULL,'muggles','admin','Contact Details changed from [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"hio\",\"contactName\":\"gio\",\"designation\":\"gio\"}] to [{\"email\":\"jai@323gmail.in\",\"mobile\":\"02004263507\",\"department\":\"hio\",\"contactName\":\"gio\",\"designation\":\"lol\"}]'),(100,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-29 10:33:31','Contact Details',NULL,'Allcargo Pvt Ltd','admin','Contact Details changed from [{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"8655997298\",\"department\":\"head\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"}] to [{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"8655997298\",\"department\":\"head\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"},{\"contactName\":\"IT Seawave\",\"designation\":\"executive\",\"department\":\"management\",\"mobile\":\"02004263507\",\"email\":\"shreyashpingle752@gmail.com\"}]'),(101,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-29 12:41:54','Contact Details',NULL,'Allcargo Pvt Ltd','admin','Contact Details changed from [{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"8655997298\",\"department\":\"head\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"},{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"02004263507\",\"department\":\"management\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"}] to [{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"8655997298\",\"department\":\"head\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"},{\"email\":\"shreyashpingle752@gmail.com\",\"mobile\":\"02004263507\",\"department\":\"Hr\",\"contactName\":\"IT Seawave\",\"designation\":\"executive\"}]'),(102,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-03-31 14:30:55','Import',NULL,'adani pvt ltd','admin','New Import Job S/Mumbai/I/24-25/30 created'),(103,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-04-01 13:15:41','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document Fill-Theft report_S-Mumbai-I-24-25-30.pdf uploaded'),(104,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-04-01 15:24:38','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document asasas_S-Mumbai-I-24-25-30.pdf uploaded'),(105,'Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','2025-04-09 17:32:36','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Collection BILL-72 created'),(106,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-04-10 13:08:43','Import',NULL,'adani pvt ltd','admin','New Import Job A/Mumbai/I/25-26/1 created'),(107,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 10:44:33','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-73 created'),(108,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 11:27:54','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-74 created'),(109,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 11:28:07','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-75 created'),(110,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 11:59:35','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-76 created'),(111,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 12:28:37','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-77 created'),(112,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 12:58:25','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-78 created'),(113,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 12:58:45','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-79 created'),(114,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 13:00:00','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-80 created'),(115,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 14:28:17','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-81 created'),(116,'Seawave Forwarding Logistics','seawave@2323','vapi','Mumbai-2323','2025-04-11 15:11:59','S/Mumbai/I/24-25/22',NULL,'vedant  ltd pvt','admin','New Collection BILL-82 created'),(117,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 11:52:23','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Quotation Added'),(124,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 12:35:56','S/Mumbai/I/24-25/22','Quotation','vedant  ltd pvt','admin','New Quotation Added'),(125,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 12:55:52','S/Mumbai/I/24-25/30','Quotation','adani pvt ltd','admin','New Quotation Added'),(126,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 13:01:26','S/Mumbai/I/24-25/30','Quotation','adani pvt ltd','admin','Quotation Edited'),(127,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 15:43:24','S/Mumbai/I/24-25/30','Quotation','adani pvt ltd','admin','Quotation Edited'),(128,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 15:44:48','S/Mumbai/I/24-25/30','Quotation','adani pvt ltd','admin','Quotation Edited'),(129,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 16:42:44','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document as_S-Mumbai-I-24-25-30.pdf uploaded'),(130,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 16:43:38','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document sss_S-Mumbai-I-24-25-30.pdf uploaded'),(131,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 16:44:04','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document asasas_S-Mumbai-I-24-25-30.pdf uploaded'),(132,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 16:44:14','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document asas_S-Mumbai-I-24-25-30.pdf uploaded'),(133,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 16:46:45','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document 121_S-Mumbai-I-24-25-30.pdf uploaded'),(134,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 16:46:45','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document 222_S-Mumbai-I-24-25-30.pdf uploaded'),(135,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:02:58','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document etst_S-Mumbai-I-24-25-30.pdf uploaded'),(136,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:02:58','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document test_S-Mumbai-I-24-25-30.pdf uploaded'),(137,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:05:11','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document seawave 748 bill 20241211_3081 (1)_S-Mumbai-I-24-25-30.pdf uploaded'),(138,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:09:38','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document test1_S-Mumbai-I-24-25-30.pdf uploaded'),(139,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:09:38','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document test2_S-Mumbai-I-24-25-30.pdf uploaded'),(140,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:40:50','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document as_S-Mumbai-I-24-25-30.pdf uploaded'),(141,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:40:50','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document asas_S-Mumbai-I-24-25-30.pdf uploaded'),(142,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:41:02','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document asasas_S-Mumbai-I-24-25-30.pdf uploaded'),(143,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:42:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document a_S-Mumbai-I-24-25-30.pdf uploaded'),(144,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:42:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document s_S-Mumbai-I-24-25-30.pdf uploaded'),(145,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:42:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document d_S-Mumbai-I-24-25-30.pdf uploaded'),(146,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:42:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document f_S-Mumbai-I-24-25-30.pdf uploaded'),(147,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 17:42:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document g_S-Mumbai-I-24-25-30.pdf uploaded'),(148,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 18:16:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document seawave 748 bill 20241211_3081 (1)_S-Mumbai-I-24-25-30.pdf uploaded'),(149,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 18:16:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document s_S-Mumbai-I-24-25-30.pdf uploaded'),(150,'Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2025-05-16 18:16:49','S/Mumbai/I/24-25/30',NULL,'adani pvt ltd','admin','New Document d_S-Mumbai-I-24-25-30.pdf uploaded');
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
  PRIMARY KEY (`id`),
  KEY `employees_ibfk_1` (`orgcode`,`orgname`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`orgcode`, `orgname`) REFERENCES `users` (`orgcode`, `orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('hemang@executive','12345','seawave@2323','Seawave Forwarding Logistics',1,'Hemang Ranjan','executive'),('rishi@manager','345345','seawave@2323','Seawave Forwarding Logistics',2,'Rishi Mishra','manager'),('aayush@manager','12345','seawave@2323','Seawave Forwarding Logistics',3,'Aayush Mishra','manager'),('ved@manager','12345','seatech@23','seatech',11,'vedant','manager'),('sanjeet@Developer','12345','seawave@2323','Seawave Forwarding Logistics',12,'sanjeet','Developer'),('Aryan@Developer','12345','seawave@2323','Seawave Forwarding Logistics',32,'Aryan Rajesh Shinde','Developer');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='New Enquiry Are store in this Table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry`
--

LOCK TABLES `enquiry` WRITE;
/*!40000 ALTER TABLE `enquiry` DISABLE KEYS */;
INSERT INTO `enquiry` VALUES (26,'527390606904','new','tesla','jokerrr','12134234234','tesla@232','[\"Import Clearance\", \"Freight Booking\", \"Transportation\", \"Export Clearance\", \"Exim Consultancy\"]','dadadad  sddfass','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-14 00:00:00'),(27,'552481068253','new','Seawave Forwarding and Logistics Pvt Ltd','fsdfdfs','fsff','seawave@it','[\"Import Clearance\", \"Exim Consultancy\"]','fsdf fsf sdfsf ','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-14 00:00:00'),(28,'780403923898','existing','Highland Residency','asdads','35535355','sfsfsfs@','[\"Export Clearance\", \"Transportation\"]','fsdfdf fsfs','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-14 00:00:00'),(29,'IEE/24-25/Mumbai/326','new','jokerrr','dkajd ','2342342344','osodasjd@23','[\"Import Clearance\", \"Export Clearance\", \"Exim Consultancy\"]','dfgdgdf','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-21 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='Additional details for each enquiry type';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_details`
--

LOCK TABLES `enquiry_details` WRITE;
/*!40000 ALTER TABLE `enquiry_details` DISABLE KEYS */;
INSERT INTO `enquiry_details` VALUES (6,26,'45kg','jijfgh','sdsdasda','sdad','20\'','Destuff','importClearance'),(7,26,'32kg','sdfs','dfsdf','fsdfsf','20\'','Loaded','freightBooking'),(8,26,'23kg','dasdad','aryan','sdasdad','Break Bulk','Loaded','transportation'),(9,27,'34kg','jijfgh','sdsdasda','sdad','40\'','Loaded','importClearance'),(10,27,'34kg','jijfgh','sdsdasda','fsfs','40\' ISO Tank','Loaded','eximConsultancy'),(11,28,'45kg','dssdsf','fsffsf','fsfsf','20\' ISO Tank','Cargo With Container','exportClearance'),(12,28,'45kg','dfsfsdfsf','dsfasfs','sdfsf','LCL','Destuff','transportation'),(13,29,'45','dfs','sdfsdfffsd','fsdfs','20\'','Loaded','importClearance'),(14,29,'46','fgffsd','sdfsfdsf','sdfsfd','Flat Bulk','Factory Stuff','exportClearance'),(15,29,'23','fgedgef','fgggdg','bdbdfg','40\'','Loaded','eximConsultancy'),(16,26,'45','assa','vashi','zxzxz','20\', 40\'','Dock Stuff','exportClearance'),(17,26,'','','','','','','eximConsultancy');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in export will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expjobcreation`
--

LOCK TABLES `expjobcreation` WRITE;
/*!40000 ALTER TABLE `expjobcreation` DISABLE KEYS */;
INSERT INTO `expjobcreation` VALUES ('A/Mumbai/E/24-25/1','2025-01-06 16:17:00','2025-01-05 16:16:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','Home','LCL','dummy45','shfjfhs','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',1,'5545',1,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[{\"type\": \"40\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"24242\"}, {\"type\": \"20\'\", \"weight\": \"43\", \"container\": 2, \"containerNo\": \"23423\"}]','Mumbai','Mumbai-2323',0,0,0,'40\', 20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/2','2025-01-06 16:19:00','2025-01-05 16:19:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','MBL/MAWB','123323','Seawave Forwarding Logistics','seawave@2323','admin',2,'5545',2,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','sdasd','mumbai','[{\"type\": \"40\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"12122\"}]','Mumbai','Mumbai-2323',0,0,0,'40\'','fetch Persons',NULL),('A/Mumbai/E/24-25/4','2025-01-06 16:27:00','2025-01-05 16:27:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','In-Bond','FCL','dummy45','shfjfhs','HBL/HAWB','34232','Seawave Forwarding Logistics','seawave@2323','admin',4,'5545',4,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','dfgdg','mumbai','[{\"type\": \"20\'\", \"weight\": \"23\", \"container\": 1, \"containerNo\": \"213123\"}, {\"type\": \"20\'\", \"weight\": \"21\", \"container\": 2, \"containerNo\": \"31231\"}]','Mumbai','Mumbai-2323',0,1,1,'20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/5','2025-01-06 16:34:00','2025-01-05 16:33:00','Air','Valvada ICD','No','Factory Stuff',1,'No','In-Bond','LCL','dummy45','shfjfhs','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',5,'5545',5,'','',NULL,NULL,'vedant  ltd pvt','vapi','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[{\"type\": \"20\'\", \"weight\": \"300\", \"container\": 1, \"containerNo\": \"34243\"}]','Mumbai','Mumbai-2323',0,1,1,'20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/6','2025-01-06 17:05:00','2025-01-07 17:05:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',6,'5545',6,'','',NULL,NULL,'Allcargo Pvt Ltd','Andheri','dsdafsfs fsfsdfsf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"44\", \"container\": 1, \"containerNo\": \"552342\"}]','Mumbai','Mumbai-2323',0,1,1,'20\', 40\'','fetch Persons',NULL),('S/Mumbai/E/24-25/8','2025-02-05 11:58:00','2025-02-07 11:57:00','Sea','Mumbai Sea','Yes','Factory Stuff',2,'Yes','In-Bond','LCL','dummy45','dumpy45','MBL/MAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',8,'5545',8,'korea','colaba',NULL,NULL,'Tray ltd pvt','hogwarts','dfgd','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"2343\", \"container\": 1, \"containerNo\": \"21343\"}, {\"type\": \"40\'\", \"weight\": \"2344\", \"container\": 2, \"containerNo\": \"45434\"}]','Mumbai','Mumbai-2323',0,0,0,'20\', 40\'','fetch Persons',NULL),('S/Mumbai/E/24-25/9','2025-02-05 12:00:00','2025-02-07 11:59:00','Sea','Raxaul LCS','Yes','Dock Stuff',2,'No','In-Bond','LCL','dummy45','dumpy45','MBL/MAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',9,'5545',9,'gfdcg','korea','2025-02-08 00:00:00','2025-02-06 00:00:00','Reliance Ltd','lokhandwale','jijamata nagar','58GST323726432','GDMPM3914G','null','null','[{\"type\": \"20\'\", \"weight\": \"3232\", \"container\": 1, \"containerNo\": \"454545\"}, {\"type\": \"20\'\", \"weight\": \"43434\", \"container\": 2, \"containerNo\": \"232323\"}]','Mumbai','Mumbai-2323',0,0,0,'20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/10','2025-02-18 11:35:00','2025-02-21 11:33:00','Air','Mumbai Sea','Yes','Dock Stuff',1,'Yes','','','dummy45','dumpy45','HBL/HAWB','dummy3','Seawave Forwarding Logistics','seawave@2323','admin',10,'55455',10,'','',NULL,NULL,'muggles','hogwarts','qwertyuhnfh,gf,','27GDMPM3914G1Z4','GDMPM3914G','dfgdg','dasd','[{\"type\": \"20\'\", \"weight\": \"323\", \"container\": 1, \"containerNo\": \"sas\"}]','Mumbai','Mumbai-2323',0,0,0,'20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/12','2025-02-22 13:20:00','2025-02-22 13:19:00','Air','Kolkata Sea','Yes','Dock Stuff',2,'Yes','Home','FCL','','shfjfhs','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',14,'5545',12,'colaba','korea','2025-02-23 00:00:00','2025-02-23 00:00:00','','Andheri','aaa','27AAICS7836D1Z9','AAICS7836D','dfsdf','dgfgdg','[{\"type\": \"20\'\", \"weight\": \"2121\", \"container\": 1, \"containerNo\": \"3131\"}, {\"type\": \"40\'\", \"weight\": \"23232\", \"container\": 2, \"containerNo\": \"1213\"}]','Mumbai','Mumbai-2323',0,0,0,'20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons',NULL),('S/Mumbai/E/24-25/13','2025-02-22 14:39:00','2025-02-23 14:38:00','Sea','Mumbai Sea','Yes','Dock Stuff',2,'No','Home','LCL','dummy45','dumpy45','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','admin',15,'5545',13,'','',NULL,NULL,'aryan','mumbai','aaa','27AAICS7836D1Z9','AAICS7836D','sfsfdfs','NHAVA SHEVA','[{\"type\": \"Flat Bulk\", \"weight\": \"124\", \"container\": 1, \"containerNo\": \"123\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"25424\", \"container\": 2, \"containerNo\": \"23344\"}]','Mumbai','Mumbai-2323',0,0,0,'20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons',NULL),('A/Mumbai/E/24-25/15','2025-02-22 15:06:00','2025-02-22 15:05:00','Air','Kolkata Sea','Yes','Dock Stuff',1,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','admin',20,'5545',15,'io','colaba','2025-03-02 00:00:00','2025-03-01 00:00:00','solanki ','Andheri','dasdasd adfsada adsfsgsda','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"40\'\", \"weight\": \"3212\", \"container\": 1, \"containerNo\": \"12314\"}]','Mumbai','Mumbai-2323',0,1,1,'20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons',NULL),('A/Mumbai/E/24-25/16','2025-02-28 13:13:00','2025-02-28 13:10:00','Air','Mumbai Sea','Yes','Factory Stuff',1,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',21,'5545',16,'korea','colaba','2025-02-28 00:00:00','2025-02-27 00:00:00','Allcargo Pvt Ltd','Andheri','dfgd','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"212\", \"container\": 1, \"containerNo\": \"32414\"}]','Mumbai','Mumbai-2323',0,1,1,'20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons',NULL),('S/Mumbai/E/24-25/18','2025-03-13 18:22:00','2025-03-13 18:21:00','Sea','Mumbai Sea','Yes','Dock Stuff',1,'Yes','','LCL','ffdffwe','shfjfhs','MBL/MAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','admin',22,'5545',18,'korea','gfhn','2025-03-13 00:00:00','2025-03-13 00:00:00','sanjeet pvt ltd','mumbai','asas','27AAICS7836D1Z9','AAICS7836D','sdasd','dgfgdg','[{\"type\": \"20\'\", \"weight\": \"212\", \"container\": 1, \"containerNo\": \"dasddw\"}]','Mumbai','Mumbai-2323',0,0,0,'20\'','fetch Persons',NULL),('S/Mumbai/E/24-25/19','2025-03-13 18:24:00','2025-03-13 18:23:00','Sea','Mumbai Sea','Yes','Dock Stuff',1,'Yes','','LCL','dummy45','shfjfhs','MBL/MAWB','dummy67','Seawave Forwarding Logistics','seawave@2323','admin',23,'55455',19,'korea','colaba','2025-03-12 00:00:00','2025-03-13 00:00:00','aryan','mumbai','aaa','27AAICS7836D1Z9','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"40\'\", \"weight\": \"321\", \"container\": 1, \"containerNo\": \"dfwd\"}]','Mumbai','Mumbai-2323',0,0,0,'40\'','fetch Persons',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store export notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expnotifications`
--

LOCK TABLES `expnotifications` WRITE;
/*!40000 ALTER TABLE `expnotifications` DISABLE KEYS */;
INSERT INTO `expnotifications` VALUES (1,'A/Mumbai/E/24-25/1','adani pvt ltd','2025-01-06 16:17:45','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(2,'A/Mumbai/E/24-25/2','adani pvt ltd','2025-01-06 16:19:34','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(3,'A/Mumbai/E/24-25/3','Allcargo Pvt Ltd','2025-01-06 16:23:06','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(4,'A/Mumbai/E/24-25/4','adani pvt ltd','2025-01-06 16:28:00','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(5,'A/Mumbai/E/24-25/5','vedant  ltd pvt','2025-01-06 16:34:04','ExpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(6,'A/Mumbai/E/24-25/6','Allcargo Pvt Ltd','2025-01-06 17:06:11','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(7,'S/Mumbai/E/24-25/7','Relience Ltd','2025-02-03 17:36:48','ExpJobButton','lokhandwale','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(8,'S/Mumbai/E/24-25/8','Tray ltd pvt','2025-02-05 11:58:17','ExpJobButton','hogwarts','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(9,'S/Mumbai/E/24-25/9','vedant  ltd pvt','2025-02-05 12:00:24','ExpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(10,'A/Mumbai/E/24-25/10','muggles','2025-02-18 11:35:05','ExpJobButton','hogwarts','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(11,'A/Mumbai/E/24-25/11','stark ltd ','2025-02-22 13:23:57','ExpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(12,'A/Mumbai/E/24-25/12','','2025-02-22 13:25:20','ExpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(13,'A/Mumbai/E/24-25/12','','2025-02-22 14:37:59','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(14,'S/Mumbai/E/24-25/13','aryan','2025-02-22 14:39:44','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(15,'A/Mumbai/E/24-25/14','Allcargo Pvt Ltd','2025-02-22 14:47:01','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(16,'A/Mumbai/E/24-25/15','Allcargo Pvt Ltd','2025-02-22 14:47:53','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(17,'A/Mumbai/E/24-25/15','sanjeet pvt ltd','2025-02-22 14:58:27','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(18,'A/Mumbai/E/24-25/14','sanjeet pvt ltd','2025-02-22 15:01:29','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(19,'A/Mumbai/E/24-25/15','solanki ','2025-02-22 15:06:48','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(20,'A/Mumbai/E/24-25/16','Allcargo Pvt Ltd','2025-02-28 13:13:28','ExpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-28 16:17:04\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(21,'S/Mumbai/E/24-25/17','sanjeet pvt ltd','2025-03-13 18:20:35','ExpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-03-13 18:20:50\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(22,'S/Mumbai/E/24-25/18','sanjeet pvt ltd','2025-03-13 18:22:46','ExpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-03-13 18:22:54\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(23,'S/Mumbai/E/24-25/19','aryan','2025-03-13 18:24:53','ExpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-03-13 18:25:09\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin');
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in import will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impjobcreation`
--

LOCK TABLES `impjobcreation` WRITE;
/*!40000 ALTER TABLE `impjobcreation` DISABLE KEYS */;
INSERT INTO `impjobcreation` VALUES (3,'A/Mumbai/I/24-25/2','2024-12-24 11:09:00','2024-12-23 11:07:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','SEZ-Z','LCL','afsgsgfg','fssfgsggs','20\'','fetch Persons','HBL/HAWB','353543','admin','dggg','Surrender','345444','Yearly',2,'jharkhand','Mumbai','2024-12-26 00:00:00','2024-12-25 00:00:00','Tray ltd pvt','hogwarts','dfgd','27GDMPM3914G1Z4','GDMPM3914G','sfsfdfs','dgfgdg','[{\"type\": \"20\'\", \"weight\": \"45kg\", \"container\": 1, \"containerNo\": \"454534\"}, {\"type\": \"20\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"53453\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',1,0,0,'2025-06-02 13:08:52'),(4,'A/Mumbai/I/24-25/3','2024-12-24 15:03:00','2024-12-24 15:03:00','Air','Kolkata Sea','Yes','Loaded',2,'No','Home','LCL','ffdffwe','shfjfhs','20\', 40\'','fetch Persons','HBL/HAWB','56464656','admin','4','Surrender','5545','Yearly',3,'','',NULL,NULL,'Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dgfgdg','[{\"type\": \"20\'\", \"weight\": \"43kg\", \"container\": 1, \"containerNo\": \"3244\"}, {\"type\": \"40\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"23442\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(5,'S/Mumbai/I/24-25/4','2024-12-24 15:49:00','2024-12-23 15:48:00','Sea','Mumbai Sea','No','Loaded',1,'No','Home','LCL','dummy45','gfdfgdg','20\'','fetch Persons','HBL/HAWB','5242353','admin','4','Original','424343','Yearly',4,'','',NULL,NULL,'vedant  ltd pvt','vapi','sgsgsgs','27AAICS7836D1Z3','AAICS7836D','ggdgsgs','dsfgdfhddh','[{\"type\": \"20\'\", \"weight\": \"5.5Ton\", \"container\": 1, \"containerNo\": \"354535354\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(7,'S/Mumbai/I/24-25/6','2024-12-24 16:11:00','2024-12-31 16:11:00','Sea','Raxaul LCS','Yes','Destuff',2,'Yes','In-Bond','Break Bulk','dummy45','dumpy45','40\', 20\' ISO Tank','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','234234','One-Time',6,'jharkhand','Mumbai','2024-12-31 00:00:00','2024-12-24 00:00:00','adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[{\"type\": \"40\'\", \"weight\": \"12\", \"container\": 1, \"containerNo\": \"32112341\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"24\", \"container\": 2, \"containerNo\": \"41341341\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(8,'A/Mumbai/I/24-25/7','2024-12-24 16:18:00','2024-12-25 16:18:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','20\', 40\'','fetch Persons','HBL/HAWB','53455','admin','4','Original','5545','Yearly',7,'jharkhand','Mumbai','2024-12-28 00:00:00','2024-12-26 00:00:00','Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"32344\"}, {\"type\": \"20\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"42343\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(9,'A/Mumbai/I/24-25/8','2024-12-24 16:24:00','2024-12-23 16:23:00','Air','Mumbai Sea','Yes','Destuff',2,'Yes','Home','LCL','affd','dffgs','20\', 40\'','fetch Persons','MBL/MAWB','23423542','admin','4','Surrender','331231','One-Time',8,'dsss','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','vedant  ltd pvt','Andheri','hddhf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"234234\"}, {\"type\": \"40\'\", \"weight\": \"354\", \"container\": 2, \"containerNo\": \"423423\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(13,'A/Mumbai/I/24-25/9','2024-12-24 17:07:00','2024-12-23 17:06:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','shfjfhs','20\', 40\'','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','55455','One-Time',9,'jharkhand','Mumbai','2024-12-24 00:00:00','2024-12-24 00:00:00','Tray ltd pvt','Bihar','werwe wfqwfa afsa faasfa f','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"433\", \"container\": 1, \"containerNo\": \"344242\"}, {\"type\": \"40\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"423442\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(14,'A/Mumbai/I/24-25/10','2024-12-24 17:08:00','2024-12-23 17:07:00','Air','Mumbai Sea','No','Destuff',2,'Yes','Home','FCL','dummy45','shfjfhs','20\', 20\' ISO Tank','fetch Persons','HBL/HAWB','53455','admin','2','Surrender','5545','Yearly',10,'jharkhand','nepal','2024-12-27 00:00:00','2024-12-24 00:00:00','adani pvt ltd','Bihar','sdgdgs','27AAICS7836D1Z3','AAICS7836D','sdfsf','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"445\", \"container\": 1, \"containerNo\": \"453453\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"44\", \"container\": 2, \"containerNo\": \"45345\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(15,'A/Mumbai/I/24-25/11','2024-12-24 17:10:00','2024-12-23 17:10:00','Air','Mumbai Sea','No','Destuff',2,'No','In-Bond','FCL','dummy45','34234','40\', 20\' ISO Tank','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','342342','Yearly',11,'','',NULL,NULL,'adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"40\'\", \"weight\": \"342\", \"container\": 1, \"containerNo\": \"424234\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"33\", \"container\": 2, \"containerNo\": \"3423\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(17,'A/Mumbai/I/24-25/12','2024-12-24 17:37:00','2024-12-25 17:36:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','20\', 40\'','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','5545','Yearly',12,'jharkhand','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','adani pvt ltd','haryana','fsdfafdf','27AAICS7836D1Z3','AAICS7836D','asdffa','dsfafa','[{\"type\": \"20\'\", \"weight\": \"56\", \"container\": 1, \"containerNo\": \"3534\"}, {\"type\": \"40\'\", \"weight\": \"66\", \"container\": 2, \"containerNo\": \"3453\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(50,'S/Mumbai/I/24-25/18','2025-01-29 13:03:00','2025-01-30 13:01:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','dummy45','dumpy45','40\'','fetch Persons','HBL/HAWB','dummy67','admin','98','Surrender','55455','Yearly',18,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(51,'A/Mumbai/I/24-25/19','2025-01-31 17:58:00','2025-01-31 17:57:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','SEZ-Z','FCL','vhvhg','shfjfhs','20\'','fetch Persons','HBL/HAWB','dummy3','admin','2','Surrender','55455','Yearly',19,'gfdcg','gfhn','2025-02-09 00:00:00','2025-01-31 00:00:00','muggles','hogwarts','qwertyuhnfh,gf,','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(53,'S/Mumbai/I/24-25/22','2025-02-05 12:03:00','2025-02-07 12:02:00','Sea','Kolkata Sea','Yes','Loaded',2,'No','Home','FCL','vhvhg','dumpy45','20\'','fetch Persons','MBL/MAWB','53455','admin','2','Surrender','5545','Yearly',22,'','',NULL,NULL,'vedant  ltd pvt','vapi','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','JOGBANI','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(54,'A/Mumbai/I/24-25/23','2025-02-14 15:23:00','2025-02-12 17:23:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','vhvhg','dumpy45','40\', 20\', 40\' ISO Tank','fetch Persons','HBL/HAWB','dummy3','admin','2','Surrender','5545','Yearly',23,'mumbai','Mumbai','2025-03-02 00:00:00','2025-02-14 00:00:00','muggles','Andheri','','','','sfsfdfs','mumbai','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(56,'A/Mumbai/I/24-25/25','2025-02-14 16:12:00','2025-01-29 16:11:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy45','shfjfhs','20\', 20\' ISO Tank, 40\'','fetch Persons','HBL/HAWB','dummy3','admin','2','Surrender','55455','Yearly',25,'jharkhand','Mumbai','2025-02-12 00:00:00','2025-02-24 00:00:00','Tray ltd pvt','mumbai','xzxzx','27AAICS7836D1Z9','AAICS7836D','sdasd','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(57,'A/Mumbai/I/24-25/26','2025-02-22 13:17:00','2025-02-23 13:16:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','shfjfhs','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons','HBL/HAWB','53455','admin','2','Surrender','5545','Yearly',26,'ki','korea','2025-03-04 00:00:00','2025-03-02 00:00:00','Testing23','Navi mumbai','aaaa','27AAICS7836D1Z9','AAICS7836D','sfsfdfs','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(58,'A/Mumbai/I/24-25/27','2025-02-22 15:21:00','2025-02-23 15:19:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','dummy45','shfjfhs','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons','HBL/HAWB','53455','admin','2','Surrender','5545','Yearly',27,'colaba','sd','2025-02-26 00:00:00','2025-02-23 00:00:00','sanjeet pvt ltd','mumbai','asas','27AAICS7836D1Z9','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(59,'A/Mumbai/I/24-25/28','2025-03-05 11:24:00','2025-03-01 11:24:00','Air','Mumbai Sea','Yes','Loaded',2,'No','In-Bond','FCL','dummy45','dumpy45','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons','HBL/HAWB','dummy67','admin','2','Surrender','5545','One-Time',28,'','',NULL,NULL,'Allcargo Pvt Ltd','Andheri','dfgd','27GDMPM3914G1A3','GDMPM3914G','sasa','dgfgdg','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(61,'A/Mumbai/I/24-25/29','2025-03-10 16:33:00','2025-03-10 16:31:00','Air','Mumbai Sea','Yes','',1,'Yes','Home','FCL','dummy45','shfjfhs','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons','HBL/HAWB','53455','admin','2','Surrender','5545','Yearly',29,'gfdcg','colaba','2025-03-10 00:00:00','2025-03-10 00:00:00','sanjeet pvt ltd','mumbai','asas','27AAICS7836D1Z9','AAICS7836D','sfsfdfs','dsfafa','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL),(62,'S/Mumbai/I/24-25/30','2025-03-31 13:27:00','2025-03-21 13:27:00','Sea','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','vhvhg','shfjfhs','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons','HBL/HAWB','53455','admin','2','Surrender','5545','Yearly',30,'jharkhand','sfsf','2025-03-12 00:00:00','2025-03-31 00:00:00','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','dfgdg','mumbai','[{\"type\": \"Flat Bulk\", \"weight\": \"12\", \"container\": 1, \"containerNo\": \"12\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,0,NULL),(63,'A/Mumbai/I/25-26/1','2025-04-10 13:04:00','2025-04-16 16:07:00','Air','Mumbai Sea','Yes','Loaded',2,'No','Home','LCL','vhvhg','shfjfhs','20\', 40\', 20\' ISO Tank, 40\' ISO Tank, LCL, Flat Bulk, Break Bulk','fetch Persons','MBL/MAWB','dummy3','admin','2','Surrender','55455','Yearly',1,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','ggdgsgs','dsfgdfhddh','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,1,1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store import notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impnotifications`
--

LOCK TABLES `impnotifications` WRITE;
/*!40000 ALTER TABLE `impnotifications` DISABLE KEYS */;
INSERT INTO `impnotifications` VALUES (6,'A/Mumbai/I/24-25/4','Allcargo Pvt Ltd','2024-12-03 11:54:35','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(7,'A/Mumbai/I/24-25/5','Allcargo Pvt Ltd','2024-12-03 11:59:54','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(8,'A/Mumbai/I/24-25/6','C CONNECT LOGGI','2024-12-03 12:11:30','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(9,'A/Mumbai/I/24-25/7','Allcargo Pvt Ltd','2024-12-03 14:43:25','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(11,'A/Mumbai/I/24-25/1','Highland Residency','2024-12-05 17:19:53','ImpJobButton','Thane','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(12,'A/Mumbai/I/24-25/2','adani pvt ltd','2024-12-19 16:31:48','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(13,'A/Mumbai/I/24-25/3','Tray ltd pvt','2024-12-19 16:39:51','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(14,'A/Mumbai/I/24-25/1','adani pvt ltd','2024-12-19 16:41:52','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(15,'A/Mumbai/I/24-25/1','Allcargo Pvt Ltd','2024-12-21 11:45:07','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(16,'A/Mumbai/I/24-25/2','Tray ltd pvt','2024-12-24 11:09:49','ImpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(17,'A/Mumbai/I/24-25/3','Tray ltd pvt','2024-12-24 15:03:52','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(18,'S/Mumbai/I/24-25/4','vedant  ltd pvt','2024-12-24 15:49:46','ImpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(19,'A/Mumbai/I/24-25/5','vedant  ltd pvt','2024-12-24 16:08:38','ImpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(20,'S/Mumbai/I/24-25/6','adani pvt ltd','2024-12-24 16:11:53','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(21,'A/Mumbai/I/24-25/7','','2024-12-24 16:18:44','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(22,'A/Mumbai/I/24-25/8','','2024-12-24 16:24:40','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(23,'A/Mumbai/I/24-25/9','adani pvt ltd','2024-12-24 16:55:07','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(24,'A/Mumbai/I/24-25/10','adani pvt ltd','2024-12-24 16:55:26','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(25,'A/Mumbai/I/24-25/10','adani pvt ltd','2024-12-24 16:55:38','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(26,'A/Mumbai/I/24-25/10','Tray ltd pvt','2024-12-24 16:57:50','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(27,'A/Mumbai/I/24-25/9','Tray ltd pvt','2024-12-24 17:07:13','ImpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(28,'A/Mumbai/I/24-25/10','adani pvt ltd','2024-12-24 17:08:36','ImpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(29,'A/Mumbai/I/24-25/11','adani pvt ltd','2024-12-24 17:10:55','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(30,'A/Mumbai/I/24-25/12','adani pvt ltd','2024-12-24 17:12:48','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(31,'A/Mumbai/I/24-25/12','adani pvt ltd','2024-12-24 17:12:57','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(32,'A/Mumbai/I/24-25/12','','2024-12-24 17:37:33','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(33,'A/Mumbai/I/24-25/13','adani pvt ltd','2024-12-24 17:59:35','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(34,'A/Mumbai/I/24-25/14','solanki ','2025-01-06 16:11:06','ImpJobButton','Pune','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:20:54\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(35,'A/Mumbai/I/24-25/15','Allcargo Pvt Ltd','2025-01-06 16:13:29','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:21:11\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(36,'A/Mumbai/I/24-25/16','Allcargo Pvt Ltd','2025-01-06 16:30:10','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:21:29\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(37,'A/Mumbai/I/24-25/17','adani pvt ltd','2025-01-07 11:17:07','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:21:34\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(38,'S/Mumbai/I/24-25/18','adani pvt ltd','2025-01-29 13:03:15','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-29 13:04:49\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(39,'A/Mumbai/I/24-25/19','muggles','2025-01-31 17:58:32','ImpJobButton','hogwarts','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-31 17:59:53\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(40,'A/Mumbai/I/24-25/20','Relience Ltd','2025-02-03 17:55:13','ImpJobButton','lokhandwale','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-03 17:55:24\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','hemang@executive'),(41,'S/Mumbai/I/24-25/21','','2025-02-04 13:23:53','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-05 12:05:03\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(42,'S/Mumbai/I/24-25/22','vedant  ltd pvt','2025-02-05 12:03:59','ImpJobButton','vapi','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-05 12:06:27\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(43,'A/Mumbai/I/24-25/23','aryan pvt ltd','2025-02-14 15:23:59','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-14 15:27:48\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(44,'A/Mumbai/I/24-25/24','Testing23','2025-02-14 15:34:36','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-14 15:34:57\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(45,'A/Mumbai/I/24-25/25','Tray ltd pvt','2025-02-14 16:12:25','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-14 16:12:58\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(46,'A/Mumbai/I/24-25/26','Testing23','2025-02-22 13:17:03','ImpJobButton','Navi mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-22 14:33:15\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(47,'A/Mumbai/I/24-25/27','sanjeet pvt ltd','2025-02-22 15:21:14','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-22 15:22:27\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(48,'A/Mumbai/I/24-25/28','Allcargo Pvt Ltd','2025-03-05 11:24:53','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-03-05 11:25:41\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(49,'A/Mumbai/I/24-25/29','sanjeet pvt ltd','2025-03-10 16:13:12','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-03-10 16:34:01\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(50,'A/Mumbai/I/24-25/29','sanjeet pvt ltd','2025-03-10 16:33:51','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-03-10 16:34:01\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(51,'S/Mumbai/I/24-25/30','adani pvt ltd','2025-03-31 13:27:53','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-03-31 14:30:55\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(52,'A/Mumbai/I/24-25/31','aryan pvt ltd','2025-03-31 13:31:32','ImpJobButton','','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(53,'A/Mumbai/I/24-25/32','aryan pvt ltd','2025-03-31 13:34:27','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-06-02 11:54:16\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(54,'A/Mumbai/I/24-25/33','','2025-03-31 14:26:06','ImpJobButton','vapi','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-06-02 11:52:10\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(55,'A/Mumbai/I/25-26/1','adani pvt ltd','2025-04-10 13:05:00','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-04-10 13:08:43\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(56,'A/I/25-26/1','aryan pvt ltd','2025-06-02 11:57:40','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"sanjeet@Developer\"}]','[{\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"sanjeet@Developer\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"sanjeet@Developer\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','hemang@executive');
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
) ENGINE=InnoDB AUTO_INCREMENT=1587 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `importquotation`
--

LOCK TABLES `importquotation` WRITE;
/*!40000 ALTER TABLE `importquotation` DISABLE KEYS */;
INSERT INTO `importquotation` VALUES (897,'[\"Vehicle Name\", \"Vehicle Number\", \"Vehicle Maker\", \"Vehicle Model\", \"Fill / Theft\", \"Alarm Details\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(898,'[\"4521\", \"MH43BX4521\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4620/34 TT\", \"theft\", \"Theft 12L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(899,'[\"4521\", \"MH43BX4521\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4620/34 TT\", \"fill\", \"Fill 306L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(900,'[\"4522\", \"MH43BX4522\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4020/34\", \"fill\", \"Fill 279L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(901,'[\"4521\", \"MH43BX4521\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4620/34 TT\", \"fill\", \"Fill 297L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(902,'[\"4522\", \"MH43BX4522\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4020/34\", \"fill\", \"Fill 257L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(903,'[\"4521\", \"MH43BX4521\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4620/34 TT\", \"fill\", \"Fill 280L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(904,'[\"4522\", \"MH43BX4522\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4020/34\", \"fill\", \"Fill 187L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(905,'[\"4522\", \"MH43BX4522\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4020/34\", \"fill\", \"Fill 235L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(906,'[\"4521\", \"MH43BX4521\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4620/34 TT\", \"fill\", \"Fill 252L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(907,'[\"4522\", \"MH43BX4522\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4020/34\", \"fill\", \"Fill 273L (Limit 11.1L)\\r\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(908,'[\"4522\", \"MH43BX4522\", \"ASHOK LEYLAND\", \"2022 ASHOK LEYLAND GA4020/34\", \"fill\", \"Fill 248L (Limit 11.1L)\"]','2025-05-16 05:37:41','A/Mumbai/I/24-25/23','seawave@2323','Seawave Forwarding Logistics'),(1526,'[\"QTY\", \"Model\", \"Price Per Unit (Rs.)\", \"Total (Rs.)\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1527,'[\"\", \"3\", \"SIGNA 4023/CAB CX BLOWER\", \"3503169.34\", \"10509508\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1528,'[\"\", \"VC\", \"\", \"\", \"\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1529,'[\"\", \"Contact Information:\", \"BODY BUILDING \", \"0\", \"0\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1530,'[\"\", \"MOB NO: \", \"AIS 140\", \"0\", \"0\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1531,'[\"\", \"\", \"OTHERS\", \"0\", \"0\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1532,'[\"\", \"\", \"CRTM\", \"2800\", \"8400\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1533,'[\"\", \"\", \"FASTAG\", \"0\", \"0\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1534,'[\"\", \"\", \"INSURANCE\", \"0\", \"0\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1535,'[\"\", \"HP:  \", \"Discount\", \"0\", \"0\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1536,'[\"\", \"\", \"Net Landing \", \"3503169\", \"10517908\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1537,'[\"\", \"GSTIN.: 27AAMCM8707F1Z6\", \"TCS 1%\", \"35032\", \"105095\\r\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1538,'[\"\", \"PAN No. : AAMCM8707F\", \"Total\", \"3541001\", \"10623003\"]','2025-05-16 07:13:52','S/Mumbai/I/24-25/22','seawave@2323','Seawave Forwarding Logistics'),(1575,'[\"Driver Name\", \"Group\", \"Time\", \"Latitude\", \"Longitude\", \"Map Link\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1576,'[\"-\", \"a\", \"10/11/24 00:24\", \"19.6421\", \"72.915385\", \"https://www.google.com/maps/?q=19.6429,72.915385\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1577,'[\"-\", \"-\", \"09/11/24 10:52\", \"20.2106049\", \"72.8862866\", \"https://www.google.com/maps/?q=20.2106049,72.8862866\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1578,'[\"-\", \"-\", \"08/11/24 02:13\", \"18.9429683\", \"73.0283116\", \"https://www.google.com/maps/?q=18.9429683,73.0283116\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1579,'[\"-\", \"-\", \"22/11/2307:02\", \"18.9428466\", \"73.0283366\", \"https://www.google.com/maps/?q=18.9428466,73.0283366\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1580,'[\"-\", \"-\", \"19/11/24 19:23\", \"18.90741\", \"73.0188116\", \"https://www.google.com/maps/?q=18.90741,73.0188116\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1581,'[\"-\", \"-\", \"15/11/24 20:43\", \"21.436625\", \"72.9707133\", \"https://www.google.com/maps/?q=21.436625,72.9707133\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1582,'[\"-\", \"-\", \"13/11/24 11:24\", \"19.7420316\", \"72.9161283\", \"https://www.google.com/maps/?q=19.7420316,72.9161283\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1583,'[\"-\", \"-\", \"01/12/24 09:01\", \"20.82232\", \"74.74842\", \"https://www.google.com/maps/?q=20.82232,74.74842\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1584,'[\"-\", \"-\", \"30/11/24 03:25\", \"20.1041133\", \"72.913915\", \"https://www.google.com/maps/?q=20.1041133,72.913915\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1585,'[\"-\", \"-\", \"27/11/24 20:42\", \"25.4667683\", \"78.4249799\", \"https://www.google.com/maps/?q=25.4667683,78.4249799\\r\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics'),(1586,'[\"-\", \"-\", \"24/11/24 09:42\", \"25.0888583\", \"77.5958099\", \"https://www.google.com/maps/?q=25.0888583,77.5958099\"]','2025-05-16 10:14:48','S/Mumbai/I/24-25/30','seawave@2323','Seawave Forwarding Logistics');
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='line of business table as per users prefrences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lob`
--

LOCK TABLES `lob` WRITE;
/*!40000 ALTER TABLE `lob` DISABLE KEYS */;
INSERT INTO `lob` VALUES (15,'test IMPORT','Seawave Forwarding Logistics','seawave@2323','Air',0,NULL,NULL,NULL,NULL,NULL),(16,'Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Sea',0,NULL,NULL,NULL,NULL,NULL),(17,'Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Air',0,NULL,NULL,NULL,NULL,NULL),(30,'Air Import','seatech','seatech@23','Air',0,NULL,NULL,NULL,NULL,NULL),(38,'Sea EXPORT','Seawave Forwarding Logistics','seawave@2323','Sea',0,NULL,NULL,NULL,NULL,NULL),(39,'Air dadada','Seawave Forwarding Logistics','seawave@2323','Air',0,NULL,NULL,'2025-04-03','admin',NULL),(40,'Sea test','Seawave Forwarding Logistics','seawave@2323','Sea',0,NULL,NULL,'2025-04-04','admin','admin'),(41,'Air asas','Seawave Forwarding Logistics','seawave@2323','Air',1,'asas','2025-05-06 00:00:00','2025-05-06','admin','admin');
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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `content` text,
  `image_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the milestones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (49,'ETA','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(50,'E-SANCHIT','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(51,'PORT CFS NOMINATION','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani',0,NULL,NULL,NULL,NULL,'admin'),(52,'processing','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL,NULL,NULL,NULL,'admin'),(53,'ETA','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Delhi',0,NULL,NULL,NULL,NULL,'admin'),(54,'E-SANCHIT','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Delhi',0,NULL,NULL,NULL,NULL,'admin'),(55,'E-SANCHIT','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(56,'ETA ','Sea EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(57,'E-SANCHIT','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(58,'E-SANCHIT','Sea EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(59,'Scanning','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(60,'Packaging','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(61,'ETA ','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Kolkata',0,'',NULL,NULL,NULL,NULL),(62,'PORT CFS','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Kolkata',0,'',NULL,NULL,NULL,NULL),(63,'ETA','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani',0,'',NULL,NULL,NULL,NULL),(64,'E-SANCHIT','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani',0,'',NULL,NULL,NULL,NULL),(65,'PORT  CFS','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani',0,'',NULL,NULL,NULL,NULL),(71,'ETA','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(72,'REX','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Delhi',0,'',NULL,NULL,NULL,NULL),(73,'PORT CFS NOMINATION','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(74,'DHH','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(75,'CUSTOM CLEAREANCE','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(76,'ETA EXPORT ALL','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(77,'test','Air Import','seatech','seatech@23','Mumbai',0,'',NULL,NULL,NULL,NULL),(78,'test2','Air Import','seatech','seatech@23','Mumbai',0,'',NULL,NULL,NULL,NULL),(79,'Test','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(80,'Test','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(81,'IGM & ETA Details','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(82,'Scrutiny Documents','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(83,'Checklist Preparation','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(84,'E-Sanchit','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(85,'Filling BOE','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(86,'Assessment','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(87,'Delivery Order','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(88,'Delivery','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(89,'Vehicle Placed','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(90,'Bill Preparation','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(91,'Bill Dispatch','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(92,'POD Confirmation','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,NULL,NULL,NULL),(93,'POD Confirmation','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL,NULL,'2025-04-04','admin','admin'),(94,'asasasas','test IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,'',NULL,'2025-05-06','admin',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store notifications and its data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment B-10-15 Sector-15 1:1','Digga D','India','Maharashtra','Navi Mumbai','digga','400703','2004263507','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','diggachigga','4',NULL,NULL,'aayush@manager',1,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',1,'2024-06-05 15:31:43'),('Seawave Forwarding Logistics','seawave@2323','dfs','Gondya','dsf','dsf','df','gondya','345326','5645653232','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','gond','7',NULL,NULL,'hemang@executive',2,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": \"2024-06-05 15\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',2,'2024-06-05 15:40:28'),('Seawave Forwarding Logistics','seawave@2323','1/35454','Allcargo Pvt Ltd','India','MH','THANE','allcargo','400705','8655997299','rm@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Mumbai','30',NULL,NULL,'admin',3,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',3,'2024-09-02 15:05:01'),('Seawave Forwarding Logistics','seawave@2323','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','Ritesh Pathak LLP','India','Maharashtra','Navi Mumbai','ritesh','400705','9867612222','nkmishra@seawave.in','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Thane','21',NULL,NULL,'admin',4,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-20 16\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',4,'2024-09-20 16:31:31'),('Seawave Forwarding Logistics','seawave@2323','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','Highland Residency','India','Maharashtra','THANE','highland','400607','8655919239','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Thane','31',NULL,NULL,'admin',6,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}]',6,'2024-09-20 16:56:16'),('Seawave Forwarding Logistics','seawave@2323','Highland Residency\nBougainvillea','Prince LLP','India','Maharashtra','Thane','prince','400607','7045605056','aayushmishra@seawave.in','FXFPM6685A','27FXFPM6685A1Z4','FXFPM6685A','juinagar','31',NULL,NULL,'aayush@manager',7,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}]',7,'2024-09-20 16:57:40'),('Seawave Forwarding Logistics','seawave@2323','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','C CONNECT LOGGI','India','MAHARASHTRA','THANE','c','400607','8655919239','rishi.seawave@gmail.com','ABCPP1234P','27ABCPP1234P1Z5','ABCPP1234P','Mumbai','31',NULL,NULL,'admin',8,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',8,'2024-09-20 17:11:41'),('Seawave Forwarding Logistics','seawave@2323','dffddfsdf','dummy','india','maha','mum','dummy','400045','9156686985','sfdfg@gmail.com','','','','','',NULL,NULL,'aayush@manager',9,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',9,'2024-09-24 17:52:45'),('Seawave Forwarding Logistics','seawave@2323','fdgdsg dgdgg','Vedant PVT LTD','India','MH','Navi Mumbai mh','vedant','400705','8655997299','rm@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Mumbai','30',NULL,NULL,'admin',10,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',10,'2024-09-27 14:32:05'),('Seawave Forwarding Logistics','seawave@2323','dfsfdfs','dummy Pvt ltd','india','Goa','dfdfs df','dummy','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','67',NULL,NULL,'aayush@manager',11,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',11,'2024-09-27 15:12:53'),('Seawave Forwarding Logistics','seawave@2323','sdasdf sdgs','dummy2 Pvt ltd','india','Goa','mum','dummy2','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','67',NULL,NULL,'aayush@manager',12,'OrgButton','[{\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',12,'2024-09-27 15:20:40'),('Seawave Forwarding Logistics','seawave@2323','afasf sdfdvsv vass','dummy3 Pvt ltd','india','maha','mum','dummy3','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','mumbai','56',NULL,NULL,'aayush@manager',13,'OrgButton','[{\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',13,'2024-09-27 16:16:18'),('Seawave Forwarding Logistics','seawave@2323','asdasdf bdfg','dummy4','india','MAHARASHTRA','NAVI MUMBAI','dummy4','345326','8655997299','fffdsfnj@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Pune','56',NULL,NULL,'admin',14,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-08 12\", \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-08 12\", \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-08 12\", \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',14,'2024-10-08 12:44:59'),('seatech','seatech@23','sdff','Allcargo Pvt Ltd','Afghanistan','Baghlan','Nahrīn','allcargo','345326','8655997299','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Pune','56',NULL,NULL,'admin',15,'OrgButton','[]','[]','[]',15,'2024-11-14 11:42:36'),('Seawave Forwarding Logistics','seawave@2323','sdfsdf fsdfsfd','testing','India','Assam','Badarpur','testing','400058','8104834173','sofsfds@gmail.com','ABCDE1234F','27ABCDE1234F1Z5','ABCDE1234F','testingbranch','34',NULL,NULL,'admin',16,'OrgButton','[]','[]','[]',16,'2024-11-21 12:29:44'),('Seawave Forwarding Logistics','seawave@2323','dfgdfgr gg','solanki pvt ltd','India','Rajasthan','Udaipur','solanki','400008','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','udaipur','23',NULL,NULL,'admin',17,'OrgButton','[]','[]','[]',17,'2024-11-29 12:43:02'),('Seawave Forwarding Logistics','seawave@2323','dsfafsdf','vedant','Argentina','Jujuy','Calilegua','vedant','400008','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','56',NULL,NULL,'admin',18,'OrgButton','[]','[]','[]',18,'2024-12-04 16:13:00'),('Seawave Forwarding Logistics','seawave@2323','dsfafsdf','vedant','Argentina','Jujuy','Calilegua','vedant','400008','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','56',NULL,NULL,'admin',19,'OrgButton','[]','[]','[]',19,'2024-12-04 16:14:25'),('Seawave Forwarding Logistics','seawave@2323','ddfadas f errr fsrtg','Google pvt lts','Azerbaijan','Ganja','Ganja','google','400004','56464566','kdhds@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','56',NULL,NULL,'admin',20,'OrgButton','[]','[]','[]',20,'2024-12-04 16:41:59'),('Seawave Forwarding Logistics','seawave@2323','dasddad dqdqfqf qqwwrfdas','Amazon pvt ltd','Armenia','Vayots Dzor Region','Yeghegis','amazon','400058','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','mumbai','67',NULL,NULL,'admin',21,'OrgButton','[]','[]','[]',21,'2024-12-04 16:46:45'),('Seawave Forwarding Logistics','seawave@2323','dsfadffa dsqawda asda','Testing23','India','Bihar','Arrah','testing23','ffffsf xdsfsf','8104834173','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','kolkata','56',NULL,NULL,'admin',22,'OrgButton','[]','[]','[]',22,'2024-12-05 11:50:39'),('Seawave Forwarding Logistics','seawave@2323','sfsdff','Tray ltd pvt','Argentina','Mendoza','Departamento de San Martín','tray','400058','5646456645','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','gujarat','56',NULL,NULL,'admin',23,'OrgButton','[]','[]','[]',23,'2024-12-05 11:55:15'),('Seawave Forwarding Logistics','seawave@2323','dad  daddfaf','stark ltd ','Albania','Lezhë County','Bashkia Lezhë','stark','400058','9876543210','sofsfds@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','winterfall','23',NULL,NULL,'admin',24,'OrgButton','[]','[]','[]',24,'2024-12-05 14:15:04'),('Seawave Forwarding Logistics','seawave@2323','sadadd adeqad','Allcargo Pvt Ltd','India','Kerala','Cherpulassery','allcargo','3453267','8104834173','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','45',NULL,NULL,'admin',25,'OrgButton','[]','[]','[]',1,'2024-12-06 17:11:27'),('Seawave Forwarding Logistics','seawave@2323','sdaf sfswf','adani pvt ltd','India','Maharashtra','Andheri','adani','400006','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','45',NULL,NULL,'admin',26,'OrgButton','[]','[]','[]',2,'2024-12-06 17:13:39'),('Seawave Forwarding Logistics','seawave@2323','werwe wfqwfa afsa faasfa f','Tray ltd pvt','India','Bihar','Bakhtiyarpur','tray','400004','9876543219','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Bihar','45',NULL,NULL,'admin',27,'OrgButton','[]','[]','[]',3,'2024-12-09 11:09:40'),('Seawave Forwarding Logistics','seawave@2323','dfas ','vedant  ltd pvt','India','Gujarat','Vapi','vedant','400058','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','vapi','56',NULL,NULL,'admin',28,'OrgButton','[]','[]','[]',4,'2024-12-09 11:11:12'),('Seawave Forwarding Logistics','seawave@2323','PANVEL','CONTINENTAL CFS','India','Maharashtra','Navi Mumbai','continental','400614','','','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','NHAVA SHEVA','60',NULL,NULL,'admin',29,'OrgButton','[]','[]','[]',5,'2024-12-10 17:22:08'),('Seawave Forwarding Logistics','seawave@2323','Mumbai Andheri West ','Relience Ltd','India','Maharashtra','Andheri','relience','400058','5534667457','relience@.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','68',NULL,NULL,'admin',30,'OrgButton','[]','[]','[]',6,'2024-12-11 12:23:15'),('Seawave Forwarding Logistics','seawave@2323','ffffa dfafasf','dummyn pvt','India','Maharashtra','Andheri','dummyn','400614','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',31,'OrgButton','[]','[]','[]',7,'2024-12-12 13:13:51'),('Seawave Forwarding Logistics','seawave@2323','hjbfhjsbff fskfjbf kjasdfk','nagesh Pvt ltd','India','Maharashtra','Navi Mumbai','nagesh','400006','9876543219','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Navi mumbai','45',NULL,NULL,'admin',32,'OrgButton','[]','[]','[]',9,'2025-01-02 11:06:49'),('Seawave Forwarding Logistics','seawave@2323','sawqwrv fafaf  ddf','dummy91','Andorra','Encamp','Pas de la Casa','dummy91','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','dummyBranch1','68',NULL,NULL,'admin',33,'OrgButton','[]','[]','[]',10,'2025-01-02 11:23:59'),('Seawave Forwarding Logistics','seawave@2323','dasfrsgfgf cdsgs','solanki ','Azerbaijan','Dashkasan District','Verkhniy Dashkesan','solanki','345326','8655997299','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',34,'OrgButton','[]','[]','[]',11,'2025-01-02 11:38:03'),('Seawave Forwarding Logistics','seawave@2323','dgsgs','solanki ','South Korea','Sejong City','Sejong','solanki','400004','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','42',NULL,NULL,'admin',35,'OrgButton','[]','[]','[]',12,'2025-01-02 11:43:50'),('Seawave Forwarding Logistics','seawave@2323','sdfsdswdgfs vfsd','solanki ','India','Maharashtra','Andheri','solanki','400614','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',36,'OrgButton','[]','[]','[]',13,'2025-01-02 11:50:17'),('Seawave Forwarding Logistics','seawave@2323','dsfsfsf','solanki ','India','Maharashtra','Andheri','solanki','345326','9876543219','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',37,'OrgButton','[]','[]','[]',14,'2025-01-02 11:52:00'),('Seawave Forwarding Logistics','seawave@2323','aseafsasfds ascad','solanki ','India','Jharkhand','Deogarh','solanki','400614','9578907467','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',38,'OrgButton','[]','[]','[]',15,'2025-01-02 11:56:02'),('Seawave Forwarding Logistics','seawave@2323','dfasffaf affasf','solanki ','Iceland','Western Region','Helgafellssveit','solanki','400614','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',39,'OrgButton','[]','[]','[]',16,'2025-01-02 12:04:37'),('Seawave Forwarding Logistics','seawave@2323','asdfadf','solanki ','Antigua And Barbuda','Barbuda','Codrington','solanki','400058','5646456645','example@example.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','Pune','68',NULL,NULL,'admin',40,'OrgButton','[]','[]','[]',17,'2025-01-02 13:10:53'),('Seawave Forwarding Logistics','seawave@2323','asrfrfsf fasffas','solanki ','Albania','Dibër County','Bashkia Bulqizë','solanki','400058','8655997299','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','34',NULL,NULL,'admin',41,'OrgButton','[]','[]','[]',18,'2025-01-02 13:12:58'),('Seawave Forwarding Logistics','seawave@2323','xdzsfadad sfasf','solanki ','Afghanistan','Badghis','Ghormach','solanki','400058','8655997299','example@example.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','Bihar','23',NULL,NULL,'admin',42,'OrgButton','[]','[]','[]',19,'2025-01-02 13:16:36'),('Seawave Forwarding Logistics','seawave@2323','asdasdfafa','dummy99','Australia','Victoria','Abbotsford','dummy99','400004','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','',NULL,NULL,'admin',43,'OrgButton','[]','[]','[]',20,'2025-01-02 13:34:24'),('Seawave Forwarding Logistics','seawave@2323','fnfjhkfff','dummy90','Argentina','La Rioja','Arauco','dummy90','400614','9578907467','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','pune','42',NULL,NULL,'admin',44,'OrgButton','[]','[]','[]',21,'2025-01-02 13:38:18'),('Seawave Forwarding Logistics','seawave@2323','dasfafa','solanki ','Armenia','Yerevan','Arabkir','solanki','345326','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','haryana','56',NULL,NULL,'admin',45,'OrgButton','[]','[]','[]',22,'2025-01-02 13:42:54'),('Seawave Forwarding Logistics','seawave@2323','dfadasd sdfa','dummy499','Armenia','Vayots Dzor Region','Yeghegnadzor','dummy499','400004','8104834173','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Pune','34',NULL,NULL,'admin',46,'OrgButton','[]','[]','[]',23,'2025-01-02 13:45:02'),('Seawave Forwarding Logistics','seawave@2323','rfsdff sfaf','dummy999','Afghanistan','Badakhshan','Ashkāsham','dummy999','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','vapi','68',NULL,NULL,'admin',47,'OrgButton','[]','[]','[]',24,'2025-01-02 13:47:44'),('Seawave Forwarding Logistics','seawave@2323','rfsresfs dada dad','dummy88','Armenia','Aragatsotn Region','Aparan','dummy88','400614','9578907467','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','haryana','42',NULL,NULL,'admin',48,'OrgButton','[]','[]','[]',25,'2025-01-02 13:49:20'),('Seawave Forwarding Logistics','seawave@2323','sdfsasf ffadsa','dummy55','Armenia','Aragatsotn Region','Agarakavan','dummy55','400004','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','45',NULL,NULL,'admin',49,'OrgButton','[]','[]','[]',26,'2025-01-02 13:51:40'),('Seawave Forwarding Logistics','seawave@2323','dadad adada','dummy234','Antigua And Barbuda','Barbuda','Codrington','dummy234','400058','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Navi mumbai','56',NULL,NULL,'admin',50,'OrgButton','[]','[]','[]',27,'2025-01-02 14:06:20'),('Seawave Forwarding Logistics','seawave@2323','sdfsfasfsf adada','dummy1111','Afghanistan','Badakhshan','Ashkāsham','dummy1111','400006','9578907467','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','mumbai','34',NULL,NULL,'admin',51,'OrgButton','[]','[]','[]',28,'2025-01-02 14:10:17'),('Seawave Forwarding Logistics','seawave@2323','dfasdfasfa','solanki ','Algeria','Annaba','Annaba','solanki','400004','9876543219','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',52,'OrgButton','[]','[]','[]',32,'2025-01-02 15:22:35'),('Seawave Forwarding Logistics','seawave@2323','efwwgfwff sfaff dafdhdg adafasfa','solanki ','India','Maharashtra','Andheri','solanki','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45',NULL,NULL,'admin',53,'OrgButton','[]','[]','[]',35,'2025-01-04 12:31:00'),('Seawave Forwarding Logistics','seawave@2323','dsfsfds ffsfdsfsf','Tray ltd pvt2.0','Argentina','Río Negro','El Cuy','tray','400057','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','68',NULL,NULL,'admin',54,'OrgButton','[]','[]','[]',36,'2025-01-04 15:22:34'),('Seawave Forwarding Logistics','seawave@2323','dssfsdfs sfsdfs','dummy765','Austria','Vienna','Simmering','dummy765','400057','5646456645','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','42',NULL,NULL,'admin',55,'OrgButton','[]','[]','[]',37,'2025-01-04 15:28:49'),('Seawave Forwarding Logistics','seawave@2323','dsdafsfs fsfsdfsf','Allcargo Pvt Ltd','Afghanistan','Baghlan','Nahrīn','allcargo','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','34',NULL,NULL,'admin',56,'OrgButton','[]','[]','[]',1,'2025-01-04 15:54:28'),('Seawave Forwarding Logistics','seawave@2323','dasdas asdadfadf','adani pvt ltd','Argentina','La Rioja','Villa Bustos','adani','400614','9876543219','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','68',NULL,NULL,'admin',57,'OrgButton','[]','[]','[]',2,'2025-01-04 15:56:47'),('Seawave Forwarding Logistics','seawave@2323','sdffafas dafafafa','vedant  ltd pvt','East Timor','Manufahi Municipality','Fatuberliu','vedant','400614','5646456645','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','vapi','78',NULL,NULL,'admin',58,'OrgButton','[]','[]','[]',3,'2025-01-04 15:57:40'),('Seawave Forwarding Logistics','seawave@2323','dasdasd adfsada adsfsgsda','solanki ','Armenia','Armavir Region','Aknalich','solanki','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','89',NULL,NULL,'admin',59,'OrgButton','[]','[]','[]',4,'2025-01-04 15:59:14'),('Seawave Forwarding Logistics','seawave@2323','Navi Mumbai Juinagar ','Seawave Logistic Pvt Ltd','India','Maharashtra','Navi Mumbai','seawave','400057','9876543219','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Juinagar ','23',NULL,NULL,'admin',60,'OrgButton','[]','[]','[]',5,'2025-01-06 17:00:37'),('Seawave Forwarding Logistics','seawave@2323','asdadfasfa asfasfa asfafadsd acdsadfa','dummy99','Austria','Upper Austria','Adlwang','dummy99','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','haryana','56',NULL,NULL,'admin',61,'OrgButton','[]','[]','[]',6,'2025-01-06 17:23:07'),('Seawave Forwarding Logistics','seawave@2323','qwertyuhnfh,gf,','muggles','United Kingdom','Scotland','Logan','muggles','400703','02004263507','jai@3231322.hg.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','hogwarts','90',NULL,NULL,'admin',62,'OrgButton','[]','[]','[]',7,'2025-01-31 17:08:15'),('Seawave Forwarding Logistics','seawave@2323','dfgd','Tray ltd pvt','India','Maharashtra','Achalpur','tray','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','hogwarts','77',NULL,NULL,'admin',63,'OrgButton','[]','[]','[]',8,'2025-02-01 15:55:17'),('Seawave Forwarding Logistics','seawave@2323','jijamata nagar','Relience Ltd','India','Maharashtra','Navi Mumbai','relience','400703','8975665231','test@test.com','RATPS8795I','58GST323726432','GDMPM3914G','lokhandwale','22',NULL,NULL,'admin',64,'OrgButton','[]','[]','[]',9,'2025-02-03 15:10:00'),('Seawave Forwarding Logistics','seawave@2323','','','','','','','','','','','','','','',NULL,NULL,'admin',65,'OrgButton','[]','[]','[]',10,'2025-02-04 14:28:24'),('Seawave Forwarding Logistics','seawave@2323','aaa','aryan','India','Maharashtra','Mumbai','aryan','400067','5534667457','sfdfg@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','mumbai','68','23','23','admin',66,'OrgButton','[]','[]','[]',12,'2025-02-14 12:44:20'),('Seawave Forwarding Logistics','seawave@2323','aaaa','Testing23','Austria','Vienna','Meidling','testing23','400006','9578907467','vadant3@gamil.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','Navi mumbai','23','22','23','admin',67,'OrgButton','[]','[]','[]',13,'2025-02-14 13:05:43'),('Seawave Forwarding Logistics','seawave@2323','rrwqewq','stark ltd ','Antigua And Barbuda','Saint John Parish','Potters Village','stark','400006','9876543219','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','Bihar','23','23','23','admin',68,'OrgButton','[]','[]','[]',14,'2025-02-14 13:13:22'),('Seawave Forwarding Logistics','seawave@2323','qwedsww','cconnect','Angola','Huíla Province','Jamba','cconnect','400006','8104834173','rishimuni2002@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','mumbai','12','2','7','admin',69,'OrgButton','[]','[]','[]',15,'2025-02-14 13:18:05'),('Seawave Forwarding Logistics','seawave@2323','asas','sanjeet pvt ltd','India','Maharashtra','Mumbai','sanjeet','400067','8104834173','asdad','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','mumbai','12','12','12','admin',70,'OrgButton','[]','[]','[]',16,'2025-02-14 14:29:01'),('Seawave Forwarding Logistics','seawave@2323','sdsdsd','dummy45','Azerbaijan','Ganja','Ganja','dummy45','400057','9876543219','dean@aew.in','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','Navi mumbai','34','34','34','admin',71,'OrgButton','[]','[]','[]',17,'2025-02-14 14:57:36'),('Seawave Forwarding Logistics','seawave@2323','qwertyuiop asdfghjkl','RetroMood','Antigua And Barbuda','Saint Peter Parish','All Saints','retromood','400703','02004263507','jai@323gmail.in','RATPS8795I','27AAICS7836D1Z3','AAICS7836D','Aurangabad','31','12','12','admin',72,'OrgButton','[]','[]','[]',18,'2025-02-27 17:15:07'),('Seawave Forwarding Logistics','seawave@2323','qeefvcdgvd','RetroMood','Antigua And Barbuda','Saint Peter Parish','All Saints','retromood','400703','02004263507','jai@323gmail.in','RATPS8795I','27GDMPM3914G1Z4','GDMPM3914G','Vashi','67','12','12','admin',73,'OrgButton','[]','[]','[]',19,'2025-02-27 17:23:31'),('Seawave Forwarding Logistics','seawave@2323','qwerqyuru','RetroMood','Antigua And Barbuda','Saint Mary Parish','Bolands','retromood','400703','02004263507','jai@323gmail.in','GDMPM3914G','58GST323726432','AAICS7836','Vashi','090','12','12','admin',74,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',20,'2025-02-28 13:07:36'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','Haiti','Nord-Est','Fort Liberté','retromood','400703','02004263507','jai@323gmail.in','RATPS8795I','27AAICS7836D1Z','AAICS7836D','Vashi','90','12','12','admin',75,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',21,'2025-02-28 17:01:00'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','India','Maharashtra','Ahmadpur','retromood','400703','02004263507','jai@323gmail.in','RATPS8795I','27AAICS7836D1Z3','AAICS7836D','sdsd','31','12','12','admin',76,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',22,'2025-02-28 17:40:32'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','Guyana','Upper Demerara-Berbice','Linden','retromood','400703','02004263507','jai@323gmail.in','GDMPM3914G','58GST323726432','AAICS7836D','lokhandwale','67','12','12','admin',77,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',23,'2025-02-28 17:43:35'),('Seawave Forwarding Logistics','seawave@2323','asdasca','RetroMood','Argentina','Jujuy','La Quiaca','retromood','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','lokhandwale','67','12','12','admin',78,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',24,'2025-02-28 17:49:28'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','India','Maharashtra','Achalpur','retromood','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','lokhandwale','31','12','12','admin',79,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',25,'2025-02-28 17:52:49'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','Ghana','Oti','Jasikan','retromood','400703','02004263507','jai@323gmail.in','GDMPM3914G','27AAICS7836D1Z','GDMPM3914G','lokhandwale','90','12','12','admin',80,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',26,'2025-03-01 11:11:32'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','India','Jharkhand','Daltonganj','retromood','400703','02004263507','jai@323gmail.in','AAICS7836D','27GDMPM3914G1Z4','AAICS7836','govandi','67','12','12','admin',81,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',27,'2025-03-01 11:40:03'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','Eritrea','Anseba Region','Keren','retromood','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','AAICS7836','lokhandwale','90','12','12','admin',82,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',28,'2025-03-01 12:35:00'),('Seawave Forwarding Logistics','seawave@2323','dfgd','Fleeters','India','Maharashtra','Akolner','fleeters','400703','02004263507','jai@323gmail.in','GDMPM3914G','58GST323726432','AAICS7836','sdsdsdsd','67','12','12','admin',83,'OrgButton','[]','[]','[]',29,'2025-03-01 12:37:59'),('Seawave Forwarding Logistics','seawave@2323','dfgd','Fleeters','India','Maharashtra','Adawad','fleeters','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','AAICS7836','sdsdsdsd','67','12','12','admin',84,'OrgButton','[]','[]','[]',30,'2025-03-01 12:46:48'),('Seawave Forwarding Logistics','seawave@2323','dfgd','Fleeters','India','Maharashtra','Akola','fleeters','400703','02004263507','jai@323gmail.in','GDMPM3914G','27AAICS7836D1Z','GDMPM3914G','govandi','31','12','12','admin',85,'OrgButton','[]','[]','[]',31,'2025-03-01 12:56:52'),('Seawave Forwarding Logistics','seawave@2323','dfgd','Fleeters','India','Maharashtra','Akalkot','fleeters','400703','02004263507','jai@323gmail.in','GDMPM3914G','27AAICS7836D1Z','GDMPM3914G','sdsd','90','12','12','admin',86,'OrgButton','[]','[]','[]',32,'2025-03-01 13:19:18'),('Seawave Forwarding Logistics','seawave@2323','dfgd','Fleeters','India','Maharashtra','Airoli','fleeters','400703','02004263507','jai@323gmail.in','RATPS8795I','27AAICS7836D1Z3','GDMPM3914G','lokhandwale','90','12','12','admin',87,'OrgButton','[]','[]','[]',33,'2025-03-01 14:51:57'),('Seawave Forwarding Logistics','seawave@2323','dfgd','RetroMood','India','Maharashtra','Akola','retromood','400703','02004263507','jai@323gmail.in','AAICS7836D','27GDMPM3914G1Z4','GDMPM3914G','lokhandwale','90','12','12','admin',88,'OrgButton','[]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',34,'2025-03-01 15:24:00'),('Seawave Forwarding Logistics','seawave@2323','dfgd','BlueDockers','India','Maharashtra','Akluj','bluedockers','400703','02004263507','jai@323gmail.in','GDMPM3914G','27AAICS7836D1Z3','AAICS7836D','Vashi','90','12','12','admin',89,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"hemang@executive\"}]',35,'2025-03-04 17:09:30');
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store client data and employee that created the client ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('allcargo','India','Maharashtra','Akola','400703','02004263507','jai@323gmail.in','RATPS8795S','27GDMPM3914G1A3','GDMPM3914G','120','dfgd','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd',1,'Andheri','admin','OrgButton','2025-01-04 15:54:28',0,'allcargo-Andheri-seawave@2323','[\"Shippers\", \"Consignee\"]',1,'[\"Shippers\", \"Consignee\"]','[{\"email\": \"shreyashpingle752@gmail.com\", \"mobile\": \"8655997298\", \"department\": \"head\", \"contactName\": \"IT Seawave\", \"designation\": \"executive\"}, {\"email\": \"shreyashpingle752@gmail.com\", \"mobile\": \"02004263507\", \"department\": \"Hr\", \"contactName\": \"IT Seawave\", \"designation\": \"executive\"}]','12','12',NULL,NULL),('adani','Argentina','La Rioja','Villa Bustos','400614','9876543219','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','68','dasdas asdadfadf','seawave@2323','Seawave Forwarding Logistics','adani pvt ltd',2,'mumbai','admin','OrgButton','2025-01-04 15:56:47',0,'adani-mumbai-seawave@2323','[\"Consignee\", \"Carrier\", \"Global\"]',1,'[\"Import\", \"Transport\", \"Freight\"]','[]','12','23',NULL,NULL),('vedant','East Timor','Manufahi Municipality','Fatuberliu','400614','5646456645','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','12','sdffafas dafafafa','seawave@2323','Seawave Forwarding Logistics','vedant  ltd pvt',3,'vapi','admin','OrgButton','2025-01-04 15:57:40',0,'vedant-vapi-seawave@2323','[\"Global\", \"Services\"]',1,'[\"Import\", \"Transport\", \"Freight\", \"Export\"]','[{\"email\": \"it.seawave21@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"vedant\", \"designation\": \"executive\"}]','53','31',NULL,NULL),('solanki','Armenia','Armavir Region','Aknalich','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','89','dasdasd adfsada adsfsgsda','seawave@2323','Seawave Forwarding Logistics','solanki ',4,'Andheri','admin','OrgButton','2025-01-04 15:59:14',0,'solanki-Andheri-seawave@2323','[\"Consignee\", \"Carrier\", \"Global\", \"Agent\"]',1,'[\"Transport\", \"Import\", \"Freight\", \"Export\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]',NULL,NULL,NULL,NULL),('solanki','India','Maharashtra','Pune','400614','9876543219','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','76','dadsad fff adfsfsvxafasf ','seawave@2323','Seawave Forwarding Logistics','solanki ',5,'Pune','admin','OrgButton','2025-01-06T06:37:07.072Z',0,'SO-SE-PU','[\"Shippers\", \"Agent\", \"Carrier\", \"Services\", \"Global\"]',1,'[\"Shippers\", \"Agent\", \"Carrier\", \"Services\", \"Global\"]','[{\"email\": \"rishi.seawave@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"rishi\", \"designation\": \"executive\"}]',NULL,NULL,NULL,NULL),('allcargo','Canada','Prince Edward Island','Souris','400004','9876543210','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','45','gsdfdsf','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd',8,'vapi','admin','OrgButton','2025-01-07T06:54:03.719Z',0,'AL-SE-VA','[\"Agent\", \"Consignee\", \"Carrier\", \"Global\"]',1,'[\"Export\", \"Freight\"]','[{\"email\": \"rishi.seawave@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"rishi\", \"designation\": \"executive\"}]',NULL,NULL,NULL,NULL),('muggles','United Kingdom','Scotland','Logan','400703','02004263507','jai@3231322.hg.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','1','qwertyuhnfh,gf,','seawave@2323','Seawave Forwarding Logistics','muggles',9,'hogwarts','admin','OrgButton','2025-01-31 17:08:15',0,'muggles-hogwarts-seawave@2323','[\"Shippers\", \"Carrier\", \"Consignee\", \"Agent\"]',1,'[\"Shippers\", \"Carrier\", \"Consignee\", \"Agent\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"hio\", \"contactName\": \"gio\", \"designation\": \"lol\"}]','32','32',NULL,NULL),('tray','India','Maharashtra','Achalpur','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','23','dfgd','seawave@2323','Seawave Forwarding Logistics','Tray ltd pvt',10,'hogwarts','admin','OrgButton','2025-02-01 15:55:17',0,'tray-hogwarts-seawave@2323','[\"Shippers\", \"Agent\", \"Carrier\"]',1,'[\"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"asd\"}]','6','6',NULL,NULL),('muggles','India','Maharashtra','Aheri','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','90','dfgd','seawave@2323','Seawave Forwarding Logistics','muggles',11,'govandi','admin','OrgButton','2025-02-03T09:05:51.367Z',0,'MU-SE-GO','[\"Shippers\"]',1,'[\"Import\", \"Transport\"]','[]','32','32',NULL,NULL),('reliance','India','Maharashtra','Navi Mumbai','400703','8975665231','test@test.com','RATPS8795I','58GST323726432','GDMPM3914G','22','jijamata nagar','seawave@2323','Seawave Forwarding Logistics','Reliance Ltd',12,'lokhandwale','admin','OrgButton','2025-02-03 15:10:00',0,'relience-lokhandwale-seawave@2323','[\"Consignee\", \"Carrier\", \"Global\"]',1,'[\"Import\", \"Freight\", \"Export\"]','[{\"email\": \"kira@gmail.test.in\", \"mobile\": \"8547736904\", \"department\": \"Communications\", \"contactName\": \"kira roshit\", \"designation\": \"executive\"}]',NULL,NULL,NULL,NULL),('aryan','India','Maharashtra','Mumbai','400057','5534667457','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','56','aaa','seawave@2323','Seawave Forwarding Logistics','aryan pvt ltd',23,'Andheri','admin','OrgButton','2025-02-14 12:39:36',0,'aryan-Andheri-seawave@2323','[\"Shippers\"]',1,'[\"Import\"]','[]','12','12',NULL,NULL),('aryan','India','Maharashtra','Mumbai','400067','5534667457','sfdfg@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','68','aaa','seawave@2323','Seawave Forwarding Logistics','aryan',24,'mumbai','admin','OrgButton','2025-02-14 12:44:20',0,'aryan-mumbai-seawave@2323','[\"Shippers\"]',1,'[\"Import\"]','[]',NULL,NULL,NULL,NULL),('testing23','Austria','Vienna','Meidling','400006','9578907467','vadant3@gamil.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','23','aaaa','seawave@2323','Seawave Forwarding Logistics','Testing23',25,'Navi mumbai','admin','OrgButton','2025-02-14 13:05:43',0,'testing23-Navi mumbai-seawave@2323','[]',0,'[]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997298\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"frontend\"}]','12','12',NULL,NULL),('stark','Antigua And Barbuda','Saint John Parish','Potters Village','400006','9876543219','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','23','rrwqewq','seawave@2323','Seawave Forwarding Logistics','stark ltd ',26,'Bihar','admin','OrgButton','2025-02-14 13:13:22',0,'stark-Bihar-seawave@2323','[\"Shippers\"]',1,'[\"Import\", \"Export\", \"Freight\"]','[{\"email\": \"sfdfg@gmail.com\", \"mobile\": \"8655997298\", \"department\": \"head\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]',NULL,NULL,NULL,NULL),('cconnect','Angola','Huíla Province','Jamba','400006','8104834173','rishimuni2002@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','12','qwedsww','seawave@2323','Seawave Forwarding Logistics','cconnect',27,'mumbai','admin','OrgButton','2025-02-14 13:18:05',0,'cconnect-mumbai-seawave@2323','[\"Shippers\"]',1,'[\"Import\"]','[{\"email\": \"shreyashpingle752@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"head\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]',NULL,NULL,NULL,NULL),('testing23','India','Maharashtra','Mumbai','400006','9876543210','asdad','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','68','wws','seawave@2323','Seawave Forwarding Logistics','Testing23',28,'mumbai','admin','OrgButton','2025-02-14 14:24:05',0,'TE-SE-MU','[\"Shippers\"]',1,'[\"Import\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','12','12',NULL,NULL),('tray','Armenia','Tavush Region','Parravak’ar','400614','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','121','xzxzx','seawave@2323','Seawave Forwarding Logistics','Tray ltd pvt',29,'mumbai','admin','OrgButton','2025-02-14 14:49:48',0,'TR-SE-MU','[\"Shippers\"]',0,'[\"Import\"]','[{\"email\": \"asdad\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"ddada\", \"designation\": \"frontend\"}]','121','121',NULL,NULL),('tray','Angola','Lunda Norte Province','Lucapa','400067','9876543219','vadant3@gamil.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','23','qwerty','seawave@2323','Seawave Forwarding Logistics','Tray ltd pvt',30,'mumbai','admin','OrgButton','2025-02-14 14:52:12',0,'TR-SE-MU','[\"Shippers\"]',1,'[\"Import\", \"Transport\"]','[{\"email\": \"asdad\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','23','23',NULL,NULL),('sanjeet','India','Maharashtra','Mumbai','400067','8104834173','asdad','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','12','asas','seawave@2323','Seawave Forwarding Logistics','sanjeet pvt ltd',31,'mumbai','admin','OrgButton','2025-02-14 14:29:01',0,'sanjeet-mumbai-seawave@2323','[\"Shippers\"]',1,'[\"Import\", \"Freight\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','12','12',NULL,NULL),('dummy45','Azerbaijan','Ganja','Ganja','400057','9876543219','dean@aew.in','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','34','sdsdsd','seawave@2323','Seawave Forwarding Logistics','dummy45',32,'Navi mumbai','admin','OrgButton','2025-02-14 14:57:36',0,'dummy45-Navi mumbai-seawave@2323','[\"Shippers\"]',1,'[\"Import\"]','[{\"email\": \"asdad\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]','34','34',NULL,NULL),('fleeters','India','Maharashtra','Airoli','400703','02004263507','jai@323gmail.in','RATPS8795I','27AAICS7836D1Z3','GDMPM3914G','90','dfgd','seawave@2323','Seawave Forwarding Logistics','Fleeters',46,'lokhandwale','admin','OrgButton','2025-03-01 14:51:57',0,'fleeters-lokhandwale-seawave@2323','[\"Consignee\"]',1,'[\"Transport\", \"Export\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"Manager\"}]','12','12',NULL,NULL),('retromood','India','Maharashtra','Akola','400703','02004263507','jai@323gmail.in','AAICS7836D','27GDMPM3914G1Z4','GDMPM3914G','90','dfgd','seawave@2323','Seawave Forwarding Logistics','RetroMood',47,'lokhandwale','admin','OrgButton','2025-03-01 15:24:00',0,'retromood-lokhandwale-seawave@2323','[\"Consignee\"]',1,'[\"Import\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"Manager\"}]','12','12',NULL,NULL),('bluedockers','India','Maharashtra','Akluj','400703','02004263507','jai@323gmail.in','GDMPM3914G','27AAICS7836D1Z3','AAICS7836D','90','dfgd','seawave@2323','Seawave Forwarding Logistics','BlueDockers',48,'Vashi','admin','OrgButton','2025-03-04 17:09:30',0,'bluedockers-Vashi-seawave@2323','[\"Consignee\"]',1,'[\"Freight\", \"Import\", \"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"management\", \"contactName\": \"gio\", \"designation\": \"Manager\"}]','12','12',NULL,NULL),('dummy45','Bahrain','Capital Governorate','Manama','400705','9578907467','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','23',',gulmohar,dadar','seawave@2323','Seawave Forwarding Logistics','dummy45',49,'mumbai','admin','OrgButton','2025-03-26 18:11:19',0,'DU-SE-MU','[\"Shippers\"]',0,'[\"Import\"]','[{\"email\": \"shreyashpingle752@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"head\", \"contactName\": \"IT Seawave\", \"designation\": \"executive\"}]','23','23',NULL,NULL);
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
  `IsDeleted` int DEFAULT '0',
  `deletedby` varchar(40) DEFAULT NULL,
  `createdby` varchar(40) DEFAULT NULL,
  `DeleteRemark` varchar(225) DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of the data of the branches of the organization.\n    ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownbranches`
--

LOCK TABLES `ownbranches` WRITE;
/*!40000 ALTER TABLE `ownbranches` DISABLE KEYS */;
INSERT INTO `ownbranches` VALUES (6,'seawave@2323','Seawave Forwarding Logistics','Mumbai','27AAICS7836D1Z4','AAICS7836D','N .K. MISHRA','7654334323','Juinagar 2.0','Mumbai-2323',0,NULL,NULL,NULL,NULL,NULL),(7,'seawave@2323','Seawave Forwarding Logistics','Jogbani','27GDMPM3914G1Z4','GDMPM3914G','Hemang','98657451222','gjkjsof kdsf fsdfj dffksf kldhnf','Jogbani-2323',0,NULL,NULL,NULL,NULL,NULL),(8,'seawave@2323','Seawave Forwarding Logistics','Delhi','27GDMPM3914G1Z4','GDMPM3914G','Rishi','98657451222','sdfdfsf vsdds','Delhi-2323',0,NULL,NULL,NULL,NULL,NULL),(9,'seawave@2323','Seawave Forwarding Logistics','Kolkata','27GDMPM3914G1Z4','GDMPM3914G','Aayush','98657451222','Kolkata branch demo addresss','Kolkata-2323',0,NULL,NULL,NULL,NULL,NULL),(10,'seatech@23','seatech','Mumbai','27AAICS7836D1Z4','AAICS7836D','kea','345345634','dssd dad','Mumbai-23',0,NULL,NULL,NULL,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='This table store Propects Details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prospect`
--

LOCK TABLES `prospect` WRITE;
/*!40000 ALTER TABLE `prospect` DISABLE KEYS */;
INSERT INTO `prospect` VALUES (1,'384090795947','2024-11-13 13:05:31','admin','vedant','[\"dfsfds\", \"fsdfsdf\", \"sdffs\"]','[\"433454535345\", \"34534545345\"]','[\"dfgdfg@\", \"dfgsdsdgf@\"]','dfgdgf','online','','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','Denmark','Central Denmark Region','400045','Gjellerup'),(2,'pros/24-25/Mumbai/647','2024-11-21 14:19:35','admin','adani','[\"gautam\", \"shreyash\"]','[\"34423424252\", \"42432423422\"]','[\"soldfsdf@gmail.com\", \"dfsfdfsdfs@gmail.com\"]','sdfs,dmfnsfn f sfslf sfs fskfjjfk','online','','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','India','Maharashtra','400058','Alandi');
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
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store reminders for import';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
INSERT INTO `reminders` VALUES ('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA EXPORT ALL',2,'2024-11-22T14:46','Air EXPORT','Delhi','1','00','00','Pending',12,'A/Delhi/E/1/24-25'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',3,'2024-11-24T11:21','Air IMPORT','Jogbani','1','00','00','Pending',8,'Jogbani/A/24-25/12/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','DHH',4,'2024-11-08T11:21','Air IMPORT','Jogbani','2','00','00','Pending',9,'Jogbani/A/24-25/12/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','CUSTOM CLEAREANCE',5,'2024-11-08T11:21','Air IMPORT','Jogbani','2','00','00','Pending',10,'Jogbani/A/24-25/12/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',6,'2024-11-30T14:58','Air IMPORT','Jogbani','1','00','00','Pending',7,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',7,'2024-12-02T14:58','Air IMPORT','Jogbani','1','00','00','Pending',8,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','DHH',8,'2024-11-14T14:58','Air IMPORT','Jogbani','2','00','00','Pending',9,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','CUSTOM CLEAREANCE',9,'2024-11-14T14:58','Air IMPORT','Jogbani','2','00','00','Pending',10,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Test',10,'2024-11-14T14:58','Air IMPORT','Jogbani','1','00','00','Pending',16,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',11,'Invalid date','Air IMPORT','Mumbai','2','00','00','Pending',1,'A/Mumbai/I/24-25/17'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',12,'2024-11-28T10:58','Air IMPORT','Mumbai','2','00','00','Pending',2,'A/Mumbai/I/24-25/17'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',13,'2024-11-23T11:57','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/18'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',14,'2024-11-25T23:57','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/18'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',23,'2024-11-23T14:54','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/21'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',24,'2024-11-25T21:24:00.000Z','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/21'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',25,'2024-11-28T21:24:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/21'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',26,'2024-11-23T15:42','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',27,'2024-11-25T22:12:00.000Z','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',28,'2024-11-28T22:12:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',29,'2024-12-05T22:12:00.000Z','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',30,'2024-11-15T10:10:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',31,'2024-12-13T15:11','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',32,'2024-12-16T03:11','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',33,'2024-12-19T03:11','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',34,'2024-12-26T03:11','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',35,'2024-12-31T03:11','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',36,'2024-12-08T11:49:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',42,'2024-12-27T10:54:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/8'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',46,'2024-12-27T10:48:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/7'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',55,'2024-12-22T02:43','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',56,'2024-12-25T02:43','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',57,'2025-01-01T02:43','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',58,'2025-01-06T02:43','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',59,'2024-12-27T12:29:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',60,'2024-12-21T17:32','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',61,'2024-12-24T05:32','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',62,'2024-12-27T05:32','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',63,'2025-01-03T05:32','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',64,'2025-01-08T05:32','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',65,'2025-01-09T11:31','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',66,'2025-01-11T23:31','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',67,'2025-01-14T23:31','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',68,'2025-01-21T23:31','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',69,'2025-01-26T23:31','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',70,'2025-01-09T10:40:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',71,'2025-01-07T14:15','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',75,'2025-01-25T02:15','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',76,'2025-01-09T10:43:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',77,'2025-01-10T02:15','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',78,'2025-01-13T02:15','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',79,'2025-01-20T02:15','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',82,'2025-01-02T00:21:00.000Z','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/11'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',83,'2025-01-07T00:21:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/11'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',85,'2025-02-06T23:32:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',86,'2025-02-13T23:32:00.000Z','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',87,'2025-02-18T23:32:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',88,'2025-02-06T12:24:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',119,'2024-12-23T00:21:00.000Z','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/11'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',120,'2024-12-26T00:21:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/11'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',138,'2025-03-25T23:24','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/24'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',139,'2025-04-01T23:24','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/24'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',140,'2025-04-06T23:24','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/24'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',141,'2025-02-17T10:04:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',11,'A/Mumbai/I/24-25/24'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','IGM & ETA Details',142,'2025-05-02T12:13','Sea IMPORT','Mumbai','','','','Pending',13,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Scrutiny Documents',143,'2025-05-01T12:13','Sea IMPORT','Mumbai','1','0','0','Pending',14,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Checklist Preparation',144,'2025-05-01T12:13','Sea IMPORT','Mumbai','1','0','0','Pending',15,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','E-Sanchit',145,'2025-05-01T16:13','Sea IMPORT','Mumbai','1','0','0','Pending',16,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Filling BOE',146,'2025-04-27T12:13','Sea IMPORT','Mumbai','1','0','0','Pending',17,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Assessment',147,'2025-04-28T12:13','Sea IMPORT','Mumbai','1','0','0','Pending',18,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Delivery Order',148,'2025-05-03T12:13','Sea IMPORT','Mumbai','1','0','0','Pending',19,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Delivery',149,'2025-05-04T12:13','Sea IMPORT','Mumbai','1','1','1','Pending',20,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Vehicle Placed',150,'2025-05-04T18:13','Sea IMPORT','Mumbai','1','1','1','Pending',21,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Bill Preparation',151,'2025-05-06T18:13','Sea IMPORT','Mumbai','1','0','0','Pending',22,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','Bill Dispatch',152,'2025-05-11T18:13','Sea IMPORT','Mumbai','1','1','1','Pending',23,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"rishi@manager\"}]','POD Confirmation',153,'2025-05-12T18:13','Sea IMPORT','Mumbai','0','0','0','Pending',24,'S/Mumbai/I/24-25/30'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',154,'2025-04-18T06:15:00.000Z','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/23'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',155,'2025-04-20T23:45','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/23'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',156,'2025-04-23T23:45','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/23'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',157,'2025-04-30T23:45','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/23'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',158,'2025-05-05T23:45','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/23'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',159,'2025-02-17T09:53:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',11,'A/Mumbai/I/24-25/23');
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of all the detailed data of the particular workflow as per line of business';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setworkflow`
--

LOCK TABLES `setworkflow` WRITE;
/*!40000 ALTER TABLE `setworkflow` DISABLE KEYS */;
INSERT INTO `setworkflow` VALUES (3,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"aayush@manager\"}]','1','00','00','2025-05-09 05:39:30','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(4,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','ETA','After','02','12','00',0,'E-SANCHIT','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','2','00','00','2024-11-15 10:06:59','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-T\", \"SEZ-M\"]',0,NULL,NULL,NULL,NULL),(5,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','E-SANCHIT','After','03','00','00',0,'PORT CFS NOMINATION','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','01','00','00','2024-11-15 10:07:07','No','Yes','[\"LCL\", \"Break Bulk\", \"FCL\"]','[\"In-Bond\", \"Ex-Bond\", \"SEZ-T\", \"SEZ-Z\", \"SEZ-M\", \"Home\"]',0,NULL,NULL,NULL,NULL),(6,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','PORT CFS NOMINATION','After','07','00','00',0,'processing','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','02','00','00','2024-11-15 10:07:18','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(7,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','processing','After','05','00','00',0,'Scanning ','[{\"username\": \"aayush@manager\"}]','01','00','00','2025-05-08 11:16:10','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\"]',0,NULL,NULL,NULL,NULL),(9,'Air EXPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}]','2','00','00','2024-12-24 12:16:13','No','Yes','[\"FCL\"]','[\"Home\", \"In-Bond\"]',0,NULL,NULL,NULL,NULL),(10,'Air IMPORT','Mumbai','null','Seawave Forwarding Logistics','seawave@2323','','After','','','',1,'ETA','[]','1','','','2025-01-29 07:40:31','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(11,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','After','03','00','00',0,'Packaging','[{\"id\": 25, \"orgcode\": \"seawave@2323\", \"orgname\": \"Seawave Forwarding Logistics\", \"username\": \"aayush@manager\", \"branchcode\": \"Mumbai-2323\", \"ownbranchname\": \"Mumbai\"}]','01','00','00','2025-05-08 10:06:35','Yes','No','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',1,NULL,'admin','qwqw','2025-05-08 00:00:00'),(13,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'IGM & ETA Details','[{\"username\": \"rishi@manager\"}]','','','','2025-03-13 07:15:29','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(14,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','IGM & ETA Details','Before','1','0','0',0,'Scrutiny Documents','[{\"username\": \"rishi@manager\"}]','1','0','0','2025-03-13 07:16:54','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(15,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','IGM & ETA Details','Before','1','0','0',0,'Checklist Preparation','[{\"username\": \"rishi@manager\"}]','1','0','0','2025-03-13 07:18:11','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(16,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','Checklist Preparation','After','0','4','0',0,'E-Sanchit','[{\"username\": \"rishi@manager\"}]','1','0','0','2025-03-13 07:19:19','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(17,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','IGM & ETA Details','Before','5','0','0',0,'Filling BOE','[{\"username\": \"rishi@manager\"}]','1','0','0','2025-03-13 07:21:32','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"SEZ-T\", \"SEZ-M\", \"SEZ-Z\", \"Ex-Bond\", \"In-Bond\"]',0,NULL,NULL,NULL,NULL),(18,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','Filling BOE','After','1','0','0',0,'Assessment','[{\"username\": \"rishi@manager\"}]','1','0','0','2025-03-13 07:23:36','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(19,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','IGM & ETA Details','After','1','0','0',0,'Delivery Order','[{\"username\": \"rishi@manager\"}]','1','0','0','2025-03-13 07:25:26','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(20,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','Delivery Order','After','1','0','0',0,'Delivery','[{\"username\": \"hemang@executive\"}]','1','1','1','2025-03-13 07:28:29','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(21,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','Delivery','After','0','6','0',0,'Vehicle Placed','[{\"username\": \"rishi@manager\"}]','1','1','1','2025-03-13 07:29:25','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(22,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','Vehicle Placed','After','2','0','0',0,'Bill Preparation','[{\"username\": \"rishi@manager\"}]','1','0','0','2025-03-13 07:30:57','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(23,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','Bill Preparation','After','5','0','0',0,'Bill Dispatch','[{\"username\": \"rishi@manager\"}]','1','1','1','2025-03-13 07:31:45','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(24,'Sea IMPORT','All','ALL','Seawave Forwarding Logistics','seawave@2323','Bill Dispatch','After','1','0','0',0,'POD Confirmation','[{\"username\": \"rishi@manager\"}]','0','0','0','2025-03-13 07:32:32','Yes','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]',0,NULL,NULL,NULL,NULL),(25,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'Scanning','[{\"username\": \"aayush@manager\"}]','12','12','12','2025-05-08 09:31:16','Yes','Yes','[\"FCL\"]','[\"Home\"]',1,'admin','admin','qas','2025-05-08 00:00:00'),(26,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',0,'','[]','','','','2025-05-08 09:37:37','','','[]','[]',1,'admin','admin','qw','2025-05-08 00:00:00'),(27,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'processing','[{\"id\": 25, \"orgcode\": \"seawave@2323\", \"orgname\": \"Seawave Forwarding Logistics\", \"username\": \"aayush@manager\", \"branchcode\": \"Mumbai-2323\", \"ownbranchname\": \"Mumbai\"}]','12','12','12','2025-05-08 09:42:13','No','No','[\"FCL\"]','[\"Home\"]',1,'admin','admin','qwqw','2025-05-08 00:00:00'),(29,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','DHH','Before','12','12','23',0,'E-SANCHIT','[]','23','23','23','2025-05-08 11:12:28','No','No','[\"Break Bulk\", \"LCL\"]','[\"SEZ-T\", \"SEZ-M\"]',1,'admin','admin','233','2025-05-08 00:00:00'),(30,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',0,'','[]','','','','2025-05-08 12:10:56','No','No','[]','[]',1,'admin','admin','sdsd','2025-05-08 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingexport`
--

LOCK TABLES `trackingexport` WRITE;
/*!40000 ALTER TABLE `trackingexport` DISABLE KEYS */;
INSERT INTO `trackingexport` VALUES (1,'ETA','2025-02-19T12:48:00.000Z','2025-03-13T18:30','After','22 Days 0 Hours','saasaas','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/E/24-25/4','admin','d hr min','Air EXPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(2,'ETA','2024-12-28T11:41','2025-02-19T12:35','After','53 Days 0 Hours','sanjeet','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/E/24-25/5','admin','d hr min','Air EXPORT','Mumbai','Mumbai-2323','vedant  ltd pvt',0,NULL),(3,'ETA','2025-01-23T16:44',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/E/24-25/2','admin',' d  hr  min','Air EXPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(4,'ETA','2025-02-14T12:06:00.000Z','2025-02-20T17:37','After','6 Days 0 Hours','terer','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/E/24-25/6','admin','d hr min','Air EXPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(5,'ETA','2025-03-15T13:01:00.000Z','2025-03-13T18:31','Before','2 Days 0 Hours','assa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/E/24-25/16','admin','d hr min','Air EXPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(6,'ETA','2025-03-20T11:18:00.000Z','2025-03-20T12:00','Before','0 Days 4 Hours','saaxax','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/E/24-25/15','admin','d hr min','Air EXPORT','Mumbai','Mumbai-2323','solanki ',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingimport`
--

LOCK TABLES `trackingimport` WRITE;
/*!40000 ALTER TABLE `trackingimport` DISABLE KEYS */;
INSERT INTO `trackingimport` VALUES (1,'ETA','2024-11-23T16:35',NULL,NULL,'0 Days 0 Hours','rrerer','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/22','aayush@manager',' d  hr  min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(2,'processing','2024-11-15T16:35',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/22','aayush@manager','07 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(3,'E-SANCHIT','2024-11-26T04:35',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/22','aayush@manager','02 d 12 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(4,'Packaging','2024-11-18T15:40',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/22','aayush@manager','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(5,'PORT CFS NOMINATION','2024-11-15T16:35',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/22','aayush@manager','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(6,'Scanning ','2024-12-31T03:11',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','05 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(7,'ETA','2024-12-13T15:11',NULL,NULL,'0 Days 0 Hours','rrerer','Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin',' d  hr  min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(8,'processing','2024-12-26T03:11',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','07 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(9,'PORT CFS NOMINATION','2024-12-19T03:11',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(10,'E-SANCHIT','2024-12-16T03:11',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','02 d 12 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(11,'Packaging','2024-12-08T17:19',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(12,'ETA','2024-12-23T11:02:00.000Z','2024-12-24T16:36','After','1 Days 0 Hours','rrerer','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/8','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','vedant  ltd pvt',0,NULL),(13,'processing','2025-01-05T04:32','2025-03-19T17:10','After','73 Days 12 Hours','sasaxa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/8','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','vedant  ltd pvt',0,NULL),(14,'Scanning ','2025-01-10T04:32','2025-03-19T17:14','After','68 Days 12 Hours','ssasaax','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/8','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','vedant  ltd pvt',0,NULL),(16,'PORT CFS NOMINATION','2024-12-29T04:32','2025-03-19T16:55','After','80 Days 12 Hours','adawe','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/8','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','vedant  ltd pvt',0,NULL),(17,'E-SANCHIT','2024-12-25T23:02:00.000Z','2024-12-24T16:36','Before','2 Days 13 Hours','sasad','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/8','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(18,'ETA','2024-12-19T11:09:00.000Z','2024-12-24T16:39','After','5 Days 0 Hours','rrerer','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/7','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(19,'processing','2024-12-31T23:09:00.000Z','2025-03-19T17:59','After','77 Days 13 Hours','sawxz','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/7','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(20,'Scanning ','2025-01-06T04:39','2025-03-19T18:06','After','72 Days 13 Hours','asasa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/7','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(22,'PORT CFS NOMINATION','2024-12-25T04:39','2025-03-19T17:59','After','84 Days 13 Hours','sas','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/7','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(23,'E-SANCHIT','2024-12-22T04:39','2025-03-19T17:59','After','87 Days 13 Hours','Testing the working of popup on hovering on remarks in table component','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/7','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(24,'ETA','2024-12-20T12:21:00.000Z',NULL,NULL,'0 Days 0 Hours','rrerer','Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','aayush@manager','d hr min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(25,'processing','2025-01-02T00:21:00.000Z',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','aayush@manager','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(26,'PORT CFS NOMINATION','2024-12-26T00:21:00.000Z',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(27,'Scanning ','2025-01-07T00:21:00.000Z',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','aayush@manager','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(28,'E-SANCHIT','2024-12-23T00:21:00.000Z',NULL,NULL,'0 Days 0 Hours',NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(63,'ETA','2025-02-02T12:28','2025-03-13T14:56','After','39 Days 2 Hours','sasa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(64,'Packaging','2025-02-03T12:28:00.000Z','2025-03-13T14:56','After','37 Days 20 Hours','gdfggfbf','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(65,'Scanning ','2025-02-20T00:28','2025-03-13T14:56','After','21 Days 14 Hours','fdfrfs','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(66,'E-SANCHIT','2025-02-05T00:28','2025-03-13T14:56','After','36 Days 14 Hours','wdw','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(67,'processing','2025-02-15T00:28','2025-03-13T14:56','After','26 Days 14 Hours','rwwadc','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(68,'PORT CFS NOMINATION','2025-02-08T00:28','2025-03-13T14:56','After','33 Days 14 Hours','dvdca','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(69,'Packaging','2025-02-25T09:51:00.000Z','2025-03-13T13:59','After','15 Days 22 Hours','xssxs','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/27','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(70,'ETA','2025-03-01T10:11:00.000Z','2025-03-06T15:41','After','5 Days 0 Hours','dsasa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/27','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(71,'Scanning ','2025-03-18T22:11:00.000Z','2025-03-06T15:41','Before','13 Days 12 Hours','sasaz','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/27','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(72,'PORT CFS NOMINATION','2025-03-06T22:11:00.000Z','2025-03-06T15:41','Before','1 Days 12 Hours','saww','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/27','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(73,'processing','2025-03-13T22:11:00.000Z','2025-03-06T15:41','Before','8 Days 12 Hours','cccc','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/27','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(74,'E-SANCHIT','2025-03-03T22:11:00.000Z','2025-03-06T15:41','After','2 Days 12 Hours','ssxs','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/27','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(86,'Packaging','2025-02-25T07:47:00.000Z','2025-03-20T12:05','After','22 Days 22 Hours','dasdd','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/26','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Testing23',0,NULL),(87,'ETA','2025-03-20T16:52','2025-03-19T18:10','Before','1 Days 23 Hours','ssa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/26','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Testing23',0,NULL),(88,'E-SANCHIT','2025-03-23T04:52','2025-03-19T18:10','Before','4 Days 11 Hours','dsdsd','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/26','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Testing23',0,NULL),(89,'PORT CFS NOMINATION','2025-03-26T04:52','2025-03-20T12:04','Before','5 Days 16 Hours','sana','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/26','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Testing23',0,NULL),(90,'processing','2025-04-02T04:52','2025-03-20T12:04','Before','12 Days 16 Hours','apsa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/26','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Testing23',0,NULL),(91,'Scanning ','2025-04-07T04:52','2025-03-20T12:04','Before','17 Days 16 Hours','sasdada','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/26','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Testing23',0,NULL),(92,'processing','2025-03-14T05:13','2025-03-17T16:46','After','3 Days 11 Hours','asa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/28','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(93,'ETA','2025-03-01T17:13','2025-03-17T16:46','After','15 Days 23 Hours','asas','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/28','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(94,'Scanning ','2025-03-19T05:13','2025-03-17T16:46','Before','2 Days 14 Hours','ccx','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/28','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(95,'E-SANCHIT','2025-03-04T05:13','2025-03-17T16:46','After','13 Days 11 Hours','xxas','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/28','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(96,'PORT CFS NOMINATION','2025-03-07T05:13','2025-03-17T16:46','After','10 Days 11 Hours','we','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/28','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(97,'Packaging','2025-03-08T05:54:00.000Z','2025-03-17T16:46','After','9 Days 5 Hours','dsd','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/28','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL),(98,'Packaging','2025-03-13T11:03:00.000Z','2025-03-13T13:38','Before','1 Days 4 Hours','casz','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/29','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(99,'Packaging','2025-02-17T10:42:00.000Z','2025-03-11T12:45','After','21 Days 20 Hours','azax','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/25','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(100,'Scanning ','2025-03-18T18:56:00.000Z','2025-03-11T12:45','Before','8 Days 13 Hours','sasx','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/25','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(101,'processing','2025-03-13T18:56:00.000Z','2025-03-11T12:45','Before','3 Days 13 Hours','xaxa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/25','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(102,'ETA','2025-03-01T06:56:00.000Z','2025-03-11T12:45','After','10 Days 0 Hours','sasa','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/25','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(103,'E-SANCHIT','2025-03-03T18:56:00.000Z','2025-03-11T12:45','After','7 Days 12 Hours','sasas','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/25','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(104,'PORT CFS NOMINATION','2025-03-06T18:56:00.000Z','2025-03-11T12:45','After','4 Days 12 Hours','dede','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/25','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(105,'ETA','2025-03-01T08:01:00.000Z','2025-03-13T13:38','After','12 Days 0 Hours','asa sadawdaddcddca ewdsw','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/29','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(106,'PORT CFS NOMINATION','2025-03-06T20:01:00.000Z','2025-03-13T13:38','After','6 Days 12 Hours','asa sadawdaddcddca ewdsw','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/29','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(107,'E-SANCHIT','2025-03-03T20:01:00.000Z','2025-03-13T13:38','After','9 Days 12 Hours','asa sadawdaddcddca ewdsw','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/29','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(108,'Scanning ','2025-03-18T20:01:00.000Z','2025-03-13T13:37','Before','6 Days 13 Hours','asa sadawdaddcddca ewdsw','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/29','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(109,'processing','2025-03-13T20:01:00.000Z','2025-03-13T13:37','Before','1 Days 13 Hours','asa sadawdaddcddca ewdsw','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/29','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','sanjeet pvt ltd',0,NULL),(116,'IGM & ETA Details','Invalid date',NULL,'Before',NULL,'as','Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','d hr min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(117,'Scrutiny Documents','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','1d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(118,'Checklist Preparation','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','1d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(119,'E-Sanchit','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','sa','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','0d 4hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(120,'Assessment','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','1d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(121,'Delivery Order','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','1d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(122,'Filling BOE','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','5d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(123,'Delivery','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','1d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(124,'Vehicle Placed','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','0d 6hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(125,'Bill Preparation','Invalid date','2025-04-11T12:12','Before','NaN Days NaN Hours','s','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','2d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(126,'Bill Dispatch','Invalid date','2025-04-11T12:12','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','5d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(127,'POD Confirmation','Invalid date','2025-04-11T12:12','Before','NaN Days NaN Hours','sas','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','1d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(128,'IGM & ETA Details','Invalid date',NULL,'Before',NULL,'as','Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','d hr min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(129,'Scrutiny Documents','Invalid date','2025-04-11T12:11','Before','NaN Days NaN Hours','as','Seawave Forwarding Logistics','seawave@2323','Completed','S/Mumbai/I/24-25/30','admin','1d 0hr 0min','Sea IMPORT','All','Mumbai-2323','adani pvt ltd',0,NULL),(130,'IGM & ETA Details','2025-06-19T12:00',NULL,NULL,NULL,'as','Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin',' d  hr  min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(131,'ETA','2025-04-18T06:15:00.000Z',NULL,'Before',NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/23','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(132,'Scanning ','2025-05-05T23:45',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/23','admin','05 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','muggles',0,NULL),(133,'processing','2025-04-30T23:45',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/23','admin','07 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','muggles',0,NULL),(134,'E-SANCHIT','2025-04-20T23:45',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/23','admin','02 d 12 hr 00 min','Air Import','Mumbai','Mumbai-2323','muggles',0,NULL),(135,'Packaging','2025-02-17T15:23',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/23','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','muggles',0,NULL),(136,'PORT CFS NOMINATION','2025-04-23T23:45',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/23','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','muggles',0,NULL),(137,'Packaging','2025-04-13T07:34:00.000Z','2025-04-11T11:44','Before','2 Days 1 Hours','asas','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/25-26/1','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(138,'Assessment','2025-06-15T12:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','1 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(139,'E-Sanchit','2025-06-18T16:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','0 d 4 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(140,'Filling BOE','2025-06-14T12:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','5 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(141,'Delivery Order','2025-06-20T12:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','1 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(142,'Delivery','2025-06-21T12:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','1 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(143,'Checklist Preparation','2025-06-18T12:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','1 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(144,'Bill Preparation','2025-06-23T18:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','2 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(145,'Vehicle Placed','2025-06-21T18:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','0 d 6 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(146,'Bill Dispatch','2025-06-28T18:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','5 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(147,'POD Confirmation','2025-06-29T18:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','1 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(148,'Scrutiny Documents','2025-06-18T12:00',NULL,NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','S/Mumbai/I/24-25/30','admin','1 d 0 hr 0 min','Sea Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='it will store all transaction dr and cr related to that job number ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionhistory`
--

LOCK TABLES `transactionhistory` WRITE;
/*!40000 ALTER TABLE `transactionhistory` DISABLE KEYS */;
INSERT INTO `transactionhistory` VALUES (9,'A/Mumbai/I/24-25/2','2024-12-26 00:00:00','tye of ecoosdf','42565565','0','100000.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(10,'A/Mumbai/E/24-25/1','2024-12-13 00:00:00','tye of ecoosdf','42565565','0','95000.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(11,'S/Mumbai/I/24-25/4','2024-12-06 00:00:00','pen','55325235525','0','128.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(12,'A/Mumbai/I/24-25/2','2024-12-20 00:00:00','tye of ecoosdf','42565565','0','118.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(13,'A/Mumbai/E/24-25/2','2024-12-27 00:00:00','new laptop','345345354','0','1000.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(14,'A/Mumbai/I/24-25/1','2024-12-18 00:00:00','tye of ecoosdf','34535453','0','1000','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(16,'A/Mumbai/I/24-25/1','2024-12-30 00:00:00','on-account','120','10000','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(17,'A/Mumbai/E/24-25/6','2024-12-31 00:00:00','Bill','5353533','33234.78','0','Seawave Forwarding Logistics','seawave@2323','Bihar',0,NULL),(18,'A/Mumbai/E/24-25/6','2024-12-31 00:00:00','against-bill','501','27800.02','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(40,'A/Mumbai/I/24-25/19','2025-02-09 00:00:00','Bill','45649862565','136.00','0','Seawave Forwarding Logistics','seawave@2323','hogwarts',0,NULL),(44,'A/Mumbai/I/24-25/19','2025-02-13 00:00:00','Bill','45649862565','136.00','0','Seawave Forwarding Logistics','seawave@2323','hogwarts',0,NULL),(45,'S/Mumbai/I/24-25/22','2025-02-13 00:00:00','Bill','45649862565','136.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(50,'S/Mumbai/E/24-25/8','2025-02-13 00:00:00','Bill','','136.00','0','Seawave Forwarding Logistics','seawave@2323','hogwarts',0,NULL),(57,'A/Mumbai/I/24-25/25','2025-02-14 00:00:00','Bill','45649862565','136.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(61,'A/Mumbai/I/24-25/25','2022-02-26 00:00:00','Bill','45649862565','1078.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(65,'A/Mumbai/I/24-25/23','2025-02-23 00:00:00','Bill','billtest00028','1078.00','0','Seawave Forwarding Logistics','seawave@2323','Andheri',0,NULL),(68,'A/Mumbai/I/24-25/12','2025-02-15 00:00:00','Bill','billtest0023','93457.00','0','Seawave Forwarding Logistics','seawave@2323','haryana',0,NULL),(69,'A/Mumbai/E/24-25/6','2025-02-19 00:00:00','Bill','5655454msdhn','93456.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(71,'S/Mumbai/E/24-25/8','2025-02-19 00:00:00','Bill','billtest0002','12427891.00','0','Seawave Forwarding Logistics','seawave@2323','hogwarts',0,NULL),(72,'A/Mumbai/E/24-25/6','2025-02-20 00:00:00','Bill','billtest00232','93457.00','0','Seawave Forwarding Logistics','seawave@2323','Andheri',0,NULL),(73,'A/Mumbai/I/24-25/27','2025-03-01 00:00:00','Bill','BILL-62','93457.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(74,'A/Mumbai/I/24-25/27','2025-03-01 00:00:00','Bill','BILL-63','10036.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(75,'A/Mumbai/I/24-25/27','2025-03-01 00:00:00','Bill','BILL-64','12427892.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(76,'A/Mumbai/I/24-25/27','2025-03-01 00:00:00','Bill','BILL-65','133333.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(77,'A/Mumbai/I/24-25/27','2025-03-03 00:00:00','Bill','BILL-66','93457.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(80,'S/Mumbai/I/24-25/22','2025-03-29 00:00:00','Bill','BILL-71','136.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(81,'S/Mumbai/I/24-25/30','2025-01-01 00:00:00','Bill','BILL-72','136.00','0','Seawave Forwarding Logistics','seawave@2323','mumbai',0,NULL),(83,'S/Mumbai/I/24-25/22','2025-04-11 00:00:00','Bill','BILL-74','0.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(84,'S/Mumbai/I/24-25/22','2025-04-11 00:00:00','Bill','BILL-75','136.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(89,'S/Mumbai/I/24-25/22','2024-09-20 00:00:00','Bill','BILL-80','112121212212121216.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(90,'S/Mumbai/I/24-25/22','2025-04-11 00:00:00','Bill','BILL-81','322.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(91,'S/Mumbai/I/24-25/22','2025-04-11 00:00:00','Bill','BILL-82','10000000.00','0','Seawave Forwarding Logistics','seawave@2323','vapi',0,NULL),(92,'A/Mumbai/E/24-25/6','2025-05-15 00:00:00','on-account','810','','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(93,'A/Mumbai/E/24-25/6','2025-05-15 00:00:00','against-bill','337','','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(94,'A/Mumbai/E/24-25/6','2025-05-15 00:00:00','against-bill','877','','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(95,'A/Mumbai/E/24-25/6','2025-05-15 00:00:00','on-account','960','','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(96,'A/Mumbai/I/24-25/2','2025-05-15 00:00:00','against-bill','877','122222','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(97,'A/Mumbai/I/24-25/2','2025-05-15 00:00:00','on-account','810','122222','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(98,'A/Mumbai/I/24-25/2','2025-05-15 00:00:00','against-bill','337','122222','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(99,'A/Mumbai/I/24-25/2','2025-05-15 00:00:00','on-account','960','122222','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(100,'A/Mumbai/I/24-25/3','2025-05-15 00:00:00','on-account','25-26/10','1223333','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(101,'A/Mumbai/I/24-25/3','2025-05-15 00:00:00','on-account','25-26/11','1223333','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(102,'A/Mumbai/E/24-25/2','2025-05-15 00:00:00','on-account','505','98756','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(103,'A/Mumbai/I/24-25/3','2025-05-15 00:00:00','on-account','26','1234','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(104,'A/Mumbai/I/24-25/3','2025-05-15 00:00:00','on-account','998','1234','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(105,'A/Mumbai/I/24-25/2','2025-05-15 00:00:00','on-account','401','98765','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(106,'A/Mumbai/I/24-25/2','2025-05-15 00:00:00','on-account','913','98765','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(107,'A/Mumbai/I/24-25/2','2025-05-15 00:00:00','on-account','268','98765','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(108,'A/Mumbai/I/24-25/2','2025-05-17 00:00:00','tye of ecoosdf','uihuyh','0','100','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(109,'A/Mumbai/I/24-25/2','2025-05-17 00:00:00','pen','54454546','0','100','Seawave Forwarding Logistics','seawave@2323','Mumbai',1,'2025-06-02 13:08:52'),(110,'A/Mumbai/E/24-25/2','2025-05-18 00:00:00','new laptop','54454546','0','100000','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(111,'A/Mumbai/E/24-25/2','2025-05-18 00:00:00','new laptop','54454546','0','100000','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(112,'A/Mumbai/I/24-25/12','2025-05-28 00:00:00','against-bill','549','93357.00','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(113,'S/Mumbai/I/24-25/30','2025-05-28 00:00:00','against-bill','549','136.00','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(114,'A/Mumbai/E/24-25/6','2025-05-28 00:00:00','against-bill','729','3482.00','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(115,'A/Mumbai/I/24-25/3','2025-05-28 00:00:00','new car purchase','qqaswe','0','1000','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_user_org` (`username`,`orgname`,`orgcode`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store data of user';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userkyctable`
--

LOCK TABLES `userkyctable` WRITE;
/*!40000 ALTER TABLE `userkyctable` DISABLE KEYS */;
INSERT INTO `userkyctable` VALUES (5,'Sanjeet Sawardekar','sanjeet@Developer','9876543210','9876543210','jai@323gmail.in','jai@323gmail.in','123456789012','SAMJS2354J','2025-07-01','2001-02-28','Seawave Forwarding Logistics','seawave@2323','[]','/uploads/kyc/ProfilePhoto/Sanjeet_Sawardekar.jpg','/uploads/kyc/IdProof/Sanjeet_Sawardekar.pdf'),(6,'Aayush Mishra','aayush@manager','9632587410','9512364780','aayush@323gmail.in','aayush@323gmail.in','213456787678945','SAMJ2354J','2023-08-30','2000-02-04','Seawave Forwarding Logistics','seawave@2323','[{\"branchcode\": \"Mumbai-2323\", \"ownbranchname\": \"Mumbai\"}, {\"branchcode\": \"Jogbani-2323\", \"ownbranchname\": \"Jogbani\"}, {\"branchcode\": \"Delhi-2323\", \"ownbranchname\": \"Delhi\"}, {\"branchcode\": \"Kolkata-2323\", \"ownbranchname\": \"Kolkata\"}]','/uploads/kyc/kyc-1747048040459-308283390.jpg',NULL),(15,'Hemang','hemang@executive','02004263507','02004263507','jai@323gmail.in','jai@323gmail.in','980734561234','SAMJ2354J','2025-05-16','2025-05-08','Seawave Forwarding Logistics','seawave@2323','[{\"branchcode\": \"Jogbani-2323\", \"ownbranchname\": \"Jogbani\"}, {\"branchcode\": \"Delhi-2323\", \"ownbranchname\": \"Delhi\"}]','/uploads/kyc/kyc-1747391604141-991180399.jpg',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store user roles for employees in an org ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (3,'HR','Seawave Forwarding Logistics','seawave@2323'),(4,'Developer','Seawave Forwarding Logistics','seawave@2323'),(5,'Manager','Seawave Forwarding Logistics','seawave@2323'),(6,'manager','seatech','seatech@23'),(7,'sales','seatech','seatech@23'),(12,'executive','Seawave Forwarding Logistics','seawave@2323'),(13,'executive','Seawave Forwarding Logistics','seawave@2323'),(14,'koko','Seawave Forwarding Logistics','seawave@2323');
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
  `deleteIntervalForJobsAndOrg` int NOT NULL DEFAULT '45',
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
INSERT INTO `users` VALUES ('admin','12345678','c@2102','C Connect Logi',45),('admin','12345','seatech@23','seatech',45),('admin','12345','seawave@2323','Seawave Forwarding Logistics',6),('test','1234','testorg@123','TestOrg',45),('Test','Test1234','testorg@Test123','TestOrg',45);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the workflow rows ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
INSERT INTO `workflow` VALUES (1,'Air IMPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',0,NULL,NULL,NULL),(4,'Air EXPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',0,NULL,NULL,NULL),(9,'Sea IMPORT','All','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',0,NULL,NULL,NULL),(10,'','All','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',1,'as','2025-05-06 00:00:00','2025-05-06'),(11,'','All','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',1,'as','2025-05-06 00:00:00','2025-05-06'),(12,'Sea IMPORT','Jogbani','Seawave Forwarding Logistics','seawave@2323','2','admin','admin',1,'asas','2025-05-06 00:00:00','2025-05-06'),(13,'Sea IMPORT','Dharashiv','Seawave Forwarding Logistics','seawave@2323','2','admin','admin',1,'a','2025-05-06 00:00:00','2025-05-06'),(14,'Sea IMPORT','Dharashiv','Seawave Forwarding Logistics','seawave@2323','31','admin','admin',1,'a','2025-05-06 00:00:00','2025-05-06'),(15,'Sea IMPORT','Dharashiv','Seawave Forwarding Logistics','seawave@2323','31','admin','admin',1,'d','2025-05-06 00:00:00','2025-05-06'),(16,'test IMPORT','Jogbani','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',1,'d','2025-05-06 00:00:00','2025-05-06'),(17,'test IMPORT','Jogbani','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',1,'d','2025-05-06 00:00:00','2025-05-06'),(18,'Sea IMPORT','Jogbani','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',1,'as','2025-05-06 00:00:00','2025-05-06'),(19,'Sea IMPORT','Jogbani','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',1,'asas','2025-05-06 00:00:00','2025-05-06'),(20,'Sea IMPORT','Jogbani','Seawave Forwarding Logistics','seawave@2323','ALL','admin','admin',1,'a','2025-05-06 00:00:00','2025-05-06'),(21,'test IMPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323','aryan pvt ltd',NULL,'admin',0,NULL,NULL,'2025-05-06');
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

-- Dump completed on 2025-06-03 17:16:10
