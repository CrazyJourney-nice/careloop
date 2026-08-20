from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path("/Users/cj/careloop/tmp/careloop_skywork")


def make_sheets(source_dir: Path, pattern: str, output_prefix: str, per_sheet: int) -> None:
    images = sorted(source_dir.glob(pattern))
    out_dir = ROOT / "contact_sheets"
    out_dir.mkdir(parents=True, exist_ok=True)
    for chunk_index in range(0, len(images), per_sheet):
        chunk = images[chunk_index : chunk_index + per_sheet]
        thumbs: list[tuple[Path, Image.Image]] = []
        for path in chunk:
            image = Image.open(path).convert("RGB")
            image.thumbnail((1100, 680), Image.Resampling.LANCZOS)
            thumbs.append((path, image.copy()))
        cell_w = max(image.width for _, image in thumbs) + 40
        cell_h = max(image.height for _, image in thumbs) + 70
        cols = 2
        rows = (len(thumbs) + cols - 1) // cols
        sheet = Image.new("RGB", (cell_w * cols, cell_h * rows), "#ECEFF1")
        draw = ImageDraw.Draw(sheet)
        for index, (path, image) in enumerate(thumbs):
            x = (index % cols) * cell_w + 20
            y = (index // cols) * cell_h + 40
            draw.text((x, 10 + (index // cols) * cell_h), path.stem, fill="#111111")
            sheet.paste(image, (x, y))
        target = out_dir / f"{output_prefix}_{chunk_index // per_sheet + 1:02d}.jpg"
        sheet.save(target, quality=90)


make_sheets(ROOT / "teavita_png", "*.jpg", "teavita", 4)
make_sheets(ROOT / "careloop_png", "*.jpg", "former_careloop", 4)
make_sheets(ROOT / "docx_render", "page-*.png", "optimization_guide", 4)
