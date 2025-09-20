import { memo } from "react";
import { Skeleton } from "moti/skeleton";

import useColorScheme from "@/common/hooks/useColorScheme";

const SkeletonTask = () => {
  const theme = useColorScheme();
  const colorMode = theme.selectedTheme === "dark" ? "dark" : "light";

  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton
          key={index}
          colorMode={colorMode}
          width="100%"
          height={64}
          radius={10}
        />
      ))}
    </>
  );
};

export default memo(SkeletonTask);
