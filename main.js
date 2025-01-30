const axios = require("axios");
const twilio = require("twilio");
const config = require("./config");

const client = new twilio(config.twilio.accountSid, config.twilio.authToken);

async function sendWhatsAppMessage(schoolName) {
  try {
    await client.messages.create({
      from: config.twilio.from,
      to: config.twilio.to,
      body: `✅ Escola encontrada: ${schoolName}! Verifique agora.`,
    });
    console.log(`[NOTIFICATION SENT] ${schoolName}`);
  } catch (error) {
    console.error("[TWILIO ERROR]", error.message);
  }
}

async function checkSchools() {
  try {
    const response = await axios.post(config.api.url, config.api.payload, {
      headers: { "Content-Type": "application/json" },
    });

    const schools = response.data.escolas;
    for (const school of schools) {
      if (config.targetSchools.includes(school.Nome)) {
        await sendWhatsAppMessage(school.Nome);
        return;
      }
    }
  } catch (error) {
    console.error("[API ERROR]", error.message);
  }
}

(async function startMonitoring() {
  console.log("[STARTING] Monitoring schools...");
  while (true) {
    await checkSchools();
    console.log("[WAITING] Checking again in 3 minutes...");
    await new Promise((resolve) => setTimeout(resolve, 180000));
  }
})();
