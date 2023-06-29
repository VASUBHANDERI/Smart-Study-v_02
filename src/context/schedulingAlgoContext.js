import createDataContext from "./createDataContext";

const algoReducer = (state, action) => {
  switch (action.type) {
    case "changeTheAlgo":
      state.selectedAlgorithm = action.payload.Algo;
      state.FCFSscheduledProcess = [];
      state.FCFSprocess = [];
      state.FCFStimeLine = [];
      state.FCFSwaitingTimeLine = [];
      state.FCFStimeIndex = [];
      state.FCFSgroupedTimeLine = [];
      state.FCFSavgWaitingTime = 0;
      state.FCFSavgTurnArrTime = 0;
      state.FCFSshowProcess = false;
      state.FCFSisScheduled = false;
      state.FCFSshowScheduled = false;
      state.SJFprocess = [];
      state.SJFscheduledProcess = [];
      state.SJFtimeLine = [];
      state.SJFwaitingTimeLine = [];
      state.SJFtimeIndex = [];
      state.SJFgroupedTimeLine = [];
      state.SJFavgWaitingTime = 0;
      state.SJFavgTurnArrTime = 0;
      state.SJFshowProcess = false;
      state.SJFisScheduled = false;
      state.SJFshowScheduled = false;
      state.PRprocess = [];
      state.PRscheduledProcess = [];
      state.PRtimeLine = [];
      state.PRwaitingTimeLine = [];
      state.PRtimeIndex = [];
      state.PRgroupedTimeLine = [];
      state.PRavgWaitingTime = 0;
      state.PRavgTurnArrTime = 0;
      state.PRshowProcess = false;
      state.PRisScheduled = false;
      state.PRshowScheduled = false;
      state.SRTFprocess = [];
      state.SRTFscheduledProcess = [];
      state.SRTFtimeLine = [];
      state.SRTFwaitingTimeLine = [];
      state.SRTFtimeIndex = [];
      state.SRTFgroupedTimeLine = [];
      state.SRTFavgWaitingTime = 0;
      state.SRTFavgTurnArrTime = 0;
      state.SRTFshowProcess = false;
      state.SRTFisScheduled = false;
      state.SRTFshowScheduled = false;
      state.PrePRprocess = [];
      state.PrePRscheduledProcess = [];
      state.PrePRtimeLine = [];
      state.PrePRwaitingTimeLine = [];
      state.PrePRtimeIndex = [];
      state.PrePRgroupedTimeLine = [];
      state.PrePRavgWaitingTime = 0;
      state.PrePRavgTurnArrTime = 0;
      state.PrePRshowProcess = false;
      state.PrePRisScheduled = false;
      state.PrePRshowScheduled = false;
      return state;
    case "add":
      if (action.payload.Algo === "FCFS") {
        state.FCFSprocess = [
          ...state.FCFSprocess,
          {
            arrTime: parseInt(action.payload.arrTime),
            burstTime: parseInt(action.payload.burstTime),
            id: state.FCFSprocess.length,
          },
        ];
        state.FCFSshowProcess = true;
        state.FCFSisScheduled = false;
        console.log(state.FCFSprocess);
        console.log(state.FCFSscheduledProcess);
      } else if (action.payload.Algo === "SJF") {
        state.SJFprocess = [
          ...state.SJFprocess,
          {
            arrTime: parseInt(action.payload.arrTime),
            burstTime: parseInt(action.payload.burstTime),
            id: state.SJFprocess.length,
          },
        ];
        state.SJFshowProcess = true;
        state.SJFisScheduled = false;
        console.log(state.SJFprocess);
      } else if (action.payload.Algo === "SRTF") {
        state.SRTFprocess = [
          ...state.SRTFprocess,
          {
            arrTime: parseInt(action.payload.arrTime),
            tempArrTime: parseInt(action.payload.arrTime),
            burstTime: parseInt(action.payload.burstTime),
            remTime: parseInt(action.payload.burstTime),
            id: state.SRTFprocess.length,
          },
        ];
        state.SRTFshowProcess = true;
        state.SRTFisScheduled = false;
      }

      return state;
    case "addPr":
      if (action.payload.Algo === "PR") {
        state.PRprocess = [
          ...state.PRprocess,
          {
            arrTime: parseInt(action.payload.arrTime),
            burstTime: parseInt(action.payload.burstTime),
            Pr: parseInt(action.payload.Pr),
            id: state.PRprocess.length,
          },
        ];
        state.PRshowProcess = true;
        state.PRisScheduled = false;
        console.log(state.PRprocess);
      } else if (action.payload.Algo === "PrePR") {
        state.PrePRprocess = [
          ...state.PrePRprocess,
          {
            arrTime: parseInt(action.payload.arrTime),
            tempArrTime: parseInt(action.payload.arrTime),
            burstTime: parseInt(action.payload.burstTime),
            remTime: parseInt(action.payload.burstTime),
            Pr: parseInt(action.payload.Pr),
            id: state.PrePRprocess.length,
          },
        ];
        state.PrePRshowProcess = true;
        state.PrePRisScheduled = false;
        console.log(state.PrePRprocess);
      }
      return state;
    case "schedule":
      if (action.payload === "FCFS") {
        let FCFSscheduledProcess = state.FCFSprocess.slice();
        FCFSscheduledProcess.sort((p1, p2) =>
          p1.arrTime > p2.arrTime ? 1 : p1.arrTime < p2.arrTime ? -1 : 0
        );
        let n = FCFSscheduledProcess.length;
        let ct = [];
        let tat = [];
        let wt = [];
        let totalWt = 0;
        let totalTat = 0;
        let currTime = 0;

        let initialIdleTime = FCFSscheduledProcess[0].arrTime;
        for (let i = 0; i < n; i++) {
          if (currTime < FCFSscheduledProcess[i].arrTime) {
            currTime = FCFSscheduledProcess[i].arrTime;
          }
          currTime = currTime + FCFSscheduledProcess[i].burstTime;
          ct[i] = currTime;
        }

        initialIdleTime = FCFSscheduledProcess[0].arrTime - initialIdleTime;

        for (let i = 0; i < n; i++) {
          tat[i] = ct[i] - FCFSscheduledProcess[i].arrTime;
          wt[i] = tat[i] - FCFSscheduledProcess[i].burstTime;
        }

        for (let i = 0; i < n; i++) {
          ct[i] += initialIdleTime;
        }

        for (let i = 0; i < n; i++) {
          FCFSscheduledProcess[i].ct = ct[i];
          FCFSscheduledProcess[i].tat = tat[i];
          FCFSscheduledProcess[i].wt = wt[i];
          totalTat += tat[i];
          totalWt += wt[i];
        }

        state.FCFSavgWaitingTime = totalWt / n;
        state.FCFSavgTurnArrTime = totalTat / n;

        let t = ct[n - 1];

        let timeLine = new Array(t);

        let st = new Array(n);
        st[0] = FCFSscheduledProcess[0].arrTime;
        for (let i = 1; i < n; i++) {
          st[i] = Math.max(
            FCFSscheduledProcess[i - 1].ct,
            FCFSscheduledProcess[i].arrTime
          );
        }

        for (let i = 0; i < t; i++) {
          timeLine[i] = -1;
        }

        for (let i = 0; i < n; i++) {
          for (
            let j = st[i];
            j < st[i] + FCFSscheduledProcess[i].burstTime;
            j++
          ) {
            timeLine[j] = FCFSscheduledProcess[i].id;
          }
        }

        let waitingTimeLine = new Array(t)
          .fill(-1)
          .map(() => new Array(1).fill(-1));

        for (let i = 0; i < n; i++) {
          for (
            let j = FCFSscheduledProcess[i].arrTime;
            j < FCFSscheduledProcess[i].arrTime + FCFSscheduledProcess[i].wt;
            j++
          ) {
            waitingTimeLine[j].push(FCFSscheduledProcess[i].id);
          }
        }

        for (let i = 0; i < t; i++) {
          waitingTimeLine[i].shift();
        }

        for (let i = 0; i < t; i++) {
          if (waitingTimeLine[i].length === 0) {
            waitingTimeLine[i].push(-1);
          }
        }

        const groupedTimeLine = timeLine.reduce((groups, item) => {
          if (groups.length === 0 || groups[groups.length - 1][0] !== item) {
            groups.push([item]);
          } else {
            groups[groups.length - 1].push(item);
          }
          return groups;
        }, []);

        let timeIndex = [];
        let currentTime = 0;
        for (let i = 0; i < groupedTimeLine.length; i++) {
          const count = groupedTimeLine[i].length;
          currentTime += count;
          timeIndex.push(currentTime);
        }

        state.FCFSscheduledProcess = FCFSscheduledProcess;
        state.FCFSisScheduled = true;
        state.FCFSshowScheduled = true;
        state.FCFSshowProcess = true;
        state.FCFStimeLine = timeLine;
        state.FCFSwaitingTimeLine = waitingTimeLine;
        state.FCFSgroupedTimeLine = groupedTimeLine;
        state.FCFStimeIndex = timeIndex;
        console.log(state.FCFSscheduledProcess);
        console.log(state.FCFStimeLine);
        console.log(state.FCFSwaitingTimeLine);
      } else if (action.payload === "SJF") {
        const SJFprocess = [...state.SJFprocess];
        // Step 1: Sort the processes based on arrival time
        const sortedProcesses = SJFprocess.sort(
          (p1, p2) => p1.arrTime - p2.arrTime
        );

        // Step 2: Initialize variables
        const n = sortedProcesses.length;
        let completedProcesses = [];
        let currentTime = sortedProcesses[0].arrTime;
        let totalTurnaroundTime = 0;
        let totalWaitingTime = 0;
        // Step 4: Process each remaining process in the sorted array
        while (sortedProcesses.length > 0) {
          // Step 4a: Create an array of processes that have arrived
          // before or at the current time
          const arrivedProcesses = sortedProcesses.filter(
            (p) => p.arrTime <= currentTime
          );

          // Step 4b: Sort the arrived processes based on burst time
          const sortedArrivedProcesses = arrivedProcesses.sort(
            (p1, p2) => p1.burstTime - p2.burstTime
          );

          // Step 4c: Pick the first process in the sorted array
          const nextProcess = sortedArrivedProcesses.shift();
          const completionTime = currentTime + nextProcess.burstTime;

          nextProcess.ct = completionTime;

          // Step 4d: Append the completed process to the array
          completedProcesses.push(nextProcess);

          // Step 4e: Update the current time
          currentTime = completionTime;

          // Remove the processed process from the sorted array
          sortedProcesses.splice(
            sortedProcesses.findIndex((p) => p.id === nextProcess.id),
            1
          );
        }

        // Step 5: Compute turnaround time and waiting time

        let tat = [];
        let wt = [];
        for (let i = 0; i < n; i++) {
          const process = completedProcesses[i];
          const turnaroundTime = process.ct - process.arrTime;
          const waitingTime = turnaroundTime - process.burstTime;
          tat.push(turnaroundTime);
          wt.push(waitingTime);
          totalTurnaroundTime += turnaroundTime;
          totalWaitingTime += waitingTime;
        }
        state.SJFavgTurnArrTime = totalTurnaroundTime / n;
        state.SJFavgWaitingTime = totalWaitingTime / n;

        //Step 6 : Assigning values to the SJFscheduledProcess
        let SJFscheduledProcess = [];
        for (let i = 0; i < n; i++) {
          SJFscheduledProcess = [
            ...SJFscheduledProcess,
            {
              id: completedProcesses[i].id,
              arrTime: completedProcesses[i].arrTime,
              burstTime: completedProcesses[i].burstTime,
              ct: completedProcesses[i].ct,
              tat: tat[i],
              wt: wt[i],
            },
          ];
        }

        state.SJFscheduledProcess = SJFscheduledProcess;

        //Step 7 : Make a timeLine Array
        let t = state.SJFscheduledProcess[n - 1].ct;
        // const SJFscheduledProcess = state.SJFscheduledProcess;
        let timeLine = new Array(t);

        let st = new Array(n);
        st[0] = SJFscheduledProcess[0].arrTime;
        for (let i = 1; i < n; i++) {
          st[i] = Math.max(
            SJFscheduledProcess[i - 1].ct,
            SJFscheduledProcess[i].arrTime
          );
        }

        for (let i = 0; i < t; i++) {
          timeLine[i] = -1;
        }

        for (let i = 0; i < n; i++) {
          for (
            let j = st[i];
            j < st[i] + SJFscheduledProcess[i].burstTime;
            j++
          ) {
            timeLine[j] = SJFscheduledProcess[i].id;
          }
        }

        // Step 8 : Make a waitingTimeLine Array

        let waitingTimeLine = new Array(t)
          .fill(-1)
          .map(() => new Array(1).fill(-1));

        for (let i = 0; i < n; i++) {
          for (
            let j = SJFscheduledProcess[i].arrTime;
            j < SJFscheduledProcess[i].arrTime + SJFscheduledProcess[i].wt;
            j++
          ) {
            waitingTimeLine[j].push(SJFscheduledProcess[i].id);
          }
        }

        for (let i = 0; i < t; i++) {
          waitingTimeLine[i].shift();
        }

        for (let i = 0; i < t; i++) {
          if (waitingTimeLine[i].length === 0) {
            waitingTimeLine[i].push(-1);
          }
        }

        //Step 9 : Grouping the timeLine Array for UI implementation purpose
        const groupedTimeLine = timeLine.reduce((groups, item) => {
          if (groups.length === 0 || groups[groups.length - 1][0] !== item) {
            groups.push([item]);
          } else {
            groups[groups.length - 1].push(item);
          }
          return groups;
        }, []);

        //Step 10 : Creating the timeIndex Array for the Gantt Chart Implementation.
        let timeIndex = [];
        let curTime = 0;
        for (let i = 0; i < groupedTimeLine.length; i++) {
          const count = groupedTimeLine[i].length;
          curTime += count;
          timeIndex.push(curTime);
        }

        state.SJFisScheduled = true;
        state.SJFshowScheduled = true;
        state.SJFshowProcess = true;
        state.SJFtimeLine = timeLine;
        state.SJFwaitingTimeLine = waitingTimeLine;
        state.SJFgroupedTimeLine = groupedTimeLine;
        state.SJFtimeIndex = timeIndex;

        console.log(completedProcesses);
        console.log(state.SJFscheduledProcess);
        console.log(state.SJFtimeLine);
        console.log(state.SJFwaitingTimeLine);
      } else if (action.payload === "PR") {
        const PRprocess = [...state.PRprocess];
        // Step 1: Sort the processes based on arrival time
        const sortedProcesses = PRprocess.sort(
          (p1, p2) => p1.arrTime - p2.arrTime
        );

        // Step 2: Initialize variables
        const n = sortedProcesses.length;
        let completedProcesses = [];
        let currentTime = sortedProcesses[0].arrTime;
        let totalTurnaroundTime = 0;
        let totalWaitingTime = 0;
        // Step 4: Process each remaining process in the sorted array
        while (sortedProcesses.length > 0) {
          // Step 4a: Create an array of processes that have arrived
          // before or at the current time
          const arrivedProcesses = sortedProcesses.filter(
            (p) => p.arrTime <= currentTime
          );

          // Step 4b: Sort the arrived processes based on burst time
          const sortedArrivedProcesses = arrivedProcesses.sort(
            (p1, p2) => p1.Pr - p2.Pr
          );

          // Step 4c: Pick the first process in the sorted array
          const nextProcess = sortedArrivedProcesses.shift();
          const completionTime = currentTime + nextProcess.burstTime;

          nextProcess.ct = completionTime;

          // Step 4d: Append the completed process to the array
          completedProcesses.push(nextProcess);

          // Step 4e: Update the current time
          currentTime = completionTime;

          // Remove the processed process from the sorted array
          sortedProcesses.splice(
            sortedProcesses.findIndex((p) => p.id === nextProcess.id),
            1
          );
        }

        // Step 5: Compute turnaround time and waiting time

        let tat = [];
        let wt = [];
        for (let i = 0; i < n; i++) {
          const process = completedProcesses[i];
          const turnaroundTime = process.ct - process.arrTime;
          const waitingTime = turnaroundTime - process.burstTime;
          tat.push(turnaroundTime);
          wt.push(waitingTime);
          totalTurnaroundTime += turnaroundTime;
          totalWaitingTime += waitingTime;
        }
        state.PRavgTurnArrTime = totalTurnaroundTime / n;
        state.PRavgWaitingTime = totalWaitingTime / n;

        //Step 6 : Assigning values to the SJFscheduledProcess
        let PRscheduledProcess = [];
        for (let i = 0; i < n; i++) {
          PRscheduledProcess = [
            ...PRscheduledProcess,
            {
              id: completedProcesses[i].id,
              arrTime: completedProcesses[i].arrTime,
              burstTime: completedProcesses[i].burstTime,
              Pr: completedProcesses[i].Pr,
              ct: completedProcesses[i].ct,
              tat: tat[i],
              wt: wt[i],
            },
          ];
        }

        state.PRscheduledProcess = PRscheduledProcess;

        //Step 7 : Make a timeLine Array
        let t = state.PRscheduledProcess[n - 1].ct;
        // const SJFscheduledProcess = state.SJFscheduledProcess;
        let timeLine = new Array(t);

        let st = new Array(n);
        st[0] = PRscheduledProcess[0].arrTime;
        for (let i = 1; i < n; i++) {
          st[i] = Math.max(
            PRscheduledProcess[i - 1].ct,
            PRscheduledProcess[i].arrTime
          );
        }

        for (let i = 0; i < t; i++) {
          timeLine[i] = -1;
        }

        for (let i = 0; i < n; i++) {
          for (
            let j = st[i];
            j < st[i] + PRscheduledProcess[i].burstTime;
            j++
          ) {
            timeLine[j] = PRscheduledProcess[i].id;
          }
        }

        // Step 8 : Make a waitingTimeLine Array

        let waitingTimeLine = new Array(t)
          .fill(-1)
          .map(() => new Array(1).fill(-1));

        for (let i = 0; i < n; i++) {
          for (
            let j = PRscheduledProcess[i].arrTime;
            j < PRscheduledProcess[i].arrTime + PRscheduledProcess[i].wt;
            j++
          ) {
            waitingTimeLine[j].push(PRscheduledProcess[i].id);
          }
        }

        for (let i = 0; i < t; i++) {
          waitingTimeLine[i].shift();
        }

        for (let i = 0; i < t; i++) {
          if (waitingTimeLine[i].length === 0) {
            waitingTimeLine[i].push(-1);
          }
        }

        //Step 9 : Grouping the timeLine Array for UI implementation purpose
        const groupedTimeLine = timeLine.reduce((groups, item) => {
          if (groups.length === 0 || groups[groups.length - 1][0] !== item) {
            groups.push([item]);
          } else {
            groups[groups.length - 1].push(item);
          }
          return groups;
        }, []);

        //Step 10 : Creating the timeIndex Array for the Gantt Chart Implementation.
        let timeIndex = [];
        let curTime = 0;
        for (let i = 0; i < groupedTimeLine.length; i++) {
          const count = groupedTimeLine[i].length;
          curTime += count;
          timeIndex.push(curTime);
        }

        state.PRisScheduled = true;
        state.PRshowScheduled = true;
        state.PRshowProcess = true;
        state.PRtimeLine = timeLine;
        state.PRwaitingTimeLine = waitingTimeLine;
        state.PRgroupedTimeLine = groupedTimeLine;
        state.PRtimeIndex = timeIndex;

        console.log(completedProcesses);
        console.log(state.PRscheduledProcess);
        console.log(state.PRtimeLine);
        console.log(state.PRwaitingTimeLine);
      } else if (action.payload === "SRTF") {
        let tempSRTFProcess = [...state.SRTFprocess];

        let SRTFProcess = tempSRTFProcess.sort(
          (p1, p2) => p1.arrTime - p2.arrTime
        );

        let SRTFScheduledProcess = [];
        let curTime = SRTFProcess[0].arrTime;
        let n = state.SRTFprocess.length;
        let timeline = new Array();
        let waitingTimeLine = new Array();
        for (let i = 0; i < curTime; i++) {
          timeline[i] = -1;
          waitingTimeLine[i] = [];
        }

        while (SRTFScheduledProcess.length != n) {
          let arrivedProcess = SRTFProcess.filter(
            (p) => p.tempArrTime <= curTime
          );
          let sortedArrivedProcess = arrivedProcess.sort(
            (p1, p2) => p1.remTime - p2.remTime
          );
          if (sortedArrivedProcess.length == 0) {
            timeline[curTime] = -1;
            waitingTimeLine[curTime] = [];
          }
          console.log("sortedArrived Process: ", sortedArrivedProcess);
          const nextProcess = sortedArrivedProcess.shift();

          timeline[curTime] = nextProcess.id;
          waitingTimeLine[curTime] = sortedArrivedProcess;
          nextProcess.remTime--;
          nextProcess.tempArrTime++;
          curTime++;
          if (nextProcess.remTime == 0) {
            nextProcess.ct = curTime;
            nextProcess.tat = nextProcess.ct - nextProcess.arrTime;
            nextProcess.wt = nextProcess.tat - nextProcess.burstTime;
            SRTFScheduledProcess.push(nextProcess);
            SRTFProcess.splice(
              SRTFProcess.findIndex((p) => p.id === nextProcess.id),
              1
            );
          }
        }

        const groupedTimeLine = timeline.reduce((groups, item) => {
          if (groups.length === 0 || groups[groups.length - 1][0] !== item) {
            groups.push([item]);
          } else {
            groups[groups.length - 1].push(item);
          }
          return groups;
        }, []);

        let timeIndex = [];
        let currTime = 0;
        for (let i = 0; i < groupedTimeLine.length; i++) {
          const count = groupedTimeLine[i].length;
          currTime += count;
          timeIndex.push(currTime);
        }
        for (let i = 0; i < state.SRTFprocess.length; i++) {
          state.SRTFprocess[i].remTime = state.SRTFprocess[i].burstTime;
          state.SRTFprocess[i].tempArrTime = state.SRTFprocess[i].arrTime;
        }

        let newWaitingTimeLine = [];
        for (let i = 0; i < waitingTimeLine.length; i++) {
          let instance = [];
          if (waitingTimeLine[i].length == 0) {
            instance.push(-1);
          } else {
            for (let j = 0; j < waitingTimeLine[i].length; j++) {
              instance.push(waitingTimeLine[i][j].id);
            }
          }
          newWaitingTimeLine.push(instance);
        }

        state.SRTFisScheduled = true;
        state.SRTFshowScheduled = true;
        state.SRTFshowProcess = true;
        state.SRTFtimeLine = timeline;
        state.SRTFwaitingTimeLine = newWaitingTimeLine;
        state.SRTFgroupedTimeLine = groupedTimeLine;
        state.SRTFtimeIndex = timeIndex;
        state.SRTFscheduledProcess = SRTFScheduledProcess;

        console.log("SRTF ScheduledProcess ", state.SRTFscheduledProcess);
        console.log("SRTF timeLine", state.SRTFtimeLine);
        console.log("SRTF waitingTimeLine", state.SRTFwaitingTimeLine);
      } else if (action.payload == "PrePR") {
        let tempPrePRProcess = [...state.PrePRprocess];

        let PrePRProcess = tempPrePRProcess.sort(
          (p1, p2) => p1.arrTime - p2.arrTime
        );

        let PrePRScheduledProcess = [];
        let curTime = PrePRProcess[0].arrTime;
        let n = state.PrePRprocess.length;
        let timeline = new Array();
        let waitingTimeLine = new Array();
        for (let i = 0; i < curTime; i++) {
          timeline[i] = -1;
          waitingTimeLine[i] = [];
        }

        while (PrePRScheduledProcess.length != n) {
          let arrivedProcess = PrePRProcess.filter((p) => p.arrTime <= curTime);
          let sortedArrivedProcess = arrivedProcess.sort(
            (p1, p2) => p1.Pr - p2.Pr
          );
          if (sortedArrivedProcess.length == 0) {
            timeline[curTime] = -1;
            waitingTimeLine[curTime] = [];
          }
          console.log("sortedArrived Process: ", sortedArrivedProcess);
          const nextProcess = sortedArrivedProcess.shift();

          timeline[curTime] = nextProcess.id;
          waitingTimeLine[curTime] = sortedArrivedProcess;
          nextProcess.tempArrTime++;
          nextProcess.remTime--;
          curTime++;
          if (nextProcess.remTime == 0) {
            nextProcess.ct = curTime;
            nextProcess.tat = nextProcess.ct - nextProcess.arrTime;
            nextProcess.wt = nextProcess.tat - nextProcess.burstTime;
            PrePRScheduledProcess.push(nextProcess);
            PrePRProcess.splice(
              PrePRProcess.findIndex((p) => p.id === nextProcess.id),
              1
            );
          }
        }

        const groupedTimeLine = timeline.reduce((groups, item) => {
          if (groups.length === 0 || groups[groups.length - 1][0] !== item) {
            groups.push([item]);
          } else {
            groups[groups.length - 1].push(item);
          }
          return groups;
        }, []);

        let timeIndex = [];
        let currTime = 0;
        for (let i = 0; i < groupedTimeLine.length; i++) {
          const count = groupedTimeLine[i].length;
          currTime += count;
          timeIndex.push(currTime);
        }
        for (let i = 0; i < state.PrePRprocess.length; i++) {
          state.PrePRprocess[i].remTime = state.PrePRprocess[i].burstTime;
          state.PrePRprocess[i].tempArrTime = state.PrePRprocess[i].arrTime;
        }

        let newWaitingTimeLine = [];
        for (let i = 0; i < waitingTimeLine.length; i++) {
          let instance = [];
          if (waitingTimeLine[i].length == 0) {
            instance.push(-1);
          } else {
            for (let j = 0; j < waitingTimeLine[i].length; j++) {
              instance.push(waitingTimeLine[i][j].id);
            }
          }
          newWaitingTimeLine.push(instance);
        }

        state.PrePRisScheduled = true;
        state.PrePRshowScheduled = true;
        state.PrePRshowProcess = true;
        state.PrePRtimeLine = timeline;
        state.PrePRwaitingTimeLine = newWaitingTimeLine;
        state.PrePRgroupedTimeLine = groupedTimeLine;
        state.PrePRtimeIndex = timeIndex;
        state.PrePRscheduledProcess = PrePRScheduledProcess;

        console.log("PrePR ScheduledProcess ", state.PrePRscheduledProcess);
        console.log("PrePR timeLine", state.PrePRtimeLine);
        console.log("PrePR waitingTimeLine", state.PrePRwaitingTimeLine);
      }

      return state;

      return state;
    case "clear":
      if (action.payload.Algo === "FCFS") {
        state.FCFSprocess = [];
        state.FCFSisScheduled = false;
        state.FCFSscheduledProcess = [];
        state.FCFSshowProcess = false;
        state.FCFSshowScheduled = false;
      } else if (action.payload.Algo === "SJF") {
        state.SJFprocess = [];
        state.SJFisScheduled = false;
        state.SJFscheduledProcess = [];
        state.SJFshowProcess = false;
        state.SJFshowScheduled = false;
      } else if (action.payload.Algo === "PR") {
        state.PRprocess = [];
        state.PRisScheduled = false;
        state.PRscheduledProcess = [];
        state.PRshowProcess = false;
        state.PRshowScheduled = false;
      } else if (action.payload.Algo === "SRTF") {
        state.SRTFprocess = [];
        state.SRTFisScheduled = false;
        state.SRTFscheduledProcess = [];
        state.SRTFshowProcess = false;
        state.SRTFshowScheduled = false;
      } else if (action.payload.Algo === "PrePR") {
        state.PrePRprocess = [];
        state.PrePRisScheduled = false;
        state.PrePRscheduledProcess = [];
        state.PrePRshowProcess = false;
        state.PrePRshowScheduled = false;
      }

      return state;
    default:
      return state;
  }
};

const changeTheAlgo = (dispatch) => (Algo) => {
  dispatch({ type: "changeTheAlgo", payload: { Algo } });
};

const addProcess = (dispatch) => (arrTime, burstTime, Algo) => {
  dispatch({ type: "add", payload: { arrTime, burstTime, Algo } });
};

const addProcessWithPR = (dispatch) => (arrTime, burstTime, Pr, Algo) => {
  dispatch({ type: "addPr", payload: { arrTime, burstTime, Pr, Algo } });
};

const clear = (dispatch) => (Algo) => {
  dispatch({ type: "clear", payload: { Algo } });
};

const schedule = (dispatch) => (algo) => {
  dispatch({ type: "schedule", payload: algo });
};

export const { Context, Provider } = createDataContext(
  algoReducer,
  { addProcess, clear, schedule, addProcessWithPR, changeTheAlgo },
  {
    FCFSprocess: [],
    FCFSscheduledProcess: [],
    FCFStimeLine: [],
    FCFSwaitingTimeLine: [],
    FCFStimeIndex: [],
    FCFSgroupedTimeLine: [],
    FCFSavgWaitingTime: 0,
    FCFSavgTurnArrTime: 0,
    FCFSshowProcess: false,
    FCFSisScheduled: false,
    FCFSshowScheduled: false,
    SJFprocess: [],
    SJFscheduledProcess: [],
    SJFtimeLine: [],
    SJFwaitingTimeLine: [],
    SJFtimeIndex: [],
    SJFgroupedTimeLine: [],
    SJFavgWaitingTime: 0,
    SJFavgTurnArrTime: 0,
    SJFshowProcess: false,
    SJFisScheduled: false,
    SJFshowScheduled: false,
    PRprocess: [],
    PRscheduledProcess: [],
    PRtimeLine: [],
    PRwaitingTimeLine: [],
    PRtimeIndex: [],
    PRgroupedTimeLine: [],
    PRavgWaitingTime: 0,
    PRavgTurnArrTime: 0,
    PRshowProcess: false,
    PRisScheduled: false,
    PRshowScheduled: false,
    SRTFprocess: [],
    SRTFscheduledProcess: [],
    SRTFtimeLine: [],
    SRTFwaitingTimeLine: [],
    SRTFtimeIndex: [],
    SRTFgroupedTimeLine: [],
    SRTFavgWaitingTime: 0,
    SRTFavgTurnArrTime: 0,
    SRTFshowProcess: false,
    SRTFisScheduled: false,
    SRTFshowScheduled: false,
    PrePRprocess: [],
    PrePRscheduledProcess: [],
    PrePRtimeLine: [],
    PrePRwaitingTimeLine: [],
    PrePRtimeIndex: [],
    PrePRgroupedTimeLine: [],
    PrePRavgWaitingTime: 0,
    PrePRavgTurnArrTime: 0,
    PrePRshowProcess: false,
    PrePRisScheduled: false,
    PrePRshowScheduled: false,
    selectedAlgorithm: "FCFS",
  }
);
