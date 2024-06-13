const bcrypt = require("bcrypt");
const EmployeeModel = require("../../models/employee");
const sendOTPEmail=require("../../utils/sendOTP")
function generateOTP() {
  // return crypto.randomBytes(3).toString('hex'); // 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}
const register= async (req, res) => {
  try {
    const { username, email, password, dob, universityname } = req.body;

    // Validate required fields
    if (!username || !email || !password || !dob || !universityname) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    // Validate date format
    const dateOfBirth = new Date(dob);
    if (isNaN(dateOfBirth.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format for Date of Birth." });
    }

    // Check if the user already exists
    const existingEmployee = await EmployeeModel.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ error: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const newEmployee = new EmployeeModel({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
      dob: dateOfBirth,
      universityname: universityname.trim(),
    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    // Send success response
    res.status(201).json({
      message: "Employee created successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const login= async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });

    if (user) {
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const otp = generateOTP();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

        // Store OTP in the user's document
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP via email
        await sendOTPEmail(email, otp);

        // Sending userId along with "Success" message in the response
        res.status(200).json({ message: "OTP sent to your email" });
      } else {
        res.status(401).json({ message: "The password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "No record existed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  register,
  login
};
