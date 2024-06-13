const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const generateAuthTokenAndSetCookie = require('./utils/generateAuthTokenAndSetCookie'); // Adjust the path as necessary
const authController=require("./controllers/Users/user")

const PostModel = require("./models/Post");
const authControllerPdf=require("./controllers/Pdf/Pdf")
// const sendOTPEmail=require("./utils/sendOTP");
// const bcrypt = require("bcrypt");
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files
// Middleware
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your allowed origin
  credentials: true,
};
app.use(cors(corsOptions));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.use("/uploads", express.static("uploads"));
// Models
const EmployeeModel = require("./models/employee");
const PdfModel = require("./models/pdf");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/pdfs"); // Specify the folder to save uploaded PDFs
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const storageed = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Specify the file name format
  },
});

const uploaded = multer({ storageed });






const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/profileimage"); // Save uploaded files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Generate unique filenames
  },
});

// Multer upload instance
const fileUpload = multer({ storage: fileStorage });

app.post(
  "/upload-profile-image",
  fileUpload.single("profileImage"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const { email } = req.body;
    const filePath = req.file.path;
    const imageUrl = `http://localhost:3001/${filePath}`;

    try {
      const updatedUser = await EmployeeModel.findOneAndUpdate(
        { email },
        { profileImage: imageUrl },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send("User not found.");
      }

      res.json({ user: updatedUser });
    } catch (error) {
      console.error("Error updating user profile image:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);


app.get("/search", async (req, res) => {
  const { query } = req.query;
  try {
    const users = await EmployeeModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } }, // Case-insensitive search for username
        { email: { $regex: query, $options: "i" } }, // Case-insensitive search for email
        { universityname: { $regex: query, $options: "i" } }, // Case-insensitive search for university name
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).send("Internal Server Error");
  }
});



// function generateOTP() {
//     // return crypto.randomBytes(3).toString('hex'); // 6-digit OTP
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }
// async function sendOTPEmail(userEmail, otp) {
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "arifrahaman2606@gmail.com",
//       pass: "xnts tvlw lpbt knoi",
//     },
//   });

//   let mailOptions = {
//     from: "arifrahaman2606@gmail.com",
//     to: userEmail,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}`,
//   };

//   await transporter.sendMail(mailOptions);
// }

// Routes

// Register route
// app.post("/register", async (req, res) => {
//   try {
//     const { username, email, password, dob, universityname } = req.body;
//  const dateOfBirth = new Date(dob);
//     // Validate required fields
//     if (!username || !email || !password || !dob || !universityname) {
//       return res
//         .status(400)
//         .json({ error: "Please provide all required fields." });
//     }

//     // Check if the user already exists
//     const existingEmployee = await EmployeeModel.findOne({ email });
//     if (existingEmployee) {
//       return res.status(409).json({ error: "Email already registered." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new employee
//     const newEmployee = new EmployeeModel({
//       username: username.trim(),
//       email: email.trim(),
//       password: hashedPassword,
//       dob: dateOfBirth,
//       universityname: universityname.trim(),
//     });

//     // Save the new employee to the database
//     const savedEmployee = await newEmployee.save();

//     // Send success response
//     res.status(201).json({
//       message: "Employee created successfully",
//       employee: savedEmployee,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// app.post("/register", async (req, res) => {
//   try {
//     const { username, email, password, dob, universityname } = req.body;

//     // Validate required fields
//     if (!username || !email || !password || !dob || !universityname) {
//       return res
//         .status(400)
//         .json({ error: "Please provide all required fields." });
//     }

//     // Validate date format
//     const dateOfBirth = new Date(dob);
//     if (isNaN(dateOfBirth.getTime())) {
//       return res
//         .status(400)
//         .json({ error: "Invalid date format for Date of Birth." });
//     }

//     // Check if the user already exists
//     const existingEmployee = await EmployeeModel.findOne({ email });
//     if (existingEmployee) {
//       return res.status(409).json({ error: "Email already registered." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new employee
//     const newEmployee = new EmployeeModel({
//       username: username.trim(),
//       email: email.trim(),
//       password: hashedPassword,
//       dob: dateOfBirth,
//       universityname: universityname.trim(),
//     });

//     // Save the new employee to the database
//     const savedEmployee = await newEmployee.save();

//     // Send success response
//     res.status(201).json({
//       message: "Employee created successfully",
//       employee: savedEmployee,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/register",authController.register)

app.get("/pdfs/:pdfId", async (req, res) => {
  try {
    const { pdfId } = req.params;
    const pdf = await PdfModel.findById(pdfId);
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Send the PDF file as a download
    const filePath = path.join(__dirname, pdf.pdfPath);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



// app.post("/posts", async (req, res) => {
//   const { title, summary, content, cover } = req.body;

//   try {
//     const post = new PostModel({ title, summary, content, cover });
//     await post.save();
//     res.status(201).send(post);
//   } catch (error) {
//     console.error("Error creating post:", error);
//     res.status(500).send({ error: "Internal server error" });
//   }
// });
app.post("/posts", upload.single("cover"), async (req, res) => {
  const { title, summary, content } = req.body;
  const cover = req.file ? req.file.path : null;

  try {
    const post = new PostModel({ title, summary, content, cover });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});


app.get("/posts", async (req, res) => {
  try {
    const posts = await PostModel.find();
    const fullUrl = req.protocol + "://" + req.get("host");
    const postsWithFullUrl = posts.map((post) => {
      if (post.cover) {
        post.cover = `${fullUrl}/${post.cover}`;
      }
      return post;
    });
    res.status(200).send(postsWithFullUrl);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});



// Login route
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   EmployeeModel.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         if (user.password === password) {
//           res.json("Success");
//         } else {
//           res.json("The password is incorrect");
//         }
//       } else {
//         res.json("No record existed");
//       }
//     })
//     .catch((err) => res.status(500).json({ error: err.message }));
// });
// app.post("/login", async(req, res) => {
//   const { email, password } = req.body;
//   EmployeeModel.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         if (user.password === password) {
//           // Assuming userId is a field in your user object
//           const userId = user._id; // Adjust this based on your user model
//         const otp = generateOTP();
//         const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

//         // Store OTP in the user's document
//         user.otp = otp;
//         user.otpExpiry = otpExpiry;
//         await EmployeeModel.save();

//         // Send OTP via email
//         await sendOTPEmail(email, otp);
//           // Sending userId along with "Success" message in the response
//           res.json({ message: "Success", userId: userId });
//         } else {
//           res.json("The password is incorrect");
//         }
//       } else {
//         res.json("No record existed");
//       }
//     })
//     .catch((err) => res.status(500).json({ error: err.message }));
// });

// app.post('/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;

//     const user = await EmployeeModel.findOne({ email });

//     if (user && user.otp === otp && user.otpExpiry > Date.now()) {
//         user.otp = null;
//         user.otpExpiry = null;
//         await EmployeeModel.save();

//         res.status(200).json({ message: 'OTP verified' });
//     } else {
//         res.status(400).json({ message: 'Invalid or expired OTP' });
//     }
// });

app.post("/login",authController.login)
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await EmployeeModel.findOne({ email });

//     if (user) {
//       // Compare the provided password with the stored hashed password
//       const isMatch = await bcrypt.compare(password, user.password);

//       if (isMatch) {
//         const otp = generateOTP();
//         const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

//         // Store OTP in the user's document
//         user.otp = otp;
//         user.otpExpiry = otpExpiry;
//         await user.save();

//         // Send OTP via email
//         await sendOTPEmail(email, otp);

//         // Sending userId along with "Success" message in the response
//         res.status(200).json({ message: "OTP sent to your email" });
//       } else {
//         res.status(401).json({ message: "The password is incorrect" });
//       }
//     } else {
//       res.status(404).json({ message: "No record existed" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// Endpoint to verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp === otp && user.otpExpiry > Date.now()) {
      console.log(`OTP verified for user: ${email}`);

      // Call to generateAuthTokenAndSetCookie
      try {
        generateAuthTokenAndSetCookie(user, res);
      } catch (tokenError) {
        console.error("Error generating auth token:", tokenError);
        return res.status(500).json({ error: "Error generating auth token" });
      }

      // Clear OTP and expiry
      user.otp = null;
      user.otpExpiry = null;

      // Save user
      try {
        await user.save();
      } catch (saveError) {
        console.error("Error saving user after OTP verification:", saveError);
        return res.status(500).json({ error: "Error saving user data" });
      }

      return res
        .status(200)
        .json({ message: "OTP verified", userId: user._id });
    } else {
      console.error(`Invalid or expired OTP for user: ${email}`);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return res.status(500).json({ error: err.message });
  }
});



// Upload PDF route
// app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const pdfPath = req.file.path;

//     // Check if the user has an existing PDF
//     let existingPdf = await PdfModel.findOne({ userId: userId });
//     if (existingPdf) {
//       // Update the existing PDF path
//       existingPdf.pdfPath = pdfPath;
//       await existingPdf.save();
//       res.status(200).json({ message: "PDF updated successfully", pdf: existingPdf });
//     } else {
//       // Create a new PDF entry
//       const newPdf = new PdfModel({
//         userId: userId,
//         pdfPath: pdfPath,
//       });
//       await newPdf.save();
//       res.status(201).json({ message: "PDF uploaded successfully", pdf: newPdf });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
//   try {
//     const { userId,title } = req.body;
//     const pdfPath = req.file.path;

//     // Check if the user has an existing PDF
//     let existingPdf = await PdfModel.findOne({ userId: userId });

//     if (existingPdf) {
//       // Create a new version of the PDF
//       const newVersionPdf = new PdfModel({
//         userId: userId,
//         title:title,
//         pdfPath: pdfPath,
//       });
//       await newVersionPdf.save();
//       res
//         .status(200)
//         .json({
//           message: "New version of PDF added successfully",
//           pdf: newVersionPdf,
//         });
//     } else {
//       // Create a new PDF entry
//       const newPdf = new PdfModel({
//         userId: userId,
//         title:title,
//         pdfPath: pdfPath,
//       });
//       await newPdf.save();
//       res
//         .status(201)
//         .json({ message: "PDF uploaded successfully", pdf: newPdf });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

app.post("/upload-pdf", upload.single("pdf"), authControllerPdf.uploadPdf);

// app.get("/user-pdfs/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const userPdfs = await PdfModel.find({ userId });
//     res.status(200).json(userPdfs);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching PDFs", error: error.message });
//   }
// });

app.get("/user-pdfs/:userId", authControllerPdf.getPdf);

// Delete PDF
// app.delete('/delete-pdf/:id', async (req, res) => {
//   try {
//     const pdf = await PdfModel.findByIdAndDelete(req.params.id);
//     if (!pdf) {
//       return res.status(404).send({ message: 'PDF not found' });
//     }
//     res.send({ message: 'PDF deleted successfully' });
//   } catch (error) {
//     res.status(500).send({ message: 'Error deleting PDF' });
//   }
// });
app.delete("/delete-pdf/:id", authControllerPdf.deletedPdf);
// Edit PDF title
app.put('/edit-pdf-title/:id', async (req, res) => {
  try {
    const { title } = req.body;
    const pdf = await PdfModel.findByIdAndUpdate(req.params.id, { title }, { new: true });
    if (!pdf) {
      return res.status(404).send({ message: 'PDF not found' });
    }
    res.send({ message: 'PDF title updated successfully', pdf });
  } catch (error) {
    res.status(500).send({ message: 'Error updating PDF title' });
  }
});




// const upload = multer({ dest: "uploads/" });

// Load Deepgram API key from environment variables
const apiKey = "8487ba55a2085e032b522bce90417893c79e1f1b";

// Endpoint for Text-to-Speech (TTS)
app.post("/tts", (req, res) => {
  const { text } = req.body;

  const url = "https://api.deepgram.com/v1/speak?model=aura-asteria-en";
  const data = JSON.stringify({ text });

  const options = {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  const ttsReq = https.request(url, options, (ttsRes) => {
    if (ttsRes.statusCode !== 200) {
      return res
        .status(ttsRes.statusCode)
        .json({ error: `HTTP error! Status: ${ttsRes.statusCode}` });
    }

    const dest = fs.createWriteStream("output.mp3");
    ttsRes.pipe(dest);
    dest.on("finish", () => {
      res.sendFile(path.resolve("output.mp3"));
    });
  });

  ttsReq.on("error", (error) => {
    res.status(500).json({ error });
  });

  ttsReq.write(data);
  ttsReq.end();
});

// Endpoint for Speech-to-Text (STT)
app.post("/stt", upload.single("audio"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const audio = fs.readFileSync(file.path);
    const response = await axios.post(
      "https://api.deepgram.com/v1/listen",
      audio,
      {
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "audio/wav", // Adjust the content type based on your audio format
        },
      }
    );

    fs.unlinkSync(file.path); // Clean up the uploaded file

    res.json({
      transcript: response.data.results.channels[0].alternatives[0].transcript,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
