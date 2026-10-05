import { Typography } from "@/src/shared/components/typography";
import { TriangleAlert } from "lucide-react";

export function RateLimitBanner() {
  return (
    <div
      role="status"
      className="mt-5 mb-6 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      <TriangleAlert className="size-4 shrink-0" />
      <Typography variant={"p"}>
        Too many requests. Some data couldn&apos;t be loaded, please try again
        in a minute.
      </Typography>
    </div>
  );
}
