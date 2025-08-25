import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Handle submission of sign-up form
  const handleBackPress = (): void => {
    // Handle back navigation here
    router.back();
  };
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    
    setLoading(true);
    const showToast = (
      title: string,
      description: string,
      isError: boolean = false
    ) => {
      Alert.alert(title, description);
    };

    if (!emailAddress) {
      showToast("Email required", "Please enter your email address", true);
      return;
    }

    if (!emailAddress.includes("@")) {
      showToast("Invalid email", "Please enter a valid email address", true);
      return;
    }


    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });
      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setTimeout(()=>{
        setLoading(false);
      }, 3000);
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      setLoading(true);
      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setTimeout(() => {
          router.replace("/");
          setLoading(false);
        }, 3000);
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
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
              <AntDesign name="left" size={20} color="#ffffffff" />
            </TouchableOpacity>
          </View>
          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.formContainer}>
              {/* Heading */}
              <View style={styles.headingContainer}>
                <Text style={styles.title}>Enter code</Text>
                <Text style={styles.subtitle}>
                  We sent verification code to your email.
                </Text>
              </View>

              {/* Form */}
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  {/* <Text style={styles.label}>Email</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="code"
                    placeholderTextColor="#bcbbbc"
                    value={code}
                    onChangeText={(code) => setCode(code)}
                    keyboardType="number-pad"
                    autoCorrect={false}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 3,
                      marginTop: 5,
                    }}
                  >
                    <Text style={{ color: "#a9a4a0" }}>
                      {"You didn't receive the code?"}
                    </Text>

                    <Text
                      style={{ color: "#ffffffff" }}
                      onPress={onSignUpPress}
                    >
                      Resend it
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: code.length === 6 ? "#ffffffff" : "#848484" },
          ]}
          onPress={onVerifyPress}
          activeOpacity={0.9}
        >
          <Text style={styles.continueButtonText}>
            {loading ? <ActivityIndicator size={24} color={"#0a0a0a"}/> : "Verify"}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

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
            <AntDesign name="left" size={20} color="#ffffffff" />
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
                {/* <Text style={styles.label}>Email</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#bcbbbc"
                  value={emailAddress}
                  onChangeText={(email) => setEmailAddress(email)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                />
                <TextInput
                  style={styles.input}
                  placeholderTextColor="#bcbbbc"
                  value={password}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <Text style={{ color: "#a9a4a0" }}>Already have an account?</Text>
              <Link href="/sign-in">
                <Text style={{ color: "#ffffffff" }}>Sign in</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          {
            backgroundColor:
              emailAddress.length !== 0 && password.length > 8
                ? "#ffffffff"
                : "#848484",
          },
        ]}
        onPress={onSignUpPress}
        activeOpacity={0.9}
      >
        <Text style={styles.continueButtonText}>
            {loading ? <ActivityIndicator size={24} color={"#0a0a0a"}/> : "Continue"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#292524",
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
    fontSize: 30,
    fontWeight: "600",
    color: "#e6e5e3",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#a9a4a0",
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
    color: "#a9a4a0",
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#2a2625",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#bcbbbc",
    // #F9FAFB
    backgroundColor: "#1d1916",
  },
  continueButton: {
    height: 48,
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
  },
  continueButtonText: {
    color: "#0a0a0a",
    fontSize: 18,
    fontWeight: "600",
  },
});
