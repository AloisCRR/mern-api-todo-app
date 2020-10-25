export default function envValidate() {
  let requiredEnv = [
    "JWT_SECRET",
    "PORT",
    "MONGO_URI",
    "AZURE_ENDPOINT",
    "AZURE_ENDPOINT_API_KEY",
  ];

  let unsetEnv = requiredEnv.filter(
    (env) => typeof process.env[env] == "undefined"
  );

  if (unsetEnv.length > 0) {
    throw new Error(
      "Required ENV variables are not set: [" + unsetEnv.join(", ") + "]"
    );
  }
}
