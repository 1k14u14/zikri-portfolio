// Export the function so other files can access it
export function formatYearMonth(dateString: string | null) {
  if (!dateString) return "Present";

  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
}

// You can add more helper functions in this same file later!
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}