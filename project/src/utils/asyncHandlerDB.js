const asyncHandlerDB = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => next(err));
  };
};

export { asyncHandlerDB };

//higher order functions.

// const asyncHandleru = () => {};

// const asyncHandlers = (func) => {
//   () => {
//     console.log("this is same as below");
//   };
// };

// const asyncHandlers = (func) => async¯()=>{
//
//     console.log("this is same as below");
//   };
// };

// const asyncHandlerDB = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// }; // higher order functions. functions which can take other functions as parameter or return it (functions) means it treats functions as variable.
