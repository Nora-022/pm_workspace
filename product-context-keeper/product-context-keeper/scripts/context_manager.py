import os
import json
import datetime

# Configuration
CONTEXT_FILE = "product_context.json"
HISTORY_FILE = "context_history.json"

def load_context():
    """Loads the current product context."""
    if os.path.exists(CONTEXT_FILE):
        with open(CONTEXT_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {
        "product_name": "Unknown Product",
        "vision": "",
        "core_features": [],
        "user_personas": [],
        "tech_stack": {},
        "current_status": "Planning",
        "roadmap": [],
        "key_decisions": []
    }

def save_context(context):
    """Saves the product context."""
    with open(CONTEXT_FILE, 'w', encoding='utf-8') as f:
        json.dump(context, f, indent=4, ensure_ascii=False)
    print(f"✅ Product context updated in {CONTEXT_FILE}")

def log_change(change_description, author="User"):
    """Logs a change to the history file."""
    entry = {
        "timestamp": datetime.datetime.now().isoformat(),
        "author": author,
        "description": change_description
    }
    
    history = []
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
            history = json.load(f)
            
    history.append(entry)
    
    with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=4, ensure_ascii=False)
    print(f"📝 Change logged in {HISTORY_FILE}")

def update_field(field, value, append=False):
    """Updates a specific field in the context."""
    context = load_context()
    
    if field not in context:
        print(f"⚠️ Warning: Field '{field}' not found in schema. Adding it.")
        
    if append and isinstance(context.get(field), list):
        if isinstance(value, list):
            context[field].extend(value)
        else:
            context[field].append(value)
        print(f"➕ Appended to {field}")
    else:
        context[field] = value
        print(f"🔄 Updated {field}")
        
    save_context(context)
    log_change(f"Updated field '{field}'")

def init_context(name, vision):
    """Initializes a new product context."""
    context = load_context()
    context["product_name"] = name
    context["vision"] = vision
    save_context(context)
    log_change(f"Initialized product context for '{name}'")

def print_context():
    """Prints the current context in a readable format."""
    context = load_context()
    print(json.dumps(context, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Manage product context.")
    subparsers = parser.add_subparsers(dest="command")
    
    # Init command
    init_parser = subparsers.add_parser("init", help="Initialize product context")
    init_parser.add_argument("--name", required=True, help="Product Name")
    init_parser.add_argument("--vision", required=True, help="Product Vision")
    
    # Update command
    update_parser = subparsers.add_parser("update", help="Update a field")
    update_parser.add_argument("--field", required=True, help="Field to update")
    update_parser.add_argument("--value", required=True, help="New value (JSON string for complex objects)")
    update_parser.add_argument("--append", action="store_true", help="Append to list instead of overwrite")
    
    # View command
    view_parser = subparsers.add_parser("view", help="View current context")
    
    args = parser.parse_args()
    
    if args.command == "init":
        init_context(args.name, args.vision)
    elif args.command == "update":
        try:
            # Try to parse value as JSON, otherwise treat as string
            try:
                val = json.loads(args.value)
            except json.JSONDecodeError:
                val = args.value
            update_field(args.field, val, args.append)
        except Exception as e:
            print(f"❌ Error: {str(e)}")
    elif args.command == "view":
        print_context()
    else:
        parser.print_help()
