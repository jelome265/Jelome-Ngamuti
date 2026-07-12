'use client';

import { useState, useEffect } from 'react';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number }[];
}

export function useGitHubStats(username: string): { stats: GitHubStats | null; loading: boolean; error: string | null } {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (cancelled) return;

        const langMap = new Map<string, number>();
        let totalBytes = 0;

        await Promise.all(
          reposData.map(async (repo: { languages_url: string }) => {
            try {
              const langRes = await fetch(repo.languages_url);
              if (langRes.ok) {
                const langs = await langRes.json();
                for (const [lang, bytes] of Object.entries(langs)) {
                  langMap.set(lang, (langMap.get(lang) ?? 0) + (bytes as number));
                  totalBytes += bytes as number;
                }
              }
            } catch { /* skip individual repo language fetch */ }
          })
        );

        const topLanguages = [...langMap.entries()]
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
          }));

        const totalStars = reposData.reduce((sum: number, repo: { stargazers_count: number }) => sum + (repo.stargazers_count ?? 0), 0);

        setStats({
          publicRepos: userData.public_repos ?? 0,
          followers: userData.followers ?? 0,
          totalStars,
          topLanguages: topLanguages.length > 0 ? topLanguages : [{ name: 'N/A', percentage: 100 }],
        });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stats');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  return { stats, loading, error };
}
