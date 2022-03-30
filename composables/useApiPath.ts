export const useApiPath = (version: string) => {
  return (name: string) => {
    return {
      path: `/${version}/${name}`,
      handler: `~/server/api/${version}/${name}.ts`,
    };
  };
};

export const apiPath = (version: string, path: Array<string>) => {
  return path.map(useApiPath(version));
};
