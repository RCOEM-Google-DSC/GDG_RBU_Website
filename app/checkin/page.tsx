import { Suspense } from "react";
import CheckInClient from "./CheckInClient";

export default function CheckInPage() {
  return (
    <Suspense fallback={<p>Loading check-in...</p>}>
      <CheckInClient />
    </Suspense>
  );
}
