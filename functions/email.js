import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function handler(event, context) {
  const { name, email, message } = JSON.parse(event.body);
  console.log(`MESSAGE ===> ${name} with ${email}: ${message}`);

  const msg = {
    to: "pauldkn.code@gmail.com",
    from: process.env.SENDGRID_SENDER,
    subject: "Serverless X SendGrid is Awesome.",
    text: `${message} \n from ${name}, ${email}`,
    html: `${message} \n from ${name}, ${email}`,
    template_id: "d-f0861bb543e844fd912d66214bdfacad",
  };

  try {
    let res = await sgMail.send(msg);
    console.log("RESPONSE ===> " + res);
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Email sent. ✅" }),
    };
  } catch (err) {
    console.log("ERROR ===> " + err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Failed to send email. ❌" }),
    };
  }
}
