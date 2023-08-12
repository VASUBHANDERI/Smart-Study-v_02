import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import useWindowSize from "../../Hooks/useWindowSize";
import getMediaQuery from "../../Hooks/getMediaQuery";

const DiskSchedulingTheory = () => {
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
        In the realm of modern computing, where data storage plays a pivotal
        role, disk scheduling algorithms serve as crucial mechanisms for
        optimizing data retrieval and access. Operating systems employ these
        algorithms to efficiently manage the movement of read/write heads on
        hard drives, solid-state drives (SSDs), and other storage devices. The
        goal? Minimize seek times, enhance data throughput, and provide a
        seamless user experience. Let's delve into the world of disk scheduling
        algorithms and understand how they impact our computing interactions.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}The Challenge of Disk Access:
      </Text>

      <Text style={styles.contentText}>
        {"\n"}In a multi-process environment, processes often compete for
        limited resources such as memory, CPU time, and I/O devices. Efficient
        resource allocation is essential to prevent resource contention and
        ensure smooth execution. However, improper resource management can lead
        to situations where processes enter a deadlock – a state in which they
        are indefinitely waiting for resources held by other processes. This can
        result in a complete system halt.
      </Text>
      <Text style={styles.headingText}>
        {"\n"}Common Disk Scheduling Algorithms:
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}1. First-Come, First-Served (FCFS):
        </Text> {""}
        Similar to its CPU scheduling counterpart, this algorithm processes
        requests in the order they arrive. However, it can lead to poor
        performance due to the phenomenon of "elevator seeking," where the
        read/write head moves back and forth across the disk.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}2. Shortest Seek Time First (SSTF):
        </Text> {""}
        This algorithm selects the request with the shortest seek time to
        minimize head movement. It improves performance compared to FCFS but can
        lead to starvation of certain requests located far from the current head
        position.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}3. SCAN (Elevator) Algorithm:
        </Text> {""}
        The SCAN algorithm moves the head in a single direction, serving
        requests along the way until it reaches the end. It then reverses
        direction and repeats the process. This prevents starvation and provides
        better average response times.
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}4. C-SCAN (Circular SCAN) Algorithm:
        </Text> {""}
        Similar to SCAN, but after reaching the end of the disk, the head
        immediately returns to the start. This helps reduce average access time
        by ensuring a consistent pattern of movement.
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}5. LOOK and C-LOOK Algorithms:
        </Text> {""}
        These are variants of SCAN and C-SCAN, respectively. Instead of
        traversing the entire range, LOOK and C-LOOK only move as far as
        necessary to fulfill pending requests, reducing unnecessary head
        movement.
      </Text>

      <Text style={styles.headingText}>{"\n"}Advantages and Trade-offs:</Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}Advantages: </Text>
        Efficient algorithms reduce seek times, leading to faster data access
        and improved overall system performance.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}Disadvantages: </Text>
        Some algorithms may favor specific types of workloads, potentially
        causing starvation for certain requests or creating irregular access
        patterns.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}Selecting the Right Algorithm:
      </Text>

      <Text style={styles.contentText}>
        {"\n"}Choosing the optimal disk scheduling algorithm depends on the
        specific use case and workload characteristics. For instance, SSTF is
        effective for minimizing seek times but may lead to some requests being
        overlooked. SCAN and its variants provide a balance between fairness and
        efficiency. Ultimately, the chosen algorithm must align with the
        system's goals and user expectations.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}Conclusion: Enhancing Data Access Efficiency:
      </Text>

      <Text style={styles.contentText}>
        {"\n"}Disk scheduling algorithms play a pivotal role in modern operating
        systems, facilitating seamless and rapid data access. By intelligently
        managing the movement of read/write heads, these algorithms contribute
        to improved system responsiveness, reduced latency, and enhanced overall
        user experience. As technology continues to evolve, refining disk
        scheduling techniques will remain a critical endeavor in the pursuit of
        efficient and effective data management.
      </Text>
    </View>
  );
};

export default DiskSchedulingTheory;
