export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false
    });
  }

  const { password } = req.body || {};

  if (!password || password !== process.env.SITE_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password"
    });
  }

  res.setHeader(
    "Set-Cookie",
    [
      "site_auth=authenticated",
      "Path=/",
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Max-Age=2592000"
    ].join("; ")
  );

  return res.status(200).json({
    success: true
  });
}
