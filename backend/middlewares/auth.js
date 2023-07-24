const isAuth = async (req, res, next) => {
    //Checks if a user making a request is logged in
    if (req.session.isLoggedIn){
        next();
    } else {
        res.status(401);
        res.json({message: "access denied"})
    }
}

module.exports = { isAuth }