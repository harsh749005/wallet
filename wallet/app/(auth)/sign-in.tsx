import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        setLoading(true);
        setTimeout(()=>{
          router.replace('/')
          setLoading(false);
        },3000)
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
        <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            
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
              <Text style={styles.title}>Continue with email</Text>
              <Text style={styles.subtitle}>
                Sign in with your email.
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
              <Text style={{ color: "#a9a4a0" }}>create new account ,</Text>
              <Link href="/sign-up">
                <Text style={{ color: "#ffffffff" }}>Sign Up</Text>
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
        onPress={onSignInPress}
        activeOpacity={0.9}
      >
        <Text style={styles.continueButtonText}>
          {loading ? <ActivityIndicator size={24} color={"#0a0a0a"}/> : "Continue"}</Text>
      </TouchableOpacity>
    </SafeAreaView>

  )
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
