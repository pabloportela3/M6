var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* muestra vista/diseño. */
router.get('/', function(req, res, next) {
  res.render('contactenos', { 
    isContactenos: true 
  });
});

/*funcionamiento del form*/

router.post('/', async (req, res, next) => {

  var nombre  = req.body.nombre;
  var email = req.body.email;
  var telefono = req.body.tel;
  var comentarios = req.body.comentarios;

  //console.log(req.body);

  var obj = {
   to: 'pabloportelabeltran03@gamil.com',
   subject: 'contacto desde la web',
    html: nombre + " se contacto a traves y quiere mas info a este correo: " + email + ". <br> Además, hizo el siguiente comentario: " + comentarios + ". <br> Su tel es " + telefono 
  };

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PUERTO,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('contactenos', {
    isContacto: true,
    message: 'Mensaje enviado correctamente'
  });
  
 
});  //cierra peticion del POST


module.exports = router;


