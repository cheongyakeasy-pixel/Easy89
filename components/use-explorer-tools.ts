"use client";
import { useEffect } from "react";
import { flushSync } from "react-dom";
import { z } from "zod";
import { apartments } from "@/lib/apartments";
type ModelContext = { registerTool: (tool: { name: string; description: string; inputSchema: object; execute: (input: unknown) => unknown; annotations: { readOnlyHint: boolean } }, options: { signal: AbortSignal }) => void | Promise<void> };
declare global { interface Document { readonly modelContext?: ModelContext } }
export function useExplorerTools(setQuery: (query: string) => void) {
  useEffect(() => {
    const context = document.modelContext;
    if (!context) return;
    const lifecycle = new AbortController();
    const schema = z.object({ query: z.string().max(100) }).strict();
    Promise.resolve(context.registerTool({
      name: "search_example_apartments", description: "Search fictional demonstration apartments and update the visible search field. Does not search live housing announcements.",
      inputSchema: { type: "object", properties: { query: { type: "string", maxLength: 100 } }, required: ["query"], additionalProperties: false },
      annotations: { readOnlyHint: false },
      execute(input) { const parsed = schema.safeParse(input); if (!parsed.success) return { error: "query must be a string of at most 100 characters" }; flushSync(() => setQuery(parsed.data.query)); return { exampleData: true, query: parsed.data.query, matchingNames: apartments.filter(item => `${item.name} 서울 ${item.district} ${item.neighborhood}`.includes(parsed.data.query.trim())).map(item => item.name) }; },
    }, { signal: lifecycle.signal })).catch((error: unknown) => { if (error instanceof Error) console.warn("Optional browser search tool unavailable:", error.message); });
    return () => lifecycle.abort();
  }, [setQuery]);
}
