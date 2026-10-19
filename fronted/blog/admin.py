from django.contrib import admin
from .models import Article,Post,not_found_page
# Register your models here.

admin.site.register(Article)
admin.site.register(Post)
admin.site.register(not_found_page)