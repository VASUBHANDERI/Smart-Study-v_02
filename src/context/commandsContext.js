import createDataContext from "./createDataContext";
import { useState } from "react";

const commandsReducer = (state, action) => {
  switch (action.type) {
    case "mkdir":
      var i = state.dirs.length;
      var found = false;
      while (i--) {
        if (action.payload == state.dirs[i].name) {
          found = true;
          break;
        }
      }

      if (!found) {
        var new_dirs = [];
        if (state.dirs.length > 0) {
          new_dirs = [
            ...state.dirs,
            {
              name: action.payload,
              id: state.dirs[state.dirs.length - 1].id + 1,
              files: [],
              type: "dir",
            },
          ];
        } else {
          new_dirs = [
            ...state.dirs,
            {
              name: action.payload,
              id: 1,
              files: [],
              type: "dir",
            },
          ];
        }
        state.dirs = new_dirs;
        state.showList = false;
        state.errorMsg = null;
        state.message = `${action.payload} created under the ${state.currentDir} directory`;
      } else {
        state.errorMsg = `${action.payload} already exists!`;
        state.message = null;
      }

      state.showList = false;
      state.showCurrentDir = false;
      return state;

    case "rmdir":
      var i = state.dirs.length;
      var found = false;
      while (i--) {
        if (state.dirs[i].name === action.payload) {
          state.dirs.splice(i, 1);
          found = true;
          state.message = `${action.payload} removed successfully`;
        }
      }
      if (!found) {
        state.errorMsg = `${action.payload} directory not found`;
      }
      state.showList = false;
      state.showCurrentDir = false;
      return state;

    case "ls":
      if (state.currentDirName == "root") {
        state.list = state.dirs.concat(state.files);
      } else {
        var dir_id = 0;
        var i = state.dirs.length;
        while (i--) {
          if (state.dirs[i].name == state.currentDirName) {
            dir_id = i;
          }
        }

        state.list = state.dirs[dir_id].files;
      }

      if (state.list.length > 0) {
        state.showList = true;
        state.showCurrentDir = false;
        state.errorMsg = null;
        state.message = null;
      } else {
        state.errorMsg = "No content found!";
        state.showList = false;
        state.message = null;
        state.showCurrentDir = false;
      }
      // state.io = [...state.io, {
      //   input:"ls",
      //   outputList: state.list,
      //   outputError: state.errorMsg
      // }]
      // console.log(state.io)
      return state;

    case "pwd":
      state.showList = false;
      state.errorMsg = null;
      state.showCurrentDir = true;
      state.message = null;
      return state;

    case "cd":
      if (action.payload == "root" || action.payload == "..") {
        state.currentDir = "root";
        state.currentDirName = "root";
        state.message = "current directory is shifted to root";
        state.errorMsg = null;
      } else {
        var i = state.dirs.length;
        var found = false;
        while (i--) {
          if (state.dirs[i].name === action.payload) {
            state.currentDir = `root/${action.payload}`;
            state.currentDirName = `${action.payload}`;
            found = true;
            break;
          }
        }
        if (!found) {
          state.errorMsg = "Directory not found!";
          state.message = null;
        } else {
          state.message = `current directory is shifted to ${action.payload}`;
          state.errorMsg = null;
        }
      }

      state.showList = false;
      state.showCurrentDir = false;

      return state;

    case "clear":
      state.showCurrentDir = false;
      state.showList = false;
      state.errorMsg = null;
      state.message = null;
      state.io = [];
      state.showIO = false;
      return state;

    case "touch":
      if (state.currentDirName == "root") {
        var i = state.files.length;
        var found = false;
        while (i--) {
          if (action.payload == state.files[i].name) {
            found = true;
            break;
          }
        }
        if (!found) {
          var new_files;
          if (state.files.length > 0) {
            new_files = [
              ...state.files,
              {
                name: action.payload,
                id: state.files[state.files.length - 1].id + 1,
                content: "",
                type: "file",
              },
            ];
          } else {
            new_files = [
              ...state.files,
              {
                name: action.payload,
                id: 1,
                content: "",
                type: "file",
              },
            ];
          }
          state.errorMsg = null;
          state.message = `${action.payload} file is created in the ${state.currentDirName} directory`;
          state.files = new_files;
        } else {
          state.errorMsg = `${action.payload} already exists`;
          state.message = null;
        }
      } else {
        var dir_id = 0;
        var i = state.dirs.length;
        var new_files;
        while (i--) {
          if (state.dirs[i].name == state.currentDirName) {
            dir_id = i;
            break;
          }
        }

        var j = state.dirs[dir_id].files.length;
        var found = false;
        while (j--) {
          if (action.payload == state.dirs[dir_id].files[j].name) {
            found = true;
            break;
          }
        }

        if (!found) {
          if (state.dirs[dir_id].files.length > 0) {
            new_files = [
              ...state.dirs[dir_id].files,
              {
                name: action.payload,
                id:
                  state.dirs[dir_id].files[state.dirs[dir_id].files.length - 1]
                    .id + 1,
                content: "",
                type: "file",
              },
            ];
          } else {
            new_files = [
              ...state.dirs[dir_id].files,
              {
                name: action.payload,
                id: 1,
                content: "",
                type: "file",
              },
            ];
          }
          state.errorMsg = null;
          state.message = `${action.payload} file is created in the ${state.currentDirName} directory`;
          state.dirs[dir_id].files = new_files;
        } else {
          state.errorMsg = `${action.payload} already exists`;
          state.message = null;
        }
      }

      state.showList = false;
      state.showCurrentDir = false;
      return state;

    case "rm":
      if (state.currentDirName == "root") {
        var i = state.files.length;
        var found = false;
        while (i--) {
          if (state.files[i].name === action.payload) {
            state.files.splice(i, 1);
            found = true;
            state.message = `${action.payload} removed successfully`;
          }
        }
        if (!found) {
          state.errorMsg = `${action.payload} file not found`;
        } else {
          state.errorMsg = null;
        }
      } else {
        var dir_id;
        var i = state.dirs.length;
        var new_files;
        while (i--) {
          if (state.dirs[i].name == state.currentDirName) {
            dir_id = i;
            break;
          }
        }

        var i = state.dirs[dir_id].files.length;
        var found = false;
        while (i--) {
          if (state.dirs[dir_id].files[i].name === action.payload) {
            state.dirs[dir_id].files.splice(i, 1);
            found = true;
            state.message = `${action.payload} removed successfully`;
          }
        }
        if (!found) {
          state.errorMsg = `${action.payload} file not found`;
        } else {
          state.errorMsg = null;
        }
      }
      state.showList = false;
      state.showCurrentDir = false;
      return state;
    case "storeDir":
      state.cDir = [...state.cDir, state.currentDir];
      return state;
    case "storeIO":
      state.showIO = true;
      state.io = [
        ...state.io,
        {
          id: state.io.length + 1,
          input: action.payload,
          outputList: state.list,
          outputError: state.errorMsg,
          showList: state.showList,
          currentDir: state.cDir[state.cDir.length - 1],
        },
      ];
      console.log(state.io);
      console.log(state.io[state.io.length - 1].outputList);
      return state;

    case "refresh":
      state.showList = false;
      state.showCurrentDir = false;
      state.errorMsg = null;
      state.message = null;
      return state;
    default:
      state.showList = false;
      state.showCurrentDir = false;
      state.errorMsg = `Invalid command!`;
      state.message = null;
      return state;
  }
};

const execute = (dispatch) => (input) => {
  if (input == "ls") {
    dispatch({ type: "ls" });
  } else if (input == "pwd") {
    dispatch({ type: "pwd" });
  } else if (input == "clear" || input == "cls") {
    dispatch({ type: "clear" });
  } else {
    const command = input.split(" ")[0];
    const argument = input.replace(`${command} `, "");
    if (argument !== command) {
      dispatch({ type: command, payload: argument });
    } else {
      dispatch({ type: " " });
    }
  }
  if (input != "clear") {
    dispatch({ type: "storeIO", payload: input });
    dispatch({ type: "storeDir" });
  }
};

const refresh = (dispatch) => () => {
  dispatch({ type: "refresh" });
};
export const { Context, Provider } = createDataContext(
  commandsReducer,
  { execute, refresh },
  {
    name: "root",
    id: 1,
    dirs: [],
    files: [],
    showList: false,
    currentDir: "root",
    showCurrentDir: false,
    errorMsg: null,
    message: null,
    showIO: false,
    io: [],
    cDir: ["root"],
    list: [],
    currentDirName: "root",
  }
);
