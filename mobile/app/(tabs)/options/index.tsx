import { View, Text, Image, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper"; // or your own
import { PieChart } from "react-native-chart-kit"; // example chart lib

const OptionsScreen = () => {
  const level = 5;
  const currentXP = 120;
  const nextXP = 180;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.level}>🏆 Level {level}</Text>
        </View>
      </View>

      {/* XP Progress */}
      <Text style={styles.xpText}>{currentXP} / {nextXP} XP</Text>
      <ProgressBar progress={currentXP / nextXP} color="#4cafef" style={styles.progressBar} />

      {/* Stats */}
      <View style={styles.stats}>
        <Text>✅ Tasks Completed: 134</Text>
        <Text>🔥 Current Streak: 7 days</Text>
        <Text>🏷 Most Active Label: Health</Text>
        <Text>⏳ Total Hours: 82</Text>
      </View>

      {/* Category Breakdown */}
      <Text style={styles.sectionTitle}>Category Breakdown</Text>
      <PieChart
        data={[
          { name: "Work", population: 35, color: "#f39c12" },
          { name: "Health", population: 25, color: "#27ae60" },
          { name: "Personal", population: 20, color: "#2980b9" },
          { name: "Learning", population: 20, color: "#9b59b6" },
        ]}
        width={320}
        height={180}
        chartConfig={{
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="10"
      />

      {/* Achievements */}
      <Text style={styles.sectionTitle}>Achievements</Text>
      <View style={styles.achievements}>
        <Text>🥇 First Task Completed</Text>
        <Text>🔥 7-Day Streak</Text>
        <Text>💪 50 Health Points Earned</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  username: { fontSize: 20, fontWeight: "600" },
  level: { fontSize: 16, color: "#888" },
  xpText: { marginBottom: 5, textAlign: "center" },
  progressBar: { height: 10, borderRadius: 5, marginBottom: 20 },
  stats: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "500", marginTop: 10, marginBottom: 5 },
  achievements: { gap: 5 },
});

export default OptionsScreen;
