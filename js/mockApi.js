export const MockApi = {
  init() {
    // Intercepts standard in-browser fetch for testing APIs without CORS issues
    window.mockFetch = async (endpoint) => {
      return {
        ok: true,
        json: async () => ({ status: "success", data: "Mocked Browser Response" })
      };
    };
  }
};
