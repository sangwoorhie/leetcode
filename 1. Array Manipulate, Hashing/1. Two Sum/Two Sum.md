# LeetCode 1. Two Sum — Interview Script

https://leetcode.com/problems/two-sum/

> Code lives in `Two Sum.ts`. This file is what you **say** out loud.
> 코드는 `Two Sum.ts`에 있다. 이 파일은 **말로 하는 것**만 담는다.

---

## Problem / 문제

You are given an array of integers `nums` and an integer `target`. Return indices of the two numbers such that they add up to `target`. Each input has exactly one solution, and you may not use the same element twice. The answer can be returned in any order.

| nums | target | result | note |
|---|---|---|---|
| `[2,7,11,15]` | 9 | `[0,1]` | nums[0]+nums[1]==9 |
| `[3,2,4]` | 6 | `[1,2]` | |
| `[3,3]` | 6 | `[0,1]` | duplicate values |

**Constraints / 제약조건**
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists. / 정답은 정확히 하나 존재한다.

---

## Step 0 — Clarify

> Hands off the keyboard. / 아직 타이핑하지 않는다.

**SAY**

Let me make sure I've got this. I'm given an array of integers, "nums", and an integer, "target". I'm returning the indices of the two numbers that add up to target. I'm not returning the values themselves.

And "you may not use the same element twice" means the same index, not the same value. Example three returns `[0, 1]` for `[3, 3]`, so duplicate values are fine.

**한글**

제가 제대로 이해했는지 확인하겠습니다. 정수 배열 "nums"와 정수 "target"이 주어집니다. 더해서 target이 되는 두 숫자의 인덱스를 반환합니다. 값 자체가 아닙니다.

그리고 "같은 원소를 두 번 쓸 수 없다"는 건 같은 인덱스를 말하는 것이지 같은 값이 아닙니다. 예제 3이 `[3, 3]`에 대해 `[0, 1]`을 반환하니, 값이 중복되는 건 괜찮습니다.

> ★ The point isn't the questions. It's showing you **derived** the rule from example three.
> ★ 핵심은 질문이 아니라, 예제 3에서 규칙을 **직접 유추했다**는 걸 보여주는 것.

---

## Step 1 — Brute Force

> Verbal only in a real interview. / 실전에서는 말로만.

**SAY**

The straightforward approach is brute force. Maybe I can use nested loops here. In the first loop I start my iteration from the zeroth index, which is `i`. And in the second loop I start `j` at `i + 1`. So this prevents pairing an element with itself, and it also avoids checking the same pair twice.

But the problem is, if the answer is at the end of the array, I have to go through almost everything. So in the worst case this is O(n²) — oh-n-squared — and that's not great in terms of optimization.

**한글**

가장 단순한 접근은 브루트포스입니다. 여기서는 중첩 루프를 쓸 수 있겠네요. 첫 번째 루프는 0번 인덱스부터 시작하고, 그게 `i`입니다. 두 번째 루프는 `j`를 `i + 1`부터 시작합니다. 이렇게 하면 원소를 자기 자신과 짝짓는 걸 막고, 같은 쌍을 두 번 확인하는 것도 방지합니다.

그런데 문제는, 정답이 배열 끝에 있으면 거의 전부를 훑어야 한다는 겁니다. 그래서 최악의 경우 O(n²)이고, 최적화 관점에서 좋지 않습니다.

→ `twoSumBruteForce` in `Two Sum.ts`

| | |
|---|---|
| Time | O(n²) |
| Space | O(1) |

---

## Step 2 — Hash Table

> ★ The most important 30 seconds. / ★ 가장 중요한 30초.

**SAY**

Let me go back to what the problem actually is. I need two numbers, and their sum is the target.

So if I fix one number, the other one is not a free choice — it's completely determined. It has to be `target - nums[i]`. I'll call that the complement.

That reframing is the key. The inner loop in brute force was really just asking one question: does the value `target - nums[i]` exist in this array? And it re-scanned linearly to answer that, every single time.

That's a membership lookup, and a hash map answers it in O(1) on average. So instead of searching, I'll remember. I walk the array once, and for each element I ask the map whether I've already seen its complement.

**한글**

문제가 실제로 뭘 요구하는지로 돌아가 보겠습니다. 두 수가 필요하고, 그 합이 target입니다.

그러면 하나를 고정하는 순간 나머지 하나는 자유롭게 고를 수 있는 게 아니라 완전히 결정됩니다. `target - nums[i]`여야만 합니다. 이걸 complement라고 부르겠습니다.

이 재해석이 핵심입니다. 브루트포스의 안쪽 루프가 실제로 묻던 건 하나였습니다. `target - nums[i]`라는 값이 이 배열에 존재하는가. 그리고 그 답을 구하려고 매번 선형으로 다시 훑었습니다.

그건 존재 확인이고, 해시맵이 평균 O(1)에 답해줍니다. 그러니 탐색하는 대신 기억하겠습니다. 배열을 한 번 걸어가면서, 각 원소마다 그 complement를 이미 본 적 있는지 맵에 물어봅니다.

### 2-1. Declaring the map / 맵 선언

**SAY**

I'll build the map as I go. The design decision is the direction — I'm querying by value, so value has to be the key. Value to index. I'm naming it `indexByValue` so that's obvious to anyone reading it.

I'm using `Map` rather than a plain object, because objects coerce keys to strings. With values down to negative one billion, that's needless overhead. `Map` keeps them as numbers.

**한글**

순회하면서 맵을 만들어가겠습니다. 설계 결정은 방향입니다. 값을 기준으로 조회하니 값이 키가 되어야 합니다. 값에서 인덱스로 가는 매핑입니다. 변수명을 `indexByValue`로 지어서 읽는 사람 누구에게나 방향이 드러나게 하겠습니다.

일반 객체 대신 `Map`을 씁니다. 객체는 키를 문자열로 강제 변환하기 때문입니다. 값이 -10억까지 갈 수 있으니 불필요한 오버헤드입니다. `Map`은 숫자 그대로 유지합니다.

### 2-2. The loop / 루프

**SAY**

Classic `for` loop, because I need the index, and because I want to return early the moment I find the answer. `forEach` can't do that — its `return` only exits the callback.

**한글**

고전적인 `for` 루프를 씁니다. 인덱스가 필요하고, 답을 찾는 즉시 조기 반환하고 싶기 때문입니다. `forEach`는 그게 안 됩니다. 거기서의 `return`은 콜백만 빠져나올 뿐입니다.

### 2-3. Lookup order / 조회 순서

> ★ Second differentiator. Pause your hands here.
> ★ 두 번째 차별화 지점. 여기서 잠깐 손을 멈춘다.

**SAY**

Before I write the lookup, the ordering matters here, so let me say why.

I could do two passes: fill the map completely, then scan for complements. But then the map contains the current element itself. For `[3, 2, 4]` with target 6, index 0 would match index 0 — reusing the same element. I'd need an explicit `index !== i` guard.

Instead I'll do one pass and look up before I insert. That gives me an invariant: at lookup time in iteration `i`, the map holds exactly indices zero through `i` minus one. Everything before me, never me. So self-matching becomes structurally impossible, and I don't need that guard at all.

I prefer encoding a correctness condition in the control flow over a conditional I have to remember to write.

**한글**

조회를 쓰기 전에, 순서가 중요하니 이유를 먼저 말씀드리겠습니다.

두 번 순회하는 방법도 있습니다. 맵을 먼저 다 채우고, 그 다음 complement를 찾는 거죠. 하지만 그러면 맵에 현재 원소 자신이 들어있게 됩니다. `[3, 2, 4]`에 target 6이면 인덱스 0이 인덱스 0과 매칭됩니다. 같은 원소를 재사용하는 거죠. `index !== i` 가드를 명시적으로 넣어야 합니다.

대신 한 번만 순회하되 조회를 삽입보다 먼저 하겠습니다. 그러면 불변식이 생깁니다. 반복 `i`의 조회 시점에서 맵에는 정확히 인덱스 0부터 `i-1`까지만 들어있습니다. 나보다 앞선 것 전부, 나 자신은 절대 없습니다. 그래서 자기 자신과의 매칭이 구조적으로 불가능해지고, 그 가드가 아예 필요 없습니다.

저는 기억해서 써야 하는 조건문보다, 정확성 조건을 제어 흐름에 인코딩하는 쪽을 선호합니다.

> **INVARIANT** — map at this point = indices `[0, i-1]`. Never myself.
> **불변식** — 이 시점의 맵 = 인덱스 `[0, i-1]`. 나 자신은 절대 없다.

### 3-4. Two TypeScript details / TypeScript 디테일 두 가지

**SAY**

Two TypeScript details worth flagging.

First, I'm storing `get`'s result in a variable rather than doing `has` then `get`. That's one hash lookup instead of two, and comparing against `undefined` lets TypeScript's control flow analysis narrow it to `number` inside the block. `has` wouldn't narrow anything — the compiler doesn't connect the two calls.

Second, `!== undefined` rather than a truthy check. Index zero is falsy in JavaScript. Example three returns `[0, 1]`, so a plain `if (complementIndex)` would silently skip a correct answer. That's a real bug, not style.

**한글**

짚어둘 만한 TypeScript 디테일이 두 가지 있습니다.

첫째, `has` 다음에 `get`을 하는 대신 `get`의 결과를 변수에 담고 있습니다. 해시 조회가 두 번이 아니라 한 번이고, `undefined`와 비교하면 TypeScript의 제어 흐름 분석이 블록 안에서 타입을 `number`로 좁혀줍니다. `has`는 아무것도 좁혀주지 못합니다. 컴파일러가 그 두 호출을 연결하지 않기 때문입니다.

둘째, truthy 체크 대신 `!== undefined`를 씁니다. JavaScript에서 인덱스 0은 falsy입니다. 예제 3이 `[0, 1]`을 반환하니, 그냥 `if (complementIndex)`로 쓰면 정답을 조용히 건너뜁니다. 스타일 문제가 아니라 실제 버그입니다.

| anti-pattern | why it breaks / 왜 깨지나 |
|---|---|
| `if (complementIndex)` | misses index 0 / 인덱스 0을 놓친다 |
| `if (indexByValue.has(complement))` | no narrowing + 2 lookups / narrowing 안 됨 + 조회 2회 |

### 3-5. Recording on miss / 실패 시 기록

**SAY**

If I reach this line, the lookup missed. So I record myself for whoever comes later. And there's no `else` needed — the early return handles it.

**한글**

이 줄에 도달했다는 건 조회가 실패했다는 뜻입니다. 그래서 나중에 올 사람을 위해 저를 기록합니다. `else`는 필요 없습니다. 조기 반환이 그 역할을 합니다.

### 3-6. The final throw / 마지막 throw

**SAY**

This is unreachable given the guarantee, but the compiler doesn't know that. I throw rather than returning an empty array — an empty array blurs "no solution" with "the solution is empty." Throwing documents the contract.

**한글**

문제의 보장을 고려하면 이 줄은 도달 불가능하지만, 컴파일러는 그걸 모릅니다. 빈 배열을 반환하는 대신 `throw`를 씁니다. 빈 배열은 "해가 없음"과 "해가 빈 배열임"을 뭉개버립니다. `throw`는 계약을 명시적으로 문서화합니다.

> Without it: `Function lacks ending return statement...` (`noImplicitReturns`)
> 없으면: `Function lacks ending return statement...` (`noImplicitReturns`)

→ `twoSum` in `Two Sum.ts`

---

## Step 4 — Trace and Complexity

> Verify by hand, then close with the numbers. No typing.
> 손으로 검증하고 숫자로 마무리한다. 타이핑 없음.

**SAY**

Let me trace `[3, 2, 4]` with target 6. I'm picking this one deliberately because it's the case that catches the self-matching bug.

`i` zero: value 3, complement 3. The map is empty, no match. This is exactly where insert-first would have broken. Store 3 to 0.

`i` one: value 2, complement 4. Not present. Store 2 to 1.

`i` two: value 4, complement 2. Found at index 1. Return `[1, 2]`. Matches expected.

For complexity: time is O(n) — a single pass with average O(1) map operations. Space is O(n) in the worst case, when the pair is at the very end.

One honest note: hash operations are O(1) on average. Adversarial collisions degrade to O(n), making the whole thing O(n²) in theory. Not a practical concern with V8.

So compared to brute force, I traded O(n) space for a drop from O(n²) to O(n) time. That's the right trade at this input size.

**한글**

`[3, 2, 4]`에 target 6으로 추적해보겠습니다. 이걸 의도적으로 고른 이유는 자기 자신 매칭 버그를 잡아내는 케이스이기 때문입니다.

`i`가 0일 때: 값 3, complement 3. 맵이 비어있어서 매칭 없음. 삽입을 먼저 했다면 정확히 여기서 깨졌을 지점입니다. 3을 0으로 저장합니다.

`i`가 1일 때: 값 2, complement 4. 없습니다. 2를 1로 저장합니다.

`i`가 2일 때: 값 4, complement 2. 인덱스 1에서 찾았습니다. `[1, 2]`를 반환합니다. 기대 출력과 일치합니다.

복잡도는 시간 O(n)입니다. 한 번 순회하고 맵 연산은 평균 O(1)입니다. 공간은 최악의 경우 O(n)으로, 짝이 맨 끝에 있을 때입니다.

정직하게 한 가지 덧붙이면, 해시 연산은 평균 O(1)입니다. 적대적 충돌이 발생하면 O(n)으로 퇴화하고 전체가 이론상 O(n²)이 됩니다. V8에서는 실무적으로 문제되지 않습니다.

브루트포스 대비, O(n) 공간을 내주고 시간을 O(n²)에서 O(n)으로 줄였습니다. 이 입력 크기에서는 맞는 거래입니다.

| i | nums[i] | complement | lookup | map after |
|---|---|---|---|---|
| 0 | 3 | 3 | `undefined` | `{3→0}` |
| 1 | 2 | 4 | `undefined` | `{3→0, 2→1}` |
| 2 | 4 | 2 | `1` ✓ | `return [1, 2]` |

> ★ **"deliberately"** is the key word. You didn't pick a random case.
> ★ **"deliberately"** 가 핵심 단어. 아무 케이스나 고른 게 아니다.

---

## Summary Table / 접근법 비교

| approach | time | space | verdict |
|---|---|---|---|
| Brute force | O(n²) | O(1) | too slow |
| Sorting + two pointers | O(n log n) | O(n) | destroys indices |
| Hash table | **O(n)** | O(n) | ✓ |

---

## Follow-up Questions

> Two sentences each. / 각각 두 문장으로.

**Q. "Why Map instead of a plain object?"**

**A.** Objects coerce keys to strings, so numeric keys get stringified — with values down to negative one billion that's wasted work. `Map` preserves the number type, gives O(1) `.size`, and has no prototype-chain collisions.

객체는 키를 문자열로 강제 변환하므로 숫자 키가 문자열이 됩니다. 값이 -10억까지 가는 상황에서는 낭비입니다. `Map`은 숫자 타입을 유지하고, `.size`가 O(1)이며, 프로토타입 체인 충돌도 없습니다.

**Q. "What if the array were already sorted?"**

**A.** Then two pointers gets me O(1) extra space, since I wouldn't pay for the sort. But the problem asks for original indices, so I'd still need to pair values with indices — which puts space back at O(n).

그러면 정렬 비용을 안 내니 투 포인터로 추가 공간 O(1)이 됩니다. 하지만 문제가 원래 인덱스를 요구하므로 여전히 값과 인덱스를 묶어야 하고, 그러면 공간이 다시 O(n)이 됩니다.

**Q. "What if there's no solution?"**

**A.** The problem guarantees one exists, so I throw. In production I'd change the signature to return `number[] | null` and let the caller decide — throwing for an expected-but-absent result is usually the wrong shape.

문제가 하나 존재한다고 보장하므로 `throw`를 씁니다. 실무라면 시그니처를 `number[] | null`로 바꿔서 호출자가 판단하게 하겠습니다. 예상 범위 안에서 결과가 없는 경우에 `throw`를 쓰는 건 대개 잘못된 형태입니다.

**Q. "Can you return all valid pairs instead of one?"**

**A.** Then a single index per value isn't enough — I'd map each value to an array of indices, `Map<number, number[]>`, and collect matches instead of returning early. Worth clarifying whether `(i, j)` and `(j, i)` count as one pair or two.

그러면 값당 인덱스 하나로는 부족합니다. 각 값을 인덱스 배열로 매핑해서 `Map<number, number[]>`를 쓰고, 조기 반환 대신 매칭을 수집하겠습니다. `(i, j)`와 `(j, i)`를 한 쌍으로 볼지 두 쌍으로 볼지는 확인이 필요합니다.

**Q. "What about integer overflow?"**

**A.** Not an issue in JavaScript here — the max sum is two billion, well inside `Number.MAX_SAFE_INTEGER`. In Java or C++ I'd need to watch int overflow, so I'd subtract rather than add.

JavaScript에서는 여기서 문제되지 않습니다. 최대 합이 20억으로 `Number.MAX_SAFE_INTEGER` 안에 충분히 들어옵니다. Java나 C++이라면 int 오버플로우를 신경 써야 하므로 더하기 대신 빼기를 쓰겠습니다.

---

## Drill Protocol / 연습 절차

1. Read this file once, out loud, in English. / 이 파일을 영어로 소리 내어 한 번 읽는다.
2. Open `Two Sum.ts`, fill in `twoSumDrill` from the comments alone. / `Two Sum.ts`를 열고 주석만 보며 `twoSumDrill`을 채운다.
3. Speak the English **while** typing. Silence isn't practice. / 타이핑하면서 영어를 소리 내어 말한다. 침묵하면 연습이 아니다.
4. Run the tests. All must pass. / 테스트를 돌린다. 전부 통과해야 한다.

---

## If you only memorize three sentences / 세 문장만 외운다면

1. *"The inner loop is a repeated linear search — that's the bottleneck."*
2. *"I look up before I insert, which makes self-matching structurally impossible."*
3. *"Index zero is falsy, so I compare against `undefined` explicitly."*