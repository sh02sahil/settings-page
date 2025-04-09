"use client";
import { updateSettingsAction } from "@/actions/update-settings";
import { CheckCircleIcon } from "@/components/icons/check-circle-icon";
import Badge from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RingLoader } from "@/components/ui/ring-loader";
import { Switch } from "@/components/ui/switch";
import { useServerAction } from "@/hooks/use-server-action";
import { SettingsFormProps } from "@/interfaces/common.interface";
import debounce from "debounce";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function SettingsForm({
  initialData,
}: {
  initialData: SettingsFormProps;
}) {
  const [data, setData] = useState<SettingsFormProps>(initialData);
  const [action, isPending] = useServerAction(updateSettingsAction);
  const pathname = usePathname();

  const onKeyDown = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const isKeyEnter = e.key === "Enter";

    if (id && isKeyEnter && val && val.length) {
      const arr =
        data[id as keyof Omit<SettingsFormProps, "showNotifications" | "id">];
      const isDuplicate = arr.includes(val);
      if (!isDuplicate) {
        arr.push(val);
        setData((prev) => ({ ...prev, [id]: arr }));
      }
      e.target.value = "";
    }
  };

  const onDelete = (e: React.SyntheticEvent) => {
    const parentNode = e.currentTarget.parentNode as HTMLDivElement;
    const content = parentNode.getAttribute("data-content");
    const category = parentNode.getAttribute("data-category");
    if (content && category) {
      const currentCategoryData =
        data[
          category as keyof Omit<SettingsFormProps, "showNotifications" | "id">
        ];
      const modifiedCategoryData = currentCategoryData.filter(
        (x) => x !== content
      );
      setData((prev) => ({ ...prev, [category]: modifiedCategoryData }));
    }
  };

  const debouncedSave = useMemo(
    () =>
      debounce((data: SettingsFormProps) => {
        action(data, pathname);
      }, 1000),
    []
  );

  useEffect(() => {
    if (data) debouncedSave(data);
  }, [data]);

  return (
    <div className="flex w-full h-dvh overflow-y-scroll flex-col items-center gap-8 px-12 py-12 sm:px-16">
      <div className="flex w-full items-center gap-4">
        <label className="text-xl text-neutral-950 font-bold">
          Application Settings
        </label>
        {isPending ? (
          <RingLoader />
        ) : (
          <CheckCircleIcon className="w-5 aspect-square grow-0 shrink-0" />
        )}
      </div>
      <hr className="border-px w-full border-neutral-200" />
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <label className="w-full text-xl text-neutral-950 font-medium">
          Notification Settings
        </label>
        <span className="w-full text-neutral-600 leading-5 text-sm">
          We keep the notifications off by default. You can change the settings
          for messages individually or you can reset to default.
        </span>
        <div className="flex max-w-full items-start justify-start gap-4">
          <span className="w-full text-neutral-600 leading-5 text-sm">
            Do you want notifications for every message? You will receive
            notification on the registered email address
          </span>
          <Switch
            checked={data.showNotifications}
            onCheckedChange={(val) => {
              setData((prev) => ({ ...prev, showNotifications: val }));
            }}
          />
        </div>
      </div>
      <hr className="border-2 w-full border-neutral-200 border-dashed" />
      <div className="flex w-full flex-col items-start justify-center">
        <Input
          id="users"
          onKeyDown={onKeyDown}
          label="Add users to get particular notifications"
          placeholder="Search Users"
          className="w-full md:max-w-md"
        />
      </div>
      <div className="flex w-full flex-wrap gap-3 -mt-4">
        {data.users.map((user, index) => (
          <Badge
            onDelete={onDelete}
            data-content={user}
            data-category="users"
            key={`user-${index}`}
          >
            {user}
          </Badge>
        ))}
      </div>
      <hr className="border-px w-full border-neutral-200" />
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <label className="w-full text-xl text-neutral-950 font-medium">
          Message Categories
        </label>
        <span className="w-full text-neutral-600 leading-5 text-sm">
          These are the categories which are visible to the user. This also
          helps you to filter and view messages as per your requirement.
        </span>
        <div className="flex w-full flex-col items-start justify-center">
          <Input
            id="messageCategories"
            onKeyDown={onKeyDown}
            label="Add the categories"
            placeholder="Enter the category name"
            className="w-full md:max-w-md"
          />
        </div>
        <div className="flex w-full flex-wrap gap-3">
          {data.messageCategories.map((category, index) => (
            <Badge
              data-content={category}
              data-category="messageCategories"
              onDelete={onDelete}
              key={`messageCategories-${index}`}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <label className="w-full text-xl text-neutral-950 font-medium">
          Custom Replies
        </label>
        <span className="w-full text-neutral-600 leading-5 text-sm">
          These are custom replies which you can send to users instantly.
        </span>
        <div className="flex w-full flex-col items-start justify-center">
          <Input
            id="replies"
            onKeyDown={onKeyDown}
            placeholder="Add replies"
            className="w-full md:max-w-md"
          />
        </div>
        <div className="flex w-full flex-wrap gap-3">
          {data.replies.map((reply, index) => (
            <Badge
              data-content={reply}
              data-category="replies"
              onDelete={onDelete}
              key={`replies-${index}`}
            >
              {reply}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
