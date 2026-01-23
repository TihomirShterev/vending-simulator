import React from "react";
import { Card, CardContent, CardActions, Skeleton } from "@mui/material";

const ProductSkeleton = () => (
  <Card sx={{ p: 1 }}>
    <CardActions
      sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}
    >
      <Skeleton variant="circular" width={20} height={20} />
      <Skeleton variant="circular" width={20} height={20} />
    </CardActions>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 1,
        py: 0,
      }}
    >
      <Skeleton variant="text" width="90%" height={32} />
      <Skeleton variant="text" width="90%" height={32} />
      <Skeleton variant="text" width="90%" height={20} />
    </CardContent>
    <CardActions sx={{ display: "flex", justifyContent: "center", pt: 1.25 }}>
      <Skeleton
        variant="rectangular"
        width="90%"
        height={36}
        sx={{ borderRadius: 1 }}
      />
    </CardActions>
  </Card>
);

export default ProductSkeleton;
