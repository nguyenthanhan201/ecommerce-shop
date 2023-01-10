const ip = require("ip");
const CartItem = require("../models/CartItem");
const ItemOrder = require("../models/ItemOrder");
const Order = require("../models/Order");

class OrderController {
  getAllOrders(req, res) {
    Order.find().then((orders) => res.json(orders));
  }

  show(req, res, next) {
    const id = req.params.id;

    // get orders have idAuth = id
    Order.find({ idAuth: id })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        res.json(err);
      });
  }

  create(req, res, next) {
    var ipAddr = ip.address();

    var config = require("../../config/default.json");
    var dateFormat = require("date-format");

    var tmnCode = config.vnp_TmnCode;
    var secretKey = config.vnp_HashSecret;
    var vnpUrl = config.vnp_Url;
    var returnUrl = `${process.env.VNP_RETURNURL}order/vnpay_return`;

    var date = new Date();

    var createDate =
      date.getFullYear() +
      "" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "" +
      ("0" + date.getDate()).slice(-2) +
      "" +
      ("0" + date.getHours()).slice(-2) +
      "" +
      ("0" + date.getMinutes()).slice(-2) +
      "" +
      ("0" + date.getSeconds()).slice(-2);
    var orderId = dateFormat(date, "HHmmss");
    var amount = req.body.amount;
    // var bankCode = "NCB";
    var bankCode = "";

    var orderInfo = "Thanh toan don hang";
    var orderType = "other";
    var locale = "vn";
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    // var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    if (!req.body.amount) return res.json({ message: "Missing amount" });
    res.json({ data: vnpUrl });
  }

  vnpayReturn(req, res, next) {
    var vnp_Params = req.query;
    // console.log("👌 ~ vnp_Params", vnp_Params);
    var secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = sortObject(vnp_Params);

    var config = require("../../config/default.json");
    var secretKey = config.vnp_HashSecret;
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    if (secureHash === signed) {
      res.json({ RspCode: "00", Message: "Confirm Success" });
    } else {
      res.json({ RspCode: "97", Message: "Confirm Fail" });
    }
  }

  vnpayIPN(req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    vnp_Params = sortObject(vnp_Params);

    var config = require("../../config/default.json");
    var secretKey = config.vnp_HashSecret;
    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    if (secureHash === signed) {
      res.json({ RspCode: "00", Message: "Confirm Success2" });
    } else {
      res.json({ RspCode: "97", Message: "Confirm Fail" });
    }
  }

  async addOrder(req, res, next) {
    const { idAuth } = req.body;
    // tìm cartItem của user
    CartItem.find({
      idAuth,
    }).then((cartItem) => {
      CartItem.populate(
        cartItem,
        { path: "idProduct" },
        function (err, cartItems) {
          if (err || cartItems.length === 0)
            return res.status(400).json({ error: err });
          const grouped = {};
          // gom nhóm các sản phẩm giống nhau
          cartItems.forEach(function (a) {
            const itemOrder = new ItemOrder({
              product: a.idProduct,
              quantity: a.quantity,
              size: a.size,
              color: a.color,
            });
            if (grouped[a.idProduct._id + a.size + a.color]) {
              grouped[a.idProduct._id + a.size + a.color][0].quantity +=
                a.quantity;
            } else {
              grouped[a.idProduct._id + a.size + a.color] = [itemOrder];
            }
          });
          // tạo order
          const order = new Order({
            idAuth,
            order: grouped,
          });
          //lưu order
          order
            .save()
            .then((order) => {
              // res.status(200).json({ order });
              // lưu order thành công thì xóa cartItem
              CartItem.deleteMany({
                idAuth,
              }).then(() => res.status(200).json({ message: "success" }));
            })
            .catch((err) => {
              res.status(400).json({ error: err });
            });
        }
      );
    });
  }
}

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

module.exports = new OrderController();
