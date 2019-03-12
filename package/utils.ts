
/**
 * 保证 min <= num <= max
 * @param {number} num 要保证的数字
 * @param {number} min 最小范围
 * @param {number} max 最大范围
 * @return {number} 返回被限制后的数字
 */
export function rangeNum(num: number, min: number, max: number): number {
  if (num < min) {
    num = min;
  }

  if (num > max) {
    num = max;
  }
  return num;
}
