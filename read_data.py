import pandas as pd
import json

# Read the Excel file
file_path = "docs/hò hẹn hẹn hò ở SG.xlsx"
df = pd.read_excel(file_path)

# Print basic information
print("Data shape:", df.shape)
print("\nColumns:", list(df.columns))
print("\nFirst 5 rows:")
print(df.head(5).to_string())

# Export a sample to JSON for easy viewing
sample = df.head(10).to_dict(orient='records')
with open('sample_data.json', 'w', encoding='utf-8') as f:
    json.dump(sample, f, ensure_ascii=False, indent=2)

print("\nSample data exported to sample_data.json") 
