import { SignedIn, useUser } from "@clerk/clerk-expo";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SignOutButton } from "@/components/sign-out";
import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/useTransaction";
import PageLoader from "@/components/PageLoader";
import { COLORS } from "@/constants/colors";
import NoTransactionsFound from "@/components/NoTransactionsFound";
import { TransactionItem } from "@/components/TransactionItem";
import CustomAlert from "@/components/CustomModel";
import Card from "@/components/Card";
export default function Page() {
  const { user } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // console.log(toast.message);
  const { transactions, isLoading, loadData, deleteTransaction } =
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
      <Card />
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
  },
});
