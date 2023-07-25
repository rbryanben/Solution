# Generated by Django 4.2.3 on 2023-07-23 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='employee',
            constraint=models.UniqueConstraint(fields=('company', 'employee_id'), name='unique_employee_company'),
        ),
    ]