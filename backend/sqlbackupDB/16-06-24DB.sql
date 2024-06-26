CREATE DATABASE  IF NOT EXISTS `crm_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `crm_db`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: crm_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
  `address` varchar(50) DEFAULT 'null',
  `GST` varchar(45) DEFAULT 'null',
  `IEC` varchar(45) DEFAULT 'null',
  `finaldestination` varchar(45) DEFAULT 'null',
  `portofshipment` varchar(45) DEFAULT 'null',
  `approval` json DEFAULT NULL,
  `uniquevalue` varchar(45) NOT NULL,
  `createdat` varchar(45) NOT NULL,
  `importerbranchname` varchar(45) DEFAULT 'null',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store approvaljob before actually approving or rejecting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalimpjob`
--

LOCK TABLES `approvalimpjob` WRITE;
/*!40000 ALTER TABLE `approvalimpjob` DISABLE KEYS */;
INSERT INTO `approvalimpjob` VALUES (2,'24-25/S/Raxaul/I/xyzabc/2','2024-06-09 11:48:00','2024-06-04 11:48:00','Sea','Kolkata Sea','Yes','Destuff',3,'Yes','Ex-Bond','LCL','fdgf','dfhdfg','MBL/MAWB','goku','Seawave Forwarding Logistics','seawave@2323','shreyash@executive','6','Surrender','t67','OneTime','2','Raxaul','Raxaul-2323','Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','dddgfgfdgf','test','[{\"status\": null, \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"shreyash@executive\"}]','JobsButton','2024-06-09 11:48:24','gond'),(4,'24-25/S/Raxaul/I/xyzabc/4','2024-06-12 15:59:00','2024-06-10 15:59:00','Sea','Jogbani LCS','No','Destuff',7,'No','Ex-Bond','Break Bulk','dummy','dfgf','MBL/MAWB','dgdfhgd','Seawave Forwarding Logistics','seawave@2323','hemang@executive','5','Original','rr45','OneTime','4','Raxaul','Raxaul-2323','Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','[{\"status\": null, \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"shreyash@executive\"}]','JobsButton','2024-06-12 15:59:54','diggachigga'),(5,'Jogbani/S/24-25/I/yy/1','2024-06-13 16:07:00','2024-06-11 16:07:00','Sea','Raxaul LCS','Yes','Destuff',3,'No','Ex-Bond','LCL','dummy','dfhdfg','MBL/MAWB','goku','Seawave Forwarding Logistics','seawave@2323','hemang@executive','5','Surrender','t67','OneTime','1','Jogbani','Jogbani-2323','Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-06-13 16:07:13','diggachigga'),(6,'24-25/S/Raxaul/I/xyzabc/5','2024-06-13 18:02:00','2024-06-09 18:02:00','Sea','Jogbani LCS','Yes','Destuff',2,'No','Ex-Bond','Break Bulk','dummy','dfgf','HBL/HAWB','dgdfhgd','Seawave Forwarding Logistics','seawave@2323','shreyash@executive','5','Surrender','rr45','OneTime','5','Raxaul','Raxaul-2323','Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','dddgfgfdgf','fddgf','[{\"status\": null, \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"shreyash@executive\"}]','JobsButton','2024-06-13 18:02:22','gond'),(7,'24-25/S/Raxaul/I/xyzabc/6','2024-06-14 15:09:00','2024-06-12 15:09:00','Sea','Raxaul LCS','Yes','Destuff',7,'No','SEZ-Z','Break Bulk','dummy','dfgf','MBL/MAWB','dgdfhgd','Seawave Forwarding Logistics','seawave@2323','hemang@executive','5','Surrender','rr45','OneTime','6','Raxaul','Raxaul-2323','Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','[{\"status\": null, \"employeename\": \"aayush@manager\"}, {\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"shreyash@executive\"}]','JobsButton','2024-06-14 15:09:18','diggachigga'),(8,'Jogbani/S/24-25/I/yy/2','2024-06-15 17:02:00','2024-06-12 17:02:00','Sea','ICD Tumb','No','Destuff',7,'No','In-Bond','LCL','fg','ert','HBL/HAWB','ert','Seawave Forwarding Logistics','seawave@2323','hemang@executive','3','Surrender','hf56','Yearly','2','Jogbani','Jogbani-2323','Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','sdfds','gendu','[{\"status\": \"Approve\", \"employeename\": \"hemang@executive\"}, {\"status\": \"Approve\", \"employeename\": \"aayush@manager\"}]','JobsButton','2024-06-15 17:02:49','gond');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the organizations before approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalorg`
--

LOCK TABLES `approvalorg` WRITE;
/*!40000 ALTER TABLE `approvalorg` DISABLE KEYS */;
INSERT INTO `approvalorg` VALUES ('digga','India','Maharashtra','Navi Mumbai','400703','2004263507','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','4','Omkar Apartment B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Digga D','diggachigga','aayush@manager',1,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aayush@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-06-05 15:31:43'),('gondya','dsf','dsf','df','345326','5645653232','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','7','dfs','seawave@2323','Seawave Forwarding Logistics','Gondya','gond','hemang@executive',2,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-06-05 15:40:28');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the name of the approver list of a particular organization';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approverlist`
--

LOCK TABLES `approverlist` WRITE;
/*!40000 ALTER TABLE `approverlist` DISABLE KEYS */;
INSERT INTO `approverlist` VALUES ('Seawave Forwarding Logistics','seawave@2323',4,'Organizations','Raxaul','Raxaul-2323','[\"OrgButton\"]',2),('Seawave Forwarding Logistics','seawave@2323',5,'Jobs','Raxaul','Raxaul-2323','[\"JobsButton\"]',2),('Seawave Forwarding Logistics','seawave@2323',7,'Jobs','Jogbani','Jogbani-2323','[\"JobsButton\"]',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store all the names of users for a particular approval list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvername`
--

LOCK TABLES `approvername` WRITE;
/*!40000 ALTER TABLE `approvername` DISABLE KEYS */;
INSERT INTO `approvername` VALUES (4,'Seawave Forwarding Logistics','seawave@2323','Organizations','rishi@manager','Raxaul','Raxaul-2323','[\"OrgButton\"]',4),(5,'Seawave Forwarding Logistics','seawave@2323','Organizations','hemang@executive','Raxaul','Raxaul-2323','[\"OrgButton\"]',4),(6,'Seawave Forwarding Logistics','seawave@2323','Organizations','aayush@manager','Raxaul','Raxaul-2323','[\"OrgButton\"]',4),(7,'Seawave Forwarding Logistics','seawave@2323','Jobs','aayush@manager','Raxaul','Raxaul-2323','[\"JobsButton\"]',5),(8,'Seawave Forwarding Logistics','seawave@2323','Jobs','hemang@executive','Raxaul','Raxaul-2323','[\"JobsButton\"]',5),(9,'Seawave Forwarding Logistics','seawave@2323','Jobs','shreyash@executive','Raxaul','Raxaul-2323','[\"JobsButton\"]',5),(10,'Seawave Forwarding Logistics','seawave@2323','Jobs','hemang@executive','Jogbani','Jogbani-2323','[\"JobsButton\"]',7),(11,'Seawave Forwarding Logistics','seawave@2323','Jobs','aayush@manager','Jogbani','Jogbani-2323','[\"JobsButton\"]',7);
/*!40000 ALTER TABLE `approvername` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankaccount`
--

DROP TABLE IF EXISTS `bankaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bankaccount` (
  `ownbranchname` varchar(50) NOT NULL,
  `ownbranchcode` varchar(50) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
INSERT INTO `bankaccount` VALUES ('Raxaul','Raxaul-2323','seawave@2323','Seawave Forwarding Logistics','ICICI','A234GDFY564GHF',1,'Savings','null','SBIN0125620',3434),('Jogbani','Jogbani-2323','seawave@2323','Seawave Forwarding Logistics','gds','52528582355285sdf',2,'Cash Credit','null','SBIN0125620',35342);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is for access of users for their org branches ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchaccess`
--

LOCK TABLES `branchaccess` WRITE;
/*!40000 ALTER TABLE `branchaccess` DISABLE KEYS */;
INSERT INTO `branchaccess` VALUES (1,'Raxaul','Raxaul-2323','rishi@manager','Seawave Forwarding Logistics','seawave@2323'),(3,'Jogbani','Jogbani-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(4,'Raxaul','Raxaul-2323','hemang@executive','Seawave Forwarding Logistics','seawave@2323'),(5,'Raxaul','Raxaul-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(7,'Jogbani','Jogbani-2323','shreyash@executive','Seawave Forwarding Logistics','seawave@2323'),(8,'Jogbani','Jogbani-2323','aayush@manager','Seawave Forwarding Logistics','seawave@2323'),(9,'Raxaul','Raxaul-2323','shreyash@executive','Seawave Forwarding Logistics','seawave@2323');
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
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the branches table that are linked to organizations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'vashi','seaconnect','seawave@2323','1'),(2,'vashi','forte services','seawave@2323','1'),(3,'vashi','seaconnect','seawave@2323','2'),(4,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(5,'Ahemdabad','Seatech','seawave@2323','4'),(6,'vashi','seaconnect','seawave@2323','1'),(7,'telangana','erte retgdf','seawave@2323','2'),(8,'telangana','erte retgdf','seawave@2323','1'),(9,'Parel','seaconnect','seawave@2323','2'),(10,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(11,'vashi','seaconnect','seawave@2323','1'),(12,'Patna','uneed services','seawave@2323','2'),(13,'vashi','seaconnect','seawave@2323','1'),(14,'vashi','uneed services','seawave@2323','1'),(15,'Parel','accenture services','seawave@2323','2'),(16,'Jaipur','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(17,'telangana','seaconnect','seawave@2323','1'),(18,'Parel','seaconnect','seawave@2323','1'),(19,'vashi','seaconnect','seawave@2323','1'),(20,'Patna','seaconnect','seawave@2323',NULL),(21,'Jaipur','uneed services','seawave@2323','1'),(22,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(23,'Jaipur','forte services','seawave@2323','1'),(24,'telangana','seaconnect','seawave@2323','1'),(25,'Raipur','seaconnect','seawave@2323','1'),(26,'Null','seaconnect','seawave@2323','1'),(27,'vashi','accenture services','seawave@2323','2'),(28,'Uganda','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(29,'Jaipur','forte services','seawave@2323','4'),(30,'goat','BHaijan','seawave@2323','5'),(31,'Parel','tttt','seawave@2323','6'),(32,'bhais','tttt','seawave@2323','7'),(33,'buffalo','ggggggggg','seawave@2323','8'),(34,'injection','iiiii','seawave@2323','9'),(35,'done','done','seawave@2323','10'),(36,'jhaatu','dummy','seawave@2323','11'),(37,'kerala','test','seawave@2323','12'),(38,'Himalaya','uneed services','seawave@2323','13'),(39,'thth','ff','seawave@2323','14'),(40,'final','Final Test','seawave@2323','15'),(41,'finale','Final','seawave@2323','16'),(42,'DJ','Final Test','seawave@2323','17'),(43,'Ghatkopar','Final Test','seawave@2323','18'),(44,'render','Final Render Test','seawave@2323','19'),(45,'dsf','final G','seawave@2323','20'),(46,'finale','final G','seawave@2323','21'),(47,'dy','Final Render Test','seawave@2323','22'),(48,'Alephata','JamJam','seawave@2323','23'),(49,'test branch','Test Organization','seawave@2323','24'),(50,'Jamacia','usain bolt','seawave@2323','25'),(51,'approver','ApproverLog Test Dummy','seawave@2323','26'),(52,'kurla','vector','seawave@2323','27'),(53,'vashi','seaconnect','seawave@2323','1'),(54,'telangana','erte retgdf','seawave@2323','1'),(55,'Belapur','seaconnect','seawave@2323','2'),(56,'ghana','Gazai Medicals','seawave@2323','3'),(57,'sfsdf','Apexsea Logistics Pvt Ltd','seawave@2323','4'),(58,'ginger','uneed services','seawave@2323','5'),(59,'DJ','Final Test','seawave@2323','6'),(60,'hareshwar','Hari Hareshwar','seawave@2323','7'),(61,'nanded','Damru','seawave@2323','8'),(62,'Miami','GTA','seawave@2323','9'),(63,'motif','Notif Test','seawave@2323','10'),(64,'DJ','Final Render Test','seawave@2323','11'),(65,'Allorg','Notification Test Final','seawave@2323','12'),(66,'abc','XYZ XYZ','seawave@2323','13'),(67,'zaza','zaza test','seawave@2323','14'),(68,'haland','Hazardous notification','seawave@2323','15'),(69,'gdsfds','usain bolt','seawave@2323','16'),(70,'Hindustan','Rooster','seawave@2323',NULL),(71,'haridwar','Heritage Motors','seawave@2323',NULL),(72,'dsfdsf','fsdgfsf','seawave@2323',NULL),(73,'nigeria','nij','seawave@2323',NULL),(74,'KJ Somaiya','gds','seawave@2323',NULL),(75,'dfgdfg','dgdfg','seawave@2323',NULL),(76,'dummy','dfgdfg','seawave@2323',NULL),(77,'gfg','dgdfsd','seawave@2323',NULL),(78,'dsg','fsdf','seawave@2323',NULL),(79,'hyderbad','seaconnect','seawave@2323','1'),(80,'hydrebad','uneed services','seawave@2323','1'),(81,'patna','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(82,'diggachigga','Digga D','seawave@2323','1'),(83,'gond','Gondya','seawave@2323','2');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the custom job number';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customjobnumber`
--

LOCK TABLES `customjobnumber` WRITE;
/*!40000 ALTER TABLE `customjobnumber` DISABLE KEYS */;
INSERT INTO `customjobnumber` VALUES (1,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Raxaul','Raxaul-2323','null'),(2,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Raxaul','Raxaul-2323','null'),(3,'Seawave Forwarding Logistics','seawave@2323','BranchName','Raxaul','Raxaul-2323','null'),(4,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Raxaul','Raxaul-2323','null'),(5,'Seawave Forwarding Logistics','seawave@2323','JobNumber','Raxaul','Raxaul-2323','null'),(6,'Seawave Forwarding Logistics','seawave@2323','Custom','Raxaul','Raxaul-2323','xyzabc'),(9,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Kolkata Bihar','Kolkata-2323','null'),(10,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Kolkata Bihar','Kolkata-2323','null'),(11,'Seawave Forwarding Logistics','seawave@2323','BranchName','Kolkata Bihar','Kolkata-2323','null'),(12,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Kolkata Bihar','Kolkata-2323','null'),(13,'Seawave Forwarding Logistics','seawave@2323','JobNumber','Kolkata Bihar','Kolkata-2323','null'),(14,'Seawave Forwarding Logistics','seawave@2323','Custom','Kolkata Bihar','Kolkata-2323','hello'),(15,'Seawave Forwarding Logistics','seawave@2323','BranchName','Jogbani','Jogbani-2323','null'),(16,'Seawave Forwarding Logistics','seawave@2323','Air/Sea','Jogbani','Jogbani-2323','null'),(17,'Seawave Forwarding Logistics','seawave@2323','Fiscal Year','Jogbani','Jogbani-2323','null'),(18,'Seawave Forwarding Logistics','seawave@2323','JobNumber','Jogbani','Jogbani-2323','null'),(19,'Seawave Forwarding Logistics','seawave@2323','Import/Export','Jogbani','Jogbani-2323','null'),(20,'Seawave Forwarding Logistics','seawave@2323','Custom','Jogbani','Jogbani-2323','yy');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('hemang@executive','12345','seawave@2323','Seawave Forwarding Logistics',1,'Hemang Ranjan','executive'),('rishi@manager','345345','seawave@2323','Seawave Forwarding Logistics',2,'Rishi Mishra','manager'),('aayush@manager','12345678','seawave@2323','Seawave Forwarding Logistics',3,'Aayush Mishra','manager'),('shreyash@executive','12345','seawave@2323','Seawave Forwarding Logistics',4,'Shreyash Pingle','executive'),('gautam @Sales','12345','seawave@2323','Seawave Forwarding Logistics',5,'Gautam Gambhir','Sales'),('Dog@Developer','1212','seawave@2323','Seawave Forwarding Logistics',6,'Doggy Molly','Developer'),('ggfhg@Sales','123123','seawave@2323','Seawave Forwarding Logistics',7,'ggfhg fhdf','Sales');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
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
  `address` varchar(50) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store the general component data ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impgeneral`
--

LOCK TABLES `impgeneral` WRITE;
/*!40000 ALTER TABLE `impgeneral` DISABLE KEYS */;
INSERT INTO `impgeneral` VALUES (5,'Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','Seawave Forwarding Logistics','seawave@2323','hemang@executive','24-25/S/Raxaul/I/xyzabc/4','diggachigga','Raxaul','Raxaul-2323'),(7,'Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Jogbani/S/24-25/I/yy/1','diggachigga','Jogbani','Jogbani-2323'),(8,'Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Jogbani/S/24-25/I/yy/1','diggachigga','Jogbani','Jogbani-2323'),(9,'Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','dddgfgfdgf','fddgf','Seawave Forwarding Logistics','seawave@2323','shreyash@executive','24-25/S/Raxaul/I/xyzabc/5','gond','Raxaul','Raxaul-2323'),(10,'Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','dddgfgfdgf','fddgf','Seawave Forwarding Logistics','seawave@2323','shreyash@executive','24-25/S/Raxaul/I/xyzabc/5','gond','Raxaul','Raxaul-2323'),(11,'Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','Seawave Forwarding Logistics','seawave@2323','hemang@executive','24-25/S/Raxaul/I/xyzabc/6','diggachigga','Raxaul','Raxaul-2323'),(12,'Digga D','Omkar Apartment B-10-15 Sector-15 1:1','27GDMPM3914G1Z4','GDMPM3914G','good bye','test','Seawave Forwarding Logistics','seawave@2323','hemang@executive','24-25/S/Raxaul/I/xyzabc/6','diggachigga','Raxaul','Raxaul-2323'),(13,'Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','sdfds','gendu','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Jogbani/S/24-25/I/yy/2','gond','Jogbani','Jogbani-2323'),(14,'Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','dddgfgfdgf','test','Seawave Forwarding Logistics','seawave@2323','shreyash@executive','24-25/S/Raxaul/I/xyzabc/2','gond','Raxaul','Raxaul-2323'),(15,'Gondya','dfs','27GDMPM3914G1Z4','GDMPM3914G','sdfds','gendu','Seawave Forwarding Logistics','seawave@2323','hemang@executive','Jogbani/S/24-25/I/yy/2','gond','Jogbani','Jogbani-2323');
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
  PRIMARY KEY (`id`),
  KEY `idx_jobnumber` (`jobnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in import will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impjobcreation`
--

LOCK TABLES `impjobcreation` WRITE;
/*!40000 ALTER TABLE `impjobcreation` DISABLE KEYS */;
INSERT INTO `impjobcreation` VALUES ('24-25/S/Raxaul/I/xyzabc/4','2024-06-12 15:59:00','2024-06-10 15:59:00','Sea','Jogbani LCS','No','Destuff',7,'No','Ex-Bond','Break Bulk','dummy','dfgf','MBL/MAWB','dgdfhgd','Seawave Forwarding Logistics','seawave@2323','hemang@executive',2,5,'Original','rr45','OneTime',4,'Raxaul','Raxaul-2323'),('Jogbani/S/24-25/I/yy/1','2024-06-13 16:07:00','2024-06-11 16:07:00','Sea','Raxaul LCS','Yes','Destuff',3,'No','Ex-Bond','LCL','dummy','dfhdfg','MBL/MAWB','goku','Seawave Forwarding Logistics','seawave@2323','hemang@executive',3,5,'Surrender','t67','OneTime',1,'Jogbani','Jogbani-2323'),('24-25/S/Raxaul/I/xyzabc/5','2024-06-13 18:02:00','2024-06-09 18:02:00','Sea','Jogbani LCS','Yes','Destuff',2,'No','Ex-Bond','Break Bulk','dummy','dfgf','HBL/HAWB','dgdfhgd','Seawave Forwarding Logistics','seawave@2323','shreyash@executive',4,5,'Surrender','rr45','OneTime',5,'Raxaul','Raxaul-2323'),('24-25/S/Raxaul/I/xyzabc/6','2024-06-14 15:09:00','2024-06-12 15:09:00','Sea','Raxaul LCS','Yes','Destuff',7,'No','SEZ-Z','Break Bulk','dummy','dfgf','MBL/MAWB','dgdfhgd','Seawave Forwarding Logistics','seawave@2323','hemang@executive',5,5,'Surrender','rr45','OneTime',6,'Raxaul','Raxaul-2323'),('24-25/S/Raxaul/I/xyzabc/2','2024-06-09 11:48:00','2024-06-04 11:48:00','Sea','Kolkata Sea','Yes','Destuff',3,'Yes','Ex-Bond','LCL','fdgf','dfhdfg','MBL/MAWB','goku','Seawave Forwarding Logistics','seawave@2323','shreyash@executive',6,6,'Surrender','t67','OneTime',2,'Raxaul','Raxaul-2323'),('Jogbani/S/24-25/I/yy/2','2024-06-15 17:02:00','2024-06-12 17:02:00','Sea','ICD Tumb','No','Destuff',7,'No','In-Bond','LCL','fg','ert','HBL/HAWB','ert','Seawave Forwarding Logistics','seawave@2323','hemang@executive',7,3,'Surrender','hf56','Yearly',2,'Jogbani','Jogbani-2323');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store import notifications ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impnotifications`
--

LOCK TABLES `impnotifications` WRITE;
/*!40000 ALTER TABLE `impnotifications` DISABLE KEYS */;
INSERT INTO `impnotifications` VALUES (2,'24-25/S/Raxaul/I/xyzabc/2','Gondya','2024-06-09 11:48:31','JobsButton','gond','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"shreyash@executive\"}]','[{\"time\": \"2024-06-12 20:07:51\", \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-06-09 11:51:26\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-06-09 11:50:49\", \"employeename\": \"shreyash@executive\"}]','[{\"read\": 1, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"shreyash@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323','shreyash@executive'),(4,'24-25/S/Raxaul/I/xyzabc/4','Digga D','2024-06-12 16:00:03','JobsButton','diggachigga','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"shreyash@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-06-12 16:01:43\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-06-12 16:02:24\", \"employeename\": \"shreyash@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"shreyash@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323','hemang@executive'),(5,'Jogbani/S/24-25/I/yy/1','Digga D','2024-06-13 16:07:20','JobsButton','diggachigga','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-06-13 16:07:35\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-06-13 16:08:19\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Jogbani','Jogbani-2323','hemang@executive'),(6,'24-25/S/Raxaul/I/xyzabc/5','Gondya','2024-06-13 18:02:29','JobsButton','gond','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"shreyash@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-06-13 18:03:16\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-06-13 18:02:39\", \"employeename\": \"shreyash@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"shreyash@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323','shreyash@executive'),(7,'24-25/S/Raxaul/I/xyzabc/6','Digga D','2024-06-14 15:09:26','JobsButton','diggachigga','[{\"employeename\": \"aayush@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"shreyash@executive\"}]','[{\"time\": null, \"employeename\": \"aayush@manager\"}, {\"time\": \"2024-06-14 15:09:33\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-06-14 15:09:58\", \"employeename\": \"shreyash@executive\"}]','[{\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"shreyash@executive\"}]','Seawave Forwarding Logistics','seawave@2323','Raxaul','Raxaul-2323','hemang@executive'),(8,'Jogbani/S/24-25/I/yy/2','Gondya','2024-06-15 17:02:58','JobsButton','gond','[{\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-06-15 17:03:49\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-06-15 17:03:40\", \"employeename\": \"aayush@manager\"}]','[{\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','Seawave Forwarding Logistics','seawave@2323','Jogbani','Jogbani-2323','hemang@executive');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='line of business table as per users prefrences';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lob`
--

LOCK TABLES `lob` WRITE;
/*!40000 ALTER TABLE `lob` DISABLE KEYS */;
INSERT INTO `lob` VALUES (10,'Air Import','Seawave Forwarding Logistics','seawave@2323','Air'),(11,'Sea Import','Seawave Forwarding Logistics','seawave@2323','Sea'),(12,'Air Export','Seawave Forwarding Logistics','seawave@2323','Air'),(13,'Sea Export','Seawave Forwarding Logistics','seawave@2323','Sea');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table contains all the milestones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milestone`
--

LOCK TABLES `milestone` WRITE;
/*!40000 ALTER TABLE `milestone` DISABLE KEYS */;
INSERT INTO `milestone` VALUES (13,'ETA','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(14,'Scrutiny Document','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(15,'Port/CFS Nomination','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(16,'Checklist Approval','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(17,'ESanchit','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(18,'Filing BOE','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(19,'Assesment','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(20,'Duty Call','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul'),(21,'Examination/OOC','Air Import','Seawave Forwarding Logistics','seawave@2323','Raxaul');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store notifications and its data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment B-10-15 Sector-15 1:1','Digga D','India','Maharashtra','Navi Mumbai','digga','400703','2004263507','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','diggachigga','4','aayush@manager',1,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',1,'2024-06-05 15:31:43'),('Seawave Forwarding Logistics','seawave@2323','dfs','Gondya','dsf','dsf','df','gondya','345326','5645653232','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','gond','7','hemang@executive',2,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": \"2024-06-05 15\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',2,'2024-06-05 15:40:28');
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
  PRIMARY KEY (`id`),
  KEY `fk_orgcode` (`orgcode`),
  KEY `fk_orgname` (`orgname`),
  CONSTRAINT `fk_orgcode` FOREIGN KEY (`orgcode`) REFERENCES `users` (`orgcode`),
  CONSTRAINT `fk_orgname` FOREIGN KEY (`orgname`) REFERENCES `users` (`orgname`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store client data and employee that created the client ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('digga','India','Maharashtra','Navi Mumbai','400703','2004263507','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','4','Omkar Apartment B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Digga D',1,'diggachigga','aayush@manager','OrgButton','2024-06-05 15:31:43'),('gondya','dsf','dsf','df','345326','5645653232','shreyashpingle752@gmail.com','GDMPM3914G','27GDMPM3914G1Z4','GDMPM3914G','7','dfs','seawave@2323','Seawave Forwarding Logistics','Gondya',2,'gond','hemang@executive','OrgButton','2024-06-05 15:40:28');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of the data of the branches of the organization.\n    ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ownbranches`
--

LOCK TABLES `ownbranches` WRITE;
/*!40000 ALTER TABLE `ownbranches` DISABLE KEYS */;
INSERT INTO `ownbranches` VALUES (1,'seawave@2323','Seawave Forwarding Logistics','Raxaul','325345dfgdfh','768ghgh','Ffff','7654334323','EUUUUUUUUUUUUUUUU','Raxaul-2323'),(3,'seawave@2323','Seawave Forwarding Logistics','Kolkata Bihar','09AAIC7836D1Z9','4549666','Sanoj','5896663866','WB','Kolkata-2323'),(4,'seawave@2323','Seawave Forwarding Logistics','Jogbani','sfdsf453453','435fg','hrdeptu','2352523323','Omkar Apartment B-10-15 Sector-15 1:1','Jogbani-2323'),(5,'seawave@2323','Seawave Forwarding Logistics','Dehradun','325345dfgdfh','435fg','Rishi Mishra','1234567890','Dehradun Near Bhagwan Colony','Dehradun-2323');
/*!40000 ALTER TABLE `ownbranches` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store reminders for import';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
INSERT INTO `reminders` VALUES ('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"rishi@manager\\\"},{\\\"username\\\":\\\"hemang@executive\\\"}]\"','Port/CFS Nomination',1,'2024-06-12T00:32:00.000Z','Sea Import','Raxaul','1','5','25','Pending',5,'24-25/S/Raxaul/I/xyzabc/5'),('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"rishi@manager\\\"},{\\\"username\\\":\\\"aayush@manager\\\"}]\"','Scrutiny Document',2,'2024-06-14T12:32:00.000Z','Sea Import','Raxaul','00','5','45','Pending',6,'24-25/S/Raxaul/I/xyzabc/5'),('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"rishi@manager\\\"},{\\\"username\\\":\\\"aayush@manager\\\"},{\\\"username\\\":\\\"hemang@executive\\\"}]\"','Checklist Approval',3,'2024-06-10T11:47:00.000Z','Sea Import','Raxaul','1','00','00','Pending',8,'24-25/S/Raxaul/I/xyzabc/5'),('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"rishi@manager\\\"},{\\\"username\\\":\\\"aayush@manager\\\"}]\"','Scrutiny Document',5,'2024-06-15T09:39:00.000Z','Sea Import','Raxaul','00','5','45','Pending',6,'24-25/S/Raxaul/I/xyzabc/6'),('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"rishi@manager\\\"},{\\\"username\\\":\\\"shreyash@executive\\\"}]\"','ESanchit',8,'2024-06-14T10:55:00.000Z','Sea Import','Raxaul','00','10','00','Pending',7,'24-25/S/Raxaul/I/xyzabc/6'),('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"aayush@manager\\\"}]\"','Checklist Approval',12,'2024-06-16T09:32:00.000Z','Sea Import','Jogbani','1','6','15','Pending',11,'Jogbani/S/24-25/I/yy/1'),('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"rishi@manager\\\"},{\\\"username\\\":\\\"aayush@manager\\\"}]\"','Scrutiny Document',15,'2024-06-10T06:18:00.000Z','Sea Import','Raxaul','00','5','45','Pending',6,'24-25/S/Raxaul/I/xyzabc/2'),('Seawave Forwarding Logistics','seawave@2323','\"[{\\\"username\\\":\\\"rishi@manager\\\"},{\\\"username\\\":\\\"shreyash@executive\\\"}]\"','ESanchit',16,'2024-06-09T07:34:00.000Z','Sea Import','Raxaul','00','10','00','Pending',7,'24-25/S/Raxaul/I/xyzabc/2');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of all the detailed data of the particular workflow as per line of business';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setworkflow`
--

LOCK TABLES `setworkflow` WRITE;
/*!40000 ALTER TABLE `setworkflow` DISABLE KEYS */;
INSERT INTO `setworkflow` VALUES (1,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','Before','2','12','45',0,'Scrutiny Document','[{\"username\": \"aayush@manager\"}]','1','5','10'),(2,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}]','null','null','null'),(3,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','Scrutiny Document','After','2','1','15',0,'ESanchit','[{\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]','null','null','null'),(4,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','ESanchit','After','5','12','30',0,'Duty Call','[{\"username\": \"hemang@executive\"}, {\"username\": \"rishi@manager\"}]','null','null','null'),(5,'Sea Import','Raxaul','null','Seawave Forwarding Logistics','seawave@2323','Scrutiny Document','Before','2','12','00',0,'Port/CFS Nomination','[{\"username\": \"rishi@manager\"}, {\"username\": \"hemang@executive\"}]','1','5','25'),(6,'Sea Import','Raxaul','null','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','After','1','00','00',0,'Scrutiny Document','[{\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}]','00','5','45'),(7,'Sea Import','Raxaul','null','Seawave Forwarding Logistics','seawave@2323','Checklist Approval','After','3','2','1',0,'ESanchit','[{\"username\": \"rishi@manager\"}, {\"username\": \"shreyash@executive\"}]','00','10','00'),(8,'Sea Import','Raxaul','null','Seawave Forwarding Logistics','seawave@2323','Port/CFS Nomination','Before','1','12','45',0,'Checklist Approval','[{\"username\": \"rishi@manager\"}, {\"username\": \"aayush@manager\"}, {\"username\": \"hemang@executive\"}]','1','00','00'),(10,'Sea Import','Jogbani','seaconnect','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','After','1','10','10',0,'Port/CFS Nomination','[{\"username\": \"hemang@executive\"}]','1','00','45'),(11,'Sea Import','Jogbani','seaconnect','Seawave Forwarding Logistics','seawave@2323','Port/CFS Nomination','After','1','12','45',0,'Checklist Approval','[{\"username\": \"aayush@manager\"}]','1','6','15');
/*!40000 ALTER TABLE `setworkflow` ENABLE KEYS */;
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
  `lobname` varchar(150) NOT NULL,
  `ownbranchname` varchar(100) NOT NULL,
  `ownbranchcode` varchar(100) NOT NULL,
  `clientname` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingimport`
--

LOCK TABLES `trackingimport` WRITE;
/*!40000 ALTER TABLE `trackingimport` DISABLE KEYS */;
INSERT INTO `trackingimport` VALUES (1,'Port/CFS Nomination','2024-06-07T18:18:00.000Z','2024-06-11T15:34','87 hr 46 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','24-25/S/Raxaul/I/xyzabc/2','hemang@executive','2d 12hr 00min','Sea Import','Raxaul','Raxaul-2323','Gondya'),(3,'Checklist Approval','2024-06-06T05:33:00.000Z','2024-06-12T17:36','150 hr 33 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','24-25/S/Raxaul/I/xyzabc/2','hemang@executive','1d 12hr 45min','Sea Import','Raxaul','Raxaul-2323','Gondya'),(4,'Port/CFS Nomination','2024-06-10T22:29:00.000Z','2024-06-12T17:36','37 hr 37 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','24-25/S/Raxaul/I/xyzabc/4','hemang@executive','2d 12hr 00min','Sea Import','Raxaul','Raxaul-2323','Digga D'),(9,'Port/CFS Nomination','2024-06-12T21:39:00.000Z','2024-06-14T15:31','36 hr 22 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','24-25/S/Raxaul/I/xyzabc/6','hemang@executive','2d 12hr 00min','Sea Import','Raxaul','Raxaul-2323','Digga D'),(10,'Checklist Approval','2024-06-11T08:54:00.000Z','2024-06-14T15:31','73 hr 7 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','24-25/S/Raxaul/I/xyzabc/6','hemang@executive','1d 12hr 45min','Sea Import','Raxaul','Raxaul-2323','Digga D'),(11,'Port/CFS Nomination','2024-06-14T20:47:00.000Z','2024-06-15T15:24','13 hr 7 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','Jogbani/S/24-25/I/yy/1','hemang@executive','1d 10hr 10min','Sea Import','Jogbani','Jogbani-2323','Digga D'),(12,'Checklist Approval','2024-06-18T10:27:00.000Z','2024-06-15T17:05','-71 hr -52 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','Jogbani/S/24-25/I/yy/2','aayush@manager','1d 12hr 45min','Sea Import','Jogbani','Jogbani-2323','Gondya'),(13,'Port/CFS Nomination','2024-06-16T21:42:00.000Z','2024-06-15T17:05','-35 hr -7 min',NULL,'Seawave Forwarding Logistics','seawave@2323','Completed','Jogbani/S/24-25/I/yy/2','hemang@executive','1d 10hr 10min','Sea Import','Jogbani','Jogbani-2323','Gondya');
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
INSERT INTO `userkyctable` VALUES (1,'Shreyash Pingle','rishi@manager','09004263507','09004263507','shreypingle23@gmail.com','shreypingle23@gmail.com','494478896767','GHYPP5887H','2024-05-07','2024-05-08','Seawave Forwarding Logistics','seawave@2323','[{\"branchcode\": \"Raxaul-2323\", \"ownbranchname\": \"Raxaul\"}]',_binary '‰PNG\r\n\Z\n\0\0\0\rIHDR\0\0	/\0\0	/\0\0\0ª,\È\0\0\0gAMA\0\0±üa\0\0\0sRGB\0®\Î\é\0\0\0	pHYs\0\0%\0\0%IR$ğ\0\0\0ºPLTEGpLğ;Gğ7Cÿııÿşşğ9EğAMÿÿÿ\ï5A\ï6Bÿûüÿúúğ?Jò\\fòXcş\î\ï÷¤ÿõöñNYı\Ş\àı\á\ãóblÿøùşòòğCOú¿\ÂòR\\÷”šü\Õ\Øôu}ş\ì\íı\Ü\Şùµ¹ófoúÁ\Åş\é\êñJUø£©ù©®ü\Ò\ÕòW`ú»¿ı\å\çñGRôktö”û\Ê\Íù¯´õ‚Šü\Ø\Ûó_hö‡õ~†õz‚÷™Ÿü\Î\Ñônwû\Æ\Éø¡¦ú¸¼ôrz\î5A#4\Zñ\0\0\0tRNS\0@\æ\Øf\0\0r¸IDATx\Ú\ìÖ¡\0\01ûo\Ì\n\×d„^\ÅW\0\0\0\0ÀO½d)\0 6„\0PH\â	\0H\â	\0H\â	\0H\Ú	\0\ĞH\Ú	\0J¹\Ü\0\0\ĞIº	\0\ĞIº	\0\ĞIº	\0\ĞIº	\0\ĞIº	\0\ĞIº	\0PJ¨&\0Jˆ&\0PJ¨&\0PJˆ&\0J¨&\0@)©&\0@*‰&\0@)©&\0@)!š\0@*¡š\0@*!š\0@+¡™\0@*!š\0@+¡™\0@+¡™\0\0©„h\0­„f\0­„f\0©„h\0­„f\0­„f\0©„h\0­„f\0­š	\0±’	\0´š	\0\Ä’	\0´š	\0\Äš	\0´’	\0\Äh&\0´H&\0\Äh&\0´H&\0\Äh&\0\ĞJH&\0Kh&\0\ĞJH&\0K ™\0\ĞJ ™\0K ™\0K ™\0K ™\0PK ™\0@,!™\0@,!™\0@,b@,d@,d@,d@,d@,d@,d@,d\0±’	\0±’	\0±’	\0±’	\0µŠ	\0±’	\0±’	\0µ(&\0±H&\0\Ô(&\0\ÄH&\0\Ô(&\0\ÄH&\0\Ô(&\0\ÄH&\0\Ô ˜\0\Ä ™\0\Ô ˜\0\Ä ™\0PK ™\0K ˜\0K ™\0PK ˜\0K€dPK€bPK€bK€dPK€b@-b@-b@-b@,’	@-Š	@-Š	@-Š	@-’	@,Š	\0µŠ	\0µŠ	\0µ(&\0±H&\0µ(&\0µ(&\0µ(&\0µ(&\0±H&\0µ(&\0\Ô ˜\0\Ô ˜\0\Ô ˜\0\Ô ˜\0\Ô ˜\0\Ô ˜\0\Ô ˜\0\Ô ˜\0\Ô€bPK€bPK€bPK€bPK€bK€bPK€bPK€bPK\0‚	PK\0Š	@-Š	@-Š	@-Š	@-Š	@-Š	@-Š	@-Š	@-(&@-(&\0µ(&\0¹(&\0µ&\0µ(&\0µ(&\0¹&\0µ ˜\0µ ˜\0µ ˜\0\ä ˜\0\Ô ˜\0\Ô ˜\0\ä ˜\0\Ô ˜\0\Ô€b\Ô€b\ä€b\Ô€`\Ô€bPK€bK€`PK€bPK\0Š	PK\0Š	K\0‚	PK\0Š	PK\0Š	PK\0Š	@.‚	@-Š	@.&@-(&@.(&@-&@-(&@.&@-(&\0¹&\0µ ˜\0¹ ˜\0µ ˜\0µ ˜\0¹ ˜\0µ ˜\0¹ ˜\0µ ˜\0\ä€`\Ô€b\ä€b\Ô€`\Ô€b\ä€`\Ô€b\ä€`\Ô€bK\0‚	PK\0Š	PK\0Š	K\0‚	PK\0Š	K\0‚	K\0‚	PK\0Š	K\0&@-(&@.&@.&@-(&@.&@-(&@.&@. ˜@- ˜\0¹ ˜\0µ ˜\0¹ ˜\0¹ ˜\0µ ˜\0¹ ˜\0µ€bbØ­\Z\0\0\0„Aı[S:8\ß\\ªj0\Õ\\ªj1Uk©j0Us©j0Uk©j1Us©j0Us©j1Uk©ªÁTs©ªÁTk©ª\ÅTs©ªÁTÍ¥ª\ÅT­¥ªÁTÍ¥ªÁTÍ¥ªÁT­¥ª\ÅTÍ¥ªSÍ¥ªSÍ¥ªS­¥ªS5—ªS5—ªS5—ªSµ–ªS5—ª\ZL5—ª\ZLµ–ªZL5—ª\ZL5—ª\ZL\Õ\\ª\ZL\ÕZªZL\Õ\\ª\ZL\Õ\\ªj0\ÕZªj1\Õ\\ªj0\Õ\\ªj0\Õ\\ªj0\ÕZªj1Us©j0Us©j0Us©ªÁTk©ª\ÅTs©ªÁTs©ªÁTk©ª\ÅTs©ªÁTs©ªÁTÍ¥ªÁTÍ¥ªÁT­¥ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ªSµ–ªS5—ª\ZL5—ª\ZL5—ª\ZL5—ª\ZL5—ª\ZL5—ªZLµ–ª\ZL5—ª\ZL\Õ\\ªj0\Õ\\ªj0\Õ\\ªj0\Õ\\ªj1\ÕZªj0\Õ\\ªj0\Õ\\ªj0\Õ\\ªj0\Õ\\ªª·Xs©ªÁTs©ª\ÅTk©ªÁTs©ªÁTs©ªÁTs©ªÁTs©ªÁTs©ª\ÅTk©ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ªSÍ¥ª\ZLÍ¥ª\ZL5—ª\ZL5—ª\ZL5—ª\ZL5—ª\ZL5—ª\ZL5—ª\ZL5—ªj15—ªj05—ªj0\ÕZªj0\Õ\\ªj0\Õ\\ªj0\Õ\\ªj0\Õ\\ªj0\Õ\\ªj0\Õ\\ªªÁ\Ô\\ªªÁT÷\\\Õ`ª¹T\Õ`ª¹T\Õ`ª¹T\Õ`ª¹T\Õ`ª¹T\Õ`ª¹TUƒ©¹TUƒ©¹TUƒ©\æRUƒ©\æRU‹©\æRUƒ©\æRUƒ©\æRUƒ©\æRU\r¦\æRU\r¦\æRU\í¥\æRU\r¦šKU\r¦šKU\r¦šKU\r¦šKU\r¦šKU\r¦šKU5˜šKU5˜šKU5˜šKU5˜j.U5˜j.U5˜j.U5˜j.U5˜j.U\Õ`j.U\Õ`j.U\Õ`j.U\Õ`j/U\Õ`ª¹T\Õ`ª¹T\Õ^ª¹T\Õ`ª¹TUƒ©¹TUƒ©¹TUƒ©¹TUƒ©¹TUƒ©¹TUƒ©\æRUƒ©\æRUƒ©\æRUƒ©\æRU\r¦\æRU\r¦\æRU\r¦\æRU\r¦\æRU\r¦\æRU\r¦šKU\r¦\ÚKU\r¦šKUµ—šKU5˜šKU5˜šKU5˜šKU5˜šKU5˜šKU5˜j/Uµ—j.U\Õ`j.U\Õ`j.U\Õ`j.U\Õ`j.U\Õ`j.U\Õ`j/U\Õ`j.U\Õ^ª¹T\Õ`ª¹TUƒ©¹TUƒ©¹TUƒ©¹TUƒ©¹TUƒ©½TU{©¹TUƒ©\æRUƒ©\æRU\r¦\æRU\r¦\æRU\r¦\æRU\r¦öRU\r¦\æRU\í¥\æRU\r¦\æRU\r¦šKU5˜šKU5˜šKU5˜šKU5˜\ÚKUµ—šKU5˜šKU5˜šKU5˜šKU5˜j.U\Õ`j/U\Õ^j.U\Õ`j.U\Õ`j.U\Õ`j/U\Õ`j.U\Õ^j.U\Õ`j.UUƒ©¹TUƒ©½TU{©¹TUƒ©¹TUƒ©¹TUƒ©¹TUƒ©½TU{©¹TUƒ©¹T…\İ:$\0\0\0@&\é\ßøA\Ø*€8 ˜K\0 ˜\ĞK\0 ˜K\0 —K\0 ˜K\0 ˜K\0 ˜\ĞK\0 —K\0€`’K\0€`B.€`B.€`B/€^B.€`B.€`B.€`B.\0‚I/\0z	¹\0‚	¹\0‚	¹\0‚	½\0z	¹\0‚	¹\0‚	¹\0‚	¹\0&½\0\è%\ä\0&\ä\0&ô\0\è%\ä\0&\ä\0&\ä\0&ô\0 —\ä\0 ˜\ä\0 ˜\ĞK\0 —K\0 ˜K\0 ˜K\0 ˜\ĞK\0 —K\0€\äK\0€`\ÒK\0€^’K\0€`B.€`B.€`B/€^B.€`B.€`B/\0zI.\0‚I.\0‚I/\0‚	¹\0z	¹\0‚	¹\0‚	½\0z	¹\0&¹\0&½\0&¹\0\è%|\0r	\0z	\0ôr	\0r	\0z	\0Lr	\0\ĞKr	\0Lr	\0L\è%\0\ĞK\È%\0L\È%\0L\è%\0\ĞK\È%\0@0\é%\0@0\É%\0@/\É%\0@0\é%\0@0!—\0@/!—\0@0¡—\0@/!—\0@0!—\0\0Á¤—\0\0½$—\0\0Á$—\0\0Á¤—\0\0½„\\\0Á„^\0Á„\\\0½„\\\0“^\0ô’\\\0“\\\0“^\0ô’\\\0r	\0z	\0ôr	\0Lz	\0Lr	\0\ĞKr	\0Lz	\0Lr	\0\ĞK\È%\0L\è%\0\ĞK\È%\0L\È%\0@0\é%\0@/\É%\0@0\É%\0@0\é%\0@/\É%\0@0¡—\0@0!—\0@/!—\0\0Á¤—\0\0½$—\0\0Á$—\0\0Á¤—\0\0½$—\0\0Á¤—\0\0½„\\\0Á„^\0Á„\\\0ô’\\\0“^\0ô’\\\0“^\0ô’\\\0“\\\0z	\0ôr	\0Lz	\0\ĞKr	\0Lz	\0\ĞKr	\0Lr	\0Lz	\0\ĞKr	\0L\è%\0\ĞK\È%\0@0\é%\0@/\É%\0@0\É%\0@0\é%\0@/\É%\0@0\é%\0@/!—\0@0¡—\0\0Á$—\0\0½$—\0\0Á¤—\0\0½$—\0\0Á¤—\0\0½$—\0\0Á¤—\0\0Á„\\\0ô’\\\0“^\0ô’\\\0“^\0ô’\\\0“\\\0“^\0ô’\\\0z	\0\ĞKr	\0Lz	\0\ĞKr	\0Lz	\0\ĞKr	\0Lz	\0\ĞKr	\0Lz	\0@/\É%\0@0\é%\0@/\É%\0@0\é%\0@/\É%\0@0\é%\0@/\É%\0@0\é%\0@/!—\0\0Á¤—\0\0Á$—\0\0½¤—\0\0Á$—\0\0½$—\0\0Á¤—\0\0½$—\0\0Á¤—\0\0ô’\\\0“^\0ô’\\\0“^\0ô’\\\0“^\0ô’\\\0“^\0ô’\\\0Lz	\0\ĞKr	\0Lz	\0\ĞKr	\0Lz	\0\ĞKr	\0Lz	\0\ĞKr	\0\à<˜Œ\0\è%¹\0&½\0\è%¹\0&½\0\è%¹\0&½\0\è%¹\00½\0 —\ä\0 ˜ô\0 —\ä\0 ˜ô\0 —\ä\0 ˜b·\0€aˆ•\Ù\ãL‘#\Ø\ÒĞ¼^\0ô’\\\0“^\0\ĞK\0\0zI.\0‚I/\0zI.\0‚I/\0zI.\0‚I/\0zI.\0Œ&\ç\0zI/\0‚I.\0zI/\0zI.\0‚I/\0zI.\0‚I/\0l\ê%¯\0‚I/\0zI.\0‚I/\0zI/\0‚I.\0zI/\0¹\0°)˜\Ü	\0\è%¹\0&½\0\è%¹\0&½\0\è%¹\0&½\0 —\0\06õ’\0Á¤—\0\0½$—\0\0Á¤—\0\0½$—\0\0Á¤—\0\0½$—\0\0†“\0½$—\0\0Á¤—\0\0½¤—\0\0½$—\0\0Á¤—\0\0½$—\0\0†“\ë\0\0½¤—\0\0½$—\0\0Á¤—\0\0½$—\0\0Á¤—\0\0½¤—\0\0†õ’\×\0\0Á¤—\0\0½$—\0\0Á¤—\0\0½¤—\0\0½$—\0\0ú‚\Éa\0€^’K\0€`\ÒK\0€^\ÒK\0€^’K\0€`\ÒK\0\0u½\ä+\0@0\é%\0@/\é%\0@/\É%\0@0\é%\0@/\é%\0€¾`r\0 —ô\0 —\ä\0 ˜ô\0 —ô\0 ˜\ä\0€^\0\ÖK\0“^\0ô’^\0“\\\0ô’^\0ô’\\\0\è&\ç\0\0zI/\0zI.\0‚I/\0zI.\0‚I/\0\è%\0€a½\ä\0@0\é%\0@/\É%\0@0\é%\0@/\é%\0€{\É\'\0€`\ÒK\0€^\ÒK\0€^’K\0€`\ÒK\0\0z	\0 /˜\Ü\0\è%½\0\è%½\0&¹\0\è%½\0 —\0\0ú‚\É\0€^\ÒK\0€^\ÒK\0€`’K\0€^\ÒK\0\0z	\0 /˜\Ü\0\0\è%½\0\è%½\0&¹\0\è%½\0ğc/ù\0\0Lz	\0\ĞKz	\0\ĞKr	\0Lz	\0@/\0ôõ’ı\0Á¤—\0\0½¤—\0\0½$—\0\0Á¤—\0\0ô\0@_/\Ù\0Lz	\0\ĞKz	\0\ĞKr	\0@/\0\è%\0€¾^²;\0 ˜ô\0 —ô\0 —\ä\0@(˜Œ\0\è%½\0\è%¹\0&½\0 —\0\0~\ì%‹\0‚I/\0zI/\0zI.\0„‚\É\Ü\0€^\ÒK\0€^’K\0€`\ÒK\0\0z	\0@/\0ô“©\0½¤—\0\0½¤—\0\0½$—\0\0BÁdh\0@/\é%\0@/\é%\0@/\É%\0€P0™\0\ĞKz	\0\ĞKr	\0Lz	\0@/\0\è%\0€¾^²1\0 ˜ô\0 —ô\0 —\ä\0@(˜\0\è%½\0\è%½\0\è%¹\0\n&ó\0zI/\0zI.\0‚I/\0\è%\0\0½\0\Ğ\×K¶\0“^\0ô’^\08r	\0 L†\0ô’^\0ô’^\0x\ÖKv\0“^\0ô’^\0x\ÖKV\0“^\0ô’^\0\ĞK\0\0¡^²)\0 ˜ô\0 —ô\0À³^²(\0 ˜ô\0 —ô\0€^\0õ’=\0Á¤—\0\0½¤—\0\0ô\0@¨—¬	\0&½\0\è%½\0 —\0\0B½dK\0@0\é%\0@/\é%\0\0½\0\ê%K\0‚I/\0zI/pÙ»×´-\0\ÃQP¹ˆä¢ (^ª\Ä\Z\åÿÿ­\ÓÙ»œ¸N¦`\'*<“\Æ\Ì&Y“¼\Õ —\0\0ô\0À‡\ì%s\0“^\0ô’^\0\ĞK\0\0\ï\ÔK¦\0&½\0\è%½\0 —\0\0Ş©—\Ì\0Lz	\0\ĞKz	\0@/\0\è%\0€\ÙK&\0&½\0\è%½\0 —\0\0Ş©—\Ì\0Lz	\0\ĞKz	\0@/\0¼S/™\0 ˜ô\0€^\0\ĞK\0\0z	\0\àCö’\Ù\0‚I/\0\è%\0\0½\0ğN½dr\0€`\ÒK\0\0z	\0@/\0¼S/™\0 ˜ô\0€^\0\ĞK\0\0z	\0\àCö’©\0‚I/\0\è%\0\0½\0 —\0\0>d0\0 —ô\0€^\0\ĞK\0\0z	\0\àCö’‰\0‚I/\0\è%\0\0½+6\Ë~_¹Yô„\0À*õR¡w<\îŞ•˜C÷\æ¸Vğ\0 —V¥—*Ã»µi.—›\æüø\ã·ş\ÈOsk¥a\ÅS€^Z\\*_m\äXÀtm\Ôñ˜\0 ˜V¡—*riakW\r	\0ziz\éúL÷,\ì\ì\Úc€^Z^òö\Òl´\í| —–¿—\nƒ©\ìYXş»•o\0ô\Òò¿½Ô¸\ÓKoXù®7=\'\0¦¥\ï¥bW/½¡—ºz	\0½´ü½”\çe\Ï\âŸ\Çú<\0½´ç—†k²gñ}\ï/ö½\ĞK+\ĞK½;Ù³°z\ÏS€^Z^\Ê÷tÏ‚6‡YO	\0zi¾lw«9ñ‰Ü¢\ÛK§\0X‰^ÚªLú\Úg‘\\jxD\0`Ezi«pÛ®Wû{?ôg/T™ıV­¶\"—‘™\Ò\Ì\İL=Òf¾\Ï<\Ï\î_\Ï\ÜFÿp½\×\ß÷i\0¬L/mm;µ£\Û\ÛÛ£À\î\Ñ\îL\í\×\ÏK½\Ùo‘\ÓP\'Riş\íÅ¯?T~ıó\â\×\Ê/\Íğ\ç¥Æ‹Ÿ¿ÿ]¨8SèŒ‚£\Û_|\Ù.\0¬R/}l\Ù\Ôıúÿ÷?P8V\â\×Gÿg\0@/‘z8>»«\0\ÌLµÌJÁ§q­\ËK\0 —Hu¢oŒ\é3&\0z‰Dc²|J\Û÷\Æ€^\"•ù\íz?\Ûõ\0½\ÄO­i°\ë½k0\00g/™\ÓÒª}–—ª\'v½`\Ş`2¦eUm¼Î¥µ¯E“\0½D¢ø5\Úõ\Ùõ\0½D*s|qşû©\É\0€^\"uP\n\îz—.\0ô©\Îs°\ë½÷­`2\000\ÒRª´£]\ïI\Ãd\0@/‘(7ƒC•\ã¦\É\0€^\"õX}KÓC•\0 —Hew\ë\ë¯ÿj\\õÁ·\ì€^\"U¿Î¥\Ü\æĞ®7\0,\ÖKf´|*“h×»m\×\0&#Z:™ap¨2w\ïP%\0\è%~\æ\ÒC+¸\ë]:ò-»\0 —Hõ¯UN\Ïö\íz€^\"Õ¼	v½·\Ï\íz€^\"Uœl‡*¯š&\0÷’	-—Ì·`\×{}`\×\0\ŞL´T²;¯——ò—v½@/‘\ê=—úOr	\0ô©\ÊMt¨òÜ¡J\0\ĞK¤\Z\çÁ®÷Æ¸l2\0 —HdNÎ‚C•õ]“€7“ñ,‘ƒ»`y©úh0\0 —Hw½s›\ÇU€^\"Õ¼Šv½\Û“\0½D¢8v½ó\ÏU€^\â§\Çj°¼T:0\0\ĞK$²G;\Ó\àP\åu\Æh\0@/‘8=\\v½Ï‹&\0z‰D¥\ìzo\Ü4M\0\ŞL†³²Ã½`yiP3\0\ĞK$2gÁòR\ë\Öd\0@/‘:ºUöŸª\0½D\êt\ä\ÒöÄ®7\0\è%R\Åö\Ú\ë\\š;&\0z‰Da¸\Üõ®÷L\0ô‰\Ìut×»\åP%\0\è%~:\ê5n\ï«]o\0øSÁd4Ÿ]ó>¸\ë½Ş®˜\0\è%Ip\×{ıÙ®7\0\è%R…\ãh×»t›5\Z\0\ĞKü%ûx\ìzW÷\å\0\è%R½zp¨r\í¼a2\0 —H”£]ï‘]o\0\ĞK¤*Ñ®w~\àP%\0ü\Ñ^2™O,3\ì\ËK;&\04˜\æó\Ê^´‚\\\Ú|r¨\0ô©Z¸\ë=)š\0\è%q´\ë=nš\0\è%öö\ë\\švoM\0ô‰Â·½`y\é\ì:c4\0 —øKö¢\Z\ä\ÒöĞ®7\0\è%R»\İh\×û\Ê]o\0øó½d.ŸSsª<t¨\0şƒ`2–O©ñe-È¥ß²\0z‰D&\ÚõöO\ìz€^\"u\Şõ>·\ë\r\0z‰T-\Úõ^•M\0ô‰\æM°\ë½Şµ\ë\r\0z‰T¸\ë=m]Ìµ\ë-V*¾g\0ô\Òr\Ê÷ƒ\å¥ş\Ó<¹TŞ¿©_^vGû>\Â€\ï%Sùt¹ôĞŠU~©üşKd\î7“\×\ÈoN¼\É\0ÿL†ò\ÙôA.m\Ü\ÏñFQv·>{‰³¡‹\à\0 —–Ks\äR®T›\ã%\Ê÷/_¢\ì\Æ%\0\è¥eRœ»Ş¹\Öõ/Qi¯ÿcQ|§f¬\0 —–G\æ)\Úõ\Şş{w¢œ6Ea¸‚Al¶d„0‹X\Ì*³\ïxÿ×šJ¦jRc.	=FB\éü\ßt ­H\ép™)”’ıOK$úŒ¹\0€¼¤\rs0”º\Ş…®wr\ê|Ü´¦Á\0\0yIÁ^¸»”\Ùû\nK\\?·mv\0\0ò’&\ìµ!Ä¥\åBa	s9\é²\í±µ\0\0ü$/±\'¿‘òs^ˆK\İNRa‰\Ú\åÆœ\çq\0\0ü,0±%¿\ì«\ØõşP\èzg[•\Ë*#\n\0\0@^\ÒC½ Ä¥\Ô\ÚSXbP~§Wi\0\0\ÈKˆ¯·¶\Øõ–xiŸ/\ÛK€½\0€¼¤oºLKVu ğ,\Í\ÛK<\0€¼¤…r_\êzWZ\n£&Åºxw”ds\0 /\éÀ|\í\nq)QSøf[Rª‹\çŸùn\0\0\ä%=\âR}xÆ­Ÿ\Ö\Ø	K+\Í\0\à‰\rù=caP¥\å¾(T‚ö\å/©cº\Ş\0\0—ô\àM„¢v\Æ9(T¼\Õ\å\ÖpG\×\0\0ò’²½´—\Ò}…¸”“\ê\â\ï-º\Ş\0\0—´\ìHs½šÊ¯\ä…ºx¢G\×\0\0ò’\Ì\Å\Ğ\â\Ò\ÉWX¢.,‘š{l.\0\0\ä%-\r!.YÅºJ\×ût¹„\Õ.±·\0\0—´`O\ÂÓ¸\îQe®·T¯N\Ù[\0\0\ÈKZÈŠs½½\Ü\íK${\Â\éc–\Í\0€¼¤¹\ëR3iv¤®÷–®7\0\0\ä%=Ô—B\\²\Ú\nc&\Í\ÅR\èzo|ö\0\0ò’ü“0\×[­zô&\Õ\Å\İ{\0À‰\íˆ7[œ\ë>*Œ™,Kuñî”¹\Ş\0\0—´P–»\Ş*\Õ#±.^™\Ñõ\0€¼¤³\ãHs½7O·/‘<8\ç\ËÀ5±\Ù\\\0\0\ÈKZÄ¥¦P\ÔV¬5\ÛB[¼°¹\0\0—´ğÔº\Ş\ï*\Õ#O\èz[\Å&{\0\0yIvMŠKi•\ê‘XwI6\0\0ò’²}iPeb¥P=\Ê\Í*B×»G\×\0\0ò’’;©\ëmTUN‡B[|â±¹\0\0—´¸B\×Ûª.¾¸„5~co\0 /iÁßœ¥®w\ÇTYB\è?ª\0€¼¤…òV\ZT™\Îİ¾„½•\æzˆK\0\0—´=V¤A•s…A•fK¨‹\'ze6\0\0ò’Ìº\ÔõÎ¸%…%U)pyl.\0\0ª‰Íˆ¥R[ŠKÕºÂ³´’+\Ä%º\Ş\0\0—4\á\ÍÅ¹\Ş3…1“ş\\øv]qGy	\0\0ò’\ÊR\×;µUT)\Õ\Å+GU\0@^Ò‚yº\ŞVÃ¿}‰\ä«\Ôõ\Ş\Òõ\0€¼¤‡\İPŠKK…®÷_ƒ\ê\åÓ¸\Ô\Úco\0 /i!K\å%GePei,\Íõn²·\0\0—´`¯RÒ Ê¾Â³4{~¹„\å\Ğõ\0€¼¤‡\ÜL\ìz¯Tº\Ş=a®wZ\å\Ëu\0\0€¼c¯]©¼4V\êzuñD-\Ç\Ş\0@^Ò¹(c“2…º\Â\Z»‚¸\Öª\0€¼¤¿!ª)<K{\ÛK,›”—\0\0 /iÁ®Iq)ñ¬ğ,Í\\v½\Ï\İ\å%\0\0\ÈKZ\Èö\ÓR\×{­\Ğõ.÷…®w¥O\\\0\àÿ&¶\"F’¹\ë­0¨\Ò|u„ÀU³\Ù\\\0\0\ÈK:0K®\Ğõ¶ª»\Ûo‰uq\ãD\×\0\0ò’üµôÕ¸ôL\á7r¥ºø¹¸ \ë\r\0\0yI\åZ\"óÅ¹IöD¨‹w;\ì-\0\0\ä%-dg©¼´QT™\í¥¿øC*\0\0€¼_É#•—–\n¿‘+\Ö\ÅS+/\Ú7R~\nšƒN«?xüU\ã\Ì\ÌÙ÷\äó\ä\Ù\å,;\0\ä¥ø+Ï™/\ÎMzYZÂ—\ë‚\è\"_Î®\Ï&\'\×\É‰F‰?kSR\Ù~¼ö·«uc\ßv\İe¡PXº\íñi3ŸôZ‡\æ·\äD\İ\r\0\ÈK1\åm¤A•\éB\\ò7\Â\n\ÅAT\ïÀ\ï\ÔÆŸ(¶ùÉºXÉ–ıI£ø\í¯$}³\àŸû‘»Ş¶™	\0\ÈKñS\Ş\æ¥k\×\ÄSXb\"\Ô\Å\ß;‘<f)/ú\ã÷\Ë\Ş:pÕK_Œj\ãn>q5\'ı\ç\ï–\ÊW\n\ëş4x\Ğ3:{p\è|2\rb1q5[š~~a%>\0\ä%Dw\Z½K—­½\ÂÜ¤\ÜL\êzD\ĞõÎ½ô\Û]ù:<!/=^Ò¯\Ï\Ö\Ån*£\ÈHW\Ç\ÛCı¨\Óú\é=‘ú$]­==ü`2Ks\'ı\ß×•H;›\Õ/€¼„ˆ\nR\\\Zn¿B˜;a®·±öB¿„\Ø\ÓM÷\ê%wÃ•\äÁWø²?Z-ó™ÿ\ÍrNM;\Ò{;+†ok\î?:0½¸\ÒCó¨n\â /\ám,]!Ş*§ò¶°\Â8ôÂµ\×wö„gÃ³ŠGJ¾ôN\éÌ—\Ã\É4Â»LÏ‰+/cö\èX2¿r®p /!\ŞJ:\'z\n\Ï\Ò<a®·U„|\Z>ª\ÆO¯´w\ÏK\åÎª]Œ™\Âxû\Ã\ëen\ÑsóV\æ.¬„³:Dô<\Ì\Ü_{Ñ§§o{x\åh\Ï\ÂJr^k\ã\îv¤.\Û\í\Ó|\Ò;N›q¨ó›Áóşó{[6>\\T\Ë&\ãBg‰ıG\éGIiµõ¤Ö˜ùüFûE`b#¯\Ü»\Ş*\Ï\Ò\ì­\Ôõ>†ûyü­÷‹´tÿ¼”¬¥31d1LÙ µ\ï\Zw}“\éb­\Å]&Ó½öº\İ^õ«W’\\j\Òÿ´§S>„\Ã\Õ\Èw‡\ã\Éq\á?ö~\İNüC…\İ#_V®×µB:K\Ã\Î\à\×÷Oj‰wM\ÉKñcv\é\ì*<KË„\Ñ\àùZ¨——r\Ëıõõø\Şy©™\È\Ä\Ó&NŸ\Å\Ìò`U5Bx—•S\Ëı’—~ü¿~\ïx·¬ôr\İ\n\ì‡¸\Şş\Ê\Ó\Í\Ó\Óÿ\Æ\Ç\n\ï,\á\Ô\ïwœÔ‹FØŸ?\ì¿@^ŠY\\jJ]\ïLuªòIm(Œº\\‡zÚ©\ïo9¯\Ü;/Í¬˜\æ¥÷ı\æŒ\İ\Z§B{£\Õm)\ä+,y\éG¤‡}MÌ·?JJL‡k7rºü¾av\ê\'²;ş\ÖB¶–û¤6.ñD¼3ş^T\ÙR8g®pó\×\rs®·?©\Üv\Û\å\Îy\é9®y)\í\Ç\äp2ƒ^5\æ;5òói¨¹…¼ô¯§B\èÇ»e%\Úı‡T†\×­W:ë©•¡\æ¥\Â\Ëıv:p\ÃÓ…y‰¼/^M\ìz\×n…>­S\Òı©ğ>\ç\î\çqòR´’¥Z\Õı[9¼ğ\Şy\é\ÇÉ¡\ÉñrV;;ò®J\ë\Úı‘ô«¶y©x\Ç’u-òyé’œI7jŒ“\Â\å·\Üş‹Wf\á\êöö\æª!y)Ú´´\r?-ıó§Ş€òR\Ôy\é\Ûñ\Û\èDı•9ò\ÒW?¶\Îó\ä%òÒŸDœ2™9/\nK…ôb\ÔÂ«\ê•N·Ÿ\Ä\ÉKQŞªü\èF·=\Öf\Òõ•¼ô\ïND——2VjÜ‰v{\ÉK_õò9òy)^JK\é„\ØUø\Ù5³^=³ğº\Ş#G\åkc\ä¥\È\ÒR\Ï1\"}Ë‰\Í\"œ”@^Šşş\Ò÷w1>D¹Á\ä¥/ÿO½[\ä%ò\Ò\Ã_‹]\ï¾\Âù\"Fƒ/›a\İ[·û•y)~y\Éî¸©\È\ßt·Æ„ò\Ò#\î/}ÿ˜•×£ûj\Zy\é\ËÇ‡½Ê“—\ÈKŠ\ÜVT¹R\éz¯„‹‹\Ó	+.yŠ_·%/E\"\Ù\Ü<d§Q\İÿ¹/y\éA÷—¾M¤Ù¯\Z“—\îğ|¢`—\ÈKs$õ¦\Ï{…A\0Ép\Òù›½3\ÑN×¡ğ\"\Ú0´Œ\róe‡}ÿ×º§w­I1qk\Å!\ÙûJ\\[ú,\ÉRn\ÅeoŠ\É\ã	^\n$¸4vt­‹\ÙV\Ê/\éŠ/ı_ó º—hÅ™‘/—B„K.Y	4‘¨õNÖ‰ì˜¹\àªõ&sB\í8ğ±	N[C\ã—\çF6x)2ñ¥Ï­\\\æ¥xI\ÅU‰3#^/…G²CöL\Âô¦Z„=µ\ÚC®,K\Ï+Å–¼ô†Íš\ŞOOœOJ\Í*xIk|\é3fˆŸ/©P—1#^ú›—°\Úd\ï¨\İ\ÜQ¦Ö»M˜Ó¼\Ë\å˜û²\'\ÓÈ«~¦^úK™S\ß\Ôı\í–3Vb/\é/}¢µ\0xIIt™1#^ú˜°º”‘\æBf\è\ÛÛ‚p•³×¨t\é\èRn_Qı#ÀK…\ã\å+²E$\Î\Å/\é/}n\ç1ÿ¨Uğ’š_|H€—ÀKQÇ¥\åè¬¾D­7I\\¹1.un2)š\Ém1\æ\è\0\r^úC•³Ï·\êş\Ù\à%\İñ¥\Ï\Ğğn\È]\Ä^R£\r[ù\"x	¼¹yjƒ6$*A’‡º\è3\İ\ßö~\Ó>\æd¿*w\Şx¬-x\é7e#,\ßo¨«a/\é/ıü¤[…˜ÀKjD\Ô/—¢£!9S¤6–ØŸ­*qÍ¿U˜\ÌHÁ.¥}}\Èx\ÈÀK¿T,Ì¾8¹š\Ó\È\Ï»faüS…Å¡ÿRrÒ‰¯.p¼¥ø\ÒO™½%xI\Õ.\Ù\çÀK\à¥‹¬<’úö\Úş×«|4ZAÛ¶??\àe\Ä\Å//\ÙA\ï!ú½€ŸÜ™e–n‹\ÕÀş¾\İ~şß’öÔ­s\Ç4\ä—y£\ì^ú_\Ò\Ú)¢\Úeu—q\ä¥m™\Ã>n˜¦lo»\à%ğ’~eWÔ¡4\Úµ\ŞE²Ö»\ÎD+\'?‘£?`·s¡\å¥R&\à=´©~i)/û\ÑòN\Ô\ër´\Ş\Ê\İY\Û\êP¼ôë”·µ>~œ°ú\Ë8òR›g®\ç˜\ç\Üyšz‚ÀKš•ºP*­¼D§\äìŠªõ.0Ù™á‹¨Eõ\Z@ˆ%´¼´ö&–\\~\áJ™Ş®{\Û\ß\É\Ø\ÓÁb\îøı#«\îûÁK¿şÍ«´\Ö]]m1n\ëò’\Ñ\ã\ÙÁ¯<o\ä~Ÿ ğ’n\\*W?¨…Dp(uiPOZ˜jhŠ»»n\Ór \î\"aå¥†\èM,{•€b\Ì\æ?Ü¤÷+–¯ûI\Î\Ç_2U’:x\é·ÿÀ>§s[[ı2ß¾/™k.#Ùš¨7ŒV¾‚txI»lr[b$a$*[¢¯wu\Êó{S½»&\Ä8»Á¬7/¦>%ú\Ë@-KJ²ë’•›»_ô\èö`Qº‹\Ë}•ek\à¥ß—\Õn8\Ê4K\'\äjÓŒ3\ßø\İ\ã¥\ï˜Im13£š¸dQ^Fõ”}‚ÀKšU<R\î@ª\0U\ë\Í\âØ”\î&z\nAU\ïxòR®\ŞÕ¦²°M?Jİ\Í\êhú-œ\Ë\Ö\âpV\ÎU‰‹\à%F\Ò.NO½Å­\ä?™\Ëy4^Z»\ß4C\Î=òvÙ„—\ãY.E/—´+¹¢j§¹\ÄĞ·b“ªõ\î1m\ïlûŞ…t{	\Ì[xòRº\ànJ\à’QZ»\ßŸš\íŒûŞ‰!³©”cÀK\Ü\Ğôö\ê\æ5q&ó\ÈU\Äò`¼\Ôw1\ÏIÔ‹-½D¨¼ôˆJ\Z\ä\àôM\âJ˜s\êzç‰yğxé©¸ğK‰—QY‘\'·/m¯G8yµ\0¼\È6j¶~JÓkL5\Ê\à%¥g\än(E/=¢¦}²Q\åÕ¿½Mˆü˜qxeúÁ\Ã\É\\R9:¼\ä—|?17·+•\ÙÓt°¹wµ¶¼\ì÷¹Ÿjr§\Ës/©İœ7aHŒñ\Ô\r¼ô€&jGY\ÜDAªÖ›z\Ì\Ï\Ô\×û)\Ù\ßA£@}X\ìy©¸ğ[zbôß•»õ\\KõğRpA‰\Ó\ÙG°ò<e	N€—Î†ÀT—Z™\'¼ôX\Ê)a\î%B4=U\ë½\äJ‰¹¸\Ò{¬i‹;/eı&\ãŒj\İføû÷[R\İ\Ò¼$\×ûw\ã•*€—_m‚’4c\ßy‚ÀKu{w\È&\'¾ş­IX™t\ËÀ$÷\ÂpFm°e‹9/½üµ\ã±&c®gMöuû‡ƒÍ­T£x)H¥:Í»]Ig\Ï/©Ş¢7r‰÷·\'¼ôH¦iCv+I‡2W¢ª/±`;\ÊaasôŒ7/eV¾pÉª-8g\Ëwv¿m\n«­|ï—\ŞU\Ë\ê=`\ÚrŒ…/©Ö²$\È\ÈU1¼ôPš\Ş\È\æ5=	[\ë\'\Âj¿²Y½%¬]\nüÆ›—z¾\ÚTZ\í\r\ïƒ\Å\Ôò\×Ø†úb`ğRĞ²\×÷8œ\ãõ-xI9ù\×[«i\Ãƒ—GEr |b!\á\Ê}ò\âÀö“[¢ğ’µ\Ş}Å™—RK?SŸ\'WvÃ²ÿ1¥/\ê‘¼<%Œ\ï\Ì\×qN\ê?¼¤|\ç¦(«Š&Là¥‡QvLÁ‡uhTi\ï‰\ã\à\\Ø¢<™ÈŠn+Á/bœy©\ëgFTn]¢\Ö\Ûõ³=Ñ¸2pxIƒqªß™\ß|P?\Ê¼¤^Á9\ã<D\ÇnğÒƒ(¹$k½_6F\íaarŒ%\×å†¨x\é¢ac\ÌK\ÃóıN–TEYªr<÷,yÀK\Z”ºˆiœaÀK\Ü{d4a/=Lt€h›ôü1ø%\ëµoÎ“\Õ\Èe\ãt¸ˆøòRf\ï£ñ\Òy$xI‹Nb`\ê+/’/qlQQFn\â¢	x\é!Ô¹QN -S1}šPµ½C¾ßœµöLu,cly)S¸\ßx)}Œ\Äı¼¤g\Ù]aJÎºª†ğ\ÇQôF\îM˜ÀK!zFª¹“¸´M\ç•\Îc(,E\í<VZ\"q\å¥\Ô\åşÓ¸\Æ5\ZVÀKšT/‰€Iyõx‰C\ÉfZ\Ã,@ğ¤2:p¥6±1—ˆ\Ñ\Ø\Ô\ëºY‘Z2¢\Ñg[\ËBÆ•—\Êù{µ\ŞÆ¶‘ş*\à%]Vj%hıœP=^¼Ä¢©(#·\Å\Ü]ğRøµ¤\n§?\Z-ÿ´“\ç8÷ƒ\ÓLw\é8c©g!c\ÊK™ö½\â%«™\Ç/\à%m°\Ğõaº)¾\"—xtõ†8\ÚOx)ÜªT\É~Wÿ.u%z\ï\ÖÍ¿ôö\Ñ\ÖA“E‹\'/e~\Ü+^2#ÔŒ¼¤MÅ³¨\ÏR\íG‚—¸¨7&L\à¥Ç•M>mJHô\ÌMµ^¬\ï¥ó¾ ¦÷5e\æjZ\Êxò’{¯Qeº¡—\Â\à%;\í\Åû\Ğ[Š\Ç.—¸¶©h„òyŠ&L\à¥P_\ÚF\Ô4o†\Ä\ë:«\á²\î|»\ê}\èöº\ÜC,y\éõ^\ç¥ô(Jeœ\à%}J9Gm\Ê¼Ä¥wA\á~b„&L\à¥0›ÿ+\ÈKt\Ç.R•×³\ï\ïn9\Şşù¤k1c\ÉKGSŒK‰^¤Úª€—4\Ên6›ÚŠoğ\ÛG,DÔ»A\É7x)¼\Ö\ßm|P¿%\n¦3£4uO`vW\ï;\ÊA›ßŠ#/¹wZ	¤¯\Ñ\êB^Ò©\Ö\Ì\nh(\nx‰MSQFn\İAF¼V\r\çd£Ê•“‘sÿ\ÊüÃ½g\Ç\Ú\ÂKq\ä%ûN6®¶ŠX\Ó^ğ’\Ö\Õ_x¿-h(\rM€—øş‰uÁ¹4š0—B\ë\í\È&F¦\ÄË¶T7ÿo€\Ê\èW¸/	[\ï\Ñú\Î[üx)¹g\ã\ã¨Y?ğ’\Ş\0“÷\\CioğŸ2;AFn[F€	¼NoG\ÖOZs‰Z\ï\ÎÁú^:\ïk*zfÌ±¾\ã?^ªˆ\Çz™\ÇÈ½/\é5Y‚\0\ÓZ%3€—8\ÍFÕŒEóğR¤p©NMo7\ÜBõõN¿³\×\ìµ<­fi¨oAc\ÇK©—\Ñk§^Ò«®÷²†\Êr\à%\ÎC$\Ê\Èå–˜»^\n\á¦\í’\íLœ«“Sµ\ŞG~\Çqõ¼Ÿ\ì5¾¯ˆ/\Ä\Å\Ş\ìUl\à¥\Øñ\Ò\Û:H\ËJğ§Š¢ŒÜ­‚Œx)t\Z¶Iº—xÙ–¤\ÆM[\í\0¼\ä\È\Ëiug-n¼TB±ªQl>^Ò¼şŞ³M•rÁK¬ª\äM˜\Æh\Â^\n›²M*Fc\î%öj™j\Z¹\r€\r’/2iT4.i\Üx\é\"„â´¢xM/\é0M<=\í\Ú/=Šz‚\Î“2r\à¥p)C\Özœ%¦˜¼¶‰-\ïœğ’Åƒ\×Qk\ëtZ1\ã¥×¹¨z©öÉ¨:xI·š”W\Ù/1Š #g\ÉL—€ş\ã%¬£\Ù_–¨:‘˜bR¤W0ıvŠg¯£6\Ò\é¤c\ÆK=Ñ¼x\ë\Í>*\à%\İòpŸSXğ\r^bVy+\ÈÈ½£	“<0awkŸ2:5‰fÌ™U\ë½\ä\ÜzO;\é\\\ÔxñR±*/Ys;¢\rğ’fM½­«\î±x‰YIQF®\ß\ÅXğRxdSm“M	Spj^²\ÌkşÎ‹WÉ§V//^ºŠ\ÂK³VDß¸€—t+sğ|\ÛS‡2\à%ne\Ş\åš0—Â£·#µU\r™÷\ß¢Ã¶•/\å\Z¼Ê½µšXñR±//%VQ½‚—´k\ä	\êuÿğ»º‚Œ\Ü\ì’}‚ÀKá¸¡]\ÓT­w_\âm\Ù\ë\Ø\ë\Î% \Ã<,…oŠˆ—rW—[İ /d\Ñ$”Cd¯‡\à%\íº¤½¶\İN5€—ø\Òj&\È\çÑ„	¼}z\"\ÓY\ÎR¢Ö»@x\Ë\Ú((»<ôŠ/\İ\Â\ÉKVº\Æ-g^ÿ{g¾<’CñƒYb˜@„}„=aI\Èû¿\ÖtÏ™3ÿ´TŸ\İq•Œ\ë\ŞH(p©~–TWFOE¿«H/Mú©\rv\à%q\ÕÙ†\ïn|˜^Ò¯\àƒ/\é;³Ô¾r—\îK\Ëw*\ä\"^\Ë}o\Î\Ú\Ø\Î\Öãº¢YÜªr:ˆnF&k`\ç•b\Ê4½ş)\à%qY¯\ÃK/6N/PŸ÷\Òrs˜0— G\ZUF\Øq¹sû\çŸ9”‹9\Ó¶\ßû’\Ìü’-Lº–¨&\Ç5R\ì\Ï^’OK\\¸Rpc\Û+xÉ„fŠ;r0a/\É\ëeJ\í¹H7Û–\Ã\Ş\Ó\Ş\\\r¦r¸¯ş%3r®\æ~±b`fóš\â\ËÀ\à%ù>ö‚Ü¡ü\Ò}¡\ïG®9€	xIZ\ÙiT…v*Gª\×û\Í\à!¼s)›yÉû	r3\Å(”]š\Ç?—\ä\ßøv/•ŸÁK÷¥\Î_‘;\Ôa\Â^V¿L6\èF^ñX%BI\æ\Ë\äiñ\Â\ÍC)$\ÓOÀ¦\Æ\â‹ÿÎ‡¹\Â>\Í7[ÀK\âz<r\Ôğ\Ô/İ—Š³&\ÏN\Îkğ’lP½P\á>3\r²o«6/9G£v‘í‘·k/\íVs\ëT;§€—ÀK\à¥—t\ã}I&0a/‰\Ê_S\Ñ>\n\í\ä:DXöŞ—f\×ñ\ÅZ­DÎK/\å^NsıT§€—\äX\Ô\ã\Ò\ÃKsEEî²„	xINtö\ÓF ú…ˆ\ÊOg\Ãyc\ã†d\É\Û\Z^\êñ£\ã¼uº¯ƒ—\ä_ú\Ø&aô{\ß\á™4\å+r™©ÿ\0—¤bı†ô\Åno\"\Ä**eLo<b\ëA\É\rf\r/m\n|}\îWBğ’¸¶„3\\‚—\îN•._Ü¯\í\Ñò\r^’R\ìõn~‡&‹\Ô\ì¦L\Õxyi²\Î\Ò\à%ıZó)ô]\Ê/ƒ—\Ä\ÕkÀ¯2E¼ô\Ğióqs\×CE¼$g>¨\ç2S\r¿Õ²#\Â\Õ9ÿ˜_g(\àm÷—-¼ô²`šIyz	¼$¯e\ÛÁ<”ñR\î«\ÉÆ“L˜ÀKB›\íDm6\ç³şO\Ì\ÔdD‰”\Î+;BJğl°…—\Î|9\î’ö†ğ’¸\æl\Ã\Ë\Zóv\ïòE^Q‘k<#Á^P–šù\æz}„\çúFœµ³\Ä\İ\âv\Ød/÷[\ÂK\Ù*{8³M{t/‰k\ËNi­\Æ÷€—\ê\Ìf\İük€³¼d>\Îw\È^\ï\É&ü÷²\ÎS	S‘¼:7q\×9\ÉuZ\ÂKş…nµ\Ô\Ï|/‰\ë\È\âúw|(^2¨b•¿#W8c\î.x\É<`\\¨‡±´\r¿ùgT¯÷I&zo\ì‘-÷>b	/W\ì\'X§ş:xIZÁ\ÅõoS—LÊ¿ğ®•7˜0—Œò¥¬t¿\Ír#\"¥\ã|Œ…4c\Ùd&v:X\ÂK#ö¼*lÀK\à%\Í:×¸_ 0\ïd/\Õu\áÀ„	¼”‘>\0®woT™\ë_\ïƒ\Øõıg¶ç¸¼”úL–ğo\î\İ§şU¼$­)Û¾\Ô\âû/\à%³Ô‰¿CÒ£\"^2\Zä¯¤¯÷\"Bot…\èõş™\È\å|¶ ç¤m;xI1k÷5ı\îr\à%iñ\å¸cŒ\Ğ\0^2üô¾³9gWy€ÀK\æ\Ô!*W\×ğÇ›O%š3Á@¼e÷×ªc)/ÍŒ\à\Ê3k/\ç\Í\Ó\ßi\0^’el÷\\~\ã/\0^2¼¯\Î56z\æ\ß`\Â^2I»TŒ/E°\å&\ÏeD¯zöØ¸\éİ„‚‡0/9W#¸²a\ë!‹^ú÷xIV¯\ì\ã7‰ó&xÉ°²¯|E®±(\à%cò×™_f9³\Ô\à9\ç6]Ö‘\Í\Ë;[™B˜—\Ì\à\ÊÌ±u\nxI^K~œ}9\Î\Ù\à%ã¿¬¢\"&ğ’)\é­?¬‡ÿu¢\×\Û]ôe×µ\á=;&sy)\Ó2ó¶ó\ØzˆÁK²š±\é¥XÛ—ÀK\æu°ñsr}|€ÀKFCÒ¨²\Ö	¸õ>ˆ?0>_º<;DR_</åµ«ù>2”³.s«löÁK\à%\ÍIˆ\ï+È€—Ì¯NqG\î}&ğ’‰øş<¤\Â\è*B.À§ZJ3ñ\âË†Ÿ:\ä|J\Ä–—J£gİª†JÀ¾>\ÙĞ•	^U•O/-b\Åuğ’À<\ä+r³\0g9x\ÉÀñöA=ƒ™SøıU…¯üQşù\å-\\\×ûˆj,/ú\éy öltgƒM\nxIRuş•»‹5\"—\Ô\â\ç\È-0¼d`‡M)\\ò>\Ã÷z\ç\æ52?š€£\ë\Ê\'˜\ÜÒ·ù®¼4*\È\Ú€—\ìå¥—£bÇ·b]%xIb}k>}&ğ’ve¤Qe\ìşºŠ\ÒI\Â\êrŠ&wµ/\éĞŒË™—6\à%ğ’\Şü\ß\à\â¶\ã½\n^’Ğ˜¯\È0a/i\î\çZ\"´jW>‰óa\ÕJF>O¹v\İôÇ±—²\ì4”¶\r\í\Ş\à%A\Õ\Ù\ï\ŞuS¼\Ä\0^‰.#ş\\ù&L\à%½¸N®ˆÒªır¢z½«	Aı\"?\Ê\ì/]L\×m\à¥G\ÖN Ñ³aK—\äh\áCQ›\Ä\Ü\ß^’‰\èG¾\"w\np¢ƒ—4*XS\Ô[‡\ß[¹Q\Ïs>³9{•#‘\é\Ïi/ù7ºV\ä\ËÁKb\ßüLQs?c>LÁK2ª7ò0a/‰°:9\ÉÛ»DhœÛ´©¼\Í29kœ«b¨s4{P\ØÀKÁÁ³w\Ø.xIPŠR\Í_;\ì\Zó\ZÁK\Éû™ß—0a/i‹\ì#²»\ç0\0û„w“\×N\ÒT\Õ\ì)£²¼\Z=Ã¬\à%v\Ú\îÖŠ`^\ÒùIU{\ïöb~úÀKBò\×>œûxIO`&˜Wo\á\Ó\0ÁÈ6‰Š¾•›ª\"gö\Ã\ÚÀK\Ö~i„üxI\Û\×^?¨p)wz	¼$¦e™ı¥k˜»«\à%\0Ó¯\Â\ç\'>3Zµ_¦\Ä\îÌ¼&¬ˆ\Üo»Iq°—zl>oüxI—\êC.¹\ïA\Üÿ¼$¦_‘;öP‘/é¿¦ú\æòZ s\ß+¢û)y¶aU“;1ˆ*6ğRk\ÇÌÁK\à%M\Ú+³Kn3öôxIN/ü¹\Â\09—ÀKÿ^\Ù-iTùŞ“(7_\ÍK\Ãzò–:-©bi\ã¼£:/5­°\0/I|ç²—b…^’~\'\ã\éø\ĞGE¼?Cœ©AK^û>@z7\Õ6	L\"Ğ©´ÿ/úf,#f/¹PV/—´¨\ØZ¨q©=\à%Á\Ók°\â\"iş5x€ÀKqú;9±\"B÷s°&bT3™#Â‚®§rØ™\np6ğÒ†;º\Êv2ğ’q\\š®<%.y_\Z`¼$ù“óÎ¤\Ì\İ/\Åd¯÷køG\íñ‹ˆùSBwe\ĞPÔ“¡“\Ì^º²¸\0^/i\ĞR\å\êı?cy\rIoğ’¤ú|E\î¶DE¼««¤Q\åGøŠI¶Eôz;Ÿ‰-¹ô•ÀT0”³—F\à%ğ’ÁP6øC\ë\Òß¶\Ï:–^\İe|E&L\à¥x•‘½Ş‡ğ‡vnÿDôz—<Pµ³P‡T#Ÿ\Üj^\Z‚—ÀK1«\Ø\ß5½?\à’¦¤7xITÁ½Ä³˜£\"^Š“Ê¤\Ñ5|’eL5\ÕFI>\Æ\æ+eG¨‘.VóRü8\à%»y)[©\ÖşDK®{\Ó\ãc^’\Õó\ÂcûQ+x)¶¸yù!kR\áÿ‚$.œ•¶ÉºW%0\rM”­\î_B~	¼«–_!hÉhJzƒ—„µe+rNËŠ\É\Ş\à%#òÔÊ¯\ÃgEjx~ğ™}kª\î\Ğ\ì||«ıĞ¿^Š1Š×“üŸi\Ém~k¢ğ’°¶\Ïÿ§±(à¥˜ô¸%{½o\áR\Ù+1§×¹%\Ş^§¸UùV–¦ú\r+x)?ğ’Ş¯8\ØÏ†\Í¹%7vÁK\ÒÚ³şL˜ÀK1Åš\r5N\ÍkG\îE\Ş5+\Ï\ï`\í\'0\æ\Ú{¾­ö÷n\Û\ÑU\0^\Òù\å_üek–ş{\åW×¦/‰¿ÿÎšüı\Ç¼ô{\ÕÉ‹õ“\ïğa¥wó¨fñ{öxR\İ=.k\ïù¶—–/M\à\ïm/ù›\ÙT“¾^wÃšã†–7\Ô7~¼$\Î\Ù\Õz\ïcõ\à¥\ß+øt\ÈZTøPî¯‰‡´4»÷×\êeTwL±—z\Ü9RÂ¼]x)·i”O—\Ühjh48/É‹\è\Ì`\Â^ú=/|e~yóqKõz\ï\å\éô?M¢%İ¶•6ğRe\Â,Ò«ƒ—\Ò\ÏKû…\ã&EeF<\à%yeg\ì\ç\'ŒE/ıúùúPY#|!*w%ÚŸ¼Kı~\Ò7\ÅK\êJó:là¥€õE9ƒ—R\ÏK\Åc>)´äµµ™\à¥$¼œñ9˜0—~\ÊI“\ëŸö&ü_ ÚŸ¼vç¾„ñPL\İ\0¼ôKù\rn‘o\à¥\ÔóÒ¸‘˜ô’^\\/%Bû6R¿Q‘/i@…\æ |\\©t‰p¸jİ•\ÛÅ¸\Ì\Ç\Ø\ÌL\ë™n/½t¹ó\Ë\nS»y\éù\ÉK.4O\Å\0/%b·MY\×\Ê\';\êÿ\à%]\n\Èf\çL„äŸ¨^\ïÓ¹©£\ä\ÚZÁ\Å^*¹E\î¬\è(°›—ú‹dğ’s\Øk~\ÚÀK‰På“­Èœù\à¥Q®Ü®s_\ç\ÍV©˜\Ö3â¾­‡º\r¼”«r¼p±bJx)	¸t{Ö\Ì/%\äí—­\ÈÁ„	¼ô‹8~­Q\ÍK‡ğ\'u\îLõz\ëw÷Ud|Sj~^ú¶\Ö\ßÊ†9x):\ê÷®\0/%$\r0e\ß~»v8¾—t¨NvL\"øL’V—\í\Î‚¹5L—\0¼ô+m\n\Ü\í\Ãx\é?\ìiš£8†	¥²²Wö\ì[¥úş×š\î3’›t°„t€\n¸l\éE’?1/)0¢\0˜—\Ş\Ä\Ê7t‹V2/ı¥Î®óš\ÎdoõzÆ²‰·\×\Å[¾ò¢z\"x©†i¢¤‡Ihøf^\Ò.»¤d<=óÒ»\Ø$Ã¼Ä¼ñA‚:µô.ü)\ÊA\Ã×ŒKLa\ïù\È{¥DğR®‚½e‰y‰yI¶\ß}%ÛŒy\é]#Ç¼Ä¼ô—Nü\ÜS·\'„*P¯÷9¶¢`wUù–§„óR§!\Û\Ô\Õ\Â\Öh\Ãw.\È1/iµ\Õ\ÄS³Ó™—˜—˜—ˆúğYT¨\è¼ö»%Á[˜\ä\Å5”—CºenCEÈ„\Î\è{‰æ¥ƒ\æ5¢\ÏK\é\Û^“3/1/1/Ñ´\Ú\ZükfŸø€l\İc\ÜÀ;\Z —‘Y¿Y\Ò\ZL&})’`$š\ĞğóRAs\ÈZVˆó’;Ÿ•\í0\æ%\æ%\æ%’\æCò—ğ\ç\Ú\Û!³µ¾E€\ŞC\İ\ÉJ0\é\å%g®\ÆÌ°†os’€‚œ€—4§×ª´y\ÉõU…û‹y‰y‰y‰¢¥&\Ğ\ÑvO\á{²\Ğ_0c~sÌµWª4y\ÉQS‘[¢31º	\éd¡óó>zz\Ókû1òd^r»R\Zg^b^b^¢ˆK œµ;\ß{”júŠû\0h¯‚¹Ş‰¤À¦›—¦Jnå¾±‹?¢_³\Ö\Ø?¹¥y \Õ\å¥a\ìy\ÉøS\nóóóA\ëÀ\Ê5|\ì¼~\0\Â\àõ}üš¡¸\ã[7/M\Ô\\è¿ 3\ê›ôp^ªôõ¾ı\İG,w^ò»§šE™—˜—˜—\èÙ¨y°\Õ©†\å\Í}Mü]­wÀ.%Ï˜—^°\0½z¸£?\Ñ\ÉB³k\ã«\Ş#³Àtı2÷8óRz|\Ê\êW–y‰y‰y‰œ\å\Ú\Ğ	z¦÷¨u‹\ç§Zw·.Ö˜,,\ÂK\Å1ö\0ôG\ÈYgŒ—2šõÍ§X„÷ƒ\ÈL9/¹ƒ©=Å¼Ä¼Ä¼DÍ²\à±vŸĞ™lL\\26$f\Í÷\n\ÈI[Ë¡Á„ğR£‹!CzAŸ—\è\Ëjı\ÆH]°X:Å”—ŒÁ¥¯kM™—˜—˜—¨9\ï \áR¡\Z:l¥PewIbyR%$¶\å=\æ¥–õ-È\é+\n\\Ğ—ÿ\Òúò¹#ö`­}d«’—ê“½§/cÇ¼Ä¼Ä¼D\Ì`¡\ÊJ3´´:…ÿ;@÷cO$MPÃœ\ÉÊ„ğ’}\Å:eœq|‚iú¦\İ[\rtNÍ¼&?¿\ä¦ÿB“\Ş\îæ£§s/1/1/1/Ñ²òªœ†?\ĞE {õ‡O\çš&ò]’âŠ“\ÂK\r4Ë¦/Yù‰N&h-b—\çè –‘üü’\ÑnŸ¶£!\Ú\Í:Á„y‰y‰y‰˜5&.™›ğGÇƒ43:9‚)CºR|^Rx	!\ç<\ê§\î¾\ÂşË¾Ö˜\Õ\Ã¼³\î¹P^\Ê7ÿ”{ka†©°\Ôø\İÆ¼Ä¼7^b`Yj\İS2\×\áwQvV\ÒGB!¯3\Æ>¹™—^a46›w\êL{l\ìˆcVu~h\Ü\Ñd\Í)º¼W´¼$`\ÏßH\'0/1/1/‘r\Ü\È\Ù|\\\Ã\×\êõ^/	­‘‡H0û\ÌK/Ø²€¾\é™úL”ZŒ4:Yq‚öU]¢ğóRc#®\È]õUw™—˜—˜—Y\Îó\á}v\rˆz?ZR»\'Ø¿§¯2~,1¼”:¢o\ê_‰w|\çĞ»N[cóVj‡ò\Ò6ºÇŠ˜—~Â§°\"÷­oÀóóR\Üp‰y	·rò\\\ÆWø\Ã<:C\Ò\×Z\án‚øw)¯™^²gx^`G½\ãû„†ø[Q\ß\á\r\ĞÇŠN®2r^²?}Ñ™1\'\ÚZè™—˜—˜—\ÈX\ÜE\é\Óº\ŞP.\Üøj\ĞZ§;\â\'\ÌK¯˜W\ÇL3\â	&¼ğ5\Ö\ØÀ\Ô£m\èµ7\æ¥ò)-\ÚÑ•™®\'óóóC„*\á\Ûr²[`š»\"±…\ê#\îxÃ¼ô®ãª\æ‘xS€\æ\Ö\Ì\á\ê+F)\'=/\Ùû–¨\"g=\æ%\æ%\æ%æ¥—l~\ßW‚ğB•W\è\æX½Fm¡–\Èa;Qä¥©ºp\İ_\á]º{\Ú	¦\Zš\Éq6új‘xûR”\È=/e\'yÑ–N/4\Ñ	óóó+\î@Ÿõ\Ä\0«~È­\Ôø¦\ÈKw… \Ò\Å\ÓÄ¯\È\è¿ù ­\ÉC§\ÍK„%ö\èyI Kş\ï}ß¾%e^b^b^¢a¹t˜\Íº\ŞĞ”uÿA¯Uw\ÔB´˜	òR¡§pa‡xZ \ß$`\Ê\âj~ \ë\ÍT\É\ÈFxª%ğ’T„9M\å]\æ%\æ%\æ%†U\ÃoŸFğÆ…\à™\Ãx©N—2•¸\ÛÃ³,N\İ#}şx\ï\ÖE\ÓG\ê‚6Uù\Ë·º^\Ê]„9¨eM™—˜—˜—(˜;­\Â>üò\Ğõ6»£Ü¨‚TN\ÔòRZº­OµqeŠgˆO‘[\âñıCS\Ø*\ã¢Põ(I/Ù£º°\"W\ï\éH\Ú1/1/1/‘@€.´yVO4¯€—\ë\êU’±\Í^2¦C\Ù6S-Ql\á	¦U•rE.õ\ÆwS“ZgG¸v”C\n/¥\î¾0qZ\ÒÁ\ÌK\ÌK\ÌK\ÔMr2O\Ü%¯A¥”J@2\Äõ\Íw\è_\Êô\é­lª$P\Î\Ñv\r\\…Ymô\Íİ–¸•ÂŸ\èQ\ÄKv\ê(‹24¤+™—˜—˜—\âo n’“Ş„P$—\Ù\æH.¦W¹f^zÕ–<ÁdL)İ½\ã¢\Ô--™µ\å} y5\Êÿ„^²ûQE\Îı\Öp\íy‰y‰y)ş_õ3¨\×\Û]‡Nj|AºŞ›\Ñ\Ãæ¾ƒ\0I^²7‚ W\é®\Èõğ‚œ;\ÕÑºõ\È+w\ÄK\ÖV\ØòŸª÷N\ÌK\ÌK±\ã%¦ÿZm\0lœ­ğ\ÖR\Z\ìöˆ®6vÇ¼ô²ULÎ²\Ó\Ñ|«\î\ä\Ü\rm¤ü&‰—\ìòY\\‘«)OW2/1/\Å—˜—şc8\ìsüxB×»õ\ãÿÅ‡>\Ñõj\Ô1ÿÂ¼ô²Y%A‚)R™\Äw³ ƒ\çB¶\êL¸øRÔ¤!‹—\ì~E¨Å±óTS(óóóR\Ì\rª|\â\É\Zc>¾S\í6é·œw˜·K“—\ì\Ñ\\\äüİŠœP|Jy\ä\Ê\á³P¢n¼—\ÆKv)#\Ô{¨†\æ%\æ%\æ¥x[¼xk\Â\Éõ JB†®\\NózM\æ¥\×-5UQZt\ç\ÈYø¸a\'\İT}šúxzÉˆX”K/õ\ÄcQ\nª+r\ÌK\ÌK\ÌKñ¶\Î(%´\\_€0Ÿ¸[7\Û \î==“ñkI\ã%»|UQ\êE²ûª&\èO(\î`\Êqx[¢}y¼$**ş:°ª€y‰y‰y)\Ö6ºA¥~Hnj±‚n\ë\Ò\İv¹\n\Ö\Ö!`\ÇKvSTEqOd\ÉŒ6w0]\Ç8hD}\íU\"/ıa,J^±óóóRœ­ªºùá½³\Õ¼;§[6±½\ÅÄ¼I‚\é$J\nU©ƒ\â\\©SãŒ£\Û*ˆ¸Š%‘—\ì\ŞAX‘»-•ú)\æ%\æ%\æ¥8\çJÀüLzù\í¾t·.~K†*u¥ò\äñ’½‹bœ1¡\nL^ES%&ZM\\<Ó¹E-ô(“—ì‡¸\"§v/1/1/1/\Å9WÕ–\Ü[ø’G\ês0¾rt—¶\ë8)˜@^ÊŠ¦¢üº]Oõ\æ\åT\ĞêŸ©{kQ™ùf©¼\Ô\Ø	E˜*•{‰y‰y‰y)¾V­ÿ€\êJûğ\É°\×û\è^³)\ZJ\î\ÌKQ\Å\ëP8\'Cu0\ÊH\Ô\ê>©J\Úf/\Æ8DşRyÉ®‰ô)·«\ÒW1/1/1/\ÅÖ¼3ô?†F©;\Ğ\ëm®—„\ÇVŒhHN#ryI\Ønü3\Èù[¢b\Óô;ˆu^:\é\èÇˆ\È\å¥\ÔV(Â”şTH*\ÌK\ÌK\ÌK±ıŠ•ni\é@ğ0(/\Úıô®\Ëqy‰\ä¥\ìEX‘#;\É\Ù)R¯†j\ÒjHµ¨}–K./Ùo\á^*\ì\Õ%+™—˜—˜—bjV\Zú–>…?$=¨\×\ÛP\"Ÿû@“m99Dò’\í‰+rNfJ3\Ã4\İo)©\È	«qf)úÀ.™—\ìkKtG\Î=ª£\æ%\æ¥øñ\Óo›Í\æ¥·ğB•H¯7\á_¶5E]oFNûRBy\ÉŞ\ÅÀdlH:s\Ñ9\Ç\í\å“5!Û¡ı\È\æ%\ëK\Øò­U˜—˜—˜—\âiğ¬€ù,´?llóPzÊ£¼hµşñß“ó“	\å%K\Üvòs§G\Û\äyÍ‚Ô\ÑÀcuPÙ¼ô‡±(\îA\ÙFb^b^Š.1/ıúmCUı\Ì\"¼P\å`w@:ˆg7ø\×ÿN’\ÓM(/\Ù\å£)&óV#Xùõº¢\×\ÎK/Cön¢ß¯\Ë@\é¼dİ…\"LnI0/1/1/\Å\Ñ\à[#\Æ=85¨\×{X”W-X\á\Ñ{È¼m‚iô!®\È=•u\Ä<\îr©q5G¿.—lû(lù_5\Ã1/1/1/\Å\Ñî„²¹óBÿ\â7ğš!\İ\ëm{sÁ5Y\ç,©¼ô\ç&\Çñ•\Ê3\ç†\íc =®Yma·\ÜKr\å¶,\ÎR–[/-\ë\â±(Š¦3/1/1/\Å\Ğj0;¨¾\æXómÊ½\Şvc#pºmYa,¹¼d}ú\à%\Ç\Ø)\Óúj·Ÿ\Ñ.#Ÿ\ĞFÂ‘gn\å.˜\Z\âñ´-9\ã\nx\Éz·R^w3/1/1/\ÅÏŠ;÷µbZv\ì7óÜ£¼h©¦ ˜¤÷²~6¹¼d7\ÄsQ~\ãC=PiRµİ¿=0~Sz\nu!\îtÿ°w¦]\ÊòH>ì¢¸€(\îŠ; h«¸÷ÿÿ[\ÓO¿Ë™™C\è&	`\Õ÷¦\ÍZW*•»h\İµ*.¢GCK€/i\æ	_e\Ì$0¼¼¼”;«4Œ\ßU™/¨\\\ïj±øG³\án¨e@¼1/if$\ÆS©\Ã\"[\×Yü+$Ù£ş¦\ß\Ü\â[mQ\Êaª`ÅŸ\èdaÁKZ\Ó\Â^\îqJ\à%\à%à¥¼:8ä­²]EfM:\×{T\Ãô»\Ô\ÚşÎ¼„—šş÷\ÑVH98\à\ìzÿ5ô…Ÿœ\Z±\ÎvKZ\ÙõLxI[b£v“²(ÀKÀKÀKyÃ¥*y)\"Ÿ(£J\×{Y\ì\\ol¨£Eogyk^\Òl—\0˜:[šYLÎ£õ?¥s£~.˜\â3\İu\ãœ~8d´\Ç\ã’Ğ \å\Ò\Ùğ’3Ä—E±œö€—€—€—rfş…K\ë1¹P%*+T\Ù:…Æ¥-n·Uvô6\Û÷\æ%\í£F\0LbuBkö9\Ş\æÿg»KıF®\Ü0\ç¹\Ë\ãaL®Øšª#^\ÂVş³1€\à%\à%\à¥|™‰ôüs|kE=[ÒŸ…g\å-6]´E1\Ñı\ÍyI[Åª\n|»»+\r\r\Ùô\\Qò‡º\\^µò!i†s\Ëaœ\ØU\ïƒ\Z$2\â¥\Ê»†\r\"LÀKÀKÀK¹2	yo,\Èu½WsDİ¹š]\ä\ä¥v\ï¾<Šw^\ÒB‹˜J\Êp•¶\Ã-Ğ\\mRŸ\ì£u\\£\ÕEz\ŞÌŒ\Éôş\Ú ¦ôh‚/i^„i\ãSO(\0^^\Ê!/½10\É!R¨ò\è\ïn.\ê\ÉÎ´È¸\ä\à£K%—\æ¾òö¼$_È€IW£[ŠQYm­WWT‘C½\Õñ”(l\é\à„4¸\nqÿ\ëLQ ˆ/Å¤…)\r\ê\"LÀKÀKÀKy2$\íˆ.ù$©\ïQB•\Ë\"U\Ö#¼;\éP…Å·\ç%M\"Œ0}\Äğ–Nn‘4\ëóšŠz(BŠ\ë,\Í\ïi\ä–V\\Š˜¾§™²ÅŒ—\Úøsµ¢}#¼¼”C\\z_^rP/\Û>{!ñ™¨I\ÂSùoø\ÏwQ\İë€—4\í\Ö#¦’\ÒZ\Ö\Ë2r{°]c\ÇüsMÿú\Ùl±­\Ó\ßTÊ¡+\nZr©ª¨3\ã%\Í\Æ>Ğ©‡\r—€—€—òc\è”\ÇyúM¹‹\È~7E\Öõ¾­cœI¯Iõÿ/}ÙŠ˜¾¦óşW\×r•Á¹\Zû$O?\Ò¨Jûx`*‰\Ï_•G‘W§xZúš\áT\Ãi\ìxI~\à¥\Ói‹0///\å\Æ\Ê\ÈJB\ä\nª«\âv™yW\ã<Önxé£·Db`Òõ6ü™@\Ñ,<\×T’ÿ¤„ôö–Ñ\áñ°²:u\ZÛ£¬Ê—´J„\í\Ò\Úİ–///\å\Æé¬ª\ÈwEñü’\"(¬P¥ü	±|Ê›\nğÒ·5ŸJ)©\Õc\×O42R}<9\Õ\Ò\à2(ô;A¢\êz³\äKPv\Â( ‰\ÚÍ§”\Ózò’6À¾;¤X\0¼¼¼”›=QB•-òJ±\æá³„{as½Í\ëM,\Ú\Ô¼ô—†‰€\ékf[\×sXo„\ÔvÆ»cKMòu¥Qf°b]²¨šX\í7Û‰ø­<Zn2ò|\Ğv\å,yI\Â+\'¨Sª^^^Ê‰µQ´S²\È/*\Ä”SQ•<uã½‰1¡f\0^úgşöRb3\Ç\å\Í\Æ}Å¿-·›@Oü\å`À ¬:»’^C*\î}LL£I¤¶8˜P\çB–¼¤9W|Y”\Íõ¼¼¼”w³~WgRò\ÒMú\Õ/hw…C’ówŸzp\rx\é~m?\æÉ±¦T58Dı¥w»\Æö\ìùöxN‹mtTA,ı\ÄX¤|ÿ)^Dü\ëDµº\Úq\ËYª_\×q¨.ğ\è‡Ñ˜ò’Œ×‹\×\Ï4x	x	x)\Şæ†º[\È7}yUEl4\ëK…*\åú\í\Ù!qQ‡úoy\ÉK\Æ\Ê\áf|®`¥Kõgló77u‚¹\Õû6kş\ÍIz\é\æ2\é„d×‚\ån½\ï 8C6G\ãğ>¬uô\á\Üc\àÇ™ò’&\áÃ”ó\" ///\åÂš-TòÒ“<:4B]\r¨r\ázJnû™“Z3ñ¼\ä%±\êr³\á}Æ…“›I“˜è™¾gõ½ğ—=7\Ú.½\Ëxö7\İ\Ö\í\Õmw\Ş_¡\Ò÷e}—\Åòf\ËKšjùÑ›\ÙÀKÀKÀKy0\×\×kòl›š\Ğ/.™—Æ†\ÔA\ÍC?¨¡—²hÖ0µjF: ¸0zjöÌˆ¢ v:Æÿ¼¶b\ÒDÆ¼¤M±¡cb­\à%\à%\à¥<P@µi\äZwÔ»q_/P•\íÛ®\ï\ä\é,Æ”-f”—J½1`’.­LtHg\Â\ì¨PY<š,º6›&²\æ%_% 7±—€—ò\ÈK\ïL\ÒUeW%-MQ¹\Şn³8]$_\"\ËH\ä–\Ô%w’U^|2\×dÿ\È?\Ä$ön\\¹»f?	„£\Ïh€Yó’\æ\ã«\İ\ì©\İ\È///e\ß(¡\Ê\Ñ!yŒ\Êõ¶\Â\âU\Ê\á<i–È\Í\é;«¼TŠx~ûQù6]²\r®I\Öy[F\Ãa\ÕD\æ¼ô\å-q‹Ê ¦8¼¼”G\\z3^ªoPşeC\ë=~\"n$vz\ZW?$0,½\Ë,/]ù\Ñò\ì(ğly°c\îH\êŒ[\Üó\Øe&²\ç%3¦,ŠMij///eİœ-\n—zÄ¸cnQº\Ş\ç\"­¦KÂˆ£\Ë8\à%´•oü²˜„“Í¡\å?Ÿú\áucd3|\ÈÁ—´n½+´Ê¢\0///e\Ü\ÊÈ¹\ì\Ès½Q£BM¬®0\ÂÀLx	eò\è\Ş\ãr)\'®Ÿ¯¬BLóFe\è˜/•ñeQJ\"LÀKÀKÀK\Ù69\ì•~’P©=zµY(¡J/	•\èÁ”\İñx\éUŒ`o°ot\Ğ÷¹\Í{\ç\ŞaˆŠ²U	\áÀKšƒ¯\Ìwõ©Ln\à%\à%\à¥l\Û\ì€Ø>#r%€qu«—ñRm\Åğ—/½„.\ã“2ü\à*8¶\ÚĞŸ³Ã˜yğ’v\Ã^oŠtŠˆ///e\Ú\ê\'T€¤š@\×{ˆ\ØX\Ô]Á„*ğ’1-™¼„\Ù\ê§.\Ãwc\âõ\Æ{Ö›;‹\îtP\"öDÈ…—\Ê}\ì\í\æüB\ã_///e\Ù\Ú\r\Ôí‘‹3›¨rK\Ê\Ö)X?‘ó\Ò\×ù›\é/^Â˜\ìLX“\àzÿ+h¹y\ìĞ›b\ëa²o#^Š)‹¢?i¤p///eØ¤.R¨rI¼:+¨%.^GE\ë(R^\Ò\×\ãó7ğRL\0ur`\Ç$õl$\ìµ/J\í\çw.\ÉY|xIö:\ØÎ˜P¸‘^^^Ê°Ù¨­Hß’¯T²øguP¸\"\ä%…ı«@\à¥\Ø\èôJ;\Ætõ2\ä:Ú9¡öm>#Ê‡—4)F„iœ~o\0//å’—\Ş˜fCd\Zy®w™\ë}“\×Sd¼Tõ\Ø\'°\0/\Ä\nGŠ%\Ö:ûA%[³µòHı\Ò\Úú¼Æ“/iM¼Lü\Ş^^\\z^2‘9ò\èPu3–•\âu	/\Û—¼DDşÂ¥rM%Tû\Ívö\æ«\Óİ¨\éMe}¶ù-j^¼$ï°…;^\ê]¼¼¼”U“&*:\äû9³À%e_\ÄU\ÏK\Æğ\Â\åuğ)B\ÜNVÊŠb0œ\Î2\ZLunQ:rLº\Ñ\Ú\Ù<Ç’/i\Î¥«¦>ôÀKÀKÀK5yl¡’\âÓ²ü@Mª«_\ÄÎŠ\å%·\ËÉ¥\0/‘\Û\ìñL1È¤´™e•ı\ÔŒÓsüŒ/i|™\Ô+>///e\Ô\ì\r\Ê\ì\Éq)\ì!ª\ì\Ö…\ì,</)•w€—’\Å¼(‰\"õºô³Ÿ¦W¾~UVN}\îø‹$ğ\ã%­\Å\ë \íU¼¼¼”M3ˆ`ó\ç\Æ&ş€*i\ZtË…\ì-/\éÁ)\ä¸qÜ³\ÊKO)›C\Ù…\ÛÖ¯®ªŒZ4±s\â+Ú³Iô³Jzºõ\\6\Í0a³öŠ—¨—šm°7r×”o\ä&¯¦:™\ä¥óò\Òx\é-yIBÎˆuH¼Ôˆ]X=WŠ\Ù]\ÓWTbT\Ï|k`\ì²\ÊKG)³£);ƒİ¾ü ›IT­M\ã2\ËÕ¡ b?ö\ëd€(ª\ëı$+y\ìvõ\ÅoW\éGu/X\Ö\év\ÑKÉ§ \ä7\ã\Ê\Ç\ëDßµµ¢\Ú#x…\È#\r\ìıxI^¡&„1!^–\å;\"v¬\ï\ë\í¯­\àwœò>c\r2\ÊK‚\'e{H+\ã\Ç\Ö\rD\â\î\ÓE¥wZ†£\\P\Í\Ë\"š+Dmın\æ*C¡óù‚Y\æô\Ó\Ğ\Ë\ì¹yº¦\Õ+:«úS÷Å•no,iEµ\Ëú\ÅHü‡½{kH#I\00º\ZA.‚\n\"\ŞD¢¢/ÿÿo\í˜}\Ø\ÙP3Û™€U\ç¼wL“jò\ÙU]½\ÛVK^Š=˜‚\'mô2_\0…\ãÀ¯BÅ«q¬ŸW­²üi\íO¯\×\án\ÚQns©8ÿ_,…ñÁ\î|\Øı?«À‹[Õ£\é\ì±ö¹÷+Œ\ë\İ\ßş\Õ6¹\Ó\áüa±v§y~\ÅK®÷+\îoÿ\Õ¦\âÏ½Á”ÿ“[9[Ç«ü¢)Mƒ—\Ç\ä \Ş\ÛK_Zwá¯„aÄø‘\\Š¼—jóÀ—@\î>ó½\Æüawù+\ìµ{Qˆõ\Ë?ÿñú\Ùhï›\íõ¸tú½\ÊdkÍœ\Ş>}š;…zmtñü4¿+—\İ\Æ\éÛ§9™œ6.+ûW/_f‹½Q»\Å÷d¡\ÕœM®ö«og\Úy;\ÑF·º?üöv\Í~}ï•N¾u;?±I\åé—„]i0­v\Â\Ã|\Ò=ÿ¹\ÍPÛ­,ı¬I÷e\ÅO(\Ög\ÃÿV\îıu¤K/şc4­N–ş%ª_÷J_H®—JO»Ì¯ûƒ\Ì@ó%´\Ö{Vˆø#›U¶\Ê\å\Îi£ú2=\îµ\×\èTóıÁ\áš|\Êy\ÙR½?n\î\rn~?››Á`o\Üo·\âÒ…z{ôv¦7o\'º\×\Õ\ê\ëıÿ@½y³4\Ä~\Ù\Äh~tó\'\Ãü\æ§\ï\â™\r–\È\Ê\İjƒ¥¿T+\â/û\ï_\ã\å!7RK)öRşz\\S˜}£\ÊĞ³u›?.ñıw¿\ë“\Å\Å^\ß%€^J¢—·¡9òóÌ¿0”BÛ’\ç5	\0ôR$ú÷É´\Íi;s.„\Öz\ï7\0\è¥8”Bw‡^2?\ÚV¸¨„.]F\0 —\"‘_„6E\ë\Şd¾;4\n­õŞšY\×\0\ÉõR´ÁtX\r­õş-óñI®õ\0ş•P/w‡\ÊÙ·]k¶T\ËY\ë\r\0z)­^ wŠw™s\'\Ò­õ¾1ˆ\0@/E\"Ø¨2w›ı5&Á­N6‰\0½‹\Ã\Ë\ĞZ\ï\Ç\Ì\Ç×¾Ş£R¶\Ö\0ôR4‚¶u³\ï\ë=\r\ä\ÒÆ´e€^ŠDkºñ¡G\ÛJç¡*\ÆF\0\è¥H„/½´³_X\ÖzoW\r \0Hµ—\â¦‹À\â¥\×\ÛA\æ\ã›\Õ\ĞlŞ‰µ\Ş\0l.E\×KÁ\ÅKEö}½C¯\Ûz’K\0 —b\\¼T\íd=¾Ú¹ió®mü\0€^ŠD)´xi\ãköµŞ³\ĞZï«¦\á\0z)Á\×\Æ}e=¼pq\ZXüô·ô\0zi\ÍõC¯«d´m°zK\ï³\\\0½‹^9ôh[\æ}¹ûóĞ¾Ş»6ª\0½‹\Ò\"°ø¨ü9—v¹•›×Œ\0H¼—\"\n¦\Ğ[r‹_Û™s\ë K\Å[ûz@ò¹O/µ;\'½¾\ãÑ¶\ën`ñ\Òå£¡\0z)–ÌŸ-o%Pl\\d^«İ¼\n¾¥·d\è\0€^Š\äü\n‡­\0:³\Ìûr·Ck½7\Úù(•<ò\0	öRÿ%;½\ÌU¶\Î6³q\énœ\ÎOš;.\n\0H«—Z½@\ïd´-ÿx´\îmB/^[/6J\0€¤z\é`y6®Xifu*<^n\'\çuòPw]\0@:½\Ôl\Ì\İ8È¼Hg<\Ìm\'h\ë\Ùjv\0\È\ÔK1\Ó\Î\Ór\ï”\Ï2\Ç@}Z\ÜN\Òp\ä\Â\0€,¹C/=.\Ï\Æ\å¦\Ù\'›Bo\ÙMB\çÄ•\0‰ôR\én\éşPñªŸıøó\ÍD{)·k_\0H¤—\ê/¯?–@õ1û\á…^¢\Óq\Û\ÛS˜\0 ‘^\Úùº4\Ñôœ\Ï~xÂ½t§—\0 ‘^ú2ûaBmó\ì=[’Û\æ]\Z\0H/5+ÿ›Kó÷m,t\ØH4—6f®\0H¥—J\Ï|\×nn¸÷¾\Ã\ë½\\š½t9pe\0@¦^Šb¦\İ\Î—|W.\Şû\Ô\×(\Íı*\ß7m	\0)\çR;|—ösß‹\éu\ë¾ùş‡\ä\Çórz¹T\îy\n\0¤\ÔK_ò£\Ù}¥{9œ.\Ú\çğöñm9©§\ä^7ngr	\0\Ò\ê¥ß‹©>jk;÷\èñl^\é6Ñ­7\í%\0\0\ÉõÒ‡\íô\Ç\ÍTô­\\\0½\0 —\0\0~Y/	&\0\0½\0ğ‘\\\ÒK\0\0z	\0@/\0\è%\0€•õ’`\0\ä’^\0\ĞK\0\0z	\0@/\0\è%\0€O\ÙK‚	\0Kz	\0@/\0\è%\0\0½\0°¦½$˜\0\0½¤—\0\0>’Kz	\0\ĞKz	\0@/\0\è%\0€•õ’`\0\ä’^\0\ĞK\0\0z	\0@/\0\è%\0€O\ÙK‚	\0Kz	\0@/\0\è%\0\0½\0°¦½$˜\0\0¹¤—\0\0ô\0€^\0\ĞK\0\0z	\0\àSö’`\0\ä’^\0\ĞK\0\0z	\0@/\0¬i/	&\0@/\é%\0€\ä’^\0ô’^\0\ĞK\0\0z	\0`e½$˜\0\0¹¤—\0\0ô\0€^\0\ĞK\0\0z	\0\àSö’`\0\ä’^\0\ĞK\0\0z	\0`e½$˜\0\0½¤—\0\0>’Kz	\0\ĞKz	\0@/\0üƒ½$˜\0\0¹¤—\0\0ô\0€^\0XY/	&\0@.\é%\0\0½\0 —\0\0V\ÖK‚	\0\ĞKz	\0\à#¹¤—\0\0½¤—\0\0ô\0À?\ØK‚	\0Kz	\0@/\0\è%\0€•õ’`\0\ä’^\0ô’^\0\ĞK\0\0+\ë%Á\0\è%½\0\È%½\0 —\0\0ô\0Àšö’`\0\ä’^\à\ß\ì\ÖÀ@ ÿ®§\â/I*\0_ò%\0\0_\0ˆ}I˜\0\0]ò%\0À—|	\0À—\0\0b_&\0@—|	\0ğ%_\0ğ%\0\0_\0(ı’0\0º\äK\0€/ù\0€/\0Ä¾$L\0€.ù\0\àK¾\0\àK\0\0±/	\0 K¾\0ø’/\0ø\0@\ìK\Â\0\è’/\0¾\äK\0\0¾\0û’0\0º\äK\0€/ù\0À\Ã/	\0 K¾\0ø’/\0ø\0@\ìK\Â\0\è’/\0¾\äK\0\0¿$L\0€.ù\0\àK¾\0\àK\0\0±/	\0 K¾\0ø’/\0<ü’0\0º\äK\0€/ù\0€/\0Ä¾$L\0€.ù\0\àK¾\0ø’0\0ø\0@i—|	\0ğ%_\0|I˜\0\0]ò%\0\0_\0hı’0\0¾\äK\0€.ù\0\àK¾\0û’0\0º\äK\0€/ù\0\àK\Â\0\àK\0\0¥]ò%\0À—|	\0ğ%a\0tÉ—\0\0|	\0 õK\Â\0ø’/\0º\äK\0€/ù\0@\ìK\Â\0\è’/\0¾\äK\0€/	\0@¬K¾\0ø’/\0¾$L\0€.ù\0€/\0´~I˜\0\0]ò%\0À—|	\0ğ%a\0ˆuÉ—\0\0_ò%\0À—„	\0\Ğ%_\0ğ%\0€\Ö/	\0 K¾\0ø’/\0¾$L\0€.ù\0€/\0l~I˜\0\0]ò%\0À—|	\0ğ%a\0tÉ—\0\0|	\0`óK\Â\0\è’/\0¾\äK\0€/	\0 K¾\0\àK\0\0›_&\0@—|	\0ğ%_\0|I˜\0\0]ò%\0\0_\0\Øü’0\0º\äK\0€/	\0\àK¾\0\è’/\0´~I˜\0\0_ò%\0@—|	\0ğ%a\0tÉ—\0\0|	\0`óK\Â\0\è’/\0¾\äK\0€/	\0 K¾\0\àK\0\0›_&\0@—|	\0ğ%a\0tÉ—\0\0_ò%\0€\Ö/	\0 K¾\0ø’0\0º\äK\0€/ù\0\àK\Â\0°\Ù%_\0|I˜\0\0]ò%\0À—|	\0ğ%a\0tÉ—\0\0F¿$L\0€/ù\0 K¾\0ø’0\0º\äK\0€/ù\0Àæ—„	\0\Ğ%_\0|I˜\0\0]ò%\0À—|	\0ğ%a\0\Ø\ì’/\0¾$L\0€.ù\0\àK¾\0ø’0\0º\äK\0\0£_&\0@—|	\0ğ%_\0|I˜\0\0]ò%\0À—„	\0`³K¾\0ø’/\0¾$L\0€.ù\0\àK\Â\0\è’/\0¾\äK\0\0\'¿$L\0€.ù\0\àK\Â\0\è’/\0¾\äK\0€/	\0 K¾\0pòK\Â\0\è’/\0¾$L\0€.ù\0\àK\Â\0\è’/\0¾$L\0\0¾\0ğ\Ã.ù\0\àK\Â\0\è’/\0¾$L\0€.ù\0\àK\Â\0\è’/\0\Üü’0\0º\äK\0€/	\0\àK¾\0\è’/\0¾$L\0€.ù\0À\É/	\0 K¾\0ø’0\0º\äK\0€/	\0 K¾\0ø’/\0¾$L\0\0?\ì’/\0¾$L\0€.ù|\ì\Ö1\0\0\0@°ş­±ep\0À/&\0À.ù%\0À/&\0À.ù%\0À/&\0\0¿\0`—ü\0\à—\0`—ü\0\à—\0`—ü\0\à—\0`—ü\0\à—\0€]òK\0€_2L\0€]òK\0€_2L\0€]òK\0€_2L\0€]òK\0€_2L\0\0\Ï]òK\0€_2L\0€]òK\0€_2L\0€]òK\0€_2L\0€]òK\0€_2L\0€]òK\0\0~\É0\0v\É/\0~\É0\0v\É/\0~\É0\0v\É/\0~\É0\0v\É/\0ø%\Ã\0\Ø%¿\0ø%\Ã\0\Ø%¿\0ø%\Ã\0\Ø%¿\0ø%\Ã\0\Ø%\Ã\0ø%¿\0`—\0\à—ü\0`—\0\à—ü\0`—\0`—ü\0\à—\0`—ü\0\à—0L\0€]òK\0€_2L\0€]òK\0€_2L\0€]òK\0€_2L\0€]òK\0€_2L\0€]\Â/\0~\É0\0v\É/\0~\É0\0v\É0\0v\É/\0~\É0\0v\É/\0~	\Ã\0\Ø%¿\0ø%\Ã\0\Ø%\Ã\0\Ø%¿\0ø%\Ã\0\Ø%¿\0ø%\Ã\0\Ø%\Ã\0ø%ü\0`—\0`—ü\0\à—\0`—ü\0\à—\0`—\0\à—ü\0`—0L\0`—ğK\0€_2L\0€]òK\0€_2L\0€]2L\0€]òK\0€_2L\0€]BF\0\à—0L\0`—ğK\0€_2L\0€]2L\0€]òK\0€_2L\0€]òK\0€_2L\0€]\Â/€_\Â0€]\Â0\0v\É/\0~\É0\0v\É/\0~\É0\0v\É0\0v	¿\0~	\Ã\0v	¿\0ø%\Ã\0\Ø%\Ã\0\Ø%¿\0ø%\Ã\0\Ø%\Ã\0\Ø%¿\0ø%\0\Ø%\0\Ø%ü\0\à—\0`—\0\à—ü\0`—\0`—ü\0\à—0L\0`—0L\0`—ğK\0\à—0L\0€]2L\0€]òK\0€_2L\0€]2L\0€]òK\0€_\Â0€]\Â0€_\Â/€]\Â0\0v\É/\0~\É0\0v\É0\0v\É/\0~	\Ã\0v	\Ã\0v	¿\0~	\Ã\0\Ø%\Ã\0ø%¿\0\Ø%\Ã\0\Ø%¿\0ø%\0\Ø%\0\Ø%ü\0ø%\0\Ø%\0`—ü\0\à—\0`—\0`—\0\à—ğK\0`—0L\0`—0L\0`—ğK\0\à—0L\0€]2L\0€]2L\0€_òK\0€]\Â0€]\Â0€]\Â/€_\Â0€]\Â0€]\Â/\0~\É0\0v\É0\0v\É0\0v	¿\0~	\Ã\0v	\Ã\0v	¿\0~	\Ã\0v	\Ã\0\Ø%\Ã\0ø%¿\0\Ø%\0\Ø%\0\Ø%ü\0ø%\0\Ø%\0\Ø%\0\à—ü\0`—\0`—0L\0`—ğK\0\à—0L\0`—0L\0`—0L\0\à—ğK\0`—0L\0€]2L\0€]òK\0€_\Â0€]\Â0€]\Â0€]\Â0€_\Â/€]\Â0€]\Â0\0v\É0\0v	¿\0~	\Ã\0v	\Ã\0v	\Ã\0v	\Ã\0v	¿\0~	\Ã\0v	\Ã\0\Än\Ğ\0\0\0 \êßš\"\ĞÁù¹4˜ªª¹\Ô`ªª½\Ô^ªª¹\Ô`ªª¹\Ô`ªª¹\Ô`ªª¹\Ô^ªª½\Ô`ªª¹\Ô`ªª\æRƒ©ª\æRƒ©ª\æR{©ªöRƒ©ª\æRƒ©ª\æRƒ©ª\æRƒ©ªöR{©ª\æR\r¦ªšK\r¦ªšK\r¦ªšK\í¥ª\ÚK\r¦ªšK\r¦ªšK\r¦ªšK\r¦ªšK\í¥ªj/5˜ªj.5˜ªj.5˜ªj.5˜ªj.5˜ªj.µ—ªj/5˜ªj.5˜ªj.\Õ`ªª¹\Ô`ªª¹\Ô`ªª¹\Ô`ªª¹\Ô^ªª½\Ô`ªª¹\Ô`ªª¹\Ô`ªª¹TWS\Õ\\ªÁTUs©ÁTUs©ÁTU{©½TUs©ÁTUs©ÁTUs©ÁTUs©ÁTUs©SUs©SUÍ¥SU\í¥öRUÍ¥SUÍ¥SUÍ¥SUÍ¥SUÍ¥\ZLUÍ¥\ZLU\í¥\ÚKU5—\ZLU5—\ZLU5—\ZLU5—\ZLU5—\ZLU5—\ZLU5—j0Uµ—j/U5—j0U\Õ\\j0U\Õ\\j0U\Õ\\j0U\Õ\\j0U\Õ\\j0U\Õ\\ªÁT\Õ\\ªÁT\Õ\\ªÁT\Õ\\ªÁTUs©ÁTUs©ÁTUs©ÁTUs©ÁTUs©SU{©SUs©SUs©SUÍ¥öRUÍ¥SUÍ¥SUÍ¥SUÍ¥SUÍ¥\ZLUÍ¥\ZLUÍ¥\ZLUÍ¥\ZLU5—\ZLU5—\ZLU5—\ZLU5—\ZLU5—j0U5—j0U5—j0U5—j0U5—j0U\Õ\\j0U\Õ\\j0U\Õ^j0U\Õ\\ªÁT\Õ\\ª½T\Õ\\ªÁT\Õ\\ªÁT\Õ\\ª\ÅT\Õ\\ªÁTUs©ÁTUk©ÁTUs©ÁTUs©SUs©SUs©SUs©SUs©SUs©SUÍ¥SUÍ¥SUÍ¥\ZLUÍ¥\ZLUÍ¥\ZLUÍ¥\ZLUÍ¥\ZLUÍ¥\ZLUÍ¥\ZLU5—\ZLU5—j1U5—j0U5—j0Uµ–j0U5—j0U5—j0U5—j0U5—j0U\Õ\\ª«¯j.\Õ`ªj.\Õ`ªj.\Õ`ªj.\Õ`ªj.\Õ`ªj.\Õ`ªj.\Õ`ªj.\Õ`ªª¹Tƒ©ª¹T‹©ªµTƒ©ª¹Tƒ©ª¹Tƒ©ª¹Tƒ©ª¹Tƒ©ª¹T‹©ª¹T\r¦ª\ÖR\r¦ª\æR\r¦ª\æR\r¦ª\æR\r¦ª\æR\r¦ª\æR-¦ª\ÖR\r¦ª\æR5˜ª\æR5˜ªšK5˜ªšK5˜ªšKµ˜ªšK5˜ªZK5˜ªšK5˜ªšK5˜ªšK\Õ`ªšK\Õbªj.\Õ`ªj-\Õ`ªj.\Õ`ªj.\Õ`ªj.\Õ`ªj.\Õ`ªj.U‹©j.Uƒ©j-Uƒ©ª¹Tƒ©ª¹Tƒ©ª¹T‹©ªµTƒ©ª¹Tƒ©ª¹T-¦ª¹T\r¦ªµT\r¦ª¹T\r¦ª\æR-¦ª\ÖR\r¦ª\æR\r¦ª\æR\r¦ª\æRµ˜ª\ÖR5˜ª\æR5˜ª\æRµ˜ªúV5˜ªZK5˜ªšK5˜ªšKµ˜ªZK5˜ªšK\Õ`ªšK\Õ`ªšK\ÕbªZK\Õ`ª\ê-\Õ`ªj.\Õbªj.\Õ`ªj-\Õ`ªj.Uƒ©j.U‹©j-Uƒ©j.Uƒ©j.Uƒ©ª¹T‹©ªµTƒ©ª¹T‹©°[\0\0\0\0‚ü­)‰¯\ŞRu˜ª\îRu˜ª\îRõ˜ª\ŞRu˜ª\îRõ˜ª\ŞRu˜ªš™zLUİ¥:LU½¥\ê0Uİ¥\ê1U½¥\ê0Uİ¥\ê1Uİ¥\ê0U½¥\ê0Uİ¥\ê1U½¥\ê0Uu—\ê1Uu—ª\ÃTõ–ª\ÃTu—ª\ÇTõ–ª\ÃTu—ª\ÇTu—ª\ÃTõ–ª\ÃTu—ª\ÇT\Õ[ªS\Õ]ªS\Õ]ªS\Õ[ªS\Õ]ªS\Õ[ªS\Õ]ªS\Õ[ªS\Õ]ª:LUo©zLUo©:LUw©zLUo©:LUw©zLUo©:LUw©zLUo©\ê1Uw©\ê0U½¥\ê1U½¥\ê0Uİ¥\ê1U½¥\ê0Uİ¥\ê1U½¥\ê1Uİ¥ª\ÃT½¥ª\ÇT½¥ª\ÃTu—ª\ÇTõ–ª\ÃTu—ª\ÇTõ–ª\ÃTu—ª\ÇTõ–ª\ÇTu—ªSõ–ªSõ–ªS\Õ]ªS\Õ[ªS\Õ[ªS\Õ]ªS\Õ[ªS\Õ[ªzL\Õ[ªzL\Õ]ª:L\Õ[ªzLUo©zLUo©:LUw©zLUo©zLUo©\ê1Uo©\ê0Uw©\ê1Uo©\ê1Uo©\ê1U½¥\ê0Uİ¥\ê1U½¥\ê1U½¥ª\ÇTİ¥ª\ÃT½¥ª\ÇT½¥ª\ÇT½¥ª\ÃTİ¥ª\ÇTõ–ª\ÇTõ–ª\ÇTõ–ªSõ–ªSõ–ªSõ–ªSõ–ªSõ–ªSõ–ªS\Õ[ªS\Õ]ªzL\Õ[ª:L\Õ[ªzL\Õ[ªzL\Õ[ªzL\Õ[ªzL\Õ[ªzL\Õ[ªzL\Õ[ª\ê1Uo©\ê1Uo©\ê1Uo©\ê1Uo©\ê1Uo©\ê1Uo©\ê1Uo©\ê1Uo©ª\ÇTo©ª\ÇT½¥ª\ÇT½¥ª\ÇT½¥ª\ËT¥ª\ÇT½¥ª\ÇT½¥ª\ÇT½¥ª.S½¥ªS¥ªSõ–ªSõ–ªSõ–ª.Su–ªSõ–ªSõ–ªzLõ–ªzLõ–ªºLu–ªzL\Õ[ªzL\Õ[ªzL\Õ[ªºL\Õ[ªzL\ÕYª\ê1\Õ[ª\ê2\ÕYª\ê1\Õ[ª\ê2\ÕYª\ê1\Õ[ª\ê2Ug©\ê1Uo©\ê2Ug©ª\ËTo©ª\ÇTg©ª\ËTo©ª\ÇTg©ª\ËTg©ª\ÇTo©ª\ËT¥ª\ÇT½¥ª.S¥ªS½¥ª.S¥ªS½¥ª.S¥ª.S¥ª.S¥ª.S¥ªºLu–ªºLõ–ªºLu–ªºLu–ªºLu–ªºLu–ªzLu–ªºLu–ª\ê2u–ª\ê2\ÕYª\ê2\ÕYª\ê2\ÕYª\ê2\ÕYª\ê2\ÕYª\ê2\ÕYª\ê2\ÕYªª\Ï\ÔWªª\Ë\ÔYªª\Ï\ÔWªª\ËTg©ª\ÏT_©ª\ËTg©ª\ÏT_©ª.Sg©ª>S_©ª.Sg©ª>S_©ª>Sg©ª.S}¥ª>S¥ª.S}¥ªúL}¥ªúL}¥ª:M}¥ªúL]¥ªúL}¥ª:M]¥ªúL}¥ªúLõ•ª\ê4u•ª\ê3õ•ª\ê3õ•ª\ê4u•ª\ê3õ•ª\ê4u•ª\ê4u•ªª\×ô”ªª\Óô”ªª\×t•ªª\×\ÔSªª\Ó\ÔUªª\×\ÔSªª\Ó\ÔUªª^\ÓSªª^\ÓSªª~\ÓQªª~\ÓOªªn\ÓOªª~\ÓOªª~\ÓOªªúM?©ªúM?©\Òn\Ó\0\0\0 ó\ï\Z\ĞJ\Ø5\0\ëd’\0\0ód‘\0\0ód‘\0\0ód‘\0\0ºó$=\0ğúUR\0\0\ì\n\Âj@9ô}\0\0\0\0IEND®B`‚');
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
INSERT INTO `users` VALUES ('admin','12345678','c@2102','C Connect Logi'),('admin','12345678','seawave@2323','Seawave Forwarding Logistics');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the workflow rows ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
INSERT INTO `workflow` VALUES (9,'Air Import','Raxaul','Seawave Forwarding Logistics','seawave@2323','Apexsea Logistics Pvt Ltd'),(10,'Sea Import','Jogbani','Seawave Forwarding Logistics','seawave@2323','seaconnect'),(11,'Sea Import','Jogbani','Seawave Forwarding Logistics','seawave@2323',NULL),(12,'Sea Import','Raxaul','Seawave Forwarding Logistics','seawave@2323',NULL);
/*!40000 ALTER TABLE `workflow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'crm_db'
--

--
-- Dumping routines for database 'crm_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-26 21:28:31
