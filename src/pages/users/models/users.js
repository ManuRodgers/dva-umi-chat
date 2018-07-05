import axios from "axios";
import router from "umi/router";
import getRedirect from "../../../utils/getRedirect";

export default {
  namespace: "users",

  state: {
    username: "",
    password: "",
    confirm: "",
    kind: "",
    msg: "",
    isAuth: false,
    redirectTo: "",
    avatar: "",
    // for boss
    title: "",
    description: "",
    company: "",
    money: "",
    // for genius
    job: "",
    profile: "",
    salary: ""
  },

  reducers: {
    getErrorMsg(state, { msg }) {
      return { ...state, msg, redirectTo: "" };
    },
    registerUserSync(state, { username, kind }) {
      return {
        ...state,
        msg: "",
        isAuth: true,
        username,
        kind
      };
    },
    loginBossSync(
      state,
      { username, kind, company, money, title, description, avatar }
    ) {
      return {
        ...state,
        msg: "",
        isAuth: true,
        redirectTo: getRedirect({ kind, avatar }),
        company,
        money,
        title,
        description,
        avatar,
        username,
        kind
      };
    },
    loginGeniusSync(state, { username, kind, avatar, job, profile, salary }) {
      return {
        ...state,
        msg: "",
        isAuth: true,
        redirectTo: getRedirect({ kind, avatar }),
        username,
        kind,
        avatar,
        job,
        profile,
        salary
      };
    },
    initUserSync(state, { currentUser }) {
      console.log(currentUser);

      return {
        ...state,
        redirectTo: getRedirect({
          kind: currentUser.kind,
          avatar: (() => {
            return currentUser.avatar ? currentUser.avatar : "";
          })()
        }),
        msg: "",
        isAuth: true,
        ...currentUser
      };
    },
    updateBossSync(
      state,
      { username, kind, avatar, company, money, description, title }
    ) {
      return {
        ...state,
        redirectTo: getRedirect({ kind, avatar }),
        isAuth: true,
        username,
        kind,
        avatar,
        company,
        money,
        description,
        title
      };
    },
    updateGeniusSync(state, { username, kind, avatar, job, profile, salary }) {
      return {
        ...state,
        redirectTo: getRedirect({ kind, avatar }),
        isAuth: true,
        username,
        kind,
        avatar,
        job,
        profile,
        salary
      };
    }
  },

  effects: {
    *loginUserAsync({ username, password }, { call, put }) {
      const { status, data } = yield axios.post("/api/user/login/", {
        username,
        password
      });
      if (status === 200 && data.code === 0) {
        if (data.existingUser.kind === "boss") {
          console.log(`boss login`);
          const {
            username,
            kind,
            company,
            money,
            title,
            description,
            avatar
          } = data.existingUser;
          return yield put({
            type: "loginBossSync",
            username,
            kind,
            company,
            money,
            title,
            description,
            avatar
          });
        } else {
          console.log(`genius login`);
          console.log(data.existingUser);
          const {
            username,
            kind,
            avatar,
            job,
            profile,
            salary
          } = data.existingUser;
          return yield put({
            type: "loginGeniusSync",
            username,
            kind,
            avatar,
            job,
            profile,
            salary
          });
        }
      } else {
        return yield put({ type: "getErrorMsg", msg: data.msg });
      }
    },
    *registerUserAsync({ username, password, kind }, { call, put }) {
      const { status, data } = yield axios.post("/api/user/register/", {
        username,
        password,
        kind
      });
      if (status === 200 && data.code === 0) {
        yield console.log(data.newUser);
        const { username, kind } = yield data.newUser;
        return yield put({ type: "registerUserSync", username, kind });
      } else {
        return yield put({ type: "getErrorMsg", msg: data.msg });
      }
    },
    *initUserAsync({ username, kind }, { call, put }) {
      const { status, data } = yield axios.get("/api/user/info");
      if (status === 200 && data.code === 0) {
        return data;
      } else {
        return yield put({ type: "getErrorMsg", msg: data.msg });
      }
    },
    *updateBossAsync(
      { avatar, company, title, description, money },
      { call, put, select }
    ) {
      const { status, data } = yield axios.post("/api/user/bossUpdate", {
        avatar,
        company,
        title,
        description,
        money
      });
      if (status === 200 && data.code === 0) {
        const {
          username,
          kind,
          avatar,
          company,
          money,
          description,
          title
        } = data.updatedBoss;
        return yield put({
          type: "updateBossSync",
          username,
          kind,
          avatar,
          company,
          money,
          description,
          title
        });
      } else {
        return yield put({ type: "getErrorMsg", msg: data.msg });
      }
    },
    *updateGeniusAsync(
      { avatar, job, profile, salary },
      { call, put, select }
    ) {
      const { status, data } = yield axios.post("/api/user/geniusUpdate", {
        avatar,
        job,
        profile,
        salary
      });
      if (status === 200 && data.code === 0) {
        console.log(data.updatedGenius);
        const {
          username,
          kind,
          avatar,
          job,
          profile,
          salary
        } = data.updatedGenius;

        return yield put({
          type: "updateGeniusSync",
          username,
          kind,
          avatar,
          job,
          profile,
          salary
        });
      } else {
        return yield put({ type: "getErrorMsg", msg: data.msg });
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(location => {
        console.log(location);
        const { isAuth } = window.g_app._store.getState().users;
        if (isAuth) {
          console.log(`successful auth`);
        } else {
          console.log(`unsuccessful auth`);
          const publicList = ["/users/login", "/users/register"];
          const { pathname } = location;
          if (publicList.includes(pathname)) {
            return null;
          } else {
            return router.push("/users/login");
          }
        }
      });
    }
  }
};
