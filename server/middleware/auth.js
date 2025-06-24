const jwt = require('jsonwebtoken');

exports.protect= (req, res, next )=> {
    const auth= req.headers.autharization;
     if(!auth )  return res.status(404).json({message:""}) 

}
