import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import {  SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SignOutButton } from "@/components/sign-out";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import {useTransactions} from '@/hooks/useTransaction';
export default function Page() {
  const { user } = useUser();
  const {transactions, summary, isLoading, loadData, deleteTransaction } =  useTransactions(user?.id);
  const [visible, setVisible] = useState(false);

    useEffect(() => {
    loadData();
  }, [loadData]);

  console.log("Transactions:", transactions);
  console.log("Summary:", summary); 
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SignedIn>
          <View style={{backgroundColor: "#1d1916"}}>
            <Text style={styles.headerText}>Welcome,</Text>
            <Text style={styles.headerText}> {user?.username}</Text>
          </View>
        </SignedIn>
        <SignOutButton />
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Balance</Text>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={styles.balance}>{visible ? summary.balance : "$****.**"}</Text>
          <Ionicons name={visible ? "eye" : "eye-off"} size={24} color="white" onPress={toggleVisibility} />
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 16}}>
          <View>
            <Text style={styles.contentSubText}>Income</Text>
            <Text style={styles.SubBalance}>{visible ? summary.income : "$****.**"}</Text>
          </View>
          {/* straight line */}
          <View style={{ flexDirection: "row", marginLeft: 8, flex: 1, height: 50, alignItems: "center", justifyContent: "flex-end", gap: 10 }}>

          <View style={{ width: 2, height: 50, backgroundColor: "#26221f", marginHorizontal: 8 }} />
          <View >
            <Text style={styles.contentSubText}>Expenses</Text>
            <Text style={styles.SubBalance}>{visible ? summary.expenses : "$****.**"}</Text>
          </View>
          </View>
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 16,
    gap: 12,
    // justifyContent:"space-between",
  },
  header: {
    backgroundColor: "#1d1916",
    borderColor: "#26221f",
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    color: "white",
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "SpaceGrotesk-Medium",
  },
  content: {
    padding: 12,
    backgroundColor: "#1d1916",
    borderColor: "#26221f",
    borderWidth: 2,
    borderRadius: 8,
  },
  contentText: {
    color: "#a9a4a0",
    fontSize: 30,
    textTransform: "capitalize",
    fontFamily: "Poppins-Medium",
  },
  balance:{
    fontSize: 32,
    fontFamily: "SpaceGrotesk-Bold",
    color: "#e6e5e3",
    // marginTop: 8,
  },
  contentSubText: {
    color: "#a9a4a0",
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "Poppins-Medium",
  },
  SubBalance: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-Medium",
    color: "#e6e5e3",//red color
  },
});
