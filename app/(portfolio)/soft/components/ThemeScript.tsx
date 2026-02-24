"use client";

export const ThemeScript = () => {
    const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('soft-portfolio-theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const activeTheme = theme || systemTheme;
        
        if (activeTheme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {
        console.error('Theme initialization error:', e);
      }
    })();
  `;

    return (
        <script
            dangerouslySetInnerHTML={{ __html: themeScript }}
            suppressHydrationWarning
        />
    );
};
