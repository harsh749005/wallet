import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const modalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    backgroundColor: COLORS.secondaryBgColor,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontFamily:"Poppins-Bold",
    marginBottom: 10,
  },
  message: {
    color: COLORS.secondary,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    fontFamily:"Poppins-SemiBold",
  },
  removeButton: {
    backgroundColor: "#292524",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  removeText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#292524",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
  },
  closeText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});