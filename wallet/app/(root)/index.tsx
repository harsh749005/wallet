import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { SignOutButton } from "@/components/sign-out";

export default function Page() {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <SignedIn>
        <Text style={{ color: "white" }}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
        <Text style={{ color: "white" }}> {user?.username}</Text>

        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
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
    // justifyContent:"space-between",
  },
});
