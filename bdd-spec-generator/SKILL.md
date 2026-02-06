---
name: bdd-spec-generator
description: Generates comprehensive BDD-style Specification Documents (Specs) from raw requirements, strictly following the structure of the Reddit AI Assistant Specs. Use this skill when you need to convert a PRD, idea, or loose requirements into a detailed, testable specification document containing Product Overview, Functional Requirements (FR), User Stories, detailed Acceptance Criteria (AC), Business Rules (including Entity Definitions), and Non-functional Requirements (NFR).
---

# BDD Specification Generator

This skill converts product requirements into a standardized, high-quality BDD Specification Document.

## 1. Analysis Phase

Before generating the document, analyze the input to identify:
1.  **Core Value Proposition**: What is the product/feature and why does it exist?
2.  **Key Entities**: What are the main nouns? (e.g., User, Order, Persona, Comment).
3.  **User Roles**: Who are the actors?
4.  **Functional Flows**: What are the steps?
5.  **Constraints**: What are the technical or business limits?

## 2. Document Structure (Mandatory)

You must output the document using the following Markdown structure. Do not deviate from the section order.

### Title: [Project/Feature Name] - Specifications Document

### 1. Product Overview (产品概述)
-   Briefly describe the product or feature.
-   Explain the background and value.

### 2. Functional Requirements (功能需求点)
-   Group by Priority: P0 (Must-have), P1 (Should-have), P2 (Nice-to-have).
-   Use ID format: **FRxx**.
-   **Format**:
    ```markdown
    #### [Category Name]
    - **FR01**: [Description]
    - **FR02**: [Description]
    ```

### 3. User Scenarios and User Stories (用户场景和用户故事)
-   Describe high-level **User Scenarios** first.
-   Then break down into **User Stories**.
-   **Format**:
    ```markdown
    ### User Scenario 1: [Name]
    **Scenario Description**: [Context]

    **User Story 1.1**:
    ```
    As a: [Role]
    I want: [Feature/Goal]
    So that: [Benefit]

    Scenario:
    - [Step 1]
    - [Step 2]
    ...
    ```
    ```

### 4. Acceptance Criteria (验收标准)
-   **CRITICAL SECTION**: This is the heart of BDD.
-   Use ID format: **ACxx**.
-   Include: Pre-conditions, Steps, Expected Results, Type, Priority.
-   **Format**:
    ```markdown
    ### ACxx: [Title] (Priority/Type/Direction)
    **Pre-conditions**:
    - [Condition 1]

    **Steps**:
    1. [Action 1]
    2. [Action 2]

    **Expected Results**:
    - [Result 1]
    - [Result 2]

    **Type**: [e.g., API Test, UI Test]
    **Priority**: [P0/P1]
    ```

### 5. Business Rules and Constraints (业务规则和约束条件)
-   **Entity Definitions**: Define the data structures and states of key entities (e.g., "Order Entity: ID, Status, Items").
-   **Logic Rules**: Define complex logic (e.g., "Matching Logic", "Pricing Algorithm").
-   **Format**:
    ```markdown
    ### 5.1 [Entity/Rule Category]
    - **Rule 1**: [Description]
    - **Rule 2**: [Description]
    ```

### 6. Non-functional Requirements (非功能性需求)
-   Performance, Security, Scalability, Usability, etc.
-   Use ID format: **NFxx**.

## 3. Writing Guidelines

-   **Language**: Use the same language as the input (or user's request). If not specified, default to the language used in the input context (e.g., Chinese for Chinese input).
-   **Granularity**: Be specific. Avoid vague terms like "fast" or "good". Use numbers where possible (e.g., "< 5 seconds").
-   **Entities**: In Section 5, explicitly define the fields and states of core entities to ensure developers and QAs share the same vocabulary.
-   **Completeness**: If requirements are missing, make reasonable assumptions based on industry standards, but mark them or mention them in a "Notes" section if necessary.

## 4. Example Output Snippet

```markdown
### AC01: Login Success (P0/API/Positive)
**Pre-conditions**:
- User is on the login page.
- User has a valid account.

**Steps**:
1. Enter valid username "testuser".
2. Enter valid password "password123".
3. Click "Login".

**Expected Results**:
- Redirect to Homepage.
- Store Auth Token in LocalStorage.
```
