const errorHandling = (err, req, res, next) => {
     const message = err.message.split(" - ")[1];
     logger.error(err);
     return res.status(500).json({
          error: message,
          message: "Internal server error",
          data: null,
     });
};

const notFound = (req, res) => {
     res.status(404).json({
          error: "Not found",
          message: "field",
          data: null,
     });
};

module.exports = {
     errorHandling,
     notFound
}