const { sendToQueue } = require("../services/rabbitmq");

exports.isServerActive = (req, res) => {
  const statusInfo = {
    time: new Date(),
    status: "Server aktif durumda!",
    ip: req.ip,
  };

  sendToQueue("server-status-queue", JSON.stringify(statusInfo));

  res.json({
    status: "İş talebiniz alındı, arka planda işlenmek üzere kuyruğa eklendi.",
    queue: "server-status-queue",
    info: statusInfo,
  });
};
