# Generated by Django 4.2.3 on 2024-11-29 20:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0003_remove_cred_playerid_remove_playerdata_playerid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='gameDate',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 29, 20, 44, 24, 717071, tzinfo=datetime.timezone.utc)),
        ),
    ]