import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SignOutButton } from "@/components/sign-out";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

      <SignedIn>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>Welcome,</Text>
            <Text style={styles.headerText}> {user?.username}</Text>
          </View>
          <View>

          </View>
        </View>

        <SignOutButton />
      </SignedIn>
      <SignedOut >
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
      </View>
      <Pressable
        onPress={() => {
          router.push("/(root)/SignUpForm");
        }}
      >
        <Text>Next page</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 16,
    // justifyContent:"space-between",
  },
  content:{
        backgroundColor: "#1d1916",
    borderColor: "#26221f",
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    flexDirection:"row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header:{
    backgroundColor: "#1d1916",
    // borderColor: "#26221f",
    // borderWidth: 2,
    // padding: 12,
    // borderRadius: 8
  },
  headerText: {
    color: "white",
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily:"SpaceGrotesk-Medium"
  }
});
