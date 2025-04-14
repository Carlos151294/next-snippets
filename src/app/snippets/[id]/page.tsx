import { deleteSnippet } from "@/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ViewSnippetPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewSnippetPage(props: ViewSnippetPageProps) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { id } = await props.params;
  const snippet = await db.snippet.findUnique({ where: { id: Number(id) } });

  const deleteSnippetAction = deleteSnippet.bind(null, Number(id));

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">
          {snippet?.title}
        </h1>
        <div className="flex gap-4">
          <Link className="p-2 border rounded" href={`/snippets/${id}/edit`}>
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet?.code}</code>
      </pre>
    </div>
  );
}
