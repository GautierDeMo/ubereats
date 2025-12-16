import dotenv from "dotenv";
dotenv.config();

export const getEnvVariable = (variableName: string) => {
  const value = process.env[variableName];
  if (!value) throw new Error("Variable not defined in env. file");
  return value;
}
