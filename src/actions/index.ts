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
}

// Server actions can be defined within the server components as well
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  // // Code to indicate this is a server action
  // "use server";
  try {
    // Code to validate data
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer" };
    }

    if (typeof code !== "string" || code.length < 3) {
      return { message: "Code must be longer" };
    }

    // Code to mutate data
    await db.snippet.create({ data: { title, code } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }

    return { message: "Something went wrong..." };
  }

  // Code to redirect
  redirect("/");
}
