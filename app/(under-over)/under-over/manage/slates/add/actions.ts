import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { zfd } from "zod-form-data";
import { AddSlateFormFields, AddSlateSchema } from "@/app/types/slates";

export const createSlate = async (data: AddSlateFormFields) => {
  console.log("FORM DATA: ", data);

  const validator = zfd.formData(AddSlateSchema);
  const result = validator.parse(data);

  console.log("RESULT: ", result);

  revalidateTag("slates");
  redirect("/under-over/manage/slates");
};
