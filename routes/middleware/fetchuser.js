var jwt = require('jsonwebtoken');
const SECRET_MSG = 'E-TICKET';

const fetchuser = (req, res, next) => {
    
    // Get the user from jwt token and add id to req object

    const token = req.header('authToken');  // token is stored in "auth-token" header
    console.log(token);
    if (!token) {
        res.status(401).send({ error: "Authentication did not happen" })
    }
    try {
        const data = jwt.verify(token, SECRET_MSG); // returns id from header "auth-token"

        req.user = data; // data sends "id" and "iat"

        next();  // calls async function of /getuser
    } catch (error) {
        res.status(401).send({ error: "Authentication did not happen" })
    }
}

module.exports = fetchuser;