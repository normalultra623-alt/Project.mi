
from django.shortcuts import render,redirect
from .models import Hero
from blog.models import Post
# Create your views here.


def home(request):
    hero = Hero.objects.first()   
    return render(request, "home.html", {"hero": hero})


def contact(request):
    submitted = request.GET.get("submitted") == "1"
    return render(request, "contact.html", {"submitted": submitted})


def confirm_contact(request):
    if request.method == 'GET':
        return redirect('info:contact')

    if request.method == 'POST':
        return redirect(f"{redirect('info:contact').url}?submitted=1")

    return redirect('info:contact')
