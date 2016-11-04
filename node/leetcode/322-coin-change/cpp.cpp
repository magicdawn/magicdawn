/*
 * Solution 1 - O(N * amount)
 * =========
 *
 * This problem can be solved using dynamic programming, thus building the optimal
 * solution from previous smaller ones.
 *
 * For every coin of value t and every sum of money, i the sum can be traced back to
 * a previous sum i - t that was already computed and uses
 * the smallest number of coins possible.
 *
 * This way we can construct every sum i as the
 * minimum of all these previous sums for every coin value.
 *
 * To be sure we'll find a minimum
 * we can populate the solution vector with an amount bigger than the maximum possible,
 * which is amount + 1(when the sum is made up of only coins of value 1).
 *
 * The only exception
 * is sol[0] which is 0 as we need 0 coins to have a sum of 0. In the end we need to look
 * if the program found a solution in sol[amount] or it remained the same, in which case we
 * can return -1.
 *
 */

 /**
  这个问题可以利用动态规划来解决，从而建立了最优
  以前小的解决方案。对于T值每一个硬币的每一笔款项
  i 总和可追溯到以前的总和i - T的一个已经计算和用途
  最小的硬币数量可能。这样，我们可以构造每一笔我的
  最低所有这些以前的资金用于每一个硬币的价值。可以肯定，我们会找到一个最低
  我们可以用一个量超过最大可能更大填充解向量，
  这是量+1（当总和是由值1仅硬币）。唯一的例外
  为溶胶[0]是0，因为我们需要0硬币具有为0的总和，我们需要看看到底
  如果程序发现溶胶[量]的溶液或它仍然是相同的，在这种情况下，我们
  可以返回-1。
  */