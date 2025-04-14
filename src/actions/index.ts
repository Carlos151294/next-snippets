"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

/**
 * 1st and 2nd argument will be the bound argument
 * 3rd / last argument will be the form data, containing data form (if any exists)
 * @param code
 * @param formData
 */
// export async function updateSnippet(id: number, code: string, _formData: FormData) {
export async function updateSnippet(id: number, code: string) {
  // Code to validate data (optional)
  // Code to mutate the snippet
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  // Code to redirect (optional)
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({ where: { id } });
    
    redirect("/");
};