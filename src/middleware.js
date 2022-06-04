export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "경일고 야자 출석부";
  res.locals.loggedInTeacher = req.session.teacher || {};
  next();
};

// 로그인 되어 있으면 통과하는 middleware
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

// 로그인 되어 있지 않으면 통과하는 middleware
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};
