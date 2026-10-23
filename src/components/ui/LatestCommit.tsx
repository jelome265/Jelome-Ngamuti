import { useEffect, useState } from "react";

type State =
  | { readonly status: "loading" }
  | { readonly status: "ready"; readonly sha: string; readonly date: string; readonly message: string }
  | { readonly status: "unavailable" };

interface LatestCommitProps {
  readonly repoUrl: string;
}

interface GitHubCommit {
  readonly sha: string;
  readonly commit: {
    readonly message: string;
    readonly author: {
      readonly date: string;
    };
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseCommit(value: unknown): GitHubCommit | null {
  if (!isRecord(value) || typeof value.sha !== "string" || !isRecord(value.commit)) return null;
  if (typeof value.commit.message !== "string" || !isRecord(value.commit.author)) return null;
  if (typeof value.commit.author.date !== "string") return null;

  const parsedDate = new Date(value.commit.author.date);
  if (!Number.isFinite(parsedDate.getTime()) || value.sha.length < 7) return null;

  return {
    sha: value.sha,
    commit: {
      message: value.commit.message,
      author: { date: value.commit.author.date },
    },
  };
}

// Public commit evidence is supplementary. A bounded request and plain fallback keep network failure
// from blocking project discovery, especially on slow or rate-limited connections.
export function LatestCommit({ repoUrl }: LatestCommitProps) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let timedOut = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 6000);

    const loadCommit = async () => {
      try {
        const repo = new URL(repoUrl);
        if (repo.protocol !== "https:" || repo.hostname !== "github.com") {
          throw new Error("Unsupported repository URL");
        }
        const path = repo.pathname.replace(/^\//, "").replace(/\/$/, "");
        if (!/^[\w.-]+\/[\w.-]+$/.test(path)) throw new Error("Invalid repository path");

        const response = await fetch(
          `https://api.github.com/repos/${path}/commits?per_page=1`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );
        if (!response.ok) throw new Error(`GitHub API returned ${String(response.status)}`);

        const data: unknown = await response.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error("No commit evidence");
        const commit = parseCommit(data[0]);
        if (!commit) throw new Error("Unexpected GitHub response");

        setState({
          status: "ready",
          sha: commit.sha.slice(0, 7),
          date: new Date(commit.commit.author.date).toISOString().slice(0, 10),
          message: commit.commit.message.split("\n")[0] ?? "",
        });
      } catch {
        if (controller.signal.aborted && !timedOut) return;
        setState({ status: "unavailable" });
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    void loadCommit();

    return () => {
      window.clearTimeout(timeoutId);
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
