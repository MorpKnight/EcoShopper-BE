const authServices = require('../services/auth.services');

exports.loginGoogle = authServices.loginGoogle;

exports.callbackGoogle = [
  authServices.callbackGoogle,
  async (req, res) => {
    try {
      const response = await authServices.login(req.user);
      if(!response) throw new Error('Failed to log in user');

      res.cookie('token', response.token, { httpOnly: true, sameSite: 'none', secure: true });
      res.status(200).json({ success: true, message: response.message });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
]

exports.logout = async (req, res) => {
  try {
    req.logout();
    res.clearCookie('token');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.registerEmail = async (req, res) => {
  try {
    const response = await authServices.registerEmail(req.body);
    if(!response) throw new Error('Failed to register user');

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.loginEmail = async (req, res) => {
  try {
    const response = await authServices.loginEmail(req.body);
    if(!response) throw new Error('Failed to log in user');

    res.cookie('token', response.token, { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}