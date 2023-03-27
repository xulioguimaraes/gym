import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";

import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { useTheme } from "native-base";
import { Platform } from "react-native";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
};

export type AppNavigatorRouterProps = BottomTabNavigationProp<AppRoutes>;

const { Screen, Navigator } = createBottomTabNavigator<AppRoutes>();

export const AppRoutes = () => {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];
  const colorButtonActive = colors.green[500];
  const colorButtonInative = colors.gray[200];
  const colorBackgroudBar = colors.gray[400];
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colorButtonActive,
        tabBarInactiveTintColor: colorButtonInative,
        tabBarStyle: {
          backgroundColor: colorBackgroudBar,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 0,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <HomeSvg fill={color} width={iconSize} height={iconSize} />;
          },
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <HistorySvg fill={color} width={iconSize} height={iconSize} />
            );
          },
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <ProfileSvg fill={color} width={iconSize} height={iconSize} />
            );
          },
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
};
