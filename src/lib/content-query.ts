import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mergeContent, type SiteContent } from "@/lib/site-content";

export const contentQuery = queryOptions({
  queryKey: ["site-content"],
  staleTime: 30_000,
  queryFn: async (): Promise<SiteContent> => {
    const { data, error } = await supabase
      .from("site_content")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return mergeContent(data?.data);
  },
});
