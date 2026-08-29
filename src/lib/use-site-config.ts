import { useEffect, useState } from "react";
import { getConfig, type SiteConfig } from "@/lib/site-config";

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(() => getConfig());

  useEffect(() => {
    const sync = () => setConfig(getConfig());
    sync();
    window.addEventListener("siteConfigChanged", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("siteConfigChanged", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return config;
}
