/**
 * Date MUST be in YYYY-MM-DD format.
 *
 * @param stringDate `string`
 */
export default function stringToDate(stringDate: string): Date {
  const [year, month, day] = stringDate.split("-").map((value) => {
    const convertedNumber = parseInt(value);
    if (isNaN(convertedNumber)) return 1;
    return convertedNumber;
  });

  if (!year || !month || !day) {
    throw new Error("Invalid date");
  }

  return new Date(year, month - 1, day);
}
