import type {
  QueryFunction,
  QueryFunctionContext,
} from "@tanstack/react-query";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";
import * as http from "~/utils/http";

export type QueryKeyType = readonly [string, string | undefined];

export async function queryWithPost<T>({
  queryKey,
}: QueryFunctionContext<QueryKeyType>): Promise<T> {
  const [url, body] = queryKey;
  return http.post<T>(url, body);
}

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: defaultQueryFn,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const path = queryKey[0] as string;
  return http.get(path);
};
