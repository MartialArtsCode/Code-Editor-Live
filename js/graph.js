export const GraphBuilder = {
  extractImports(files) {
    const nodes = Object.keys(files);
    // Scans files for internal references or dependencies
    return nodes.map(node => ({
      id: node,
      type: files[node].type
    }));
  }
};
