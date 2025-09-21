import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Modal from "./Modal";
import useColorScheme from "@/common/hooks/useColorScheme";

type ErrorProps = {
  message: string | null;
  setMessage?: (message: string | null) => void;
  isModal?: boolean;
};

// TODO: make better modal, use someone's else
  // TODO: remove error component and replace every error with toast react native

const Error = ({ message, setMessage, isModal = false }: ErrorProps) => {
  const [isOpen, setIsOpen] = useState(!!message);
  const theme = useColorScheme();

  const handleClose = () => {
    setIsOpen(false);
    if (setMessage) {
      setMessage(null);
    }
  };

  useEffect(() => {
    setIsOpen(!!message);
  }, [message]);

  return isModal ? (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <View style={styles.modalContent}>
        <Text style={[styles.modalText, { color: theme.colors.text }]}>
          {message}
        </Text>
        <View
          style={[styles.divider, { borderTopColor: theme.colors.border }]}
        />
        <Pressable onPress={handleClose} style={styles.okButton}>
          <Text style={[styles.okButtonText, { color: theme.colors.text }]}>
            OK
          </Text>
        </Pressable>
      </View>
    </Modal>
  ) : (
    <View style={{ opacity: message ? 1 : 0 }}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    borderTopWidth: 1,
    alignSelf: "stretch",
    marginBottom: 10,
  },
  okButton: {
    paddingVertical: 12,
    alignItems: "center",
    alignSelf: "stretch",
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default Error;
