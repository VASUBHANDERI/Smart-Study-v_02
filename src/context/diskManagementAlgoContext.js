import { ToastAndroid } from "react-native";
import createDataContext from "./createDataContext";

const algoReducer = (state, action) => {
  switch (action.type) {
    case "changeTheAlgo":
      state.selectedAlgorithm = action.payload.Algo;
      state.scheduleSequence = [];
      state.showScheduledGraph = false;
      state.totalDistance = 0;
      // state.canReRun = true;
      return state;

    case "addRequest":
      if (
        // action.payload.request != state.currentPosition &&
        action.payload.request > 0 &&
        action.payload.request <= state.totalTracks 
        // !state.requestSequence.includes(action.payload.request)
      ) {
        state.requestSequence = [
          ...state.requestSequence,
          parseInt(action.payload.request),
        ];
        console.log("added ");
        console.log(`requestSequence[] : ${state.requestSequence}`);
      } else {
        state.allowRequestToAdd = false;
      }

      return state;

    case "schedule":
      if (action.payload.Algo === "FCFS") {
        const newPosition = state.currentPosition;
        const newSequence = state.requestSequence.filter(
          (value) => !state.FCFS.includes(value)
        );
        // Check if the currentPosition already exists in the FCFS array
        const isCurrentPositionExist = state.FCFS.includes(newPosition);

        // Add the currentPosition and newSequence only if it doesn't already exist
        if (!isCurrentPositionExist) {
          state.FCFS = [...state.FCFS, newPosition, ...newSequence];
        } else {
          state.FCFS = [...state.FCFS, ...newSequence];
        }

        state.scheduleSequence = [state.FCFS[0]];
        state.YAxisCoordinates = state.FCFS;
        let totalDifference = 0;
        for (let i = 0; i < state.FCFS.length - 1; i++) {
          totalDifference += Math.abs(state.FCFS[i] - state.FCFS[i + 1]);
        }
        state.totalDistance = totalDifference;
        state.showScheduledGraph = true;
      } else if (action.payload.Algo === "SCAN") {
        const subscheduleArray1 = state.requestSequence
          .filter((item) => item > state.currentPosition)
          .sort((a, b) => a - b);

        const subscheduleArray2 = state.requestSequence
          .filter((item) => item < state.currentPosition)
          .sort((a, b) => b - a);

        if (state.DirectionOfHead == 1) {
          if (subscheduleArray2.length > 0) {
            state.SCAN = [
              state.currentPosition,
              ...subscheduleArray1,
              state.totalTracks,
              ...subscheduleArray2,
            ];
          } else {
            state.SCAN = [
              state.currentPosition,
              ...subscheduleArray1,
              ...subscheduleArray2,
            ];
          }
        } else if (state.DirectionOfHead == 0) {
          if (subscheduleArray1.length > 0) {
            state.SCAN = [
              state.currentPosition,
              ...subscheduleArray2,
              0,
              ...subscheduleArray1,
            ];
          } else {
            state.SCAN = [
              state.currentPosition,
              ...subscheduleArray2,
              ...subscheduleArray1,
            ];
          }
        }

        state.scheduleSequence = [state.SCAN[0]];
        state.YAxisCoordinates = state.SCAN;
        let totalDifference = 0;
        for (let i = 0; i < state.SCAN.length - 1; i++) {
          totalDifference += Math.abs(state.SCAN[i] - state.SCAN[i + 1]);
        }
        state.totalDistance = totalDifference;
        state.showScheduledGraph = true;
      } else if (action.payload.Algo === "CSCAN") {
        const subscheduleArray1 = state.requestSequence
          .filter((item) => item > state.currentPosition)
          .sort((a, b) => a - b);

        const subscheduleArray2 = state.requestSequence
          .filter((item) => item < state.currentPosition)
          .sort((a, b) => a - b);
        const subscheduleArray3 = state.requestSequence
          .filter((item) => item < state.currentPosition)
          .sort((a, b) => b - a);
        const subscheduleArray4 = state.requestSequence
          .filter((item) => item > state.currentPosition)
          .sort((a, b) => b - a);

        if (state.DirectionOfHead == 1) {
          state.CSCAN = [state.currentPosition];
          state.CSCAN = [
            ...state.CSCAN,
            ...subscheduleArray1,
            state.totalTracks,
          ];

          if (subscheduleArray2.length > 0) {
            state.CSCAN = [...state.CSCAN, 0, ...subscheduleArray2];
          } else if (subscheduleArray2.length == 0) {
            state.CSCAN.pop();
          }
        } else if (state.DirectionOfHead == 0) {
          state.CSCAN = [state.currentPosition];
          state.CSCAN = [...state.CSCAN, ...subscheduleArray3, 0];

          if (subscheduleArray4.length > 0) {
            state.CSCAN = [
              ...state.CSCAN,
              state.totalTracks,
              ...subscheduleArray4,
            ];
          } else if (subscheduleArray4.length == 0) {
            state.CSCAN.pop();
          }
        }

        state.scheduleSequence = [state.CSCAN[0]];
        state.YAxisCoordinates = state.CSCAN;
        let totalDifference = 0;
        for (let i = 0; i < state.CSCAN.length - 1; i++) {
          totalDifference += Math.abs(state.CSCAN[i] - state.CSCAN[i + 1]);
        }
        state.totalDistance = totalDifference;
        state.showScheduledGraph = true;
      } else if (action.payload.Algo === "LOOK") {
        const subscheduleArray1 = state.requestSequence
          .filter((item) => item > state.currentPosition)
          .sort((a, b) => a - b);

        const subscheduleArray2 = state.requestSequence
          .filter((item) => item < state.currentPosition)
          .sort((a, b) => b - a);

        if (state.DirectionOfHead == 1) {
          state.LOOK = [
            state.currentPosition,
            ...subscheduleArray1,
            ...subscheduleArray2,
          ];
        } else if (state.DirectionOfHead == 0) {
          state.LOOK = [
            state.currentPosition,
            ...subscheduleArray2,
            ...subscheduleArray1,
          ];
        }

        state.scheduleSequence = [state.LOOK[0]];
        state.YAxisCoordinates = state.LOOK;
        let totalDifference = 0;
        for (let i = 0; i < state.LOOK.length - 1; i++) {
          totalDifference += Math.abs(state.LOOK[i] - state.LOOK[i + 1]);
        }
        state.totalDistance = totalDifference;
        state.showScheduledGraph = true;
      } else if (action.payload.Algo === "CLOOK") {
        const subscheduleArray1 = state.requestSequence
          .filter((item) => item > state.currentPosition)
          .sort((a, b) => a - b);

        const subscheduleArray2 = state.requestSequence
          .filter((item) => item < state.currentPosition)
          .sort((a, b) => a - b);
        const subscheduleArray3 = state.requestSequence
          .filter((item) => item < state.currentPosition)
          .sort((a, b) => b - a);
        const subscheduleArray4 = state.requestSequence
          .filter((item) => item > state.currentPosition)
          .sort((a, b) => b - a);

        if (state.DirectionOfHead == 1) {
          state.CLOOK = [
            state.currentPosition,
            ...subscheduleArray1,
            ...subscheduleArray2,
          ];
        } else if (state.DirectionOfHead == 0) {
          state.CLOOK = [
            state.currentPosition,
            ...subscheduleArray3,
            ...subscheduleArray4,
          ];
        }

        state.scheduleSequence = [state.CLOOK[0]];
        state.YAxisCoordinates = state.CLOOK;
        let totalDifference = 0;
        for (let i = 0; i < state.CLOOK.length - 1; i++) {
          totalDifference += Math.abs(state.CLOOK[i] - state.CLOOK[i + 1]);
        }
        state.totalDistance = totalDifference;
        state.showScheduledGraph = true;
      } else if (action.payload.Algo === "SSTF") {
        const SSTFrequest = [...state.requestSequence];
        state.SSTF = [state.currentPosition];
        let totalDifference = 0;

        while (SSTFrequest.length > 0) {
          let shortestDifference = Infinity;
          let closestIndex = -1;

          for (let i = 0; i < SSTFrequest.length; i++) {
            const difference = Math.abs(
              SSTFrequest[i] - state.SSTF[state.SSTF.length - 1]
            );
            if (difference < shortestDifference) {
              shortestDifference = difference;
              closestIndex = i;
            }
          }

          state.SSTF.push(SSTFrequest[closestIndex]);
          totalDifference += shortestDifference;
          SSTFrequest.splice(closestIndex, 1);
        }
        // const subscheduleArray1 = state.requestSequence
        //   .filter((item) => item > state.currentPosition)
        //   .sort((a, b) => a - b);

        // const subscheduleArray2 = state.requestSequence
        //   .filter((item) => item < state.currentPosition)
        //   .sort((a, b) => b - a);

        // if (
        //   Math.abs(
        //     state.currentPosition -
        //       subscheduleArray1[subscheduleArray1.length - 1]
        //   ) <=
        //   Math.abs(
        //     state.currentPosition -
        //       subscheduleArray2[subscheduleArray2.length - 1]
        //   )
        // ) {
        //   state.SSTF = [
        //     state.currentPosition,
        //     ...subscheduleArray1,
        //     ...subscheduleArray2,
        //   ];
        // } else if (
        //   Math.abs(
        //     state.currentPosition -
        //       subscheduleArray1[subscheduleArray1.length - 1]
        //   ) >
        //   Math.abs(
        //     state.currentPosition -
        //       subscheduleArray2[subscheduleArray2.length - 1]
        //   )
        // ) {
        //   state.SSTF = [
        //     state.currentPosition,
        //     ...subscheduleArray2,
        //     ...subscheduleArray1,
        //   ];
        // }

        state.scheduleSequence = [state.SSTF[0]];
        state.YAxisCoordinates = state.SSTF;
        let totalDiff = 0;
        for (let i = 0; i < state.SSTF.length - 1; i++) {
          totalDiff += Math.abs(state.SSTF[i] - state.SSTF[i + 1]);
        }
        state.totalDistance = totalDiff;
        state.showScheduledGraph = true;
      }

      return state;

    case "remove":
      if (action.payload.Algo === "FCFS") {
        state.requestSequence.pop();
        state.FCFS.pop();
      } else if (action.payload.Algo === "SCAN") {
        state.requestSequence.pop();
        state.SCAN.pop();
      } else if (action.payload.Algo === "CSCAN") {
        state.requestSequence.pop();
        state.CSCAN.pop();
      } else if (action.payload.Algo === "LOOK") {
        state.requestSequence.pop();
        state.LOOK.pop();
      } else if (action.payload.Algo === "CLOOK") {
        state.requestSequence.pop();
        state.CLOOK.pop();
      } else if (action.payload.Algo === "SSTF") {
        state.requestSequence.pop();
        state.SSTF.pop();
      }

      return state;
    case "clear":
      if (action.payload.Algo === "FCFS") {
        state.requestSequence = [];
        state.FCFS = [];
        state.scheduleSequence = [];
      } else if (action.payload.Algo === "SCAN") {
        state.requestSequence = [];
        state.SCAN = [];
        state.scheduleSequence = [];
      } else if (action.payload.Algo === "CSCAN") {
        state.requestSequence = [];
        state.CSCAN = [];
        state.scheduleSequence = [];
      } else if (action.payload.Algo === "LOOK") {
        state.requestSequence = [];
        state.LOOK = [];
        state.scheduleSequence = [];
      } else if (action.payload.Algo === "CLOOK") {
        state.requestSequence = [];
        state.CLOOK = [];
        state.scheduleSequence = [];
      } else if (action.payload.Algo === "SSTF") {
        state.requestSequence = [];
        state.SSTF = [];
        state.scheduleSequence = [];
      }
      state.showScheduledGraph = false;
      return state;

    case "stepChangeNext":
      if (action.payload.Algo === "FCFS") {
        if (state.scheduleSequence.length <= state.FCFS.length) {
          state.scheduleSequence = [
            ...state.scheduleSequence,
            state.FCFS[state.scheduleSequence.length],
          ];
        }
      } else if (action.payload.Algo === "SCAN") {
        if (state.scheduleSequence.length <= state.SCAN.length) {
          state.scheduleSequence = [
            ...state.scheduleSequence,
            state.SCAN[state.scheduleSequence.length],
          ];
        }
      } else if (action.payload.Algo === "CSCAN") {
        if (state.scheduleSequence.length <= state.CSCAN.length) {
          state.scheduleSequence = [
            ...state.scheduleSequence,
            state.CSCAN[state.scheduleSequence.length],
          ];
        }
      } else if (action.payload.Algo === "LOOK") {
        if (state.scheduleSequence.length <= state.LOOK.length) {
          state.scheduleSequence = [
            ...state.scheduleSequence,
            state.LOOK[state.scheduleSequence.length],
          ];
        }
      } else if (action.payload.Algo === "CLOOK") {
        if (state.scheduleSequence.length <= state.CLOOK.length) {
          state.scheduleSequence = [
            ...state.scheduleSequence,
            state.CLOOK[state.scheduleSequence.length],
          ];
        }
      } else if (action.payload.Algo === "SSTF") {
        if (state.scheduleSequence.length <= state.SSTF.length) {
          state.scheduleSequence = [
            ...state.scheduleSequence,
            state.SSTF[state.scheduleSequence.length],
          ];
        }
      }

      return state;
    case "stepChangeBack":
      if (action.payload.Algo === "FCFS") {
        if (state.scheduleSequence.length > 1) {
          state.scheduleSequence.pop();
        }
      } else if (action.payload.Algo === "SCAN") {
        if (state.scheduleSequence.length > 1) {
          state.scheduleSequence.pop();
        }
      } else if (action.payload.Algo === "CSCAN") {
        if (state.scheduleSequence.length > 1) {
          state.scheduleSequence.pop();
        }
      } else if (action.payload.Algo === "LOOK") {
        if (state.scheduleSequence.length > 1) {
          state.scheduleSequence.pop();
        }
      } else if (action.payload.Algo === "CLOOK") {
        if (state.scheduleSequence.length > 1) {
          state.scheduleSequence.pop();
        }
      } else if (action.payload.Algo === "SSTF") {
        if (state.scheduleSequence.length > 1) {
          state.scheduleSequence.pop();
        }
      }

      return state;
  }
};

const addRequest = (dispatch) => (request) => {
  dispatch({ type: "addRequest", payload: { request: request } });
};
const remove = (dispatch) => (Algo) => {
  dispatch({ type: "remove", payload: { Algo: Algo } });
};
const clear = (dispatch) => (Algo) => {
  dispatch({ type: "clear", payload: { Algo: Algo } });
};
const schedule = (dispatch) => (Algo) => {
  dispatch({ type: "schedule", payload: { Algo: Algo } });
};

const changeTheAlgo = (dispatch) => (Algo) => {
  dispatch({ type: "changeTheAlgo", payload: { Algo: Algo } });
};

const saveTextInput = (dispatch) => (value, TypeofText) => {
  dispatch({
    type: "saveTextInput",
    payload: { value: value, TypeofText: TypeofText },
  });
};
const stepChangeNext = (dispatch) => (Algo) => {
  dispatch({
    type: "stepChangeNext",
    payload: { Algo: Algo },
  });
};
const stepChangeBack = (dispatch) => (Algo) => {
  dispatch({
    type: "stepChangeBack",
    payload: { Algo: Algo },
  });
};
export const { Context, Provider } = createDataContext(
  algoReducer,
  {
    schedule,
    remove,
    clear,
    addRequest,
    saveTextInput,
    stepChangeNext,
    stepChangeBack,
    changeTheAlgo,
  },
  {
    selectedAlgorithm: "SSTF",
    allowRequestToAdd: true,
    requestSequence: [],
    totalTracks: null,
    currentPosition: null,
    FCFS: [],
    SCAN: [],
    CSCAN: [],
    LOOK: [],
    CLOOK: [],
    SSTF: [],
    scheduleSequence: [],
    YAxisCoordinates: [],
    showScheduledGraph: false,
    basicInfoCollected: false,
    DirectionOfHead: 1,
    totalDistance: 0,
    showRun: false,
  }
);
