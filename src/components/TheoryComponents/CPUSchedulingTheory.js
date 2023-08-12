import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import useWindowSize from "../../Hooks/useWindowSize";
import getMediaQuery from "../../Hooks/getMediaQuery";

const CPUSchedulingTheory = () => {
  const [width, height] = useWindowSize();
  const [loaded] = useFonts({
    Popins: require("../../../public/assets/fonts/Poppins-Light.ttf"),
  });

  const [isMobileWidth, isTabletWidth, isDesktopWidth, isWide] =
    getMediaQuery();
  const contentWidth = isWide ? width * 0.4 : width;
  const contentHeight = isWide ? height : height * 0.4;
  const styles = StyleSheet.create({
    headingText: {
      fontFamily: "Popins",
      fontSize: contentWidth / 30,
      fontWeight: "bold",
      textAlign: "justify",
    },
    contentText: {
      fontFamily: "Popins",
      fontSize: contentWidth / 40,
      fontWeight: "400",
      textAlign: "justify",
    },
    container: {
      flex: 1,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.contentText}>
        In the intricate world of computer operating systems, the efficient
        allocation of the central processing unit (CPU) plays a pivotal role in
        delivering optimal performance. This is where CPU scheduling algorithms
        step in, orchestrating the dance of processes vying for precious CPU
        time. In this article, we'll delve into the realm of CPU scheduling
        algorithms, exploring their significance, types, and impact on system
        performance.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}The Essence of CPU Scheduling:
      </Text>

      <Text style={styles.contentText}>
        {"\n"}Imagine a bustling kitchen where chefs (processes) are eager to
        cook their dishes (execute their tasks) on a single stove (CPU). The
        challenge lies in ensuring a fair and efficient distribution of stove
        time to each chef, minimizing waiting times and maximizing productivity.
        This is akin to the role CPU scheduling algorithms play in operating
        systems.
      </Text>
      <Text style={styles.headingText}>
        {"\n"}Types of CPU Scheduling Algorithms:
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}1. First-Come, First-Served (FCFS):
        </Text>{" "}
        {""}
        The simplest of them all, FCFS serves processes in the order they
        arrive. While straightforward, it can lead to inefficiencies, with
        longer tasks delaying shorter ones, like a slow-cooking dish delaying
        the entire meal.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}2. Shortest Job First (SJF) and Shortest Remaining Time First
          (SRTF):
        </Text>{" "}
        {""}
        SJF prioritizes processes with the shortest burst time, aiming to
        minimize waiting times. SRTF takes this a step further, allowing
        preemption – shorter tasks can interrupt ongoing ones, enhancing
        efficiency at the cost of more context switches.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}3. Priority Scheduling:
        </Text>{" "}
        {""}
        Like giving VIP passes at a concert, priority scheduling assigns each
        process a priority level. The CPU caters to higher-priority tasks first,
        ensuring critical operations get the spotlight. However, this can
        inadvertently overshadow lower-priority tasks, leading to a potential
        fairness concern.
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}4. Round Robin (RR):</Text>{" "}
        {""}
        Picture a rotating carousel at an amusement park. RR gives each process
        a fixed time slice on the CPU, ensuring fairness and preventing any
        process from hogging the limelight for too long. While democratic, this
        approach can lead to suboptimal execution for long-running tasks.
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}5. Multilevel Queue and Multilevel Feedback Queue:
        </Text>{" "}
        {""}
        Imagine a multi-stage kitchen with different chefs handling different
        types of orders. Multilevel queues categorize processes, each with its
        own scheduling algorithm. Feedback queues, a dynamic variant, let
        processes move between queues based on their behavior – like switching a
        chef's station based on their performance.
      </Text>

      <Text style={styles.headingText}>{"\n"}Balancing Act:</Text>
      <Text style={styles.contentText}>
        {"\n"}Every scheduling algorithm brings its own set of advantages and
        drawbacks. While some focus on minimizing waiting times or prioritizing
        critical tasks, others ensure fairness and equal distribution of
        resources. The choice of algorithm depends on the system's nature –
        real-time systems demand responsiveness, while batch processing systems
        might prioritize efficiency.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}Impact on System Performance:
      </Text>

      <Text style={styles.contentText}>
        {"\n"}CPU scheduling algorithms directly influence system performance
        metrics. Average waiting times, turnaround times (from submission to
        completion), and response times (time to first CPU response) are key
        indicators. A well-chosen algorithm can significantly enhance these
        metrics, translating to snappier user experiences and efficient resource
        utilization.
      </Text>

      <Text style={styles.headingText}>{"\n"}Conclusion</Text>

      <Text style={styles.contentText}>
        {"\n"}CPU scheduling algorithms are the conductors of the symphony
        within an operating system, orchestrating processes to create harmonious
        performance. Each algorithm brings its unique flavor, catering to
        different system requirements and objectives. The challenge lies in
        finding the right balance between responsiveness, efficiency, and
        fairness, ensuring a seamless computing experience for users and
        processes alike. As technology evolves, so too will the artistry behind
        CPU scheduling, continually striving to deliver optimal results in the
        ever-evolving landscape of operating systems.
      </Text>
    </View>
  );
};

export default CPUSchedulingTheory;
