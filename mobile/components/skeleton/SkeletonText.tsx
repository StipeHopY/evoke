import { memo } from "react";
import { Skeleton } from "moti/skeleton";
import { DimensionValue } from "react-native";

import useColorScheme from "@/common/hooks/useColorScheme";

export type SkeletonTextProps = {
  width?: DimensionValue;
  height: number;
};

const SkeletonText = ({ width = "100%", height }: SkeletonTextProps) => {
  const theme = useColorScheme();
  const colorMode = theme.selectedTheme === "dark" ? "dark" : "light";

  return (
    <Skeleton colorMode={colorMode} width={width} height={height} radius={20} />
  );
};

export default memo(SkeletonText);
