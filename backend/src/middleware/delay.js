const delay = (req, res, next) =>{
    setTimeout(()=>{
        next();
    }, 1000)
}

module.exports = delay