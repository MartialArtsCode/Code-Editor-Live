export const Formatter = {
  formatCode(code, language) {
    // Basic indentation cleaner fallback for in-browser editing
    return code
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n');
  }
};
