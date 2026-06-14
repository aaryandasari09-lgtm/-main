"""
LLM Council: Multiple Claude instances critically analyze a response from different angles,
then synthesize a final verdict.
"""

import asyncio
import anthropic

client = anthropic.Anthropic()
MODEL = "claude-opus-4-8"

COUNCIL_MEMBERS = [
    {
        "name": "Logic Critic",
        "role": "You are a rigorous logic critic. Analyze the response for logical consistency, "
                "valid reasoning, fallacies, unsupported leaps, and structural soundness. "
                "Be precise and cite specific sentences.",
    },
    {
        "name": "Accuracy Critic",
        "role": "You are a factual accuracy critic. Analyze the response for factual correctness, "
                "verifiable claims, potential misinformation, and missing important caveats. "
                "Flag anything that appears incorrect or unverifiable.",
    },
    {
        "name": "Clarity Critic",
        "role": "You are a clarity and communication critic. Analyze the response for clear writing, "
                "appropriate structure, jargon, ambiguity, and whether a layperson could understand it. "
                "Note anything confusing or poorly explained.",
    },
    {
        "name": "Bias Critic",
        "role": "You are a bias and fairness critic. Analyze the response for hidden assumptions, "
                "framing bias, missing perspectives, cultural or ideological slant, and unfair characterizations. "
                "Be thorough and impartial.",
    },
]


def call_council_member(member: dict, original_question: str, response_to_analyze: str) -> dict:
    """Run a single council member's critique."""
    result = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        thinking={"type": "adaptive"},
        system=member["role"],
        messages=[
            {
                "role": "user",
                "content": (
                    f"ORIGINAL QUESTION:\n{original_question}\n\n"
                    f"RESPONSE TO ANALYZE:\n{response_to_analyze}\n\n"
                    "Provide your critique. Be specific and constructive."
                ),
            }
        ],
    )

    critique = next(
        (block.text for block in result.content if block.type == "text"), ""
    )
    return {"name": member["name"], "critique": critique}


def synthesize_verdict(
    original_question: str,
    response_to_analyze: str,
    critiques: list[dict],
) -> str:
    """Synthesize all critiques into a final council verdict."""
    critique_text = "\n\n".join(
        f"### {c['name']}\n{c['critique']}" for c in critiques
    )

    stream = client.messages.stream(
        model=MODEL,
        max_tokens=2048,
        thinking={"type": "adaptive"},
        system=(
            "You are the Council Chair. You receive critiques from multiple expert critics "
            "and synthesize them into a fair, balanced final verdict. Structure your verdict as:\n"
            "1. OVERALL ASSESSMENT (1-2 sentences)\n"
            "2. KEY STRENGTHS\n"
            "3. KEY WEAKNESSES\n"
            "4. RECOMMENDED IMPROVEMENTS\n"
            "5. FINAL SCORE (1-10 with brief justification)"
        ),
        messages=[
            {
                "role": "user",
                "content": (
                    f"ORIGINAL QUESTION:\n{original_question}\n\n"
                    f"RESPONSE ANALYZED:\n{response_to_analyze}\n\n"
                    f"COUNCIL CRITIQUES:\n{critique_text}\n\n"
                    "Synthesize these critiques into a final council verdict."
                ),
            }
        ],
    )

    return stream.get_final_message().content[-1].text


def run_council(question: str, response: str) -> None:
    """Run the full LLM Council analysis."""
    print("=" * 70)
    print("LLM COUNCIL — ANALYSIS IN PROGRESS")
    print("=" * 70)
    print(f"\nQUESTION:\n{question}\n")
    print(f"RESPONSE:\n{response}\n")
    print("=" * 70)

    critiques = []
    for member in COUNCIL_MEMBERS:
        print(f"\n[{member['name']}] analyzing...")
        result = call_council_member(member, question, response)
        critiques.append(result)
        print(f"\n--- {result['name']} ---")
        print(result["critique"])

    print("\n" + "=" * 70)
    print("COUNCIL CHAIR — SYNTHESIZING VERDICT")
    print("=" * 70 + "\n")

    verdict = synthesize_verdict(question, response, critiques)
    print(verdict)
    print("\n" + "=" * 70)


if __name__ == "__main__":
    import sys

    if len(sys.argv) >= 3:
        q = sys.argv[1]
        r = sys.argv[2]
    else:
        q = input("Enter the original question: ").strip()
        print("Enter the response to analyze (end with a line containing only 'END'):")
        lines = []
        while True:
            line = input()
            if line == "END":
                break
            lines.append(line)
        r = "\n".join(lines)

    run_council(q, r)
