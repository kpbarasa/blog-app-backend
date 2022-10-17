
module.exports = (req, res, next) => {
  try {

    if (req.signedCookies.temp_token) {
      next();
    } 
    
    else {
      res.json({message:'link expired'})
      }
    
    } catch (error) {

      res.sendStatus(404).json('Erro message: '+error)

    }
  };  