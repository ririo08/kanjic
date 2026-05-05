import { units, buddhistModeUnits } from "./units";

type KanjicOptions = {
  /** true で華厳経系の「倶胝・阿庾多…」を用いる */
  buddhistMode?: boolean;
};

/**
 * 数値を日本の漢数字表記に変換します。
 *
 * - `buddhistMode === false` (既定)  
 *   4 桁ごとに区切って「万・億・兆…」で表記。
 * - `buddhistMode === true`  
 *   倶胝 (10⁷) から始まる華厳経の “上数” を使用。
 *
 * @param value   `number` または `bigint`
 * @param options `{ buddhistMode?: boolean }`
 */
export const kanjic = (
  value: number | bigint,
  options: KanjicOptions = {}
): string => {
  const buddhist = options.buddhistMode === true;

  // 共通: BigInt 文字列にして桁数を得る
  const valueBig = typeof value === "number" ? BigInt(value) : value;
  if (valueBig === 0n) return "0";

  /* ------------------------------------------------------------------
   * buddhistMode === true  : 華厳経（指数 7・14・28・…）
   * ------------------------------------------------------------------ */
  if (buddhist) {
    const res: string[] = [];
    let rest = valueBig;

    // 上から順番に大きな単位を取り出す
    for (let i = buddhistModeUnits.length - 1; i >= 0; i--) {
      const { exponent, name } = buddhistModeUnits[i];
      const unitValue = 10n ** exponent;

      if (rest >= unitValue) {
        const q = rest / unitValue;
        rest = rest % unitValue;

        // 商は通常モード (万・億…) で再帰的に整形
        res.push(`${kanjic(q, {})}${name}`);
      }
    }

    // 最後に 10⁷ 未満の端数があればそのまま付ける
    if (rest > 0n) res.push(rest.toString());

    return res.join("");
  }

  /* ------------------------------------------------------------------
   * 既定モード (4 桁区切り)：万・億・兆…
   * ------------------------------------------------------------------ */
  const valueStr = valueBig.toString();
  const res: string[] = [];
  const len = valueStr.length;

  let idx = 0;
  for (let i = len; i > 0; i -= 4) {
    const start = Math.max(i - 4, 0);
    const part = valueStr.slice(start, i);
    const num = parseInt(part, 10);

    if (num > 0) {
      const unit = units[idx] ? units[idx].name : "";
      res.unshift(`${num}${unit}`);
    }
    idx++;
  }

  return res.join("");
};
