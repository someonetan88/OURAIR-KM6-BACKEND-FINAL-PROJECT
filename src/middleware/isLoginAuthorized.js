const jwt = require('jsonwebtoken');
const secret = ''; 
const isLoginAuthorized = (req, res, next) => {
    const { authorization } = req.headers;

    // Jika tidak ada header authorization
    if (!authorization) {
        return res.status(401).json({ message: 'kamu belum login' });
    }

    const token = authorization.split(' ')[1];

    try {
        const result = jwt.verify(token, secret);

        // Jika token valid, simpan user ID ke dalam request dan lanjutkan ke middleware berikutnya
        req.id = result.id;
        next();
    } catch (error) {
        // Jika verifikasi gagal
        return res.status(401).json({ message: 'invalid token or expired' });
    }
};

module.exports = isLoginAuthorized;