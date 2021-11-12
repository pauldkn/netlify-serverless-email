export async function handler(event, context) {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello world!" }),
  };
}
