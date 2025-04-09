import React from "react";
import SettingsForm from "./form";
import { notFound } from "next/navigation";
import { SettingsFormProps } from "@/interfaces/common.interface";

export default async function Page() {
  let settingsData: SettingsFormProps | null = null;
  try {
    const res = await fetch(process.env.API_ENDPOINT + "/api");
    settingsData = await res.json();
  } catch (error) {
    console.error(error);
    return notFound();
  }
  if (!settingsData) {
    return notFound();
  }
  return (
    <SettingsForm
      initialData={settingsData}
      // onboarding={userData.onboarding}
      // user={userData.user}
    />
  );
}
