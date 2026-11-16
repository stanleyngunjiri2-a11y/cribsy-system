// OWNER: Member 1 - Stanley. Simple frontend checks. The backend must validate again.
export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function passwordProblem(value) {
  if (value.length < 8) return 'Use at least 8 characters.'
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) return 'Use both letters and numbers.'
  return ''
}
