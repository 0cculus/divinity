# Generated by Django 4.2.3 on 2024-11-29 20:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0006_alter_history_gamedate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='gameDate',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 29, 20, 52, 35, 845315, tzinfo=datetime.timezone.utc)),
        ),
    ]