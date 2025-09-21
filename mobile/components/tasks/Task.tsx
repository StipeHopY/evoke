import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent,
  Image,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  withDelay,
  Easing,
  withSequence,
  FadeOut,
  Layout,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { fontSize } from "@/constants/colors";
import useColorScheme from "@/common/hooks/useColorScheme";
import ErrorComponent from "@/components/ui/Error";
import { TaskStateType } from "@/types/task";
import TaskDateView from "./TimeSpan";
import { handleDeadlineValues, handleStartValues } from "@/utils/dateUtils";
import { changeTaskStatusAction } from "@/store/actions/tasksActions";
import { AppDispatch } from "@/store/store";
import { TASK_SCREEN } from "@/constants/routes";

type TaskType = {
  task: TaskStateType;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const REWARD_WIDTH = 60;
const REWARD_HEIGHT = 26;
const SAFE_OFFSET = 20;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

const Task = ({ task }: TaskType) => {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const startDate = handleStartValues(task);
  const deadlineDate = handleDeadlineValues(task);

  const rewardX = useSharedValue(-REWARD_WIDTH);
  const rewardY = useSharedValue(0);
  const rewardScale = useSharedValue(0.8);

  const [error, setError] = useState<string | null>(null);
  const [layoutY, setLayoutY] = useState(0);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const translateX = useSharedValue(0);

  const showRewardAnimation = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Toast.show({
      type: "success",
      text1: "Task Completed ✅",
      text2: "Great job! +5 points ⭐",
    });

    if (handleTaskFinished) {
      handleTaskFinished(layoutY);
    }
  };

  const handleUpdateTaskStatus = async () => {
    const status = "finished";
    const { error } = await dispatch(changeTaskStatusAction(task, status));
    if (error) {
      setError(error);
      return;
    }
    setError(null);
  };

  const handleTaskScreenRoute = () => {
    router.push({
      pathname: TASK_SCREEN,
      params: { id: task.id },
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH, {}, (finished) => {
          if (finished) {
            runOnJS(showRewardAnimation)();
          }
        });
      } else if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(0, {}, () => {
          runOnJS(handleTaskScreenRoute)();
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const handleLayout = (e: LayoutChangeEvent) => {
    const { y, height } = e.nativeEvent.layout;
    setLayoutY(y);
    setLayoutHeight(height);
  };

  const handleTaskFinished = (layoutY: number) => {
    rewardY.value = layoutY + layoutHeight / 2 - REWARD_HEIGHT / 2;
    setShowReward(true);

    rewardX.value = -REWARD_WIDTH;
    rewardScale.value = 0.8;

    rewardX.value = withSequence(
      withTiming(SAFE_OFFSET, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      }),
      withDelay(
        1000,
        withTiming(-REWARD_WIDTH, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        })
      )
    );

    rewardScale.value = withSequence(
      withTiming(1, { duration: 250, easing: Easing.out(Easing.ease) }),
      withDelay(
        1000,
        withTiming(0.8, { duration: 300, easing: Easing.in(Easing.ease) })
      )
    );

    setTimeout(() => {
      setShowReward(false);
      handleUpdateTaskStatus();
    }, 1600);
  };

  const rewardStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: rewardY.value,
    left: SAFE_OFFSET,
    transform: [{ translateX: rewardX.value }, { scale: rewardScale.value }],
  }));

  return (
    <>
      <ErrorComponent message={error} setMessage={setError} isModal={true} />
      <GestureDetector gesture={pan}>
        <Animated.View
          onLayout={handleLayout}
          style={[
            styles.taskContainer,
            { backgroundColor: theme.colors.main },
            animatedStyle,
          ]}
          layout={Layout.springify()}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.leftSideContainer}>
            <Text
              style={[styles.taskText, { color: theme.colors.text }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {task.title}
            </Text>
            {task.label && (
              <Text
                style={[styles.taskLabel, { color: theme.colors.inactive }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {task.label.value}
              </Text>
            )}
          </View>

          {(task.startDateSelected || task.highPriority) && (
            <View style={styles.rightSideContainer}>
              {task.startDateSelected && (
                <TaskDateView start={startDate} deadline={deadlineDate} />
              )}
              {task.highPriority && (
                <View
                  style={[
                    styles.highPriorityContainer,
                    { borderColor: theme.colors.border },
                  ]}
                >
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontSize: fontSize.xs,
                    }}
                  >
                    High
                  </Text>
                </View>
              )}
            </View>
          )}
        </Animated.View>
      </GestureDetector>
      {showReward && (
        <Animated.View style={[rewardStyle]}>
          <View style={styles.rewardContainer}>
            <Image
              width={REWARD_HEIGHT}
              height={REWARD_HEIGHT}
              source={require("@/assets/images/star.png")}
              style={styles.starIcon}
            />
            <Text style={styles.rewardText}>+5</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  leftSideContainer: {
    flex: 1,
    flexShrink: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: fontSize.sm,
    fontWeight: "400",
  },
  taskLabel: {
    fontSize: fontSize.xs,
    fontWeight: "300",
  },
  rightSideContainer: {
    flexShrink: 0,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
  },
  highPriorityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 0, 0, 0.4)",
  },
  rewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "transparent",
  },
  starIcon: {
    width: 22,
    height: 22,
    marginRight: 4,
    tintColor: "#FFD93B",
  },
  rewardText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFD93B",
    textShadowColor: "#C9A227",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Task;
