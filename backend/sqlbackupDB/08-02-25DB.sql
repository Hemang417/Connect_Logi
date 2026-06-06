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
  `typesofContainer` varchar(45) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvexpjob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalexpjob`
--

LOCK TABLES `approvalexpjob` WRITE;
/*!40000 ALTER TABLE `approvalexpjob` DISABLE KEYS */;
INSERT INTO `approvalexpjob` VALUES (1,'A/Mumbai/E/24-25/1','2025-01-06 16:17:00','2025-01-05 16:16:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','Home','LCL','dummy45','shfjfhs','1','Mumbai','Mumbai-2323','mumbai','adani pvt ltd','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[]','','',NULL,NULL,'[{\"type\": \"40\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"24242\"}, {\"type\": \"20\'\", \"weight\": \"43\", \"container\": 2, \"containerNo\": \"23423\"}]','ExpJobButton','2025-01-06 16:17:45','HBL/HAWB','fetch Persons','40\', 20\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(2,'A/Mumbai/E/24-25/2','2025-01-06 16:19:00','2025-01-05 16:19:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','2','Mumbai','Mumbai-2323','mumbai','adani pvt ltd','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','sdasd','mumbai','[]','','',NULL,NULL,'[{\"type\": \"40\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"12122\"}]','ExpJobButton','2025-01-06 16:19:34','MBL/MAWB','fetch Persons','40\'','123323','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(4,'A/Mumbai/E/24-25/4','2025-01-06 16:27:00','2025-01-05 16:27:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','In-Bond','FCL','dummy45','shfjfhs','4','Mumbai','Mumbai-2323','mumbai','adani pvt ltd','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','dfgdg','mumbai','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"23\", \"container\": 1, \"containerNo\": \"213123\"}, {\"type\": \"20\'\", \"weight\": \"21\", \"container\": 2, \"containerNo\": \"31231\"}]','ExpJobButton','2025-01-06 16:28:00','HBL/HAWB','fetch Persons','20\'','34232','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(5,'A/Mumbai/E/24-25/5','2025-01-06 16:34:00','2025-01-05 16:33:00','Air','Valvada ICD','No','Factory Stuff',1,'No','In-Bond','LCL','dummy45','shfjfhs','5','Mumbai','Mumbai-2323','vapi','vedant  ltd pvt','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"34243\"}]','ExpJobButton','2025-01-06 16:34:04','HBL/HAWB','fetch Persons','20\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(6,'A/Mumbai/E/24-25/6','2025-01-06 17:05:00','2025-01-07 17:05:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','6','Mumbai','Mumbai-2323','Andheri','Allcargo Pvt Ltd','dsdafsfs fsfsdfsf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"44\", \"container\": 1, \"containerNo\": \"552342\"}]','ExpJobButton','2025-01-06 17:06:11','HBL/HAWB','fetch Persons','20\', 40\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(8,'S/Mumbai/E/24-25/8','2025-02-05 11:58:00','2025-02-07 11:57:00','Sea','Mumbai Sea','Yes','Factory Stuff',2,'Yes','In-Bond','LCL','dummy45','dumpy45','8','Mumbai','Mumbai-2323','hogwarts','Tray ltd pvt','dfgd','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI LCS','NHAVA SHEVA','[]','korea','colaba',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"2343\", \"container\": 1, \"containerNo\": \"21343\"}, {\"type\": \"40\'\", \"weight\": \"2344\", \"container\": 2, \"containerNo\": \"45434\"}]','ExpJobButton','2025-02-05 11:58:17','MBL/MAWB','fetch Persons','20\', 40\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL),(9,'S/Mumbai/E/24-25/9','2025-02-05 12:00:00','2025-02-07 11:59:00','Sea','Raxaul LCS','Yes','Dock Stuff',2,'Yes','In-Bond','LCL','dummy45','dumpy45','9','Mumbai','Mumbai-2323','lokhandwale','Reliance Ltd','jijamata nagar','58GST323726432','GDMPM3914G','null','null','[]','gfdcg','korea','2025-02-08 00:00:00','2025-02-06 00:00:00','[{\"type\": \"20\'\", \"weight\": \"3232\", \"container\": 1, \"containerNo\": \"454545\"}, {\"type\": \"20\'\", \"weight\": \"43434\", \"container\": 2, \"containerNo\": \"232323\"}]','ExpJobButton','2025-02-05 12:00:24','MBL/MAWB','fetch Persons','20\'','53455','admin','seawave@2323','Seawave Forwarding Logistics','5545',0,NULL,NULL,NULL);
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
  `typesofContainer` varchar(45) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvaljob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalimpjob`
--

LOCK TABLES `approvalimpjob` WRITE;
/*!40000 ALTER TABLE `approvalimpjob` DISABLE KEYS */;
INSERT INTO `approvalimpjob` VALUES (3,'A/Mumbai/I/24-25/2','2024-12-24 11:09:00','2024-12-23 11:07:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','SEZ-Z','LCL','afsgsgfg','fssfgsggs','HBL/HAWB','fetch Persons','20\'','353543','Seawave Forwarding Logistics','seawave@2323','admin','dggg','Surrender','345444','Yearly','2','Mumbai','Mumbai-2323','Tray ltd pvt','hogwarts','dfgd','27GDMPM3914G1Z4','GDMPM3914G','sfsfdfs','dgfgdg','[]','jharkhand','Mumbai','2024-12-26 00:00:00','2024-12-25 00:00:00','[{\"type\": \"20\'\", \"weight\": \"45kg\", \"container\": 1, \"containerNo\": \"454534\"}, {\"type\": \"20\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"53453\"}]','ImpJobButton','2024-12-24 11:09:49',0,NULL,NULL,NULL),(4,'A/Mumbai/I/24-25/3','2024-12-24 15:03:00','2024-12-24 15:03:00','Air','Kolkata Sea','Yes','Loaded',2,'No','Home','LCL','ffdffwe','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\'','56464656','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','3','Mumbai','Mumbai-2323','Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dgfgdg','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"43kg\", \"container\": 1, \"containerNo\": \"3244\"}, {\"type\": \"40\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"23442\"}]','ImpJobButton','2024-12-24 15:03:52',0,NULL,NULL,NULL),(5,'S/Mumbai/I/24-25/4','2024-12-24 15:49:00','2024-12-23 15:48:00','Sea','Mumbai Sea','No','Loaded',1,'No','Home','LCL','dummy45','gfdfgdg','HBL/HAWB','fetch Persons','20\'','5242353','Seawave Forwarding Logistics','seawave@2323','admin','4','Original','424343','Yearly','4','Mumbai','Mumbai-2323','vedant  ltd pvt','vapi','sgsgsgs','27AAICS7836D1Z3','AAICS7836D','ggdgsgs','dsfgdfhddh','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"5.5Ton\", \"container\": 1, \"containerNo\": \"354535354\"}]','ImpJobButton','2024-12-24 15:49:46',0,NULL,'',NULL),(7,'S/Mumbai/I/24-25/6','2024-12-24 16:11:00','2024-12-31 16:11:00','Sea','Raxaul LCS','Yes','Destuff',2,'Yes','In-Bond','Break Bulk','dummy45','dumpy45','HBL/HAWB','fetch Persons','40\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','234234','One-Time','6','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[]','jharkhand','Mumbai','2024-12-31 00:00:00','2024-12-24 00:00:00','[{\"type\": \"40\'\", \"weight\": \"12\", \"container\": 1, \"containerNo\": \"32112341\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"24\", \"container\": 2, \"containerNo\": \"41341341\"}]','ImpJobButton','2024-12-24 16:11:53',0,NULL,NULL,NULL),(8,'A/Mumbai/I/24-25/7','2024-12-24 16:18:00','2024-12-25 16:18:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','HBL/HAWB','fetch Persons','20\', 40\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Original','5545','Yearly','7','Mumbai','Mumbai-2323','Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[]','jharkhand','Mumbai','2024-12-28 00:00:00','2024-12-26 00:00:00','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"32344\"}, {\"type\": \"20\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"42343\"}]','ImpJobButton','2024-12-24 16:18:44',0,NULL,NULL,NULL),(9,'A/Mumbai/I/24-25/8','2024-12-24 16:24:00','2024-12-23 16:23:00','Air','Mumbai Sea','Yes','Destuff',2,'Yes','Home','LCL','affd','dffgs','MBL/MAWB','fetch Persons','20\', 40\'','23423542','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','331231','One-Time','8','Mumbai','Mumbai-2323','vedant  ltd pvt','Andheri','hddhf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','dsss','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"234234\"}, {\"type\": \"40\'\", \"weight\": \"354\", \"container\": 2, \"containerNo\": \"423423\"}]','ImpJobButton','2024-12-24 16:24:40',0,NULL,NULL,NULL),(15,'A/Mumbai/I/24-25/9','2024-12-24 17:07:00','2024-12-23 17:06:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 40\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','55455','One-Time','9','Mumbai','Mumbai-2323','Tray ltd pvt','Bihar','werwe wfqwfa afsa faasfa f','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','jharkhand','Mumbai','2024-12-24 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"433\", \"container\": 1, \"containerNo\": \"344242\"}, {\"type\": \"40\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"423442\"}]','ImpJobButton','2024-12-24 17:07:13',0,NULL,NULL,NULL),(16,'A/Mumbai/I/24-25/10','2024-12-24 17:08:00','2024-12-23 17:07:00','Air','Mumbai Sea','No','Destuff',2,'Yes','Home','FCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','10','Mumbai','Mumbai-2323','adani pvt ltd','Bihar','sdgdgs','27AAICS7836D1Z3','AAICS7836D','sdfsf','NHAVA SHEVA','[]','jharkhand','nepal','2024-12-27 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"445\", \"container\": 1, \"containerNo\": \"453453\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"44\", \"container\": 2, \"containerNo\": \"45345\"}]','ImpJobButton','2024-12-24 17:08:36',0,NULL,NULL,NULL),(17,'A/Mumbai/I/24-25/11','2024-12-24 17:10:00','2024-12-23 17:10:00','Air','Mumbai Sea','No','Destuff',2,'No','In-Bond','FCL','dummy45','34234','HBL/HAWB','fetch Persons','40\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','342342','Yearly','11','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','','',NULL,NULL,'[{\"type\": \"40\'\", \"weight\": \"342\", \"container\": 1, \"containerNo\": \"424234\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"33\", \"container\": 2, \"containerNo\": \"3423\"}]','ImpJobButton','2024-12-24 17:10:55',0,NULL,NULL,NULL),(20,'A/Mumbai/I/24-25/12','2024-12-24 17:37:00','2024-12-25 17:36:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','HBL/HAWB','fetch Persons','20\', 40\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','12','Mumbai','Mumbai-2323','adani pvt ltd','haryana','fsdfafdf','27AAICS7836D1Z3','AAICS7836D','asdffa','dsfafa','[]','jharkhand','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','[{\"type\": \"20\'\", \"weight\": \"56\", \"container\": 1, \"containerNo\": \"3534\"}, {\"type\": \"40\'\", \"weight\": \"66\", \"container\": 2, \"containerNo\": \"3453\"}]','ImpJobButton','2024-12-24 17:37:33',0,NULL,NULL,NULL),(21,'A/Mumbai/I/24-25/13','2024-12-24 17:59:00','2024-12-23 17:59:00','Air','Kolkata Sea','Yes','Loaded',1,'No','Ex-Bond','LCL','dummy45','gfdfgdg','HBL/HAWB','fetch Persons','20\'','53455','Seawave Forwarding Logistics','seawave@2323','aayush@manager','2','','42352','Yearly','13','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1}]','ImpJobButton','2024-12-24 17:59:35',0,NULL,NULL,NULL),(24,'A/Mumbai/I/24-25/16','2025-01-06 16:30:00','2025-01-05 16:29:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','LCL','dummy45','shfjfhs','HBL/HAWB','fetch Persons','20\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','16','Mumbai','Mumbai-2323','Allcargo Pvt Ltd','Andheri','dsdafsfs fsfsdfsf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','jharkhand','hhjh','2025-01-26 00:00:00','2025-01-25 00:00:00','[{\"type\": \"20\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"2344\"}, {\"type\": \"20\'\", \"weight\": \"3\", \"container\": 2, \"containerNo\": \"4233\"}]','ImpJobButton','2025-01-06 16:30:10',0,NULL,NULL,NULL),(25,'A/Mumbai/I/24-25/17','2025-01-07 11:16:00','2025-01-06 11:14:00','Air','Kolkata Sea','Yes','Loaded',2,'No','Home','','dummy45','dumpy45','HBL/HAWB','fetch Persons','20\', 40\', 20\' ISO Tank','53455','Seawave Forwarding Logistics','seawave@2323','admin','4','Surrender','5545','Yearly','17','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','sdasd','dsfafa','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"44134\"}, {\"type\": \"40\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"24242\"}]','ImpJobButton','2025-01-07 11:17:07',0,NULL,NULL,NULL),(26,'S/Mumbai/I/24-25/18','2025-01-29 13:03:00','2025-01-30 13:01:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','dummy45','dumpy45','HBL/HAWB','fetch Persons','40\'','dummy67','Seawave Forwarding Logistics','seawave@2323','admin','98','Surrender','55455','Yearly','18','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-01-29 13:03:15',0,NULL,NULL,NULL),(29,'S/Mumbai/I/24-25/21','2025-02-04 13:23:00','2025-02-06 13:20:00','Sea','Raxaul LCS','Yes','Destuff',2,'Yes','Ex-Bond','FCL','dummy45','shfjfhs','MBL/MAWB','fetch Persons','20\'','dummy67','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','21','Mumbai','Mumbai-2323','','Andheri','dsdafsfs fsfsdfsfSanjeet','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"status\": \"Reject\", \"employeename\": \"hemang@executive\"}]','colaba','gfhn','2025-02-07 00:00:00','2025-02-04 00:00:00','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-02-04 13:23:53',0,NULL,NULL,NULL),(30,'S/Mumbai/I/24-25/22','2025-02-05 12:03:00','2025-02-07 12:02:00','Sea','Kolkata Sea','Yes','Loaded',2,'No','Home','FCL','vhvhg','dumpy45','MBL/MAWB','fetch Persons','20\'','53455','Seawave Forwarding Logistics','seawave@2323','admin','2','Surrender','5545','Yearly','22','Mumbai','Mumbai-2323','vedant  ltd pvt','vapi','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHE','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','ImpJobButton','2025-02-05 12:03:59',0,NULL,NULL,NULL),(31,'A/Mumbai/I/24-25/23','2025-02-07 14:59:00','2025-02-05 14:59:00','Air','Kolkata Sea','Yes','Destuff',1,'No','Home','FCL','3','ds','HBL/HAWB','fetch Persons','40\' ISO Tank','asdds','Seawave Forwarding Logistics','seawave@2323','admin','asd','Surrender','22','One-Time','23','Mumbai','Mumbai-2323','adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','ds','as','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}]','','',NULL,NULL,'[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','ImpJobButton','2025-02-07 14:59:45',0,NULL,NULL,NULL);
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
  `showClientCode` tinyint DEFAULT '0',
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the organizations before approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalorg`
--

LOCK TABLES `approvalorg` WRITE;
/*!40000 ALTER TABLE `approvalorg` DISABLE KEYS */;
INSERT INTO `approvalorg` VALUES ('allcargo','India','Maharashtra','Mumbai','4000044','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','31','dsdafsfs fsfsdfsfSanjeet','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd','Andheri','admin',1,'OrgButton',NULL,'2025-01-04 15:54:28',0,NULL,NULL,'[\"Consignee\", \"Global\", \"Services\", \"Shippers\"]','[\"Consignee\", \"Global\", \"Services\", \"Shippers\"]','[{\"email\": \"dean@aew.com\", \"mobile\": \"8655997234\", \"department\": \"management\", \"contactName\": \"Rishi\", \"designation\": \"Manager\"}, {\"email\": \"asd@gmila.in\", \"mobile\": \"2345145896\", \"department\": \"IT\", \"contactName\": \"Ayush\", \"designation\": \"Executive\"}]',1,NULL),('adani','Argentina','La Rioja','Villa Bustos','400614','9876543219','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','68','dasdas asdadfadf','seawave@2323','Seawave Forwarding Logistics','adani pvt ltd','mumbai','admin',2,'OrgButton',NULL,'2025-01-04 15:56:47',0,NULL,NULL,'[\"Consignee\", \"Carrier\", \"Global\"]','[\"Consignee\", \"Carrier\", \"Global\", \"Import\", \"Transport\", \"Freight\"]','[]',1,NULL),('vedant','East Timor','Manufahi Municipality','Fatuberliu','400614','5646456645','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','78','sdffafas dafafafa','seawave@2323','Seawave Forwarding Logistics','vedant  ltd pvt','vapi','admin',3,'OrgButton',NULL,'2025-01-04 15:57:40',0,NULL,NULL,'[\"Global\", \"Services\"]','[\"Import\", \"Transport\", \"Freight\", \"Export\"]','[{\"email\": \"it.seawave21@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"vedant\", \"designation\": \"executive\"}]',1,NULL),('solanki','Armenia','Armavir Region','Aknalich','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','89','dasdasd adfsada adsfsgsda','seawave@2323','Seawave Forwarding Logistics','solanki ','Andheri','admin',4,'OrgButton',NULL,'2025-01-04 15:59:14',0,NULL,NULL,'[\"Consignee\", \"Carrier\", \"Global\", \"Agent\"]','[\"Transport\", \"Import\", \"Freight\", \"Export\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]',1,NULL),('muggles','United Kingdom','Scotland','Logan','400703','02004263507','jai@3231322.hg.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','90','qwertyuhnfh,gf,','seawave@2323','Seawave Forwarding Logistics','muggles','hogwarts','admin',7,'OrgButton',NULL,'2025-01-31 17:08:15',0,NULL,NULL,'[\"Shippers\", \"Carrier\", \"Services\", \"Consignee\", \"Agent\", \"Global\"]','[\"Import\", \"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"hio\", \"contactName\": \"gio\", \"designation\": \"gio\"}]',1,NULL),('tray','India','Maharashtra','Achalpur','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','77','dfgd','seawave@2323','Seawave Forwarding Logistics','Tray ltd pvt','hogwarts','admin',8,'OrgButton',NULL,'2025-02-01 15:55:17',0,NULL,NULL,'[\"Shippers\", \"Agent\", \"Carrier\"]','[\"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"asd\"}]',1,NULL),('','','','','','','','','','','','','seawave@2323','Seawave Forwarding Logistics','','','admin',10,'OrgButton',NULL,'2025-02-04 14:28:24',0,NULL,'delete','[]','[]','[]',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the name of the approver list of a particular organization';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approverlist`
--

LOCK TABLES `approverlist` WRITE;
/*!40000 ALTER TABLE `approverlist` DISABLE KEYS */;
INSERT INTO `approverlist` VALUES ('Seawave Forwarding Logistics','seawave@2323',3,'Import Job Creation','Mumbai','Mumbai-2323','[\"ImpJobButton\"]',1),('Seawave Forwarding Logistics','seawave@2323',5,'Import Job Creation','Jogbani','Jogbani-2323','[\"ImpJobButton\"]',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store all the names of users for a particular approval list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvername`
--

LOCK TABLES `approvername` WRITE;
/*!40000 ALTER TABLE `approvername` DISABLE KEYS */;
INSERT INTO `approvername` VALUES (8,'Seawave Forwarding Logistics','seawave@2323','Import Job Creation','hemang@executive','Jogbani','Jogbani-2323','[\"ImpJobButton\"]',5),(26,'Seawave Forwarding Logistics','seawave@2323','Import Job Creation','hemang@executive','Mumbai','Mumbai-2323','[\"ImpJobButton\"]',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is for access of users for their org branches ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchaccess`
--

LOCK TABLES `branchaccess` WRITE;
/*!40000 ALTER TABLE `branchaccess` DISABLE KEYS */;
INSERT INTO `branchaccess` VALUES (5,'Mumbai','Mumbai-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(6,'Mumbai','Mumbai-2323','rishi@manager','Seawave Forwarding Logistics','seawave@2323'),(7,'Mumbai','Mumbai-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(8,'Jogbani','Jogbani-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(9,'Jogbani','Jogbani-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(11,'Delhi','Delhi-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(12,'Delhi','Delhi-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(13,'Kolkata','Kolkata-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(14,'Kolkata','Kolkata-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(15,'Jogbani','Jogbani-2323','rishi@manager','Seawave Forwarding Logistics','seawave@2323'),(16,'Delhi','Delhi-2323','rishi@manager','Seawave Forwarding Logistics','seawave@2323'),(17,'Kolkata','Kolkata-2323','rishi@manager','Seawave Forwarding Logistics','seawave@2323'),(18,'Mumbai','Mumbai-23','ved@manager','seatech','seatech@23');
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
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the branches table that are linked to organizations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'vashi','seaconnect','seawave@2323','1',0,NULL),(2,'vashi','forte services','seawave@2323','1',0,NULL),(3,'vashi','seaconnect','seawave@2323','2',0,NULL),(4,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','3',0,NULL),(5,'Ahemdabad','Seatech','seawave@2323','4',0,NULL),(6,'vashi','seaconnect','seawave@2323','1',0,NULL),(7,'telangana','erte retgdf','seawave@2323','2',0,NULL),(8,'telangana','erte retgdf','seawave@2323','1',0,NULL),(9,'Parel','seaconnect','seawave@2323','2',0,NULL),(10,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1',0,NULL),(11,'vashi','seaconnect','seawave@2323','1',0,NULL),(12,'Patna','uneed services','seawave@2323','2',0,NULL),(13,'vashi','seaconnect','seawave@2323','1',0,NULL),(14,'vashi','uneed services','seawave@2323','1',0,NULL),(15,'Parel','accenture services','seawave@2323','2',0,NULL),(16,'Jaipur','Apexsea Logistics Pvt Ltd','seawave@2323','3',0,NULL),(17,'telangana','seaconnect','seawave@2323','1',0,NULL),(18,'Parel','seaconnect','seawave@2323','1',0,NULL),(19,'vashi','seaconnect','seawave@2323','1',0,NULL),(20,'Patna','seaconnect','seawave@2323',NULL,0,NULL),(21,'Jaipur','uneed services','seawave@2323','1',0,NULL),(22,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1',0,NULL),(23,'Jaipur','forte services','seawave@2323','1',0,NULL),(24,'telangana','seaconnect','seawave@2323','1',0,NULL),(25,'Raipur','seaconnect','seawave@2323','1',0,NULL),(26,'Null','seaconnect','seawave@2323','1',0,NULL),(27,'vashi','accenture services','seawave@2323','2',0,NULL),(28,'Uganda','Apexsea Logistics Pvt Ltd','seawave@2323','3',0,NULL),(29,'Jaipur','forte services','seawave@2323','4',0,NULL),(30,'goat','BHaijan','seawave@2323','5',0,NULL),(31,'Parel','tttt','seawave@2323','6',0,NULL),(32,'bhais','tttt','seawave@2323','7',0,NULL),(33,'buffalo','ggggggggg','seawave@2323','8',0,NULL),(34,'injection','iiiii','seawave@2323','9',0,NULL),(35,'done','done','seawave@2323','10',0,NULL),(36,'jhaatu','dummy','seawave@2323','11',0,NULL),(37,'kerala','test','seawave@2323','12',0,NULL),(38,'Himalaya','uneed services','seawave@2323','13',0,NULL),(39,'thth','ff','seawave@2323','14',0,NULL),(40,'final','Final Test','seawave@2323','15',0,NULL),(41,'finale','Final','seawave@2323','16',0,NULL),(42,'DJ','Final Test','seawave@2323','17',0,NULL),(43,'Ghatkopar','Final Test','seawave@2323','18',0,NULL),(44,'render','Final Render Test','seawave@2323','19',0,NULL),(45,'dsf','final G','seawave@2323','20',0,NULL),(46,'finale','final G','seawave@2323','21',0,NULL),(47,'dy','Final Render Test','seawave@2323','22',0,NULL),(48,'Alephata','JamJam','seawave@2323','23',0,NULL),(49,'test branch','Test Organization','seawave@2323','24',0,NULL),(50,'Jamacia','usain bolt','seawave@2323','25',0,NULL),(51,'approver','ApproverLog Test Dummy','seawave@2323','26',0,NULL),(52,'kurla','vector','seawave@2323','27',0,NULL),(53,'vashi','seaconnect','seawave@2323','1',0,NULL),(54,'telangana','erte retgdf','seawave@2323','1',0,NULL),(55,'Belapur','seaconnect','seawave@2323','2',0,NULL),(56,'ghana','Gazai Medicals','seawave@2323','3',0,NULL),(57,'sfsdf','Apexsea Logistics Pvt Ltd','seawave@2323','4',0,NULL),(58,'ginger','uneed services','seawave@2323','5',0,NULL),(59,'DJ','Final Test','seawave@2323','6',0,NULL),(60,'hareshwar','Hari Hareshwar','seawave@2323','7',0,NULL),(61,'nanded','Damru','seawave@2323','8',0,NULL),(62,'Miami','GTA','seawave@2323','9',0,NULL),(63,'motif','Notif Test','seawave@2323','10',0,NULL),(64,'DJ','Final Render Test','seawave@2323','11',0,NULL),(65,'Allorg','Notification Test Final','seawave@2323','12',0,NULL),(66,'abc','XYZ XYZ','seawave@2323','13',0,NULL),(67,'zaza','zaza test','seawave@2323','14',0,NULL),(68,'haland','Hazardous notification','seawave@2323','15',0,NULL),(69,'gdsfds','usain bolt','seawave@2323','16',0,NULL),(70,'Hindustan','Rooster','seawave@2323',NULL,0,NULL),(71,'haridwar','Heritage Motors','seawave@2323',NULL,0,NULL),(72,'dsfdsf','fsdgfsf','seawave@2323',NULL,0,NULL),(73,'nigeria','nij','seawave@2323',NULL,0,NULL),(74,'KJ Somaiya','gds','seawave@2323',NULL,0,NULL),(75,'dfgdfg','dgdfg','seawave@2323',NULL,0,NULL),(76,'dummy','dfgdfg','seawave@2323',NULL,0,NULL),(77,'gfg','dgdfsd','seawave@2323',NULL,0,NULL),(78,'dsg','fsdf','seawave@2323',NULL,0,NULL),(79,'hyderbad','seaconnect','seawave@2323','1',0,NULL),(80,'hydrebad','uneed services','seawave@2323','1',0,NULL),(81,'patna','Apexsea Logistics Pvt Ltd','seawave@2323','1',0,NULL),(88,'juinagar','Prince LLP','seawave@2323','7',0,NULL),(90,'Mumbai','Vedant PVT LTD','seawave@2323','10',0,NULL),(91,'Mumbai','Vedant PVT LTD','seawave@2323','10',0,NULL),(92,'mumbai','dummy3','seawave@2323',NULL,0,NULL),(93,'mumbai','dummy3 Pvt ltd','seawave@2323','13',0,NULL),(95,'Pune','Allcargo Pvt Ltd','seatech@23','15',0,NULL),(99,'panjab','vedant pvt ltd','seawave@2323',NULL,0,NULL),(106,'Bihar','Tray ltd pvt','seawave@2323','3',0,NULL),(111,'Pune','Tray ltd pvt','seawave@2323',NULL,0,NULL),(130,'mumbai','Tray ltd pvt','seawave@2323','15',0,NULL),(131,'haryana','Tray ltd pvt','seawave@2323','16',0,NULL),(141,'Andheri','dummyn pvt','seawave@2323','18',0,NULL),(142,'juinagar','dummyn pvt','seawave@2323','19',0,NULL),(151,'Andheri','dummyn pvt','seawave@2323','28',0,NULL),(152,'Bihar','Tray ltd pvt','seawave@2323','29',0,NULL),(154,'Andheri','solanki ','seawave@2323',NULL,0,NULL),(155,'Andheri','solanki ','seawave@2323',NULL,0,NULL),(156,'Andheri','solanki ','seawave@2323',NULL,0,NULL),(158,'Pune','solanki ','seawave@2323','31',0,NULL),(159,'mumbai','solanki ','seawave@2323','32',0,NULL),(160,'Bihar','solanki ','seawave@2323','33',0,NULL),(161,'Bihar','solanki ','seawave@2323','34',0,NULL),(162,'mumbai','dummy99','seawave@2323','35',1,'2025-01-09 14:26:48'),(163,'vapi','dummy999','seawave@2323','36',0,NULL),(164,'haryana','dummy88','seawave@2323','37',0,NULL),(165,'mumbai','dummy55','seawave@2323','38',0,NULL),(167,'haryana','dummy1111','seawave@2323','40',0,NULL),(168,'haryana','dummy1111','seawave@2323','40',0,NULL),(169,'haryana','dummy1111','seawave@2323','40',0,NULL),(172,'Andheri','solanki ','seawave@2323','43',0,NULL),(177,'haryana','solanki ','seawave@2323','48',0,NULL),(178,'mumbai','Tray ltd pvt2.0','seawave@2323','49',0,NULL),(179,'Andheri','dummy765','seawave@2323','50',0,NULL),(180,'Andheri','Allcargo Pvt Ltd','seawave@2323','1',0,NULL),(181,'mumbai','adani pvt ltd','seawave@2323','2',0,NULL),(182,'vapi','vedant  ltd pvt','seawave@2323','3',0,NULL),(183,'Andheri','solanki ','seawave@2323','4',0,NULL),(184,'Pune','solanki ','seawave@2323','5',0,NULL),(185,'Juinagar ','Seawave Logistic Pvt Ltd','seawave@2323','6',1,'2025-01-09 14:26:45'),(186,'haryana','dummy99','seawave@2323','7',1,'2025-01-09 14:26:48'),(187,'vapi','Allcargo Pvt Ltd','seawave@2323','8',0,NULL),(188,'hogwarts','muggles','seawave@2323','9',0,NULL),(189,'hogwarts','Tray ltd pvt','seawave@2323','10',0,NULL),(190,'govandi','muggles','seawave@2323','11',0,NULL),(191,'lokhandwale','Relience Ltd','seawave@2323','12',1,'2025-02-05 16:07:27'),(192,'lokhandwale','Relience Ltd','seawave@2323','13',1,'2025-02-05 16:07:27'),(193,'','','seawave@2323','14',0,NULL),(194,'lokhandwale','Relience Ltd','seawave@2323','15',1,'2025-02-05 16:07:27'),(195,'','','seawave@2323','16',0,NULL),(196,'lokhandwale','Relience Ltd','seawave@2323','17',1,'2025-02-05 16:07:27'),(197,'','','seawave@2323','18',0,NULL),(198,'lokhandwale','Relience Ltd','seawave@2323','19',1,'2025-02-05 16:07:27'),(199,'','','seawave@2323','20',0,NULL),(200,'','','seawave@2323','21',0,NULL),(201,'','','seawave@2323','22',0,NULL);
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
  `Date` varchar(255) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `billNo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `amount` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `Tax` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `grandTotal` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `FollowUp1` date DEFAULT NULL,
  `FollowUp2` date DEFAULT NULL,
  `FollowUp3` date DEFAULT NULL,
  `TimeDelay` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `AssignTo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `checkbox` tinyint DEFAULT '0',
  `createdby` varchar(50) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `IsDeleted` tinyint DEFAULT '0',
  `DeleteRemark` varchar(255) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `deletedby` varchar(50) COLLATE utf8mb4_0900_as_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='collection table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES (6,'A/Mumbai/I/24-25/1','Seawave Forwarding Logistics','seawave@2323','Andheri','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-21','4563455234','4535','4534','9069.00','2025-02-04','2025-02-11','2025-02-18','','Hemang Ranjan',0,NULL,0,NULL,NULL,NULL),(7,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','Bihar','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-26','52354222','58','3424','3482.00','2025-02-09','2025-02-16','2025-02-23','','Hemang Ranjan',0,NULL,0,NULL,NULL,NULL),(8,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','Bihar','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-26','32342342','4242434','7844','4250278.00','2025-02-09','2025-02-16','2025-02-23','','Rishi Mishra',0,NULL,0,NULL,NULL,NULL),(9,'A/Mumbai/E/24-25/6','Seawave Forwarding Logistics','seawave@2323','Bihar','Mumbai-2323','Mumbai','vedant  ltd pvt','2024-12-31','5353533','10000.78','23234','33234.78','2025-02-14','2025-02-21','2025-02-28','','Hemang Ranjan',0,NULL,0,NULL,NULL,NULL),(11,'A/Mumbai/I/24-25/13','Seawave Forwarding Logistics','seawave@2323','mumbai','Mumbai-2323','Mumbai','adani pvt ltd','2025-01-29','billtest0001','10000','83456','93456.00','2025-04-07','2025-04-14','2025-04-21',NULL,'Rishi Mishra',0,NULL,0,NULL,NULL,NULL),(14,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-02-07','billtest0001','1000','3','1003.00','2025-02-12','2025-02-19','2025-02-26',NULL,'Hemang Ranjan',0,NULL,0,NULL,NULL,NULL),(15,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-02-01','billtest0003','1000','36','1036.00','2025-03-03','2025-03-10','2025-03-17',NULL,'Rishi Mishra',0,NULL,0,NULL,NULL,NULL),(16,'S/Mumbai/E/24-25/8','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','Tray ltd pvt','2025-02-07','saadd','12344435','1233','12345668.00','2025-04-25','2025-05-02','2025-05-09','','Rishi Mishra',0,NULL,0,NULL,NULL,NULL),(17,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-02-07','billtest0002','10000','83456','93456.00','2025-02-08','2025-02-15','2025-02-22','','Aayush Mishra',0,'admin',0,NULL,NULL,'admin'),(18,'A/Mumbai/I/24-25/19','Seawave Forwarding Logistics','seawave@2323','hogwarts','Mumbai-2323','Mumbai','muggles','2025-02-07','billtest0002','10000','83457','93457.00','2025-03-09','2025-03-16','2025-03-23','','Rishi Mishra',0,'admin',0,NULL,NULL,NULL);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='credit details are store in this table ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit`
--

LOCK TABLES `credit` WRITE;
/*!40000 ALTER TABLE `credit` DISABLE KEYS */;
INSERT INTO `credit` VALUES (1,'509','2024-12-26','2024-12-25','All','existing','All','against-bill','sfskdgfsju','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/6\", \"billNoForAgainstBill\": {\"label\": \"52354222\", \"value\": \"52354222\", \"jobnumber\": \"A/Mumbai/E/24-25/6\", \"grandTotal\": \"3482.00\"}, \"billamountForAgainstBill\": \"3482.00\", \"tdsDeductionForAgainstBill\": \"12\", \"totalReceivableForAgainstBill\": \"3470.00\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','3470'),(2,'904','2024-12-26','2024-12-31','SBI','existing','All','against-bill','none','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/6\", \"billNoForAgainstBill\": {\"label\": \"32342342\", \"value\": \"32342342\", \"jobnumber\": \"A/Mumbai/E/24-25/6\", \"grandTotal\": \"4250278.00\"}, \"billamountForAgainstBill\": \"4250278.00\", \"tdsDeductionForAgainstBill\": \"10\", \"totalReceivableForAgainstBill\": \"4250268.00\"}]','against-job',NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','4250268'),(3,'560','2024-12-26','2024-12-21','Canara','existing','All','against-bill','none','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/6\", \"billNoForAgainstBill\": {\"label\": \"32342342\", \"value\": \"32342342\", \"jobnumber\": \"A/Mumbai/E/24-25/6\", \"grandTotal\": \"4250278.00\"}, \"billamountForAgainstBill\": \"4250278.00\", \"tdsDeductionForAgainstBill\": \"100\", \"totalReceivableForAgainstBill\": \"4250178.00\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','4250178'),(4,'498','2024-12-26','2024-12-20','Canara','existing','Allcargo Pvt Ltd','against-bill','gdgdggg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/3\", \"billNoForAgainstBill\": {\"label\": \"45649862565\", \"value\": \"45649862565\", \"jobnumber\": \"A/Mumbai/E/24-25/3\", \"grandTotal\": \"136.00\"}, \"billamountForAgainstBill\": \"136.00\", \"tdsDeductionForAgainstBill\": \"100\", \"totalReceivableForAgainstBill\": \"36.00\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','36'),(5,'880','2024-12-26','2024-12-27','Canara','existing','Allcargo Pvt Ltd','against-bill','none','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/3\", \"billNoForAgainstBill\": {\"label\": \"45649862565\", \"value\": \"45649862565\", \"jobnumber\": \"A/Mumbai/E/24-25/3\", \"grandTotal\": \"136.00\"}, \"billamountForAgainstBill\": \"136.00\", \"tdsDeductionForAgainstBill\": \"1\", \"totalReceivableForAgainstBill\": \"135.00\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','135'),(6,'120','2024-12-30','2024-12-26','SBI','existing','Allcargo Pvt Ltd','on-account','ggdgfggd','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"\", \"billNoForAgainstBill\": \"\", \"billamountForAgainstBill\": \"\", \"tdsDeductionForAgainstBill\": \"\", \"totalReceivableForAgainstBill\": \"\"}]','against-job',NULL,'[{\"jobNo\": {\"label\": \"A/Mumbai/I/24-25/1\", \"value\": \"A/Mumbai/I/24-25/1\"}, \"amount\": \"10000\", \"typeOfJob\": {\"label\": \"Import\", \"value\": \"Import\"}}]','10000'),(7,'501','2024-12-31','2024-12-26','Canara','existing','vedant  ltd pvt','against-bill','dgfg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/E/24-25/6\", \"billNoForAgainstBill\": {\"label\": \"5353533\", \"value\": \"5353533\", \"jobnumber\": \"A/Mumbai/E/24-25/6\", \"grandTotal\": \"33234.78\"}, \"billamountForAgainstBill\": \"33234.78\", \"tdsDeductionForAgainstBill\": \"5434.76\", \"totalReceivableForAgainstBill\": \"27800.02\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','27800.02'),(8,'493','2025-01-07','2025-01-08','Canara','existing','Allcargo Pvt Ltd','against-bill','sdasd sfsfsfd','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','[{\"jobNoForAgainstBill\": \"A/Mumbai/I/24-25/15\", \"billNoForAgainstBill\": {\"label\": \"534534535\", \"value\": \"534534535\", \"jobnumber\": \"A/Mumbai/I/24-25/15\", \"grandTotal\": \"1034.56\"}, \"billamountForAgainstBill\": \"1034.56\", \"tdsDeductionForAgainstBill\": \"12\", \"totalReceivableForAgainstBill\": \"1022.56\"}]',NULL,NULL,'[{\"jobNo\": \"\", \"amount\": \"\", \"typeOfJob\": \"\"}]','1022.56');
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the custom job number';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customjobnumber`
--

LOCK TABLES `customjobnumber` WRITE;
/*!40000 ALTER TABLE `customjobnumber` DISABLE KEYS */;
INSERT INTO `customjobnumber` VALUES (15,'Seawave Forwarding Logistics','seawave@2323','BranchName','Jogbani','Jogbani-2323','null'),(16,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Jogbani','Jogbani-2323','null'),(17,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Jogbani','Jogbani-2323','null'),(18,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Jogbani','Jogbani-2323','null'),(19,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Jogbani','Jogbani-2323','null'),(27,'Seawave Forwarding Logistics','seawave@2323','BranchName','Kolkata Bihar','Kolkata-2323','null'),(28,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Kolkata Bihar','Kolkata-2323','null'),(29,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata Bihar','Kolkata-2323','null'),(30,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Kolkata Bihar','Kolkata-2323','null'),(31,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Kolkata Bihar','Kolkata-2323','null'),(32,'Seawave Forwarding Logistics','seawave@2323','Custom','Kolkata Bihar','Kolkata-2323','KB'),(33,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Raxaul','Raxaul-2323','null'),(34,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Raxaul','Raxaul-2323','null'),(35,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Raxaul','Raxaul-2323','null'),(36,'Seawave Forwarding Logistics','seawave@2323','BranchName','Raxaul','Raxaul-2323','null'),(37,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Raxaul','Raxaul-2323','null'),(59,'Seawave Forwarding Logistics','seawave@2323','BranchName','Kolkata','Kolkata-2323','null'),(60,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Kolkata','Kolkata-2323','null'),(61,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Kolkata','Kolkata-2323','null'),(62,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Kolkata','Kolkata-2323','null'),(63,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata','Kolkata-2323','null'),(64,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Delhi','Delhi-2323','null'),(65,'Seawave Forwarding Logistics','seawave@2323','BranchName','Delhi','Delhi-2323','null'),(66,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Delhi','Delhi-2323','null'),(67,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Delhi','Delhi-2323','null'),(68,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Delhi','Delhi-2323','null'),(71,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Mumbai','Mumbai-2323','null'),(72,'Seawave Forwarding Logistics','seawave@2323','BranchName','Mumbai','Mumbai-2323','null'),(73,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Mumbai','Mumbai-2323','null'),(74,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Mumbai','Mumbai-2323','null'),(75,'Seawave Forwarding Logistics','seawave@2323','jobnumber','Mumbai','Mumbai-2323','null'),(76,'seatech','seatech@23','Fiscal Year','Mumbai','Mumbai-23','null'),(77,'seatech','seatech@23','Air/Sea','Mumbai','Mumbai-23','null'),(78,'seatech','seatech@23','BranchName','Mumbai','Mumbai-23','null'),(79,'seatech','seatech@23','Import/Export','Mumbai','Mumbai-23','null'),(80,'seatech','seatech@23','jobnumber','Mumbai','Mumbai-23','null');
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
  `typeofjob` varchar(45) NOT NULL,
  `jobnumber` varchar(45) NOT NULL,
  `customername` varchar(45) NOT NULL,
  `remarks` varchar(45) NOT NULL,
  `orgname` varchar(45) NOT NULL,
  `orgcode` varchar(45) NOT NULL,
  `branchname` varchar(45) NOT NULL,
  `branchcode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store debit payment sheet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit`
--

LOCK TABLES `debit` WRITE;
/*!40000 ALTER TABLE `debit` DISABLE KEYS */;
INSERT INTO `debit` VALUES (1,'2024-12-20','N/A','new car purchase','Allcargo Pvt Ltd','100','118.00','18.00','1.00','117.00','45643663','Export','A/Mumbai/E/24-25/6','adani','gdgdggg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(2,'2024-12-26','ICICI','tye of ecoosdf','Prince','100000','100000.00','0.00','0.00','100000.00','42565565','Import','A/Mumbai/I/24-25/2','Tray ltd pvt','jskjkj','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(3,'2024-12-13','N/A','tye of ecoosdf','Gondya','100000','105000.00','5000.00','10000.00','95000.00','42565565','Export','A/Mumbai/E/24-25/1','','jskjkj','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(4,'2024-12-06','N/A','pen','Digga D','100','128.00','28.00','0.00','128.00','55325235525','Import','S/Mumbai/I/24-25/4','','jskjkj','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(5,'2024-12-20','ICICI','tye of ecoosdf','Prince','100','118.00','18.00','0.00','118.00','42565565','Import','A/Mumbai/I/24-25/3','Tray ltd pvt','asdaddasd','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(6,'2024-12-27','N/A','new laptop','Digga D','1000','1000.00','0.00','0.00','1000.00','345345354','Export','A/Mumbai/E/24-25/2','Allcargo Pvt Ltd','ggssdf','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(7,'2024-12-18','N/A','tye of ecoosdf','Allcargo Pvt Ltd','1000','1000.00','0.00','0.00','1000.00','34535453','Import','A/Mumbai/I/24-25/1','vedant  ltd pvt','gdg','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(8,'2024-12-27','Canara','tye of ecoosdf','Gondya','10000','10000.00','0.00','0.00','10000.00','979686','Import','A/Mumbai/I/24-25/13','adani pvt ltd','dfhhd','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323'),(9,'2025-01-08','Canara','new computer','Gondya','1000','1050.00','50.00','100.00','950.00','46546566','Import','A/Mumbai/I/24-25/15','Allcargo Pvt Ltd','gyuh','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323');
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
  `type` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `filelocation` varchar(255) DEFAULT NULL,
  `uploadedby` varchar(255) DEFAULT NULL,
  `uploadedon` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT NULL,
  `deletedby` varchar(255) DEFAULT NULL,
  `deleteRemark` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('hemang@executive','12345','seawave@2323','Seawave Forwarding Logistics',1,'Hemang Ranjan','executive'),('rishi@manager','345345','seawave@2323','Seawave Forwarding Logistics',2,'Rishi Mishra','manager'),('aayush@manager','12345','seawave@2323','Seawave Forwarding Logistics',3,'Aayush Mishra','manager'),('ved@manager','12345','seatech@23','seatech',11,'vedant','manager'),('sanjeet@Developer','12345','seawave@2323','Seawave Forwarding Logistics',12,'sanjeet','Developer');
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
INSERT INTO `enquiry` VALUES (26,'527390606904','new','tesla','jokerrr','12134234234','tesla@232','[\"Import Clearance\", \"Freight Booking\", \"Transportation\"]','dadadad  sddfass','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-14 00:00:00'),(27,'552481068253','new','Seawave Forwarding and Logistics Pvt Ltd','fsdfdfs','fsff','seawave@it','[\"Import Clearance\", \"Exim Consultancy\"]','fsdf fsf sdfsf ','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-14 00:00:00'),(28,'780403923898','existing','Highland Residency','asdads','35535355','sfsfsfs@','[\"Export Clearance\", \"Transportation\"]','fsdfdf fsfs','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-14 00:00:00'),(29,'IEE/24-25/Mumbai/326','new','jokerrr','dkajd ','2342342344','osodasjd@23','[\"Import Clearance\", \"Export Clearance\", \"Exim Consultancy\"]','dfgdgdf','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','2024-11-21 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci COMMENT='Additional details for each enquiry type';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiry_details`
--

LOCK TABLES `enquiry_details` WRITE;
/*!40000 ALTER TABLE `enquiry_details` DISABLE KEYS */;
INSERT INTO `enquiry_details` VALUES (6,26,'45kg','jijfgh','sdsdasda','sdad','20\', 40\'','Destuff','importClearance'),(7,26,'32kg','sdfs','dfsdf','fsdfsf','20\'','Loaded','freightBooking'),(8,26,'23kg','dasdad','sdads','sdasdad','Break Bulk','Loaded','transportation'),(9,27,'34kg','jijfgh','sdsdasda','sdad','40\'','Loaded','importClearance'),(10,27,'34kg','jijfgh','sdsdasda','fsfs','40\' ISO Tank','Loaded','eximConsultancy'),(11,28,'45kg','dssdsf','fsffsf','fsfsf','20\' ISO Tank','Cargo With Container','exportClearance'),(12,28,'45kg','dfsfsdfsf','dsfasfs','sdfsf','LCL','Destuff','transportation'),(13,29,'45','dfs','sdfsdfffsd','fsdfs','20\'','Loaded','importClearance'),(14,29,'46','fgffsd','sdfsfdsf','sdfsfd','Flat Bulk','Factory Stuff','exportClearance'),(15,29,'23','fgedgef','fgggdg','bdbdfg','40\'','Loaded','eximConsultancy');
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
  `typesofContainer` varchar(45) NOT NULL,
  `dockExecutive` varchar(45) NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_jobnumber` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in export will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expjobcreation`
--

LOCK TABLES `expjobcreation` WRITE;
/*!40000 ALTER TABLE `expjobcreation` DISABLE KEYS */;
INSERT INTO `expjobcreation` VALUES ('A/Mumbai/E/24-25/1','2025-01-06 16:17:00','2025-01-05 16:16:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','Home','LCL','dummy45','shfjfhs','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',1,'5545',1,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[{\"type\": \"40\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"24242\"}, {\"type\": \"20\'\", \"weight\": \"43\", \"container\": 2, \"containerNo\": \"23423\"}]','Mumbai','Mumbai-2323',0,0,'40\', 20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/2','2025-01-06 16:19:00','2025-01-05 16:19:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','MBL/MAWB','123323','Seawave Forwarding Logistics','seawave@2323','admin',2,'5545',2,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','sdasd','mumbai','[{\"type\": \"40\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"12122\"}]','Mumbai','Mumbai-2323',0,0,'40\'','fetch Persons',NULL),('A/Mumbai/E/24-25/4','2025-01-06 16:27:00','2025-01-05 16:27:00','Air','Mumbai Sea','No','Dock Stuff',2,'No','In-Bond','FCL','dummy45','shfjfhs','HBL/HAWB','34232','Seawave Forwarding Logistics','seawave@2323','admin',4,'5545',4,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','dfgdg','mumbai','[{\"type\": \"20\'\", \"weight\": \"23\", \"container\": 1, \"containerNo\": \"213123\"}, {\"type\": \"20\'\", \"weight\": \"21\", \"container\": 2, \"containerNo\": \"31231\"}]','Mumbai','Mumbai-2323',0,0,'20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/5','2025-01-06 16:34:00','2025-01-05 16:33:00','Air','Valvada ICD','No','Factory Stuff',1,'No','In-Bond','LCL','dummy45','shfjfhs','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',5,'5545',5,'','',NULL,NULL,'vedant  ltd pvt','vapi','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','jsks','mumbai','[{\"type\": \"20\'\", \"weight\": \"3\", \"container\": 1, \"containerNo\": \"34243\"}]','Mumbai','Mumbai-2323',0,0,'20\'','fetch Persons',NULL),('A/Mumbai/E/24-25/6','2025-01-06 17:05:00','2025-01-07 17:05:00','Air','Mumbai Sea','No','Dock Stuff',1,'No','In-Bond','FCL','dummy45','dumpy45','HBL/HAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',6,'5545',6,'','',NULL,NULL,'Allcargo Pvt Ltd','Andheri','dsdafsfs fsfsdfsf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"44\", \"container\": 1, \"containerNo\": \"552342\"}]','Mumbai','Mumbai-2323',0,0,'20\', 40\'','fetch Persons',NULL),('S/Mumbai/E/24-25/8','2025-02-05 11:58:00','2025-02-07 11:57:00','Sea','Mumbai Sea','Yes','Factory Stuff',2,'Yes','In-Bond','LCL','dummy45','dumpy45','MBL/MAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',8,'5545',8,'korea','colaba',NULL,NULL,'Tray ltd pvt','hogwarts','dfgd','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"2343\", \"container\": 1, \"containerNo\": \"21343\"}, {\"type\": \"40\'\", \"weight\": \"2344\", \"container\": 2, \"containerNo\": \"45434\"}]','Mumbai','Mumbai-2323',0,0,'20\', 40\'','fetch Persons',NULL),('S/Mumbai/E/24-25/9','2025-02-05 12:00:00','2025-02-07 11:59:00','Sea','Raxaul LCS','Yes','Dock Stuff',2,'Yes','In-Bond','LCL','dummy45','dumpy45','MBL/MAWB','53455','Seawave Forwarding Logistics','seawave@2323','admin',9,'5545',9,'gfdcg','korea','2025-02-08 00:00:00','2025-02-06 00:00:00','Reliance Ltd','lokhandwale','jijamata nagar','58GST323726432','GDMPM3914G','null','null','[{\"type\": \"20\'\", \"weight\": \"3232\", \"container\": 1, \"containerNo\": \"454545\"}, {\"type\": \"20\'\", \"weight\": \"43434\", \"container\": 2, \"containerNo\": \"232323\"}]','Mumbai','Mumbai-2323',0,0,'20\'','fetch Persons',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store export notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expnotifications`
--

LOCK TABLES `expnotifications` WRITE;
/*!40000 ALTER TABLE `expnotifications` DISABLE KEYS */;
INSERT INTO `expnotifications` VALUES (1,'A/Mumbai/E/24-25/1','adani pvt ltd','2025-01-06 16:17:45','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(2,'A/Mumbai/E/24-25/2','adani pvt ltd','2025-01-06 16:19:34','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(3,'A/Mumbai/E/24-25/3','Allcargo Pvt Ltd','2025-01-06 16:23:06','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(4,'A/Mumbai/E/24-25/4','adani pvt ltd','2025-01-06 16:28:00','ExpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(5,'A/Mumbai/E/24-25/5','vedant  ltd pvt','2025-01-06 16:34:04','ExpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(6,'A/Mumbai/E/24-25/6','Allcargo Pvt Ltd','2025-01-06 17:06:11','ExpJobButton','Andheri','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(7,'S/Mumbai/E/24-25/7','Relience Ltd','2025-02-03 17:36:48','ExpJobButton','lokhandwale','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(8,'S/Mumbai/E/24-25/8','Tray ltd pvt','2025-02-05 11:58:17','ExpJobButton','hogwarts','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(9,'S/Mumbai/E/24-25/9','vedant  ltd pvt','2025-02-05 12:00:24','ExpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin');
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
  `typesofContainer` varchar(45) NOT NULL,
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_jobnumber` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in import will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impjobcreation`
--

LOCK TABLES `impjobcreation` WRITE;
/*!40000 ALTER TABLE `impjobcreation` DISABLE KEYS */;
INSERT INTO `impjobcreation` VALUES (3,'A/Mumbai/I/24-25/2','2024-12-24 11:09:00','2024-12-23 11:07:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','SEZ-Z','LCL','afsgsgfg','fssfgsggs','20\'','fetch Persons','HBL/HAWB','353543','admin','dggg','Surrender','345444','Yearly',2,'jharkhand','Mumbai','2024-12-26 00:00:00','2024-12-25 00:00:00','Tray ltd pvt','hogwarts','dfgd','27GDMPM3914G1Z4','GDMPM3914G','sfsfdfs','dgfgdg','[{\"type\": \"20\'\", \"weight\": \"45kg\", \"container\": 1, \"containerNo\": \"454534\"}, {\"type\": \"20\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"53453\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(4,'A/Mumbai/I/24-25/3','2024-12-24 15:03:00','2024-12-24 15:03:00','Air','Kolkata Sea','Yes','Loaded',2,'No','Home','LCL','ffdffwe','shfjfhs','20\', 40\'','fetch Persons','HBL/HAWB','56464656','admin','4','Surrender','5545','Yearly',3,'','',NULL,NULL,'Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dgfgdg','[{\"type\": \"20\'\", \"weight\": \"43kg\", \"container\": 1, \"containerNo\": \"3244\"}, {\"type\": \"40\'\", \"weight\": \"56kg\", \"container\": 2, \"containerNo\": \"23442\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(5,'S/Mumbai/I/24-25/4','2024-12-24 15:49:00','2024-12-23 15:48:00','Sea','Mumbai Sea','No','Loaded',1,'No','Home','LCL','dummy45','gfdfgdg','20\'','fetch Persons','HBL/HAWB','5242353','admin','4','Original','424343','Yearly',4,'','',NULL,NULL,'vedant  ltd pvt','vapi','sgsgsgs','27AAICS7836D1Z3','AAICS7836D','ggdgsgs','dsfgdfhddh','[{\"type\": \"20\'\", \"weight\": \"5.5Ton\", \"container\": 1, \"containerNo\": \"354535354\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(7,'S/Mumbai/I/24-25/6','2024-12-24 16:11:00','2024-12-31 16:11:00','Sea','Raxaul LCS','Yes','Destuff',2,'Yes','In-Bond','Break Bulk','dummy45','dumpy45','40\', 20\' ISO Tank','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','234234','One-Time',6,'jharkhand','Mumbai','2024-12-31 00:00:00','2024-12-24 00:00:00','adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[{\"type\": \"40\'\", \"weight\": \"12\", \"container\": 1, \"containerNo\": \"32112341\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"24\", \"container\": 2, \"containerNo\": \"41341341\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(8,'A/Mumbai/I/24-25/7','2024-12-24 16:18:00','2024-12-25 16:18:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','20\', 40\'','fetch Persons','HBL/HAWB','53455','admin','4','Original','5545','Yearly',7,'jharkhand','Mumbai','2024-12-28 00:00:00','2024-12-26 00:00:00','Tray ltd pvt','mumbai','asdad','27AAICS7836D1Z3','AAICS7836D','sfsfdfs','dsfgdfhddh','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"32344\"}, {\"type\": \"20\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"42343\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(9,'A/Mumbai/I/24-25/8','2024-12-24 16:24:00','2024-12-23 16:23:00','Air','Mumbai Sea','Yes','Destuff',2,'Yes','Home','LCL','affd','dffgs','20\', 40\'','fetch Persons','MBL/MAWB','23423542','admin','4','Surrender','331231','One-Time',8,'dsss','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','vedant  ltd pvt','Andheri','hddhf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1, \"containerNo\": \"234234\"}, {\"type\": \"40\'\", \"weight\": \"354\", \"container\": 2, \"containerNo\": \"423423\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(13,'A/Mumbai/I/24-25/9','2024-12-24 17:07:00','2024-12-23 17:06:00','Air','Mumbai Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','shfjfhs','20\', 40\'','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','55455','One-Time',9,'jharkhand','Mumbai','2024-12-24 00:00:00','2024-12-24 00:00:00','Tray ltd pvt','Bihar','werwe wfqwfa afsa faasfa f','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"433\", \"container\": 1, \"containerNo\": \"344242\"}, {\"type\": \"40\'\", \"weight\": \"34\", \"container\": 2, \"containerNo\": \"423442\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(14,'A/Mumbai/I/24-25/10','2024-12-24 17:08:00','2024-12-23 17:07:00','Air','Mumbai Sea','No','Destuff',2,'Yes','Home','FCL','dummy45','shfjfhs','20\', 20\' ISO Tank','fetch Persons','HBL/HAWB','53455','admin','2','Surrender','5545','Yearly',10,'jharkhand','nepal','2024-12-27 00:00:00','2024-12-24 00:00:00','adani pvt ltd','Bihar','sdgdgs','27AAICS7836D1Z3','AAICS7836D','sdfsf','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"445\", \"container\": 1, \"containerNo\": \"453453\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"44\", \"container\": 2, \"containerNo\": \"45345\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(15,'A/Mumbai/I/24-25/11','2024-12-24 17:10:00','2024-12-23 17:10:00','Air','Mumbai Sea','No','Destuff',2,'No','In-Bond','FCL','dummy45','34234','40\', 20\' ISO Tank','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','342342','Yearly',11,'','',NULL,NULL,'adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"40\'\", \"weight\": \"342\", \"container\": 1, \"containerNo\": \"424234\"}, {\"type\": \"20\' ISO Tank\", \"weight\": \"33\", \"container\": 2, \"containerNo\": \"3423\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(17,'A/Mumbai/I/24-25/12','2024-12-24 17:37:00','2024-12-25 17:36:00','Air','Kolkata Sea','Yes','Loaded',2,'Yes','Home','FCL','dummy45','dumpy45','20\', 40\'','fetch Persons','HBL/HAWB','53455','admin','4','Surrender','5545','Yearly',12,'jharkhand','sfsf','2024-12-29 00:00:00','2024-12-24 00:00:00','adani pvt ltd','haryana','fsdfafdf','27AAICS7836D1Z3','AAICS7836D','asdffa','dsfafa','[{\"type\": \"20\'\", \"weight\": \"56\", \"container\": 1, \"containerNo\": \"3534\"}, {\"type\": \"40\'\", \"weight\": \"66\", \"container\": 2, \"containerNo\": \"3453\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(18,'A/Mumbai/I/24-25/13','2024-12-24 17:59:00','2024-12-23 17:59:00','Air','Kolkata Sea','Yes','Loaded',1,'No','Ex-Bond','LCL','dummy45','gfdfgdg','20\'','fetch Persons','HBL/HAWB','53455','aayush@manager','2','Original','42352','Yearly',13,'','',NULL,NULL,'adani pvt ltd','mumbai','sdaf sfswf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"20\'\", \"weight\": \"34\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(50,'S/Mumbai/I/24-25/18','2025-01-29 13:03:00','2025-01-30 13:01:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','Home','FCL','dummy45','dumpy45','40\'','fetch Persons','HBL/HAWB','dummy67','admin','98','Surrender','55455','Yearly',18,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(51,'A/Mumbai/I/24-25/19','2025-01-31 17:58:00','2025-01-31 17:57:00','Air','Mumbai Sea','Yes','Loaded',1,'Yes','SEZ-Z','FCL','vhvhg','shfjfhs','20\'','fetch Persons','HBL/HAWB','dummy3','admin','2','Surrender','55455','Yearly',19,'gfdcg','gfhn','2025-02-09 00:00:00','2025-01-31 00:00:00','muggles','hogwarts','qwertyuhnfh,gf,','27GDMPM3914G1Z4','GDMPM3914G','JOGBANI LCS','NHAVA SHEVA','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(53,'S/Mumbai/I/24-25/22','2025-02-05 12:03:00','2025-02-07 12:02:00','Sea','Kolkata Sea','Yes','Loaded',2,'No','Home','FCL','vhvhg','dumpy45','20\'','fetch Persons','MBL/MAWB','53455','admin','2','Surrender','5545','Yearly',22,'','',NULL,NULL,'vedant  ltd pvt','vapi','sdffafas dafafafa','27AAICS7836D1Z3','AAICS7836D','JOGBANI LCS','NHAVA SHE','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}, {\"type\": \"\", \"weight\": \"\", \"container\": 2}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL),(54,'A/Mumbai/I/24-25/23','2025-02-07 14:59:00','2025-02-05 14:59:00','Air','Kolkata Sea','Yes','Destuff',1,'No','Home','FCL','3','ds','40\' ISO Tank','fetch Persons','HBL/HAWB','asdds','admin','asd','Surrender','22','One-Time',23,'','',NULL,NULL,'adani pvt ltd','mumbai','dasdas asdadfadf','27AAICS7836D1Z3','AAICS7836D','ds','as','[{\"type\": \"\", \"weight\": \"\", \"container\": 1}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323',0,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store import notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impnotifications`
--

LOCK TABLES `impnotifications` WRITE;
/*!40000 ALTER TABLE `impnotifications` DISABLE KEYS */;
INSERT INTO `impnotifications` VALUES (6,'A/Mumbai/I/24-25/4','Allcargo Pvt Ltd','2024-12-03 11:54:35','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(7,'A/Mumbai/I/24-25/5','Allcargo Pvt Ltd','2024-12-03 11:59:54','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(8,'A/Mumbai/I/24-25/6','C CONNECT LOGGI','2024-12-03 12:11:30','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(9,'A/Mumbai/I/24-25/7','Allcargo Pvt Ltd','2024-12-03 14:43:25','ImpJobButton','Mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(11,'A/Mumbai/I/24-25/1','Highland Residency','2024-12-05 17:19:53','ImpJobButton','Thane','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(12,'A/Mumbai/I/24-25/2','adani pvt ltd','2024-12-19 16:31:48','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(13,'A/Mumbai/I/24-25/3','Tray ltd pvt','2024-12-19 16:39:51','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(14,'A/Mumbai/I/24-25/1','adani pvt ltd','2024-12-19 16:41:52','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(15,'A/Mumbai/I/24-25/1','Allcargo Pvt Ltd','2024-12-21 11:45:07','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(16,'A/Mumbai/I/24-25/2','Tray ltd pvt','2024-12-24 11:09:49','ImpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(17,'A/Mumbai/I/24-25/3','Tray ltd pvt','2024-12-24 15:03:52','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(18,'S/Mumbai/I/24-25/4','vedant  ltd pvt','2024-12-24 15:49:46','ImpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(19,'A/Mumbai/I/24-25/5','vedant  ltd pvt','2024-12-24 16:08:38','ImpJobButton','vapi','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(20,'S/Mumbai/I/24-25/6','adani pvt ltd','2024-12-24 16:11:53','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(21,'A/Mumbai/I/24-25/7','','2024-12-24 16:18:44','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(22,'A/Mumbai/I/24-25/8','','2024-12-24 16:24:40','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(23,'A/Mumbai/I/24-25/9','adani pvt ltd','2024-12-24 16:55:07','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(24,'A/Mumbai/I/24-25/10','adani pvt ltd','2024-12-24 16:55:26','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(25,'A/Mumbai/I/24-25/10','adani pvt ltd','2024-12-24 16:55:38','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(26,'A/Mumbai/I/24-25/10','Tray ltd pvt','2024-12-24 16:57:50','ImpJobButton','haryana','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(27,'A/Mumbai/I/24-25/9','Tray ltd pvt','2024-12-24 17:07:13','ImpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(28,'A/Mumbai/I/24-25/10','adani pvt ltd','2024-12-24 17:08:36','ImpJobButton','Bihar','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(29,'A/Mumbai/I/24-25/11','adani pvt ltd','2024-12-24 17:10:55','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(30,'A/Mumbai/I/24-25/12','adani pvt ltd','2024-12-24 17:12:48','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(31,'A/Mumbai/I/24-25/12','adani pvt ltd','2024-12-24 17:12:57','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(32,'A/Mumbai/I/24-25/12','','2024-12-24 17:37:33','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(33,'A/Mumbai/I/24-25/13','adani pvt ltd','2024-12-24 17:59:35','ImpJobButton','mumbai','[]','[]','[]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','aayush@manager'),(34,'A/Mumbai/I/24-25/14','solanki ','2025-01-06 16:11:06','ImpJobButton','Pune','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:20:54\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(35,'A/Mumbai/I/24-25/15','Allcargo Pvt Ltd','2025-01-06 16:13:29','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:21:11\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(36,'A/Mumbai/I/24-25/16','Allcargo Pvt Ltd','2025-01-06 16:30:10','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:21:29\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(37,'A/Mumbai/I/24-25/17','adani pvt ltd','2025-01-07 11:17:07','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-07 11:21:34\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(38,'S/Mumbai/I/24-25/18','adani pvt ltd','2025-01-29 13:03:15','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-29 13:04:49\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(39,'A/Mumbai/I/24-25/19','muggles','2025-01-31 17:58:32','ImpJobButton','hogwarts','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-01-31 17:59:53\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(40,'A/Mumbai/I/24-25/20','Relience Ltd','2025-02-03 17:55:13','ImpJobButton','lokhandwale','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-03 17:55:24\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','hemang@executive'),(41,'S/Mumbai/I/24-25/21','','2025-02-04 13:23:53','ImpJobButton','Andheri','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-05 12:05:03\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(42,'S/Mumbai/I/24-25/22','vedant  ltd pvt','2025-02-05 12:03:59','ImpJobButton','vapi','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-05 12:06:27\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin'),(43,'A/Mumbai/I/24-25/23','adani pvt ltd','2025-02-07 14:59:45','ImpJobButton','mumbai','[{\"employeename\": \"hemang@executive\"}]','[{\"time\": \"2025-02-07 15:00:33\", \"employeename\": \"hemang@executive\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Mumbai','Mumbai-2323','admin');
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='line of business table as per users prefrences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lob`
--

LOCK TABLES `lob` WRITE;
/*!40000 ALTER TABLE `lob` DISABLE KEYS */;
INSERT INTO `lob` VALUES (15,'Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Air'),(16,'Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Sea'),(17,'Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Air'),(18,'Sea EXPORT','Seawave Forwarding Logistics','seawave@2323','Sea'),(30,'Air Import','seatech','seatech@23','Air');
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the milestones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (49,'ETA','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(50,'E-SANCHIT','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(51,'PORT CFS NOMINATION','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(52,'processing','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(53,'ETA','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Delhi'),(54,'E-SANCHIT','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Delhi'),(55,'ETA','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(56,'ETA ','Sea EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(57,'E-SANCHIT','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(58,'E-SANCHIT','Sea EXPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(59,'Scanning ','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(60,'Packaging','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai'),(61,'ETA ','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Kolkata'),(62,'PORT CFS','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Kolkata'),(63,'ETA','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani'),(64,'E-SANCHIT','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani'),(65,'PORT  CFS','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani'),(66,'ETA ','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani'),(67,'E-SANCHIT','Sea IMPORT','Seawave Forwarding Logistics','seawave@2323','Jogbani'),(71,'ETA','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','ALL'),(72,'REX','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Delhi'),(73,'PORT CFS NOMINATION','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','ALL'),(74,'DHH','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','ALL'),(75,'CUSTOM CLEAREANCE','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','ALL'),(76,'ETA EXPORT ALL','Air EXPORT','Seawave Forwarding Logistics','seawave@2323','ALL'),(77,'test','Air Import','seatech','seatech@23','Mumbai'),(78,'test2','Air Import','seatech','seatech@23','Mumbai'),(79,'Test','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','ALL'),(80,'Test','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','ALL'),(81,'Sanjeet','Air IMPORT','Seawave Forwarding Logistics','seawave@2323','Mumbai');
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store notifications and its data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment B-10-15 Sector-15 1:1','Digga D','India','Maharashtra','Navi Mumbai','digga','400703','2004263507','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','diggachigga','4','aayush@manager',1,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',1,'2024-06-05 15:31:43'),('Seawave Forwarding Logistics','seawave@2323','dfs','Gondya','dsf','dsf','df','gondya','345326','5645653232','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','gond','7','hemang@executive',2,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": \"2024-06-05 15\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',2,'2024-06-05 15:40:28'),('Seawave Forwarding Logistics','seawave@2323','1/35454','Allcargo Pvt Ltd','India','MH','THANE','allcargo','400705','8655997299','rm@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Mumbai','30','admin',3,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-19 21\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',3,'2024-09-02 15:05:01'),('Seawave Forwarding Logistics','seawave@2323','1/232, Raheja Tesla Industrial Plot GEN-2/1/C/Part D Block\nTTC Industrial Area, Shiravane, Juinagar','Ritesh Pathak LLP','India','Maharashtra','Navi Mumbai','ritesh','400705','9867612222','nkmishra@seawave.in','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Thane','21','admin',4,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-09-20 16\", \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',4,'2024-09-20 16:31:31'),('Seawave Forwarding Logistics','seawave@2323','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI, THANE','Highland Residency','India','Maharashtra','THANE','highland','400607','8655919239','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Thane','31','admin',6,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}]',6,'2024-09-20 16:56:16'),('Seawave Forwarding Logistics','seawave@2323','Highland Residency\nBougainvillea','Prince LLP','India','Maharashtra','Thane','prince','400607','7045605056','aayushmishra@seawave.in','FXFPM6685A','27FXFPM6685A1Z4','FXFPM6685A','juinagar','31','aayush@manager',7,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}]',7,'2024-09-20 16:57:40'),('Seawave Forwarding Logistics','seawave@2323','201, A-2 BOGENVILLA HIGHLAND RESIDENCY\nDHOKALI ROAD','C CONNECT LOGGI','India','MAHARASHTRA','THANE','c','400607','8655919239','rishi.seawave@gmail.com','ABCPP1234P','27ABCPP1234P1Z5','ABCPP1234P','Mumbai','31','admin',8,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',8,'2024-09-20 17:11:41'),('Seawave Forwarding Logistics','seawave@2323','dffddfsdf','dummy','india','maha','mum','dummy','400045','9156686985','sfdfg@gmail.com','','','','','','aayush@manager',9,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',9,'2024-09-24 17:52:45'),('Seawave Forwarding Logistics','seawave@2323','fdgdsg dgdgg','Vedant PVT LTD','India','MH','Navi Mumbai mh','vedant','400705','8655997299','rm@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Mumbai','30','admin',10,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',10,'2024-09-27 14:32:05'),('Seawave Forwarding Logistics','seawave@2323','dfsfdfs','dummy Pvt ltd','india','Goa','dfdfs df','dummy','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','67','aayush@manager',11,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',11,'2024-09-27 15:12:53'),('Seawave Forwarding Logistics','seawave@2323','sdasdf sdgs','dummy2 Pvt ltd','india','Goa','mum','dummy2','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','67','aayush@manager',12,'OrgButton','[{\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',12,'2024-09-27 15:20:40'),('Seawave Forwarding Logistics','seawave@2323','afasf sdfdvsv vass','dummy3 Pvt ltd','india','maha','mum','dummy3','400045','9156686985','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','mumbai','56','aayush@manager',13,'OrgButton','[{\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}]',13,'2024-09-27 16:16:18'),('Seawave Forwarding Logistics','seawave@2323','asdasdf bdfg','dummy4','india','MAHARASHTRA','NAVI MUMBAI','dummy4','345326','8655997299','fffdsfnj@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Pune','56','admin',14,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-10-08 12\", \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-08 12\", \"employeename\": \"aayush@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-10-08 12\", \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',14,'2024-10-08 12:44:59'),('seatech','seatech@23','sdff','Allcargo Pvt Ltd','Afghanistan','Baghlan','Nahrīn','allcargo','345326','8655997299','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','Pune','56','admin',15,'OrgButton','[]','[]','[]',15,'2024-11-14 11:42:36'),('Seawave Forwarding Logistics','seawave@2323','sdfsdf fsdfsfd','testing','India','Assam','Badarpur','testing','400058','8104834173','sofsfds@gmail.com','ABCDE1234F','27ABCDE1234F1Z5','ABCDE1234F','testingbranch','34','admin',16,'OrgButton','[]','[]','[]',16,'2024-11-21 12:29:44'),('Seawave Forwarding Logistics','seawave@2323','dfgdfgr gg','solanki pvt ltd','India','Rajasthan','Udaipur','solanki','400008','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','udaipur','23','admin',17,'OrgButton','[]','[]','[]',17,'2024-11-29 12:43:02'),('Seawave Forwarding Logistics','seawave@2323','dsfafsdf','vedant','Argentina','Jujuy','Calilegua','vedant','400008','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','56','admin',18,'OrgButton','[]','[]','[]',18,'2024-12-04 16:13:00'),('Seawave Forwarding Logistics','seawave@2323','dsfafsdf','vedant','Argentina','Jujuy','Calilegua','vedant','400008','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','56','admin',19,'OrgButton','[]','[]','[]',19,'2024-12-04 16:14:25'),('Seawave Forwarding Logistics','seawave@2323','ddfadas f errr fsrtg','Google pvt lts','Azerbaijan','Ganja','Ganja','google','400004','56464566','kdhds@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','','56','admin',20,'OrgButton','[]','[]','[]',20,'2024-12-04 16:41:59'),('Seawave Forwarding Logistics','seawave@2323','dasddad dqdqfqf qqwwrfdas','Amazon pvt ltd','Armenia','Vayots Dzor Region','Yeghegis','amazon','400058','5646456645','sola@3312gmail','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','mumbai','67','admin',21,'OrgButton','[]','[]','[]',21,'2024-12-04 16:46:45'),('Seawave Forwarding Logistics','seawave@2323','dsfadffa dsqawda asda','Testing23','India','Bihar','Arrah','testing23','ffffsf xdsfsf','8104834173','sfdfg@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','kolkata','56','admin',22,'OrgButton','[]','[]','[]',22,'2024-12-05 11:50:39'),('Seawave Forwarding Logistics','seawave@2323','sfsdff','Tray ltd pvt','Argentina','Mendoza','Departamento de San Martín','tray','400058','5646456645','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','gujarat','56','admin',23,'OrgButton','[]','[]','[]',23,'2024-12-05 11:55:15'),('Seawave Forwarding Logistics','seawave@2323','dad  daddfaf','stark ltd ','Albania','Lezhë County','Bashkia Lezhë','stark','400058','9876543210','sofsfds@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','winterfall','23','admin',24,'OrgButton','[]','[]','[]',24,'2024-12-05 14:15:04'),('Seawave Forwarding Logistics','seawave@2323','sadadd adeqad','Allcargo Pvt Ltd','India','Kerala','Cherpulassery','allcargo','3453267','8104834173','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','45','admin',25,'OrgButton','[]','[]','[]',1,'2024-12-06 17:11:27'),('Seawave Forwarding Logistics','seawave@2323','sdaf sfswf','adani pvt ltd','India','Maharashtra','Andheri','adani','400006','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','45','admin',26,'OrgButton','[]','[]','[]',2,'2024-12-06 17:13:39'),('Seawave Forwarding Logistics','seawave@2323','werwe wfqwfa afsa faasfa f','Tray ltd pvt','India','Bihar','Bakhtiyarpur','tray','400004','9876543219','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Bihar','45','admin',27,'OrgButton','[]','[]','[]',3,'2024-12-09 11:09:40'),('Seawave Forwarding Logistics','seawave@2323','dfas ','vedant  ltd pvt','India','Gujarat','Vapi','vedant','400058','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','vapi','56','admin',28,'OrgButton','[]','[]','[]',4,'2024-12-09 11:11:12'),('Seawave Forwarding Logistics','seawave@2323','PANVEL','CONTINENTAL CFS','India','Maharashtra','Navi Mumbai','continental','400614','','','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','NHAVA SHEVA','60','admin',29,'OrgButton','[]','[]','[]',5,'2024-12-10 17:22:08'),('Seawave Forwarding Logistics','seawave@2323','Mumbai Andheri West ','Relience Ltd','India','Maharashtra','Andheri','relience','400058','5534667457','relience@.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','68','admin',30,'OrgButton','[]','[]','[]',6,'2024-12-11 12:23:15'),('Seawave Forwarding Logistics','seawave@2323','ffffa dfafasf','dummyn pvt','India','Maharashtra','Andheri','dummyn','400614','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',31,'OrgButton','[]','[]','[]',7,'2024-12-12 13:13:51'),('Seawave Forwarding Logistics','seawave@2323','hjbfhjsbff fskfjbf kjasdfk','nagesh Pvt ltd','India','Maharashtra','Navi Mumbai','nagesh','400006','9876543219','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Navi mumbai','45','admin',32,'OrgButton','[]','[]','[]',9,'2025-01-02 11:06:49'),('Seawave Forwarding Logistics','seawave@2323','sawqwrv fafaf  ddf','dummy91','Andorra','Encamp','Pas de la Casa','dummy91','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','dummyBranch1','68','admin',33,'OrgButton','[]','[]','[]',10,'2025-01-02 11:23:59'),('Seawave Forwarding Logistics','seawave@2323','dasfrsgfgf cdsgs','solanki ','Azerbaijan','Dashkasan District','Verkhniy Dashkesan','solanki','345326','8655997299','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',34,'OrgButton','[]','[]','[]',11,'2025-01-02 11:38:03'),('Seawave Forwarding Logistics','seawave@2323','dgsgs','solanki ','South Korea','Sejong City','Sejong','solanki','400004','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','42','admin',35,'OrgButton','[]','[]','[]',12,'2025-01-02 11:43:50'),('Seawave Forwarding Logistics','seawave@2323','sdfsdswdgfs vfsd','solanki ','India','Maharashtra','Andheri','solanki','400614','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',36,'OrgButton','[]','[]','[]',13,'2025-01-02 11:50:17'),('Seawave Forwarding Logistics','seawave@2323','dsfsfsf','solanki ','India','Maharashtra','Andheri','solanki','345326','9876543219','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',37,'OrgButton','[]','[]','[]',14,'2025-01-02 11:52:00'),('Seawave Forwarding Logistics','seawave@2323','aseafsasfds ascad','solanki ','India','Jharkhand','Deogarh','solanki','400614','9578907467','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',38,'OrgButton','[]','[]','[]',15,'2025-01-02 11:56:02'),('Seawave Forwarding Logistics','seawave@2323','dfasffaf affasf','solanki ','Iceland','Western Region','Helgafellssveit','solanki','400614','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',39,'OrgButton','[]','[]','[]',16,'2025-01-02 12:04:37'),('Seawave Forwarding Logistics','seawave@2323','asdfadf','solanki ','Antigua And Barbuda','Barbuda','Codrington','solanki','400058','5646456645','example@example.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','Pune','68','admin',40,'OrgButton','[]','[]','[]',17,'2025-01-02 13:10:53'),('Seawave Forwarding Logistics','seawave@2323','asrfrfsf fasffas','solanki ','Albania','Dibër County','Bashkia Bulqizë','solanki','400058','8655997299','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','34','admin',41,'OrgButton','[]','[]','[]',18,'2025-01-02 13:12:58'),('Seawave Forwarding Logistics','seawave@2323','xdzsfadad sfasf','solanki ','Afghanistan','Badghis','Ghormach','solanki','400058','8655997299','example@example.com','AAICS7836D','27AAICS7836D1Z9','AAICS7836D','Bihar','23','admin',42,'OrgButton','[]','[]','[]',19,'2025-01-02 13:16:36'),('Seawave Forwarding Logistics','seawave@2323','asdasdfafa','dummy99','Australia','Victoria','Abbotsford','dummy99','400004','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','','admin',43,'OrgButton','[]','[]','[]',20,'2025-01-02 13:34:24'),('Seawave Forwarding Logistics','seawave@2323','fnfjhkfff','dummy90','Argentina','La Rioja','Arauco','dummy90','400614','9578907467','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','pune','42','admin',44,'OrgButton','[]','[]','[]',21,'2025-01-02 13:38:18'),('Seawave Forwarding Logistics','seawave@2323','dasfafa','solanki ','Armenia','Yerevan','Arabkir','solanki','345326','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','haryana','56','admin',45,'OrgButton','[]','[]','[]',22,'2025-01-02 13:42:54'),('Seawave Forwarding Logistics','seawave@2323','dfadasd sdfa','dummy499','Armenia','Vayots Dzor Region','Yeghegnadzor','dummy499','400004','8104834173','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Pune','34','admin',46,'OrgButton','[]','[]','[]',23,'2025-01-02 13:45:02'),('Seawave Forwarding Logistics','seawave@2323','rfsdff sfaf','dummy999','Afghanistan','Badakhshan','Ashkāsham','dummy999','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','vapi','68','admin',47,'OrgButton','[]','[]','[]',24,'2025-01-02 13:47:44'),('Seawave Forwarding Logistics','seawave@2323','rfsresfs dada dad','dummy88','Armenia','Aragatsotn Region','Aparan','dummy88','400614','9578907467','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','haryana','42','admin',48,'OrgButton','[]','[]','[]',25,'2025-01-02 13:49:20'),('Seawave Forwarding Logistics','seawave@2323','sdfsasf ffadsa','dummy55','Armenia','Aragatsotn Region','Agarakavan','dummy55','400004','9876543210','shreyashpingle752@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','45','admin',49,'OrgButton','[]','[]','[]',26,'2025-01-02 13:51:40'),('Seawave Forwarding Logistics','seawave@2323','dadad adada','dummy234','Antigua And Barbuda','Barbuda','Codrington','dummy234','400058','9578907467','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Navi mumbai','56','admin',50,'OrgButton','[]','[]','[]',27,'2025-01-02 14:06:20'),('Seawave Forwarding Logistics','seawave@2323','sdfsfasfsf adada','dummy1111','Afghanistan','Badakhshan','Ashkāsham','dummy1111','400006','9578907467','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z4','AAICS7836D','mumbai','34','admin',51,'OrgButton','[]','[]','[]',28,'2025-01-02 14:10:17'),('Seawave Forwarding Logistics','seawave@2323','dfasdfasfa','solanki ','Algeria','Annaba','Annaba','solanki','400004','9876543219','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',52,'OrgButton','[]','[]','[]',32,'2025-01-02 15:22:35'),('Seawave Forwarding Logistics','seawave@2323','efwwgfwff sfaff dafdhdg adafasfa','solanki ','India','Maharashtra','Andheri','solanki','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','45','admin',53,'OrgButton','[]','[]','[]',35,'2025-01-04 12:31:00'),('Seawave Forwarding Logistics','seawave@2323','dsfsfds ffsfdsfsf','Tray ltd pvt2.0','Argentina','Río Negro','El Cuy','tray','400057','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','68','admin',54,'OrgButton','[]','[]','[]',36,'2025-01-04 15:22:34'),('Seawave Forwarding Logistics','seawave@2323','dssfsdfs sfsdfs','dummy765','Austria','Vienna','Simmering','dummy765','400057','5646456645','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','42','admin',55,'OrgButton','[]','[]','[]',37,'2025-01-04 15:28:49'),('Seawave Forwarding Logistics','seawave@2323','dsdafsfs fsfsdfsf','Allcargo Pvt Ltd','Afghanistan','Baghlan','Nahrīn','allcargo','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','34','admin',56,'OrgButton','[]','[]','[]',1,'2025-01-04 15:54:28'),('Seawave Forwarding Logistics','seawave@2323','dasdas asdadfadf','adani pvt ltd','Argentina','La Rioja','Villa Bustos','adani','400614','9876543219','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','mumbai','68','admin',57,'OrgButton','[]','[]','[]',2,'2025-01-04 15:56:47'),('Seawave Forwarding Logistics','seawave@2323','sdffafas dafafafa','vedant  ltd pvt','East Timor','Manufahi Municipality','Fatuberliu','vedant','400614','5646456645','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','vapi','78','admin',58,'OrgButton','[]','[]','[]',3,'2025-01-04 15:57:40'),('Seawave Forwarding Logistics','seawave@2323','dasdasd adfsada adsfsgsda','solanki ','Armenia','Armavir Region','Aknalich','solanki','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Andheri','89','admin',59,'OrgButton','[]','[]','[]',4,'2025-01-04 15:59:14'),('Seawave Forwarding Logistics','seawave@2323','Navi Mumbai Juinagar ','Seawave Logistic Pvt Ltd','India','Maharashtra','Navi Mumbai','seawave','400057','9876543219','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','Juinagar ','23','admin',60,'OrgButton','[]','[]','[]',5,'2025-01-06 17:00:37'),('Seawave Forwarding Logistics','seawave@2323','asdadfasfa asfasfa asfafadsd acdsadfa','dummy99','Austria','Upper Austria','Adlwang','dummy99','400004','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','haryana','56','admin',61,'OrgButton','[]','[]','[]',6,'2025-01-06 17:23:07'),('Seawave Forwarding Logistics','seawave@2323','qwertyuhnfh,gf,','muggles','United Kingdom','Scotland','Logan','muggles','400703','02004263507','jai@3231322.hg.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','hogwarts','90','admin',62,'OrgButton','[]','[]','[]',7,'2025-01-31 17:08:15'),('Seawave Forwarding Logistics','seawave@2323','dfgd','Tray ltd pvt','India','Maharashtra','Achalpur','tray','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','hogwarts','77','admin',63,'OrgButton','[]','[]','[]',8,'2025-02-01 15:55:17'),('Seawave Forwarding Logistics','seawave@2323','jijamata nagar','Relience Ltd','India','Maharashtra','Navi Mumbai','relience','400703','8975665231','test@test.com','RATPS8795I','58GST323726432','GDMPM3914G','lokhandwale','22','admin',64,'OrgButton','[]','[]','[]',9,'2025-02-03 15:10:00'),('Seawave Forwarding Logistics','seawave@2323','','','','','','','','','','','','','','','admin',65,'OrgButton','[]','[]','[]',10,'2025-02-04 14:28:24');
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
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_orgcode` (`orgcode`),
  KEY `fk_orgname` (`orgname`),
  CONSTRAINT `fk_orgcode` FOREIGN KEY (`orgcode`) REFERENCES `users` (`orgcode`),
  CONSTRAINT `fk_orgname` FOREIGN KEY (`orgname`) REFERENCES `users` (`orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store client data and employee that created the client ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('allcargo','India','Maharashtra','Mumbai','4000044','9876543210','example@example.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','31','dsdafsfs fsfsdfsfSanjeet','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd',1,'Andheri','admin','OrgButton','2025-01-04 15:54:28',0,'allcargo-Andheri-seawave@2323','[\"Consignee\", \"Global\", \"Services\", \"Shippers\"]',1,'[\"Consignee\", \"Global\", \"Services\", \"Shippers\"]','[{\"email\": \"dean@aew.com\", \"mobile\": \"8655997234\", \"department\": \"management\", \"contactName\": \"Rishi\", \"designation\": \"Manager\"}, {\"email\": \"asd@gmila.in\", \"mobile\": \"2345145896\", \"department\": \"IT\", \"contactName\": \"Ayush\", \"designation\": \"Executive\"}]',NULL),('adani','Argentina','La Rioja','Villa Bustos','400614','9876543219','it.seawave21@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','68','dasdas asdadfadf','seawave@2323','Seawave Forwarding Logistics','adani pvt ltd',2,'mumbai','admin','OrgButton','2025-01-04 15:56:47',0,'adani-mumbai-seawave@2323','[\"Consignee\", \"Carrier\", \"Global\"]',1,'[\"Import\", \"Transport\", \"Freight\"]','[]',NULL),('vedant','East Timor','Manufahi Municipality','Fatuberliu','400614','5646456645','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','78','sdffafas dafafafa','seawave@2323','Seawave Forwarding Logistics','vedant  ltd pvt',3,'vapi','admin','OrgButton','2025-01-04 15:57:40',0,'vedant-vapi-seawave@2323','[\"Global\", \"Services\"]',1,'[\"Import\", \"Transport\", \"Freight\", \"Export\"]','[{\"email\": \"it.seawave21@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"vedant\", \"designation\": \"executive\"}]',NULL),('solanki','Armenia','Armavir Region','Aknalich','400004','9876543210','rishi.seawave@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','89','dasdasd adfsada adsfsgsda','seawave@2323','Seawave Forwarding Logistics','solanki ',4,'Andheri','admin','OrgButton','2025-01-04 15:59:14',0,'solanki-Andheri-seawave@2323','[\"Consignee\", \"Carrier\", \"Global\", \"Agent\"]',1,'[\"Transport\", \"Import\", \"Freight\", \"Export\"]','[{\"email\": \"dean@aew.in\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"fghdh \", \"designation\": \"executive\"}]',NULL),('solanki','India','Maharashtra','Pune','400614','9876543219','sofsfds@gmail.com','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','76','dadsad fff adfsfsvxafasf ','seawave@2323','Seawave Forwarding Logistics','solanki ',5,'Pune','admin','OrgButton','2025-01-06T06:37:07.072Z',0,'SO-SE-PU','[\"Shippers\", \"Agent\", \"Carrier\", \"Services\", \"Global\"]',1,'[\"Shippers\", \"Agent\", \"Carrier\", \"Services\", \"Global\"]','[{\"email\": \"rishi.seawave@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"rishi\", \"designation\": \"executive\"}]',NULL),('allcargo','Canada','Prince Edward Island','Souris','400004','9876543210','dean@aew.in','AAICS7836D','27AAICS7836D1Z3','AAICS7836D','45','gsdfdsf','seawave@2323','Seawave Forwarding Logistics','Allcargo Pvt Ltd',8,'vapi','admin','OrgButton','2025-01-07T06:54:03.719Z',0,'AL-SE-VA','[\"Agent\", \"Consignee\", \"Carrier\", \"Global\"]',1,'[\"Export\", \"Freight\"]','[{\"email\": \"rishi.seawave@gmail.com\", \"mobile\": \"8655997299\", \"department\": \"IT\", \"contactName\": \"rishi\", \"designation\": \"executive\"}]',NULL),('muggles','United Kingdom','Scotland','Logan','400703','02004263507','jai@3231322.hg.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','5','qwertyuhnfh,gf,','seawave@2323','Seawave Forwarding Logistics','muggles',9,'hogwarts','admin','OrgButton','2025-01-31 17:08:15',0,'muggles-hogwarts-seawave@2323','[\"Shippers\", \"Carrier\", \"Consignee\", \"Agent\"]',1,'[\"Import\", \"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"hio\", \"contactName\": \"gio\", \"designation\": \"gio\"}]',NULL),('tray','India','Maharashtra','Achalpur','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','77','dfgd','seawave@2323','Seawave Forwarding Logistics','Tray ltd pvt',10,'hogwarts','admin','OrgButton','2025-02-01 15:55:17',0,'tray-hogwarts-seawave@2323','[\"Shippers\", \"Agent\", \"Carrier\"]',1,'[\"Export\", \"Transport\"]','[{\"email\": \"jai@323gmail.in\", \"mobile\": \"02004263507\", \"department\": \"Import\", \"contactName\": \"gio\", \"designation\": \"asd\"}]',NULL),('muggles','India','Maharashtra','Aheri','400703','02004263507','jai@323gmail.in','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','90','dfgd','seawave@2323','Seawave Forwarding Logistics','muggles',11,'govandi','admin','OrgButton','2025-02-03T09:05:51.367Z',0,'MU-SE-GO','[]',1,'[]','[]',NULL),('reliance','India','Maharashtra','Navi Mumbai','400703','8975665231','test@test.com','RATPS8795I','58GST323726432','GDMPM3914G','22','jijamata nagar','seawave@2323','Seawave Forwarding Logistics','Reliance Ltd',12,'lokhandwale','admin','OrgButton','2025-02-03 15:10:00',0,'relience-lokhandwale-seawave@2323','[\"Consignee\", \"Carrier\", \"Global\"]',1,'[\"Import\", \"Freight\", \"Export\"]','[{\"email\": \"kira@gmail.test.in\", \"mobile\": \"8547736904\", \"department\": \"Communications\", \"contactName\": \"kira roshit\", \"designation\": \"executive\"}]',NULL),('','','','','','','','','','','','','seawave@2323','Seawave Forwarding Logistics','',22,'','admin','OrgButton','2025-02-04 14:28:24',0,'--seawave@2323','[]',0,'[]','[]',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of the data of the branches of the organization.\n    ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownbranches`
--

LOCK TABLES `ownbranches` WRITE;
/*!40000 ALTER TABLE `ownbranches` DISABLE KEYS */;
INSERT INTO `ownbranches` VALUES (6,'seawave@2323','Seawave Forwarding Logistics','Mumbai','27AAICS7836D1Z4','AAICS7836D','N K MISHRA','7654334323','Juinagar','Mumbai-2323'),(7,'seawave@2323','Seawave Forwarding Logistics','Jogbani','27GDMPM3914G1Z4','GDMPM3914G','vedant','98657451222','gjkjsof kdsf fsdfj dffksf kldhnf','Jogbani-2323'),(8,'seawave@2323','Seawave Forwarding Logistics','Delhi','27GDMPM3914G1Z4','GDMPM3914G','Rishi','98657451222','sdfdfsf vsdds','Delhi-2323'),(9,'seawave@2323','Seawave Forwarding Logistics','Kolkata','27GDMPM3914G1Z4','GDMPM3914G','Aayush','98657451222','Kolkata branch demo addresss','Kolkata-2323'),(10,'seatech@23','seatech','Mumbai','27AAICS7836D1Z4','AAICS7836D','kea','345345634','dssd dad','Mumbai-23');
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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store reminders for import';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
INSERT INTO `reminders` VALUES ('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA EXPORT ALL',2,'2024-11-22T14:46','Air EXPORT','Delhi','1','00','00','Pending',12,'A/Delhi/E/1/24-25'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',3,'2024-11-24T11:21','Air IMPORT','Jogbani','1','00','00','Pending',8,'Jogbani/A/24-25/12/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','DHH',4,'2024-11-08T11:21','Air IMPORT','Jogbani','2','00','00','Pending',9,'Jogbani/A/24-25/12/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','CUSTOM CLEAREANCE',5,'2024-11-08T11:21','Air IMPORT','Jogbani','2','00','00','Pending',10,'Jogbani/A/24-25/12/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',6,'2024-11-30T14:58','Air IMPORT','Jogbani','1','00','00','Pending',7,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',7,'2024-12-02T14:58','Air IMPORT','Jogbani','1','00','00','Pending',8,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','DHH',8,'2024-11-14T14:58','Air IMPORT','Jogbani','2','00','00','Pending',9,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','CUSTOM CLEAREANCE',9,'2024-11-14T14:58','Air IMPORT','Jogbani','2','00','00','Pending',10,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Test',10,'2024-11-14T14:58','Air IMPORT','Jogbani','1','00','00','Pending',16,'Jogbani/A/24-25/18/I'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',11,'Invalid date','Air IMPORT','Mumbai','2','00','00','Pending',1,'A/Mumbai/I/24-25/17'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',12,'2024-11-28T10:58','Air IMPORT','Mumbai','2','00','00','Pending',2,'A/Mumbai/I/24-25/17'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',13,'2024-11-23T11:57','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/18'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',14,'2024-11-25T23:57','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/18'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',23,'2024-11-23T14:54','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/21'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',24,'2024-11-25T21:24:00.000Z','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/21'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',25,'2024-11-28T21:24:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/21'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',26,'2024-11-23T15:42','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',27,'2024-11-25T22:12:00.000Z','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',28,'2024-11-28T22:12:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',29,'2024-12-05T22:12:00.000Z','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',30,'2024-11-15T10:10:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/22'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',31,'2024-12-13T15:11','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',32,'2024-12-16T03:11','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',33,'2024-12-19T03:11','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',34,'2024-12-26T03:11','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',35,'2024-12-31T03:11','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',36,'2024-12-08T11:49:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/1'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',39,'2024-12-25T04:32','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/8'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',40,'2025-01-01T04:32','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/8'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',41,'2025-01-06T04:32','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/8'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',42,'2024-12-27T10:54:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/8'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',43,'2024-12-22T04:39','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/7'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',44,'2024-12-25T04:39','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/7'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',45,'2025-01-06T04:39','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/7'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Packaging',46,'2024-12-27T10:48:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/7'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','ETA',52,'2024-12-28T11:40','Air EXPORT','Mumbai','2','00','00','Pending',9,'A/Mumbai/E/24-25/4'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','ETA',53,'2024-12-28T11:41','Air EXPORT','Mumbai','2','00','00','Pending',9,'A/Mumbai/E/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',55,'2024-12-22T02:43','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',56,'2024-12-25T02:43','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',57,'2025-01-01T02:43','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',58,'2025-01-06T02:43','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',59,'2024-12-27T12:29:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/13'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',60,'2024-12-21T17:32','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',61,'2024-12-24T05:32','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',62,'2024-12-27T05:32','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',63,'2025-01-03T05:32','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',64,'2025-01-08T05:32','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/5'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',65,'2025-01-09T11:31','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',66,'2025-01-11T23:31','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',67,'2025-01-14T23:31','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',68,'2025-01-21T23:31','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',69,'2025-01-26T23:31','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',70,'2025-01-09T10:40:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/14'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','ETA',71,'2025-01-07T14:15','Air IMPORT','Mumbai','1','00','00','Pending',3,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',75,'2025-01-25T02:15','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',76,'2025-01-09T10:43:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','E-SANCHIT',77,'2025-01-10T02:15','Air IMPORT','Mumbai','2','00','00','Pending',4,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',78,'2025-01-13T02:15','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',79,'2025-01-20T02:15','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/15'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',82,'2025-01-02T00:21:00.000Z','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/11'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',83,'2025-01-07T00:21:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/11'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','PORT CFS NOMINATION',85,'2025-02-06T23:32:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',5,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',86,'2025-02-13T23:32:00.000Z','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',87,'2025-02-18T23:32:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',88,'2025-02-06T12:24:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/20'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','processing',96,'2025-02-15T00:28','Air IMPORT','Mumbai','02','00','00','Pending',6,'A/Mumbai/I/24-25/19'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','Scanning ',97,'2025-02-20T00:28','Air IMPORT','Mumbai','01','00','00','Pending',7,'A/Mumbai/I/24-25/19'),('Seawave Forwarding Logistics','seawave@2323','[{\"username\": \"hemang@executive\"}]','Packaging',98,'2025-02-03T12:28:00.000Z','Air IMPORT','Mumbai','01','00','00','Pending',8,'A/Mumbai/I/24-25/19');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of all the detailed data of the particular workflow as per line of business';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setworkflow`
--

LOCK TABLES `setworkflow` WRITE;
/*!40000 ALTER TABLE `setworkflow` DISABLE KEYS */;
INSERT INTO `setworkflow` VALUES (3,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','1','00','00','2025-01-29 07:39:23','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]'),(4,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','ETA','After','02','12','00',0,'E-SANCHIT','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','2','00','00','2024-11-15 10:06:59','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-T\", \"SEZ-M\"]'),(5,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','E-SANCHIT','After','03','00','00',0,'PORT CFS NOMINATION','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','01','00','00','2024-11-15 10:07:07','No','Yes','[\"LCL\", \"Break Bulk\", \"FCL\"]','[\"In-Bond\", \"Ex-Bond\", \"SEZ-T\", \"SEZ-Z\", \"SEZ-M\", \"Home\"]'),(6,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','PORT CFS NOMINATION','After','07','00','00',0,'processing','[{\"username\": \"hemang@executive\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','02','00','00','2024-11-15 10:07:18','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]'),(7,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','processing','After','05','00','00',0,'Scanning ','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','01','00','00','2024-11-15 10:12:01','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]'),(8,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','After','03','00','00',0,'Packaging','[{\"username\": \"hemang@executive\"}]','01','00','00','2024-12-24 12:19:37','Yes','No','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]'),(9,'Air EXPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}]','2','00','00','2024-12-24 12:16:13','No','Yes','[\"FCL\"]','[\"Home\", \"In-Bond\"]'),(10,'Air IMPORT','Mumbai','null','Seawave Forwarding Logistics','seawave@2323','','After','','','',1,'ETA','[]','1','','','2025-01-29 07:40:31','No','Yes','[\"FCL\", \"LCL\", \"Break Bulk\"]','[\"Home\", \"In-Bond\", \"Ex-Bond\", \"SEZ-Z\", \"SEZ-M\", \"SEZ-T\"]'),(13,'Air IMPORT','Mumbai','ALL','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','After','01','00','00',0,'Sanjeet','[{\"username\": \"rishi@manager\"}]','02','00','00','2025-02-07 09:28:51','Yes','Yes','[\"LCL\"]','[\"In-Bond\"]');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingexport`
--

LOCK TABLES `trackingexport` WRITE;
/*!40000 ALTER TABLE `trackingexport` DISABLE KEYS */;
INSERT INTO `trackingexport` VALUES (1,'ETA','2024-12-28T11:40',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/E/24-25/4','admin',' d  hr  min','Air Export','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(2,'ETA','2024-12-28T11:41',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/E/24-25/5','aayush@manager',' d  hr  min','Air Export','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(3,'ETA','2025-01-23T16:44',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/E/24-25/2','admin',' d  hr  min','Air Export','Mumbai','Mumbai-2323','Allcargo Pvt Ltd',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingimport`
--

LOCK TABLES `trackingimport` WRITE;
/*!40000 ALTER TABLE `trackingimport` DISABLE KEYS */;
INSERT INTO `trackingimport` VALUES (1,'ETA','2024-11-23T16:35',NULL,NULL,'rrerer','Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/22','aayush@manager',' d  hr  min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(2,'processing','2024-11-15T16:35',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/22','aayush@manager','07 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(3,'E-SANCHIT','2024-11-26T04:35',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/22','aayush@manager','02 d 12 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(4,'Packaging','2024-11-18T15:40',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/22','aayush@manager','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(5,'PORT CFS NOMINATION','2024-11-15T16:35',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/22','aayush@manager','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','C CONNECT LOGGI',0,NULL),(6,'Scanning ','2024-12-31T03:11',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','05 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(7,'ETA','2024-12-13T15:11',NULL,NULL,'rrerer','Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin',' d  hr  min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(8,'processing','2024-12-26T03:11',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','07 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(9,'PORT CFS NOMINATION','2024-12-19T03:11',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(10,'E-SANCHIT','2024-12-16T03:11',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','02 d 12 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(11,'Packaging','2024-12-08T17:19',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/1','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Highland Residency',0,NULL),(12,'ETA','2024-12-23T11:02:00.000Z','2024-12-24T16:36','24 hr 4 min','rrerer','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/8','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(13,'processing','2025-01-05T04:32',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/8','admin','07 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(14,'Scanning ','2025-01-10T04:32',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/8','admin','05 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(15,'Packaging','2024-12-27T16:24',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/8','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(16,'PORT CFS NOMINATION','2024-12-29T04:32',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/8','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(17,'E-SANCHIT','2024-12-25T23:02:00.000Z','2024-12-24T16:36','-36 hr -56 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/8','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(18,'ETA','2024-12-19T11:09:00.000Z','2024-12-24T16:39','120 hr 0 min','rrerer','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/7','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(19,'processing','2024-12-31T23:09:00.000Z','2024-12-24T16:39','-180 hr 0 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/7','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(20,'Scanning ','2025-01-06T04:39',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/7','admin','05 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(21,'Packaging','2024-12-27T16:18',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/7','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(22,'PORT CFS NOMINATION','2024-12-25T04:39',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/7','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(23,'E-SANCHIT','2024-12-22T04:39',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/7','admin','02 d 12 hr 00 min','Air Import','Mumbai','Mumbai-2323','Tray ltd pvt',0,NULL),(24,'ETA','2024-12-20T12:21:00.000Z',NULL,NULL,'rrerer','Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','aayush@manager','d hr min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(25,'processing','2025-01-02T00:21:00.000Z',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','aayush@manager','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(26,'PORT CFS NOMINATION','2024-12-26T00:21:00.000Z',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(27,'Scanning ','2025-01-07T00:21:00.000Z',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','aayush@manager','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(28,'E-SANCHIT','2024-12-23T00:21:00.000Z',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/11','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(29,'ETA','2024-12-19T14:43','2025-01-07T11:01','452 hr 18 min','rrerer','Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/13','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(30,'processing','2025-01-01T02:43',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/13','admin','07 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(31,'Scanning ','2025-01-06T02:43',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/13','admin','05 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(32,'E-SANCHIT','2024-12-22T02:43',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/13','admin','02 d 12 hr 00 min','Air Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(33,'Packaging','2024-12-27T17:59',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/13','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(34,'PORT CFS NOMINATION','2024-12-25T02:43',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/13','admin','03 d 00 hr 00 min','Air Import','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL),(63,'ETA','2025-02-06T06:58:00.000Z','2025-02-07T14:53','26 hr 25 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','d hr min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(64,'Packaging','2025-02-03T17:58',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/19','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(65,'Scanning ','2025-02-24T00:28',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/19','admin','05d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(66,'E-SANCHIT','2025-02-08T18:58:00.000Z','2025-02-07T14:53','-34 hr -35 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','02d 12hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(67,'processing','2025-02-19T00:28',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/19','admin','07d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(68,'PORT CFS NOMINATION','2025-02-11T18:58:00.000Z','2025-02-07T14:53','-106 hr -35 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','A/Mumbai/I/24-25/19','admin','03d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','muggles',0,NULL),(69,'Sanjeet','2025-02-08T09:29:00.000Z',NULL,NULL,NULL,'Seawave Forwarding Logistics','seawave@2323','Pending','A/Mumbai/I/24-25/23','admin','01d 00hr 00min','Air IMPORT','Mumbai','Mumbai-2323','adani pvt ltd',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='it will store all transaction dr and cr related to that job number ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionhistory`
--

LOCK TABLES `transactionhistory` WRITE;
/*!40000 ALTER TABLE `transactionhistory` DISABLE KEYS */;
INSERT INTO `transactionhistory` VALUES (9,'A/Mumbai/I/24-25/2','2024-12-26 00:00:00','tye of ecoosdf','42565565','0','100000.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(10,'A/Mumbai/E/24-25/1','2024-12-13 00:00:00','tye of ecoosdf','42565565','0','95000.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(11,'S/Mumbai/I/24-25/4','2024-12-06 00:00:00','pen','55325235525','0','128.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(12,'A/Mumbai/I/24-25/2','2024-12-20 00:00:00','tye of ecoosdf','42565565','0','118.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(13,'A/Mumbai/E/24-25/2','2024-12-27 00:00:00','new laptop','345345354','0','1000.00','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(14,'A/Mumbai/I/24-25/1','2024-12-18 00:00:00','tye of ecoosdf','34535453','0','1000','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(16,'A/Mumbai/I/24-25/1','2024-12-30 00:00:00','on-account','120','10000','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(17,'A/Mumbai/E/24-25/6','2024-12-31 00:00:00','Bill','5353533','33234.78','0','Seawave Forwarding Logistics','seawave@2323','Bihar',0,NULL),(18,'A/Mumbai/E/24-25/6','2024-12-31 00:00:00','against-bill','501','27800.02','0','Seawave Forwarding Logistics','seawave@2323','Mumbai',0,NULL),(27,'S/Mumbai/E/24-25/8','2025-02-07 00:00:00','Bill','saadd','12345668.00','0','Seawave Forwarding Logistics','seawave@2323','hogwarts',0,NULL),(29,'A/Mumbai/I/24-25/19','2025-02-07 00:00:00','Bill','billtest0002','93457.00','0','Seawave Forwarding Logistics','seawave@2323','hogwarts',0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store user roles for employees in an org ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroles`
--

LOCK TABLES `userroles` WRITE;
/*!40000 ALTER TABLE `userroles` DISABLE KEYS */;
INSERT INTO `userroles` VALUES (3,'Sales','Seawave Forwarding Logistics','seawave@2323'),(4,'Developer','Seawave Forwarding Logistics','seawave@2323'),(5,'Manager','Seawave Forwarding Logistics','seawave@2323'),(6,'manager','seatech','seatech@23'),(7,'sales','seatech','seatech@23');
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
INSERT INTO `users` VALUES ('admin','12345678','c@2102','C Connect Logi',45),('admin','12345','seatech@23','seatech',45),('admin','12345','seawave@2323','Seawave Forwarding Logistics',2),('test','1234','testorg@123','TestOrg',45),('Test','Test1234','testorg@Test123','TestOrg',45);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the workflow rows ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
INSERT INTO `workflow` VALUES (1,'Air IMPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323','ALL'),(4,'Air EXPORT','Mumbai','Seawave Forwarding Logistics','seawave@2323','ALL');
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

-- Dump completed on 2025-02-08 10:54:40
