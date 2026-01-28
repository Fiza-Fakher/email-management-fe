export const INITIAL_EMAILS = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", dateAdded: "1/15/2024" },
  { id: 2, firstName: "Sarah", lastName: "Smith", email: "sarah.smith@company.com", dateAdded: "1/10/2024" },
  { id: 3, firstName: "Mike", lastName: "Wilson", email: "mike.wilson@email.com", dateAdded: "1/12/2024" },
  { id: 4, firstName: "Emma", lastName: "Brown", email: "emma.brown@test.com", dateAdded: "1/8/2024" },
  { id: 5, firstName: "David", lastName: "Lee", email: "david.lee@sample.com", dateAdded: "1/5/2024" },
];

export function badgeStyle(status) {
  const base =
    "inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold";
  switch (status) {
    case "Authorized":
      return `${base} border-green-200 bg-green-50 text-green-700`;
    case "Pending":
      return `${base} border-amber-200 bg-amber-50 text-amber-700`;
    case "Contacted":
      return `${base} border-blue-200 bg-blue-50 text-blue-700`;
    case "Rejected":
      return `${base} border-red-200 bg-red-50 text-red-700`;
    default:
      return `${base} border-slate-200 bg-white text-slate-700`;
  }
}