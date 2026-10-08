"""Inventory supplied images and prepare display copies without cropping or recoloring."""

from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import hashlib
import json
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

ASSET_FILES = {
    'logo': 'logo.jpeg',
    'qaytbay': 'qaytbay-sabil.jpg',
    'home': 'الرئيسية.png',
    'exploration': 'السير في المحاكاة.png',
    'landmark': 'شرح سبيل قايتباي.png',
    'dome': 'قبة الصخرة.jpeg',
    'tours': 'الجولات التعليمية.jpg',
    'guidedTours': 'جولات ارشادية.jpeg',
    'library': 'المكتبة المعرفية_ معالم الأقصى.png',
    'quiz': 'اختبر معلوماتك.png',
    'questions': 'اسئلة.jpeg',
    'map': 'الخريطة التفاعلية.jpg',
    'profile': 'صفحة الزائر.jpeg',
    'profileDetail': 'صفحة الزائر 2.jpeg',
    'competition': 'مسابقة جماعية.jpg',
    'progress': 'تقدم الرحلة.png',
    'mission': 'المهمة الحالية.jpg',
}

root = Path(__file__).resolve().parents[1]
source_directory = root / 'ui'
served_directory = root / 'public' / 'assets' / 'ui'
served_directory.mkdir(parents=True, exist_ok=True)
assert served_directory.resolve().is_relative_to(root.resolve())
files = sorted(file for file in source_directory.iterdir()
               if file.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'})
assert {file.name for file in files} == set(ASSET_FILES.values()), 'Asset mapping must include every supplied image'
key_by_file = {file: key for key, file in ASSET_FILES.items()}
font = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 20)
sheet = Image.new('RGB', (1800, ((len(files) + 2) // 3) * 350), '#102029')
draw = ImageDraw.Draw(sheet)
records = []

for index, file in enumerate(files):
    key = key_by_file[file.name]
    with Image.open(file) as source:
        source.load()
        keep_original = key == 'logo' or (
            file.suffix.lower() in {'.jpg', '.jpeg'}
            and source.width <= 1920 and source.height <= 1920
            and file.stat().st_size < 600_000)
        served_file = file.name if keep_original else f'{key}.webp'
        served_path = served_directory / served_file
        if keep_original:
            # Retain the authentic logo and efficient small JPEGs byte-for-byte.
            shutil.copyfile(file, served_path)
        else:
            display = source.copy()
            # Portrait photography never needs more than 1920 vertical pixels.
            display.thumbnail((1920, 1920), Image.Resampling.LANCZOS)
            if display.mode not in {'RGB', 'RGBA'}:
                display = display.convert('RGBA' if 'transparency' in source.info else 'RGB')
            options = {'quality': 94, 'method': 6}
            if source.info.get('icc_profile'):
                options['icc_profile'] = source.info['icc_profile']
            display.save(served_path, format='WEBP', **options)
        with Image.open(served_path) as served:
            records.append({
                'index': index, 'key': key, 'file': file.name,
                'width': source.width, 'height': source.height,
                'bytes': file.stat().st_size,
                'sha256': hashlib.sha256(file.read_bytes()).hexdigest(),
                'servedFile': served_file,
                'servedWidth': served.width, 'servedHeight': served.height,
                'servedBytes': served_path.stat().st_size,
                'servedSha256': hashlib.sha256(served_path.read_bytes()).hexdigest(),
            })
        cell_x, cell_y = (index % 3) * 600, (index // 3) * 350
        preview = ImageOps.contain(source.convert('RGB'), (580, 290))
        sheet.paste(preview, (cell_x + (600 - preview.width) // 2,
                             cell_y + 5 + (290 - preview.height) // 2))
        draw.text((cell_x + 12, cell_y + 300), f'{index:02d} | {key}: {file.name}', font=font, fill='#f4eddf')
        draw.text((cell_x + 12, cell_y + 325), f'{source.width} x {source.height}', font=font, fill='#c8a968')

# Remove superseded generated display images only after every replacement is ready.
expected_served_files = {record['servedFile'] for record in records}
for previous in served_directory.iterdir():
    if (previous.is_file() and previous.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'}
            and previous.name not in expected_served_files):
        previous.unlink()

(root / 'previews').mkdir(exist_ok=True)
sheet.save(root / 'previews' / 'asset-contact-sheet.jpg', quality=94)
(root / 'previews' / 'asset-inventory.json').write_text(
    json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps(records, ensure_ascii=False, indent=2))
