import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Usage: node scripts/hash-password.mjs 'A-strong-password-at-least-12-chars'");
  process.exit(1);
}
const hash = await bcrypt.hash(password, 12);
console.log(hash);