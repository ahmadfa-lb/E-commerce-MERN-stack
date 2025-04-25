import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = {_id: token_decode.id}
        req.user = {_id: token_decode.id}
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// New verifyToken middleware function
const verifyToken = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Authentication required. Please login.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decoded.id }  // Store user ID in req.user object
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Invalid or expired token' })
    }
}

export { authUser as default, verifyToken }