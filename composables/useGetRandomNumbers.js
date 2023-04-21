export default function (n, k) {
  const nums = [...Array(n).keys()]
  for (let i = n - 1; i > n - k - 1; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
  }

  return nums.slice(n - k).sort((a, b) => a - b)
}
