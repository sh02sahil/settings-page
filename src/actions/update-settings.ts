"use server";

import { SettingsFormProps } from "@/interfaces/common.interface";
import { revalidatePath } from "next/cache";

export const updateSettingsAction = async (
  data: SettingsFormProps,
  revalidationPath: string
) => {
  try {
    const res = await fetch(process.env.API_ENDPOINT + "/api", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    if (res.ok) revalidatePath(revalidationPath);
    return responseData;
  } catch (err) {
    console.error(err);
  }
};
