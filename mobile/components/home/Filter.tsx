import { useDispatch, useSelector } from "react-redux";

import ScrollContainer from "@/components/ui/ScrollContainer";
import OrganizerButtons from "./OrganizerButtons";
import { FILTER_OPTIONS } from "@/constants/data";
import { AppDispatch, RootState } from "@/store/store";
import { FilterType } from "@/types/task";
import { setFilter } from "@/store/slices/tasksSlice";

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedFilter = useSelector((state: RootState) => state.tasks.filter);

  const handleSelectFilter = (filter: FilterType) => {
    dispatch(setFilter(filter));
  };

  return (
    <ScrollContainer type="row">
      {FILTER_OPTIONS.map((filter) => (
        <OrganizerButtons
          key={filter.id}
          option={filter}
          active={selectedFilter.id === filter.id}
          setSelected={() => handleSelectFilter(filter)}
        />
      ))}
    </ScrollContainer>
  );
};

export default Filter;
