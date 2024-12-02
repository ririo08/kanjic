import { units } from "./units";

/**
 * 数値を日本の漢数字表記（万、億、兆など）に変換します。
 *
 * @param {number | bigint} value - 変換したい数値。`number` または `bigint` 型を受け取ります。
 * @returns {string} 漢数字表記に変換された文字列を返します。
 *
 * @example
 * ```typescript
 * kanjic(123456789); // "1億2345万6789"
 * kanjic(BigInt("111111111111111111111")); // "1京1111兆1111億1111万1111"
 * ```
 */
export const kanjic = (value: number | BigInt): string => {
  const valueStr = typeof value === 'number' ? BigInt(value).toString() : value.toString();
  const res: string[] = [];
  const length = valueStr.length;

  let index = 0;
  for (let i = length; i > 0; i -= 4) {
    const start = Math.max(i - 4, 0);
    const unitPart = valueStr.slice(start, i);
    const num = parseInt(unitPart, 10);

    if (num > 0) {
      const unit = units[index] ? units[index].name : '';
      res.unshift(`${num}${unit}`);
    }
    index++;
  }

  return res.join('');
}
