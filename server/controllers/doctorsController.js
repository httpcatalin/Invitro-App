const axios = require('axios');

exports.getAllDoctors = async (req, res) => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    
    const doctors = await axios.get(
      `${process.env.INVITROAPI}/api/employees`,
      { httpsAgent }
    );

    res.send(doctors.data);
  } catch (e) {
    res.send({ message: e.message });
  }
};