const authServices = require('../services/auth.services');

exports.loginGoogle = authServices.loginGoogle;

exports.callbackGoogle = [
  authServices.callbackGoogle,
  async (req, res) => {
    try {
      const response = await authServices.login(req.user);
      if(!response) throw new Error('Failed to log in user');

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
]