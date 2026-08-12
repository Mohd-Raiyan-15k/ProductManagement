from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "id", "title", "category", "price",
        "discount_percentage", "rating", "stock", "brand"
    )
    search_fields = ("title", "category", "brand")
    list_filter = ("category", "brand")
