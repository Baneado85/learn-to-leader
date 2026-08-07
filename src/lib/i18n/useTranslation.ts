import { useGameStore, Language } from "@/store/useGameStore";
import { dictionaries, Dictionary } from "./dictionaries";

export function useTranslation() {
  const { language } = useGameStore();
  
  const t = (path: string, variables?: Record<string, string>) => {
    const keys = path.split('.');
    let result: any = dictionaries[language];
    
    for (const key of keys) {
      if (result[key] === undefined) {
        // Fallback to Spanish if key missing
        result = (dictionaries.es as any)[key];
        if (result === undefined) return path;
      } else {
        result = result[key];
      }
    }
    
    if (typeof result === 'string' && variables) {
      Object.entries(variables).forEach(([key, value]) => {
        result = result.replace(`{${key}}`, value);
      });
    }
    
    return result as string;
  };

  return { t, language };
}
