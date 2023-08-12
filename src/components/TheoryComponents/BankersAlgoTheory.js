import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import useWindowSize from "../../Hooks/useWindowSize";
import getMediaQuery from "../../Hooks/getMediaQuery";

const BankersAlgoTheory = () => {
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
        In the realm of operating systems, resource allocation is a critical
        task. Ensuring that processes receive the necessary resources while
        preventing deadlock and resource exhaustion requires sophisticated
        algorithms. One such algorithm, the Banker's Algorithm, plays a vital
        role in maintaining system stability and efficient resource utilization.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}Understanding the Challenge: Resource Allocation and Deadlock
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
        {"\n"}Introducing the Banker's Algorithm
      </Text>
      <Text style={styles.contentText}>
        {"\n"}The Banker's Algorithm, developed by Edsger W. Dijkstra, is a
        resource allocation and deadlock avoidance algorithm designed to
        maintain system stability and prevent deadlock. It operates on the
        principles of the "safe state" and employs a cautious approach to
        resource allocation. {"\n"} {"\n"}In essence, the Banker's Algorithm
        keeps track of the available resources, the maximum demand of each
        process, and the resources currently allocated to each process. It
        utilizes this information to determine if granting a resource request
        will lead to a safe state – one in which all processes can complete
        their execution without encountering a deadlock.
      </Text>
      <Text style={styles.headingText}>
        {"\n"}How the Banker's Algorithm Works:
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}1. Initialization: </Text>
        The system initializes the available resources and maximum demand
        matrices based on the resources available in the system and the maximum
        needs of each process.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}2. Resource Request: </Text>
        When a process requests additional resources, the algorithm checks if
        granting these resources will result in a safe state. If so, the
        resources are allocated; otherwise, the process is made to wait until
        resources become available.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}3. Resource Release: </Text>
        When a process finishes its execution and releases resources, the
        algorithm updates the available resources matrix accordingly.
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}4. Safety Check: </Text> The
        algorithm periodically checks if the current resource allocation allows
        for a safe sequence of process execution. If such a sequence exists, the
        system is in a safe state and can continue allocating resources. If not,
        the allocation is postponed until it can be guaranteed to be safe.
      </Text>

      <Text style={styles.headingText}>{"\n"}Benefits and Limitations:</Text>

      <Text
        style={{
          fontWeight: "bold",
          fontFamily: "Popins",
          fontSize: contentWidth / 35,
        }}
      >
        {"\n"}Advantages:
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}1. Deadlock Avoidance:</Text>
        Banker's Algorithm helps prevent deadlock by carefully analyzing
        resource requests and ensuring they won't lead to a deadlock.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          2. Efficient Resource Utilization:
        </Text>
        The algorithm allows for efficient resource allocation, maximizing the
        use of available resources.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>3. Safe State Determination:</Text>
        Banker's Algorithm provides a clear method to determine whether the
        system is in a safe state, reducing the risk of deadlocks.
      </Text>

      <Text
        style={{
          fontWeight: "bold",
          fontFamily: "Popins",
          fontSize: contentWidth / 35,
        }}
      >
        {"\n"}Limitations:
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}1. Resource Requirement Knowledge:
        </Text>
        The algorithm requires advance knowledge of the maximum resource
        requirements of each process, which might not always be available.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>2. Complexity:</Text>
        Implementation and maintenance of the Banker's Algorithm can be complex,
        especially in dynamic environments with frequent resource requests.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
         3. Resource Fragmentation:
        </Text>
        If resource allocation is not well-managed, the system can experience
        resource fragmentation, reducing overall efficiency.
      </Text>

      <Text style={styles.headingText}>{"\n"}Conclusion:</Text>

      <Text style={styles.contentText}>
        {"\n"}The Banker's Algorithm stands as a testament to the ingenuity of
        computer scientists in addressing complex challenges within operating
        systems. By prioritizing system stability and effective resource
        allocation, this algorithm serves as a crucial tool in preventing
        deadlocks and ensuring the smooth operation of multi-process
        environments. While it comes with its own set of complexities, the
        Banker's Algorithm remains a cornerstone in the field of resource
        management and deadlock avoidance, contributing to the reliability and
        efficiency of modern operating systems.
      </Text>
    </View>
  );
};

export default BankersAlgoTheory;
