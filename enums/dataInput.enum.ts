export enum DataInput {
  INCORRECT_DATA = "abc",
  SQL_INJECTION = " OR 1=1 --",
  LONG_DATA = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
  SPECIAL_CHARACTERS = "Admin$%@",
  EXACT_KEY = "Claim",
  PARTIAL_KEY = "a",
  INVALID_KEY = "abcxyz",
  SPECIAL_KEY = "@#$%^&!",
  EMPTY_KEY = "",
}