import { AlgorithmsType } from "@/app/types";
import { getSession } from "@/app/utils/actions";
import {
  decrypt3DES,
  decryptAES,
  decryptBlowfish,
  decryptTwofish,
} from "@/app/utils/decryptors";

export const POST = async (request: Request) => {
  const session = await getSession();
  if (!session.isLoggedIn) return new Response("Unauthorized", { status: 401 });

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

    case "Blowfish": {
      decrypted = decryptBlowfish(value, key);
    }

    case "Twofish": {
      decrypted = decryptTwofish(value, key);
    }
  }

  return Response.json({ password: decrypted });
};
