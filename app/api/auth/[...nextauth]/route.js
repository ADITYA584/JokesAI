import NextAuth from "next-auth"
import { options } from "./options"

const Handler = NextAuth(options);
export {Handler as GET , Handler as POST}

