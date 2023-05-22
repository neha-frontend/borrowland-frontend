/* eslint-disable no-unused-vars */

import Persona from "persona";

const personaClient = new Persona.Client({
  templateId: process.env.PERSONA_TEMPLATE_ID,
  environment: "sandbox",
  onReady: () => personaClient.open(),
  onComplete: ({ inquiryId, status, fields }) => {
    // Inquiry completed. Optionally tell your server about it.
    console.log(`Sending finished inquiry ${inquiryId} to backend`);
  },
  onCancel: ({ inquiryId, sessionToken }) => console.log("onCancel"),
  onError: (error) => console.log(error),
});

export default personaClient;
