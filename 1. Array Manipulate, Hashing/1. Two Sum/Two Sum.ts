// ============================================================================
// LeetCode 1. Two Sum  —  typing drill
// https://leetcode.com/problems/two-sum/
//
// 말하기 스크립트는 `Two Sum.md` 참고. 이 파일은 손을 움직이는 연습용이다.
// The speaking script lives in `Two Sum.md`. This file is for the hands.
//
// Run: npx tsx "Two Sum.ts"
// ============================================================================


// ============================================================================
// STEP 1. BRUTE FORCE  —  O(n²) time, O(1) space
// ============================================================================
//
// "In the first loop I start from the zeroth index, which is i.
//  In the second loop I start j at i + 1, so this prevents pairing an element
//  with itself, and it also avoids checking the same pair twice."
//
// "But if the answer is at the end of the array, I have to go through almost
//  everything. So in the worst case this is O(n²)."

function twoSumBruteForce(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
      // j = i + 1 : blocks self-pairing and duplicate-pair checks at once
      // j = i + 1 : 자기 자신과의 짝 + 중복 쌍 검사를 동시에 차단
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
  
    throw new Error('No two sum solution exists');
  }
  
  // ============================================================================
  // STEP 2. HASH TABLE  —  O(n) time, O(n) space   ★ OPTIMAL
  // ============================================================================
  //
  // "If I fix one number, the other one is completely determined.
  //  It has to be target - nums[i]. I'll call that the complement."
  //
  // "The inner loop was really just asking: does this value exist in the array?
  //  That's a membership lookup, and a hash map answers it in O(1) on average.
  //  So instead of searching, I'll remember."
  
  function twoSum(nums: number[], target: number): number[] {

    const indexByValue = new Map<number, number>();
  
    for (let i = 0; i < nums.length; i++) {

      const complement = target - nums[i];
      const complementIndex = indexByValue.get(complement);
  
      if (complementIndex !== undefined) {
        return [complementIndex, i];
      }
      indexByValue.set(nums[i], i);
    }
    throw new Error('No two sum solution exists');
  }
  
  
  // ============================================================================
  // DRILL  —  the real practice starts here.
  //   Fold the sections above. Fill this in from the comments alone.
  //   Speak the English out loud while typing. Silence isn't practice.
  //
  //   위 섹션들을 접고, 주석만 읽으며 직접 채운다.
  //   영어를 소리 내어 말하면서 타이핑할 것. 침묵하면 연습이 아니다.
  // ============================================================================
  
  function twoSumDrill(nums: number[], target: number): number[] {
    // "I'm querying by value, so value has to be the key. Value to index."
    // → declare the value→index map / 값→인덱스 맵을 선언
  
  
    // "Classic for loop because I need the index and want to return early."
    // → iterate nums from 0 to the end / nums를 0부터 끝까지 순회
  
  
      // "If I fix one number, the other one is completely determined."
      // → compute the partner's value / 짝의 값 계산
  
  
      // "I look up before I insert. The map holds only indices [0, i-1],
      //  so self-matching is structurally impossible."
      // → look it up (store the result in a variable — no has())
      // → 맵에서 짝을 조회 (결과를 변수에 담을 것. has() 금지)
  
  
      // "!== undefined, not a truthy check. Index zero is falsy."
      // → if found, return [partner's slot, my slot]
      // → 찾았으면 [짝의 자리, 내 자리] 반환
  
  
      // "If I reach this line, the lookup missed — record myself."
      // → store myself in the map / 나를 맵에 저장
  
  
    // "Unreachable given the guarantee, but the compiler doesn't know that."
    // → throw
  
    throw new Error('Fill in twoSumDrill');
  }
  
  
// ============================================================================
// TEST RUNNER
// ============================================================================
 
type TestCase = { nums: number[]; target: number; expected: number[] };
 
const CASES: TestCase[] = [
  { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
  { nums: [3, 2, 4], target: 6, expected: [1, 2] },
  { nums: [3, 3], target: 6, expected: [0, 1] },
  // index 0 is in the answer — catches the truthy-check bug
  // 인덱스 0이 정답에 포함 — truthy 체크 버그를 잡는다
  { nums: [0, 4, 3, 0], target: 0, expected: [0, 3] },
  // negatives / 음수
  { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] },
  // answer at the very end — worst case for space
  // 정답이 맨 끝 — 공간 최악 케이스
  { nums: [1, 2, 3, 4, 5, 6], target: 11, expected: [4, 5] },
  // the sorting example from Step 2 (5 + 8 = 13, the only pair)
  // Step 2의 정렬 예시 (5 + 8 = 13, 유일한 쌍)
  { nums: [8, 5, 4, 15, 12, 7, 2], target: 13, expected: [0, 1] },
];
 
function run(
  name: string,
  fn: (nums: number[], target: number) => number[],
): void {
  console.log(`\n--- ${name} ---`);
 
  let passed = 0;
 
  for (const { nums, target, expected } of CASES) {
    const input = `nums=[${nums}], target=${target}`;
 
    try {
      // copy the input so an in-place sort can't leak between runs
      // in-place 정렬이 다른 실행에 영향을 주지 않도록 입력을 복사
      const actual = fn([...nums], target);
 
      // order doesn't matter, so compare sorted
      // 순서 무관이므로 정렬 후 비교
      const ok =
        [...actual].sort((a, b) => a - b).join(',') ===
        [...expected].sort((a, b) => a - b).join(',');
 
      if (ok) {
        passed++;
        console.log(`  PASS  ${input} -> [${actual}]`);
      } else {
        console.log(`  FAIL  ${input} -> [${actual}], expected [${expected}]`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(`  ERROR ${input} -> ${message}`);
    }
  }
 
  console.log(`  ${passed}/${CASES.length} passed`);
}
 
run('twoSumBruteForce', twoSumBruteForce);
run('twoSum', twoSum);
run('twoSumDrill', twoSumDrill);
 
// ============================================================================
// Makes this file a MODULE instead of a global script, so `TestCase`, `CASES`
// and `run` do not collide with the other problem files in this folder.
// 이 파일을 전역 스크립트가 아닌 모듈로 만든다. 그래야 `TestCase`, `CASES`,
// `run` 이 같은 폴더의 다른 문제 파일들과 충돌하지 않는다.
// ============================================================================
export {};