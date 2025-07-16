import csv
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from supplements.models import Supplement

class Command(BaseCommand):
    help = 'Import supplements from CSV, populating metadata with dietary flags and extra fields'

    # dietary keywords normalized to space‑separated form
    POSSIBLE_FLAGS = ['vegetarian', 'non vegetarian', 'vegan', 'gluten free', 'dairy free']

    def handle(self, *args, **kwargs):
        filepath = os.path.join(settings.BASE_DIR, 'data', 'supplements.csv')

        # clear existing records to avoid duplicates
        Supplement.objects.all().delete()

        with open(filepath, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            supplements = []

            for row in reader:
                # combine highlights + title, normalize to lowercase and replace hyphens
                raw_text  = f"{row.get('highlights','')} {row.get('title','')}"
                text_norm = raw_text.lower().replace('-', ' ')

                # detect dietary flags anywhere in that text
                suitable_list = [
                    flag for flag in self.POSSIBLE_FLAGS
                    if flag in text_norm
                ]

                # build metadata dict with extra fields
                metadata = {
                    "quantity":       row.get("quantity"),
                    "product_id":     row.get("product_id"),
                    "listing_id":     row.get("listing_id"),
                    "availability":   row.get("availability"),
                    "currency":       row.get("currency"),
                    "1_star_count":   int(row.get("1_stars_count", 0)),
                    "2_star_count":   int(row.get("2_stars_count", 0)),
                    "3_star_count":   int(row.get("3_stars_count", 0)),
                    "4_star_count":   int(row.get("4_stars_count", 0)),
                    "5_star_count":   int(row.get("5_stars_count", 0)),
                    "suitable_for":   suitable_list,
                }

                try:
                    supplement = Supplement(
                        title        = row.get("title",""),
                        brand        = row.get("brand",""),
                        category     = row.get("category",""),
                        price        = float(row.get("selling_price") or 0),
                        avg_rating   = float(row.get("avg_rating") or 0),
                        rating_count = int(row.get("rating_count") or 0),
                        review_count = int(row.get("review_count") or 0),
                        product_url  = row.get("url",""),
                        highlights   = row.get("highlights",""),
                        metadata     = metadata,
                    )
                    supplements.append(supplement)
                except Exception as e:
                    self.stderr.write(f"Skipping row due to error: {e}")

            Supplement.objects.bulk_create(supplements)
            self.stdout.write(self.style.SUCCESS(f"✅ Imported {len(supplements)} supplements"))
