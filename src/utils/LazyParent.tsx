import { Suspense } from "react";

import lazy from "./Lazy";

const LazyChild = lazy(() => import("./LazyChild"));

function LazyParent() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <LazyChild />
    </Suspense>
  );
}

export default LazyParent;
