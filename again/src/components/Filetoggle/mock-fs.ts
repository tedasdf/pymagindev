import { FileHierarchyItem } from "../../api/item";

export const mockFs: Record<
  string,
  FileHierarchyItem[]
> = {
  "/": [
    { name: "/test", type: "dir" },
  ],
  "/test": [
    { name: "/test/functional.py", type: "file" },
    { name: "/test/test.py", type: "file" }
  ]
} as const;
