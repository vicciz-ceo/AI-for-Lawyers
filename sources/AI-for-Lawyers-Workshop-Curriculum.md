# AI for Lawyers — Workshop Curriculum & Landing-Page Content Map

*A complete menu of things you can teach lawyers about AI tools (Claude Code, Cowork, Codex, Antigravity, Copilot, and the legal-specific stack), organized so each module maps to a card or section on your landing page.*

---

## How to use this document

- **Section 1** frames *who* you're teaching and *what jobs* they're hiring AI to do. Use it to decide emphasis.
- **Section 2** is the full curriculum, grouped into 10 tracks (A–J). Each module has a one-line benefit blurb (landing-page copy) plus the specific skills taught (workshop content).
- **Section 3** suggests delivery formats.
- **Section 4** is a short pre-workshop research kit so you can tailor content to a given firm or cohort.
- **Section 5** maps everything to a landing-page layout.

You almost certainly won't teach all of this in one workshop — treat it as the master list you cut down from, per audience.

---

## Section 1 — Who it's for, and the jobs they're hiring AI to do

**Audience segments** (each wants a different slice):

- **Solo & small-firm lawyers** — want leverage: do the work of a bigger team, cheaply, without an IT department.
- **In-house counsel** — high contract volume, need speed and consistency, care about data governance and cost.
- **Litigators** — drafting, research, discovery, deposition prep; extremely sensitive to hallucination/citation risk.
- **Transactional lawyers** — live in contracts: drafting, redlining, playbooks, due diligence.
- **Legal ops / knowledge managers** — want to standardize, automate, and govern AI use across the firm.

**Core "jobs to be done"** (the spine the modules hang off):

1. *Draft this faster* (contracts, memos, letters, emails).
2. *Review this and tell me what's wrong or risky.*
3. *Explain / summarize this dense thing* to me or my client.
4. *Find me the law* — and let me verify it before I rely on it.
5. *Do this repetitive thing automatically* so I stop doing it by hand.
6. *Build me a small tool* my team or clients can use.
7. *Keep me out of trouble* — confidential, ethical, defensible.

Every module below answers one of these. Lead your landing page with the jobs, not the tools — lawyers buy outcomes.

---

## Section 2 — The curriculum

### Track A — Foundations & orientation

**A1. The AI tool landscape for lawyers**
*Blurb: Know what each tool is for so you stop using a chatbot for a job that needs an agent — and vice versa.*
- Chatbots (Claude, ChatGPT, Gemini, Microsoft Copilot) vs. agentic tools that *act*, not just answer.
- The agentic/coding tools: **Claude Code**, **Claude Cowork**, **OpenAI Codex**, **Google Antigravity** — what each does and who they're really built for.
- The legal-specific stack: enterprise platforms (Harvey, Legora, LegalOn), Word-native contract tools (Spellbook), research engines tied to real databases (Thomson Reuters CoCounsel/Westlaw, Lexis+ AI, Vincent/vLex), review & diligence (Kira, Luminance, Everlaw, Relativity), CLM (Ironclad, Conga), small-firm suites (Clio Duo). Note: Anthropic launched *Claude for the Legal Industry* in May 2026.
- **Choosing the right tool for the task** — a decision framework (general reasoning vs. citeable research vs. contract intelligence vs. autonomous multi-step work).

**A2. How these tools actually work (and why they lie sometimes)**
*Blurb: Ten minutes of "how the engine works" prevents most of the career-ending mistakes.*
- LLMs predict plausible text; they don't "look things up" unless connected to a source.
- Why hallucination happens, and why confident tone ≠ accuracy.
- Non-determinism: the same prompt can give different answers; there's no fixed internal memory between messages.
- Context windows in plain English — what the model can "see" at once.

**A3. First-hour setup and security posture**
*Blurb: Get set up correctly once, on the right tier, with the right data settings.*
- Accounts, workspaces, and the difference between **consumer vs. enterprise/business tiers** (this matters enormously for confidentiality).
- Data-retention and training settings; zero-data-retention options; where your data physically goes.
- Basic account security (auth, access, who on the team can see what).

---

### Track B — Everyday legal work *inside the app*

**B1. Drafting from a brief**
*Blurb: Turn a two-line instruction into a solid first draft.*
- Memos, client letters, demand letters, engagement letters, cover emails.
- Giving the model the right context (facts, tone, jurisdiction, audience) to get a usable draft.

**B2. Contract drafting from a term sheet or precedent**
*Blurb: First-draft agreements in minutes, not hours.*
- Drafting a full agreement from a term sheet, deal points, or an existing precedent.
- Generating specific clauses on demand (indemnity, limitation of liability, termination, IP assignment).
- Building alternative versions ("pro-buyer" vs. "pro-seller") of the same clause.

**B3. Contract review & redlining against a playbook**
*Blurb: A tireless first-pass reviewer that flags what deviates from your standards.*
- Reviewing an agreement against a firm playbook; flagging non-standard terms and market deviations.
- Spotting **missing** protective clauses and carve-outs (the thing humans skim past).
- **NDA triage** — classify an incoming NDA as standard / needs-review / escalate.
- Comparing two versions of a document and explaining what changed and why it matters.

**B4. Summarizing & de-jargoning**
*Blurb: Make any dense document readable — for you, a partner, or a client.*
- Summarizing contracts, depositions, case files, regulations, and long email chains.
- Plain-language rewrites for clients; issue lists; "explain this clause like I'm the CFO."
- Extracting key dates, obligations, and parties into a clean list.

**B5. Legal research assistance — done safely**
*Blurb: Use AI to get oriented fast, then verify before you rely on a word of it.*
- First-pass orientation in an unfamiliar area of law (a starting point, never the finish line).
- Why general chatbots must **never** be trusted for citations; why even legal-specific tools still require verification.
- Tools that tie answers to retrievable sources (CoCounsel/Westlaw, Lexis+ AI) vs. general models.
- **The citation-verification protocol** (taught as a hard rule — see Track I).

**B6. Translation & multilingual work**
*Blurb: Work fluidly across languages, including right-to-left documents.*
- Translating documents and correspondence while preserving legal meaning.
- Handling Hebrew / Arabic and other RTL text and document structure correctly.
- Bilingual drafting and side-by-side review.

**B7. Discovery & due diligence at scale**
*Blurb: Read the whole data room, not just the documents you had time for.*
- Bulk document review, clause extraction, and issue-spotting across large sets.
- Building chronologies and timelines from raw documents.
- Batch summarization and tagging for e-discovery.

**B8. Litigation & advocacy prep**
*Blurb: A sparring partner for arguments and questions.*
- Generating deposition and cross-examination questions from the record.
- Stress-testing your own arguments; anticipating the other side's.
- Drafting outlines for motions and briefs (with verification of every authority).

---

### Track C — Documents & automation

**C1. Templates & clause libraries**
*Blurb: Build reusable assets once; stop reinventing standard language.*
- Creating template documents and standardized clause banks.
- Maintaining consistent house language across a team.

**C2. Document automation & bulk generation**
*Blurb: Mail-merge on steroids — intake data in, finished documents out.*
- Generating many documents from a data source (spreadsheet, form responses, intake).
- Intake-to-document pipelines (client fills a form → draft is produced).

**C3. Data extraction from documents**
*Blurb: Pull exactly the fields, clauses, or sections you need out of a stack of files.*
- Extracting specific clauses, annexes, dates, amounts, or parties from PDFs and Word files.
- Structuring unstructured documents into tables you can actually work with.

**C4. Form filling & format conversion**
*Blurb: Stop hand-copying between formats.*
- Filling structured forms; converting between PDF, Word, and structured data.
- Reformatting and cleaning documents at scale.

---

### Track D — Working inside Microsoft 365 & other apps *(integrations)*

**D1. Copilot in Word**
*Blurb: The AI is already in the tool your firm uses all day.*
- Drafting, rewriting, summarizing, and generating tables directly in Word.
- **Microsoft's Legal Agent in Word** (launched April 30, 2026): playbook-driven clause review, redlines delivered as native tracked changes with citations and explanatory comments, and version comparison — at roughly the price of an existing Copilot license.

**D2. Copilot across the rest of 365**
*Blurb: One assistant across email, spreadsheets, slides, and meetings.*
- **Outlook**: triage the inbox, draft replies, find time across calendars.
- **Excel**: analyze billing, matter, or financial data; build tables and formulas.
- **PowerPoint**: turn an outline into a client or pitch deck.
- **Teams**: meeting summaries and action items.

**D3. Other assistants inside your documents**
*Blurb: Claude and others also plug into Word, Excel, PowerPoint, and Outlook.*
- Using Claude in Word/Excel/PowerPoint/Outlook as an alternative or complement to Copilot.
- When to prefer which assistant for a given task.

**D4. Layering legal-specific intelligence into 365**
*Blurb: Add specialist legal AI on top of the general productivity layer.*
- Harvey available as an agent inside Microsoft 365 Copilot and Cowork (precedent-aware review, Vault retrieval, agentic Word redlines).
- Spellbook as a contract-specific co-pilot living inside Word.
- The two-layer mental model: general productivity AI (Copilot) + specialist legal AI (Harvey/Spellbook/etc.).

**D5. Google Workspace & document management systems**
*Blurb: Same capabilities if you live in Google, not Microsoft.*
- AI in Google Docs, Sheets, Drive; connecting to your DMS.

**D6. Connecting tools to your systems via MCP / connectors**
*Blurb: Let the AI reach your email, calendar, files, and matter data — carefully.*
- What connectors / MCP are: giving a tool controlled access to your other systems.
- Practical connections: document management, CRM, email, calendar, drive.
- **The safety line** (taught alongside): connected tools can read untrusted content — never let them send, delete, pay, or change permissions without human sign-off (see Track I).

---

### Track E — Building apps & tools for lawyers to self-use

**E1. Instant internal tools (no engineer needed)**
*Blurb: Describe a tool in a sentence; get a working one back.*
- Calculators: limitation-period / statute-of-limitations, damages, settlement, fee estimators.
- Interactive checklists, intake forms, and matter trackers.
- Small single-purpose utilities the model builds on request.

**E2. Client-facing self-service tools**
*Blurb: Give clients a guided experience instead of a blank email.*
- Intake bots, guided questionnaires, FAQ assistants, document assemblers.
- **UPL and disclaimer guardrails** — what these tools must *not* do (give legal advice, replace a lawyer) and how to bound them.

**E3. Small internal apps without writing code**
*Blurb: Dashboards and trackers your team actually uses.*
- Lightweight dashboards, status boards, and knowledge tools.
- When a quick in-chat "artifact" is enough vs. a standalone app.

**E4. AI-powered apps (apps that call a model under the hood)**
*Blurb: When your tool itself needs to think, not just calculate.*
- Building tools that call an LLM to draft, classify, or answer inside the app.
- When this is worth it — and when a template or checklist is simpler and safer.

**E5. Governance for lawyer-built tools**
*Blurb: Ship internal tools without creating a confidentiality or quality problem.*
- Who reviews a tool before it's used; confidentiality of inputs; versioning and ownership.

---

### Track F — Personalization: skills, playbooks & memory *(creating and editing skills)*

**F1. What "skills" are and why they're the highest-leverage feature**
*Blurb: Teach the AI your way of working once; reuse it forever.*
- Skills = reusable, packaged instructions (a playbook, a house style, a jurisdiction's rules) the AI loads automatically.
- Why a good skill beats re-explaining yourself in every chat.

**F2. Creating a personalized skill**
*Blurb: Encode your firm's standards into the tool.*
- Building a firm style-guide skill, a jurisdiction-specific drafting skill, an RTL/Hebrew document skill, a clause-preference skill.
- Structuring a skill so it triggers reliably on the right kind of request.

**F3. Editing, versioning & sharing skills across a team**
*Blurb: Keep skills current and consistent firm-wide.*
- Updating and refining skills; version control; sharing so the whole team drafts the same way.

**F4. Training tools on your own precedents vs. building a skill**
*Blurb: Two ways to make the AI "sound like your firm" — know the trade-offs.*
- Precedent-trained tools (e.g., Spellbook Library, Harvey Vault) that learn from your prior work product.
- Skills/instructions you author yourself.
- When to use each; confidentiality and data-handling implications of uploading precedents.

**F5. The no-code personalization path**
*Blurb: Custom assistants without the technical setup.*
- Custom GPTs / Projects / Agent Builders as an accessible way to package firm-specific behavior in plain language.

---

### Track G — Advanced agentic workflows *(spawning agents, managing & automating processes)*

**G1. From chatbot to agent — what actually changes**
*Blurb: Understand autonomy before you hand over the keys.*
- The shift from "answer my question" to "go do this multi-step task."
- Autonomy levels: fully autonomous vs. checkpoint-based ("review-driven") vs. approve-every-step — and matching the level to the risk of the task.

**G2. Spawning agents and sub-agents; orchestrator patterns**
*Blurb: One "manager" agent that dispatches specialist agents to do the work.*
- Orchestrator / sub-agent setups: a main agent that delegates to cheaper, task-scoped agents and coordinates results.
- Where this lives in practice: **Claude Code** (agent teams, orchestrator/sub-agent workflows) and **Antigravity** (its Manager surface and Agent Teams, running agents in parallel across workspaces).
- Important framing for the workshop: these orchestration features belong to the *coding-agent* tools (Claude Code, Antigravity, Codex), not the everyday chat apps — teach them in the right environment.

**G3. Running work in parallel & managing multiple processes**
*Blurb: Five things underway at once instead of one at a time.*
- Manager/dashboard surfaces that let you launch, monitor, pause, redirect, or kill multiple agents.
- Assigning a "junior" agent to tedious background work while you supervise the hard part.

**G4. Automating multi-step processes / pipelines**
*Blurb: Turn a recurring sequence into a repeatable, hands-off flow.*
- Building pipelines: intake → draft → review-against-playbook → package as a finished file.
- Chaining tools and steps so the whole sequence runs as one.

**G5. Scheduling & recurring tasks**
*Blurb: Wake up to the work already done.*
- Scheduled/recurring runs: daily docket or deadline briefings, inbox summaries, new-filing monitors.

**G6. Verifying agent work (non-negotiable for legal)**
*Blurb: Trust, but check the receipts.*
- Using the artifacts agents produce — task lists, implementation/plan documents, walkthroughs, screenshots, browser recordings — as an audit trail.
- Reviewing what an agent *did* before accepting it.

**G7. When NOT to use an agent**
*Blurb: Some judgment calls stay human, full stop.*
- High-stakes legal judgment, final sign-off, and anything privileged or irreversible.

---

### Track H — Cost & token management *(managing allocations, saving tokens)*

**H1. Tokens & context windows, explained for non-engineers**
*Blurb: Understand what you're paying for and why long documents cost more.*
- What a token is; why a 200-page contract costs more to process than a paragraph.
- Context-window limits and what happens when you exceed them.

**H2. Managing budgets and model tiers across a firm**
*Blurb: Right-size the model to the task and control spend.*
- Seat/usage budgets and allocation across a team.
- Model tiers: a cheaper, fast model for routine drafting and triage; a stronger model reserved for hard reasoning — and how to decide.

**H3. Saving tokens**
*Blurb: Do more within the same budget.*
- Concise, well-scoped prompting instead of dumping everything.
- Context hygiene: clearing/compacting a session, starting fresh when a thread gets bloated.
- Reusing skills instead of re-pasting instructions every time.
- Retrieval over brute force: point the tool at the relevant part of a document rather than the whole thing.

**H4. Cost governance & billing implications**
*Blurb: Keep AI spend defensible and, where relevant, allocable.*
- Tracking cost per matter; the ethics of billing AI-assisted time (cross-reference Track I).

---

### Track I — Safety, ethics & compliance *(the non-negotiables)*

*This is the track that protects their license. Consider making it mandatory and front-loading it.*

**I1. Confidentiality & privilege (Model Rule 1.6)**
*Blurb: The single most important habit: know what you can and can't put into a tool.*
- What never to paste into a consumer-tier tool; enterprise tiers, zero-data-retention, and tenant boundaries.
- Where client data goes and whether it's used for training.
- Informed-consent considerations before sharing client information with AI.

**I2. Competence & the duty to understand your tools (Rule 1.1)**
*Blurb: "The tool made the mistake" is not a defense.*
- ABA Formal Opinion 512 (2024): existing duties already apply to AI use.
- You must understand a tool's limits well enough to supervise it.

**I3. Candor & verification (Rule 3.3) — the hallucination crisis**
*Blurb: Every citation gets checked against a real source. No exceptions.*
- The cautionary landscape: *Mata v. Avianca* (2023) as the first big sanction; the Damien Charlotin AI Hallucination Cases Database now tracking well over a thousand incidents worldwide; sanctions like *Lacey v. State Farm* (~$31k against two firms), *Wadsworth v. Walmart*, and the Sixth Circuit's *Whiting v. City of Athens* ($15k/attorney); and even large firms (a widely reported Sullivan & Cromwell filing in April 2026) getting caught.
- Marketing claims about "anti-hallucination" protection are not a defense (*Gamez*).
- Mandatory **AI-disclosure certificates** in a growing number of jurisdictions; Florida's AI rules effective June 15, 2026.
- **Teach a concrete three-step verification protocol**: (1) treat every AI citation as unverified; (2) pull and read the actual source; (3) confirm it says what the draft claims — before anything is filed or sent.

**I4. Supervision of AI and staff (Rules 5.1 / 5.3)**
*Blurb: You supervise the AI the way you'd supervise a junior — and your staff who use it.*
- Firm AI policy; who's responsible for checking AI-assisted output; tiering tools by confidentiality risk.

**I5. Client communication & billing ethics (Rules 1.4 / 1.5)**
*Blurb: Be straight with clients and with the bill.*
- When and how to disclose AI use to clients.
- Ethical billing for time saved by AI.

**I6. Security hygiene & the agentic-AI attack surface**
*Blurb: Agents that can act need hard limits.*
- Credentials, permissions, and least-privilege access.
- **Prompt injection**: connected/browsing agents can be manipulated by malicious content in a document, email, or web page — so instructions found *in content* are never trusted as commands.
- Hard rules for agents: never send, publish, delete, pay, or change access/permissions without explicit human approval.

**I7. Bias, fairness & over-reliance**
*Blurb: Keep human judgment in the loop.*
- Where models reflect bias; the risk of deskilling and rubber-stamping.
- Human review as the backstop, always.

**I8. Vendor due diligence**
*Blurb: Buy tools you can defend.*
- What to check: SOC 2 posture, whether the vendor trains on your data, data-retention terms, security documentation.
- Running your own head-to-head test on representative documents before committing.

---

### Track J — Prompting & getting good output *(cross-cutting)*

**J1. Prompt patterns for legal tasks**
*Blurb: The difference between a mediocre answer and a great one is usually the prompt.*
- Give it a role, the context, examples, constraints, and the exact output format you want.
- Ask for step-by-step reasoning on hard problems; ask for structured output when you need to reuse it.

**J2. Feeding context well**
*Blurb: Garbage in, garbage out — good context in, usable draft out.*
- Supplying documents, playbooks, and precedents effectively.

**J3. Iterating & refining**
*Blurb: Treat it as a conversation, not a slot machine.*
- Correcting, narrowing, and steering toward the answer you actually want.

**J4. Building a personal or firm prompt library**
*Blurb: Save what works so nobody starts from scratch.*
- Curating and sharing tested prompts across the team.

---

## Section 3 — Suggested workshop formats

- **90-minute "safe first steps" intro** — Tracks A + I (safety-first), plus a couple of B modules as a taste. Good for a skeptical or risk-averse audience (e.g., a bar association CLE).
- **Half-day practical** — A, B, D, and I, with hands-on labs. The sweet spot for most firms.
- **Full-day deep dive** — add C, E, F, and H.
- **Multi-week cohort** — the whole thing, including G (agentic workflows) and skill-building projects; each week builds toward participants shipping their own skill or tool.
- **By segment** — a transactional cohort weights B2/B3/C/F; a litigation cohort weights B5/B8/I3; an in-house cohort weights D/H/I.

Every format should include **hands-on labs** (lawyers using the tool on a realistic document), not just slides — that's where the "aha" happens.

---

## Section 4 — Pre-workshop research kit

*You invoked the user-research angle — here's the practical version. Run a short survey or a few interviews before finalizing the agenda, so the workshop (and the landing page) emphasizes what this specific audience actually needs. This also gives you quotes and data for the page.*

**5-question interview guide** (15 min each, 5–8 people):
1. Walk me through the last time a routine task took longer than it should have. What was it?
2. What have you already tried with AI — and what made you stop or keep going?
3. What's your single biggest worry about using these tools in your practice?
4. If you had a capable assistant for one recurring task, which task would you hand over first?
5. What would make you trust an AI-produced draft enough to actually use it?

**Pre-workshop survey** (multiple choice, for quantifying):
- Role / practice area (solo, in-house, litigation, transactional, ops).
- Current AI use (none / occasional chatbot / legal-specific tool / daily).
- Tools already in the building (Microsoft 365, Google Workspace, any legal AI vendor).
- Biggest goal (draft faster / review better / research / automate / build tools / just use it safely).
- Biggest fear (confidentiality / hallucinations / cost / looking incompetent / getting sanctioned).

**Synthesis:** cluster the answers into themes, then rank modules by *frequency × stakes*. High-frequency, high-stakes needs become your headline modules and your landing-page hero.

---

## Section 5 — Landing-page content map

How the above translates to a page:

- **Hero**: lead with a job-to-be-done outcome ("Draft, review, and research faster — without risking your license"), not a tool list.
- **"Who this is for"**: the audience segments from Section 1 as three or four quick cards.
- **"What you'll be able to do"**: the module blurbs as scannable cards, grouped by the tracks (Everyday work / Automation / Integrations / Build your own tools / Advanced / Safety). Use the one-line blurbs verbatim — they're written for this.
- **"Taught safely"**: pull Track I forward as a trust section — the hallucination-sanctions reality plus your verification protocol. For lawyers, the safety promise is a *selling point*, not fine print.
- **Formats & pricing**: the options from Section 3.
- **Proof / tailoring**: "We survey your team first and build the agenda around your actual work" (Section 4) — a strong differentiator.
- **CTA**: book a cohort / request the syllabus.

---

*Scope note: this assumes a mixed audience of solo/small-firm, in-house, litigation, and transactional lawyers. If your audience is narrower — or in a specific jurisdiction (e.g., an Israeli-law or bilingual Hebrew/English cohort) — the emphasis and the safety/ethics references should be re-cut accordingly.*
