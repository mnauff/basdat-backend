import bcrypt from "bcrypt";

export async function hashPw(pw) {
  return await bcrypt.hash(pw, 10);
}

export async function comparePw(pw, hash) {
  return await bcrypt.compare(pw, hash);
}
