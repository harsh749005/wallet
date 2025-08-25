import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

interface SignupFormProps {}
const SignupForm: React.FC<SignupFormProps> = () => {
  const [email, setEmail] = useState<string>("");

  const showToast = (
    title: string,
    description: string,
    isError: boolean = false
  ) => {
    Alert.alert(title, description);
  };

  const handleContinue = (): void => {
    if (!email) {
      showToast("Email required", "Please enter your email address", true);
      return;
    }

    if (!email.includes("@")) {
      showToast("Invalid email", "Please enter a valid email address", true);
      return;
    }

    showToast("Success!", "Continue with your signup process");
  };

  const handleBackPress = (): void => {
    // Handle back navigation here
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffffff" />
          </TouchableOpacity>
        </View>
        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.formContainer}>
            {/* Heading */}
            <View style={styles.headingContainer}>
              <Text style={styles.title}>Create new account</Text>
              <Text style={styles.subtitle}>
                Sign in or sign up with your email.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="sara.cruz@example.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.9}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    // justifyContent:"space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    // backgroundColor: 'pink',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  content: {
    // flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 80,
  },
  formContainer: {
    gap: 24,
  },
  headingContainer: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#f5f5f5",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db8f",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#f5f5f5",
    // #F9FAFB
    backgroundColor: "transparent",
  },
  continueButton: {
    height: 48,
    backgroundColor: "#faf0cc",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  continueButtonText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "500",
  },
});
