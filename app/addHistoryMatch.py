import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()

os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

from src.models import history, playerData, cred

def addMatch_History(nameA, nameB, scoreA, scoreB):
    add_history = history()
    add_history.playerA = {nameA}
    add_history.playerB = {nameB}
    add_history.pointsA = {scoreA}
    add_history.pointsB = {scoreB}
    add_history.winner = True if add_history.pointsA > add_history.pointsB else False
    add_history.save()