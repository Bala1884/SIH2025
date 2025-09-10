// utils/index.ts
export function createPageUrl(pageName) {
  switch (pageName) {
    case "Dashboard":
      return "/dashboard";
    case "Students":
      return "/students";
    case "Certificates":
      return "/certificates";
    case "Search":
      return "/search";
    default:
      return "/";
  }
}
