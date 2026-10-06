from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json

root = Path(__file__).resolve().parents[1]
files = sorted((root / 'ui').glob('*'))
files = [file for file in files if file.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'}]
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 20)
sheet = Image.new('RGB', (1800, 4 * 350), '#102029')
draw = ImageDraw.Draw(sheet)
records = []
for index, file in enumerate(files):
    image = Image.open(file)
    records.append({'index': index, 'file': file.name, 'width': image.width, 'height': image.height, 'bytes': file.stat().st_size})
    cell_x, cell_y = (index % 3) * 600, (index // 3) * 350
    preview = ImageOps.contain(image.convert('RGB'), (580, 290))
    sheet.paste(preview, (cell_x + (600 - preview.width) // 2, cell_y + 5 + (290 - preview.height) // 2))
    draw.text((cell_x + 12, cell_y + 300), f'{index:02d} | {file.name}', font=font, fill='#f4eddf')
    draw.text((cell_x + 12, cell_y + 325), f'{image.width} x {image.height}', font=font, fill='#c8a968')
(root / 'previews').mkdir(exist_ok=True)
sheet.save(root / 'previews' / 'asset-contact-sheet.jpg', quality=94)
(root / 'previews' / 'asset-inventory.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf8')
print(json.dumps(records, ensure_ascii=False, indent=2))
