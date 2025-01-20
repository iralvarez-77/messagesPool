// utils/responseUtils.js
export function sendErrorResponse(res, statusCode, message) {
  res.status(statusCode).json({ message });
}


