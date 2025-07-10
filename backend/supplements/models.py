from django.db import models

# Create your models here.
class Supplement(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.CharField(max_length=100)
    avg_rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    rating_count = models.IntegerField()
    reviews_count = models.IntegerField()
    product_url = models.URLField()
    highlights = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.title
    
