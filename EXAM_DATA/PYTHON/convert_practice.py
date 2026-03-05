import json

def convert_practice_json_to_ts(json_file_path, ts_file_path):
    try:
        # 1. Read the exact data from the JSON file
        with open(json_file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
            
        # 2. Convert it back to a formatted string (indent=2 for readability)
        formatted_json_string = json.dumps(data, indent=2)
        
        # 3. Wrap the JSON string in the TypeScript export syntax
        ts_content = f"export const PRACTICE_DATA = {formatted_json_string};\n"
        
        # 4. Write the final content to the TypeScript file
        with open(ts_file_path, 'w', encoding='utf-8') as ts_file:
            ts_file.write(ts_content)
            
        print(f"✅ Successfully converted '{json_file_path}' to '{ts_file_path}' without losing any data.")
        
    except FileNotFoundError:
        print(f"❌ Error: Could not find the file '{json_file_path}'. Please make sure it exists in the same directory.")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    # Define your input and output file names
    INPUT_JSON = "JSON/hall_of_fame.json"
    OUTPUT_TS = 'TS/HallOfFame.ts'
    
    convert_practice_json_to_ts(INPUT_JSON, OUTPUT_TS)