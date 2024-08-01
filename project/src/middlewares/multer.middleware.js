import multer from "multer";
// multer taking user's uploaded image/file into the local / server file .

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  filename: function (req, file, cb) {
    // function is controller, "/ " is route.

    cb(null, file.originalname);
    console.log(file.originalname);
  },
});

export const upload = multer({
  storage,
});
// URI,URN,URL = locator, identifier, Name
// we want the resource's address where to talk to - IP address.

// headers = metadata. (send through req or res by client or server)

// payload = data
