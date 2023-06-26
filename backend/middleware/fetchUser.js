const jwt = require('jsonwebtoken');
const JWT_SECRET = 'helenisagoodg$irl';

const fetchUser = (req, res, next) => {

    //Get the user from the jwt token and add id to req object.
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error: "Please authenticate using a valid token."});
    }

    try {

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        //If token is wrong, this will be returned.
        res.status(401).send({error: "Please authenticate using a validdd token."});
    }

}

module.exports = fetchUser;