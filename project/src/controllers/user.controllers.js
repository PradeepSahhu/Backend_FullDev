import { asyncHandlerDB } from "../utils/asyncHandlerDB.js";

const registerUser = asyncHandlerDB(async (req, res) => {
  res.status(200).json({
    message: "Pradeep Sahu",
  });
});

export { registerUser };
