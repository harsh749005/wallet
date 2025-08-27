import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import { useTransactions } from "@/hooks/useTransaction";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";

const Card = () => {
  const { user } = useUser();
  const { summary, loadData } = useTransactions(user?.id);
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
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
        {/* <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:5}}> */}

        {/* <AntDesign name="pluscircleo" size={20} color="white" /> */}
        {/* </View> */}
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
  );
};

export default Card;

const styles = StyleSheet.create({
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
  balance: {
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
