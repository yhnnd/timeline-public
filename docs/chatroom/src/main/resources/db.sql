/*
Navicat MySQL Data Transfer

Source Server         : db
Source Server Version : 50630
Source Host           : localhost:3306
Source Database       : db

Target Server Type    : MYSQL
Target Server Version : 50630
File Encoding         : 65001

Date: 2019-04-12 10:11:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for card
-- ----------------------------
DROP TABLE IF EXISTS `card`;
CREATE TABLE `card` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `cardClass` varchar(255) DEFAULT NULL,
  `cardType` varchar(255) DEFAULT NULL,
  `cardTitle` varchar(255) DEFAULT NULL,
  `cardBlockText` varchar(255) DEFAULT NULL,
  `cardBlockTextFull` varchar(255) DEFAULT NULL,
  `cardFooterText` varchar(255) DEFAULT NULL,
  `imageType` varchar(255) DEFAULT NULL,
  `avatarType` varchar(255) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for card_comment
-- ----------------------------
DROP TABLE IF EXISTS `card_comment`;
CREATE TABLE `card_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `card_id` int(11) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `target_id` int(11) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  `is_timed` bit(1) DEFAULT NULL,
  `life_millis` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `badgeclass` varchar(255) DEFAULT NULL,
  `textclass` varchar(255) DEFAULT NULL,
  `roomid` int(11) DEFAULT NULL,
  `sendtime` timestamp NULL DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=690 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for message_style
-- ----------------------------
DROP TABLE IF EXISTS `message_style`;
CREATE TABLE `message_style` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `avatar_class` varchar(255) DEFAULT NULL,
  `avatar_border` varchar(255) DEFAULT NULL,
  `avatar_border_radius` varchar(255) DEFAULT NULL,
  `username_text_class` varchar(255) DEFAULT NULL,
  `username_badge_class` varchar(255) DEFAULT NULL,
  `message_text_class` varchar(255) DEFAULT NULL,
  `message_background_class` varchar(255) DEFAULT NULL,
  `message_border` varchar(255) DEFAULT NULL,
  `message_border_radius` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for preferences
-- ----------------------------
DROP TABLE IF EXISTS `preferences`;
CREATE TABLE `preferences` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `enable_dark_mode` tinyint(4) DEFAULT NULL,
  `profile_page_background_image` varchar(255) DEFAULT NULL,
  `global_chat_background_image` varchar(255) DEFAULT NULL,
  `enable_press_enter_to_send` tinyint(4) DEFAULT NULL,
  `application_language` varchar(255) DEFAULT NULL,
  `allow_hide_scroll_control` tinyint(4) DEFAULT NULL,
  `allow_hide_page_header` tinyint(4) DEFAULT NULL,
  `allow_hide_message_input` tinyint(4) DEFAULT NULL,
  `enable_modal_fade` tinyint(4) DEFAULT NULL,
  `enable_assistive_links` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(255) DEFAULT NULL,
  `live` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for room_manager
-- ----------------------------
DROP TABLE IF EXISTS `room_manager`;
CREATE TABLE `room_manager` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `roomid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `changeManager` tinyint(4) DEFAULT NULL,
  `changeManagerPrivilege` tinyint(4) DEFAULT NULL,
  `changeRoomName` tinyint(4) DEFAULT NULL,
  `changeRoomType` tinyint(4) DEFAULT NULL,
  `changeRoomLive` tinyint(4) DEFAULT NULL,
  `deleteRoom` tinyint(4) DEFAULT NULL,
  `splitRoom` tinyint(4) DEFAULT NULL,
  `mergeRoom` tinyint(4) DEFAULT NULL,
  `approveUser` tinyint(4) DEFAULT NULL,
  `muteUser` tinyint(4) DEFAULT NULL,
  `muteAllUser` tinyint(4) DEFAULT NULL,
  `removeUser` tinyint(4) DEFAULT NULL,
  `callAllUser` tinyint(4) DEFAULT NULL,
  `toggleAnonymous` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_advanced_settings
-- ----------------------------
DROP TABLE IF EXISTS `user_advanced_settings`;
CREATE TABLE `user_advanced_settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `multipleOnline` bit(1) DEFAULT NULL,
  `compulsoryDisconnect` bit(1) DEFAULT NULL,
  `exposeOnlineStatus` bit(1) DEFAULT NULL,
  `exposeUsername` bit(1) DEFAULT NULL,
  `exposeUserid` bit(1) DEFAULT NULL,
  `exposeGender` bit(1) DEFAULT NULL,
  `exposeAge` bit(1) DEFAULT NULL,
  `exposeCards` bit(1) DEFAULT NULL,
  `loadHtmlMessages` bit(1) DEFAULT NULL,
  `temporaryChats` bit(1) DEFAULT NULL,
  `popupPreview` bit(1) DEFAULT NULL,
  `nightMode` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_and_room
-- ----------------------------
DROP TABLE IF EXISTS `user_and_room`;
CREATE TABLE `user_and_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `roomid` int(11) DEFAULT NULL,
  `joinTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `notify` bit(1) DEFAULT NULL,
  `popup` bit(1) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
