import jwt from 'jsonwebtoken'
import user from "../model/user.model";

const userauth = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        let decodeToken = jwt.verify(token, process.env.SECRAT_KEY);
        console.log(decodeToken)
        req.decodeToken = decodeToken._id
        let rootuser = await user.findOne({ _id: decodeToken._id, 'tokens.token': token })
        if (!rootuser) { throw new Error('not found user') }
        req.token = token;
        req.rootuser = rootuser
        req.userID = rootuser._id

        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'unauthorized'

        })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    userauth(req, res, () => {
        if (req.decodeToken === req.params.id || req.rootuser.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};


const verifyTokenAndAdmin = (req, res, next) => {
    userauth(req, res, () => {
        if (req.rootuser.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

// export default userauth;
export { userauth, verifyTokenAndAdmin, verifyTokenAndAuthorization }