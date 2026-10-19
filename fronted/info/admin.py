from django.contrib import admin
from .models import Contact,Hero,Article,Post,Section

# Register your models here.
admin.site.register(Contact)

class ContactAdmin(admin.ModelAdmin):
    fields=('created','name','email','subject','message')
    readonly_fields=['created']

admin.site.register(Hero)
admin.site.register(Article)
admin.site.register(Post)
admin.site.register(Section)
