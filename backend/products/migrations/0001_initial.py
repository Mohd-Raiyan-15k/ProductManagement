from django.db import migrations, models

def seed_products(apps, schema_editor):
    Product = apps.get_model("products", "Product")
    Product.objects.bulk_create([
        Product(
            title="Essence Mascara Lash Princess",
            description="The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
            category="beauty", price=9.99, discount_percentage=7.17,
            rating=4.94, stock=5, tags=["beauty", "mascara"], brand="Essence"
        ),
        Product(
            title="Eyeshadow Palette",
            description="A versatile eyeshadow palette with multiple shades.",
            category="beauty", price=19.99, discount_percentage=10,
            rating=4.60, stock=20, tags=["beauty", "eyeshadow"], brand="Beauty Co"
        ),
        Product(
            title="Classic T-Shirt",
            description="Comfortable everyday cotton t-shirt.",
            category="mens-shirts", price=14.99, discount_percentage=5.50,
            rating=4.40, stock=35, tags=["clothing", "shirt"], brand="Fashion Hub"
        ),
    ])

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                ("category", models.CharField(max_length=100)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("discount_percentage", models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ("rating", models.DecimalField(decimal_places=2, default=0, max_digits=3)),
                ("stock", models.PositiveIntegerField(default=0)),
                ("tags", models.JSONField(blank=True, default=list)),
                ("brand", models.CharField(max_length=100)),
            ],
        ),
        migrations.RunPython(seed_products, migrations.RunPython.noop),
    ]

