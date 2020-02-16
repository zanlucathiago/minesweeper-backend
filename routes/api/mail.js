const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const output = `
  <p>Você tem uma nova solicitação de contato</p>
  <h3>Detalhes do Contato</h3>
  <ul>  
    <li>Nome: ${req.body.name}</li>
    <li>E-mail: ${req.body.email}</li>
    <li>Telefone: ${req.body.phone}</li>
  </ul>
  <h3>Mensagem</h3>
  <p>${req.body.message}</p>
`;

  let transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
      user: 'minesweeper-online@hotmail.com', // generated ethereal user
      pass: 'r5+a3*LTLHMatsM', // generated ethereal password
    },
  });

  let mailOptions = {
    from: 'minesweeper-online@hotmail.com', // sender address
    to: 'zanlucathiago@gmail.com', // list of receivers
    subject: 'Solicitação de Contato do Campo Minado', // Subject line
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(401).send(error);
      return console.error(error);
    }

    res.send('Mensagem enviada!');
  });
});

module.exports = router;
