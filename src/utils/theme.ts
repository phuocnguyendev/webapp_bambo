export type Theme = {
  colors: {
    border: string;
    input: string;
    ring: string;
    background: string;
    foreground: string;
    brand: { primary: string; secondary: string };
    primary: { DEFAULT: string; foreground: string };
    secondary: { DEFAULT: string; foreground: string };
    success: { DEFAULT: string; foreground: string };
    warning: { DEFAULT: string; foreground: string };
    outline: { DEFAULT: string; foreground: string };
    link: { foreground: string; hover: string };
    destructive: { DEFAULT: string; foreground: string };
    muted: { DEFAULT: string; foreground: string };
    striped: { DEFAULT: string; foreground: string };
    accent: { DEFAULT: string; foreground: string };
    active: { DEFAULT: string; foreground: string };
    popover: { DEFAULT: string; foreground: string };
    card: { DEFAULT: string; foreground: string };
    navbar: {
      DEFAULT: string;
      foreground: string;
      hover: { DEFAULT: string };
      active: { DEFAULT: string; foreground: string };
      nav: { DEFAULT: string; foreground: string; borderLeft: string };
    };
    table: { header: { DEFAULT: string; foreground: string } };
    danger: { DEFAULT: string; dark: string };
    unit: string;
  };
  borderRadius: {
    lg: string;
    md: string;
    sm: string;
    button: string;
    DEFAULT: string;
  };
  boxShadow: {
    DEFAULT: string;
    ring: string;
  };
  ringColor: {
    DEFAULT: string;
    primary: string;
    secondary: string;
    success: string;
  };
};

export const lightTheme: Theme = {
  colors: {
    border: "var(--border)",
    input: "var(--input)",
    ring: "var(--focus-ring-color)",
    background: "var(--background)",
    foreground: "var(--foreground)",
    brand: {
      primary: "var(--brand-primary)",
      secondary: "var(--brand-secondary)",
    },
    primary: {
      DEFAULT: "var(--primary)",
      foreground: "var(--primary-foreground)",
    },
    secondary: {
      DEFAULT: "var(--secondary)",
      foreground: "var(--secondary-foreground)",
    },
    success: {
      DEFAULT: "var(--success)",
      foreground: "var(--success-foreground)",
    },
    warning: {
      DEFAULT: "var(--warning)",
      foreground: "var(--warning-foreground)",
    },
    outline: {
      DEFAULT: "var(--outline)",
      foreground: "var(--outline-foreground)",
    },
    link: { foreground: "var(--link-foreground)", hover: "var(--link-hover)" },
    destructive: {
      DEFAULT: "var(--destructive)",
      foreground: "var(--destructive-foreground)",
    },
    muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
    striped: {
      DEFAULT: "var(--striped)",
      foreground: "var(--striped-foreground)",
    },
    accent: {
      DEFAULT: "var(--accent)",
      foreground: "var(--accent-foreground)",
    },
    active: { DEFAULT: "var(--active)", foreground: "var(--active)" },
    popover: {
      DEFAULT: "var(--popover)",
      foreground: "var(--popover-foreground)",
    },
    card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
    navbar: {
      DEFAULT: "var(--navbar-bg)",
      foreground: "var(--navbar-color)",
      hover: { DEFAULT: "var(--navbar-hover-bg)" },
      active: {
        DEFAULT: "var(--navbar-active-bg)",
        foreground: "var(--navbar-active-color)",
      },
      nav: {
        DEFAULT: "var(--nav-submenu-bg)",
        foreground: "var(--navbar-nav-color)",
        borderLeft: "var(--navbar-nav-border-left)",
      },
    },
    table: {
      header: {
        DEFAULT: "var(--table-header-bg)",
        foreground: "var(--table-header-color)",
      },
    },
    danger: { DEFAULT: "var(--danger)", dark: "var(--danger-dark)" },
    unit: "var(--unit)",
  },
  borderRadius: {
    lg: "var(--border-radius)",
    md: "calc(var(--border-radius) - 2px)",
    sm: "calc(var(--border-radius) - 4px)",
    button: "var(--button-border-radius)",
    DEFAULT: "var(--border-radius)",
  },
  boxShadow: {
    DEFAULT: "var(--box-shadow)",
    ring: "var(--focus-ring-shadow)",
  },
  ringColor: {
    DEFAULT: "var(--focus-ring-color)",
    primary: "var(--brand-primary)",
    secondary: "var(--brand-secondary)",
    success: "var(--success)",
  },
};

export function applyTheme(root: HTMLElement, t: Theme) {
  const set = (k: string, v: string) => root.style.setProperty(k, v);

  // Colors – “phẳng hóa” sang các biến mà @theme sẽ map:
  set("--border", t.colors.border);
  set("--input", t.colors.input);
  set("--focus-ring-color", t.colors.ring);
  set("--background", t.colors.background);
  set("--foreground", t.colors.foreground);

  set("--brand-primary", t.colors.brand.primary);
  set("--brand-secondary", t.colors.brand.secondary);

  set("--primary", t.colors.primary.DEFAULT);
  set("--primary-foreground", t.colors.primary.foreground);

  set("--secondary", t.colors.secondary.DEFAULT);
  set("--secondary-foreground", t.colors.secondary.foreground);

  set("--success", t.colors.success.DEFAULT);
  set("--success-foreground", t.colors.success.foreground);

  set("--warning", t.colors.warning.DEFAULT);
  set("--warning-foreground", t.colors.warning.foreground);

  set("--outline", t.colors.outline.DEFAULT);
  set("--outline-foreground", t.colors.outline.foreground);

  set("--link-foreground", t.colors.link.foreground);
  set("--link-hover", t.colors.link.hover);

  set("--destructive", t.colors.destructive.DEFAULT);
  set("--destructive-foreground", t.colors.destructive.foreground);

  set("--muted", t.colors.muted.DEFAULT);
  set("--muted-foreground", t.colors.muted.foreground);

  set("--striped", t.colors.striped.DEFAULT);
  set("--striped-foreground", t.colors.striped.foreground);

  set("--accent", t.colors.accent.DEFAULT);
  set("--accent-foreground", t.colors.accent.foreground);

  set("--active", t.colors.active.DEFAULT);
  // foreground của active theo config cũ bạn dùng cùng biến
  // nếu muốn khác, tạo biến riêng và map tương ứng.
  // set('--active-foreground', t.colors.active.foreground);

  set("--popover", t.colors.popover.DEFAULT);
  set("--popover-foreground", t.colors.popover.foreground);

  set("--card", t.colors.card.DEFAULT);
  set("--card-foreground", t.colors.card.foreground);

  set("--navbar-bg", t.colors.navbar.DEFAULT);
  set("--navbar-color", t.colors.navbar.foreground);
  set("--navbar-hover-bg", t.colors.navbar.hover.DEFAULT);
  set("--navbar-active-bg", t.colors.navbar.active.DEFAULT);
  set("--navbar-active-color", t.colors.navbar.active.foreground);
  set("--nav-submenu-bg", t.colors.navbar.nav.DEFAULT);
  set("--navbar-nav-color", t.colors.navbar.nav.foreground);
  set("--navbar-nav-border-left", t.colors.navbar.nav.borderLeft);

  set("--table-header-bg", t.colors.table.header.DEFAULT);
  set("--table-header-color", t.colors.table.header.foreground);

  set("--danger", t.colors.danger.DEFAULT);
  set("--danger-dark", t.colors.danger.dark);

  set("--unit", t.colors.unit);

  // Radius / Shadow
  set("--border-radius", t.borderRadius.DEFAULT);
  set("--button-border-radius", t.borderRadius.button);
  set("--box-shadow", t.boxShadow.DEFAULT);
  set("--focus-ring-shadow", t.boxShadow.ring);
}
