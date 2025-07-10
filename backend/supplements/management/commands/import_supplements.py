import csv
import os
from django.core.management.base import BaseCommand
from supplements.models import Supplement
from django.conf import settings

class Command(BaseCommand):
    help = 'Import supplements from CSV'

    def handle(self, *args, **kwargs):
        filepath = os.path.join(settings.BASE_DIR, 'data', 'supplements.csv')

        with open(filepath, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            supplements = []

            for row in reader:
                try:
                    supplement = Supplement(
                        title=row['title'],
                        brand=row['brand'],
                        category=row['category'],
                        price=float(row['selling_price'] or 0),
                        avg_rating=float(row['avg_rating'] or 0),
                        rating_count=int(row['rating_count'] or 0),
                        review_count=int(row['review_count'] or 0),
                        product_url=row['url'],
                        highlights=row['highlights'],
                    )
                    supplements.append(supplement)

                except Exception as e:
                    self.stderr.write(f"Skipping row due to error: {e}")

            Supplement.objects.bulk_create(supplements)
            self.stdout.write(f"✅ Imported {len(supplements)} supplements")
