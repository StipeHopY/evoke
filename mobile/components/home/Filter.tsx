import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ScrollContainer from "@/components/ui/ScrollContainer";
import OrganizerButtons from "./OrganizerButtons";
import ErrorComponent from "@/components/ui/Error";
import { getFilterOptions } from "@/constants/data";
import { AppDispatch, RootState } from "@/store/store";
import { FilterType } from "@/types/task";
import { setFilter } from "@/store/slices/tasksSlice";
import { getLabelsAction } from "@/store/actions/labelsActions";
import SkeletonText from "../skeleton/SkeletonText";

// TODO: make a animation when filter loads up to be shown down

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();

  const selectedFilter = useSelector((state: RootState) => state.tasks.filter);
  const labels = useSelector((state: RootState) => state.labels);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectFilter = (filter: FilterType) => {
    if (!loading) {
      dispatch(setFilter(filter));
    }
  };

  const filterOptions = getFilterOptions(labels);

  useEffect(() => {
    if (!labels || labels.length === 0) {
      loadLabels();
    }
  }, [labels]);

  const loadLabels = async () => {
    try {
      setLoading(true);
      await dispatch(getLabelsAction());
      setError(null);
    } catch (err) {
      setError("Failed to load labels");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollContainer type="row" bounces={true}>
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <SkeletonText key={index} width={70} height={35} />
        ))}
      {!loading &&
        labels &&
        filterOptions.map((filter: FilterType, index) => (
          <OrganizerButtons
            key={filter.id}
            option={filter}
            active={selectedFilter.id === filter.id}
            setSelected={() => handleSelectFilter(filter)}
            style={{
              marginLeft: index === 0 ? 16 : 0, // first button
              marginRight: index === filterOptions.length - 1 ? 16 : 0, // last button
            }}
          />
        ))}
      <ErrorComponent message={error} setMessage={setError} isModal={true} />
    </ScrollContainer>
  );
};

export default Filter;
