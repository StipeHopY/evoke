import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import useColorScheme from "@/common/hooks/useColorScheme";
import { RootState } from "@/store/store";
import Sort from "./Sort";
import Filter from "./Filter";

// TODO: right corner beside title make button "motivation" and motivate user
// TODO: make better and modern header
// TODO: remove padding on sides for better header

const Header = () => {
  const theme = useColorScheme();
  const user = useSelector((state: RootState) => state.user);
  const tasksLength = useSelector((state: RootState) => state.tasks.length);
  const selectedTasksLength = useSelector(
    (state: RootState) => state.tasks.tasks.length
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {user ? (
          <Text>
            Hello <Text style={{ fontWeight: "bold" }}>{user.username}</Text>
          </Text>
        ) : (
          "Hi 👋"
        )}
      </Text>
      {tasksLength > 0 && (
        <View style={styles.dataOrganizerContainer}>
          <Filter />
          <View style={styles.sortContainer}>
            <Text
              style={[styles.taskLengthText, { color: theme.colors.inactive }]}
            >
              {selectedTasksLength} tasks
            </Text>
            <Sort />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
  },
  dataOrganizerContainer: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    gap: 12,
  },
  sortContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskLengthText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Header;
