from django import forms
from .models import cred

class credForm(forms.ModelForm):
    class data:
        model = cred
        fields = ["identity", "password"]