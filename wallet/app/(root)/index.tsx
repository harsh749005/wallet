import { SignedIn, useUser } from "@clerk/clerk-expo";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SignOutButton } from "@/components/sign-out";
import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransaction";
import PageLoader from "@/components/PageLoader";
import { COLORS } from "@/constants/colors";
import NoTransactionsFound from "@/components/NoTransactionsFound";
import { TransactionItem } from "@/components/TransactionItem";
import CustomAlert from "@/components/CustomModel";
import Card from "@/components/Card";
import { router } from "expo-router";
export default function Page() {
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // console.log(toast.message);
  const { transactions, isLoading, loadData, deleteTransaction, summary } =
    useTransactions(user?.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setModalVisible(true);
  };
    const [visible, setVisible] = useState(false);
  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  if (isLoading && !refreshing) return <PageLoader />;
  return (
    <SafeAreaView style={[styles.container,{position:"relative"}]}>
      
      <CustomAlert
        visible={modalVisible}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction?"
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          if (deleteId) {
            deleteTransaction(deleteId); // <-- delete logic
          }
          setModalVisible(false);
        }}
      />
      <View style={styles.header}>
        <SignedIn>
          <View style={{ backgroundColor: "#1d1916" }}>
            <Text style={styles.headerText}>Welcome,</Text>
            <Text style={styles.headerText}> {user?.username}</Text>
          </View>
        </SignedIn>
        <SignOutButton />
      </View>

    <View style={styles.content}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.contentText}>Balance</Text>
        <Text
          style={{ color: "white", fontFamily: "Poppins-SemiBold" }}
          onPress={() => router.push("/Create")}
        >
          Add
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.balance}>
          {visible ? summary.balance : "$****.**"}
        </Text>
        <Ionicons
          name={visible ? "eye" : "eye-off"}
          size={24}
          color="white"
          onPress={toggleVisibility}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <View>
          <Text style={styles.contentSubText}>Income</Text>
          <Text style={styles.income}>
            {visible ? summary.income : "$****.**"}
          </Text>
        </View>
        {/* straight line */}
        <View
          style={{
            flexDirection: "row",
            marginLeft: 8,
            flex: 1,
            height: 50,
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 2,
              height: 50,
              backgroundColor: COLORS.secondaryBorder,
              marginHorizontal: 8,
            }}
          />
          <View>
            <Text style={styles.contentSubText}>Expenses</Text>
            <Text style={styles.expenses}>
              {visible ? summary.expenses : "$****.**"}
            </Text>
          </View>
        </View>
      </View>
    </View>

      {/* <Card /> */}
      <View style={{ marginTop: 16 }}>
        <Text style={styles.contentSubText}>Recent Transactions</Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 8,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View></View>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <TransactionItem item={item} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<NoTransactionsFound />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
  contentSubText: {
    color: COLORS.secondary,
    fontSize: 16,
    textTransform: "capitalize",
    fontFamily: "Poppins-Medium",
  }, content: {
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
  balance: {
    fontSize: 32,
    fontFamily: "SpaceGrotesk-Bold",
    color: COLORS.primary,
    // marginTop: 8,
  },
  // contentSubText: {
  //   color: COLORS.secondary,
  //   fontSize: 16,
  //   textTransform: "capitalize",
  //   fontFamily: "Poppins-Medium",
  // },
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
