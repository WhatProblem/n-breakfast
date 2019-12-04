-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2019-12-04 10:41:12
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `breakfast_shop`
--

-- --------------------------------------------------------

--
-- 表的结构 `advertise_table`
--

CREATE TABLE `advertise_table` (
  `advertise_id` tinyint(3) UNSIGNED NOT NULL COMMENT '广告卡片id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '广告卡片对应的商品id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `banner_table`
--

CREATE TABLE `banner_table` (
  `banner_id` smallint(5) UNSIGNED NOT NULL COMMENT '轮播商品id，根据商品id查询商品表',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `banner_table`
--

INSERT INTO `banner_table` (`banner_id`, `id`, `create_time`) VALUES
(1, 9, '2019-12-04 08:09:22');

-- --------------------------------------------------------

--
-- 表的结构 `cart_table`
--

CREATE TABLE `cart_table` (
  `cart_id` smallint(5) UNSIGNED NOT NULL COMMENT '购物车商品数量id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `goods_num` tinyint(3) UNSIGNED NOT NULL COMMENT '加入购物车商品数量',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `coupon_table`
--

CREATE TABLE `coupon_table` (
  `coupon_id` smallint(5) UNSIGNED NOT NULL COMMENT '优惠卡券id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `has_num` tinyint(3) UNSIGNED NOT NULL COMMENT '用户拥有优惠券数量',
  `coupon_money` decimal(5,0) UNSIGNED NOT NULL DEFAULT '0' COMMENT '卡券面值',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  `end_time` datetime NOT NULL COMMENT '打折优惠结束时间',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `fav_table`
--

CREATE TABLE `fav_table` (
  `fav_id` smallint(5) UNSIGNED NOT NULL COMMENT '加入收藏的商品id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `fav_table`
--

INSERT INTO `fav_table` (`fav_id`, `id`, `user_id`, `create_time`) VALUES
(1, 1, 1, '2019-12-04 08:10:55'),
(2, 2, 1, '2019-12-04 08:10:55');

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
  `introduce` varchar(255) NOT NULL DEFAULT '' COMMENT '商品介绍',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据创建的时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goods_table`
--

INSERT INTO `goods_table` (`id`, `sort_id`, `goods_name`, `price`, `pic_url`, `introduce`, `create_time`) VALUES
(1, 1, '天津小笼包', '7.50', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574865658023&di=5a69eae48a529a5fb59ba2467c8a4a77&imgtype=0&src=http%3A%2F%2Fimg011.hc360.cn%2Fy6%2FM00%2F1F%2FB5%2FwKhQtFYz4waEYXCPAAAAAPkk2V4005.jpg', '小笼包，别称小笼馒头，在苏南、上海、浙江一带习惯叫做小笼馒头，四川叫做小笼包子，武汉叫做蒸包，一个蒸笼里有10个包子，10个包子为一笼，它源于北宋京城开封的灌汤包，南宋时在江南承传、发展和演变而成。小笼包是常州、无锡、苏州、上海、南京、杭州、宁波、嘉兴、芜湖、徽州、嵊州等江南地区著名的传统小吃。', '2019-12-04 08:07:56'),
(2, 2, '水果糕点', '28.00', 'http://photo.orsoon.com/180516/JPG180516_271/DZ7ijJzmfI_small.jpg', '饭后必备纯天然食材，健康助消化，口感绝佳', '2019-12-04 08:07:56'),
(3, 3, '新鲜西兰花', '5.50', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574867467967&di=3a8e2f1bf575f7325e993e6787cf637c&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1532762362%2C4131033962%26fm%3D214%26gp%3D0.jpg', '西蓝花，俗称青花菜。原产意大利，是常见蔬菜。通称绿花菜，也被称为西兰花。二年生草本植物，是甘蓝的一种变种。叶子大，主茎顶端形成肥大的花球，绿色或紫绿色，表面的小花蕾不密集在一起，侧枝的顶端各生小花球。', '2019-12-04 08:07:56'),
(4, 4, '饭后小甜品', '16.00', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574867599529&di=a4e45a3b8c17b4a7ae0c4c4ae495a12c&imgtype=0&src=http%3A%2F%2Fimage.bitauto.com%2Fdealer%2Fnews%2F100046308%2F6545b08e-2721-41c1-ba37-ddd2d6eb1015.jpg', '以面粉或米粉、糖、油脂、蛋、乳品等为主要原料，配以各种辅料、馅料和调味料，初制成型，再经蒸、烤、炸、炒等方式加工制成', '2019-12-04 08:07:56'),
(8, 2, '特色牛奶水果面包套餐', '18.00', 'http://img1.juimg.com/180122/330627-1P122144Q596.jpg', '特色牛奶水果面包套餐，爽口美味，回味无穷，香甜水果，美味面包', '2019-12-04 08:07:56'),
(9, 2, '特色全家桶', '36.00', 'http://photo.orsoon.com/180516/JPG180516_271/DZ7ijJzmfI_small.jpg', '适合家人朋友一起享用的美味水果面包早餐，营养健康，最美好的一天从早上开始', '2019-12-04 08:07:56'),
(10, 4, '脆皮烤肠', '5.00', 'http://www.jituwang.com/uploads/allimg/130611/260177-13061109164585.jpg', '脆皮烤肠，美味可口，绝对美味', '2019-12-04 08:07:56'),
(11, 5, '酸辣豆腐脑', '5.00', 'http://img0.imgtn.bdimg.com/it/u=1886190110,1538725553&fm=214&gp=0.jpg', '豆腐脑一道著名的汉族传统小吃，常与豆腐花、豆花混用，依据各地口味不同，北方多爱咸食，而南方则偏爱甜味，亦有地区如四川等喜爱酸辣口味。\n豆腐脑和豆花都是做豆腐的中间产物，成分上并没有太大区别。豆腐脑是最先出来的，比较嫩软，用筷子难以夹起，需用汤勺盛用；等到豆腐脑再凝固一点，就是豆花，与豆腐脑相比口感凝滑，可以用筷子夹起来吃；豆花放入模具里面压实更加凝固之后就是豆腐了', '2019-12-04 08:07:56'),
(12, 5, '胡辣汤', '4.00', 'http://pic34.nipic.com/20131022/9885883_003030145000_2.jpg', '胡辣汤，也称糊辣汤，中原知名小吃，起源于河南省周口市西华县逍遥镇和漯河市舞阳县北舞渡镇。尤以逍遥镇胡辣汤出名。\n胡辣汤的主要制作材料有胡辣汤料、胡椒、辣椒、熟羊（牛）肉、羊骨高汤、面筋、面粉、粉条、黄花菜、花生、木耳等。是中国北方早餐中常见的传统汤类名吃。', '2019-12-04 08:07:56'),
(13, 5, '纸杯豆浆', '3.00', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575043097129&di=df92dc8bdb62a09e49dfb6ece411df8d&imgtype=0&src=http%3A%2F%2Fpic1.16pic.com%2F00%2F13%2F67%2F16pic_1367919_b.jpg', '豆浆（Soybean Milk)，中国汉族传统饮品，最早的豆浆为西汉淮南王刘安制作。将大豆用水泡涨后磨碎、过滤、煮沸而成。豆浆营养非常丰富，且易于消化吸收。与西方的牛奶不同，豆浆是非常具有中国民族特色的食品，广泛流行于华人地区。', '2019-12-04 08:07:56'),
(14, 5, '豆浆', '2.00', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575043255647&di=c8f7b6e1125a2497ee9517d175ab4292&imgtype=0&src=http%3A%2F%2Fimg008.hc360.cn%2Fm6%2FM01%2FD2%2F24%2FwKhQolcMt3KESyyrAAAAAM34w5c813.jpg', '豆浆（Soybean Milk)，中国汉族传统饮品，最早的豆浆为西汉淮南王刘安制作。将大豆用水泡涨后磨碎、过滤、煮沸而成。豆浆营养非常丰富，且易于消化吸收。与西方的牛奶不同，豆浆是非常具有中国民族特色的食品，广泛流行于华人地区。', '2019-12-04 08:07:56'),
(15, 5, '手磨豆浆', '3.50', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575043320202&di=f6eaa90f6c20fdd172cd501a9536c045&imgtype=0&src=http%3A%2F%2Fwww.dgdoudou.com%2Fuploads%2Fallimg%2F171025%2F2-1G02510345b59.jpg', '豆浆（Soybean Milk)，中国汉族传统饮品，最早的豆浆为西汉淮南王刘安制作。将大豆用水泡涨后磨碎、过滤、煮沸而成。豆浆营养非常丰富，且易于消化吸收。与西方的牛奶不同，豆浆是非常具有中国民族特色的食品，广泛流行于华人地区。', '2019-12-04 08:07:56');

-- --------------------------------------------------------

--
-- 表的结构 `order_table`
--

CREATE TABLE `order_table` (
  `order_id` smallint(5) UNSIGNED NOT NULL COMMENT '订单id',
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `id` smallint(5) UNSIGNED NOT NULL COMMENT '商品id',
  `order_num` tinyint(3) UNSIGNED NOT NULL COMMENT '订单数量',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
  `rating` varchar(255) NOT NULL COMMENT '用户评价内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sort_table`
--

CREATE TABLE `sort_table` (
  `sort_id` tinyint(3) UNSIGNED NOT NULL COMMENT '商品分类id',
  `sort_name` char(10) NOT NULL COMMENT '商品分类名称',
  `sort_icon` varchar(255) NOT NULL COMMENT '商品分类图标',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sort_table`
--

INSERT INTO `sort_table` (`sort_id`, `sort_name`, `sort_icon`, `create_time`) VALUES
(1, '面食', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575385798701&di=34d6b322f6a7820a22229b07cb30f6e1&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D2644741112%2C3522400763%26fm%3D214%26gp%3D0.jpg', '2019-12-04 08:12:15'),
(2, '水果', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575385908930&di=cf32040c9f344cef58cddaa9cff412c0&imgtype=0&src=http%3A%2F%2Fwww.51yuansu.com%2Fpic2%2Fcover%2F00%2F53%2F95%2F582578c79d148_610.jpg', '2019-12-04 08:12:15'),
(3, '蔬菜', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575386029180&di=767ce163a0a1c0fb02e685e970f094ce&imgtype=0&src=http%3A%2F%2Ffile3.youboy.com%2Fe%2F2015%2F5%2F18%2F14%2F258825s.png', '2019-12-04 08:12:15'),
(4, '糕点', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575386226529&di=2733b98e0bc9dc370706c7c9e1cf3a03&imgtype=0&src=http%3A%2F%2Fi1.chuimg.com%2Fe115784ca7a111e5ba16e0db5512b208.jpg%402o_50sh_1pr_1l_600w_90q_1wh', '2019-12-04 08:12:15'),
(5, '早餐汤', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575981026&di=5c2faaa18c3714486ee0024d3941ab8f&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM04%2FFC%2F8D%2FwKhQb1RnFd2EXx80AAAAABO4uKo581.jpg', '2019-12-04 08:12:15'),
(7, '米饭类', 'http://ku.90sjimg.com/element_origin_min_pic/16/07/21/16579087188e276.jpg', '2019-12-04 08:12:15');

-- --------------------------------------------------------

--
-- 表的结构 `user_table`
--

CREATE TABLE `user_table` (
  `user_id` smallint(5) UNSIGNED NOT NULL COMMENT '用户id',
  `user_name` char(20) NOT NULL COMMENT '用户名称',
  `user_hash` varchar(255) NOT NULL COMMENT '账号密码hash值',
  `avatar` varchar(255) NOT NULL COMMENT '用户头像',
  `province` char(15) NOT NULL COMMENT '用户所在省份',
  `city` char(15) NOT NULL COMMENT '用户所在市',
  `country` char(20) NOT NULL COMMENT '用户所在国家',
  `addr_detail` varchar(255) NOT NULL COMMENT '用户详细地址',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_table`
--

INSERT INTO `user_table` (`user_id`, `user_name`, `user_hash`, `avatar`, `province`, `city`, `country`, `addr_detail`, `create_time`) VALUES
(1, 'ws1234', 'e10adc3949ba59abbe56e057f20f883e', 'http://img0.imgtn.bdimg.com/it/u=1684913535,4269011780&fm=214&gp=0.jpg', '北京', '北京市', '朝阳区', '北京市朝阳区朝阳大悦城108号', '2019-12-04 08:12:28'),
(6, 'app1234', 'e10adc3949ba59abbe56e057f20f883e', 'http://img0.imgtn.bdimg.com/it/u=1684913535,4269011780&fm=214&gp=0.jpg', '北京', '北京市', '朝阳区', '北京市朝阳区朝阳大悦城108号', '2019-12-04 08:12:28');

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
-- 使用表AUTO_INCREMENT `advertise_table`
--
ALTER TABLE `advertise_table`
  MODIFY `advertise_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '广告卡片id';
--
-- 使用表AUTO_INCREMENT `banner_table`
--
ALTER TABLE `banner_table`
  MODIFY `banner_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '轮播商品id，根据商品id查询商品表', AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `cart_table`
--
ALTER TABLE `cart_table`
  MODIFY `cart_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '购物车商品数量id', AUTO_INCREMENT=12;
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
  MODIFY `fav_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '加入收藏的商品id', AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `goods_table`
--
ALTER TABLE `goods_table`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品id，商品唯一编码', AUTO_INCREMENT=16;
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
  MODIFY `sort_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '商品分类id', AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
