from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('history-splitter/', views.history_splitter, name="history_splitter"),
#    path('', views.showSelfHistory, name="selfHistory"),
]