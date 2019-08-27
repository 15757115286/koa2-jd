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

 Date: 27/08/2019 16:28:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (5, 'cm1', 'f65bc1c702186d54cbbb58072d8c0a3c');
INSERT INTO `user` VALUES (6, 'cm1', 'f65bc1c702186d54cbbb58072d8c0a3c');
INSERT INTO `user` VALUES (7, 'cm1', 'f65bc1c702186d54cbbb58072d8c0a3c');

SET FOREIGN_KEY_CHECKS = 1;
