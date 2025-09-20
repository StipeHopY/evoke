import { memo } from "react";
import { Skeleton } from "moti/skeleton";

import useColorScheme from "@/common/hooks/useColorScheme";

type SkeletonCircleProps = {
  size?: number;
};

const SkeletonCircle = ({ size = 50 }: SkeletonCircleProps) => {
  const theme = useColorScheme();
  const colorMode = theme.selectedTheme === "dark" ? "dark" : "light";

  return (
    <Skeleton colorMode={colorMode} width={size} height={size} radius="round" />
  );
};

export default memo(SkeletonCircle);
