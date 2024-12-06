// GlobalState.ts
let sharedVariable: String = "showCaptcha"; // Replace `any` with the type you need

export const getSharedVariable = () => sharedVariable;

export const setSharedVariable = (value: any) => {
  console.log("setSharedVariable", value);
  sharedVariable = value;
};
