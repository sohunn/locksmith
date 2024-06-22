import crypto from "crypto";

export const decryptAES = (encrypted: string, key: string) => {
  const textParts = encrypted.split(":");
  const iv = Buffer.from(textParts.shift() as string, "hex");
  const encryptedTextBuffer = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    iv
  );
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf8");
};

export const decrypt3DES = (encrypted: string, key: string) => {
  const md5Key = crypto
    .createHash("md5")
    .update(key)
    .digest("hex")
    .substring(0, 24);
  const decipher = crypto.createDecipheriv("des-ede3", md5Key, "");

  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
