import { BaseToast, ErrorToast } from "react-native-toast-message";
import { StyleSheet } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.toastContainer}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastTitle}
      text2Style={styles.toastMessage}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.toastContainer, { borderLeftColor: "#FF4D4F" }]}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastTitle}
      text2Style={styles.toastMessage}
    />
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    borderLeftWidth: 0,
    borderRadius: 12,
    backgroundColor: "#1C1C1E",
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 60,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  toastContent: {
    paddingHorizontal: 0,
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  toastMessage: {
    fontSize: 14,
    fontWeight: "400",
    color: "#ccc",
  },
});
