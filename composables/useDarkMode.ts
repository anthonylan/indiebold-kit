export function useDarkMode() {
  const colorMode = useState("colorMode", () => "light");

  const applyMode = (mode: string) => {
    colorMode.value = mode;
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme", mode);
  };

  const detectUserPreference = () => {
    if (localStorage.theme === "dark") {
      applyMode("dark");
    } else if (localStorage.theme === "light") {
      applyMode("light");
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyMode(prefersDark ? "dark" : "light");
    }
  };

  const toggleDarkMode = () => {
    applyMode(colorMode.value === "light" ? "dark" : "light");
  };

  onMounted(() => detectUserPreference());

  return { colorMode, toggleDarkMode };
}

  