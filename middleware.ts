export { default } from "next-auth/middleware";

// Securing the matching routes...
export const config = { matcher: ["/"] };
