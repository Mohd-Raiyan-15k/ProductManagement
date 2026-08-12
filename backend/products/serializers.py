from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    discountPercentage = serializers.DecimalField(
        source="discount_percentage", max_digits=5, decimal_places=2
    )

    class Meta:
        model = Product
        fields = [
            "id", "title", "description", "category", "price",
            "discountPercentage", "rating", "stock", "tags", "brand"
        ]
