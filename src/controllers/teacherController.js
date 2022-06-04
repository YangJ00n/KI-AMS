import Teacher from "../models/Teacher";
import bcrypt from "bcrypt";

export const getJoin = (_, res) => res.render("join");
export const postJoin = async (req, res) => {
  const {
    body: { name, password, password2, secret },
  } = req;

  if (password !== password2) {
    return res.status(400).render("join");
  }

  if (secret !== process.env.JOIN_SECRET) {
    return res.status(400).render("join");
  }

  try {
    await Teacher.create({ name, password });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join");
  }
};

export const getLogin = (_, res) => res.render("login");
export const postLogin = async (req, res) => {
  const {
    body: { name, password },
  } = req;

  const teacher = await Teacher.findOne({ name });

  if (!teacher) {
    return res.status(400).render("login");
  }

  const ok = await bcrypt.compare(password, teacher.password);
  if (!ok) {
    return res.status(400).render("login");
  }

  // session에 정보 추가
  req.session.loggedIn = true;
  req.session.teacher = teacher;

  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
