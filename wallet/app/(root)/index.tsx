import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import {  SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SignOutButton } from "@/components/sign-out";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import {useTransactions} from '@/hooks/useTransaction';
import PageLoader from "@/components/PageLoader";
import { router } from "expo-router";
import { COLORS } from "@/constants/colors";
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
  if(isLoading) return <PageLoader/>
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
        <Text style={styles.balance} onPress={()=>router.push("/Create")}>Create</Text>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={styles.balance}>{visible ? summary.balance : "$****.**"}</Text>
          <Ionicons name={visible ? "eye" : "eye-off"} size={24} color="white" onPress={toggleVisibility} />
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 16}}>
          <View>
            <Text style={styles.contentSubText}>Income</Text>
            <Text style={styles.income}>{visible ? summary.income : "$****.**"}</Text>
          </View>
          {/* straight line */}
          <View style={{ flexDirection: "row", marginLeft: 8, flex: 1, height: 50, alignItems: "center", justifyContent: "flex-end", gap: 10 }}>

          <View style={{ width: 2, height: 50, backgroundColor: COLORS.secondaryBorder, marginHorizontal: 8 }} />
          <View >
            <Text style={styles.contentSubText}>Expenses</Text>
            <Text style={styles.expenses}>{visible ? summary.expenses : "$****.**"}</Text>
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
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    gap: 12,
    // justifyContent:"space-between",
  },
  header: {
    backgroundColor: COLORS.secondaryBgColor,
    borderColor: COLORS.secondaryBorder,
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
    backgroundColor: COLORS.secondaryBgColor,
    borderColor: COLORS.secondaryBorder,
    borderWidth: 2,
    borderRadius: 8,
  },
  contentText: {
    color: COLORS.secondary,
    fontSize: 30,
    textTransform: "capitalize",
    fontFamily: "Poppins-Medium",
  },
  balance:{
    fontSize: 32,
    fontFamily: "SpaceGrotesk-Bold",
    color: COLORS.primary,
    // marginTop: 8,
  },
  contentSubText: {
    color: COLORS.secondary,
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "Poppins-Medium",
  },
    income: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-Medium",
    color: COLORS.green,
  },
  expenses: {
    fontSize: 24,
    fontFamily: "SpaceGrotesk-Medium",
    color: COLORS.red,
  },
});
