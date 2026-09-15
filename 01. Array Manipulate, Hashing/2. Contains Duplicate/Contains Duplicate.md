# LeetCode 217. Contains Duplicate — Interview Script

https://leetcode.com/problems/contains-duplicate/

> Code lives in `Contains Duplicate.ts`. This file is what you **say** out loud.
> 코드는 `Contains Duplicate.ts`에 있다. 이 파일은 **말로 하는 것**만 담는다.

---

## Problem / 문제

Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

| nums | result | note |
|---|---|---|
| `[1,2,3,1]` | `true` | 1 appears at index 0 and 3 |
| `[1,2,3,4]` | `false` | all distinct |
| `[1,1,1,3,3,4,3,2,4,2]` | `true` | |

**Constraints / 제약조건**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Step 0 — Clarify

> Hands off the keyboard. / 아직 타이핑하지 않는다.

**SAY**

Let me make sure I've got this. I'm given an integer array, "nums". I'm returning a boolean, not an index and not the duplicate value itself. Just whether any duplicate exists.

And "at least twice" means I can return as soon as I find the first repeat. I don't need to count how many there are.

One thing I notice in the constraints — the array can have a single element. In that case there's nothing to compare it against, so the answer is false. My loop should handle that naturally without a special case.

**한글**

제가 제대로 이해했는지 확인하겠습니다. 정수 배열 "nums"가 주어집니다. 반환하는 건 boolean이고, 인덱스도 중복된 값 자체도 아닙니다. 중복이 존재하는지 여부만입니다.

그리고 "최소 두 번"이라는 건 첫 번째 반복을 찾는 즉시 반환해도 된다는 뜻입니다. 몇 개인지 셀 필요는 없습니다.

제약 조건에서 하나 눈에 띄는 게, 배열에 원소가 하나뿐일 수 있습니다. 그러면 비교할 대상이 없으니 답은 false입니다. 제 루프는 특별 처리 없이 자연스럽게 이걸 처리해야 합니다.

> ★ Mentioning the length-1 edge case unprompted is free credit.
> ★ 길이 1 엣지 케이스를 먼저 언급하는 건 공짜로 얻는 점수다.

---

## Step 1 — Brute Force

> Verbal only in a real interview. / 실전에서는 말로만.

**SAY**

The straightforward approach is brute force. I can use nested loops here. The first loop starts at the zeroth index, which is `i`. The second loop starts `j` at `i + 1`, so I never compare an element with itself, and I never check the same pair twice.

If `nums[i]` equals `nums[j]`, I found a duplicate and I return true immediately. If both loops finish without a match, every element is distinct, so I return false.

But the problem is the worst case. When there are no duplicates at all, I have to check every single pair before I can say false. That's O(n²). With n up to a hundred thousand, that's around five billion comparisons, which is far too slow.

**한글**

가장 단순한 접근은 브루트포스입니다. 여기서는 중첩 루프를 쓸 수 있습니다. 첫 번째 루프는 0번 인덱스부터 시작하고 그게 `i`입니다. 두 번째 루프는 `j`를 `i + 1`부터 시작하므로, 원소를 자기 자신과 비교하지 않고 같은 쌍을 두 번 확인하지도 않습니다.

`nums[i]`가 `nums[j]`와 같으면 중복을 찾은 거니 즉시 true를 반환합니다. 두 루프가 끝날 때까지 못 찾으면 모든 원소가 서로 다르니 false를 반환합니다.

그런데 문제는 최악의 경우입니다. 중복이 아예 없을 때는 false라고 말하기 전에 모든 쌍을 다 확인해야 합니다. 그게 O(n²)입니다. n이 최대 10만이면 약 50억 번 비교라서 너무 느립니다.

→ `containsDuplicateBruteForce` in `Contains Duplicate.ts`

| | |
|---|---|
| Time | O(n²) — worst case is no duplicates |
| Space | O(1) |

---

## Step 2 — Hash Set

> ★ The most important 30 seconds. / ★ 가장 중요한 30초.

### 2-1. The insight / 핵심 통찰

**SAY**

The bottleneck is the inner loop. What is it actually doing? For each element, it's asking one question: have I seen this value before? And it answers that by re-scanning the array linearly, every single time.

That's a membership lookup. A hash set answers it in O(1) on average.

So instead of searching backward, I'll remember forward. I walk the array once, and for each element I ask the set whether I've already seen it. If yes, that's my duplicate and I return true. If no, I add it and move on.

**한글**

병목은 안쪽 루프입니다. 이게 실제로 뭘 하고 있을까요? 각 원소마다 하나를 묻고 있습니다. 이 값을 전에 본 적이 있는가. 그리고 그 답을 구하려고 매번 배열을 선형으로 다시 훑습니다.

그건 존재 확인입니다. 해시 셋이 평균 O(1)에 답해줍니다.

그러니 뒤를 탐색하는 대신 앞으로 기억하겠습니다. 배열을 한 번 걸어가면서, 각 원소마다 이미 봤는지 셋에 물어봅니다. 봤으면 그게 중복이니 true를 반환합니다. 안 봤으면 추가하고 넘어갑니다.

### 2-2. Why a Set, not a Map / Map이 아니라 Set인 이유

**SAY**

I'm choosing `Set` over `Map` deliberately. The question here is only "does this exist" — I never need a value back. A `Map` would force me to invent something to store on the value side, which is noise.

`Set` is the right shape for the question I'm asking, and that matters for readability more than for performance.

**한글**

`Map`이 아니라 `Set`을 의도적으로 고릅니다. 여기서의 질문은 "이게 존재하는가"뿐이고, 값을 돌려받을 일이 없습니다. `Map`을 쓰면 값 자리에 넣을 무언가를 억지로 만들어야 하는데 그건 노이즈입니다.

`Set`이 제가 던지는 질문에 맞는 형태입니다. 그리고 그건 성능보다 가독성 면에서 더 중요합니다.

> ★ Contrast with Two Sum: there I needed the **index** back, so `Map`. Here I need
> only existence, so `Set`. Same pattern, different shape.
> ★ Two Sum과의 대비: 거기선 **인덱스**를 돌려받아야 해서 `Map`. 여기선 존재 여부만
> 필요해서 `Set`. 같은 패턴, 다른 형태.

### 2-3. `has()` is fine here / 여기선 has()를 써도 된다

**SAY**

One TypeScript note. In a problem like Two Sum I'd avoid `has` followed by `get`, because that's two hash lookups and because `has` doesn't narrow the type of what `get` returns.

Neither applies here. `Set.has` returns a plain boolean and I never call `get`, so there's exactly one lookup and nothing to narrow. `has` is the correct call.

**한글**

TypeScript 관련해서 하나만. Two Sum 같은 문제에서는 `has` 다음에 `get`을 하는 걸 피합니다. 해시 조회가 두 번이고, `has`가 `get`의 반환 타입을 좁혀주지 않기 때문입니다.

여기서는 둘 다 해당되지 않습니다. `Set.has`는 순수한 boolean을 반환하고 `get`을 호출할 일이 없으니, 조회는 정확히 한 번이고 좁힐 타입도 없습니다. `has`가 맞는 호출입니다.

### 2-4. Order matters / 순서가 중요하다

**SAY**

Same principle as Two Sum — I check before I add. At the moment of the check, the set holds only elements strictly before the current one. So an element can never match itself.

If I added first, every single element would look like a duplicate of itself and I'd return true immediately for any input.

**한글**

Two Sum과 같은 원리입니다. 추가하기 전에 확인합니다. 확인하는 시점에 셋에는 현재 원소보다 앞선 것들만 들어있습니다. 그래서 원소가 자기 자신과 매칭될 수 없습니다.

추가를 먼저 했다면 모든 원소가 자기 자신의 중복으로 보여서, 어떤 입력에도 즉시 true를 반환하게 됩니다.

> **INVARIANT** — set at check time = elements at indices `[0, i-1]`. Never myself.
> **불변식** — 확인 시점의 셋 = 인덱스 `[0, i-1]`의 원소들. 나 자신은 절대 없다.

### 2-5. Why not the one-liner / 한 줄짜리를 안 쓰는 이유

> Only if the interviewer brings it up, or if you have time.
> 면접관이 꺼내거나 시간이 남을 때만.

**SAY**

There's a one-liner for this: build a set from the whole array and compare its size to the array length. Same O(n) time and O(n) space on paper.

But it always builds the entire set. My version returns the moment it finds a duplicate. For an input like a hundred thousand identical values, mine exits after two iterations and the one-liner still does a hundred thousand insertions.

Same asymptotic complexity, very different real-world behavior. I'd mention the one-liner as an option but ship the loop.

**한글**

한 줄짜리가 있습니다. 배열 전체로 셋을 만들고 크기를 배열 길이와 비교하는 겁니다. 이론상 시간 O(n), 공간 O(n)으로 같습니다.

하지만 그건 항상 셋 전체를 만듭니다. 제 버전은 중복을 찾는 순간 반환합니다. 10만 개의 동일한 값이 입력으로 들어오면 제 것은 2회 반복 후 종료되지만, 한 줄짜리는 여전히 10만 번 삽입합니다.

점근 복잡도는 같지만 실제 동작은 크게 다릅니다. 한 줄짜리를 선택지로 언급하되 루프를 채택하겠습니다.

→ `containsDuplicate` in `Contains Duplicate.ts`

---

## Step 3 — Trace and Complexity

> Verify by hand, then close with the numbers. No typing.
> 손으로 검증하고 숫자로 마무리한다. 타이핑 없음.

**SAY**

Let me trace `[1, 2, 3, 1]`.

First element, 1. The set is empty, so no match. Add 1.

Second, 2. Not in the set. Add 2.

Third, 3. Not in the set. Add 3.

Fourth, 1. The set has 1 already, so I return true. Correct — 1 appears at indices zero and three.

And let me check the false path with `[1, 2, 3, 4]`. Nothing ever matches, the loop finishes, and I fall through to return false.

For complexity: time is O(n) — a single pass with average O(1) set operations. Space is O(n) in the worst case, which is when there are no duplicates and I end up storing every element.

One honest note: hash operations are O(1) on average. Adversarial collisions degrade to O(n), making it O(n²) in theory. Not a practical concern with V8.

Versus brute force, I traded O(n) space for a drop from O(n²) to O(n) time.

**한글**

`[1, 2, 3, 1]`을 추적해보겠습니다.

첫 번째 원소 1. 셋이 비어있으니 매칭 없음. 1을 추가합니다.

두 번째 2. 셋에 없습니다. 2를 추가합니다.

세 번째 3. 셋에 없습니다. 3을 추가합니다.

네 번째 1. 셋에 1이 이미 있으니 true를 반환합니다. 맞습니다. 1이 인덱스 0과 3에 나타납니다.

false 경로도 `[1, 2, 3, 4]`로 확인하겠습니다. 아무것도 매칭되지 않고 루프가 끝나서 false 반환으로 떨어집니다.

복잡도는 시간 O(n)입니다. 한 번 순회하고 셋 연산은 평균 O(1)입니다. 공간은 최악의 경우 O(n)으로, 중복이 없어서 모든 원소를 저장하게 될 때입니다.

정직하게 한 가지 덧붙이면, 해시 연산은 평균 O(1)입니다. 적대적 충돌이 발생하면 O(n)으로 퇴화해 이론상 O(n²)이 됩니다. V8에서는 실무적으로 문제되지 않습니다.

브루트포스 대비, O(n) 공간을 내주고 시간을 O(n²)에서 O(n)으로 줄였습니다.

| num | set before | has? | action |
|---|---|---|---|
| 1 | `{}` | no | add → `{1}` |
| 2 | `{1}` | no | add → `{1,2}` |
| 3 | `{1,2}` | no | add → `{1,2,3}` |
| 1 | `{1,2,3}` | **yes** | `return true` |

> ★ Trace the **false** path too. Most candidates only trace the happy path.
> ★ **false** 경로도 추적할 것. 대부분의 지원자는 성공 경로만 추적한다.

---

## Summary Table / 접근법 비교

| approach | time | space | verdict |
|---|---|---|---|
| Brute force | O(n²) | O(1) | too slow at n = 10⁵ |
| Sorting | O(n log n) | O(1)* | best if space is the constraint |
| **Hash set** | **O(n)** | O(n) | ✓ |
| `new Set(nums).size` | O(n) | O(n) | no early exit |

\* O(1) only if sorting in place and mutating the input is allowed.
\* 입력을 제자리 정렬하고 변형해도 될 때만 O(1).

---

## Follow-up Questions

> Two sentences each. / 각각 두 문장으로.

**Q. "Can you do it without extra space?"**

**A.** Yes — sort the array first, then any duplicate must sit next to its twin, so one linear pass comparing adjacent elements is enough. That's O(n log n) time and O(1) extra space, which is the right trade if memory is tighter than time.

네 — 배열을 먼저 정렬하면 중복은 반드시 짝과 나란히 놓이므로, 인접 원소를 비교하는 선형 순회 한 번이면 충분합니다. 시간 O(n log n), 추가 공간 O(1)이고, 메모리가 시간보다 빡빡하면 이게 맞는 거래입니다.

**Q. "Why `Set` and not `Map`?"**

**A.** The question is purely existence — I never need a value back, so a `Map` would force me to store a dummy on the value side. `Set` matches the shape of the question, which makes the code read as what it means.

질문이 순수하게 존재 여부뿐이라 값을 돌려받을 일이 없고, `Map`을 쓰면 값 자리에 더미를 넣어야 합니다. `Set`이 질문의 형태와 맞고, 그래야 코드가 의미대로 읽힙니다.

**Q. "What about `new Set(nums).size !== nums.length`?"**

**A.** Same asymptotic complexity, but it always builds the full set with no early exit. For an array of a hundred thousand identical values my loop exits after two iterations while that one does a hundred thousand insertions.

점근 복잡도는 같지만 조기 종료 없이 항상 셋 전체를 만듭니다. 10만 개의 동일한 값이면 제 루프는 2회 만에 끝나지만 그건 10만 번 삽입합니다.

**Q. "What if the array doesn't fit in memory?"**

**A.** Then I'd either sort externally and scan for adjacent equals, or use a Bloom filter as a first pass — it gives false positives but never false negatives, so anything it flags gets verified exactly. Which one depends on whether an exact answer is required.

외부 정렬 후 인접 동일값을 스캔하거나, 1차 필터로 블룸 필터를 쓰겠습니다. 블룸 필터는 위양성은 있지만 위음성은 없으므로 걸린 것만 정확히 검증하면 됩니다. 어느 쪽이냐는 정확한 답이 필요한지에 달렸습니다.

**Q. "What if you had to return the duplicated value, or its index?"**

**A.** Then `Set` isn't enough — returning the value means returning `num` at the match, and returning an index means switching to `Map<number, number>` from value to first index. That's exactly the Two Sum shape.

그러면 `Set`으로는 부족합니다. 값을 반환하려면 매칭 지점의 `num`을 반환하면 되고, 인덱스를 반환하려면 값에서 첫 인덱스로 가는 `Map<number, number>`로 바꿔야 합니다. 그게 정확히 Two Sum의 형태입니다.

---

## Drill Protocol / 연습 절차

1. Read this file once, out loud, in English. / 이 파일을 영어로 소리 내어 한 번 읽는다.
2. Open `Contains Duplicate.ts`, fill in `containsDuplicateDrill` from the comments alone. / `Contains Duplicate.ts`를 열고 주석만 보며 `containsDuplicateDrill`을 채운다.
3. Speak the English **while** typing. Silence isn't practice. / 타이핑하면서 영어를 소리 내어 말한다. 침묵하면 연습이 아니다.
4. Run the tests. All must pass. / 테스트를 돌린다. 전부 통과해야 한다.

---

## If you only memorize three sentences / 세 문장만 외운다면

1. *"The inner loop is asking 'have I seen this before' — that's a membership lookup."*
2. *"I check before I add, so an element can never match itself."*
3. *"`Set` because I only need existence; a `Map` would force me to invent a value."*

> Same bottleneck as Two Sum, same fix. **A repeated linear search is a hash structure waiting to happen.**
> Two Sum과 같은 병목, 같은 해법. **반복되는 선형 탐색은 해시 구조로 바뀌기를 기다리고 있다.**