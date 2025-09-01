import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal as RNModal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import useColorScheme from "@/common/hooks/useColorScheme";

const screenHeight = Dimensions.get("window").height;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label?: string;
};

// TODO: this RNModal has already built-in animations, consider using them

const Modal = ({ isOpen, onClose, children, label }: Props) => {
  const theme = useColorScheme();

  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const pan = Animated.add(translateY, dragY);

  const handleOnCloseModal = () => {
    onClose();
    handleAnimationClose();
  };

  const handleAnimationClose = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dragY.setValue(0);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          dragY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          handleOnCloseModal();
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isOpen) {
      dragY.setValue(0);
      translateY.setValue(screenHeight);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  // TODO: check if animations are always rendering even if isOpen is false

  return (
    <RNModal
      transparent={true}
      visible={isOpen}
      animationType="none"
      onRequestClose={handleOnCloseModal}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.background} onPress={handleOnCloseModal} />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.colors.main,
              transform: [{ translateY: pan }],
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.handleTouchArea} {...panResponder.panHandlers}>
              <View style={styles.handle} />
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
          </View>
          <ScrollView
            style={{ maxHeight: screenHeight * 0.85 }}
            contentContainerStyle={{ paddingBottom: 40 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <View>{children}</View>
          </ScrollView>
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  handleTouchArea: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
    marginTop: 4,
  },
});

export default Modal;
