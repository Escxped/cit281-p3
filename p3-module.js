// Coin combo generator
function coinCombo(amount) {
    const result = {
      amount,
      combinations: [],
      totalCombinations: 0,
    };
  
    if (typeof amount !== 'number' || amount < 0) return result;
  
    for (let dollars = 0; dollars <= Math.floor(amount / 100); dollars++) {
      for (let halves = 0; halves <= Math.floor((amount - dollars * 100) / 50); halves++) {
        for (let quarters = 0; quarters <= Math.floor((amount - dollars * 100 - halves * 50) / 25); quarters++) {
          for (let dimes = 0; dimes <= Math.floor((amount - dollars * 100 - halves * 50 - quarters * 25) / 10); dimes++) {
            for (let nickels = 0; nickels <= Math.floor((amount - dollars * 100 - halves * 50 - quarters * 25 - dimes * 10) / 5); nickels++) {
              const pennies = amount - dollars * 100 - halves * 50 - quarters * 25 - dimes * 10 - nickels * 5;
              result.combinations.push({ pennies, nickels, dimes, quarters, halves, dollars });
            }
          }
        }
      }
    }
  
    result.totalCombinations = result.combinations.length;
    return result;
  }
  
  // Coin value calculator
  function coinValue({
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0,
    halves = 0,
    dollars = 0,
  } = {}) {
    const totalCents =
      Number(pennies) * 1 +
      Number(nickels) * 5 +
      Number(dimes) * 10 +
      Number(quarters) * 25 +
      Number(halves) * 50 +
      Number(dollars) * 100;
  
    return {
      coins: { pennies, nickels, dimes, quarters, halves, dollars },
      totalCents,
      totalDollars: (totalCents / 100).toFixed(2),
    };
  }
  
  // Export functions for use in other files
  module.exports = { coinCombo, coinValue };
  
  // ----------------------------
  // Manual Test Cases
  // ----------------------------
  if (require.main === module) {
    console.log('\n===== Manual Tests for coinCombo() =====');
    const testCombo1 = coinCombo(5);
    console.log(`Test 1 - coinCombo(5)`);
    console.log(`Expected combinations > 0, Actual: ${testCombo1.totalCombinations}`);
    console.log('Sample:', testCombo1.combinations.slice(0, 3));
  
    const testCombo2 = coinCombo(0);
    console.log(`\nTest 2 - coinCombo(0)`);
    console.log(`Expected: 1 combination with all zeros`);
    console.log('Actual:', testCombo2.combinations);
  
    const testCombo3 = coinCombo(-5);
    console.log(`\nTest 3 - coinCombo(-5)`);
    console.log(`Expected: 0 combinations`);
    console.log('Actual:', testCombo3.totalCombinations);
  
    console.log('\n===== Manual Tests for coinValue() =====');
    const testValue1 = coinValue({ pennies: 4, nickels: 1, dimes: 2, quarters: 1, halves: 0, dollars: 1 });
    console.log(`Test 1 - coinValue({4p,1n,2d,1q,0h,1$})`);
    console.log('Actual:', testValue1.totalCents, `($${testValue1.totalDollars})`);
  
    const testValue2 = coinValue({});
    console.log(`\nTest 2 - coinValue({})`);
    console.log('Actual:', testValue2.totalCents, `($${testValue2.totalDollars})`);
  
    const testValue3 = coinValue({ pennies: '10', nickels: '2', dollars: '1' });
    console.log(`\nTest 3 - coinValue(string inputs)`);
    console.log('Actual:', testValue3.totalCents, `($${testValue3.totalDollars})`);
  }
  