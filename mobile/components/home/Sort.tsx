import { use, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowDownUp, Check } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";

import useColorScheme from "@/common/hooks/useColorScheme";
import { SORT_OPTIONS } from "@/constants/data";
import { AppDispatch, RootState } from "@/store/store";
import Modal from "@/components/ui/Modal";
import { SortType } from "@/types/task";
import { setSort } from "@/store/slices/tasksSlice";

// TODO: for sort and filtering if data is loading set buttons disabled

const Sort = () => {
  const theme = useColorScheme();
  const dispatch = useDispatch<AppDispatch>();

  const selectedSort = useSelector((state: RootState) => state.tasks.sort);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSelectSort = (sort: SortType) => {
    dispatch(setSort(sort));
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Pressable style={styles.button} onPress={handleOpenModal}>
        <Text style={[styles.text, { color: theme.colors.text }]}>
          Sort by{" "}
          <Text style={[styles.sortText, { color: theme.colors.text }]}>
            {selectedSort.value}
          </Text>
        </Text>
        <ArrowDownUp size={22} color={theme.colors.text} />
      </Pressable>
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        label="Sort tasks by"
      >
        <View style={styles.containerModal}>
          {SORT_OPTIONS.map((sort) => (
            <Pressable
              key={sort.id}
              onPress={() => {
                handleSelectSort(sort);
              }}
              style={[styles.sort, { borderBottomColor: theme.colors.border }]}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: selectedSort.id === sort.id ? theme.colors.text : theme.colors.inactive,
                    fontWeight: selectedSort.id === sort.id ? "500" : "400",
                  },
                ]}
              >
                {sort.value}
              </Text>
              <Check
                size={20}
                color={
                  selectedSort.id === sort.id
                    ? theme.colors.text
                    : "transparent"
                }
              />
            </Pressable>
          ))}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  sortText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sort: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    flexGrow: 1,
    flexShrink: 0,
    padding: 10,
    borderBottomWidth: 1,
    alignItems: "flex-start",
  },
  optionText: {
    fontSize: 16,
  },
  containerModal: {
    gap: 10,
    width: "100%",
    paddingBottom: 40,
  },
});

export default Sort;
