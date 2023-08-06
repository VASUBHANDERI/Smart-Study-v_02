import { ToastAndroid } from "react-native";
import createDataContext from "./createDataContext";

const algoReducer = (state, action) => {
  switch (action.type) {
    case "Solve":
      //implement Banker's algorithm

      // Step 1: Initialize data structures

      const numProcesses = state.numProcesses;
      const numResources = state.numResources;

      const allocation = state.allocation;
      const maxNeed = state.maxNeed;
      const totalResources = state.totalResources;

      const available = [...totalResources]; // Copy totalResources to available
      const need = []; // Calculate need matrix

      // Step 2: Calculate the need matrix

      for (let i = 0; i < numProcesses; i++) {
        const processNeed = [];
        for (let j = 0; j < numResources; j++) {
          processNeed.push(maxNeed[i][j] - allocation[i][j]);
        }
        need.push(processNeed);
      }
      console.log("Need :", need);

      // Step 3: Run the Banker's algorithm logic

      const work = [];
      for (let i = 0; i < numResources; i++) {
        let sum = 0;
        for (let j = 0; j < numProcesses; j++) {
          sum = parseInt(sum) + parseInt(allocation[j][i]);
        }
        work.push(totalResources[0][i] - sum);
      }

      const finish = Array(numProcesses).fill(false);
      const safeSequence = [];

      let count = 0; // Number of completed processes

      const steps = []; // Steps for the visualizer

      while (count < numProcesses) {
        let found = false;

        for (let i = 0; i < numProcesses; i++) {
          if (!finish[i]) {
            let j;
            for (j = 0; j < numResources; j++) {
              if (need[i][j] > work[j]) {
                break;
              }
            }
            console.log("i", i);
            console.log("work: ", work);
            if (j === numResources) {
              // Add step to the visualizer
              const total = [];
              for (let q = 0; q < numResources; q++) {
                total[q] = parseInt(work[q]) + parseInt(allocation[i][q]);
              }

              safeSequence.push(i);
              finish[i] = true;
              count++;
              found = true;
              steps.push({
                description: `For Process P${i}: `,
                processIndex: i,
                work: [...work],
                need: [...need[i]],
                safeSequence: [...safeSequence],
                isFinish: true,
                allocation: [...allocation[i]],
                total: [...total],
                description1: "New Available = Available + Allocation",
                lastStatement: "Now, we  examine next Process",
              });

              // Process i can be executed
              for (let k = 0; k < numResources; k++) {
                work[k] = parseInt(work[k]) + parseInt(allocation[i][k]);
              }
            } else {
              steps.push({
                description: `For Process P${i}: `,
                processIndex: i,
                work: [...work],
                need: [...need[i]],
                safeSequence: [...safeSequence],
                allocation: [...allocation[i]],
                lastStatement: "So, we  examine next Process",
                isFinish: false,
              });
            }
          }
        }

        // If no process found, break the loop to avoid an infinite loop
        if (!found) {
          break;
        }
      }
      const isInputValid = () => {
        const matrices = [need, work];

        for (let matrix of matrices) {
          for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
              const cellValue = matrix[i][j];
              if (cellValue < 0) {
                return false;
              }
            }
          }
        }

        return true;
      };
      // Step 4: Update the state with the results
      state.available = available;
      state.safeSequence = safeSequence;
      state.steps = steps; // Update steps for visualizer
      state.need = need;

      // Determine if the system is safe or unsafe
      state.isSafe = count === numProcesses;
      state.isSubmitted = true;
      state.isValidMatrix = isInputValid();
      console.log("available:", state.available);
      console.log("safesequence:", state.safeSequence);
      console.log("isSafe:", state.isSafe);
      console.log("steps:", state.steps);
      console.log(state.steps.length);
      return state;
  }
};

const Solve = (dispatch) => () => {
  dispatch({ type: "Solve", payload: {} });
};

export const { Context, Provider } = createDataContext(
  algoReducer,
  {
    Solve,
  },
  {
    numResources: 0,
    numProcesses: 0,
    allocation: [],
    maxNeed: [],
    totalResources: [],
    available: [],
    safeSequence: [],
    isSafe: true,
    steps: [],
    isSubmitted: false,
    isValidMatrix: true,
    need:[]
  }
);
