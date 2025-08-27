import { COLORS } from "@/constants/colors";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

type ToastProps = {
  visible: boolean;
  message: string;
  onHide: () => void;
  duration?: number; // default 2000ms
};

const Toast: React.FC<ToastProps> = ({ visible, message, onHide, duration = 2000 }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(scale, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start(() => {
          onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    backgroundColor: COLORS.secondaryBgColor,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
