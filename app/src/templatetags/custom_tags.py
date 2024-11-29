import os
from django import template
from django.urls import reverse
from django.utils.safestring import mark_safe
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_wsgi_application()
register = template.Library()
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

from src.models import history, playerData, cred

@register.simple_tag(takes_context=True)

def historyButton(context, nameA, nameB, scoreA, scoreB, url_name):
    request = context['request']
    csrf_token = f"<input type='hidden' name='csrfmiddlewaretoken' value='{context.get('csrf_token')}'>"
    action_url = reverse(url_name)
    return mark_safe(f"""<form action="{action_url}" method="post">
            {csrf_token}
            <input type="hidden" name="nameA" value="{nameA}">
            <input type="hidden" name="nameB" value="{nameB}">
            <input type="hidden" name="scoreA" value={scoreA}>
            <input type="hidden" name="scoreB" value={scoreB}>
    </form>
    """)