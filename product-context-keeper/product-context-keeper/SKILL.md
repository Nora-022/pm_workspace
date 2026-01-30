---
name: product-context-keeper
description: Maintain a comprehensive, evolving product context (PRD, Decisions, Roadmap) to ensure consistency across iterations. Use when: (1) Starting a new project/feature to initialize context, (2) Updating product status or requirements, (3) Need to recall past architectural decisions or user personas, (4) Onboarding new agents/users to the product vision.
---

# Product Context Keeper

This skill acts as the "Long-Term Memory" for your product. It maintains a structured JSON-based context file that records the product's vision, features, decisions, and roadmap.

## When to Use

- **Initialization**: "Let's start a new project called X." -> Initialize the context.
- **Iteration**: "We decided to switch from SQL to NoSQL." -> Update the `tech_stack` and `key_decisions`.
- **Query**: "What were the user personas we defined?" -> Read the context.
- **Onboarding**: When a new session starts, read the context to ground the agent.

## Core Workflow

### 1. Initialize Context
When starting a fresh product or project.

```bash
python scripts/context_manager.py init --name "MyProduct" --vision "To revolutionize X by doing Y."
```

### 2. View Context
To get the full picture of the current product state.

```bash
python scripts/context_manager.py view
```

### 3. Update Context
When requirements change, decisions are made, or features are added.

**Update a simple field:**
```bash
python scripts/context_manager.py update --field "current_status" --value "Development"
```

**Add a feature (Append to list):**
```bash
python scripts/context_manager.py update --field "core_features" --value "Dark Mode" --append
```

**Record a Key Decision (Complex Object):**
You can pass a JSON string for complex objects.
```bash
python scripts/context_manager.py update --field "key_decisions" --value '{"date": "2023-10-27", "decision": "Use Postgres", "rationale": "Better JSONB support"}' --append
```

## Data Schema

The context is stored in `product_context.json`. The standard schema includes:

- **product_name**: String
- **vision**: String
- **core_features**: List of Strings/Objects
- **user_personas**: List of Objects (Name, Pain Points, Goals)
- **tech_stack**: Object (Frontend, Backend, Database, Infra)
- **current_status**: String (Planning, Dev, Testing, Live)
- **roadmap**: List of Milestones
- **key_decisions**: List of Decisions (Date, What, Why)

See [references/schema.md](references/schema.md) for detailed field descriptions and examples.

## Best Practices

- **Log Decision Rationales**: Don't just record *what* changed, record *why*. Use the `key_decisions` field.
- **Keep it Sync**: Whenever you generate a PRD or code that contradicts the context, update the context immediately.
- **Review Periodically**: Use `view` to check if the context is stale.
