// functions that convert inputs to strings used directly for display output
// Examples include date, time or currency formatters

export const displayDate = (d: Date) => {
  const YYYY = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const DD = String(d.getDate()).padStart(2, '0');

  return `${YYYY}-${MM}-${DD}`;
};
