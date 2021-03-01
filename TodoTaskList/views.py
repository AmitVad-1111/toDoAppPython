from django.shortcuts import render
from django.http import HttpResponse
from .forms import TodoListNameForm
from .models import todotask,todoItems
import json


# Create your views here.    

def showMainView(request):    
    return render(request,"main.html")

def getAllList(request):
    allL = todotask.objects.all()    
    dump = {}
    for i in allL:
        dump[str(i.listName)] = i.id
    request.session['all_list'] = dump        
    context = {
        "alllist" : allL
    }    
    request.session['currView'] = {"currv":"allL"}
    return render(request,"all_list.html",context)

def getAllListData(request):
    if request.is_ajax():
        alllist_json = json.dumps(request.session['all_list'])
        return HttpResponse(alllist_json)


def getNewListForm(request):  
    if request.is_ajax():
        context = {
            'form':TodoListNameForm()
        }  
        request.session['currView'] = {"currv":"getL"}
        return render(request,"creatList.html",context)

def creatNewList(request):
    if request.is_ajax():
        newList = todotask(listName = request.POST.get('titl')) 
        newList.save()
        request.session['all_list'].update(
            {request.POST.get('titl'):newList.id}
        )        
        request.session['currentList'] = newList.id
        context = {
            "llist" : newList
        }
        return render(request,"addTask.html",context)

def viewList(request):
    if request.is_ajax():
        if request.session.get('all_list'):
            lname = request.POST.get('d')            
            l = todotask.objects.get(pk=request.session['all_list'][lname])
            request.session['currentList'] = l.id
            context = {
                "llist" : l
            }
            request.session['currView'] = {"currv":"viewL","currd":lname}

            return render(request,"addTask.html",context)

def getTask(request):
    if request.is_ajax():
        pass

def addTask(request):
    if request.is_ajax():        
        currList = todotask.objects.get(pk=request.session['currentList'])
        lname = request.POST.get('task')
        p = request.POST.get('priority')
        newtask = todoItems(listName=currList,taskName=lname,priorty=p)
        newtask.save()        
        return HttpResponse('1')


def getAllTask(request):
    if request.is_ajax():        
        currList = todotask.objects.get(pk=request.session['currentList'])
        allList = currList.todoitems_set.all()
        temp = {}
        a = []
        for i in allList:
            temp['id'] = i.id
            temp['taskn'] = i.taskName            
            if i.markeas == 'C':                
                temp['markeas'] = True
            else:
                temp['markeas'] = False
            temp['priorty'] = i.priorty
            a.append(temp)
            temp = {}
                
        alllist_json = json.dumps(a)        
        return HttpResponse(alllist_json)

def editItem(request):
    if request.is_ajax():
        item = todoItems.objects.get(pk=request.POST.get('i'))
        if request.POST.get('r') == "0":            
            item.markeas = 'P'
            item.save()
        else:
            item.markeas = 'C'
            item.save()
        return HttpResponse("")

def rmvItem(request):
    if request.is_ajax():        
        item = todoItems.objects.get(pk=request.POST.get('task'))        
        item.delete()
        return HttpResponse("")

def removeList(request):
    if request.is_ajax():            
        item = todotask.objects.get(pk=request.POST.get('d'))        
        item.todoitems_set.all().delete()
        item.delete()
        return HttpResponse("")

def returnCurrentView(request):
    if request.is_ajax():        
        if request.session.get('currView') == None:
            request.session['currView'] = {"currv":"allL"}
        return HttpResponse( json.dumps(request.session.get('currView'))  )
            