export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe?: {
          user?: { id: number; first_name?: string; last_name?: string; username?: string; language_code?: string };
          auth_date?: number;
          start_param?: string;
        };
        platform?: string;
        version?: string;
        colorScheme?: "light" | "dark";
        themeParams?: Record<string, string>;
        isExpanded?: boolean;
        ready: () => void;
        expand: () => void;
        setHeaderColor?: (color: string) => void;
        setBackgroundColor?: (color: string) => void;
        enableClosingConfirmation?: () => void;
        BackButton?: {
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        MainButton?: {
          setText: (text: string) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
        HapticFeedback?: { impactOccurred: (style: "light" | "medium" | "heavy") => void; notificationOccurred: (type: "error" | "success" | "warning") => void };
        onEvent?: (eventType: string, callback: () => void) => void;
        offEvent?: (eventType: string, callback: () => void) => void;
      };
    };
  }
}
