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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the organizations before approval';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvalorg`
--

LOCK TABLES `approvalorg` WRITE;
/*!40000 ALTER TABLE `approvalorg` DISABLE KEYS */;
INSERT INTO `approvalorg` VALUES ('gazai','sdgsdg','sdgdfsd','gsdgsd','534634','4676867874','hh@gmail.com','dg435rdf','h34','hfgt43','43','fsdg','seawave@2323','Seawave Forwarding Logistics','Gazai Medicals','ghana','hemang@executive',3,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-05-19'),('apexsea','India','Maharashtra','Navi Mumbai','400703','09004263507','shreyashpingle752@gmail.com','dsg345','dfy46','6trh','456','Omkar Apartment B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Apexsea Logistics Pvt Ltd','sfsdf','hemang@executive',4,'OrgButton','[{\"status\": \"Reject\", \"username\": \"rishi@manager\"}]','2024-05-19'),('uneed','gsdgsd','sdgdsg','dsgsdg','545445','47787815156','ginger@gmail.com','ert456','dfh46','gft345','34','gdsgsdg','seawave@2323','Seawave Forwarding Logistics','uneed services','ginger','hemang@executive',5,'OrgButton','[{\"status\": \"Reject\", \"username\": \"hemang@executive\"}]','2024-05-19'),('hari','dgdg','gdsg','dg','345432','9967644458','yungcode2003@gmail.com','ter435','5434','gdt435','345','dsg','seawave@2323','Seawave Forwarding Logistics','Hari Hareshwar','hareshwar','rishi@manager',7,'OrgButton','[{\"status\": \"Approve\", \"username\": \"rishi@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-05-22'),('damru','India','Maharashtra','Navi Mumbai','400703','09004263507','shreypingle23@gmail.com','sdf3','dfg435','435gf','87','Omkar Apartment  B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Damru','nanded','aayush@manager',8,'OrgButton','[{\"status\": \"Approve\", \"username\": \"rishi@manager\"}, {\"status\": \"Approve\", \"username\": \"aayush@manager\"}]','2024-05-22'),('gta','dgdg','Florida','Mumbai','345432','9967644458','yungcode2003@gmail.com','dsf324','34fds','534f','342','dsg','seawave@2323','Seawave Forwarding Logistics','GTA','Miami','rishi@manager',9,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aayush@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-05-22'),('notif','India','Maharashtra','Navi Mumbai','400703','09004263507','shreypingle23@gmail.com','34','89','1','34','Omkar Apartment  B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Notif Test','motif','aayush@manager',10,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aayush@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-05-22'),('final','dsg','Maharashtra','Mumbai','543534','3453452342','yungcode2003@gmail.com','dsfds','dsgsdf','hgfj54','66','23-34-2 ghasoli ulwe mum','seawave@2323','Seawave Forwarding Logistics','Final Render Test','DJ','hemang@executive',11,'OrgButton','[{\"status\": \"Approve\", \"username\": \"rishi@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-05-22'),('notification','India','Maharashtra','Navi Mumbai','400703','09004263507','shreyashpingle752@gmail.com','34','32534','342','34','Omkar Apartment B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Notification Test Final','Allorg','aayush@manager',12,'OrgButton','[{\"status\": \"Approve\", \"username\": \"rishi@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-05-22'),('xyz','dgdg','Maharashtra','Mumbai','345432','9967644458','yungcode2003@gmail.com','','','','345','dsg','seawave@2323','Seawave Forwarding Logistics','XYZ XYZ','abc','rishi@manager',13,'OrgButton','[{\"status\": \"Approve\", \"username\": \"rishi@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-05-22'),('zaza','dgdg','Maharashtra','Mumbai','345432','9967644458','yungcode2003@gmail.com','ter435','5434','gdt435','345','dsg','seawave@2323','Seawave Forwarding Logistics','zaza test','zaza','rishi@manager',14,'OrgButton','[{\"status\": \"Approve\", \"username\": \"aayush@manager\"}, {\"status\": \"Approve\", \"username\": \"hemang@executive\"}]','2024-05-22'),('hazardous','dsg','dsfsd','Mumbai','543534','9004263507','shreypingle23@gmail.com','dg343','dsgsdf','fdsdf','66','23-34-2 ghasoli ulwe mum','seawave@2323','Seawave Forwarding Logistics','Hazardous notification','haland','hemang@executive',15,'OrgButton','[{\"status\": \"Approve\", \"username\": \"hemang@executive\"}, {\"status\": \"Approve\", \"username\": \"rishi@manager\"}]','2024-05-22');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the name of the approver list of a particular organization';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approverlist`
--

LOCK TABLES `approverlist` WRITE;
/*!40000 ALTER TABLE `approverlist` DISABLE KEYS */;
INSERT INTO `approverlist` VALUES ('Seawave Forwarding Logistics','seawave@2323',4,'Organizations','Raxaul','Raxaul-2323','[\"OrgButton\"]',2),('Seawave Forwarding Logistics','seawave@2323',5,'Jobs','Raxaul','Raxaul-2323','[\"JobsButton\"]',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store all the names of users for a particular approval list';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvername`
--

LOCK TABLES `approvername` WRITE;
/*!40000 ALTER TABLE `approvername` DISABLE KEYS */;
INSERT INTO `approvername` VALUES (4,'Seawave Forwarding Logistics','seawave@2323','Organizations','rishi@manager','Raxaul','Raxaul-2323','[\"OrgButton\"]',4),(5,'Seawave Forwarding Logistics','seawave@2323','Organizations','hemang@executive','Raxaul','Raxaul-2323','[\"OrgButton\"]',4),(6,'Seawave Forwarding Logistics','seawave@2323','Organizations','aayush@manager','Raxaul','Raxaul-2323','[\"OrgButton\"]',4);
/*!40000 ALTER TABLE `approvername` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is the branches table that are linked to organizations';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'vashi','seaconnect','seawave@2323','1'),(2,'vashi','forte services','seawave@2323','1'),(3,'vashi','seaconnect','seawave@2323','2'),(4,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(5,'Ahemdabad','Seatech','seawave@2323','4'),(6,'vashi','seaconnect','seawave@2323','1'),(7,'telangana','erte retgdf','seawave@2323','2'),(8,'telangana','erte retgdf','seawave@2323','1'),(9,'Parel','seaconnect','seawave@2323','2'),(10,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(11,'vashi','seaconnect','seawave@2323','1'),(12,'Patna','uneed services','seawave@2323','2'),(13,'vashi','seaconnect','seawave@2323','1'),(14,'vashi','uneed services','seawave@2323','1'),(15,'Parel','accenture services','seawave@2323','2'),(16,'Jaipur','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(17,'telangana','seaconnect','seawave@2323','1'),(18,'Parel','seaconnect','seawave@2323','1'),(19,'vashi','seaconnect','seawave@2323','1'),(20,'Patna','seaconnect','seawave@2323',NULL),(21,'Jaipur','uneed services','seawave@2323','1'),(22,'telangana','Apexsea Logistics Pvt Ltd','seawave@2323','1'),(23,'Jaipur','forte services','seawave@2323','1'),(24,'telangana','seaconnect','seawave@2323','1'),(25,'Raipur','seaconnect','seawave@2323','1'),(26,'Null','seaconnect','seawave@2323','1'),(27,'vashi','accenture services','seawave@2323','2'),(28,'Uganda','Apexsea Logistics Pvt Ltd','seawave@2323','3'),(29,'Jaipur','forte services','seawave@2323','4'),(30,'goat','BHaijan','seawave@2323','5'),(31,'Parel','tttt','seawave@2323','6'),(32,'bhais','tttt','seawave@2323','7'),(33,'buffalo','ggggggggg','seawave@2323','8'),(34,'injection','iiiii','seawave@2323','9'),(35,'done','done','seawave@2323','10'),(36,'jhaatu','dummy','seawave@2323','11'),(37,'kerala','test','seawave@2323','12'),(38,'Himalaya','uneed services','seawave@2323','13'),(39,'thth','ff','seawave@2323','14'),(40,'final','Final Test','seawave@2323','15'),(41,'finale','Final','seawave@2323','16'),(42,'DJ','Final Test','seawave@2323','17'),(43,'Ghatkopar','Final Test','seawave@2323','18'),(44,'render','Final Render Test','seawave@2323','19'),(45,'dsf','final G','seawave@2323','20'),(46,'finale','final G','seawave@2323','21'),(47,'dy','Final Render Test','seawave@2323','22'),(48,'Alephata','JamJam','seawave@2323','23'),(49,'test branch','Test Organization','seawave@2323','24'),(50,'Jamacia','usain bolt','seawave@2323','25'),(51,'approver','ApproverLog Test Dummy','seawave@2323','26'),(52,'kurla','vector','seawave@2323','27'),(53,'vashi','seaconnect','seawave@2323','1'),(54,'telangana','erte retgdf','seawave@2323','1'),(55,'Belapur','seaconnect','seawave@2323','2'),(56,'ghana','Gazai Medicals','seawave@2323','3'),(57,'sfsdf','Apexsea Logistics Pvt Ltd','seawave@2323','4'),(58,'ginger','uneed services','seawave@2323','5'),(59,'DJ','Final Test','seawave@2323','6'),(60,'hareshwar','Hari Hareshwar','seawave@2323','7'),(61,'nanded','Damru','seawave@2323','8'),(62,'Miami','GTA','seawave@2323','9'),(63,'motif','Notif Test','seawave@2323','10'),(64,'DJ','Final Render Test','seawave@2323','11'),(65,'Allorg','Notification Test Final','seawave@2323','12'),(66,'abc','XYZ XYZ','seawave@2323','13'),(67,'zaza','zaza test','seawave@2323','14'),(68,'haland','Hazardous notification','seawave@2323','15');
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
INSERT INTO `contacts` VALUES ('Shreyash Pingle','IT','IT','8655997288','omaayush@mail.com','Ahemdabad','Seawave Forwarding Logistics','seawave@2323','Seatech',4),('Shreyash Pingle','manager','company','9358742332','shreypingle23@gmail.com','test branch','Seawave Forwarding Logistics','seawave@2323','Test Organization',24);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES ('hemang@executive','12345','seawave@2323','Seawave Forwarding Logistics',1,'Hemang Ranjan','executive'),('rishi@manager','345345','seawave@2323','Seawave Forwarding Logistics',2,'Rishi Mishra','manager'),('aayush@manager','12345678','seawave@2323','Seawave Forwarding Logistics',3,'Aayush Mishra','manager'),('shreyash@executive','12345','seawave@2323','Seawave Forwarding Logistics',4,'Shreyash Pingle','executive'),('gautam @Sales','12345','seawave@2323','Seawave Forwarding Logistics',5,'Gautam Gambhir','Sales');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is to store the general component data ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impgeneral`
--

LOCK TABLES `impgeneral` WRITE;
/*!40000 ALTER TABLE `impgeneral` DISABLE KEYS */;
INSERT INTO `impgeneral` VALUES (1,'Apexsea Logistics Pvt Ltd','Omkar Apartment B-10-15 Sector-15 1:1','89','1','dddgfgfdgf','fddgf','Seawave Forwarding Logistics','seawave@2323','admin','A/I/1/24-25','Vashi','Raxaul','Raxaul-2323');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this is where all creation of job in import will be stored';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impjobcreation`
--

LOCK TABLES `impjobcreation` WRITE;
/*!40000 ALTER TABLE `impjobcreation` DISABLE KEYS */;
INSERT INTO `impjobcreation` VALUES ('A/I/1/24-25','2024-04-25 20:01:00','2024-04-20 20:01:00','Air','Mumbai Sea','Yes','Loaded',3,'Yes','Home','LCL','dummy','dfhdfg','HBL/HAWB','dgdfhgd','Seawave Forwarding Logistics','seawave@2323','admin',1,6,'Surrender','rr45','OneTime',1,'Raxaul','Raxaul-2323');
/*!40000 ALTER TABLE `impjobcreation` ENABLE KEYS */;
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
  `createdon` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store notifications and its data';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('Seawave Forwarding Logistics','seawave@2323','fsdg','Gazai Medicals','sdgsdg','sdgdfsd','gsdgsd','gazai','534634','4676867874','hh@gmail.com','dg435rdf','h34','hfgt43','ghana','43','hemang@executive',3,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-05-19 18\", \"employeename\": \"rishi@manager\"}, {\"time\": \"2024-05-19 17\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',3,'2024-05-19'),('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment B-10-15 Sector-15 1:1','Apexsea Logistics Pvt Ltd','India','Maharashtra','Navi Mumbai','apexsea','400703','09004263507','shreyashpingle752@gmail.com','dsg345','dfy46','6trh','sfsdf','456','hemang@executive',4,'OrgButton','[{\"read\": 1, \"approved\": -1, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 0, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-05-19 18\", \"employeename\": \"rishi@manager\"}, {\"time\": \"2024-05-19 17\", \"employeename\": \"hemang@executive\"}, {\"time\": \"2024-05-19 18\", \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',4,'2024-05-19'),('Seawave Forwarding Logistics','seawave@2323','gdsgsdg','uneed services','gsdgsd','sdgdsg','dsgsdg','uneed','545445','47787815156','ginger@gmail.com','ert456','dfh46','gft345','ginger','34','hemang@executive',5,'OrgButton','[{\"read\": 1, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": -1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','[{\"time\": \"2024-05-19 18\", \"employeename\": \"rishi@manager\"}, {\"time\": \"2024-05-19 18\", \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',5,'2024-05-19'),('Seawave Forwarding Logistics','seawave@2323','dsg','Hari Hareshwar','dgdg','gdsg','dg','hari','345432','9967644458','yungcode2003@gmail.com','ter435','5434','gdt435','hareshwar','345','rishi@manager',7,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',7,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment  B-10-15 Sector-15 1:1','Damru','India','Maharashtra','Navi Mumbai','damru','400703','09004263507','shreypingle23@gmail.com','sdf3','dfg435','435gf','nanded','87','aayush@manager',8,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"rishi@manager\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',8,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','dsg','GTA','dgdg','Florida','Mumbai','gta','345432','9967644458','yungcode2003@gmail.com','dsf324','34fds','534f','Miami','342','rishi@manager',9,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',9,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment  B-10-15 Sector-15 1:1','Notif Test','India','Maharashtra','Navi Mumbai','notif','400703','09004263507','shreypingle23@gmail.com','34','89','1','motif','34','aayush@manager',10,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',10,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','23-34-2 ghasoli ulwe mum','Final Render Test','dsg','Maharashtra','Mumbai','final','543534','3453452342','yungcode2003@gmail.com','dsfds','dsgsdf','hgfj54','DJ','66','hemang@executive',11,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',11,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','Omkar Apartment B-10-15 Sector-15 1:1','Notification Test Final','India','Maharashtra','Navi Mumbai','notification','400703','09004263507','shreyashpingle752@gmail.com','34','32534','342','Allorg','34','aayush@manager',12,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',12,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','dsg','XYZ XYZ','dgdg','Maharashtra','Mumbai','xyz','345432','9967644458','yungcode2003@gmail.com','','','','abc','345','rishi@manager',13,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',13,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','dsg','zaza test','dgdg','Maharashtra','Mumbai','zaza','345432','9967644458','yungcode2003@gmail.com','ter435','5434','gdt435','zaza','345','rishi@manager',14,'OrgButton','[{\"read\": 0, \"approved\": 0, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',14,'2024-05-22'),('Seawave Forwarding Logistics','seawave@2323','23-34-2 ghasoli ulwe mum','Hazardous notification','dsg','dsfsd','Mumbai','hazardous','543534','9004263507','shreypingle23@gmail.com','dg343','dsgsdf','fdsdf','haland','66','hemang@executive',15,'OrgButton','[{\"read\": 1, \"approved\": 1, \"employeename\": \"rishi@manager\"}, {\"read\": 1, \"approved\": 1, \"employeename\": \"hemang@executive\"}, {\"read\": 0, \"approved\": 0, \"employeename\": \"aayush@manager\"}]','[{\"time\": null, \"employeename\": \"rishi@manager\"}, {\"time\": null, \"employeename\": \"hemang@executive\"}, {\"time\": null, \"employeename\": \"aayush@manager\"}]','[{\"employeename\": \"rishi@manager\"}, {\"employeename\": \"hemang@executive\"}, {\"employeename\": \"aayush@manager\"}]',15,'2024-05-22');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store client data and employee that created the client ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('gazai','sdgsdg','sdgdfsd','gsdgsd','534634','4676867874','hh@gmail.com','dg435rdf','h34','hfgt43','43','fsdg','seawave@2323','Seawave Forwarding Logistics','Gazai Medicals',3,'ghana','hemang@executive','OrgButton','2024-05-19'),('hari','dgdg','gdsg','dg','345432','9967644458','yungcode2003@gmail.com','ter435','5434','gdt435','345','dsg','seawave@2323','Seawave Forwarding Logistics','Hari Hareshwar',4,'hareshwar','rishi@manager','OrgButton','2024-05-22'),('damru','India','Maharashtra','Navi Mumbai','400703','09004263507','shreypingle23@gmail.com','sdf3','dfg435','435gf','87','Omkar Apartment  B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Damru',5,'nanded','aayush@manager','OrgButton','2024-05-22'),('gta','dgdg','Florida','Mumbai','345432','9967644458','yungcode2003@gmail.com','dsf324','34fds','534f','342','dsg','seawave@2323','Seawave Forwarding Logistics','GTA',6,'Miami','rishi@manager','OrgButton','2024-05-22'),('notif','India','Maharashtra','Navi Mumbai','400703','09004263507','shreypingle23@gmail.com','34','89','1','34','Omkar Apartment  B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Notif Test',7,'motif','aayush@manager','OrgButton','2024-05-22'),('final','dsg','Maharashtra','Mumbai','543534','3453452342','yungcode2003@gmail.com','dsfds','dsgsdf','hgfj54','66','23-34-2 ghasoli ulwe mum','seawave@2323','Seawave Forwarding Logistics','Final Render Test',8,'DJ','hemang@executive','OrgButton','2024-05-22'),('notification','India','Maharashtra','Navi Mumbai','400703','09004263507','shreyashpingle752@gmail.com','34','32534','342','34','Omkar Apartment B-10-15 Sector-15 1:1','seawave@2323','Seawave Forwarding Logistics','Notification Test Final',9,'Allorg','aayush@manager','OrgButton','2024-05-22'),('xyz','dgdg','Maharashtra','Mumbai','345432','9967644458','yungcode2003@gmail.com','','','','345','dsg','seawave@2323','Seawave Forwarding Logistics','XYZ XYZ',10,'abc','rishi@manager','OrgButton','2024-05-22'),('zaza','dgdg','Maharashtra','Mumbai','345432','9967644458','yungcode2003@gmail.com','ter435','5434','gdt435','345','dsg','seawave@2323','Seawave Forwarding Logistics','zaza test',11,'zaza','rishi@manager','OrgButton','2024-05-22'),('hazardous','dsg','dsfsd','Mumbai','543534','9004263507','shreypingle23@gmail.com','dg343','dsgsdf','fdsdf','66','23-34-2 ghasoli ulwe mum','seawave@2323','Seawave Forwarding Logistics','Hazardous notification',12,'haland','hemang@executive','OrgButton','2024-05-22');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table consists of all the detailed data of the particular workflow as per line of business';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setworkflow`
--

LOCK TABLES `setworkflow` WRITE;
/*!40000 ALTER TABLE `setworkflow` DISABLE KEYS */;
INSERT INTO `setworkflow` VALUES (1,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','Job Creation Date','Before','2','12','45',0,'Scrutiny Document','[{\"username\": \"aayush@manager\"}, {\"username\": \"hemang@executive\"}]'),(2,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','','','','','',1,'ETA','[{\"username\": \"hemang@executive\"}]'),(3,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','Scrutiny Document','After','2','1','15',0,'ESanchit','[{\"username\": \"aayush@manager\"}, {\"username\": \"rishi@manager\"}]'),(4,'Air Import','Raxaul','Apexsea Logistics Pvt Ltd','Seawave Forwarding Logistics','seawave@2323','ESanchit','After','5','12','30',0,'Duty Call','[{\"username\": \"hemang@executive\"}]');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingimport`
--

LOCK TABLES `trackingimport` WRITE;
/*!40000 ALTER TABLE `trackingimport` DISABLE KEYS */;
/*!40000 ALTER TABLE `trackingimport` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='this table is to store the workflow rows ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workflow`
--

LOCK TABLES `workflow` WRITE;
/*!40000 ALTER TABLE `workflow` DISABLE KEYS */;
INSERT INTO `workflow` VALUES (9,'Air Import','Raxaul','Seawave Forwarding Logistics','seawave@2323','Apexsea Logistics Pvt Ltd'),(10,'Sea Import','Jogbani','Seawave Forwarding Logistics','seawave@2323','seaconnect'),(11,'Sea Import','Jogbani','Seawave Forwarding Logistics','seawave@2323',NULL);
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

-- Dump completed on 2024-05-22 20:08:06
