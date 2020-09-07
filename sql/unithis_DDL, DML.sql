-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: unithis.chyx4vje9iws.ap-northeast-2.rds.amazonaws.com    Database: unithis
-- ------------------------------------------------------
-- Server version	8.0.17

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `chatroom`
--

DROP TABLE IF EXISTS `chatroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatroom` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user1_id` bigint(20) NOT NULL,
  `user2_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user1_id_idx` (`user1_id`),
  KEY `user2_id_idx` (`user2_id`),
  KEY `user1_id_idx1` (`user1_id`,`user2_id`),
  CONSTRAINT `user1_id` FOREIGN KEY (`user1_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user2_id` FOREIGN KEY (`user2_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatroom`
--

LOCK TABLES `chatroom` WRITE;
/*!40000 ALTER TABLE `chatroom` DISABLE KEYS */;
INSERT INTO `chatroom` VALUES (23,34,33),(28,35,42),(29,44,45);
/*!40000 ALTER TABLE `chatroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `item_id` bigint(20) NOT NULL,
  `filename` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_id_idx` (`item_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (1,31,'200907040530_1.jpg'),(2,31,'200907040530_2.jpg'),(3,31,'200907040530_3.jpg'),(4,31,'200907040530_4.jpg'),(5,32,'200907040842_1.jpg'),(6,32,'200907040842_2.jpg'),(7,33,'200907041049_1.jpg'),(8,33,'200907041049_2.jpg'),(9,34,'200907041216_1.jpg'),(10,35,'200907041530_1.jpg'),(11,35,'200907041530_2.jpg'),(12,36,'200907041757_1.jpg'),(13,36,'200907041757_2.jpg'),(14,36,'200907041757_3.jpg'),(15,37,'200907041954_1.jpg'),(16,38,'200907050115_1.jpg'),(17,38,'200907050115_2.jpg'),(18,39,'200907050922_1.jpg'),(19,40,'200907051316_1.jpg'),(20,41,'200907051618_1.jpg'),(21,42,'200907051750_1.jpg'),(22,43,'200907052141_1.jpg'),(23,44,'200907052328_1.jpg'),(24,44,'200907052328_2.jpg'),(25,44,'200907052328_3.jpg'),(26,45,'200907054949_1.jpeg'),(27,45,'200907054949_2.jpeg'),(28,46,'200907055158_1.jpeg'),(29,46,'200907055158_2.jpeg'),(30,47,'200907055453_1.jpg'),(31,47,'200907055453_2.jpg'),(32,47,'200907055453_3.jpg'),(33,47,'200907055453_4.jpg'),(34,48,'200907055847_1.jpg'),(35,48,'200907055847_2.jpg'),(36,48,'200907055847_3.jpg'),(37,48,'200907055847_4.jpg'),(38,49,'200907060257_1.jpeg'),(39,49,'200907060257_2.jpeg'),(40,49,'200907060257_3.jpeg'),(41,50,'200907060830_1.jpeg'),(42,50,'200907060830_2.jpeg'),(43,51,'200907061423_1.jpg'),(44,51,'200907061423_2.jpg'),(45,52,'200907061635_1.jpeg'),(46,52,'200907061635_2.jpeg'),(47,52,'200907061635_3.jpeg'),(48,52,'200907061635_4.jpeg'),(49,52,'200907061635_5.jpeg'),(50,53,'200907062242_1.jpg'),(51,53,'200907062242_2.jpg'),(52,53,'200907062242_3.jpg'),(53,54,'200907062948_1.jpg'),(54,55,'200907063038_1.jpg'),(55,56,'200907063310_1.jpg'),(56,56,'200907063310_2.jpg'),(57,57,'200907063531_1.jpeg'),(58,57,'200907063531_2.jpeg'),(59,57,'200907063531_3.jpeg'),(60,58,'200907063718_1.jpeg'),(61,58,'200907063718_2.jpeg'),(62,59,'200907063926_1.jpeg'),(63,59,'200907063926_2.jpeg'),(64,59,'200907063926_3.jpeg'),(69,62,'200907075036_1.jpg'),(70,62,'200907075036_2.png');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contents` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `need` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '대기중',
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (31,33,'고양이 낚시대','저희 고양이가 이제 성묘가 되서 장난감에 흥미를 못느끼더라구요 ㅠㅠㅎ\n필요하신분 고양이 간식과 교환하세요~','반려동물용품','고양이 간식','대전광역시 대덕구 대화동','대기중','2020-09-07 04:05:30'),(32,33,'고양이 옷','저희 고양이가 옷만입으면 고장나서 교환합니다.. 사이즈는 M 이고 상세 치수는 챗주세요 ~~^^!','반려동물용품','고양이 간식','대전광역시 대덕구 대화동','대기중','2020-09-07 04:08:42'),(33,33,'재사용 돌돌이','재사용 가능한 돌돌이에요 ~~ 핸디형으로 두번째사진에 있는 거 있어요\n이것만 하면 저희 고양이가 덤벼서 교환 내놓습니다 ㅠ','기타 물건','우유 1000L, 기타 협상','대전광역시 대덕구 대화동','대기중','2020-09-07 04:10:49'),(34,33,'수제 딸기쨈','집에서 딸기쩀 만든거에요~~ 생각보다 너무 많이 만들어서 나눔해요 ~~~','기타 물건','식빵','대전광역시 대덕구 대화동','대기중','2020-09-07 04:12:16'),(35,34,'크래프트 무지노트','노트 10개 묶음인줄 모르고 4개를 샀더니;;; 40권이 되었어요;; 전 4권만 있으면 되거든요','기타 물건','볼펜','대전광역시 유성구 덕명동','대기중','2020-09-07 04:15:30'),(36,34,'조절가능 독서대','높이조절가능하고 각도조절 가능한 독서대에요','기타 물건','색연필','대전광역시 유성구 덕명동','대기중','2020-09-07 04:17:57'),(37,34,'아보카도(후숙완료)','아보카도를 어디서 받았는데 제입맛에는 사실 아보카도가 안맞네요 ㅠㅠ 다른 과일종류로 교환받아요','생활/가공식품','다른 종류의 과일','대전광역시 유성구 덕명동','대기중','2020-09-07 04:19:54'),(38,37,'에어팟 2세대 무선','이번에 갤럭시 노트20으로 갈아타게 되어서 에어팟 2세대를 버즈 라이브로 바꾸고 싶습니다. \n언제든지 채팅주세요~','디지털/가전','갤럭시 버즈 라이브','대전광역시 서구 괴정동','거래중','2020-09-07 05:01:15'),(39,37,'기계식 게이밍 키보드','게임 잘되는 키보드입니다.\n제가 이 키보드로 롤 다이아 갔어요. 반응속도도 빨라져서 추천드립니다\n집에 김치가 없어서 김치와 교환하실 분 찾아요','디지털/가전','김치','대전광역시 서구 괴정동','대기중','2020-09-07 05:09:22'),(40,37,'닌텐도 스위치 동물의 숲 에디션','동물의 숲 에디션 교환하실 분 찾습니다. \n오래해서 질려서 플레이스테이션4 Pro와 교환하고 싶습니다.','게임/취미','플레이스테이션4 Pro','대전광역시 서구 괴정동','거래완료','2020-09-07 05:13:16'),(41,38,'사과','사과와 쌀이랑 교환해요\n상태 A급이고 달달하고 맛있어요\n충주에서 열심히 재배하고 있습니다','생활/가공식품','쌀','대전광역시 서구 가수원동','대기중','2020-09-07 05:16:18'),(42,38,'포도','당도 높은 포도입니다\n우리 아들내미가 컴퓨터 키보드를 가지고 싶다고 해서요^^\n좋은 키보드 있으면 교환해요','생활/가공식품','키보드','대전광역시 서구 가수원동','대기중','2020-09-07 05:17:50'),(43,38,'팔토시','농사지을때 팔 하나도 안타는 팔토시 내놓습니다. 집에서 안쓰는 모자 있으면 저랑 교환해요~~^^','남성패션/잡화','모자','대전광역시 서구 가수원동','거래중','2020-09-07 05:21:41'),(44,38,'감자','알이 튼실한 감자입니다. 선크림 있으면 교환바라요~~~ 이왕이면 유분기 적은 것이면 좋겠네유 ^^','생활/가공식품','선크림','대전광역시 서구 가수원동','대기중','2020-09-07 05:23:28'),(45,35,'철재책상 철재4단책장 철재책장책상 컴퓨터책상','상태최고,120*60 분리가능.\n모서리방지는 책상전용으로 따로 산건데\n같이드릴게요 (안전플라스틱으로 되있어 뺐다꼈다 가능해요)','가구/인테리어','의자','대전광역시 중구 선화동','대기중','2020-09-07 05:49:49'),(46,35,'코렐 올리브 32p','코렐 올리브 32p 팔아요.\n(밥6,국6, 접시류20)\n\n구매후 몆번 사용안했고 상태 좋아요.','생활/가공식품','책상','대전광역시 중구 선화동','거래중','2020-09-07 05:51:58'),(47,35,'아람 자연, 자연관찰 전집','아람 자연이랑 자연관찰 전집입니다.\n\n아이 첫 자연관찰책으로 들였는데 이 전집으로 자연관찰에 흥미 많이 들였어요\n\n책도 전권 다 있고 빛바램 없고 식물파트도 안 읽어서 전시급이고\n\n브로마이드 동요 씨디는 미개봉 새상품 입니다.\n\n다만 상어, 공룡 등 특정 책들 심하게 좋아해서 테이핑 있고 사용감 있습니다.','유아동/유아도서','장난감','대전광역시 중구 선화동','대기중','2020-09-07 05:55:33'),(48,35,'쿠첸 6인용 전기압력밥솥','1년도 안썼어요^^\n박스,설명서 있습니다.','생활/가공식품','전자레인지','대전광역시 중구 선화동','거래중','2020-09-07 05:58:47'),(49,35,'캠핑퍼스트 롱릴렉스체어','두 의자 모두 스킨상태는 최상입니다.\n캡부분이 사용감 조금 있습니다.\n캠핑용품과 교환원합니다.\n히터나 침낭이면 선호합니다.','가구/인테리어','캠핑용품','대전광역시 중구 선화동','대기중','2020-09-07 06:02:57'),(50,39,'3단선반','직접 가지러 오셔야해요!!!\n하자없습니다~! 제가 조립해놓은거에요.\n사용할 곳이 마땅히 없어서\n책상이나 의자로 교환원합니다.','가구/인테리어','책상 또는 의자','대전광역시 중구 은행동','거래중','2020-09-07 06:08:45'),(51,39,'방탄소년단 갤럭시 버즈 포토카드','사진에 있는 멤버 외의 다른 멤버의 포토카드와 교환 원합니다.','','방탄소년단 갤럭시 버즈 포토카드','대전광역시 중구 은행동','대기중','2020-09-07 06:14:23'),(52,39,'인형 나눔합니다.','하나둘 모으다보니 집에 너무 많아져서 정리하려고합니다~\n새거나 마찬가지라 버리기는 아까워서 무료나눔하려고하는데 필요하신분 있으시면 연락주세요!','유아동/유아도서','무료 나눔','대전광역시 중구 은행동','거래완료','2020-09-07 06:16:35'),(53,39,'1인용 그레이 쇼파','안 쓰는 방에 들여놓고 자리만 차지해서 내놓아요\n물론 천 늘 깔아두었었구요,\n자주는 아니지만 서재에서 가끔 사용했어요\n소파 사진상 왼쪽 아랫부분이 살짝 튿어져있어요\n그냥 보시기엔 둘 다 아주 깔끔 깨끗합니다.\n패브릭이지만 방수패브릭이라\n(뭐 흘린 적 없고 반려동물 키우지 않아요)\n흡수 안 되고 깔끔하게 사용하실 수 있어요!\n\n일반 승용차 말고 suv 뒷자석\n의자 싹 접으시면 한 개 정도 들어갈 것 같아요.\n\n어디에 놓아도 디자인 해치지 않고\n모던하고 예뻐요.\n브랜드 택은 가위로 잘라둔 상태입니다.','가구/인테리어','제습기, 가습기, 전자레인지','대전광역시 중구 은행동','거래중','2020-09-07 06:22:42'),(54,42,'미니바 식물 화초, 화분','식물을 키울수 없게되어 나눔하게 되었습니다.\n미니바 식물을 좋아하시는분이 가져가셨으면 좋겠습니다.','게임/취미','무료나눔','대전광역시 중구 중촌동','거래완료','2020-09-07 06:29:48'),(55,40,'WHY 시리즈 만화책','전집교환받아여 ! 소다말고 다른것도 가능가능 네고 가능 ~ 챗주세여','도서/티켓/음반','베이킹소다','대전광역시 서구 만년동','대기중','2020-09-07 06:30:38'),(56,42,'강아지 집 / 강아지 쿠션 / 강아지 텐트 / 애완동물 (집+쿠션 포함)','저희 집 아기가 포메인데 포메답지 않게 L를 입는 6.7kg입니다..\n작은 사이즈 집으로 구매했는데 실수였습니다 ㅠ^ㅠ\n5kg이하인 강아지들한테 딱 좋을 듯 해요...\n새 제품입니다!!\n가로x세로x높이는 대략 55x50x45(cm) 되는 것 같아요!\n직접 잰거라 오차가 아주 조금 있을 수 있습니다!\n(집은 아주 깔끔하게 생겼고 예뻐요)\n더큰 강아지집이나, 다른 강아지용품하고 바꾸고 싶어요\n연락주세요~~!!','반려동물용품','강아지집 또는 강아지용품','대전광역시 중구 중촌동','거래중','2020-09-07 06:33:10'),(57,42,'원목 옷걸이 42개','원목옷걸이인데 세번에 나눠사서 색감 높이가 조금씩 달라요\n\n왼쪽4개 / 가운데20개 / 오른쪽18개\n\n안쓰는 중이라 선풍기랑 교환원합니다.','가구/인테리어','선풍기','대전광역시 중구 중촌동','대기중','2020-09-07 06:35:31'),(58,42,'강아지 고양이 영양캔 ad캔 10개','유통기한: 22년 3월까지입니다.\n다른 고양이용품이나 강아지용품과 교환원합니다.','반려동물용품','고양이, 강아지 용품','대전광역시 중구 중촌동','대기중','2020-09-07 06:37:18'),(59,42,'스피커','리어 스피커로 쓰셔도 되구요.\n그냥 두 개로 쓰셔도 됩니다.\n키보드와 교환 원합니다.','디지털/가전','키보드','대전광역시 중구 중촌동','거래중','2020-09-07 06:39:26'),(62,45,'직접 농사지은 상추','직접 농사지은 꽃상추에여\n챗 주세요~~~ \n+ 고양이 물품도 좋아요','생활/가공식품','계란이나 기타 야채, 고양이 물품','대전광역시 유성구 도룡동','거래중','2020-09-07 07:54:40');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `send_time` datetime NOT NULL,
  `receive_time` datetime DEFAULT NULL,
  `chatroom_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `receiver_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chatroom_id_idx` (`chatroom_id`),
  KEY `sender_id_idx` (`sender_id`),
  KEY `receiver_id_idx` (`receiver_id`),
  CONSTRAINT `chatroom_id` FOREIGN KEY (`chatroom_id`) REFERENCES `chatroom` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `receiver_id` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sender_id` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'안녕하세요 ~','2020-09-07 04:20:53',NULL,23,34,33),(2,'딸기쨈 교환하고싶어서요 ~~~','2020-09-07 04:20:58',NULL,23,34,33),(31,'ㅇㅇ','2020-09-07 07:13:58','2020-09-07 07:31:28',28,35,42),(32,'ee','2020-09-07 07:14:23','2020-09-07 07:31:28',28,35,42),(36,'aa','2020-09-07 07:21:24','2020-09-07 07:31:28',28,35,42),(37,'ㄴㄴ','2020-09-07 07:22:55','2020-09-07 07:30:55',28,42,35),(40,'ㅎㅇ','2020-09-07 07:25:42','2020-09-07 07:30:55',28,42,35),(54,'안녕하세요','2020-09-07 07:51:13','2020-09-07 07:52:03',29,44,45),(55,'상추 교환하고싶어요','2020-09-07 07:51:17','2020-09-07 07:52:03',29,44,45),(56,'계란 있어요','2020-09-07 07:51:18','2020-09-07 07:52:03',29,44,45),(57,'안녕하세요~~~','2020-09-07 07:51:25','2020-09-07 07:52:13',29,45,44),(58,'계란으로 교환원하시는구나','2020-09-07 07:51:29','2020-09-07 07:52:13',29,45,44),(59,'네 좋아요 ~~!!','2020-09-07 07:51:31','2020-09-07 07:52:13',29,45,44);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search`
--

DROP TABLE IF EXISTS `search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `keyword` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search`
--

LOCK TABLES `search` WRITE;
/*!40000 ALTER TABLE `search` DISABLE KEYS */;
INSERT INTO `search` VALUES (8,38,'토시','2020-09-07 06:33:32'),(11,45,'고양이','2020-09-07 07:54:16');
/*!40000 ALTER TABLE `search` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profile` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (33,'95hongju@gmail.com','냥냥굿','010-2222-3434','대전광역시 대덕구 대화동','{bcrypt}$2a$10$hnxPgrAhwHlEGOpWN5f2Yu5oWRc7L1mSwiKW7CxASEf.OWwBJQA3m','200907040605.png'),(34,'hongjuqueen@gmail.com','유성','010-1212-4343','대전광역시 유성구 덕명동','{bcrypt}$2a$10$IEaU6xEjSCWikxRyHkRN2uByXpKPi984nqCvwFg0ptWRXZsTaHwQy','200907070437.png'),(35,'user@unithis.com','직거래처음','000-0000-0000','대전광역시 중구 선화동','{bcrypt}$2a$10$ULwISfIf5eYrZy2onXrIweY/VG3QX3QI1NMyTJQEdTftdBnTEIVCO',NULL),(37,'itdeveloper@naver.com','얼리어답터','010-0000-0000','대전광역시 서구 괴정동','{bcrypt}$2a$10$cyEE8I.bKRM74Ufyd3f0IuUB1f0DH6mOkvjOPxsJ8JYQrLJ19rn6K','200907065109.jpg'),(38,'farmer@naver.com','우리작물좋아요','010-0000-0000','대전광역시 서구 가수원동','{bcrypt}$2a$10$AIVmzWwgHn3uksP2.PtZ6.MrAlSuikDngxdJaJvJk9VVK/K9PMoLy','200907064859.jpeg'),(39,'yg1110@unithis.com','yg1110','010-1332-2343','대전광역시 중구 은행동','{bcrypt}$2a$10$CTOhm6FY0lHzS2O.OtTTMuwf0V9a.misQBsl4xpOuM.lqt28KJrqm',NULL),(40,'king@unithis.com','쭈','010-2121-1212','대전광역시 서구 만년동','{bcrypt}$2a$10$O/kAeahUXL6okfjeapQ/guxjBIKWjGP7HLU7u8SK9sQEbxV0pSmMC',NULL),(42,'younggil94@naver.com','행복한','010-8439-2349','대전광역시 중구 중촌동','{bcrypt}$2a$10$3iwhdiIzlLyTxSJrkiRvlO1GNb/YM2YWlhJIK66v4iAn0YSgB4bbK',NULL),(44,'heart@unithis.com','하트하트','010-1209-2390','대전광역시 유성구 도룡동','{bcrypt}$2a$10$myWghCRnh0.ItrdGnQIo7OLK915.mpSEcEHnFamKniD4eXQlfwR8e','200907073853.jpg'),(45,'hongju@unithis.com','홍주최고','010-1212-3242','대전광역시 유성구 도룡동','{bcrypt}$2a$10$60mb4yZJXU.U6aJKr6dKMuL40Y5iZWag/2lTxYtCJcLfuc4n5d3/O','200907075003.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-07 20:03:18
