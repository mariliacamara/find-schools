require("dotenv").config();

module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_WHATSAPP_NUMBER,
    to: process.env.YOUR_WHATSAPP_NUMBER,
  },
  api: {
    url: `${process.env.MATRICULA_RIO_API}`,
    payload: {
      idBairro: 144, // Campo Grande
      idSerie: 10,
      tipoVaga: 2, 
      GEO: 0, 
      GUID: process.env.GUID, 
      sexo: 1, // 1 - Masculino, 2 - Feminino
      Id_Tipo_Aluno: 1,
      transf: true,
      matricula: process.env.MATRICULA,
    },
  },
  targetSchools: process.env.TARGET_SCHOOLS,
};
