export const contentKeyFactory = {
  all: [{ scope: "content" }] as const,
  allInfo: () => [{ ...contentKeyFactory.all[0], entity: "info" }] as const,
};
