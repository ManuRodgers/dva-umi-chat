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
    redirectTo: ""
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    getErrorMsg(state, { msg }) {
      return { ...state, msg, redirectTo: "" };
    },
    registerUserSync(state, { username, kind }) {
      return {
        ...state,
        redirectTo: "",
        msg: "",
        isAuth: true,
        username,
        kind
      };
    },
    loginUserSync(state, { username, kind }) {
      return {
        ...state,
        msg: "",
        isAuth: true,
        username,
        kind,
        redirectTo: getRedirect({ kind })
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
        const { username, kind } = data.existingUser;
        return yield put({ type: "loginUserSync", username, kind });
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
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(location => {
        console.log(location);

        const { isAuth } = window.g_app._store.getState().users;
        console.log(isAuth);
        if (isAuth) {
          return console.log(`successful auth`);
        } else {
          console.log(`unsuccessful auth`);
          const publicList = ["/users/login", "/users/register"];
          const { pathname } = location;
          if (publicList.includes(pathname)) {
            console.log(`includes`);
            return null;
          } else {
            console.log(`no includes`);
            return router.push("/users/login");
          }
        }
      });
    }
  }
};
