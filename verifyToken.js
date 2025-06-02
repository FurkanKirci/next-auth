const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const domain   = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;
// --- JWKS (public-key) istemcisi ---
const jwksClient = jwks({
  jwksUri: `https://${domain}/.well-known/jwks.json`,
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 10 * 60 * 1000,  // 10 dk
});

// JWKS içinden kid’e karşılık gelen public key’i al
function getKey(header, callback) {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// --- asıl middleware ---
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    getKey,
    {
      audience: audience,
      issuer:   `https://${domain}/`,
      algorithms: ["RS256"],
    },
    (err, decoded) => {
      if (err) return res.status(401).json({ message: "Token invalid", error: err });
      req.auth = decoded;           // tüm claim’ler burada
      next();
    }
  );
}

module.exports = verifyToken;
