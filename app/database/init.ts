import { connect } from "mongoose";

const verifyDBConnection = async () => {
  // doing this here because freshly issuing new connections takes time, instead reuse the connection
  // @ts-ignore
  if (!global.connection) {
    // @ts-ignore
    global.connection = await connect(process.env.DB_URI as string);
    console.log("Connected to Mongo DB");
    return Promise.resolve();
  }

  console.log("Using existing mongo db connection");
  return Promise.resolve();
};

export default verifyDBConnection;
