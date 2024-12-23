# Generated by Django 4.2.3 on 2024-11-29 20:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0002_remove_history_gameid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cred',
            name='playerID',
        ),
        migrations.RemoveField(
            model_name='playerdata',
            name='playerID',
        ),
        migrations.AddField(
            model_name='cred',
            name='playerMail',
            field=models.EmailField(default='', max_length=255, unique=True),
        ),
        migrations.AddField(
            model_name='history',
            name='gameDate',
            field=models.DateTimeField(default=datetime.date(2024, 11, 29)),
        ),
        migrations.AlterField(
            model_name='playerdata',
            name='email',
            field=models.EmailField(default='', max_length=255, unique=True),
        ),
    ]
