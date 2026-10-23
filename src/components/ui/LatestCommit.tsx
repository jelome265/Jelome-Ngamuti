import { useEffect, useState } from "react";

type State =
  | { readonly status: "loading" }
  | { readonly status: "ready"; readonly sha: string; readonly date: string; readonly message: string }
  | { readonly status: "unavailable" };

interface LatestCommitProps {
  readonly repoUrl: string;
}

// Reads the latest commit from the public GitHub API at page load.
// Shows a plain fallback if the request fails, so the page never depends on it.
export function LatestCommit({ repoUrl }: LatestCommitProps) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const path = new URL(repoUrl).pathname.replace(/^\//, "");
    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${path}/commits?per_page=1`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${String(response.status)}`);
        const data: unknown = await response.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error("no commits");
        const first = data[0] as {
          sha: string;
          commit: { message: string; author: { date: string } };
        };
        setState({
          status: "ready",
          sha: first.sha.slice(0, 7),
          date: new Date(first.commit.author.date).toISOString().slice(0, 10),
          message: first.commit.message.split("\n")[0] ?? "",
        });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ status: "unavailable" });
      });

    return () => {
      controller.abort();
    };
  }, [repoUrl]);

  if (state.status === "loading") {
    return <p className="text-[15px] text-muted">Evidence: reading the latest commit…</p>;
  }
  if (state.status === "unavailable") {
    return <p className="text-[15px] text-muted">Evidence: open the repository below for its current history.</p>;
  }
  return (
    <p className="text-[15px] text-muted">
      Evidence: latest commit {state.date} · <span>{state.sha}</span> · {state.message}
    </p>
  );
}
