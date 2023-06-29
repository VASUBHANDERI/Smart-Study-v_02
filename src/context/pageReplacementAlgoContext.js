import createDataContext from "./createDataContext";

const algoReducer = (state, action) => {
  switch (action.type) {
    case "changeTheAlgo":
      state.selectedAlgorithm = action.payload.Algo;
      state.showScheduled = false;
      return state;

    case "addPage":
      state.requestSequence.push(action.payload.page);
      state.showScheduled = false;
      state.showRun = false;

      return state;
    case "remove":
      state.requestSequence.pop();
      return state;

    case "clear":
      state.requestSequence = [];
      return state;

    case "schedule":
      if (action.payload.Algo === "FIFO") {
        let scheduledArray = [];
        let hitMissArray = [];
        let replacedArray = [];

        let sequence = Array.from(state.requestSequence);
        for (let i = 0; i < sequence.length; i++) {
          hitMissArray[i] = -1;
          replacedArray[i] = 0;
        }

        let replaceIndex = 0;
        let instance = [];
        while (sequence.length > 0) {
          console.log(sequence);
          if (scheduledArray.length === 0) {
            instance.push(sequence[0]);
            console.log(instance);
            scheduledArray.push([...instance]);
            sequence.shift();
          } else {
            if (instance.length < 3) {
              if (!instance.includes(sequence[0])) {
                instance.push(sequence[0]);
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              } else {
                hitMissArray[scheduledArray.length] = 1;
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              }
            } else {
              if (instance.includes(sequence[0])) {
                console.log(instance);
                hitMissArray[scheduledArray.length] = 1;
                scheduledArray.push([...instance]);
                sequence.shift();
              } else {
                replacedArray[scheduledArray.length] = instance[replaceIndex];
                // instance.shift();
                instance[replaceIndex] = sequence[0];
                if (replaceIndex < 2) {
                  replaceIndex++;
                } else {
                  replaceIndex = 0;
                }
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              }
            }
          }
        }

        for (let i = 0; i < scheduledArray.length; i++) {
          if (scheduledArray[i].length < 3) {
            let j = 3 - scheduledArray[i].length;
            while (j > 0) {
              scheduledArray[i].push(0);
              j--;
            }
          }
        }

        let hit = 0;
        for (let i = 0; i < hitMissArray.length; i++) {
          if (hitMissArray[i] === 1) {
            hit++;
          }
        }

        let miss = hitMissArray.length - hit;

        state.HitRatio = `${hit}/${hitMissArray.length}`;
        state.MissRatio = `${miss}/${hitMissArray.length}`;

        console.log(scheduledArray);
        console.log(hitMissArray);
        console.log(replacedArray);
        state.showScheduled = true;
        state.isScheduled = true;
        state.ScheduledArray = scheduledArray;
        state.hitMissArray = hitMissArray;

        state.replacedArray = replacedArray;
      } else if (action.payload.Algo === "LRU") {
        let scheduledArray = [];
        let hitMissArray = [];
        let replacedArray = [];
        let age = [0, 0, 0, 0, 0];

        const addAge = (a) => {
          for (let i = 0; i < a.length; i++) {
            age[a[i] - 1]++;
          }
        };

        const findReplaceIndex = (a) => {
          let max = age[a[0] - 1];
          let index = 0;
          for (let i = 0; i < a.length; i++) {
            if (age[a[i] - 1] > max) {
              max = age[a[i] - 1];
              index = i;
            }
          }
          return index;
        };

        let sequence = Array.from(state.requestSequence);
        for (let i = 0; i < sequence.length; i++) {
          hitMissArray[i] = -1;
          replacedArray[i] = 0;
        }

        let instance = [];
        while (sequence.length > 0) {
          console.log(sequence);
          if (scheduledArray.length === 0) {
            instance.push(sequence[0]);
            addAge(instance);
            console.log(age);
            console.log(instance);
            scheduledArray.push([...instance]);
            sequence.shift();
          } else {
            if (instance.length < 3) {
              if (!instance.includes(sequence[0])) {
                instance.push(sequence[0]);
                addAge(instance);
                console.log(age);
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              } else {
                hitMissArray[scheduledArray.length] = 1;
                addAge(instance);
                console.log(age);
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              }
            } else {
              if (instance.includes(sequence[0])) {
                age[sequence[0] - 1] = 0;
                addAge(instance);
                console.log(age);
                console.log(instance);
                hitMissArray[scheduledArray.length] = 1;
                scheduledArray.push([...instance]);
                sequence.shift();
              } else {
                const replaceIndex = findReplaceIndex(instance);
                console.log(replaceIndex);
                replacedArray[scheduledArray.length] = instance[replaceIndex];
                // instance.shift();
                age[instance[replaceIndex] - 1] = 0;
                instance[replaceIndex] = sequence[0];
                addAge(instance);
                console.log(age);
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              }
            }
          }
        }

        for (let i = 0; i < scheduledArray.length; i++) {
          if (scheduledArray[i].length < 3) {
            let j = 3 - scheduledArray[i].length;
            while (j > 0) {
              scheduledArray[i].push(0);
              j--;
            }
          }
        }

        let hit = 0;
        for (let i = 0; i < hitMissArray.length; i++) {
          if (hitMissArray[i] === 1) {
            hit++;
          }
        }

        let miss = hitMissArray.length - hit;

        state.HitRatio = `${hit}/${hitMissArray.length}`;
        state.MissRatio = `${miss}/${hitMissArray.length}`;

        console.log(scheduledArray);
        console.log(hitMissArray);
        console.log(replacedArray);
        state.showScheduled = true;
        state.isScheduled = true;
        state.ScheduledArray = scheduledArray;
        state.hitMissArray = hitMissArray;

        state.replacedArray = replacedArray;
      } else if (action.payload.Algo === "MRU") {
        let scheduledArray = [];
        let hitMissArray = [];
        let replacedArray = [];
        let age = [0, 0, 0, 0, 0];

        const addAge = (a) => {
          for (let i = 0; i < a.length; i++) {
            age[a[i] - 1]++;
          }
        };

        const findReplaceIndex = (a) => {
          let min = age[a[0] - 1];
          let index = 0;
          for (let i = 0; i < a.length; i++) {
            if (age[a[i] - 1] < min) {
              min = age[a[i] - 1];
              index = i;
            }
          }
          return index;
        };

        let sequence = Array.from(state.requestSequence);
        for (let i = 0; i < sequence.length; i++) {
          hitMissArray[i] = -1;
          replacedArray[i] = 0;
        }

        let instance = [];
        while (sequence.length > 0) {
          console.log(sequence);
          if (scheduledArray.length === 0) {
            instance.push(sequence[0]);
            addAge(instance);
            console.log(age);
            console.log(instance);
            scheduledArray.push([...instance]);
            sequence.shift();
          } else {
            if (instance.length < 3) {
              if (!instance.includes(sequence[0])) {
                instance.push(sequence[0]);
                addAge(instance);
                console.log(age);
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              } else {
                hitMissArray[scheduledArray.length] = 1;
                addAge(instance);
                console.log(age);
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              }
            } else {
              if (instance.includes(sequence[0])) {
                age[sequence[0] - 1] = 0;
                addAge(instance);
                console.log(age);
                console.log(instance);
                hitMissArray[scheduledArray.length] = 1;
                scheduledArray.push([...instance]);
                sequence.shift();
              } else {
                const replaceIndex = findReplaceIndex(instance);
                console.log(replaceIndex);
                replacedArray[scheduledArray.length] = instance[replaceIndex];
                // instance.shift();
                age[instance[replaceIndex] - 1] = 0;
                instance[replaceIndex] = sequence[0];
                addAge(instance);
                console.log(age);
                console.log(instance);
                scheduledArray.push([...instance]);
                sequence.shift();
              }
            }
          }
        }

        for (let i = 0; i < scheduledArray.length; i++) {
          if (scheduledArray[i].length < 3) {
            let j = 3 - scheduledArray[i].length;
            while (j > 0) {
              scheduledArray[i].push(0);
              j--;
            }
          }
        }

        let hit = 0;
        for (let i = 0; i < hitMissArray.length; i++) {
          if (hitMissArray[i] === 1) {
            hit++;
          }
        }

        let miss = hitMissArray.length - hit;

        state.HitRatio = `${hit}/${hitMissArray.length}`;
        state.MissRatio = `${miss}/${hitMissArray.length}`;

        console.log(scheduledArray);
        console.log(hitMissArray);
        console.log(replacedArray);
        state.showScheduled = true;
        state.isScheduled = true;
        state.ScheduledArray = scheduledArray;
        state.hitMissArray = hitMissArray;
        state.replacedArray = replacedArray;
      }
      return state;
  }
};
const changeTheAlgo = (dispatch) => (Algo) => {
  dispatch({ type: "changeTheAlgo", payload: { Algo: Algo } });
};
const addPage = (dispatch) => (page) => {
  dispatch({ type: "addPage", payload: { page: page } });
};
const remove = (dispatch) => () => {
  dispatch({ type: "remove", payload: {} });
};
const clear = (dispatch) => () => {
  dispatch({ type: "clear", payload: {} });
};
const schedule = (dispatch) => (Algo) => {
  dispatch({ type: "schedule", payload: { Algo: Algo } });
};

export const { Context, Provider } = createDataContext(
  algoReducer,
  { addPage, remove, clear, schedule, changeTheAlgo },
  {
    selectedAlgorithm: "FIFO",
    requestSequence: [],
    ScheduledArray: [],
    replacedArray: [],
    hitMissArray: [],
    isScheduled: false,
    showScheduled: false,
    HitRatio: "",
    MissRatio: "",
    showRun: false,
    refresh: 0,
  }
);
