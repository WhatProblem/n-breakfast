-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-11-24 15:10:59
-- 服务器版本： 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brreakfast_shop`
--

-- --------------------------------------------------------

--
-- 表的结构 `advertise_table`
--

CREATE TABLE `advertise_table` (
  `advertise_id` tinyint(3) UNSIGNED NOT NULL COMMENT '广告卡片id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '广告卡片对应的商品id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `banner_table`
--

CREATE TABLE `banner_table` (
  `banner_id` smallint(5) UNSIGNED NOT NULL COMMENT '轮播商品id，根据商品id查询商品表',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `cart_table`
--

CREATE TABLE `cart_table` (
  `cart_id` smallint(5) UNSIGNED NOT NULL COMMENT '购物车商品数量id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `goods_num` tinyint(3) UNSIGNED NOT NULL COMMENT '加入购物车商品数量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `coupon_table`
--

CREATE TABLE `coupon_table` (
  `coupon_id` smallint(5) UNSIGNED NOT NULL COMMENT '优惠卡券id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `has_num` tinyint(3) UNSIGNED NOT NULL COMMENT '用户拥有优惠券数量',
  `coupon_money` decimal(5,0) UNSIGNED NOT NULL DEFAULT '0' COMMENT '卡券面值'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `discount_table`
--

CREATE TABLE `discount_table` (
  `discount_id` smallint(5) UNSIGNED NOT NULL COMMENT '限时优惠商品id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `discount_sum` decimal(6,0) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商品优惠时，折扣金额，保留两位小数',
  `start_time` datetime NOT NULL COMMENT '打折优惠开始时间',
  `end_time` datetime NOT NULL COMMENT '打折优惠结束时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `fav_table`
--

CREATE TABLE `fav_table` (
  `fav_id` smallint(5) UNSIGNED NOT NULL COMMENT '加入收藏的商品id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `goods_table`
--

CREATE TABLE `goods_table` (
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id，商品唯一编码',
  `sort_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '1' COMMENT '商品分类sortId，从sort_table表可查询对应的分类名称',
  `goods_name` char(50) NOT NULL DEFAULT '' COMMENT '商品名称50字以内',
  `price` decimal(5,2) UNSIGNED NOT NULL COMMENT '商品价格，保留两位小数',
  `pic_url` varchar(255) NOT NULL COMMENT '商品图片，来自百度',
  `introduce` varchar(255) NOT NULL DEFAULT '' COMMENT '商品介绍'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `order_table`
--

CREATE TABLE `order_table` (
  `order_id` smallint(5) UNSIGNED NOT NULL COMMENT '订单id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `order_num` tinyint(3) UNSIGNED NOT NULL COMMENT '订单数量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `rating_table`
--

CREATE TABLE `rating_table` (
  `ratingId` smallint(5) UNSIGNED NOT NULL COMMENT '已经评价商品的id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `score` decimal(3,0) UNSIGNED NOT NULL DEFAULT '0' COMMENT '用户添加商品评分',
  `rating` varchar(255) NOT NULL COMMENT '用户评价内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sort_table`
--

CREATE TABLE `sort_table` (
  `sort_id` tinyint(3) UNSIGNED NOT NULL COMMENT '商品分类id',
  `sort_name` char(10) NOT NULL COMMENT '商品分类名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `user_table`
--

CREATE TABLE `user_table` (
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `user_name` char(20) NOT NULL COMMENT '用户名称',
  `pwd` varchar(255) NOT NULL COMMENT '用户密码',
  `avatar` varchar(255) NOT NULL COMMENT '用户头像',
  `country` char(20) NOT NULL COMMENT '用户所在国家',
  `province` char(15) NOT NULL COMMENT '用户所在省份',
  `city` char(15) NOT NULL COMMENT '用户所在市',
  `addr_detail` varchar(255) NOT NULL COMMENT '用户详细地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `advertise_table`
--
ALTER TABLE `advertise_table`
  ADD PRIMARY KEY (`advertise_id`);

--
-- Indexes for table `banner_table`
--
ALTER TABLE `banner_table`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `cart_table`
--
ALTER TABLE `cart_table`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `coupon_table`
--
ALTER TABLE `coupon_table`
  ADD PRIMARY KEY (`coupon_id`);

--
-- Indexes for table `discount_table`
--
ALTER TABLE `discount_table`
  ADD PRIMARY KEY (`discount_id`);

--
-- Indexes for table `fav_table`
--
ALTER TABLE `fav_table`
  ADD PRIMARY KEY (`fav_id`);

--
-- Indexes for table `goods_table`
--
ALTER TABLE `goods_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `rating_table`
--
ALTER TABLE `rating_table`
  ADD PRIMARY KEY (`ratingId`);

--
-- Indexes for table `sort_table`
--
ALTER TABLE `sort_table`
  ADD PRIMARY KEY (`sort_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `cart_table`
--
ALTER TABLE `cart_table`
  MODIFY `cart_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购物车商品数量id';
--
-- 使用表AUTO_INCREMENT `coupon_table`
--
ALTER TABLE `coupon_table`
  MODIFY `coupon_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '优惠卡券id';
--
-- 使用表AUTO_INCREMENT `discount_table`
--
ALTER TABLE `discount_table`
  MODIFY `discount_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '限时优惠商品id';
--
-- 使用表AUTO_INCREMENT `fav_table`
--
ALTER TABLE `fav_table`
  MODIFY `fav_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '加入收藏的商品id';
--
-- 使用表AUTO_INCREMENT `goods_table`
--
ALTER TABLE `goods_table`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id，商品唯一编码';
--
-- 使用表AUTO_INCREMENT `order_table`
--
ALTER TABLE `order_table`
  MODIFY `order_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '订单id';
--
-- 使用表AUTO_INCREMENT `rating_table`
--
ALTER TABLE `rating_table`
  MODIFY `ratingId` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '已经评价商品的id';
--
-- 使用表AUTO_INCREMENT `sort_table`
--
ALTER TABLE `sort_table`
  MODIFY `sort_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品分类id';
--
-- 使用表AUTO_INCREMENT `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id';COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
