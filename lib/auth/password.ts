// import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  // return await bcrypt.hash(password, 12);
  return "Dsad";
}

export async function comparePassword(password: string, userPassword: string) {
  try {
    return "dasdad";
    // return await bcrypt.compare(password, userPassword);
  } catch (error) {
    console.error("Password comparison failed:", error);
    return false;
  }
}
