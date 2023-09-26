const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

router.post(
    '/',
    async (req, res) => {
        const { email, password, name, phoneNum } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ email, name, hashedPassword, phoneNum });

        const safeUser = {
            id: user.id,
            email: user.email,
            name: user.name,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

module.exports = router;
