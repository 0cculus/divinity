from django.contrib.auth.models import User

username = "admin"
email = ""
password = "admin"

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username=username, email=email, password=password)
    print("Superuser created successfully!")
else:
    print("Superuser already exists.")
