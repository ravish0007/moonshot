export const addItem = (item, setState) => {
  setState((prev) => new Set(prev).add(item));
};

export const removeItem = (item, setState) => {
  setState((prev) => {
    const next = new Set(prev);
    next.delete(item);
    return next;
  });
};

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  // Extract individual parts
  const day = String(date.getDate()).padStart(2, "0"); // Day (dd)
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month (MM) (Months are 0-indexed)
  const year = date.getFullYear(); // Year (yyyy)
  let hour = date.getHours(); // Hour (hh)
  const minute = String(date.getMinutes()).padStart(2, "0"); // Minute (mm)
  let period = "am"; // Default period

  // Convert hour to 12-hour format and determine AM/PM
  if (hour >= 12) {
    hour = hour % 12 || 12; // Convert to 12-hour format
    period = "pm";
  } else {
    hour = hour || 12; // Convert 0 hour to 12
  }

  // Format the final string
  const formattedDate = `${day}/${month}/${year} ${hour}:${minute}${period}`;
  return formattedDate;
}

export function persistSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set.values()]));
}

export function extractSet(key) {
  const values = localStorage.getItem(key);
  if (values) {
    return new Set(JSON.parse(values));
  } else {
    return new Set();
  }
}
