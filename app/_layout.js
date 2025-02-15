import { Drawer } from "expo-router/drawer";
import { Provider as SchedulingAlgoProvider } from "../src/context/schedulingAlgoContext";
import { Provider as DiskManagementProvider } from "../src/context/diskManagementAlgoContext";
import { Provider as PageProvider } from "../src/context/pageReplacementAlgoContext";
import { Provider as BankersAlgoProvider } from "../src/context/bankersContext";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { background, main } from "../src/components/Colors";
import Constants from "expo-constants";
import { useFonts } from "expo-font";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DrawerContent } from "@react-navigation/drawer";
import { Stack, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "../src/context/authContext";
import { Provider as CommandProvider } from "../src/context/commandsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { DrawerActions } from "@react-navigation/native";

const isWeb = Platform.OS === "web";

const Flow = () => {
  const [loaded] = useFonts({
    Popins: require("../public/assets/fonts/Poppins-Light.ttf"),
  });

  const [terminal, setTerminal] = useState(true);

  const {
    state: { isLoggedIn, username },
    tryLocalAuth,
    signout,
  } = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    tryLocalAuth();
  }, []);
  if (!loaded) {
    return null;
  }

  if (isLoggedIn) {
    if (isWeb) {
      navigation.dispatch(DrawerActions.openDrawer());
    }
    return (
      <CommandProvider>
        <PageProvider>
          <DiskManagementProvider>
            <SchedulingAlgoProvider>
              <BankersAlgoProvider>
                <Drawer
                  drawerContent={(props) => (
                    <View style={styles.drawerContainer}>
                      <View
                        style={
                          isWeb ? styles.drawerHeaderWeb : styles.drawerHeader
                        }
                      >
                        <View style={styles.headerIconContainer}>
                          <Entypo
                            name="network"
                            size={isWeb ? scale(30) : scale(60)}
                            color={background}
                          />
                        </View>
                        <Text style={styles.drawerHeaderText}>Smart Study</Text>
                      </View>
                      <DrawerContent {...props} />
                      <View
                        style={{
                          backgroundColor: main,
                          paddingVertical: verticalScale(5),
                        }}
                      >
                        <Text style={styles.drawerFooterText}>
                          Copyright @ 2023 SmartStudy
                        </Text>
                        <Text style={styles.drawerFooterText}>
                          All Rights Reserved
                        </Text>
                      </View>
                    </View>
                  )}
                  screenOptions={{
                    drawerActiveBackgroundColor: "#E07A5F50",
                    drawerActiveTintColor: main,
                    drawerItemStyle: isWeb
                      ? styles.drawerItemWeb
                      : styles.drawerItem,
                    drawerLabelStyle: styles.drawerLable,
                    drawerActiveLabelStyle: styles.drawerItemSelected,
                    drawerItemContainerStyle: styles.drawerItemContainer,
                    drawerStyle: {
                      width: isWeb ? scale(210) : scale(330),
                    },
                    // drawerOpenRoute: isWeb ? "DrawerOpen" : null,
                  }}
                >
                  <Drawer.Screen
                    name="index"
                    options={{
                      title: "Smart Study",
                      drawerIcon: () => (
                        <Entypo
                          name="home"
                          size={isWeb ? scale(18) : scale(24)}
                          color={main}
                          style={{ marginLeft: isWeb ? scale(10) : scale(20) }}
                        />
                      ),
                      headerTintColor: background,
                      headerTitleStyle: styles.headerTitleStyle,
                      headerStyle: styles.headerStyle,
                      headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.openDrawer();
                            }}
                          >
                            <Entypo
                              name="network"
                              size={isWeb ? scale(30) : scale(50)}
                              color={background}
                              style={{
                                marginRight: scale(5),
                                marginLeft: isWeb ? scale(10) : scale(5),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      headerRight: () => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: background,
                                fontSize: scale(10),
                                fontWeight: "bold",
                              }}
                            >
                              {username}
                            </Text>
                            <TouchableOpacity onPress={signout}>
                              <Entypo
                                name="log-out"
                                size={isWeb ? scale(15) : scale(20)}
                                color={background}
                                style={{
                                  marginRight: scale(10),
                                  marginLeft: isWeb ? scale(10) : scale(5),
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      },
                    }}
                  />
                  <Drawer.Screen
                    name="Learn_Commands_Screen"
                    options={{
                      title: "Learn Commands",
                      drawerIcon: () => (
                        <FontAwesome5
                          name="book-reader"
                          size={isWeb ? scale(18) : scale(24)}
                          color={main}
                          style={{ marginLeft: isWeb ? scale(10) : scale(15) }}
                        />
                      ),
                      headerTintColor: background,
                      headerTitleStyle: styles.headerTitleStyle,
                      headerStyle: styles.headerStyle,
                      headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.openDrawer();
                            }}
                          >
                            <Entypo
                              name="network"
                              size={isWeb ? scale(30) : scale(50)}
                              color={background}
                              style={{
                                marginRight: scale(5),
                                marginLeft: isWeb ? scale(10) : scale(5),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      headerRight: () => {
                        if (isWeb) {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: background,
                                  fontSize: scale(10),
                                  fontWeight: "bold",
                                }}
                              >
                                {username}
                              </Text>

                              <TouchableOpacity onPress={signout}>
                                <Entypo
                                  name="log-out"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      },
                    }}
                  />
                  <Drawer.Screen
                    name="Play_Ground_Screen"
                    options={{
                      title: "Play Ground",
                      drawerIcon: () => (
                        <Ionicons
                          name="terminal"
                          size={isWeb ? scale(18) : scale(24)}
                          color={main}
                          style={{ marginLeft: isWeb ? scale(10) : scale(15) }}
                        />
                      ),
                      headerTintColor: background,
                      headerTitleStyle: styles.headerTitleStyle,
                      headerStyle: styles.headerStyle,
                      headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.openDrawer();
                            }}
                          >
                            <Entypo
                              name="network"
                              size={isWeb ? scale(30) : scale(50)}
                              color={background}
                              style={{
                                marginRight: scale(5),
                                marginLeft: isWeb ? scale(10) : scale(5),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      headerRight: () => {
                        const navigation = useNavigation();
                        if (false) {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: background,
                                  fontSize: scale(10),
                                  fontWeight: "bold",
                                }}
                              >
                                {username}
                              </Text>

                              <TouchableOpacity onPress={signout}>
                                <Entypo
                                  name="log-out"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        } else {
                          if (terminal) {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("File Structure");
                                  setTerminal(!terminal);
                                }}
                              >
                                <Entypo
                                  name="folder"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            );
                          } else {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate("Play Ground");
                                  setTerminal(!terminal);
                                }}
                              >
                                <Ionicons
                                  name="terminal"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            );
                          }
                        }
                      },
                      drawerItemStyle: isWeb
                        ? { height: 0 }
                        : styles.drawerItem,
                    }}
                  />
                  <Drawer.Screen
                    name="CPU_Scheduling_Screen"
                    options={{
                      title: "CPU Scheduling",
                      drawerIcon: () => (
                        <AntDesign
                          name="clockcircle"
                          size={isWeb ? scale(18) : scale(24)}
                          color={main}
                          style={{ marginLeft: isWeb ? scale(10) : scale(15) }}
                        />
                      ),
                      headerTintColor: background,
                      headerTitleStyle: styles.headerTitleStyle,
                      headerStyle: styles.headerStyle,
                      headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.openDrawer();
                            }}
                          >
                            <Entypo
                              name="network"
                              size={isWeb ? scale(30) : scale(50)}
                              color={background}
                              style={{
                                marginRight: scale(5),
                                marginLeft: isWeb ? scale(10) : scale(5),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      headerRight: () => {
                        if (isWeb) {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: background,
                                  fontSize: scale(10),
                                  fontWeight: "bold",
                                }}
                              >
                                {username}
                              </Text>

                              <TouchableOpacity onPress={signout}>
                                <Entypo
                                  name="log-out"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      },
                    }}
                  />
                  <Drawer.Screen
                    name="Page_Replacement_Screen"
                    options={{
                      title: "Page Replacement",
                      drawerIcon: () => (
                        <Entypo
                          name="database"
                          size={isWeb ? scale(18) : scale(24)}
                          color={main}
                          style={{ marginLeft: isWeb ? scale(10) : scale(15) }}
                        />
                      ),
                      headerTintColor: background,
                      headerTitleStyle: styles.headerTitleStyle,
                      headerStyle: styles.headerStyle,
                      headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.openDrawer();
                            }}
                          >
                            <Entypo
                              name="network"
                              size={isWeb ? scale(30) : scale(50)}
                              color={background}
                              style={{
                                marginRight: scale(5),
                                marginLeft: isWeb ? scale(10) : scale(5),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      headerRight: () => {
                        if (isWeb) {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: background,
                                  fontSize: scale(10),
                                  fontWeight: "bold",
                                }}
                              >
                                {username}
                              </Text>

                              <TouchableOpacity onPress={signout}>
                                <Entypo
                                  name="log-out"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      },
                    }}
                  />
                  <Drawer.Screen
                    name="Disk_Scheduling_Screen"
                    options={{
                      title: "Disk Scheduling",
                      drawerIcon: () => (
                        <FontAwesome5
                          name="record-vinyl"
                          size={isWeb ? scale(18) : scale(24)}
                          color={main}
                          style={{ marginLeft: isWeb ? scale(10) : scale(15) }}
                        />
                      ),
                      headerTintColor: background,
                      headerTitleStyle: styles.headerTitleStyle,
                      headerStyle: styles.headerStyle,
                      headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.openDrawer();
                            }}
                          >
                            <Entypo
                              name="network"
                              size={isWeb ? scale(30) : scale(50)}
                              color={background}
                              style={{
                                marginRight: scale(5),
                                marginLeft: isWeb ? scale(10) : scale(5),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      headerRight: () => {
                        if (isWeb) {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: background,
                                  fontSize: scale(10),
                                  fontWeight: "bold",
                                }}
                              >
                                {username}
                              </Text>

                              <TouchableOpacity onPress={signout}>
                                <Entypo
                                  name="log-out"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      },
                    }}
                  />
                  <Drawer.Screen
                    name="Bankers_Algorithm_Screen"
                    options={{
                      title: "Banker's Algorithm",
                      drawerIcon: () => (
                        <MaterialCommunityIcons
                          name="bank-transfer"
                          size={isWeb ? scale(18) : scale(24)}
                          color={main}
                          style={{ marginLeft: isWeb ? scale(10) : scale(15) }}
                        />
                      ),
                      headerTintColor: background,
                      headerTitleStyle: styles.headerTitleStyle,
                      headerStyle: styles.headerStyle,
                      headerLeft: () => {
                        const navigation = useNavigation();
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.openDrawer();
                            }}
                          >
                            <Entypo
                              name="network"
                              size={isWeb ? scale(30) : scale(50)}
                              color={background}
                              style={{
                                marginRight: scale(5),
                                marginLeft: isWeb ? scale(10) : scale(5),
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      headerRight: () => {
                        if (isWeb) {
                          return (
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  color: background,
                                  fontSize: scale(10),
                                  fontWeight: "bold",
                                }}
                              >
                                {username}
                              </Text>

                              <TouchableOpacity onPress={signout}>
                                <Entypo
                                  name="log-out"
                                  size={isWeb ? scale(15) : scale(20)}
                                  color={background}
                                  style={{
                                    marginRight: scale(10),
                                    marginLeft: isWeb ? scale(10) : scale(5),
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                          );
                        } else {
                          return null;
                        }
                      },
                      // drawerItemStyle: { height: 0 },
                    }}
                  />
                </Drawer>
                <StatusBar style="light" />
              </BankersAlgoProvider>
            </SchedulingAlgoProvider>
          </DiskManagementProvider>
        </PageProvider>
      </CommandProvider>
    );
  } else {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Smart Study",
            headerTintColor: background,
            headerTitleStyle: styles.headerTitleStyle,
            headerStyle: styles.headerStyle,
            headerLeft: () => {
              return (
                <Entypo
                  name="network"
                  size={isWeb ? scale(30) : scale(50)}
                  color={background}
                  style={{
                    marginRight: scale(5),
                    marginLeft: isWeb ? scale(10) : scale(1),
                  }}
                />
              );
            },
          }}
        />
      </Stack>
    );
  }
};

export default function Layout() {
  return (
    <AuthProvider>
      <Flow />
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: background,
  },
  drawerHeader: {
    backgroundColor: main,
    alignItems: "center",
    paddingLeft: Constants.statusBarHeight * 0.5,
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight,
    flexDirection: "row",
  },
  drawerHeaderWeb: {
    backgroundColor: main,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: verticalScale(10),
    paddingLeft: scale(5),
  },
  drawerHeaderText: {
    color: background,
    fontSize: isWeb ? scale(25) : scale(37),
    fontFamily: "Popins",
  },
  drawerItem: {
    fontSize: scale(18),
    fontFamily: "Popins",
    borderTopLeftRadius: verticalScale(30),
    borderBottomLeftRadius: verticalScale(30),
    marginHorizontal: scale(2),
  },
  drawerItemWeb: {
    fontSize: scale(10),
    fontFamily: "Popins",
    marginHorizontal: scale(2),
    borderRadius: scale(30),
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  drawerLable: {
    fontSize: isWeb ? scale(10) : scale(18),
    fontWeight: "600",
    fontFamily: "Popins",
  },
  drawerItemSelected: {
    backgroundColor: main,
    flex: 1,
  },
  drawerItemContainer: {
    flex: 1,
  },
  headerIconContainer: {
    marginRight: isWeb ? scale(10) : scale(15),
  },
  drawerFooterText: {
    color: background,
    fontFamily: "Popins",
    alignSelf: "center",
    fontSize: isWeb ? scale(7) : scale(13),
  },
  drawerScreenHeaderTitleStyle: {
    fontWeight: "600",
    fontSize: isWeb ? scale(22) : scale(30),
    fontFamily: "Popins",
  },
  headerStyle: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: verticalScale(4) },
    elevation: scale(20),
    backgroundColor: main,
    height: isWeb ? scale(40) : scale(80),
  },
  headerTitleStyle: {
    fontWeight: "600",
    fontSize: isWeb ? scale(20) : scale(25),
    fontFamily: "Popins",
  },
});
