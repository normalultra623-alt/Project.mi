from django.db import models
from info.models import Hero
# Create your models here.

class Article(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    categories=models.ManyToManyField()
    content = models.TextField()
    show = models.BooleanField(default=True)
    view_count = models.IntegerField(default=0)
    image = models.ImageField(null=True, blank=True)
    created = models.DateField(auto_now_add=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class Post(models.Model):
    hero = models.ForeignKey(Hero, on_delete=models.CASCADE, related_name="blog_posts")
    title = models.CharField(max_length=100)
    description = models.TextField()
    article = models.TextField()
    category = models.CharField(max_length=50)
    season = models.CharField(max_length=20)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class not_found_page(models,Model):
    article = models.TextField()
    title = models.CharField(max_length=100)
    description = models.TextField()
