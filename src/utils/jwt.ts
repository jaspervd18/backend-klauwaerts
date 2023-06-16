import request from "request";
import jwt from "jsonwebtoken";

const getAccessToken = () => {
  const options = {
    method: "POST",
    url: "https://dev-yizwx65hni30hesg.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"7kbrfnG4AatruOiPtXSfkqrmWSpuiNaP","client_secret":"GX4XruzTXtebwYH2ghj9EdTiduuj-qsN9aYjF62SAwwIUL2NC6uy7lSaIaePFn9O","audience":"https://github.com/HoGentProjectenII/2023-backend-gent07","grant_type":"client_credentials"}',
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

const generateToken = async (id: number, email: string) => {
  const accesToken = process.env.AUTH0_CLIENT_SECRET || "";
  const token = jwt.sign({ id, email }, accesToken, { expiresIn: "1d" });
  return token;
};

export { getAccessToken, generateToken };

