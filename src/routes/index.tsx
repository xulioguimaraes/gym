import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const { colors } = useTheme();
  const { user, isLoadingStorageUserData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  if (isLoadingStorageUserData) {
    return <Loading />;
  }
  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
