import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import useWindowSize from "../../Hooks/useWindowSize";
import getMediaQuery from "../../Hooks/getMediaQuery";

const PageReplacementAlgoTheory = () => {
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
        In the intricate dance of memory management within an operating system,
        one key challenge is to efficiently manage the limited physical memory
        available for processes. This is where page replacement algorithms come
        into play, ensuring optimal utilization of memory resources and
        maintaining smooth system performance. Let's dive into the world of page
        replacement algorithms and their role in modern operating systems.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}The Need for Page Replacement:
      </Text>

      <Text style={styles.contentText}>
        {"\n"}Modern computing systems use virtual memory to provide each
        process with an illusion of abundant memory, even though physical memory
        is limited. This virtual memory is divided into fixed-size blocks called
        pages. When a process requests memory, the operating system allocates
        pages from physical memory or, if needed, swaps out some pages to
        secondary storage (usually a disk). {"\n"}
        {"\n"}Page replacement becomes crucial when physical memory becomes full
        and the system needs to decide which pages to evict to make room for new
        ones. The goal is to minimize the number of page faults (a page being
        accessed but not present in physical memory) and thereby prevent
        excessive swapping, which can severely degrade performance.
      </Text>
      <Text style={styles.headingText}>
        {"\n"}Popular Page Replacement Algorithms:
      </Text>
      <Text style={styles.contentText}>
        {"\n"}Several page replacement algorithms have been developed to strike
        a balance between performance and complexity. Here are some prominent
        ones:
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}1. FIFO (First-In-First-Out):
        </Text>{" "}
        {""}
        This simple algorithm replaces the oldest page in memory, akin to a
        queue. While easy to implement, it suffers from the "Belady's Anomaly,"
        where increasing the number of frames can lead to more page faults.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}2. LRU (Least Recently Used):
        </Text>{" "}
        {""}
        LRU replaces the page that has not been used for the longest time. While
        effective in theory, it can be costly to implement efficiently,
        especially as the number of pages grows.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}3. MRU (Most Recently Used):
        </Text>{" "}
        {""}
        MRU replaces the page that has been most recently accessed. This can be
        particularly useful when prioritizing the retention of pages that have
        seen recent activity.
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}4. Optimal Page Replacement:
        </Text>{" "}
        {""}
        Theoretical in nature, this algorithm replaces the page that will not be
        used for the longest time in the future. It provides the best possible
        performance but is practically unattainable due to the need for
        clairvoyant knowledge of future memory accesses.
      </Text>

      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}5. LFU (Least Frequently Used):
        </Text>{" "}
        {""}
        LFU replaces the page that has been used the least number of times.
        While it sounds intuitive, it can struggle in handling rapidly changing
        access patterns.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>
          {"\n"}6. Random Page Replacement:
        </Text>{" "}
        {""}As the name suggests, this algorithm randomly selects a page to
        replace. While simple, it can result in unpredictable and inconsistent
        performance.
      </Text>
      <Text style={styles.headingText}>{"\n"} Advantages and Limitations:</Text>
      <Text style={styles.contentText}>
        {"\n"}Each page replacement algorithm comes with its advantages and
        limitations:
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}Advantages: </Text>
        Efficient page replacement can significantly reduce page faults and
        improve system performance. Some algorithms, like LRU and Optimal, can
        closely approximate optimal performance under certain conditions.
      </Text>
      <Text style={styles.contentText}>
        <Text style={{ fontWeight: "bold" }}>{"\n"}Disadvantages: </Text>
        The challenge lies in selecting an algorithm that suits the specific
        system's access patterns. Some algorithms are computationally expensive
        to implement, while others might not handle certain types of workloads
        effectively.
      </Text>

      <Text style={styles.headingText}>
        {"\n"}Choosing the Right Algorithm:
      </Text>

      <Text style={styles.contentText}>
        {"\n"}The selection of a page replacement algorithm depends on the
        system's memory access patterns, available resources, and performance
        requirements. There's no one-size-fits-all solution, and the choice
        often involves trade-offs between simplicity and effectiveness.
      </Text>

      <Text style={styles.headingText}>{"\n"}Conclusion</Text>

      <Text style={styles.contentText}>
        {"\n"}In conclusion, page replacement algorithms are a critical piece of
        the memory management puzzle in operating systems. They determine how
        processes coexist harmoniously within the constraints of limited
        physical memory. By intelligently selecting which pages to replace,
        these algorithms contribute to optimal system performance and a smoother
        user experience.
      </Text>
    </View>
  );
};

export default PageReplacementAlgoTheory;
