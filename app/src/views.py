from django.http import JsonResponse
from django.shortcuts import render
import json
from .utils import addMatch_History

def index(request):
    return (render(request, 'index.html'))

#from django.views.decorators.csrf import csrf_exempt

#@csrf_exempt
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
        print(f"Received: {nameA} vs {nameB} | Scores: {scoreA} - {scoreB}")
        addMatch_History(nameA, nameB, scoreA, scoreB)
        return JsonResponse({'status': 'success', 'message': 'The match was added to the database'}, status=204)
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)