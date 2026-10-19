from django.db import models

# Create your models here.

class Article(models.Model):
    title=models.CharField(max_length=100)
    description=models.TextField(null=True, blank=True)
    content=models.TextField()
    show=models.BooleanField(default=True)
    view_count=models.IntegerField(default=0)
    image=models.ImageField(null=True,blank=True)
    created=models.DateField(auto_now_add=True)

class Contact(models.Model):    
    name=models.CharField(max_length=100)
    email=models.EmailField(max_length=50)
    subject=models.CharField(max_length=100)
    message=models.TextField()
    created=models.DateTimeField(auto_now_add=True)

class Hero(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="hero/")

    def __str__(self):
        return self.title


class Post(models.Model):
    hero = models.ForeignKey(Hero, on_delete=models.CASCADE, related_name="features")
    title = models.CharField(max_length=100)
    description = models.TextField()
    article = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']


class Section(models.Model):
    title=models.CharField(max_length=100)
    description=models.TextField(null=True, blank=True)
    article = models.TextField()



    
