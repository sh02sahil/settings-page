"use client";
import { useEffect, useRef, useState, useTransition } from "react";
// import { useToast } from "./use-toast";

//? Reference: https://github.com/vercel/next.js/discussions/51371
/* eslint-disable @typescript-eslint/no-explicit-any */

export const useServerAction = <P extends any[], R>(
  action: (...args: P) => Promise<R>,
  onFinished?: (_: R | undefined) => void
): [(...args: P) => Promise<R | undefined>, boolean, any] => {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<R>();
  const [finished, setFinished] = useState(false);
  const resolver = useRef<(value?: R | PromiseLike<R>) => void>(null);
  const onFinishRef = useRef(onFinished);
  // const { toast } = useToast();
  useEffect(() => {
    if (!finished) return;
    if (onFinishRef.current) onFinishRef.current(result);
    resolver.current?.(result);
    if (result && hasError(result)) {
      // toast({
      //   title: "An Error Occurred",
      //   description: result.error,
      //   variant: "destructive",
      // });
    }
  }, [result, finished]);

  const runAction = async (...args: P): Promise<R | undefined> => {
    startTransition(() => {
      action(...args).then((data) => {
        setResult(data);
        setFinished(true);
      });
    });

    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  };

  return [runAction, isPending, result];
};

export function hasError(result: any): result is { error: string } {
  return result && "error" in result;
}
