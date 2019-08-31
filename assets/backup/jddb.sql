/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50535
 Source Host           : localhost:3306
 Source Schema         : jddb

 Target Server Type    : MySQL
 Target Server Version : 50535
 File Encoding         : 65001

 Date: 31/08/2019 15:17:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `book_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `book_link` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `last_update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `last_chapter_link` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `last_chapter_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3769 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `game_alias` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `img_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `game_describe` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `info` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `game_link` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 533 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
