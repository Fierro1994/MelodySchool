import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import { instance, instanceWidthCred } from "../api/api";
import authService from "../services/authService";



let user2 = "";

if(localStorage.getItem("access")){
  const token = localStorage.getItem("access")
  
 user2 = jwtDecode(token);
 switch (user2.roles[0]) {
  case "ROLE_STUDENT":
      user2.roles = "Ученик"
    break;
  case "ROLE_PARENTS":
      user2.roles = "Родитель"
    break;
  case "ROLE_TEACHER":
      user2.roles = "Преподаватель"
    break;
  case "ROLE_DIRECTOR":
      user2.roles = "Директор"
    break;
  case "ROLE_ADMIN":
      user2.roles = "Администратор"
    break;
    
}
}

const now = new Date();

const initialState = {
  token: localStorage.getItem("access"),
  firstName: user2.firstName,
  lastName: user2.lastName,
  email: user2.email,
  _id: user2.id,
  activated: user2.activateEmail,
  roles: user2.roles,
  avatar: user2.avatar,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  listMenuItems: [],
  isEnabled: false,
  onlineTime: localStorage.getItem("lastTimeOnline")
};




export const updateSelectedMenu = createAsyncThunk(
  "auth/updateSelectedMenu",
  async (data,{ rejectWithValue }) => {
   
    try {
      await instanceWidthCred.post("/api/profile/settings/updatemenuelement", {
        userId: data.get("userId"),
        name: data.getAll("name")
      });
     localStorage.removeItem("menuModules")
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getItemsMenu = createAsyncThunk(
  "auth/getItemsMenu",
  async (data,{ rejectWithValue }) => {
    const listItems = []
    if(!localStorage.getItem("menuModules")){
    try {
      const response = await instanceWidthCred.post("/api/profile/settings/getmenuelement", {
        userId: data
      });
      (response.data.body.menu).forEach( (item) =>{
          listItems.push({id: item.id, name:item.name,isEnabled: item.isEnabled, nametwo:item.nametwo})     
       })
       localStorage.setItem("menuModules", JSON.stringify(listItems))
      return listItems;
     
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data,{ rejectWithValue }) => {
    try {
      const token = await instanceWidthCred.post(`/api/auth/register`, {
        email: data.get("email"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        password: data.get("password"),
        avatar: data.get("preview"),
        roles:[data.get("roles")]
      });
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({email, password, checkbox}, { rejectWithValue }) => {
    try {
      const token = await instanceWidthCred.post(`/api/auth/signin`, {
        email: email,
        password: password,
        rememberMe: checkbox
      });
      localStorage.setItem("access", token.data.body.accessToken);
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLastTimeOnline = createAsyncThunk(
  "auth/getLastTimeOnline",
  async ({_id}, { rejectWithValue }) => {
    try {
      const response = await instanceWidthCred.post(`/api/profile/settings/getlasttimeonline`, {
        userId: initialState._id
      });
      var date = new Date(response.data.body.localDateTime)
      var dateFormat = date.getHours() + ":" +  date.getMinutes()
      localStorage.setItem("lastTimeOnline",  dateFormat);
      return response.data.body.localDateTime;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        switch (user.roles[0]) {
          case "ROLE_STUDENT":
              user.roles = "Ученик"
            break;
          case "ROLE_PARENTS":
              user.roles = "Родитель"
            break;
          case "ROLE_TEACHER":
              user.roles = "Преподаватель"
            break;
          case "ROLE_DIRECTOR":
              user.roles = "Директор"
            break;
          case "ROLE_ADMIN":
              user.roles = "Администратор"
            break;
            
        }
        
        return {
          ...state,
          token,
          avatar: user.avatar,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          _id: user.id,
          isEnabled: user.activateEmail,
          roles: user.roles,
        };
       
      } else return { ...state, userLoaded: true };
    },
 
    logoutUser(state, action) {
      authService.logout(state._id)
      localStorage.removeItem("access");
      localStorage.removeItem("menuModules");
      return {
        ...state,
        token: "",
        firstName: "",
          lastName: "",
          email: "",
          _id: "",
          activated: "",
          roles: "",
          avatar: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
  onlineTime: ""
      };
    },
  },
  extraReducers: (builder) => {
   
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending",
      userLoaded: true };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
        return {
          registerStatus: "success",
          userLoaded: false
        };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" ,userLoaded: true};
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload.body.accessToken);
        switch (user.roles[0]) {
          case "ROLE_STUDENT":
              user.roles = "Ученик"
            break;
          case "ROLE_PARENTS":
              user.roles = "Родитель"
            break;
          case "ROLE_TEACHER":
              user.roles = "Преподаватель"
            break;
          case "ROLE_DIRECTOR":
              user.roles = "Директор"
            break;
          case "ROLE_ADMIN":
              user.roles = "Администратор"
            break;
            
        }
        return {
          ...state,
          token: action.payload.body.accessToken,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          _id: user.id,
          activated: user.activateEmail,
          roles: user.roles,
          avatar: user.avatar,
          loginStatus: "success",
          userLoaded: false,
          isEnabled: user.activateEmail
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    builder.addCase(getItemsMenu.fulfilled, (state, action) => {
        return {...state,
          listMenuItems: action.payload
        };
    });
    builder.addCase(getItemsMenu.rejected, (state, action) => {
      return {
        listMenuItems: []
      };
    });
  },
  
});



export const { avatarUpload, loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;