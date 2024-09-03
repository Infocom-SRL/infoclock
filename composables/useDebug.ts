export const useDebug = () => {
  return useState("debug", () => process.env.NODE_ENV == "development");
};
