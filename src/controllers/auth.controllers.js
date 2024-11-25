const authServices = require('../services/auth.services');

exports.loginGoogle = authServices.loginGoogle;

exports.callbackGoogle = [
  authServices.callbackGoogle,
  async (req, res) => {
    try {
      const response = await authServices.login(req.user);
      if(!response) throw new Error('Failed to log in user');

      res.cookie('token', response.token, { httpOnly: true, sameSite: 'none', secure: true });
      return res.status(200).json({ success: true, message: response.message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
]

exports.logout = async (req, res) => {
  try {
    req.logout();
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: 'User logged out successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}