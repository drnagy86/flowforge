// src/config.ts
export const config = {
  region: import.meta.env.VITE_AWS_REGION!,
  userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID!,
  clientId: import.meta.env.VITE_AWS_CLIENT_ID!,
};


export const externalLinks = {
  github: "https://github.com/drnagy86/flowforge",
  linkedin: "https://www.linkedin.com/in/derrick-nagy-a1b5a3222/",
  docs: "https://docs.flowforge.dev",
};
