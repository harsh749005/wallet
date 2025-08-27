// styles/create.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily:"SpaceGrotesk-Medium",
    color: COLORS.primary,
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.backButton,
  },
  saveButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: COLORS.green,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButton: {
    fontSize: 14,
    color: COLORS.primary,
    fontFamily:"Poppins-Medium"
  },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth:1,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    // backgroundColor:COLORS.background
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeIcon: {
    marginRight: 8,
  },
  typeButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontFamily:"Poppins-Medium"
  },
  typeButtonTextActive: {
    color: COLORS.background,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 30,
    color: COLORS.secondary,
    marginRight: 8,
    fontFamily:"SpaceGrotesk-Medium"
  },
  amountInput: {
    flex: 1,
    fontSize: 30,
    color: COLORS.primary,
    fontFamily:"SpaceGrotesk-Medium"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.secondaryBorder,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    color: COLORS.primary,
    fontFamily:"SpaceGrotesk-Medium",
    backgroundColor:"transparent",
  },
  inputIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: COLORS.primary,
    fontFamily:"Poppins-Medium"
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily:"Poppins-Medium",
    color: COLORS.secondary,
    marginBottom: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.tertiaryBorder,
    borderWidth: 1
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontFamily:"Poppins-Medium"
  },
  categoryButtonTextActive: {
    color: COLORS.background,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
