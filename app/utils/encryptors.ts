import Blowfish from "blowfish-node";
import crypto from "crypto";
import sjcl from "sjcl";

export const encryptAES = (text: string, key: string) => {
  // option for choosing random bytes for the iv
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
};

export const encrypt3DES = (text: string, key: string) => {
  const md5Key = crypto
    .createHash("md5")
    .update(key)
    .digest("hex")
    .substring(0, 24);
  const cipher = crypto.createCipheriv("des-ede3", md5Key, "");

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const encryptBlowfish = (text: string, key: string) => {
  const bf = new Blowfish(key);
  return bf.encodeToBase64(JSON.stringify({ password: text }));
};

export const encryptTwofish = (text: string, key: string) => {
  return JSON.stringify(sjcl.encrypt(key, text));
};
