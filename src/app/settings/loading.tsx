import { RingLoader } from "@/components/ui/ring-loader";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-6 py-11 sm:px-32 xl:px-16 h-dvh">
      <RingLoader />
    </div>
  );
}
