import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "@/constants/colors"

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{  flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: "#0a0a0a" }}>
      {children}
    </View>
  );
};

export default SafeScreen;
