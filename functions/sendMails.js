require("dotenv").config();
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function handler(event, context) {
  const body = JSON.parse(event.body);
  console.log("BODY ===> ", body);
  const { firstname, taxes, email } = body;

  let economiePotentielle = taxes > 10000 ? String(10000) : String(taxes);
  let pronostic = String(taxes - economiePotentielle);

  const userMail = {
    to: process.env.TEST_MAIL,
    from: process.env.SENDGRID_SENDER,
    template_id: "d-a22be84ea0574aed8b70a3f9a7c5eae7",
    dynamicTemplateData: { firstname, taxes, economiePotentielle, pronostic },
  };
  const adminMail = {
    to: process.env.TEST_MAIL,
    from: process.env.SENDGRID_SENDER,
    subject: "Serverless X SendGrid is Awesome.",
    template_id: "d-98824d75a0134b489f89060ff13e88c4",
    dynamicTemplateData: body,
  };
  const emails = [userMail, adminMail];

  try {
    let res = await sgMail.send(emails);
    console.log("RESPONSE ===> " + res);
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Emails sent. ✅" }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (err) {
    console.log("ERROR ===> " + err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Failed to send emails. ❌", error: err }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}
