from django.db import models

# Create your models here.
class todotask(models.Model):
    listName = models.CharField(max_length=100)


class todoItems(models.Model):
    listName = models.ForeignKey(todotask,on_delete= models.CASCADE)
    taskName = models.CharField(max_length=200)
    priorty = models.CharField(max_length=1,default=0)
    markeas = models.CharField(max_length=1,default='P')
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)