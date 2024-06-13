import Image from "next/image";
import { honk } from "./ui/fonts";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locksmith - Home",
  description:
    "Locksmith is a password manager that provides state of the art security by encrypting your passwords the way you want it.",
};

export default function Home() {
  return (
    <>
      <section className="py-4 md:py-8 bg-accent text-accent-content">
        <div className="container w-[90%] max-w-[1400px] mx-auto">
          <div className="row md:flex gap-4">
            <div className="col md:flex flex-col justify-center">
              <div className="max-w-[383px] mb-2">
                <h1 className="text-3xl">
                  A Password Manager like{" "}
                  <span className={`${honk.className} antialiased`}>
                    no other!
                  </span>
                </h1>
              </div>

              <div className="max-w-[831px] mb-2 md:mb-0">
                <p>
                  Locksmith is a password manager that provides state of the art
                  security by encrypting your passwords the way you want it.
                  Choose over a wide range of encryption algorithms, hash
                  functions, salt rounds, random bytes and much more!
                </p>
              </div>
            </div>

            <div className="col">
              <Image
                src="/hero-img.jpg"
                alt="Encryption procedure"
                width={500}
                height={500}
                className="rounded-lg mx-auto md:mx-0 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container w-[90%] max-w-[1400px] mx-auto">
          <h1 className="text-2xl text-center md:text-start mb-2">
            Secure your passwords!
          </h1>
          <p>
            Get started by{" "}
            <Link className="btn btn-link px-1 text-lg" href={"/register"}>
              creating an account
            </Link>
            or{" "}
            <Link className="btn btn-link px-1 text-lg" href={"/login"}>
              logging in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
