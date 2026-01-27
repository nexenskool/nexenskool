export const setCookie = (res, name, token) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 24 * 60 * 60,
  };

  res.cookies.set(name, token, options);
};
