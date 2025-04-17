"use client";

import React, { Suspense } from "react";

import Loading from "@/components/Loading";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading/>}>
      <SearchContent />
    </Suspense>
  );
}
