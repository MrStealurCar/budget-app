export const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
};
