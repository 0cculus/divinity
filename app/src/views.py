from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_protect
from .utils import addMatch_History
from .models import history, playerData

def index(request):
    matchs = history.objects.all()
    print(f"Voici les matchs trouves {matchs}")
    return (render(request, 'index.html', {'matchs': matchs}))

@csrf_protect
def history_splitter(request):
    print("Je suis dans history splitter")
    if request.method == 'POST':
        print("Je ramasse le stock pour ajouter le match")
        nameA = str(request.POST.get('nameA'))
        nameB = str(request.POST.get('nameB'))
        strScoreA = str(request.POST.get('scoreA'))
        strScoreB = str(request.POST.get('scoreB'))
        scoreA = int(strScoreA)
        scoreB = int(strScoreB)
#        print(f"Received: {nameA} vs {nameB} | Scores: {scoreA} - {scoreB}")
        addMatch_History(nameA, nameB, scoreA, scoreB)
        return JsonResponse({'status': 'success', 'message': 'The match was added to the database'}, status=204)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
