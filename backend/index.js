const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files
// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
// mongoose
//   .connect(
//     "",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

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

// Routes

// Register route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const newEmployee = new EmployeeModel({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(), // Consider hashing the password
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // Assuming userId is a field in your user object
          const userId = user._id; // Adjust this based on your user model

          // Sending userId along with "Success" message in the response
          res.json({ message: "Success", userId: userId });
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No record existed");
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
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
app.post("/upload-pdf", upload.single("pdf"), async (req, res) => {
  try {
    const { userId } = req.body;
    const pdfPath = req.file.path;

    // Check if the user has an existing PDF
    let existingPdf = await PdfModel.findOne({ userId: userId });

    if (existingPdf) {
      // Create a new version of the PDF
      const newVersionPdf = new PdfModel({
        userId: userId,
        pdfPath: pdfPath,
      });
      await newVersionPdf.save();
      res
        .status(200)
        .json({
          message: "New version of PDF added successfully",
          pdf: newVersionPdf,
        });
    } else {
      // Create a new PDF entry
      const newPdf = new PdfModel({
        userId: userId,
        pdfPath: pdfPath,
      });
      await newPdf.save();
      res
        .status(201)
        .json({ message: "PDF uploaded successfully", pdf: newPdf });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/user-pdfs/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userPdfs = await PdfModel.find({ userId });
    res.status(200).json(userPdfs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching PDFs", error: error.message });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
