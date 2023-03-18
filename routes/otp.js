const axios = require('axios');
const router = require("express").Router();

router.get("/send", async (req, res) => {
    const phoneNumber = req.query.phoneNumber;

    const otpSendResponse = await axios.get("https://api.msg91.com/api/v5/otp", {
        params: {
            template_id: "61791e64d19ae14b7a68050c",
            authkey: "325040ASu3ipxLGc5e81cbbaP1",
            mobile: `91${phoneNumber}`
        },
    });

    res.json(otpSendResponse.data);
});

router.get("/resend", async (req, res) => {
    const phoneNumber = req.query.phoneNumber;

    const otpResendResponse = await axios.get("https://api.msg91.com/api/v5/otp/retry", {
        params: {
            retrytype: "text",
            authkey: "325040ASu3ipxLGc5e81cbbaP1",
            mobile: `91${phoneNumber}`
        },
    });

    res.json(otpResendResponse.data);
});

router.get("/verify", async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const otp = req.query.otp;

    const otpVerifyResponse = await axios.get("https://api.msg91.com/api/v5/otp/verify", {
        params: {
            authkey: "325040ASu3ipxLGc5e81cbbaP1",
            mobile: `91${phoneNumber}`,
            otp: otp
        },
    });

    res.json(otpVerifyResponse.data);
});

module.exports = router;