export async function handler(event, context) {
  console.log("EVENT ===>", event);
  console.log("BODY ===>", event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "This will receive typeform submissions one day.",
    }),
  };
}
