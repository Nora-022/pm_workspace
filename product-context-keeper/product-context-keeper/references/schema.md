# Product Context Schema Reference

This reference describes the JSON schema used by `product_context.json`.

## Core Fields

### `product_name` (String)
The official name of the product.
*Example:* "Trae IDE"

### `vision` (String)
A high-level statement describing the ultimate goal of the product.
*Example:* "To be the most intuitive AI-native IDE for full-stack developers."

### `current_status` (String)
The current lifecycle stage of the product.
*Values:* "Concept", "Planning", "Development", "Alpha", "Beta", "Live", "Maintenance"

## Lists & Complex Objects

### `core_features` (List of Strings or Objects)
The main capabilities of the product.
*Example:*
```json
[
  "Real-time Collaboration",
  "AI Code Generation",
  "Integrated Terminal"
]
```

### `user_personas` (List of Objects)
Profiles of the target users.
*Structure:*
```json
{
  "name": "Frontend Fiona",
  "role": "Senior Frontend Dev",
  "goals": ["Build pixel-perfect UIs fast", "Debug CSS easily"],
  "pain_points": ["Browser compatibility issues", "Slow build times"]
}
```

### `tech_stack` (Object)
The technology choices for the product.
*Structure:*
```json
{
  "frontend": "React, Tailwind",
  "backend": "Node.js, Express",
  "database": "PostgreSQL",
  "infrastructure": "AWS, Docker"
}
```

### `roadmap` (List of Objects)
Planned milestones and dates.
*Structure:*
```json
{
  "milestone": "MVP Release",
  "target_date": "2023-12-01",
  "features": ["Login", "Dashboard", "Settings"]
}
```

### `key_decisions` (List of Objects)
An architectural decision record (ADR) log.
*Structure:*
```json
{
  "date": "2023-10-15",
  "decision": "Use gRPC instead of REST for internal services",
  "rationale": "Performance benchmarking showed 10x improvement in latency.",
  "status": "Accepted"
}
```
