# Generated by Django 4.2.3 on 2024-11-29 20:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0004_alter_history_gamedate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='gameDate',
            field=models.DateTimeField(verbose_name=datetime.datetime(2024, 11, 29, 20, 50, 9, 540069, tzinfo=datetime.timezone.utc)),
        ),
    ]
