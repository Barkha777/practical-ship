const STORAGE_KEY = "practical_memo_data";
const THEME_KEY = "practical_memo_theme";
const ADMIN_KEY = "practical_memo_admin";

// Initial seed data with DAA as main subject and ZERO pre-written practical content
export const initialData = {
  subjects: [
    {
      id: "sub-daa-401",
      name: "Design and Analysis of Algorithms (DAA)",
      code: "CS-401",
      color: "from-cyan-500 to-blue-600",
      description: "Study of algorithm design paradigms, asymptotic analysis, divide and conquer, dynamic programming, greedy algorithms, and graph algorithms.",
      practicals: []
    }
  ]
};

// Retrieve data from LocalStorage
export const getData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveData(initialData);
      return initialData;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.subjects)) {
      saveData(initialData);
      return initialData;
    }
    return parsed;
  } catch (err) {
    console.error("Error reading from LocalStorage:", err);
    return initialData;
  }
};

// Save data to LocalStorage
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Error writing to LocalStorage:", err);
  }
};

// Theme preference helpers
export const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || "dark";
  } catch {
    return "dark";
  }
};

export const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.error("Error saving theme:", err);
  }
};

// Admin mode preference helpers
export const getStoredAdminMode = () => {
  try {
    const val = localStorage.getItem(ADMIN_KEY);
    return val === "true";
  } catch {
    return false;
  }
};

export const setStoredAdminMode = (isAdmin) => {
  try {
    localStorage.setItem(ADMIN_KEY, isAdmin ? "true" : "false");
  } catch (err) {
    console.error("Error saving admin preference:", err);
  }
};

// Export JSON backup
export const exportBackupJSON = (data) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `practical-memo-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Reset to default initial state
export const resetToDefaultData = () => {
  saveData(initialData);
  return initialData;
};
