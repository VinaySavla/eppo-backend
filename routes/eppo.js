const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Appointments } = require("../models");
const { Professional } = require("../models");
const { Reviews } = require("../models");
// const { Status } = require("../models");
const { User } = require("../models");
const { PhoneOtp } = require("../models");
const axios = require('axios');
// const { ChatSession } = require("../models");



// OTP
// router.post("/phoneOtp", async (req, res) => {
//   const bodyData = req.body;
//   console.log(bodyData)
//   var OTPpass = Math.floor(1000 + Math.random() * 9000);
//   const createResponse = await PhoneOtp.create({
//     MobileNumber: bodyData.MobileNumber,
//     OTP: OTPpass,
//   });

//   res.json(createResponse);
// });

router.post("/sendOtp", async (req, res) => {
  const bodyData = req.body;
  // const MobileNumber = req.query.MobileNumber;
  const MobileNumber = bodyData.MobileNumber;
  var OTPpass = Math.floor(1000 + Math.random() * 9000);
  const createResponse = await PhoneOtp.create({
    MobileNumber: MobileNumber,
    OTP: OTPpass,
  });
  // const verification = await PhoneOtp.findOne({
  //   where: {
  //     MobileNumber: MobileNumber,
  //   },
  //   order: [["Timestamp", "DESC"]],
  // });
  // console.log(OTPpass);
  try {
    const otpSendResponse = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: "gQJ4d09tEbC8zw3ARNyxViTeSLYpBhWsGOlcf27aPU1FmDIrn6eSFdwJnGMKkRZIm0ls8L7hWOQBP1jT",
        variables_values: OTPpass,
        route: "otp",
        numbers: `${MobileNumber}`
      },
    });

    res.json(otpSendResponse.data);
  }
  catch (error) {
    console.error("Error")
  }
});

router.post("/verifyUserOtp", async (req, res) => {
  // const MobileNumber = req.params.MobileNumber;
  const bodyData = req.body;
  const MobileNumber = bodyData.MobileNumber;
  const verification = await PhoneOtp.findOne({
    where: {
      MobileNumber: MobileNumber,
    },
    order: [["Timestamp", "DESC"]],
  });
  // console.log(verification.dataValues);
  // console.log(verification.OTP);
  // console.log(bodyData.OTP);

  if (verification.OTP == bodyData.OTP) {
    // delete bodyData.OTP;
    const createResponse = await User.create(bodyData);
    verification.dataValues['authentication'] = true;
    // res.json({"authentication": true})
    res.json({ createResponse })
  } else {
    verification.dataValues['authentication'] = false;
    // res.send({"authentication": false});
    // res.send({"authentication": false});
    res.json({ verification })
  }
  // console.log(bodyData.OTP)
  // console.log(verification.OTP);

  // res.json({ verification });
});


//User
// Creates a new user on database
router.post("/userData", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await User.create(bodyData);
  res.json(createResponse);
});

router.put("/userData/:id", async (req, res) => {
  const bodyData = req.body;
  const UserId = req.params.id;
  const userData = await User.update(bodyData, {
    where: {
      Id: UserId,
    },
  });
  res.json(userData);
});

// Gets user data by phone number
router.get("/userData/:MobileNumber", async (req, res) => {
  const MobileNumber = req.params.MobileNumber;
  const userData = await User.findAll({
    where: {
      MobileNumber: MobileNumber,
    },
    include: {
      model: Appointments,
      as: "appointment",
    },
  });
  res.json({ users: userData });
});

//End User

//Professional

router.post("/verifyProfessionalOtp", async (req, res) => {
  // const MobileNumber = req.params.MobileNumber;
  const bodyData = req.body;
  const MobileNumber = bodyData.MobileNumber;
  const verification = await PhoneOtp.findOne({
    where: {
      MobileNumber: MobileNumber,
    },
    order: [["Timestamp", "DESC"]],
  });
  // console.log(verification.dataValues);
  // console.log(verification.OTP);
  // console.log(bodyData.OTP);

  if (verification.OTP == bodyData.OTP) {
    // delete bodyData.OTP;
    const createResponse = await Professional.create(bodyData);
    verification.dataValues['authentication'] = true;
    // res.json({"authentication": true})
    res.json({ createResponse })
  } else {
    verification.dataValues['authentication'] = false;
    // res.send({"authentication": false});
    // res.send({"authentication": false});
    res.json({ verification })
  }
  // console.log(bodyData.OTP)
  // console.log(verification.OTP);

  // res.json({ verification });
});

// Creates a new professional on database
router.post("/professionalData", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await Professional.create(bodyData);
  res.json(createResponse);
});

router.put("/professionalData/:id", async (req, res) => {
  const bodyData = req.body;
  const ProfessionalId = req.params.id;
  const professionalData = await Professional.update(bodyData, {
    where: {
      Id: ProfessionalId,
    },
  });
  res.json(professionalData);
});

// Gets professional data by phone number
router.get("/professionalData/:MobileNumber", async (req, res) => {
  const MobileNumber = req.params.MobileNumber;
  const professionalData = await Professional.findAll({
    where: {
      MobileNumber: MobileNumber,
    },
    include: {
      model: Appointments,
      as: "appointment",
    },
  });
  res.json({ professionals: professionalData });
});
router.get("/professionalData/:id", async (req, res) => {
  const Id = req.params.id;
  const professionalData = await Professional.findAll({
    where: {
      Id: Id,
    },
    include: {
      model: Appointments,
      as: "appointment",
    },
  });
  res.json({ professionals: professionalData });
});

router.get("/allProfessionalData", async (req, res) => {
  // const MobileNumber = req.params.MobileNumber;
  const professionalData = await Professional.findAll({
    include: {
      model: Appointments,
      as: "appointment",
    },
  });
  res.json({ professionals: professionalData });
});

router.get("/professionalType/:profession", async (req, res) => {
  const Profession = req.params.Profession;
  const professionalData = await Professional.findAll({
    where: {
      Profession: Profession,
    },
    include: {
      model: Appointments,
      as: "appointment",
    },
  });
  res.json({ professionals: professionalData });
});

router.get("/professionalList", async (req, res) => {
  // const MobileNumber = req.params.MobileNumber;
  const professionalData = await Professional.findAll({
    attributes: ['Profession'],
    distinct: true,
    // include: {
    //   model: Appointments,
    //   as: "appointment",
    // },
  });
  res.json({ professionals: professionalData });
});

//End Professional

//Appointment
// Creates a new user on database
router.post("/appointmentsData", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await Appointments.create(bodyData);
  res.json(createResponse);
});

router.get("/appointmentsData/:id", async (req, res) => {
  const Id = req.params.id;
  const appointmentData = await Appointments.findAll({
    where: {
      Id: Id,
    },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Professional,
        as: "professional",
      },
    ],
  });
  res.json({ appointments: appointmentData });
});

router.put("/appointmentData/:id", async (req, res) => {
  const bodyData = req.body;
  const AppointmentId = req.params.id;
  const appointmentData = await Appointments.update(bodyData, {
    where: {
      Id: AppointmentId,
    },
  });
  res.json(appointmentData);
});

//End Appointments

//Reviews
router.post("/review", async (req, res) => {
  const bodyData = req.body;
  const createResponse = await Reviews.create(bodyData);
  res.json(createResponse);
});

router.get("/review/:id", async (req, res) => {
  const Id = req.params.id;
  const reviewData = await User.findAll({
    where: {
      Id: Id,
    },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Professional,
        as: "professional",
      },
    ],
  });
  res.json({ reviews: reviewData });
});

//End Review

//Login
router.post('/userLogin', async (req, res, next) => {
  const user = await User.findOne({ where: { Email: req.body.Email } });
  if (user) {
    //  const password_valid = await bcrypt.compare(req.body.password,user.password);
    password = req.body.Password;
    dbpass = user.Password
    // console.log(password);
    // console.log(dbpass);
    if (password == dbpass) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }

  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});
router.post('/professionalLogin', async (req, res, next) => {
  const professional = await Professional.findOne({ where: { Email: req.body.Email } });
  if (professional) {
    //  const password_valid = await bcrypt.compare(req.body.password,professional.password);
    password = req.body.Password;
    dbpass = professional.Password
    // console.log(password);
    // console.log(dbpass);
    if (password == dbpass) {
      res.status(200).json({ professional });
    } else {
      res.status(400).json({ error: "Password Incorrect" });
    }

  } else {
    res.status(404).json({ error: "User does not exist" });
  }
});


module.exports = router;
