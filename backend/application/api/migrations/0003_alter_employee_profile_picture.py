# Generated by Django 4.2.3 on 2023-07-23 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_employee_unique_employee_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='profile_picture',
            field=models.CharField(max_length=24000),
        ),
    ]
