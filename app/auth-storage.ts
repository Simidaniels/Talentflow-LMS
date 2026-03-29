export const STORED_ACCOUNT_KEY = "talentflow.account";
export const ACTIVE_SESSION_KEY = "talentflow.session";

export type StoredAccount = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "TF";
}
