import { AlgorithmsType } from "@/app/types";
import { decrypt3DES, decryptAES } from "@/app/utils/decryptors";

export const POST = async (request: Request) => {
  const {
    value,
    key,
    algo,
  }: { value: string; key: string; algo: AlgorithmsType } =
    await request.json();

  let decrypted: string;

  switch (algo) {
    case "Advanced Encryption Standard": {
      decrypted = decryptAES(value, key);
      break;
    }

    case "Triple DES": {
      decrypted = decrypt3DES(value, key);
      break;
    }

    default: {
      decrypted = "Hello world!";
    }
  }

  return Response.json({ password: decrypted });
};
