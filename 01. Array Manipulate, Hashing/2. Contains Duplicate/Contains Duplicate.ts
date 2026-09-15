// ============================================================================
// LeetCode 217. Contains Duplicate  —  typing drill
// https://leetcode.com/problems/contains-duplicate/
//
// 말하기 스크립트는 `Contains Duplicate.md` 참고. 이 파일은 손을 움직이는 연습용.
// The speaking script lives in `Contains Duplicate.md`. This file is for the hands.
//
// Run: npx tsx "Contains Duplicate.ts"
// ============================================================================


// ============================================================================
// STEP 1. BRUTE FORCE  —  O(n²) time, O(1) space
// ============================================================================
//
// "The first loop starts at the zeroth index, which is i. The second loop
//  starts j at i + 1, so I never compare an element with itself, and I never
//  check the same pair twice."
//
// "The worst case is when there are NO duplicates — I have to check every
//  single pair before I can say false. With n up to a hundred thousand,
//  that's around five billion comparisons."

function containsDuplicateBruteForce(nums: number[]): boolean {
    for (let i = 0; i < nums.length; i++) {
      // j = i + 1 : never compare with self, never repeat a pair
      // j = i + 1 : 자기 자신과 비교하지 않고, 같은 쌍을 반복하지 않는다
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] === nums[j]) {
          return true;
        }
      }
    }
  
    // Loops finished with no match — every element is distinct.
    // 루프가 매칭 없이 끝났다 = 모든 원소가 서로 다르다.
    return false;
  }
  
  
  // ============================================================================
  // STEP 2. HASH SET  —  O(n) time, O(n) space   ★ OPTIMAL
  // ============================================================================
  //
  // "The inner loop was asking one question: have I seen this value before?
  //  That's a membership lookup, and a hash set answers it in O(1) on average."
  //
  // "So instead of searching backward, I'll remember forward."
  //
  // ★ Set, not Map — the question is purely existence. A Map would force me to
  //   invent something to store on the value side.
  //   Set이지 Map이 아니다 — 질문이 순수하게 존재 여부뿐이다.
  //   Map을 쓰면 값 자리에 넣을 무언가를 억지로 만들어야 한다.
  //
  // ★ has() is FINE here. Unlike Map.get(), Set.has() returns a plain boolean
  //   and there's no second call to narrow — exactly one lookup.
  //   여기선 has()를 써도 된다. Map.get()과 달리 Set.has()는 순수 boolean을
  //   반환하고 좁힐 두 번째 호출이 없다 — 조회는 정확히 한 번.
  
  function containsDuplicate(nums: number[]): boolean {
    // Values I've already walked past.
    // 이미 지나온 값들.
    const seen = new Set<number>();
  
    // for...of : I need the value, not the index.
    // for...of : 인덱스가 아니라 값이 필요하다.
    for (const num of nums) {
      // INVARIANT: at this check, `seen` holds indices [0, i-1] only.
      // Never myself — which is why checking BEFORE adding matters.
      // 불변식: 이 확인 시점의 `seen`은 인덱스 [0, i-1]만 담는다.
      // 나 자신은 절대 없다 — 그래서 추가 '전에' 확인하는 게 중요하다.
      //
      // ❌ add first, then check -> every element matches itself -> always true
      //    추가 먼저, 확인 나중 -> 모든 원소가 자기 자신과 매칭 -> 항상 true
      if (seen.has(num)) {
        return true;
      }
  
      seen.add(num);
    }
  
    // No duplicate found. Length-1 arrays land here naturally — no special case.
    // 중복 없음. 길이 1 배열도 여기로 자연스럽게 떨어진다 — 특별 처리 불필요.
    return false;
  }
  
  
  // ============================================================================
  // BONUS A. SORTING  —  O(n log n) time, O(1) extra space
  //   For the follow-up: "Can you do it without extra space?"
  //   follow-up 대비: "추가 공간 없이 가능한가요?"
  // ============================================================================
  //
  // "After sorting, any duplicate must sit next to its twin, so one linear pass
  //  comparing adjacent elements is enough."
  
  function containsDuplicateSorted(nums: number[]): boolean {
    // NOTE: sort() mutates the input. O(1) space only if that's acceptable.
    // 주의: sort()는 입력을 변형한다. 그게 허용될 때만 O(1) 공간이다.
    //
    // Default sort() compares as strings — always pass a comparator for numbers.
    // 기본 sort()는 문자열로 비교한다. 숫자는 반드시 비교 함수를 넘겨야 한다.
    const sorted = nums.sort((a, b) => a - b);
  
    // Start at 1 so sorted[i - 1] is always valid.
    // 1부터 시작해야 sorted[i - 1]이 항상 유효하다.
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1]) {
        return true;
      }
    }
  
    return false;
  }
  
  
  // ============================================================================
  // BONUS B. ONE-LINER  —  O(n) time, O(n) space, but NO early exit
  //   Mention it as an option; ship the loop.
  //   선택지로 언급하되 루프를 채택한다.
  // ============================================================================
  //
  // "For a hundred thousand identical values, the loop version exits after two
  //  iterations while this one does a hundred thousand insertions."
  
  function containsDuplicateOneLiner(nums: number[]): boolean {
    return new Set(nums).size !== nums.length;
  }
  
  
  // ============================================================================
  // DRILL  —  the real practice starts here.
  //   Fold the sections above. Fill this in from the comments alone.
  //   Speak the English out loud while typing. Silence isn't practice.
  //
  //   위 섹션들을 접고, 주석만 읽으며 직접 채운다.
  //   영어를 소리 내어 말하면서 타이핑할 것. 침묵하면 연습이 아니다.
  // ============================================================================
  
  function containsDuplicateDrill(nums: number[]): boolean {
    // "The question is purely existence — I never need a value back, so Set."
    // → declare the set of seen values / 본 값들의 셋을 선언
  
  
    // "I need the value, not the index."
    // → iterate the values of nums / nums의 값들을 순회
  
  
      // "I check before I add, so an element can never match itself."
      // → if already seen, return true / 이미 봤으면 true 반환
  
  
      // → record this value / 이 값을 기록
  
  
    // "If the loop finishes, every element is distinct."
    // → return false
  
    throw new Error('Fill in containsDuplicateDrill');
  }
  
  
  // ============================================================================
  // TEST RUNNER
  // ============================================================================
  
  type TestCase = { nums: number[]; expected: boolean };
  
  const CASES: TestCase[] = [
    { nums: [1, 2, 3, 1], expected: true },
    { nums: [1, 2, 3, 4], expected: false },
    { nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2], expected: true },
    // single element — nothing to compare against
    // 원소 하나 — 비교할 대상이 없다
    { nums: [7], expected: false },
    // zeros: falsy values, but has() returns a real boolean so no trap
    // 0: falsy 값이지만 has()가 진짜 boolean을 반환하므로 함정 없음
    { nums: [0, 0], expected: true },
    // negatives / 음수
    { nums: [-1, -2, -3, -1], expected: true },
    // duplicate at the very end — worst case for space
    // 중복이 맨 끝 — 공간 최악 케이스
    { nums: [1, 2, 3, 4, 5, 5], expected: true },
    // adjacent duplicates already — catches a broken sorted version
    // 이미 인접한 중복 — 정렬 버전이 깨졌는지 잡는다
    { nums: [2, 2, 1, 3], expected: true },
  ];
  
  function run(name: string, fn: (nums: number[]) => boolean): void {
    console.log(`\n--- ${name} ---`);
  
    let passed = 0;
  
    for (const { nums, expected } of CASES) {
      const input = `nums=[${nums}]`;
  
      try {
        // copy the input so an in-place sort can't leak between runs
        // in-place 정렬이 다른 실행에 영향을 주지 않도록 입력을 복사
        const actual = fn([...nums]);
  
        if (actual === expected) {
          passed++;
          console.log(`  PASS  ${input} -> ${actual}`);
        } else {
          console.log(`  FAIL  ${input} -> ${actual}, expected ${expected}`);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.log(`  ERROR ${input} -> ${message}`);
      }
    }
  
    console.log(`  ${passed}/${CASES.length} passed`);
  }
  
  run('containsDuplicateBruteForce', containsDuplicateBruteForce);
  run('containsDuplicateSorted', containsDuplicateSorted);
  run('containsDuplicateOneLiner', containsDuplicateOneLiner);
  run('containsDuplicate', containsDuplicate);
  run('containsDuplicateDrill', containsDuplicateDrill);
  
  // ============================================================================
  // Makes this file a MODULE instead of a global script, so `TestCase`, `CASES`
  // and `run` do not collide with the other problem files in this folder.
  // 이 파일을 전역 스크립트가 아닌 모듈로 만든다. 그래야 `TestCase`, `CASES`,
  // `run` 이 같은 폴더의 다른 문제 파일들과 충돌하지 않는다.
  // ============================================================================
  export {};