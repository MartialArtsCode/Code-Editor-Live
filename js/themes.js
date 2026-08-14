export const ThemeManager = {
  themes: {
    dark: { '--bg-main': '#1e1e1e', '--bg-sidebar': '#252526', '--text-main': '#d4d4d4' },
    light: { '--bg-main': '#ffffff', '--bg-sidebar': '#f3f3f3', '--text-main': '#000000' }
  },

  applyTheme(themeName) {
    const theme = this.themes[themeName] || this.themes.dark;
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
  }
};
