import { IronSession } from "iron-session";
import { SessionDetails } from "../types";
import Link from "next/link";
import { Passwords } from "./Passwords";

const WelcomeUser = ({ session }: { session: IronSession<SessionDetails> }) => {
  if (session.isLoggedIn) {
    return (
      <>
        <h1 className="text-2xl text-center md:text-start mb-2">
          Welcome, {session.username}! 👋
        </h1>
        <p className="mb-2">
          <Link className="btn btn-link px-1 text-lg" href={"/profile"}>
            Click here
          </Link>{" "}
          to setup or change your security pin
        </p>
        <h2 className="mb-2">Your passwords 🔐</h2>

        {session.passwords && session.passwords.length > 0 ? (
          <Passwords
            passwords={session.passwords}
            userID={session.userID!}
            securityPin={session.securityPin}
          />
        ) : (
          <p>
            You have no passwords saved.{" "}
            <Link href={"/save"} className="btn btn-link px-1 text-lg">
              Get started now!
            </Link>
          </p>
        )}
      </>
    );
  }

  return (
    <>
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
    </>
  );
};

export default WelcomeUser;
