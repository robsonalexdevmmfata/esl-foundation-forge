import { useEffect, useState } from "react";
import { defaultConfig, getConfig, type SiteConfig } from "@/lib/site-config";

export function useSiteConfig(): SiteConfig {
  // Start with defaults so server and first client render match; saved config loads in useEffect.
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

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
