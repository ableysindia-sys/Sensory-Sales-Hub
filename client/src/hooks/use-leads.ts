import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { z } from "zod";

type CreateLeadInput = z.infer<typeof api.leads.create.input>;

export function useCreateLead() {
  return useMutation({
    mutationFn: async (data: CreateLeadInput) => {
      const validated = api.leads.create.input.parse(data);
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to submit form");
      }
      
      return api.leads.create.responses[201].parse(await res.json());
    },
  });
}
