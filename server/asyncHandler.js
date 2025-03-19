const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      // console.error(`Error in asyncHandler: ${error.message}`);
      res.status(500).json({
        message: error.message,
      });
    });
  };
};

export default asyncHandler;
