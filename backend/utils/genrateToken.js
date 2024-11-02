import dotevn from 'dotenv'

import jwt from 'jsonwebtoken'
const secret =process.env.JWT_SECRET;




const generateToken = (userId) => {
    const token= jwt.sign({ userId }, secret, {
        expiresIn: '15d',
    })
    // res.cookie('jwt', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     sameSite: 'strict',
    //     maxAge: 15 * 24 * 60 * 60 * 1000
    // })
    return token;
    
}

export default generateToken